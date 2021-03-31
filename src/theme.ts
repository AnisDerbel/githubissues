import { Appearance, TextStyle } from 'react-native';

import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      badge: string;
      divider: string;
    }
    interface Theme {
      variants: VariantProps;
      spacing: SpacingProps;
    }
  }
}

interface VariantProps {
  [key: string]: TextStyle;
}
interface SpacingProps {
  [key: string]: number;
}

const variants: VariantProps = {
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
  tag: {
    fontSize: 14,
  },
  info: {
    fontSize: 12,
  },
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  grey: 'grey',
  lightGrey: '#d3d3d3',
};
const spacing: SpacingProps = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: colors.black,
    accent: colors.lightGrey,
    divider: colors.grey,
    badge: colors.black,
  },
  variants,
  spacing,
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: colors.white,
    accent: colors.white,
    badge: colors.black,
    divider: colors.white,
  },
  variants,
  spacing,
};

const colorScheme = Appearance.getColorScheme();
const isThemeDark = colorScheme === 'dark';

export default isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
