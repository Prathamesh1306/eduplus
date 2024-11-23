import * as React from "react";
const Image12 = (props) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 148 148"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_6_765)">
      <circle cx={74} cy={59} r={30} fill="#FBFBFB" />
    </g>
    <rect
      x={61}
      y={46}
      width={11.8182}
      height={11.8182}
      rx={2}
      fill="#0B7077"
    />
    <rect
      x={61}
      y={60.1819}
      width={11.8182}
      height={11.8182}
      rx={2}
      fill="#0B7077"
    />
    <rect
      x={75.7727}
      y={46}
      width={11.8182}
      height={11.8182}
      rx={2}
      fill="#0B7077"
    />
    <rect
      x={75.7727}
      y={60.1819}
      width={11.8182}
      height={11.8182}
      rx={2}
      fill="#FD661F"
    />
    <defs>
      <filter
        id="filter0_d_6_765"
        x={0}
        y={0}
        width={148}
        height={148}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={15} />
        <feGaussianBlur stdDeviation={22} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0509804 0 0 0 0 0.0588235 0 0 0 0 0.109804 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6_765"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_6_765"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default Image12;
