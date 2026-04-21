export interface ThemeColors {
  // Primary palette
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGradient: string[];

  // Accent
  accent: string;
  accentLight: string;
  accentSoft: string;

  // Backgrounds
  background: string;
  surface: string;
  card: string;
  cardElevated: string;
  cardGlass: string;
  cardGlassBorder: string;
  modal: string;

  // Text
  text: string;
  textSubheading: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textButton: string;
  textInverse: string;
  textOnPrimary: string;
  textMuted: string;

  // Inputs
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;

  // Chips
  chipBackground: string;
  chipSelectedBackground: string;
  chipBorder: string;
  chipSelectedBorder: string;
  chipText: string;
  chipSelectedText: string;

  // Cards
  cardBorder: string;
  cardShadow: string;

  // Health card
  healthCardBackground: string;
  healthCardBorder: string;
  healthCardGradient: string[];
  healthCardText: string;
  healthCardSubtext: string;
  healthCardBadgeBg: string;

  // Status
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  error: string;
  errorSoft: string;
  info: string;
  infoSoft: string;

  // Bottom nav
  navBackground: string;
  navBorder: string;
  navActive: string;
  navInactive: string;
  navFabBg: string;
  navFabIcon: string;

  // Slider
  sliderTrack: string;
  sliderActive: string;
  sliderThumb: string;

  // Progress bar
  progressBackground: string;
  progressFill: string;

  // Vault / Storage
  vaultProgressGradient: string[];

  // Badges
  badgeBackground: string;
  badgeText: string;
  newBadgeBg: string;
  newBadgeText: string;
  newBadgeBorder: string;

  // Blood group
  bloodGroupBg: string;
  bloodGroupText: string;

  // Insights card
  insightsCardBg: string;
  insightsCardBorder: string;

  // Log cards
  stepCardBg: string;
  stepCardAccent: string;
  waterCardBg: string;
  waterCardAccent: string;
  addCardBg: string;

  // Category cards (Lab Reports, Prescriptions, etc.)
  categoryCardBg: string;
  categoryCardBorder: string;
  categoryCardIcon: string;

  // Divider
  divider: string;

  // Overlay
  overlay: string;

  // Search
  searchBackground: string;
  searchIcon: string;
  searchText: string;
  searchPlaceholder: string;
  searchBorder: string;

  // Toggle
  toggleActive: string;
  toggleInactive: string;
  toggleThumb: string;

  // Misc
  skeleton: string;
  ripple: string;
  tabBarIndicator: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  pill: number;
  full: number;
}

export interface TypographyStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
}

export interface ThemeTypography {
  hero: TypographyStyle;
  headText: TypographyStyle;
  pageHeader: TypographyStyle;
  subHead: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  contHead: TypographyStyle;
  bigBody: TypographyStyle;
  body: TypographyStyle;
  bodyBold: TypographyStyle;
  caption: TypographyStyle;
  captionBold: TypographyStyle;
  smallBody: TypographyStyle;
  ultraSmall: TypographyStyle;
  bigButton: TypographyStyle;
  cardButton: TypographyStyle;
  cardHead: TypographyStyle;
}

export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
  shadow: {
    sm: ThemeShadow;
    md: ThemeShadow;
    lg: ThemeShadow;
  };
}
