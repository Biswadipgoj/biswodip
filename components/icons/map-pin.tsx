// From Iconoir — used via Iconify (https://iconify.design)
import type { SVGProps } from "react";

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width ?? 20}
      height={props.height ?? 20}
      {...props}
      style={{ flexShrink: 0, ...props.style }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1 1 16 0Z"/><path fill="currentColor" d="M12 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/></g>
    </svg>
  );
}
