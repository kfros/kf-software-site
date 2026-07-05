import type { SVGProps } from "react";

export function KfLogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M 45 21 H 61 V 79 L 114 20 H 170 V 31 H 115 L 62 95 L 173 179 H 149 L 61 112 V 180 H 45 Z M 80 88 H 171 V 101 H 80 Z"
        fill="currentColor"
      />
    </svg>
  );
}