export const setupCanvas = (canvas: HTMLCanvasElement | null, defaultW = 400, defaultH = 200) => {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width || defaultW;
  const h = rect.height || defaultH;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);
  return { ctx, width: w, height: h };
};
