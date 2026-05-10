import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';
import Svg, { Path, Line as SvgLine } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - 24 * 2 - 16) / 2;

/* ─── Health Score Data ─── */
const HEALTH_SCORES = [
  { label: 'ACTIVITY SCORE', status: 'Optimal', pct: 82, color: '#6FFB85', barColor: '#6FFB85' },
  { label: 'MENTAL WELLBEING', status: 'Needs Attention', pct: 50, color: '#FF9500', barColor: '#FF9500' },
  { label: 'SLEEP SCORE', status: 'Critical', pct: 30, color: '#DB5034', barColor: '#DB5034' },
  { label: 'READINESS SCORE', status: 'Optimal', pct: 82, color: '#6FFB85', barColor: '#6FFB85' },
  { label: 'WELLBEING SCORE', status: 'Optimal', pct: 82, color: '#6FFB85', barColor: '#6FFB85' },
];

/* ─── Coffee types for slider ─── */
const COFFEE_TYPES = [
  { name: 'Herbal Tea', icon: 'leaf-outline' as const },
  { name: 'Nescafe', icon: 'cafe-outline' as const },
  { name: 'Chai', icon: 'cafe' as const },
];

/* ─── Medication types for slider ─── */
const MEDICATION_TYPES = [
  { name: 'Vitamin D3', time: '9:30', period: 'PM' },
  { name: 'Omega 3', time: '8:00', period: 'AM' },
  { name: 'Vitamin B12', time: '1:00', period: 'PM' },
];

/* ─── Wave View (Water Animation) ─── */
function WaveView({ progress, color }: { progress: number; color: string }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: progress,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [progress, heightAnim]);

  const translateXAnim = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500],
  });

  const waveTranslateY = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CARD_SIZE, -20],
  });

  const wavePath = "M 0 10 Q 125 0 250 10 T 500 10 T 750 10 T 1000 10 T 1250 10 T 1500 10 V 400 H 0 Z";

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-start', overflow: 'hidden', borderRadius: 33 }]}>
      <Animated.View style={{ transform: [{ translateY: waveTranslateY }] }}>
        <Animated.View style={{ width: 1500, height: 400, position: 'absolute', transform: [{ translateX: translateXAnim }] }}>
          <Svg width="1500" height="400" viewBox="0 0 1500 400">
            <Path d={wavePath} fill={color} opacity={0.15} />
          </Svg>
        </Animated.View>
        <Animated.View style={{ width: 1500, height: 400, position: 'absolute', transform: [{ translateX: translateXAnim }] }}>
          <Svg width="1500" height="400" viewBox="0 0 1500 400" style={{ marginLeft: -250 }}>
            <Path d={wavePath} fill={color} opacity={0.3} />
          </Svg>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

/* ─── Sparkline Component (smooth curves) ─── */
function Sparkline({ color, width: w, height: h }: { color: string; width: number; height: number }) {
  const points = [30, 45, 25, 55, 30, 60, 35, 50, 40, 55, 30, 45, 35];
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => ({ x: i * step, y: h - (p / 65) * h }));
  let d = `M${coords[0].x},${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const cp1x = coords[i - 1].x + step / 3;
    const cp1y = coords[i - 1].y;
    const cp2x = coords[i].x - step / 3;
    const cp2y = coords[i].y;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${coords[i].x},${coords[i].y}`;
  }
  return (
    <Svg width={w} height={h}>
      <Path d={d} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/* ─── Sleep Stages Bar ─── */
function SleepStagesBar() {
  return (
    <View style={{ flexDirection: 'row', height: 8, borderRadius: 100, overflow: 'hidden', width: '100%' }}>
      <View style={{ flex: 15, backgroundColor: '#6366F1' }} />
      <View style={{ flex: 25, backgroundColor: '#312E81' }} />
      <View style={{ flex: 40, backgroundColor: '#4649DC' }} />
      <View style={{ flex: 20, backgroundColor: '#A5B4FC' }} />
    </View>
  );
}

/* ─── Steps Bar Chart ─── */
function StepsBarChart({ isDark }: { isDark: boolean }) {
  const bars = [21, 10, 38, 25, 12, 9, 14];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 42, width: '100%' }}>
      {bars.map((h, i) => (
        <View key={i} style={{ alignItems: 'center', flex: 1 }}>
          <View style={{
            width: 12,
            height: h,
            borderRadius: 2,
            backgroundColor: i === bars.length - 1 ? '#E66945' : (isDark ? '#373737' : '#E0E0E0'),
          }} />
          <Text style={{ color: '#767676', fontSize: 7, fontWeight: '600', marginTop: 2, fontFamily: 'Inter' }}>{days[i]}</Text>
        </View>
      ))}
    </View>
  );
}

