import React, { FC, memo, useEffect, useRef } from "react";
import "./CentralEllipsis.css";
import { fitEllipsis } from "./lib/fit-ellipsis";
import { measureText } from "./lib/measure-text";
import * as chars from "./lib/chars";
import { getTextContainerWidth } from "./lib/get-text-max-width";

export interface CentralEllipsisProps {
  /**
   * Text content
   */
  children: string;
  /**
   * Additional classname
   */
  className?: string;
  /**
   * Unellipsed tail length
   */
  tailLength: number;
  /**
   * Contains text representing advisory information related to the element it belongs to.
   */
  title?: string;
}

export const CentralEllipsis: FC<CentralEllipsisProps> = (props) => {
  const { children, className = "", tailLength, title } = props;

  const leadingRef = useRef<HTMLSpanElement>(null);
  const leadingPart = children.slice(0, -tailLength) || children;

  useEffect(() => {
    const update = () => {
      const el = leadingRef.current;

      if (!el) {
        return;
      }

      delete leadingRef.current.dataset.shrinked;
      el.style.maxWidth = "";

      const style = window.getComputedStyle(el);
      const domWidth = el.offsetWidth;

      const maxWidth = fitEllipsis(leadingPart, style, domWidth);

      if (maxWidth != null) {
        leadingRef.current.dataset.shrinked = "true";
        leadingRef.current.style.maxWidth = `${maxWidth}px`;
      }
    };

    const setMinWidth = () => {
      const el = leadingRef.current;

      if (!el) {
        return;
      }

      const style = window.getComputedStyle(el);

      el.style.minWidth = `${getTextContainerWidth(`${leadingPart[0]}${chars.ELLIPSIS}`, style)}px`;
    };

    window.addEventListener("resize", update);

    update();
    setMinWidth();

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [leadingPart]);

  if (leadingPart.length === children.length) {
    return (
      <span className={`CentralEllipsis CentralEllipsis_short ${className}`} title={title}>
        {leadingPart}
      </span>
    );
  }

  const trailingPart = children.slice(-tailLength);

  return (
    <span className={`CentralEllipsis ${className}`} title={title}>
      <span className="CentralEllipsis-Leading" ref={leadingRef}>
        {leadingPart}
      </span>
      <span className="CentralEllipsis-Trailing">{trailingPart}</span>
    </span>
  );
};
CentralEllipsis.displayName = "CentralEllipsis";
