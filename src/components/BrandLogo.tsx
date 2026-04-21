import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface Props {
  size?: number;
}

/**
 * MyHealthNotion brand mark — matches assets/logo.svg exactly.
 * 4 green gradient chevrons forming an "M"/"N" silhouette with a solid
 * green heart perched between the top two chevrons.
 */
export default function BrandLogo({ size = 40 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M10.5728 4.39062L23.5145 17.3141V29.9046L10.5728 16.8781V4.39062Z"
        fill="url(#grad1)"
      />
      <Path
        d="M24.7153 17.1091L37.4277 4.39062V29.9046L24.7153 17.1091Z"
        fill="url(#grad2)"
      />
      <Path
        d="M10.5728 18.3125L23.5145 31.262V45.714L10.5728 32.6865V18.3125Z"
        fill="url(#grad3)"
      />
      <Path
        d="M24.4858 18.3125L37.4276 31.057L24.4858 45.714V18.3125Z"
        fill="url(#grad4)"
      />
      <Path
        d="M18.8716 6.84806C18.7651 6.67481 18.6748 6.49098 18.6057 6.29559C18.4694 5.9077 18.4118 5.48324 18.454 5.04049C18.5856 3.67469 19.6732 2.57167 21.0345 2.42729C22.343 2.28869 23.5017 3.02597 24 4.12515C24.4934 3.03463 25.6368 2.3012 26.9318 2.42344C28.3017 2.55338 29.4057 3.65448 29.544 5.02701C29.59 5.48131 29.5296 5.91925 29.3875 6.3158C29.3193 6.50349 29.231 6.68251 29.1273 6.84999C29.015 7.02132 28.8585 7.25424 28.6636 7.52374C27.8246 8.68644 27.0144 9.51901 26.518 9.99641C25.6348 10.8453 24.7689 11.5047 24.0076 12.0119C23.2329 11.4046 22.6012 10.8598 22.1289 10.4363C20.4057 8.88857 19.632 7.89334 19.4419 7.64598C19.1923 7.32065 18.9984 7.04153 18.8678 6.84806Z"
        fill="#009345"
      />
      <Defs>
        <LinearGradient id="grad1" x1="-0.42" y1="-3.30" x2="8.04" y2="6.53" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#ABD15E" />
          <Stop offset="1" stopColor="#147D56" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="51.58" y1="-4.53" x2="44.04" y2="5.73" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#ABD15E" />
          <Stop offset="1" stopColor="#147D56" />
        </LinearGradient>
        <LinearGradient id="grad3" x1="18.81" y1="36.91" x2="14.41" y2="24.70" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#ABD15E" />
          <Stop offset="1" stopColor="#147D56" />
        </LinearGradient>
        <LinearGradient id="grad4" x1="25.59" y1="38.67" x2="30.17" y2="26.79" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#ABD15E" />
          <Stop offset="1" stopColor="#147D56" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
