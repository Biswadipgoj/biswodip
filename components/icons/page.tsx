// From Iconoir — used via Iconify (https://iconify.design)
import type { SVGProps } from "react";

export function PageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width ?? 20}
      height={props.height ?? 20}
      {...props}
      style={{ flexShrink: 0, ...props.style }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4 21.4V2.6a.6.6 0 0 1 .6-.6h11.652a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 20 5.75V21.4a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Z"/><path d="M8 10h8M8 18h8M8 14h4M16 2v3.4a.6.6 0 0 0 .6.6H20"/></g>
    </svg>
  );
}
