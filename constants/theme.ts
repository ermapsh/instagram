/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0064e0';
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    primary: '#0064e0',
    tint: tintColorLight,
    icon: '#262626',
    tabIconDefault: '#262626',
    tabIconSelected: tintColorLight,
    border: '#DBDBDB',
    secondaryText: '#737373',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0c151b',
    primary: '#0064e0',
    tint: tintColorDark,
    icon: '#A8A8A8',
    tabIconDefault: '#A8A8A8',
    tabIconSelected: tintColorDark,
    border: '#333333',
    secondaryText: '#A8A8A8',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
