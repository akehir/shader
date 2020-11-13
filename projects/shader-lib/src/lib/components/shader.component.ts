import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  NgZone,
  OnDestroy,
  Inject,
} from '@angular/core';

import { ShaderService } from '../services/shader-service';

import {
  blit,
  Context,
  getWebGLContext,
  PointerPrototype,
  createFBO,
  getResolution,
  framebufferToTexture,
  normalizeTexture,
  textureToCanvas,
  downloadURI,
  scaleByPixelRatio,
  updatePointerUpData,
  updatePointerMoveData,
  updatePointerDownData,
} from '../common';
import { combineLatest, concat, defer, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  // tslint:disable
  selector: 'webgl-shader',
  // tslint:enable
  template: '<canvas #canvas></canvas>',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class ShaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;

  // WebGL Fluid Animation
  private pointers = [];

  private lastUpdateTime = Date.now();
  private time = 0.0;

  // context
  private gl: Context | null;
  private ext;
  private mouseX = 0;
  private mouseY = 0;

  private blit;

  private destroyed = false;
  private hidden = true;
  private MOUSE_INTERACTION_LISTENERS: boolean;
  private KEYS_INTERACTION_LISTENERS: boolean;
  private pageVisible$: Observable<boolean>;
  private canvasVisible$: Observable<boolean>;
  private activeStateChange$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) document: any,
    private zone: NgZone,
    private config: ShaderService,
    ) {
    // As per: https://medium.com/angular-in-depth/improve-performance-with-lazy-components-f3c5ff4597d2
    this.pageVisible$ = concat(
      defer(() => of(!document.hidden)),
      fromEvent(document, 'visibilitychange')
        .pipe(
          map(e => !document.hidden)
        )
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed = true;

    if (this.MOUSE_INTERACTION_LISTENERS) {
      this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    }

    if (this.KEYS_INTERACTION_LISTENERS) {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  ngAfterViewInit() {
    // WebGL Fluid Animation
    this.canvas = this.canvasRef.nativeElement;

    if (!(this.canvas instanceof HTMLCanvasElement)) {
      // in case the canvas is not what's expected, we have a problem
      throw new Error('Canvas element is not correctly provided. Cannot initialize webgl fluid simulation.');
    }

    // As per: https://medium.com/angular-in-depth/improve-performance-with-lazy-components-f3c5ff4597d2
    this.canvasVisible$ = new Observable(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      });

      intersectionObserver.observe(this.canvas);

      return () => { intersectionObserver.disconnect(); };

    })
      .pipe (
        map(entries => entries[0] || {isIntersecting: false}),
        map(entry => entry.isIntersecting),
        distinctUntilChanged(),
      );

    // As per: https://medium.com/angular-in-depth/improve-performance-with-lazy-components-f3c5ff4597d2
    this.activeStateChange$ = combineLatest([
      this.pageVisible$,
      this.canvasVisible$,
    ])
      .pipe (
        map(([pageVisible, elementVisible]) => pageVisible && elementVisible),
        distinctUntilChanged()
      );

    if (this.config.RESIZE) {
      this.resizeCanvas(this.canvas);
    }

    const ctx = getWebGLContext(this.canvas);
    this.gl = ctx.gl;
    this.ext = ctx.ext;

    // this.blit = blit(ctx.gl);
    this.pointers.push(new PointerPrototype());

    this.config.initialize(ctx.gl, ctx.ext);

    // todo: draw or do things by drawing.
    this.zone.runOutsideAngular(() => {
      this.lastUpdateTime = Date.now();

      // Only if element is visible, and tab is open, we execute the rendering.
      // We also only start the rendering, if the component was previously hidden.
      this.activeStateChange$.subscribe((visible) => {
        if (visible && this.hidden) {
          this.hidden = !visible; // need to change the state, otherwise update will immediately return
          this.update(); // Update will call itself until visibility changes or component is destroyed
        }

        this.hidden = !visible;
      });

      if (this.config.MOUSE_INTERACTION_LISTENERS) {
        this.MOUSE_INTERACTION_LISTENERS = true; // listeners were added
        this.canvas.addEventListener('mousedown', this.handleMouseDown);

        this.canvas.addEventListener('mousemove', e => {
          const pointer = this.pointers[0];
          this.setMousePosition(e);
          if (!pointer.down) { return; }
          const posX = scaleByPixelRatio(e.offsetX);
          const posY = scaleByPixelRatio(e.offsetY);
          updatePointerMoveData(this.canvas, pointer, posX, posY);
        });

        window.addEventListener('mouseup', () => {
          updatePointerUpData(this.pointers[0]);
        });

        this.canvas.addEventListener('touchstart', e => {
          e.preventDefault();
          const touches = e.targetTouches;
          while (touches.length >= this.pointers.length) {
            this.pointers.push(new PointerPrototype());
          }
          for (let i = 0; i < touches.length; i++) {
            const posX = scaleByPixelRatio(touches[i].pageX);
            const posY = scaleByPixelRatio(touches[i].pageY);
            updatePointerDownData(this.canvas, this.pointers[i + 1], touches[i].identifier, posX, posY);
          }
        });

        this.canvas.addEventListener('touchmove', e => {
          e.preventDefault();
          const touches = e.targetTouches;
          for (let i = 0; i < touches.length; i++) {
            const pointer = this.pointers[i + 1];
            if (!pointer.down) { continue; }
            const posX = scaleByPixelRatio(touches[i].pageX);
            const posY = scaleByPixelRatio(touches[i].pageY);
            updatePointerMoveData(this.canvas, pointer, posX, posY);
          }
        }, false);

        window.addEventListener('touchend', e => {
          const touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) { // tslint:disable-line
            const pointer = this.pointers.find(p => p.id === touches[i].identifier);
            if (pointer === null) { continue; }
            updatePointerUpData(pointer);
          }
        });
      }

      if (
        !!this.config.PAUSE_KEY_CODE ||
        !!this.config.SPLASH_KEY ||
        !!this.config.SCREENSHOT_KEY_CODE
      ) {
        this.KEYS_INTERACTION_LISTENERS = true;
        window.addEventListener('keydown', this.handleKeyDown);
      }
    });
  }

  setMousePosition(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = rect.height - (e.clientY - rect.top) - 1;  // bottom is 0 in WebGL
  }

  update() {
    if (this.destroyed || this.hidden) { return; }
    const dt = this.calcDeltaTime();
    this.time += dt;

    if (this.config.RESIZE && this.resizeCanvas(this.canvas)) {
      // resizeCallbacks ?
    }

    if (!this.config.PAUSED) {
      this.step(dt);
    }

    this.render(null);
    requestAnimationFrame(() => {
      this.update();
    });
  }

  calcDeltaTime() {
    const now = Date.now();
    let dt = (now - this.lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    this.lastUpdateTime = now;
    return dt;
  }

  resizeCanvas(canvas: HTMLCanvasElement) {
    // todo: this seems to increase infinitely the canvas size,
    // wheras it shouldnt.
    const width = scaleByPixelRatio(window.innerWidth);
    const height = scaleByPixelRatio(window.innerHeight);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  step(dt) {
    this.gl.disable(this.gl.BLEND);
    // this.gl.viewport(0, 0, this.velocity.width, this.velocity.height);

    for (const key of Object.keys(this.config.programs)) {
      const program = this.config.programs[key];

      // Tell WebGL how to convert from clip space to pixels
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

      // Tell it to use our program (pair of shaders)
      program.bind();

      // Bind the attribute/buffer set we want.
      this.gl.bindVertexArray(program.vao);

      if (program.toyUniforms.resolutionLocation) {
        this.gl.uniform2f(program.toyUniforms.resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);
      }

      if (program.toyUniforms.mouseLocation) {
        this.gl.uniform2f(program.toyUniforms.mouseLocation, this.mouseX, this.mouseY);
      }

      if (program.toyUniforms.timeLocation) {
        this.gl.uniform1f(program.toyUniforms.timeLocation, this.time);
      }

      program.step(dt);
    }
  }

  render(target) {
    if (target == null || !this.config.TRANSPARENT) {
      this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(this.gl.BLEND);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    const fbo = target == null ? null : target.fbo;

    // this.drawDisplay(fbo);
    for (const key of Object.keys(this.config.programs)) {
      this.config.programs[key].render(fbo);
    }
  }

  drawDisplay(fbo) {
    this.blit(fbo);
  }

  captureScreenshot() {
    const res = getResolution(this.gl, this.config.CAPTURE_RESOLUTION);
    const target = createFBO(this.gl, res.width, res.height, this.ext.formatRGBA.internalFormat, this.ext.formatRGBA.format, this.ext.halfFloatTexType, this.gl.NEAREST);
    this.render(target);

    let texture: Float32Array | Uint8Array = framebufferToTexture(target, this.gl);
    texture = normalizeTexture(texture, target.width, target.height);

    const captureCanvas = textureToCanvas(texture, target.width, target.height);
    const datauri = captureCanvas.toDataURL();
    downloadURI(`${this.config.SCREENSHOT_FILE_NAME}.png`, datauri);
    URL.revokeObjectURL(datauri);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const posX = scaleByPixelRatio(e.offsetX);
    const posY = scaleByPixelRatio(e.offsetY);
    let pointer = this.pointers.find(p => p.id === -1);
    if (pointer === null) {
      pointer = new PointerPrototype();
    }
    updatePointerDownData(this.canvas, pointer, -1, posX, posY);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === this.config.PAUSE_KEY_CODE) {
      this.config.PAUSED = !this.config.PAUSED;
    }
    if (e.key === this.config.SPLASH_KEY) {
      // ...
    }
    if (e.code === this.config.SCREENSHOT_KEY_CODE) {
      this.captureScreenshot();
    }
  }
}
