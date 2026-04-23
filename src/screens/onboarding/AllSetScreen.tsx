import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import SvgIcon from '../../components/SvgIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeToggle from '../../components/ThemeToggle';
import AuroraBackground from '../../components/AuroraBackground';
import { useTheme } from '../../theme/ThemeProvider';

const { width: SCREEN_W } = Dimensions.get('window');

const WELCOME_IMAGE = require('../../../assets/welcome_screen.png');

interface Props {
  navigation: any;
}

export default function AllSetScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  // Slide-to-start
  const trackWidth = SCREEN_W - 48; // horizontal padding 24 each side
  const knobSize = 54;
  const maxSlide = trackWidth - knobSize - 8;
  const slideX = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState(false);

  const complete = () => {
    if (done) return;
    setDone(true);
    Animated.timing(slideX, {
      toValue: maxSlide,
      duration: 140,
      useNativeDriver: false,
    }).start(() => {
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const x = Math.min(Math.max(g.dx, 0), maxSlide);
        slideX.setValue(x);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx >= maxSlide * 0.75) {
          complete();
        } else {
          Animated.spring(slideX, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;

  const textOpacity = slideX.interpolate({
    inputRange: [0, maxSlide * 0.6],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? c.background : '#F5F7F4' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Aurora green radial glow background — dark only */}
      {isDark && <AuroraBackground />}

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <SvgIcon name="arrow-left" size={26} color={c.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <ThemeToggle variant="onboarding" size={36} />
      </View>

      {/* Content */}
      <View style={[styles.content, { justifyContent: 'center' }]}>
        <Image source={WELCOME_IMAGE} style={styles.welcomeImage} resizeMode="contain" />
        <Text style={[styles.title, { color: c.text, fontFamily: 'Inter' }]}>ALL SET!</Text>
        <Text style={[styles.subtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>Let's dive in</Text>

        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: c.textMuted }]} />
          <View style={[styles.dot, { backgroundColor: c.textMuted }]} />
          <View style={[styles.dot, { backgroundColor: c.textMuted }]} />
          <View style={[styles.dot, styles.dotActive, { backgroundColor: c.text }]} />
        </View>
      </View>

      {/* Slide to start */}
      <View style={[styles.sliderSection, { paddingBottom: insets.bottom + 18 }]}>
        <View style={[styles.track, { width: trackWidth, backgroundColor: c.card, borderColor: c.divider }]}>
          <Animated.Text style={[styles.trackText, { opacity: textOpacity, color: c.text, fontFamily: 'Inter' }]}>
            Slide to start
          </Animated.Text>
          <Animated.Text
            style={[styles.chevrons, { opacity: textOpacity, color: c.textMuted }]}>{'›››'}
          </Animated.Text>

          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.knob,
              {
                width: knobSize,
                height: knobSize,
                borderRadius: knobSize / 2,
                backgroundColor: c.text,
                transform: [{ translateX: slideX }],
              },
            ]}
          >
            <SvgIcon name="arrow-right" size={22} color={c.textOnPrimary} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  welcomeImage: {
    width: 220,
    height: 220,
    marginBottom: 8,
  },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 22 },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  dotActive: {
    width: 22,
  },
  sliderSection: {
    paddingHorizontal: 24,
  },
  track: { height: 62, borderRadius: 31, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, overflow: 'hidden' },
  trackText: { fontSize: 16, fontWeight: '700', marginRight: 10 },
  chevrons: { fontSize: 20, fontWeight: '700', letterSpacing: 2 },
  knob: {
    position: 'absolute',
    left: 4,
    top: 4,
    // backgroundColor applied inline via theme
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
