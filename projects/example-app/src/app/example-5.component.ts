import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { MarbleMarcherVertexShader } from './shaders/marble-marcher.vertex.shader';
import { MarbleMarcherFragmentShader } from './shaders/marble-marcher.fragment.shader';
import { tap } from 'rxjs/operators';
import { identity, lookAt } from './util/webgl-3d-math';

@Component({
  selector: 'app-example-5',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class Example5Component implements AfterViewInit, OnDestroy {

  private listener: (e: KeyboardEvent) => void;

  constructor(private shader: ShaderService) {}

  ngOnDestroy() {
    window.removeEventListener('keyup', this.listener);
  }

  ngAfterViewInit() {
    this.shader.createProgram(
      'marble-marcher',
      MarbleMarcherVertexShader,
      MarbleMarcherFragmentShader,
    ).pipe(
      tap((program) => {

        const iMat = program.gl.getUniformLocation(program.program, 'iMat');

        const iFracScale = program.gl.getUniformLocation(program.program, 'iFracScale');
        const iFracAng1 = program.gl.getUniformLocation(program.program, 'iFracAng1');
        const iFracAng2 = program.gl.getUniformLocation(program.program, 'iFracAng2');
        const iFracShift = program.gl.getUniformLocation(program.program, 'iFracShift');
        const iFracCol = program.gl.getUniformLocation(program.program, 'iFracCol');
        const iMarblePos = program.gl.getUniformLocation(program.program, 'iMarblePos');
        const iMarbleRad = program.gl.getUniformLocation(program.program, 'iMarbleRad');
        const iFlagScale = program.gl.getUniformLocation(program.program, 'iFlagScale');
        const iFlagPos = program.gl.getUniformLocation(program.program, 'iFlagPos');
        const iExposure = program.gl.getUniformLocation(program.program, 'iExposure');

        // Values to set (Level 1 for Testing)
        // Level 1
        // Level(
        //   1.8f, -0.12f, 0.5f,                              //Scale, Angle1, Angle2
        //   Eigen::Vector3f(-2.12f, -2.75f, 0.49f),          //Offset
        // Eigen::Vector3f(0.42f, 0.38f, 0.19f),            //Color
        // 0.035f,                                          //Marble Radius
        //   -2.0f,                                           //Start Look Direction
        //   3.3f,                                            //Orbit Distance
        //   Eigen::Vector3f(-2.95862f, 2.68825f, -1.11868f), //Marble Position
        // Eigen::Vector3f(2.95227f, 2.65057f, 1.11848f),   //Flag Position
        // -4.0f,                                           //Death Barrier
        //   false,                                           //Is Planet
        //   "Jump The Crater"),                              //Description

        // before setting any uniforms, we need to bind the program.
        program.bind();

        //   shader.setUniform("iFracScale", frac_params_smooth[0]);
        program.gl.uniform1f(iFracScale, 1.8);
        //   shader.setUniform("iFracAng1", frac_params_smooth[1]);
        program.gl.uniform1f(iFracAng1, -0.12);
        //   shader.setUniform("iFracAng2", frac_params_smooth[2]);
        program.gl.uniform1f(iFracAng2, 0.5);
        //   shader.setUniform("iFracShift", sf::Glsl::Vec3(frac_params_smooth[3], frac_params_smooth[4], frac_params_smooth[5]));
        program.gl.uniform3f(iFracShift, -2.12, -2.75, 0.49);
        //   shader.setUniform("iFracCol", sf::Glsl::Vec3(frac_params_smooth[6], frac_params_smooth[7], frac_params_smooth[8]));
        program.gl.uniform3f(iFracCol, 0.42, 0.38, 0.19);

        // shader.setUniform("iFlagScale", level_copy.planet ? -marble_rad : marble_rad);
        program.gl.uniform1f(iFlagScale, 0.035); // if planet -> Minus
        //   shader.setUniform("iMarbleRad", marble_rad);
        program.gl.uniform1f(iMarbleRad, 0.035);

        //   shader.setUniform("iMarblePos", free_camera ?
        //     sf::Glsl::Vec3(999.0f, 999.0f, 999.0f) :
        //   sf::Glsl::Vec3(marble_pos.x(), marble_pos.y(), marble_pos.z())
        // );
        program.gl.uniform3f(iMarblePos, -2.95862, 2.68825, -1.11868);

        //   shader.setUniform("iFlagPos", free_camera ?
        //     sf::Glsl::Vec3(-999.0f, -999.0f, -999.0f) :
        //   sf::Glsl::Vec3(flag_pos.x(), flag_pos.y(), flag_pos.z())
        // );
        program.gl.uniform3f(iFlagPos, 2.95227, 2.65057, 1.11848);

        //   shader.setUniform("iExposure", exposure);
        program.gl.uniform1f(iExposure, 1.0);


        // todo: set the iMat -> Matrix4...
        // const orbitSmooth = 0.995;
        // const float orbit_dist = level_copy.orbit_dist; // ->>> 3.3
        // cam_pos = orbit_pt + perp_vec * (orbit_dist * 2.5f);
        // cam_pos_smooth = cam_pos_smooth*orbit_smooth + cam_pos*(1 - orbit_smooth);
        //   shader.setUniform("iMat", sf::Glsl::Mat4(cam_mat.data()));
        //  cam_mat.block<3, 1>(0, 3) = cam_pos_smooth;
        const uniformsThatAreTheSameForAllObjects = {
          u_lightWorldPos:         [-50, 30, 100],
          u_viewInverse:           identity(),
          u_lightColor:            [1, 1, 1, 1],
        };

        let cameraPosition = [7, 7, 7];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        let cameraMatrix = lookAt(cameraPosition, target, up, uniformsThatAreTheSameForAllObjects.u_viewInverse);

        program.gl.uniformMatrix4fv(iMat, false, cameraMatrix);

        console.log('MarbleMarcher');
        console.log('-----------------------------------------------------------------------------');
        console.log(program);
        console.log('-----------------------------------------------------------------------------');

        let eclipsed = 0;
        program.step = (dt?) => {
          eclipsed += dt;
          cameraPosition = [cameraPosition[0], 1 + 7 * Math.cos(eclipsed), 1 + 7 * Math.cos(eclipsed)];
          cameraMatrix = lookAt(cameraPosition, target, up, uniformsThatAreTheSameForAllObjects.u_viewInverse);
          program.gl.uniformMatrix4fv(iMat, false, cameraMatrix);
        };

        this.listener = (e: KeyboardEvent) => {
          if (e.code === 'NumpadAdd') {
            cameraPosition = [cameraPosition[0] - .1, cameraPosition[1] - .1, cameraPosition[2] - .1];
            // cameraPosition = [7, cameraPosition[1] + 1, 7];
            // cameraPosition = [7, 7, cameraPosition[2] + 1];
          } else if (e.code === 'NumpadSubtract') {
            cameraPosition = [cameraPosition[0] + .1, cameraPosition[1] + .1, cameraPosition[2] + .1];
            // cameraPosition = [7, cameraPosition[1] - 1, 7];
            // cameraPosition = [7, 7, cameraPosition[2] - 1];
          }

          cameraMatrix = lookAt(cameraPosition, target, up, uniformsThatAreTheSameForAllObjects.u_viewInverse);
          program.gl.uniformMatrix4fv(iMat, false, cameraMatrix);
        };

        window.addEventListener('keyup', this.listener);
      }),
    ).subscribe();
  }
}
