import {ShaderConfig} from './shader-config';

export const defaultConfig: ShaderConfig  = {
  CAPTURE_RESOLUTION: 512,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: false,
  MOUSE_INTERACTION_LISTENERS: false,
  PAUSE_KEY_CODE: null,
  SCREENSHOT_KEY_CODE: null,
  SPLASH_KEY: null,
  SCREENSHOT_FILE_NAME: 'shader',
  RESIZE: false,
  RESOLUTION_FACTOR: 1,
};
