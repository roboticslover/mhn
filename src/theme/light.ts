import { Theme } from './types';

const lightTheme: Theme = {
  dark: false,
  colors: {
    // Primary + Semantic (exact Figma light theme)
    primary: '#39A657',
    primaryLight: '#6FCF85',
    primaryDark: '#2D8444',
    primaryGradient: ['#6FCF85', '#39A657', '#2D8444'],

    // Accent
    accent: '#39A657',
    accentLight: '#C8ECA8',
    accentSoft: 'rgba(57, 166, 87, 0.1)',

    // Backgrounds (Figma light: Surface BG #F1F1F4, Card #FFFFFF + stroke rgba(0,0,0,0.24))
    background: '#F1F1F4',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardElevated: '#FFFFFF',
    cardGlass: '#FFFFFF',
    cardGlassBorder: 'rgba(0, 0, 0, 0.08)',
    modal: '#FFFFFF',

    // Text (Figma light: Primary #161E14, Subheading #1B4E21, Body #707070, Disabled #808080, Button #FFFFFF)
    text: '#161E14',
    textSubheading: '#1B4E21',
    textSecondary: '#707070',
    textTertiary: '#999999',
    textDisabled: '#808080',
    textButton: '#FFFFFF',
    textInverse: '#FFFFFF',
    textOnPrimary: '#FFFFFF',
    textMuted: 'rgba(22, 30, 20, 0.35)',

    // Inputs
    inputBackground: '#EBEBEB',
    inputBorder: 'rgba(0, 0, 0, 0.1)',
    inputText: '#161E14',
    inputPlaceholder: '#999999',
    inputFocusBorder: '#39A657',

    // Chips
    chipBackground: '#EBEBEB',
    chipSelectedBackground: 'rgba(57,166,87,0.15)',
    chipBorder: 'rgba(0,0,0,0.08)',
    chipSelectedBorder: '#39A657',
    chipText: '#707070',
    chipSelectedText: '#161E14',

    // Cards
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    cardShadow: 'rgba(22, 30, 20, 0.06)',

    // Health card (stays premium dark green in light mode for contrast)
    healthCardBackground: '#1F2937',
    healthCardBorder: '#374151',
    healthCardGradient: ['#1F2937', '#2D3748', '#374151'],
    healthCardText: '#FFFFFF',
    healthCardSubtext: 'rgba(255, 255, 255, 0.7)',
    healthCardBadgeBg: 'rgba(255, 255, 255, 0.15)',

    // Status (exact Figma semantic: warning #FF9200, error #DB5034)
    success: '#39A657',
    successSoft: 'rgba(57, 166, 87, 0.12)',
    warning: '#FF9200',
    warningSoft: 'rgba(255, 146, 0, 0.12)',
    error: '#DB5034',
    errorSoft: 'rgba(219, 80, 52, 0.12)',
    info: '#3B82F6',
    infoSoft: 'rgba(59, 130, 246, 0.1)',

    // Bottom nav
    navBackground: '#FFFFFF',
    navBorder: 'rgba(0,0,0,0.08)',
    navActive: '#161E14',
    navInactive: 'rgba(22,30,20,0.35)',
    navFabBg: '#FFFFFF',
    navFabIcon: '#161E14',

    // Slider
    sliderTrack: '#E0E0E0',
    sliderActive: '#39A657',
    sliderThumb: '#39A657',

    // Progress bar
    progressBackground: '#E0E0E0',
    progressFill: '#39A657',

    // Vault / Storage
    vaultProgressGradient: ['#EF4444', '#F97316', '#EAB308'],

    // Badges
    badgeBackground: '#FEF3C7',
    badgeText: '#92400E',
    newBadgeBg: 'rgba(123, 206, 82, 0.15)',
    newBadgeText: '#4A8F2C',
    newBadgeBorder: 'rgba(123, 206, 82, 0.35)',

    // Blood group
    bloodGroupBg: '#7BCE52',
    bloodGroupText: '#0F1419',

    // Insights card
    insightsCardBg: '#FFFFFF',
    insightsCardBorder: '#EDEFF2',

    // Log cards
    stepCardBg: '#FFFFFF',
    stepCardAccent: '#F59E0B',
    waterCardBg: '#FFFFFF',
    waterCardAccent: '#3B82F6',
    addCardBg: '#F2F4F6',

    // Category cards
    categoryCardBg: '#FFFFFF',
    categoryCardBorder: '#EDEFF2',
    categoryCardIcon: '#7BCE52',

    // Divider
    divider: '#EDEFF2',

    // Overlay
    overlay: 'rgba(15, 20, 25, 0.5)',

    // Search
    searchBackground: '#F2F4F6',
    searchIcon: '#A8ABB0',
    searchText: '#0F1419',
    searchPlaceholder: '#A8ABB0',
    searchBorder: '#E8EAED',

    // Toggle
    toggleActive: '#7BCE52',
    toggleInactive: '#D1D5DB',
    toggleThumb: '#FFFFFF',

    // Misc
    skeleton: '#E8EAED',
    ripple: 'rgba(123, 206, 82, 0.15)',
    tabBarIndicator: '#7BCE52',
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
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export default lightTheme;
