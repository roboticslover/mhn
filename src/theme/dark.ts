import { Theme } from './types';

const darkTheme: Theme = {
  dark: true,
  colors: {
    // Primary + Semantic (exact Figma dark theme)
    primary: '#6FFB85',
    primaryLight: '#8FFCA0',
    primaryDark: '#34C759',
    primaryGradient: ['#6FFB85', '#34C759', '#28A745'],

    // Accent
    accent: '#6FFB85',
    accentLight: '#B9F6CA',
    accentSoft: 'rgba(111, 251, 133, 0.1)',

    // Backgrounds (Figma: Surface BG #000000, Card fill #171717 + stroke rgba(255,255,255,0.08))
    background: '#000000',
    surface: '#0A0A0A',
    card: 'rgba(23, 23, 23, 0.4)',
    cardElevated: '#171717',
    cardGlass: 'rgba(23, 23, 23, 0.4)',
    cardGlassBorder: 'rgba(255, 255, 255, 0.08)',
    modal: '#171717',

    // Text (Figma dark: Primary #FFFFFF, Subheading #E0E0E0, Body #AAAAAA, Disabled #767676, Button #141414)
    text: '#FFFFFF',
    textSubheading: '#E0E0E0',
    textSecondary: '#AAAAAA',
    textTertiary: '#767676',
    textDisabled: '#767676',
    textButton: '#141414',
    textInverse: '#000000',
    textOnPrimary: '#141414',
    textMuted: 'rgba(255, 255, 255, 0.4)',

    // Inputs
    inputBackground: 'rgba(23, 23, 23, 0.4)',
    inputBorder: 'rgba(255, 255, 255, 0.08)',
    inputText: '#FFFFFF',
    inputPlaceholder: '#6E7681',
    inputFocusBorder: '#6FFB85',

    // Chips
    chipBackground: 'rgba(23, 23, 23, 0.4)',
    chipSelectedBackground: '#6FFB85',
    chipBorder: 'rgba(255, 255, 255, 0.08)',
    chipSelectedBorder: '#6FFB85',
    chipText: '#AAAAAA',
    chipSelectedText: '#000000',

    // Cards (Figma: card fill #171717, stroke rgba(255,255,255,0.08))
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    cardShadow: 'rgba(0, 0, 0, 0.25)',

    // Health card
    healthCardBackground: 'rgba(23, 23, 23, 0.4)',
    healthCardBorder: 'rgba(255, 255, 255, 0.08)',
    healthCardGradient: ['rgba(23, 23, 23, 0.6)', 'rgba(23, 23, 23, 0.4)', 'rgba(23, 23, 23, 0.3)'],
    healthCardText: '#FFFFFF',
    healthCardSubtext: 'rgba(255, 255, 255, 0.6)',
    healthCardBadgeBg: 'rgba(255, 255, 255, 0.1)',

    // Status (exact Figma semantic: warning #FF9200, error #DB5034)
    success: '#6FFB85',
    successSoft: 'rgba(111, 251, 133, 0.15)',
    warning: '#FF9200',
    warningSoft: 'rgba(255, 146, 0, 0.15)',
    error: '#DB5034',
    errorSoft: 'rgba(219, 80, 52, 0.15)',
    info: '#60A5FA',
    infoSoft: 'rgba(96, 165, 250, 0.1)',

    // Bottom nav (Figma dark: white pill bar, black active pill)
    navBackground: '#FFFFFF',
    navBorder: 'rgba(188, 203, 183, 0.28)',
    navActive: '#000000',
    navInactive: '#757575',
    navFabBg: '#FFFFFF',
    navFabIcon: '#000000',
    navActivePill: '#000000',
    navActiveText: '#FFFFFF',

    // Slider
    sliderTrack: '#2A2A2A',
    sliderActive: '#6FFB85',
    sliderThumb: '#6FFB85',

    // Progress bar
    progressBackground: '#2A2A2A',
    progressFill: '#6FFB85',

    // Vault / Storage
    vaultProgressGradient: ['#EF4444', '#F97316', '#EAB308'],

    // Badges
    badgeBackground: 'rgba(251, 191, 36, 0.1)',
    badgeText: '#FBBF24',
    newBadgeBg: 'rgba(52, 199, 89, 0.1)',
    newBadgeText: '#6FFB85',
    newBadgeBorder: 'rgba(52, 199, 89, 0.23)',

    // Blood group (Figma: green bg with white text)
    bloodGroupBg: 'rgba(52, 199, 89, 0.32)',
    bloodGroupText: '#FFFFFF',

    // Insights card
    insightsCardBg: 'rgba(23, 23, 23, 0.4)',
    insightsCardBorder: 'rgba(255, 255, 255, 0.08)',

    // Log cards
    stepCardBg: 'rgba(23, 23, 23, 0.4)',
    stepCardAccent: '#F59E0B',
    waterCardBg: 'rgba(23, 23, 23, 0.4)',
    waterCardAccent: '#3B82F6',
    addCardBg: 'rgba(23, 23, 23, 0.4)',

    // Category cards
    categoryCardBg: 'rgba(23, 23, 23, 0.4)',
    categoryCardBorder: 'rgba(255, 255, 255, 0.08)',
    categoryCardIcon: '#6FFB85',

    // Divider
    divider: 'rgba(255, 255, 255, 0.08)',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',

    // Search (Figma: dark search bar with subtle border)
    searchBackground: 'rgba(23, 23, 23, 0.4)',
    searchIcon: '#6E7681',
    searchText: '#FFFFFF',
    searchPlaceholder: '#AAAAAA',
    searchBorder: 'rgba(23, 23, 23, 0.4)',

    // Toggle
    toggleActive: '#6FFB85',
    toggleInactive: '#2A2A2A',
    toggleThumb: '#FFFFFF',

    // Misc
    skeleton: '#2A2A2A',
    ripple: 'rgba(111, 251, 133, 0.15)',
    tabBarIndicator: '#6FFB85',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    pill: 33,
    full: 999,
  },
  typography: {
    // Exact Figma typography scale (all Inter)
    hero:        { fontSize: 34, fontWeight: '700', lineHeight: 42, letterSpacing: -0.5, fontFamily: 'Inter' },
    headText:    { fontSize: 30, fontWeight: '700', lineHeight: 38, letterSpacing: -0.4, fontFamily: 'Inter' },
    pageHeader:  { fontSize: 28, fontWeight: '600', lineHeight: 36, letterSpacing: -0.3, fontFamily: 'Inter' },
    subHead:     { fontSize: 24, fontWeight: '700', lineHeight: 32, letterSpacing: -0.3, fontFamily: 'Inter' },
    h3:          { fontSize: 20, fontWeight: '700', lineHeight: 28, fontFamily: 'Inter' },
    h4:          { fontSize: 18, fontWeight: '700', lineHeight: 26, fontFamily: 'Inter' },
    contHead:    { fontSize: 16, fontWeight: '700', lineHeight: 24, fontFamily: 'Inter' },
    bigBody:     { fontSize: 18, fontWeight: '400', lineHeight: 28, fontFamily: 'Inter' },
    body:        { fontSize: 16, fontWeight: '400', lineHeight: 24, fontFamily: 'Inter' },
    bodyBold:    { fontSize: 16, fontWeight: '600', lineHeight: 24, fontFamily: 'Inter' },
    caption:     { fontSize: 14, fontWeight: '400', lineHeight: 20, fontFamily: 'Inter' },
    captionBold: { fontSize: 14, fontWeight: '600', lineHeight: 20, fontFamily: 'Inter' },
    smallBody:   { fontSize: 12, fontWeight: '400', lineHeight: 18, fontFamily: 'Inter' },
    ultraSmall:  { fontSize: 10, fontWeight: '400', lineHeight: 15, fontFamily: 'Inter' },
    bigButton:   { fontSize: 18, fontWeight: '700', lineHeight: 26, fontFamily: 'Inter' },
    cardButton:  { fontSize: 14, fontWeight: '800', lineHeight: 20, fontFamily: 'Inter' },
    cardHead:    { fontSize: 10, fontWeight: '800', lineHeight: 15, letterSpacing: 0.5, fontFamily: 'Inter' },
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export default darkTheme;
