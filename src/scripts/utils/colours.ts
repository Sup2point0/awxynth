export function invert(colour: string): string
{
  if (!colour.includes("#") && !colour.includes("0x")) return colour;

  let hex = Number(colour.replace("#", "0x"));

  let r = hex & 0xff0000;
  let g = hex & 0x00ff00;
  let b = hex & 0x0000ff;

  let ir = 0xff0000 - r;
  let ig = 0x00ff00 - g;
  let ib = 0x0000ff - b;

  let ihex = ir | ig | ib;
  let out = ihex.toString(16).padStart(6, "0");

  return `#${out}`;
}
