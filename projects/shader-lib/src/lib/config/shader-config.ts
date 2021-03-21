import { InjectionToken } from '@angular/core';
import { Partial } from '../common';

export interface ShaderConfig {
  CAPTURE_RESOLUTION: number;
  PAUSED: boolean;
  BACK_COLOR: {
    r: number;
    g: number;
    b: number;
  };
  TRANSPARENT: boolean;
  RESIZE: boolean;
  MOUSE_INTERACTION_LISTENERS: boolean;
  PAUSE_KEY_CODE: string;
  SPLASH_KEY: string;
  SCREENSHOT_KEY_CODE: string;
  SCREENSHOT_FILE_NAME: string;
  RESOLUTION_FACTOR: number;
  // vertexShaders: string[];
  // fragmentShaders: string[];
  // uniformLocations: string[];
  // attributeLocations: string[];
}

export const ShaderConfigValue = new InjectionToken<Partial<ShaderConfig>>('WEBGL_SHADER_CONFIG');
