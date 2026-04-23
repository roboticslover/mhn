import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Circle, Path } from 'react-native-svg';
import SectionHeader from '../../components/SectionHeader';
import SvgIcon from '../../components/SvgIcon';

const { width: SCREEN_W } = Dimensions.get('window');
const H_PAD = 24;

// ─── Circular Progress Ring ───────────────────────────────────────────────────
function ProgressRing({
  size,
  strokeWidth,
  progress,
  color,
  trackColor,
}: {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  trackColor: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}

// ─── Checklist Item ───────────────────────────────────────────────────────────
function ChecklistItem({ label, done, primaryColor, textColor, mutedColor, boxBg }: { label: string; done: boolean; primaryColor: string; textColor: string; mutedColor: string; boxBg: string }) {
  return (
    <View style={[styles.checkRow, { backgroundColor: boxBg }]}>
      <View style={[
        styles.checkCircle,
        done ? { backgroundColor: primaryColor, borderColor: primaryColor } : { borderColor: mutedColor },
      ]}>
        {done && <Ionicons name="checkmark" size={14} color="#000" />}
      </View>
      <Text style={[styles.checkLabel, { color: done ? textColor : mutedColor, fontFamily: 'Inter' }]}>{label}</Text>
    </View>
  );
}

// ─── Health Score Card ────────────────────────────────────────────────────────
function HealthScoreCard({ label, status, value, color, cardBg, cardBorder, textColor, mutedColor, trend }: {
  label: string; status: string; value: number; color: string;
  cardBg: string; cardBorder: string; textColor: string; mutedColor: string; trend: 'up' | 'down';
}) {
  return (
    <TouchableOpacity style={[styles.scoreCard, { backgroundColor: cardBg, borderColor: cardBorder }]} activeOpacity={0.7}>
      <View style={styles.scoreContent}>
        <View style={styles.scoreLeft}>
          <Text style={[styles.scoreLabel, { color: mutedColor, fontFamily: 'Inter' }]}>{label}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={[styles.scoreStatus, { color, fontFamily: 'Inter' }]}>{status}</Text>
            <Ionicons name={trend === 'up' ? "arrow-up" : "arrow-down"} size={16} color={color} style={{ marginLeft: 6 }} />
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Ionicons name="chevron-forward" size={18} color={mutedColor} style={{ marginBottom: 4 }} />
          <Text style={[styles.scoreValue, { color: textColor, fontFamily: 'Inter' }]}>{value}%</Text>
        </View>
      </View>
      <View style={[styles.scoreBarTrack, { backgroundColor: cardBorder }]}>
        <View style={[styles.scoreBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </TouchableOpacity>
  );
}

// ─── Pinned Vital Card ────────────────────────────────────────────────────────
function PinnedVitalCard({ label, value, icon, iconColor, cardBg, cardBorder, textColor, mutedColor }: {
  label: string; value: string; icon?: string; iconColor?: string;
  cardBg: string; cardBorder: string; textColor: string; mutedColor: string;
}) {
  return (
    <View style={[styles.pinnedCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <View style={styles.pinnedCardLabel}>
        {icon && <Ionicons name={icon as any} size={13} color={iconColor ?? mutedColor} style={{ marginRight: 4 }} />}
        <Text style={[styles.pinnedLabel, { color: mutedColor, fontFamily: 'Inter' }]}>{label}</Text>
      </View>
      <Text style={[styles.pinnedValue, { color: textColor, fontFamily: 'Inter' }]}>{value}</Text>
    </View>
  );
}

// ─── Biomarker Card ───────────────────────────────────────────────────────────
function BiomarkerCard({ label, value, unit, status, statusColor, cardBg, cardBorder, textColor }: {
  label: string; value: string; unit: string; status: string; statusColor: string;
  cardBg: string; cardBorder: string; textColor: string;
}) {
  const badgeBg = statusColor + '33';
  return (
    <View style={[styles.bioCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <View style={styles.bioTop}>
        <Text style={[styles.bioLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
        <View style={[styles.bioBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.bioBadgeText, { color: statusColor, fontFamily: 'Inter' }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.bioBottom}>
        <Text style={[styles.bioValue, { color: statusColor, fontFamily: 'Inter' }]}>{value}</Text>
        <Text style={[styles.bioUnit, { color: statusColor, fontFamily: 'Inter' }]}>{unit}</Text>
      </View>
    </View>
  );
}

// ─── Wave View ────────────────────────────────────────────────────────────────
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
    outputRange: [160, -20],
  });

  const wavePath = "M 0 10 Q 125 0 250 10 T 500 10 T 750 10 T 1000 10 T 1250 10 T 1500 10 V 400 H 0 Z";

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-start', overflow: 'hidden', borderRadius: 24 }]}>
      <Animated.View style={{ transform: [{ translateY: waveTranslateY }] }}>
        <Animated.View style={{ width: 1500, height: 400, position: 'absolute', transform: [{ translateX: translateXAnim }] }}>
          <Svg width="1500" height="400" viewBox="0 0 1500 400">
            <Path d={wavePath} fill={color} opacity={0.3} />
          </Svg>
        </Animated.View>
        <Animated.View style={{ width: 1500, height: 400, position: 'absolute', transform: [{ translateX: translateXAnim }] }}>
          <Svg width="1500" height="400" viewBox="0 0 1500 400" style={{ marginLeft: -250 }}>
            <Path d={wavePath} fill={color} />
          </Svg>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// ─── Recent Upload Row ────────────────────────────────────────────────────────
function RecentRow({ date, icon, title, tag, isSynced, primaryColor, textColor, mutedColor, cardBg, cardBorder }: {
  date: string; icon: string; title: string; tag?: string; isSynced?: boolean;
  primaryColor: string; textColor: string; mutedColor: string; cardBg: string; cardBorder: string;
}) {
  return (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16, 
        backgroundColor: cardBg, 
        borderColor: cardBorder, 
        borderWidth: 1, 
        borderRadius: 24, 
        marginBottom: 12,
        height: 100
      }} 
      activeOpacity={0.7}
    >
      <View style={{ width: 50 }}>
        <Text style={{ color: mutedColor, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>{date}</Text>
      </View>
      
      <View style={{ width: 40, alignItems: 'center' }}>
        <Ionicons name={icon as any} size={24} color={textColor} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text style={{ color: textColor, fontSize: 16, fontWeight: '700', fontFamily: 'Inter' }} numberOfLines={2}>{title}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {tag && (
          <View style={{ backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
            <Text style={{ color: '#22c55e', fontSize: 10, fontWeight: '800' }}>{tag}</Text>
          </View>
        )}
        {isSynced && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' }} />
            <Text style={{ color: mutedColor, fontSize: 10, fontWeight: '700' }}>SYNCED</Text>
          </View>
        )}
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="download-outline" size={20} color={mutedColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Connect Row ──────────────────────────────────────────────────────────────
function ConnectRow({ icon, label, subtitle, badge, primaryColor, textColor, mutedColor, iconBg, badgeBg, onPress }: {
  icon: string; label: string; subtitle: string; badge?: string;
  primaryColor: string; textColor: string; mutedColor: string; iconBg: string; badgeBg: string; onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.connectRow} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.connectIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={22} color={primaryColor} />
      </View>
      <View style={styles.connectText}>
        <Text style={[styles.connectLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
        <Text style={[styles.connectSub, { color: mutedColor, fontFamily: 'Inter' }]}>{subtitle}</Text>
      </View>
      {badge && (
        <View style={[styles.connectBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.connectBadgeText, { color: primaryColor, fontFamily: 'Inter' }]}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Health Info Row ──────────────────────────────────────────────────────────
function HealthInfoRow({ icon, label, primaryColor, textColor, mutedColor, iconBg, rowBorder, onPress, svgName }: { 
  icon?: string; 
  label: string; 
  primaryColor: string; 
  textColor: string; 
  mutedColor: string; 
  iconBg: string; 
  rowBorder: string; 
  onPress?: () => void;
  svgName?: any;
}) {
  return (
    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: rowBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.infoRowLeft}>
        <View style={[styles.infoIcon, { backgroundColor: iconBg }]}>
          {svgName ? (
            <SvgIcon name={svgName} size={18} color={primaryColor} />
          ) : (
            <Ionicons name={icon as any} size={18} color={primaryColor} />
          )}
        </View>
        <Text style={[styles.infoLabel, { color: textColor, fontFamily: 'Inter' }]}>{label}</Text>
      </View>
      <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: iconBg, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="add" size={18} color={primaryColor} />
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme, isDark } = useTheme();
  const c = theme.colors;
  const scrollRef = useRef<ScrollView>(null);
  
  const [coffeeCups, setCoffeeCups] = useState(0);
  const [waterMl, setWaterMl] = useState(0);

  const waterGoal = 5000;
  const waterProgress = Math.min(waterMl / waterGoal, 1);
  const waterPercent = Math.round(waterProgress * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const cardBg = c.card;
  const cardBorder = c.cardGlassBorder;
  const iconBg = c.accentSoft;
  const rowBorder = c.divider ?? c.cardGlassBorder;
  const badgeBg = c.accentSoft;
  const editColor = '#3B82F6'; // Blue for Edit buttons

  const HEALTH_SCORES: { label: string; status: string; value: number; color: string; trend: 'up' | 'down' }[] = [
    { label: 'ACTIVITY SCORE', status: 'Optimal', value: 82, color: c.success, trend: 'up' },
    { label: 'MENTAL WELLBEING', status: 'Needs Attention', value: 50, color: c.warning, trend: 'down' },
    { label: 'SLEEP SCORE', status: 'Critical', value: 30, color: c.error, trend: 'down' },
    { label: 'READINESS SCORE', status: 'Optimal', value: 82, color: c.success, trend: 'up' },
    { label: 'WELLBEING SCORE', status: 'Optimal', value: 82, color: c.success, trend: 'up' },
  ];


  const RECENT_UPLOADS = [
    { date: '24 OCT', icon: 'document-text-outline', title: 'Blood Panel (Metabolic)', tag: 'NEW' },
    { date: '21 OCT', icon: 'heart-outline', title: 'ECG Summary', isSynced: true },
    { date: '15 OCT', icon: 'thermometer-outline', title: 'Annual Immunization', isSynced: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={[styles.avatarBorder, { borderColor: c.cardGlassBorder }]} onPress={() => navigation.navigate('Profile')}>
              <View style={[styles.avatar, { backgroundColor: c.cardElevated }]}>
                <Ionicons name="person" size={18} color={c.textSecondary} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={[styles.greeting, { color: c.textSecondary, fontFamily: 'Inter' }]}>{getGreeting()},</Text>
              <Text style={[styles.userName, { color: c.text, fontFamily: 'Inter' }]}>Deepika!</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={[styles.notifBtn, { backgroundColor: cardBg, borderColor: cardBorder }]} onPress={toggleTheme}>
              <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={20} color={c.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.notifBtn, { backgroundColor: cardBg, borderColor: cardBorder }]} onPress={() => navigation.navigate('NotificationsList')}>
              <Ionicons name="notifications-outline" size={20} color={c.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ══ SETUP HEALTH PROFILE ════════════════════════════════════════════ */}
        <View style={[styles.setupCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.setupTop}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.setupTitle, { color: c.text, fontFamily: 'Inter' }]}>Set up your health profile</Text>
              <Text style={[styles.setupSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>1 of 4 done</Text>
            </View>
            <View style={[styles.ringWrap, { borderColor: c.cardGlassBorder, borderWidth: 1, backgroundColor: 'transparent' }]}>
              <View style={[StyleSheet.absoluteFill, { borderColor: c.primary, borderWidth: 1.5, borderRadius: 22, borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: [{ rotate: '45deg' }] }]} />
              <Text style={[styles.ringPct, { color: c.primary, fontFamily: 'Inter' }]}>25%</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '25%', backgroundColor: c.primary }]} />
          </View>
          <View style={styles.checklist}>
            <ChecklistItem label="Create profile" done primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} boxBg={c.background} />
            <ChecklistItem label="Connect wearable" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} boxBg={c.background} />
            <ChecklistItem label="Upload record" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} boxBg={c.background} />
            <ChecklistItem label="Add family member" done={false} primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} boxBg={c.background} />
          </View>
          <TouchableOpacity style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: c.text, fontFamily: 'Inter' }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* ══ TODAY'S LOGS ════════════════════════════════════════════════════ */}
        <SectionHeader title="Today's Logs" rightText="Edit" rightColor={editColor} />
        <View style={styles.logsGrid}>
          {/* Coffee */}
          <View style={[styles.logGridCard, { backgroundColor: isDark ? '#13110d' : '#fff9f0', borderColor: cardBorder }]}>
            <View style={styles.logCardTop}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(245,158,11,0.12)' }]}>
                <Ionicons name="cafe" size={20} color="#F59E0B" />
              </View>
              <View style={{ gap: 8 }}>
                <TouchableOpacity 
                  style={[styles.logActionBtn, { backgroundColor: 'rgba(245,158,11,0.2)' }]}
                  onPress={() => setCoffeeCups(prev => prev + 1)}
                >
                  <Ionicons name="add" size={16} color="#F59E0B" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.logActionBtn, { backgroundColor: 'rgba(245,158,11,0.1)' }]}
                  onPress={() => setCoffeeCups(prev => Math.max(0, prev - 1))}
                >
                  <Ionicons name="remove" size={16} color="#F59E0B" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 'auto' }}>
              <Text style={[styles.logCardLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Coffee</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={[styles.logCardValue, { color: c.text, fontFamily: 'Inter' }]}>{coffeeCups}</Text>
                <Text style={[styles.logCardUnit, { color: c.textSecondary, fontFamily: 'Inter' }]}> cups</Text>
              </View>
              <View style={styles.logDots}>
                <View style={[styles.logDot, coffeeCups > 0 ? { backgroundColor: '#F59E0B' } : null]} />
                <View style={[styles.logDot, coffeeCups > 1 ? { backgroundColor: '#F59E0B' } : null]} />
                <View style={[styles.logDot, coffeeCups > 2 ? { backgroundColor: '#F59E0B' } : null]} />
              </View>
            </View>
          </View>

          {/* Water */}
          <View style={[styles.logGridCard, { backgroundColor: isDark ? '#0d131a' : '#f0f7ff', borderColor: cardBorder, padding: 0 }]}>
            <WaveView progress={waterProgress} color="#3B82F6" />
            <View style={{ padding: 16, flex: 1 }}>
              <View style={styles.logCardTop}>
                <View style={[styles.logIconWrap, { backgroundColor: 'rgba(59,130,246,0.12)' }]}>
                  <SvgIcon name="water_icon" size={20} color="#3B82F6" />
                </View>
                <Text style={{ color: c.textSecondary, fontSize: 14, fontWeight: '700' }}>{waterPercent}%</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 36, fontWeight: '800' }}>{waterMl}</Text>
                <Text style={{ color: c.textSecondary, fontSize: 10, fontWeight: '500' }}>of {waterGoal} ml goal</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', paddingBottom: 10 }}>
                <TouchableOpacity 
                  style={[styles.logActionBtn, { backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }]}
                  onPress={() => setWaterMl(prev => prev + 250)}
                >
                  <Ionicons name="add" size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.logActionBtn, { backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }]}
                  onPress={() => setWaterMl(prev => Math.max(0, prev - 250))}
                >
                  <Ionicons name="remove" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Cycle Phase */}
          <View style={[styles.logGridCard, { backgroundColor: isDark ? '#1a0d0d' : '#fff1f1', borderColor: cardBorder }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(239,68,68,0.12)' }]}>
              <Ionicons name="calendar" size={20} color="#EF4444" />
            </View>
            <View style={{ marginTop: 'auto' }}>
              <Text style={[styles.logCardLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Cycle Phase</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={[styles.logCardValue, { color: c.text, fontFamily: 'Inter' }]}>13</Text>
                <Text style={[styles.logCardUnit, { color: c.textSecondary, fontFamily: 'Inter' }]}> days left</Text>
              </View>
              <View style={styles.cycleIndicators}>
                <View style={[styles.cycleSegment, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.cycleSegment, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.cycleSegment, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.cycleSegment, { backgroundColor: 'rgba(239,68,68,0.2)' }]} />
              </View>
            </View>
          </View>

          {/* Add */}
          <TouchableOpacity style={[styles.logGridCard, { backgroundColor: cardBg, borderColor: cardBorder, alignItems: 'center', justifyContent: 'center' }]}>
            <Ionicons name="add" size={32} color={c.textSecondary} />
            <Text style={{ color: c.textSecondary, fontSize: 12, fontWeight: '700', marginTop: 8 }}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* ══ HEALTH SCORES ═══════════════════════════════════════════════════ */}
        <SectionHeader title="Health Scores" />
        <View style={styles.scoresList}>
          {HEALTH_SCORES.map((score, i) => (
            <HealthScoreCard key={i} {...score} cardBg={cardBg} cardBorder={cardBorder} textColor={c.text} mutedColor={c.textSecondary} />
          ))}
        </View>

        {/* ══ PINNED (VITALS) ══════════════════════════════════════════════════ */}
        <SectionHeader title="Pinned" rightText="Edit" rightColor={editColor} onRightPress={() => navigation.navigate('EditPinnedVitals')} />
        <View style={styles.pinnedGrid}>
          {/* Card 1: Sleep */}
          <View style={[styles.pinnedGridCard, { backgroundColor: isDark ? '#131521' : '#f5f7ff', borderColor: cardBorder }]}>
            <View style={[styles.pinnedIconRound, { backgroundColor: 'rgba(99,102,241,0.1)' }]}>
              <Ionicons name="moon-outline" size={16} color="#818cf8" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12 }}>
              <Text style={{ color: c.text, fontSize: 26, fontWeight: '700', fontFamily: 'Inter' }}>7h 42m</Text>
              <Text style={{ color: '#818cf8', fontSize: 10, fontWeight: '600', marginLeft: 6, fontFamily: 'Inter' }}>Duration</Text>
            </View>
            <View style={styles.sleepBars}>
              <View style={[styles.sleepBarSegment, { flex: 2, backgroundColor: '#6366f1', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
              <View style={[styles.sleepBarSegment, { flex: 1.5, backgroundColor: '#4f46e5' }]} />
              <View style={[styles.sleepBarSegment, { flex: 1, backgroundColor: '#818cf8' }]} />
              <View style={[styles.sleepBarSegment, { flex: 0.5, backgroundColor: '#c7d2fe', borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Text style={{ color: c.textSecondary, fontSize: 10, fontFamily: 'Inter' }}>11:00 PM</Text>
              <Text style={{ color: c.textSecondary, fontSize: 10, fontFamily: 'Inter' }}>06:42 AM</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Text style={{ color: '#4f46e5', fontSize: 8, fontWeight: '800' }}>● <Text style={{ color: c.textSecondary, fontWeight: '600' }}>DEEP</Text></Text>
              <Text style={{ color: '#6366f1', fontSize: 8, fontWeight: '800' }}>● <Text style={{ color: c.textSecondary, fontWeight: '600' }}>CORE</Text></Text>
              <Text style={{ color: '#818cf8', fontSize: 8, fontWeight: '800' }}>● <Text style={{ color: c.textSecondary, fontWeight: '600' }}>REM</Text></Text>
              <Text style={{ color: '#c7d2fe', fontSize: 8, fontWeight: '800' }}>● <Text style={{ color: c.textSecondary, fontWeight: '600' }}>AWAKE</Text></Text>
            </View>
          </View>

          {/* Card 2: Steps */}
          <View style={[styles.pinnedGridCard, { backgroundColor: isDark ? '#1d1310' : '#fffaf5', borderColor: cardBorder }]}>
            <View style={[styles.pinnedIconRound, { backgroundColor: 'rgba(249,115,22,0.1)' }]}>
              <Ionicons name="footsteps-outline" size={16} color="#f97316" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12 }}>
              <Text style={{ color: c.text, fontSize: 26, fontWeight: '700', fontFamily: 'Inter' }}>6825</Text>
              <Text style={{ color: 'rgba(249,115,22,0.6)', fontSize: 12, fontWeight: '600', fontFamily: 'Inter' }}>/10000</Text>
            </View>
            <View style={{ height: 60, marginTop: 10 }}>
              <View style={{ position: 'absolute', top: 25, left: 0, right: 0, height: 1.5, backgroundColor: '#f97316', zIndex: 1, opacity: 0.8 }} />
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, paddingBottom: 20 }}>
                {[
                  { d: 'S', h: 18 }, { d: 'M', h: 12 }, { d: 'T', h: 42 }, { d: 'W', h: 26 }, { d: 'T', h: 18 }, { d: 'F', h: 10 }, { d: 'S', h: 22 }
                ].map((item, i) => (
                  <View key={i} style={{ alignItems: 'center', width: 14 }}>
                    <View style={{ width: 12, height: item.h, backgroundColor: i === 6 ? '#f97316' : (isDark ? '#333' : '#eee'), borderRadius: 4, zIndex: 2 }} />
                    <Text style={{ color: i === 6 ? '#f97316' : c.textSecondary, fontSize: 10, fontWeight: i === 6 ? '700' : '500', fontFamily: 'Inter', marginTop: 4, position: 'absolute', bottom: -18 }}>{item.d}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Card 3: Heart Rate */}
          <View style={[styles.pinnedGridCard, { backgroundColor: isDark ? '#130d05' : '#fffcf0', borderColor: cardBorder }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={[styles.pinnedIconRound, { backgroundColor: 'rgba(249,115,22,0.1)' }]}>
                <Ionicons name="pulse-outline" size={16} color="#f97316" />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: c.textSecondary, fontSize: 10, fontFamily: 'Inter' }}>Today</Text>
                <Text style={{ color: c.textSecondary, fontSize: 10, fontFamily: 'Inter' }}>08:20 AM</Text>
              </View>
            </View>
            <Text style={{ color: c.textSecondary, fontSize: 12, marginTop: 12, fontFamily: 'Inter' }}>Heart Rate</Text>
            <View style={{ height: 30, marginTop: 4, justifyContent: 'center' }}>
               <Svg width="100%" height="30" viewBox="0 0 100 30">
                 <Path d="M0,15 L30,15 L40,5 L50,25 L60,15 L100,15" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
               </Svg>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
              <Text style={{ color: c.text, fontSize: 32, fontWeight: '700', fontFamily: 'Inter' }}>104</Text>
              <Text style={{ color: '#f97316', fontSize: 14, fontWeight: '600', marginLeft: 2, fontFamily: 'Inter' }}>bpm</Text>
            </View>
          </View>

          {/* Card 4: SpO2 */}
          <View style={[styles.pinnedGridCard, { backgroundColor: isDark ? '#0d180d' : '#f0fff0', borderColor: cardBorder }]}>
            <View style={[styles.pinnedIconRound, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
              <Ionicons name="water-outline" size={16} color="#22c55e" />
            </View>
            <Text style={{ color: c.text, fontSize: 16, fontWeight: '600', marginTop: 12, fontFamily: 'Inter' }}>SpO2</Text>
            <View style={{ height: 6, backgroundColor: '#22c55e20', borderRadius: 3, marginTop: 12 }}>
              <View style={{ width: '98%', height: '100%', backgroundColor: '#22c55e', borderRadius: 3 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
              <Text style={{ color: c.text, fontSize: 32, fontWeight: '700', fontFamily: 'Inter' }}>98</Text>
              <Text style={{ color: '#22c55e', fontSize: 14, fontWeight: '600', marginLeft: 2, fontFamily: 'Inter' }}>%</Text>
            </View>
          </View>
        </View>

        {/* ══ PINNED BIOMARKERS ════════════════════════════════════════════════ */}
        <SectionHeader title="Pinned Biomarkers" rightText="Edit" rightColor={editColor} onRightPress={() => navigation.navigate('EditPinnedBiomarkers')} />
        <View style={{ paddingHorizontal: H_PAD, marginBottom: 8 }}>
          {/* Blood Glucose */}
          <View style={[styles.biomarkerCard, { backgroundColor: cardBg, borderColor: 'rgba(34,197,94,0.15)' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: c.text, fontSize: 16, fontWeight: '500', fontFamily: 'Inter', letterSpacing: 0.5 }}>BLOOD GLUCOSE</Text>
              <View style={{ backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                <Text style={{ color: '#22c55e', fontSize: 11, fontWeight: '600', fontFamily: 'Inter' }}>STABLE</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12 }}>
              <Text style={{ color: '#22c55e', fontSize: 38, fontWeight: '300', fontFamily: 'Inter' }}>88</Text>
              <Text style={{ color: '#22c55e', fontSize: 15, marginLeft: 8, fontFamily: 'Inter' }}>mg/dL</Text>
            </View>
          </View>

          {/* Cholestrol */}
          <View style={[styles.biomarkerCard, { backgroundColor: cardBg, borderColor: 'rgba(249,115,22,0.15)' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: c.text, fontSize: 16, fontWeight: '500', fontFamily: 'Inter', letterSpacing: 0.5 }}>CHOLESTROL</Text>
              <View style={{ backgroundColor: 'rgba(249,115,22,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                <Text style={{ color: '#f97316', fontSize: 11, fontWeight: '600', fontFamily: 'Inter' }}>RISK</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 12 }}>
              <Text style={{ color: '#f97316', fontSize: 38, fontWeight: '300', fontFamily: 'Inter' }}>100</Text>
              <Text style={{ color: '#f97316', fontSize: 15, marginLeft: 8, fontFamily: 'Inter' }}>mg/dL</Text>
            </View>
          </View>
        </View>

        {/* ══ RECENTLY UPLOADED ════════════════════════════════════════════════ */}
        <SectionHeader title="Recently Uploaded" rightText="View More →" rightColor="#22C55E" onRightPress={() => navigation.navigate('MedicalRecords')} />
        <View style={{ paddingHorizontal: H_PAD }}>
          {RECENT_UPLOADS.map((item, i) => (
            <RecentRow 
              key={i}
              {...item}
              primaryColor={c.primary}
              textColor={c.text}
              mutedColor={c.textSecondary}
              cardBg={cardBg}
              cardBorder={cardBorder}
            />
          ))}
        </View>

        {/* ══ CONNECT ══════════════════════════════════════════════════════════ */}
        <SectionHeader title="Connect" />
        <View style={[styles.connectCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ConnectRow icon="people-outline" label="Family Connect" subtitle="Share health updates" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} badgeBg={badgeBg} onPress={() => navigation.navigate('FamilyConnectEmpty')} />
          <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
          <ConnectRow icon="medkit-outline" label="Doctor Connect" subtitle="Green medical care" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} badgeBg={badgeBg} onPress={() => navigation.navigate('DoctorConnectEmpty')} />
        </View>

        {/* ══ HEALTH INFORMATION ══════════════════════════════════════════════ */}
        <SectionHeader title="Health information" rightText="›" />
        <View style={[styles.infoCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <HealthInfoRow svgName="medical_info" label="Surgical History" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} onPress={() => navigation.navigate('MedicalInformation')} />
          <HealthInfoRow svgName="heart_emoji" label="Medical Conditions" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} onPress={() => navigation.navigate('MedicalInformation')} />
          <HealthInfoRow svgName="shield" label="Allergies" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} onPress={() => navigation.navigate('MedicalInformation')} />
          <HealthInfoRow svgName="document" label="Medications" primaryColor={c.primary} textColor={c.text} mutedColor={c.textSecondary} iconBg={iconBg} rowBorder={rowBorder} onPress={() => navigation.navigate('MedicalInformation')} />
        </View>

        {/* ══ PINNED VITALS EMPTY STATE ════════════════════════════════════════ */}
        <SectionHeader title="Pinned Vitals" rightText="Do it later" />
        <View style={[styles.emptyDashed, { borderColor: c.cardGlassBorder, backgroundColor: c.cardElevated }]}>
          <Text style={[styles.emptyTitle, { color: c.text, fontFamily: 'Inter' }]}>No pinned data</Text>
          <Text style={[styles.emptySub, { color: c.textSecondary, fontFamily: 'Inter' }]}>Pin upto 6 vitals to view data</Text>
        </View>

        {/* ══ WEARABLE CONNECT ════════════════════════════════════════════════ */}
        <View style={[styles.wearableCard, { backgroundColor: cardBg, borderColor: cardBorder, borderRadius: 24, paddingVertical: 16, paddingHorizontal: 16 }]}>
          <View style={[styles.wearableIconWrap, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
            <Ionicons name="watch-outline" size={26} color="#22C55E" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ color: c.text, fontSize: 15, fontWeight: '700', fontFamily: 'Inter' }}>Connect your wearable</Text>
            <Text style={{ color: c.textSecondary, fontSize: 12, marginTop: 2, fontFamily: 'Inter' }}>Sync your vitals seamlessly.</Text>
          </View>
          <TouchableOpacity style={[styles.wearableBtn, { backgroundColor: c.text, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 }]}>
            <Text style={{ color: c.background, fontSize: 13, fontWeight: '600', fontFamily: 'Inter' }}>Connect</Text>
          </TouchableOpacity>
        </View>

        {/* ══ HEALTH ARTICLES ═════════════════════════════════════════════════ */}
        <SectionHeader title="Health Articles" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.articlesScroll}>
          <View style={[styles.articleCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.articleImg, { backgroundColor: 'rgba(127,175,255,0.1)' }]}>
              <Ionicons name="people" size={40} color="#7fafff" />
            </View>
            <View style={styles.articleBody}>
              <Text style={[styles.articleCat, { color: '#7fafff', fontFamily: 'Inter' }]}>FAMILY HEALTH</Text>
              <Text style={[styles.articleTitle, { color: c.text, fontFamily: 'Inter' }]}>The Family Health Sharing{'\n'}Problem Decoded</Text>
            </View>
          </View>
          <View style={[styles.articleCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.articleImg, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="fitness" size={40} color={c.primary} />
            </View>
            <View style={styles.articleBody}>
              <Text style={[styles.articleCat, { color: c.primary, fontFamily: 'Inter' }]}>WELLNESS</Text>
              <Text style={[styles.articleTitle, { color: c.text, fontFamily: 'Inter' }]}>Mindfulness and{'\n'}Changing Habits</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

    </View>
  );
}

const CARD_STYLE = {
  borderRadius: 20 as number,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingVertical: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBorder: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  avatar: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  greeting: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  userName: { fontSize: 18, fontWeight: '700', lineHeight: 28 },
  notifBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },

  // ── Setup Card ───────────────────────────────────────────────────────────────
  setupCard: {
    marginHorizontal: H_PAD,
    ...CARD_STYLE,
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },
  setupTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  setupTitle: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
  setupSub: { fontSize: 14, fontWeight: '400', marginTop: 4, lineHeight: 18 },
  progressTrack: { height: 8, borderRadius: 4, marginTop: 14, overflow: 'hidden', backgroundColor: 'rgba(128,128,128,0.2)' },
  progressFill: { height: '100%', borderRadius: 4 },
  ringWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  ringPct: { fontSize: 13, fontWeight: '700' },
  checklist: { marginTop: 20, gap: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkLabel: { fontSize: 15, fontWeight: '500' },
  skipBtn: { alignSelf: 'center', marginTop: 20 },
  skipText: { fontSize: 15, fontWeight: '600' },

  // ── Logs ─────────────────────────────────────────────────────────────────────
  logsScroll: { paddingHorizontal: H_PAD, gap: 12, paddingBottom: 4, marginBottom: 28 },
  logCard: {
    width: 140, height: 150,
    ...CARD_STYLE,
    padding: 16,
    justifyContent: 'space-between',
  },
  logCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  logAddBtn: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  logCardLabel: { fontSize: 12, fontWeight: '500' },
  logCardValue: { fontSize: 22, fontWeight: '700' },
  logCardUnit: { fontSize: 12 },
  ringCardPct: { position: 'absolute', fontSize: 14, fontWeight: '700' },
  addLogCircle: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },

  // ── Health Scores ─────────────────────────────────────────────────────────────
  scoresList: { marginHorizontal: H_PAD, gap: 12, marginBottom: 28 },
  scoreCard: {
    ...CARD_STYLE,
    borderRadius: 33,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 44,
  },
  scoreContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  scoreLeft: { flex: 1 },
  scoreLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase' },
  scoreStatus: { fontSize: 20, fontWeight: '700', marginTop: 2 },
  scoreValue: { fontSize: 32, fontWeight: '700' },
  scoreBarTrack: { position: 'absolute', bottom: 18, left: 25, right: 25, height: 6, borderRadius: 3, overflow: 'hidden', borderWidth: 0 },
  scoreBarFill: { height: '100%', borderRadius: 3 },

  // ── Pinned Vitals ─────────────────────────────────────────────────────────────
  pinnedScroll: { paddingHorizontal: H_PAD, gap: 12, paddingBottom: 4, marginBottom: 28 },
  pinnedCard: {
    width: 140, height: 96,
    ...CARD_STYLE,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  pinnedCardLabel: { flexDirection: 'row', alignItems: 'center' },
  pinnedLabel: { fontSize: 12, fontWeight: '500' },
  pinnedValue: { fontSize: 24, fontWeight: '700' },

  // ── Biomarkers ────────────────────────────────────────────────────────────────
  bioList: { marginHorizontal: H_PAD, gap: 12, marginBottom: 28 },
  bioCard: { ...CARD_STYLE, borderRadius: 33, padding: 25 },
  bioTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bioLabel: { fontSize: 16, fontWeight: '500' },
  bioBadge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  bioBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: -0.5 },
  bioBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 },
  bioValue: { fontSize: 34, fontWeight: '300', letterSpacing: -0.68 },
  bioUnit: { fontSize: 14, fontWeight: '400' },

  // ── Recent Uploads ────────────────────────────────────────────────────────────
  recentList: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  recentRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  recentIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  recentTitle: { flex: 1, fontSize: 14, fontWeight: '500' },
  recentSub: { fontWeight: '400' },

  // ── Connect ───────────────────────────────────────────────────────────────────
  connectCard: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  connectRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  connectIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  connectText: { flex: 1 },
  connectLabel: { fontSize: 14, fontWeight: '600' },
  connectSub: { fontSize: 12, fontWeight: '400', marginTop: 2 },
  connectBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginRight: 8 },
  connectBadgeText: { fontSize: 11, fontWeight: '600' },
  divider: { height: 1, marginHorizontal: 16 },

  // ── Health Info ───────────────────────────────────────────────────────────────
  infoCard: { ...CARD_STYLE, borderRadius: 20, marginHorizontal: H_PAD, overflow: 'hidden', marginBottom: 28 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  infoRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 14, fontWeight: '500' },

  // ── Pinned Empty ──────────────────────────────────────────────────────────────
  emptyDashed: { marginHorizontal: H_PAD, borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', paddingVertical: 34, alignItems: 'center', marginBottom: 28 },
  emptyTitle: { fontSize: 14, fontWeight: '600' },
  emptySub: { fontSize: 12, fontWeight: '400', marginTop: 4 },

  // ── Wearable Connect Card ─────────────────────────────────────────────────────
  wearableCard: {
    marginHorizontal: H_PAD, ...CARD_STYLE, borderRadius: 33,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 19, paddingVertical: 20, marginBottom: 28,
  },
  wearableLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 11 },
  wearableIconWrap: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  wearableText: { fontSize: 14, fontWeight: '600', flex: 1, lineHeight: 20, letterSpacing: -0.5 },
  wearableBtn: { borderRadius: 999, paddingHorizontal: 24, paddingVertical: 10 },
  wearableBtnText: { fontSize: 14, fontWeight: '600' },

  // ── Articles ──────────────────────────────────────────────────────────────────
  articlesScroll: { paddingHorizontal: H_PAD, gap: 16, paddingBottom: 8, marginBottom: 16 },
  articleCard: {
    width: 280, ...CARD_STYLE, borderRadius: 24, overflow: 'hidden',
  },
  articleImg: { height: 160, alignItems: 'center', justifyContent: 'center' },
  articleBody: { padding: 20, gap: 8 },
  articleCat: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  articleTitle: { fontSize: 16, fontWeight: '700', lineHeight: 20 },

  // ── Added Pinned Grid ─────────────────────────────────────────────────────────
  pinnedGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: H_PAD, marginBottom: 28, rowGap: 16 },
  pinnedGridCard: { width: (SCREEN_W - 48 - 16) / 2, ...CARD_STYLE, borderRadius: 24, padding: 16 },
  pinnedIconRound: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  sleepBars: { flexDirection: 'row', height: 8, marginTop: 12, gap: 2 },
  sleepBarSegment: { height: '100%' },

  // ── Added Logs Grid ──────────────────────────────────────────────────────────
  logsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: H_PAD, marginBottom: 28, rowGap: 16 },
  logGridCard: { width: (SCREEN_W - 48 - 16) / 2, height: 160, ...CARD_STYLE, borderRadius: 24, padding: 16, overflow: 'hidden' },
  logActionBtn: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  logDots: { flexDirection: 'row', gap: 4, marginTop: 8 },
  logDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.1)' },
  cycleIndicators: { flexDirection: 'row', gap: 4, marginTop: 10 },
  cycleSegment: { flex: 1, height: 4, borderRadius: 2 },
  biomarkerCard: {
    ...CARD_STYLE,
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
  },
});