/* ─── No Smoking SVG Icon ─── */
function NoSmokingIcon({ size = 18, color = '#DB5034' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 13h14v2H3v-2zm0 0" fill={color} opacity={0.6} />
      <Path d="M18 13h1v2h-1v-2zm2 0h1v2h-1v-2z" fill={color} />
      <Path d="M18 9c0-1.1-.9-2-2-2V5c2.2 0 4 1.8 4 4v2h-2V9zm-4-2c-1.1 0-2 .9-2 2v2h-2V9c0-2.2 1.8-4 4-4v2z" fill={color} />
      <SvgLine x1="2" y1="2" x2="22" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

/* ─── Weight Bars Visualization ─── */
function WeightBars({ color, width: w, height: h }: { color: string; width: number; height: number }) {
  const barCount = 20;
  const barWidth = 3;
  const gap = (w - barCount * barWidth) / (barCount - 1);
  const heights = [0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.9, 0.5, 0.8, 0.6, 0.4, 0.7, 0.5, 0.3];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: w, height: h }}>
      {heights.map((pct, i) => (
        <View
          key={i}
          style={{
            width: barWidth,
            height: Math.max(2, h * pct),
            backgroundColor: color,
            borderRadius: 1,
            marginRight: i < barCount - 1 ? gap : 0,
          }}
        />
      ))}
    </View>
  );
}

/* ─── Swipe Hook for Slider ─── */
function describeWedge(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY - (radius * Math.sin(angleInRadians))
    };
  };

  const startOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const startInner = polarToCartesian(x, y, innerRadius, startAngle);
  const endInner = polarToCartesian(x, y, innerRadius, endAngle);

  const d = [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, 0, 1, endOuter.x, endOuter.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, 0, 0, startInner.x, startInner.y,
    "Z"
  ].join(" ");

  return d;
}

function ActiveEnergyGauge({ progress = 7/11, isDark }: { progress?: number; isDark: boolean }) {
  const numWedges = 11;
  const activeWedges = Math.round(progress * numWedges);
  const outerRadius = 50;
  const innerRadius = 25;
  const center = { x: 55, y: 55 };
  const gapAngle = 4;
  const totalAngle = 180;
  const wedgeAngle = (totalAngle - (numWedges - 1) * gapAngle) / numWedges;
  
  const wedges = [];
  let currentAngle = 180;
  
  for (let i = 0; i < numWedges; i++) {
    const startAngle = currentAngle;
    const endAngle = currentAngle - wedgeAngle;
    
    wedges.push(
      <Path
        key={i}
        d={describeWedge(center.x, center.y, innerRadius, outerRadius, startAngle, endAngle)}
        fill={i < activeWedges ? '#FBD607' : (isDark ? '#2A2A2A' : '#EAEAEA')}
      />
    );
    
    currentAngle = endAngle - gapAngle;
  }
  
  return (
    <Svg width="110" height="60" viewBox="0 0 110 60">
      {wedges}
    </Svg>
  );
}

function useSwipe(count: number, indexRef: React.MutableRefObject<number>, setCurrent: (v: number) => void) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 15 && Math.abs(g.dy) < 30,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -30) {
          const next = Math.min(count - 1, indexRef.current + 1);
          indexRef.current = next;
          setCurrent(next);
        } else if (g.dx > 30) {
          const next = Math.max(0, indexRef.current - 1);
          indexRef.current = next;
          setCurrent(next);
        }
      },
    })
  ).current;
  return panResponder;
}

