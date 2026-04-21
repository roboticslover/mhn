import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';

const { width: SCREEN_W } = Dimensions.get('window');

export type NavTab = 'home' | 'ai' | 'add' | 'card' | 'sos';

interface BottomNavBarProps {
  activeTab: NavTab;
  navigation: any;
}

// ── Home icon (outline = Home.svg, filled = Home-1.svg) ──
function HomeIcon({ active, activeColor, inactiveColor }: { active: boolean; activeColor: string; inactiveColor: string }) {
  const color = active ? activeColor : inactiveColor;
  if (active) {
    return (
      <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
        <Path
          d="M14.9453 2.5C17.3728 2.5 20.2417 5.29395 22.0654 6.7627C26.1966 10.5939 26.9629 10.1029 26.9629 17.1416C26.9628 27.5 24.5141 27.5 14.9805 27.5C5.44691 27.5 2.9981 27.5 2.99805 17.1416C2.99805 10.103 3.76547 10.5937 7.89648 6.7627C9.70393 5.30774 12.5166 2.50016 14.9453 2.5ZM11.3477 19.4189C10.9334 19.4189 10.5977 19.7547 10.5977 20.1689C10.5979 20.5829 10.9336 20.9189 11.3477 20.9189H18.6162C19.0303 20.9189 19.3659 20.5829 19.3662 20.1689C19.3662 19.7547 19.0304 19.4189 18.6162 19.4189H11.3477Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
      <Path
        d="M11.3486 20.1699H18.6173"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M2.99805 17.1412C2.99805 10.1025 3.76555 10.5937 7.8968 6.7625C9.7043 5.3075 12.5168 2.5 14.9455 2.5C17.373 2.5 20.2418 5.29375 22.0655 6.7625C26.1968 10.5937 26.963 10.1025 26.963 17.1412C26.963 27.5 24.5143 27.5 14.9805 27.5C5.44681 27.5 2.99805 27.5 2.99805 17.1412Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Card icon (wallet icon) ──
function CardIcon({ active, activeColor, inactiveColor }: { active: boolean; activeColor: string; inactiveColor: string }) {
  const color = active ? activeColor : inactiveColor;
  return (
    <Svg width={24} height={21} viewBox="0 0 32 27" fill="none">
      <Path
        d="M25.3333 0H6.66667C2.98533 0 0 2.98533 0 6.66667V20C0 23.6813 2.98533 26.6667 6.66667 26.6667H25.3333C29.0147 26.6667 32 23.6813 32 20V6.66667C32 2.98533 29.0147 0 25.3333 0ZM8.66667 6.66667C10.508 6.66667 12 8.15867 12 10C12 11.8413 10.508 13.3333 8.66667 13.3333C6.82533 13.3333 5.33333 11.8413 5.33333 10C5.33333 8.15867 6.82533 6.66667 8.66667 6.66667ZM12.2707 19.972C12.18 19.9907 12.0893 20 11.9987 20C11.38 20 10.8253 19.5667 10.6947 18.9373C10.5013 18.008 9.64933 17.3333 8.66667 17.3333C7.684 17.3333 6.832 18.008 6.63867 18.9373C6.48933 19.6573 5.78267 20.116 5.06267 19.972C4.34133 19.8227 3.87733 19.116 4.028 18.3947C4.47467 16.2347 6.42667 14.6653 8.66667 14.6653C10.9067 14.6653 12.8587 16.2347 13.3053 18.3947C13.4547 19.116 12.992 19.8213 12.2707 19.972ZM24 20H18.6667C17.9307 20 17.3333 19.4027 17.3333 18.6667C17.3333 17.9307 17.9307 17.3333 18.6667 17.3333H24C24.736 17.3333 25.3333 17.9307 25.3333 18.6667C25.3333 19.4027 24.736 20 24 20ZM26.6667 14.6667H18.6667C17.9307 14.6667 17.3333 14.0693 17.3333 13.3333C17.3333 12.5973 17.9307 12 18.6667 12H26.6667C27.4027 12 28 12.5973 28 13.3333C28 14.0693 27.4027 14.6667 26.6667 14.6667ZM26.6667 9.33333H18.6667C17.9307 9.33333 17.3333 8.736 17.3333 8C17.3333 7.264 17.9307 6.66667 18.6667 6.66667H26.6667C27.4027 6.66667 28 7.264 28 8C28 8.736 27.4027 9.33333 26.6667 9.33333Z"
        fill={color}
      />
    </Svg>
  );
}

// ── Plus / Add icon ──
function AddIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 13 13" fill="none">
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M6.32798 0C6.93383 0 7.42501 0.491146 7.42501 1.09703V11.553C7.42501 12.159 6.93383 12.65 6.32798 12.65C5.72213 12.65 5.23096 12.159 5.23096 11.553V1.09703C5.23096 0.491146 5.72213 0 6.32798 0Z"
        fill="#000"
      />
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M0 6.32164C0 5.71578 0.491161 5.22461 1.09703 5.22461H11.5639C12.1697 5.22461 12.6609 5.71578 12.6609 6.32164C12.6609 6.92749 12.1697 7.41866 11.5639 7.41866H1.09703C0.491161 7.41866 0 6.92749 0 6.32164Z"
        fill="#000"
      />
    </Svg>
  );
}

// ── SOS icon (circle with X) — uses Frame 1171279178.svg ──
function SOSIcon({ active, activeColor, inactiveColor }: { active: boolean; activeColor: string; inactiveColor: string }) {
  const color = active ? activeColor : inactiveColor;
  return (
    <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M19.9498 10.0509C20.3403 10.4414 20.2725 11.1423 19.7984 11.6165L11.6159 19.799C11.1417 20.2732 10.4408 20.3409 10.0503 19.9504C9.65978 19.5598 9.72744 18.859 10.2017 18.3847L18.3842 10.2022C18.8583 9.72811 19.5593 9.66035 19.9498 10.0509Z"
        fill={color}
      />
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M10.0502 10.0509C10.4407 9.66035 11.1414 9.72779 11.6151 10.2015L19.7991 18.3855C20.2728 18.8592 20.3402 19.5598 19.9497 19.9504C19.5592 20.3409 18.8586 20.2734 18.3848 19.7997L10.2009 11.6157C9.72715 11.142 9.65971 10.4414 10.0502 10.0509Z"
        fill={color}
      />
      <Circle cx={15} cy={15} r={14} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

// ── AI icon (sparkle-style using Ionicons fallback) ──
function AIIcon({ active, activeColor, inactiveColor }: { active: boolean; activeColor: string; inactiveColor: string }) {
  const color = active ? activeColor : inactiveColor;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={color}
      />
      <Path
        d="M19 14L19.75 17.25L23 18L19.75 18.75L19 22L18.25 18.75L15 18L18.25 17.25L19 14Z"
        fill={color}
      />
    </Svg>
  );
}

export default function BottomNavBar({ activeTab, navigation }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  const handlePress = (key: NavTab) => {
    if (key === activeTab) return;
    switch (key) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'card':
        navigation.navigate('HealthWallet');
        break;
      default:
        break;
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 8 }]}>
      <View style={[styles.bar, { backgroundColor: c.navBackground, shadowColor: c.navBackground === '#FFFFFF' ? '#000' : c.primary }]}>
        {/* Home */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => handlePress('home')}>
          <HomeIcon active={activeTab === 'home'} activeColor={c.navActive} inactiveColor={c.navInactive} />
        </TouchableOpacity>

        {/* AI */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => handlePress('ai')}>
          <AIIcon active={activeTab === 'ai'} activeColor={c.navActive} inactiveColor={c.navInactive} />
        </TouchableOpacity>

        {/* Add (center FAB) */}
        <TouchableOpacity style={[styles.centerBtn, { backgroundColor: c.navFabBg, borderColor: c.navBorder }]} activeOpacity={0.8} onPress={() => handlePress('add')}>
          <AddIcon />
        </TouchableOpacity>

        {/* Card / Health Wallet */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => handlePress('card')}>
          <CardIcon active={activeTab === 'card'} activeColor={c.navActive} inactiveColor={c.navInactive} />
        </TouchableOpacity>

        {/* SOS */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => handlePress('sos')}>
          <SOSIcon active={activeTab === 'sos'} activeColor={c.navActive} inactiveColor={c.navInactive} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bar: {
    width: Math.min(SCREEN_W - 40, 353),
    height: 66,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  tabItem: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
