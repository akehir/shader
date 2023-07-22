export function scaleByPixelRatio(input, factor = 1) {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio * factor);
}