export default function VitalsMainScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [coffeeCups, setCoffeeCups] = useState(4);
  const [coffeeTypeIndex, setCoffeeTypeIndex] = useState(0);
  const [medTypeIndex, setMedTypeIndex] = useState(0);
  const [waterMl, setWaterMl] = useState(1250);
  const waterGoal = 2500;
  const waterProgress = Math.min(waterMl / waterGoal, 1);
  const waterPercent = Math.round(waterProgress * 100);

  const [activeEnergy, setActiveEnergy] = useState(1164);
  const energyGoal = 2000;
  const energyProgress = Math.min(activeEnergy / energyGoal, 1);

  const coffeeIndexRef = useRef(0);
  const medIndexRef = useRef(0);
  const coffeeSwipe = useSwipe(COFFEE_TYPES.length, coffeeIndexRef, setCoffeeTypeIndex);
  const medSwipe = useSwipe(MEDICATION_TYPES.length, medIndexRef, setMedTypeIndex);

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;
  const textPrimary = isDark ? '#FFFFFF' : c.text;
  const textSecondary = isDark ? '#AAAAAA' : c.textSecondary;
  const barTrack = isDark ? '#262626' : '#E0E0E0';

  const waterColor = '#40A9FF';
  const waterColorLight = '#2E86C1';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Vitals Dashboard" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ══ Health Scores ══ */}
        <View style={{ paddingHorizontal: 24, gap: 12, marginBottom: 24 }}>
          {HEALTH_SCORES.map((score, i) => (
            <TouchableOpacity key={i} activeOpacity={0.7} style={[styles.scoreCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <View style={styles.scoreTop}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.scoreLabel, { color: textSecondary }]}>{score.label}</Text>
                  <Text style={[styles.scoreStatus, { color: score.color }]}>{score.status}</Text>
                </View>
                <Text style={[styles.scorePct, { color: textPrimary }]}>{score.pct}%</Text>
              </View>
              <View style={[styles.scoreBarBg, { backgroundColor: barTrack }]}>
                <View style={[styles.scoreBarFill, { backgroundColor: score.barColor, width: `${score.pct}%` }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ══ Log Data Section ══ */}
        <Text style={[styles.sectionTitle, { color: textPrimary, fontFamily: 'Manrope' }]}>Log Data</Text>
        <View style={[styles.gridContainer, { paddingHorizontal: 24 }]}>

          {/* ── Coffee Card (with swipe slider, + and -) ── */}
          <View
            {...coffeeSwipe.panHandlers}
            style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(255,174,0,0.12)' }]}>
                <Ionicons name="cafe" size={18} color="#FFAE00" />
              </View>
              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: 'rgba(255,174,0,0.15)' }]}
                onPress={() => setCoffeeCups(prev => prev + 1)}
              >
                <Ionicons name="add" size={16} color="#FFAE00" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <Text style={[styles.logLabel, { color: textSecondary }]}>{COFFEE_TYPES[coffeeTypeIndex].name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={[styles.logValue, { color: textPrimary }]}>{coffeeCups} </Text>
                <Text style={{ color: isDark ? '#878686' : '#999', fontSize: 12, fontFamily: 'Inter' }}>cups</Text>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: 'rgba(255,174,0,0.15)' }]}
                  onPress={() => setCoffeeCups(prev => Math.max(0, prev - 1))}
                >
                  <Ionicons name="remove" size={16} color="#FFAE00" />
                </TouchableOpacity>
              </View>
              {/* Slider dots */}
              <View style={styles.sliderDots}>
                {COFFEE_TYPES.map((_, idx) => (
                  <TouchableOpacity key={idx} onPress={() => { coffeeIndexRef.current = idx; setCoffeeTypeIndex(idx); }}>
                    <View style={[
                      styles.dot,
                      { backgroundColor: idx === coffeeTypeIndex ? '#FFAE00' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)') },
                    ]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* ── Water Card (with wave animation) — BLUE color ── */}
          <View style={[styles.logCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : '#EAF4FE', borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE, padding: 0, overflow: 'hidden' }]}>
            <WaveView progress={waterProgress} color={isDark ? waterColor : waterColorLight} />
            <View style={{ padding: 19, flex: 1, zIndex: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <View style={[styles.logIconWrap, { backgroundColor: isDark ? 'rgba(64,169,255,0.12)' : 'rgba(46,134,193,0.12)' }]}>
                  <Ionicons name="water" size={18} color={isDark ? waterColor : waterColorLight} />
                </View>
                <Text style={{ color: textSecondary, fontSize: 14, fontWeight: '700', fontFamily: 'Inter' }}>{waterPercent}%</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: textPrimary, fontSize: 32, fontWeight: '800', fontFamily: 'Inter' }}>{waterMl}</Text>
                <Text style={{ color: textSecondary, fontSize: 9, fontFamily: 'Inter', marginTop: 2 }}>of {waterGoal} ml goal</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: isDark ? 'rgba(64,169,255,0.15)' : 'rgba(46,134,193,0.12)' }]}
                  onPress={() => setWaterMl(prev => prev + 250)}
                >
                  <Ionicons name="add" size={16} color={isDark ? waterColor : waterColorLight} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: isDark ? 'rgba(64,169,255,0.15)' : 'rgba(46,134,193,0.12)' }]}
                  onPress={() => setWaterMl(prev => Math.max(0, prev - 250))}
                >
                  <Ionicons name="remove" size={16} color={isDark ? waterColor : waterColorLight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Medication Card (with swipe slider) ── */}
          <View
            {...medSwipe.panHandlers}
            style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(12,163,120,0.12)' }]}>
                <Ionicons name="add-circle" size={18} color="#0CA378" />
              </View>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: 'rgba(12,163,120,0.1)' }]}>
                <Ionicons name="add" size={16} color="#0CA378" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <Text style={{ color: textSecondary, fontSize: 11, fontFamily: 'Inter' }}>Upcoming</Text>
              <Text style={{ color: textPrimary, fontSize: 15, fontWeight: '600', fontFamily: 'Inter', marginTop: 2 }}>{MEDICATION_TYPES[medTypeIndex].name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
                <Text style={{ color: textPrimary, fontSize: 26, fontWeight: '700', fontFamily: 'Inter' }}>{MEDICATION_TYPES[medTypeIndex].time}</Text>
                <Text style={{ color: textSecondary, fontSize: 11, fontFamily: 'Inter', marginLeft: 4 }}>{MEDICATION_TYPES[medTypeIndex].period}</Text>
              </View>
              {/* Slider dots */}
              <View style={styles.sliderDots}>
                {MEDICATION_TYPES.map((_, idx) => (
                  <TouchableOpacity key={idx} onPress={() => { medIndexRef.current = idx; setMedTypeIndex(idx); }}>
                    <View style={[
                      styles.dot,
                      { backgroundColor: idx === medTypeIndex ? '#0CA378' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)') },
                    ]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* ── Weight Card (vertical bars) ── */}
          <View style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(111,251,133,0.12)' }]}>
                <Ionicons name="barbell-outline" size={18} color="#6FFB85" />
              </View>
              <Text style={{ color: textSecondary, fontSize: 9, fontFamily: 'Inter' }}>2 days ago</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ color: textPrimary, fontSize: 36, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>124</Text>
                <Text style={{ color: c.primary, fontSize: 16, fontWeight: '500', fontFamily: 'Inter', marginLeft: 4 }}>kg</Text>
              </View>
              <View style={{ marginTop: 8, width: '100%', height: 30 }}>
                <WeightBars color={c.primary} width={CARD_SIZE - 40} height={30} />
              </View>
            </View>
          </View>

          {/* ── Cigarette / Smoking Card ── */}
          <View style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(219,80,52,0.12)' }]}>
                <NoSmokingIcon size={20} color="#DB5034" />
              </View>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: 'rgba(219,80,52,0.1)' }]}>
                <Ionicons name="add" size={16} color="#DB5034" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <Text style={{ color: textSecondary, fontSize: 10, fontFamily: 'Inter' }}>Last intake</Text>
              <Text style={{ color: textPrimary, fontSize: 14, fontWeight: '700', fontFamily: 'Inter', marginTop: 1 }}>12th March</Text>
              <View style={{ marginTop: 6, width: '100%', height: 28 }}>
                <Sparkline color="#DB5034" width={CARD_SIZE - 40} height={28} />
              </View>
              <Text style={{ color: '#DB5034', fontSize: 10, fontWeight: '600', fontFamily: 'Inter', marginTop: 4 }}>+12.5%</Text>
            </View>
          </View>

          {/* ── Alcohol / Wine Card ── */}
          <View style={[styles.logCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(219,80,52,0.12)' }]}>
                <Ionicons name="wine" size={18} color="#DB5034" />
              </View>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: 'rgba(219,80,52,0.1)' }]}>
                <Ionicons name="add" size={16} color="#DB5034" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
              <Text style={{ color: textSecondary, fontSize: 10, fontFamily: 'Inter' }}>Last intake</Text>
              <Text style={{ color: textPrimary, fontSize: 14, fontWeight: '700', fontFamily: 'Inter', marginTop: 1 }}>12th March</Text>
              <View style={{ marginTop: 6, width: '100%', height: 28 }}>
                <Sparkline color="#DB5034" width={CARD_SIZE - 40} height={28} />
              </View>
              <Text style={{ color: '#DB5034', fontSize: 10, fontWeight: '600', fontFamily: 'Inter', marginTop: 4 }}>+12.5%</Text>
            </View>
          </View>
        </View>

        {/* ══ Vitals Section ══ */}
        <Text style={[styles.sectionTitle, { color: textPrimary, fontFamily: 'Manrope' }]}>Vitals</Text>
        <View style={[styles.gridContainer, { paddingHorizontal: 24 }]}>

          {/* ── Floors Climbed ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE, position: 'relative' }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(243,39,136,0.16)' }]}>
              <Ionicons name="trending-up" size={18} color="#F32788" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>Floors Climbed</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={[styles.vitalsValueLg, { color: textPrimary }]}>12</Text>
              <Text style={{ color: '#F32788', fontSize: 14, fontFamily: 'Inter', marginLeft: 2 }}>/15</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 18, right: 18 }}>
              <Svg width="45" height="35" viewBox="0 0 45 35">
                <Path d="M 0 33 L 11 33 L 11 22 L 22 22 L 22 11 L 33 11 L 33 0 L 44 0" stroke="#F32788" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
          </View>

          {/* ── Sleep ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(129,140,248,0.32)' }]}>
              <Ionicons name="moon" size={18} color="#A5B4FC" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>Sleep</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={[styles.vitalsValueMd, { color: textPrimary }]}>7h 42m</Text>
            </View>
            <View style={{ marginTop: 8, width: '100%' }}>
              <SleepStagesBar />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={{ color: textSecondary, fontSize: 7, fontWeight: '600', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>11:00 PM</Text>
                <Text style={{ color: textSecondary, fontSize: 7, fontWeight: '600', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>06:42 AM</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 6, gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#312E81' }} />
                  <Text style={{ color: textPrimary, fontSize: 7, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>Deep</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#4649DC' }} />
                  <Text style={{ color: textPrimary, fontSize: 7, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>Core</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#6366F1' }} />
                  <Text style={{ color: textPrimary, fontSize: 7, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>Rem</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#A5B4FC' }} />
                  <Text style={{ color: textPrimary, fontSize: 7, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: 0.4 }}>Awake</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── VO2 Max ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(170,225,18,0.16)' }]}>
              <Ionicons name="fitness" size={18} color="#AAE112" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>VO2 Max</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={[styles.vitalsValueLg, { color: textPrimary }]}>42</Text>
              <Text style={{ color: '#AAE112', fontSize: 12, fontFamily: 'Inter', marginLeft: 4 }}>mL/kg/min</Text>
            </View>
          </View>

          {/* ── Active Energy ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE, padding: 0 }]}>
            <View style={{ padding: 19, flex: 1, zIndex: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(251,214,7,0.16)' }]}>
                  <Ionicons name="flame" size={18} color="#FBD607" />
                </View>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <TouchableOpacity 
                    style={[styles.addBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}
                    onPress={() => setActiveEnergy(prev => Math.max(0, prev - 50))}
                  >
                    <Ionicons name="remove" size={16} color={textPrimary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.addBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}
                    onPress={() => setActiveEnergy(prev => prev + 50)}
                  >
                    <Ionicons name="add" size={16} color={textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[styles.vitalsValueLg, { color: textPrimary, fontSize: 30 }]} numberOfLines={1} adjustsFontSizeToFit>{activeEnergy}</Text>
                  <Text style={{ color: '#FBD607', fontSize: 12, fontFamily: 'Inter', marginLeft: 4, fontWeight: '600' }}>Kcal</Text>
                </View>
              </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>
               <ActiveEnergyGauge isDark={isDark} progress={energyProgress} />
            </View>
          </View>

          {/* ── Steps ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(230,105,69,0.16)' }]}>
              <Ionicons name="footsteps" size={18} color="#E66945" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>Steps</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={[styles.vitalsValueLg, { color: textPrimary }]}>6825</Text>
              <Text style={{ color: 'rgba(230,105,69,0.63)', fontSize: 12, fontFamily: 'Inter', marginLeft: 2 }}>/10000</Text>
            </View>
            <View style={{ marginTop: 4, width: '100%', flex: 1 }}>
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: '#E66945' }} />
              <StepsBarChart isDark={isDark} />
            </View>
          </View>

          {/* ── Heart Rate ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(255,89,0,0.16)' }]}>
                <Ionicons name="heart" size={18} color="#FF5900" />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: textSecondary, fontSize: 8, fontFamily: 'Inter' }}>Today</Text>
                <Text style={{ color: textSecondary, fontSize: 8, fontFamily: 'Inter' }}>08:20 AM</Text>
              </View>
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary, marginTop: 4 }]}>Heart Rate</Text>
            <View style={{ height: 24, marginTop: 4, width: '100%' }}>
              <Svg width="100%" height="24" viewBox="0 0 100 24">
                <Path d="M0,12 L30,12 L40,4 L50,20 L60,12 L100,12" stroke="#FF5900" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
              </Svg>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={{ color: textPrimary, fontSize: 36, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>104</Text>
              <Text style={{ color: '#FF5900', fontSize: 14, fontFamily: 'Inter', marginLeft: 2 }}>bpm</Text>
            </View>
          </View>

          {/* ── SpO2 ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(43,255,0,0.16)' }]}>
              <Ionicons name="pulse" size={18} color="#2BFF00" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>SpO2</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
              <Text style={[styles.vitalsValueLg, { color: textPrimary }]}>98</Text>
              <Text style={{ color: '#2BFF00', fontSize: 14, fontFamily: 'Inter', marginLeft: 2 }}>%</Text>
            </View>
            <View style={{ marginTop: 8, width: '100%' }}>
              <View style={[styles.progressBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#E0E0E0' }]}>
                <View style={[styles.progressFill, { backgroundColor: '#2BFF00', width: '95%' }]} />
              </View>
            </View>
          </View>

          {/* ── Blood Pressure ── */}
          <View style={[styles.vitalsCard, { backgroundColor: cardBg, borderColor: cardBorder, width: CARD_SIZE, height: CARD_SIZE }]}>
            <View style={[styles.vitalsIconWrap, { backgroundColor: 'rgba(207,102,255,0.32)' }]}>
              <Ionicons name="water-outline" size={18} color="#CF66FF" />
            </View>
            <Text style={[styles.vitalsLabel, { color: textSecondary }]}>Blood Pressure</Text>
            <View style={{ marginTop: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ color: textPrimary, fontSize: 34, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>118</Text>
                <Text style={{ color: '#CF66FF', fontSize: 9, fontFamily: 'Inter', marginLeft: 4 }}>mm/hg</Text>
                <Text style={{ color: textSecondary, fontSize: 10, fontFamily: 'Inter', marginLeft: 6 }}>SYS</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 0 }}>
                <Text style={{ color: textPrimary, fontSize: 28, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>80</Text>
                <Text style={{ color: '#CF66FF', fontSize: 9, fontFamily: 'Inter', marginLeft: 4 }}>mm/hg</Text>
                <Text style={{ color: textSecondary, fontSize: 10, fontFamily: 'Inter', marginLeft: 6 }}>DIA</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize',
    paddingHorizontal: 25,
    marginTop: 24,
    marginBottom: 16,
  },

  /* Score Cards */
  scoreCard: {
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 48,
  },
  scoreTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  scoreStatus: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    fontFamily: 'Inter',
  },
  scorePct: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  scoreBarBg: {
    height: 6,
    borderRadius: 9999,
    position: 'absolute',
    bottom: 16,
    left: 28,
    right: 28,
  },
  scoreBarFill: {
    height: 6,
    borderRadius: 9999,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },

  /* Grid */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  /* Log Cards */
  logCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 19,
  },
  logIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: 'Inter',
  },
  logValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  logValueLg: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  /* Vitals Cards */
  vitalsCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 19,
    overflow: 'hidden',
  },
  vitalsIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalsLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: 'Inter',
  },
  vitalsValueLg: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -0.6,
    fontFamily: 'Inter',
  },
  vitalsValueMd: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1.4,
    fontFamily: 'Inter',
  },

  /* Progress */
  progressBg: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 9999,
  },
});
