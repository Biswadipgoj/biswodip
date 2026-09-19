// From Iconoir — used via Iconify (https://iconify.design)
import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width ?? 20}
      height={props.height ?? 20}
      {...props}
      style={{ width: props.width ?? 20, height: props.height ?? 20, flexShrink: 0, ...props.style }}
    >
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h18M3 12h18M3 19h18"/>
    </svg>
  );
}
