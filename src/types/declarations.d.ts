declare module '@expo/vector-icons' {
  export const Ionicons: any;
  export const MaterialIcons: any;
  export const MaterialCommunityIcons: any;
  export const FontAwesome: any;
  export const FontAwesome5: any;
  export const Feather: any;
  export const AntDesign: any;
  export const Entypo: any;
}

declare module 'expo-blur' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';
  interface BlurViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    experimentalBlurMethod?: string;
  }
  export const BlurView: ComponentType<BlurViewProps>;
}

declare module 'expo-linear-gradient' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';
  interface LinearGradientProps extends ViewProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
  }
  export const LinearGradient: ComponentType<LinearGradientProps>;
}

declare module 'expo-sensors' {
  export const Pedometer: {
    isAvailableAsync: () => Promise<boolean>;
    watchStepCount: (callback: (result: { steps: number }) => void) => { remove: () => void };
    getStepCountAsync: (start: Date, end: Date) => Promise<{ steps: number }>;
  };
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare module 'react-native-svg' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';
  export const Svg: ComponentType<any>;
  export const Circle: ComponentType<any>;
  export const Rect: ComponentType<any>;
  export const Path: ComponentType<any>;
  export const G: ComponentType<any>;
  export const Defs: ComponentType<any>;
  export const LinearGradient: ComponentType<any>;
  export const Stop: ComponentType<any>;
  export const Line: ComponentType<any>;
  export default Svg;
}
