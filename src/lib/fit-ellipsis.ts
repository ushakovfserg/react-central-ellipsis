import { measureText, MeasureTextFontStyle } from "./measure-text";
import * as chars from "./chars";
import { getTextContainerWidth } from "./get-text-max-width";

const binarySearch = (max: number, getValue: (guess: number) => number, match: number) => {
  let min = 0;

  while (min <= max) {
    const guess = Math.floor((min + max) / 2);
    const compareVal = getValue(guess);

    if (compareVal === match) {
      return guess;
    }
    if (compareVal < match) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return max;
};

export function fitEllipsis(text: string, style: MeasureTextFontStyle, maxWidth: number) {
  const width = Math.floor(measureText(text, style));
  const ellipsisWidth = measureText(chars.ELLIPSIS, style);

  if (width <= maxWidth || width <= ellipsisWidth) {
    return undefined;
  }

  const index = binarySearch(
    text.length,
    (guess) => measureText(text.slice(0, guess), style),
    maxWidth - ellipsisWidth
  );

  return index != -1 ? getTextContainerWidth(text.slice(0, index) + chars.ELLIPSIS, style) : undefined;
}
