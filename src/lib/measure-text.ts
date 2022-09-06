export interface MeasureTextFontStyle {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string;
}

let canvas: HTMLCanvasElement;

export function measureText(
  text: string,
  { fontFamily, fontSize, fontStyle, fontWeight }: MeasureTextFontStyle
): number {
  if (!canvas) {
    canvas = document.createElement("canvas");
  }

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`;

  return context.measureText(text).width;
}
