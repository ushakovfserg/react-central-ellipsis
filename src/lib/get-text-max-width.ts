import { measureText, MeasureTextFontStyle } from "./measure-text";

/**
 * Magic offset to fix CSS ellipsis start calculation behavior
 */
const MAGIC_OFFSET = 1;

export function getTextContainerWidth(text: string, style: MeasureTextFontStyle) {
  // Math ceil is important because measureText returns too precise measurements
  // that can't be handled by a browser
  return Math.ceil(measureText(text, style)) + MAGIC_OFFSET;
}
