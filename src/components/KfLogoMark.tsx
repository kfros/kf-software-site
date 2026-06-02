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
        d="M 34 20 H 61 V 70 L 114 20 H 170 V 43 H 116 L 64 98 L 159 181 H 131 L 62 123 V 180 H 34 Z M 115 85 L 170 85 V 110 H 115 L 115 85 Z"
        fill="currentColor"
      />
    </svg>
  );
}