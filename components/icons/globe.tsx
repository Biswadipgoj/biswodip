// From Iconoir — used via Iconify (https://iconify.design)
import type { SVGProps } from "react";

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width ?? 20}
      height={props.height ?? 20}
      {...props}
      style={{ flexShrink: 0, ...props.style }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/><path d="M2.5 12.5L8 14.5L7 18l1 3M17 20.5l-.5-2.5H14l-1-3l2-3h5l.5 2.5M19 5.5h-3.5l-.5 2l1.5 2L14.5 11"/></g>
    </svg>
  );
}
