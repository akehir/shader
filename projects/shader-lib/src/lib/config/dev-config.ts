import {ShaderConfig} from './shader-config';

export const devConfig: ShaderConfig  = {
  CAPTURE_RESOLUTION: 512,
  PAUSED: true,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: false,
  MOUSE_INTERACTION_LISTENERS: true,
  PAUSE_KEY_CODE: 'KeyP',
  SCREENSHOT_KEY_CODE: 'KeyS',
  SPLASH_KEY: ' ',
  SCREENSHOT_FILE_NAME: 'shader',
  RESIZE: false,
};
