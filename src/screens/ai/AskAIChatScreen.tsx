import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Progress ring for the score
function ScoreRing({ size = 160, progress = 0.82, color = '#34C759' }: { size?: number; progress?: number; color?: string }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={6} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={6} fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}

// Plus circle icon
function PlusCircleIcon({ color = 'rgba(255,255,255,0.3)', size = 19 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <Circle cx={9.5} cy={9.5} r={8.5} stroke={color} strokeWidth={1.2} />
      <Path d="M9.5 5.5V13.5M5.5 9.5H13.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// Send arrow
function SendIcon({ color = '#FFF', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 18" fill="none">
      <Path d="M1 1L19 9L1 17V10L11 9L1 8V1Z" fill={color} />
    </Svg>
  );
}

// Chevron right
function ChevronRight({ color = '#34C759', size = 7 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.7} viewBox="0 0 7 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  time: string;
  hasReport?: boolean;
}

const MOCK_CHAT: ChatMessage[] = [
  {
    id: '1',
    type: 'user',
    text: 'Can you analyze my latest metabolic panel and tell me what the "Sync Score" represents?',
    time: '09:42 AM',
  },
  {
    id: '2',
    type: 'ai',
    text: 'Analyzing Metabolic Panel Q3. Your Sync Score is a weighted aggregate of your hormonal response to nutrient timing. It specifically measures the efficiency of your insulin-to-glucose ratio relative to your circadian rhythm peaks.',
    time: '09:43 AM',
    hasReport: true,
  },
];

export default function AskAIChatScreen({ navigation, route }: { navigation: any; route?: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [message, setMessage] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Ask AI"
          onBack={() => navigation.goBack()}
        />

        {/* Chat Messages */}
        <View style={styles.chatArea}>
          {MOCK_CHAT.map((msg) => (
            <View key={msg.id}>
              {/* Timestamp */}
              <Text
                style={[
                  styles.timestamp,
                  {
                    color: msg.type === 'ai' ? '#34C759' : 'rgba(255,255,255,0.4)',
                    textAlign: msg.type === 'user' ? 'right' : 'left',
                    fontFamily: 'Manrope-ExtraBold',
                  },
                ]}
              >
                {msg.time} • {msg.type === 'user' ? 'USER' : 'CORE AI ANALYTICS'}
              </Text>

              {/* Message Bubble */}
              <View
                style={[
                  styles.bubble,
                  msg.type === 'user' ? styles.userBubble : styles.aiBubble,
                  {
                    backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.messageText, { color: c.text, fontFamily: 'Manrope' }]}>
                  {msg.text}
                </Text>
              </View>

              {/* Report Card for AI response */}
              {msg.hasReport && (
                <View
                  style={[
                    styles.reportCard,
                    {
                      backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                    },
                  ]}
                >
                  {/* Score Ring */}
                  <View style={styles.scoreSection}>
                    <View style={styles.ringWrapper}>
                      <ScoreRing />
                      <View style={styles.scoreCenter}>
                        <Text style={[styles.scoreValue, { color: c.text, fontFamily: 'Manrope-Bold' }]}>82%</Text>
                        <Text style={[styles.scoreLabel, { color: '#34C759', fontFamily: 'Manrope-ExtraBold' }]}>OPTIMIZED</Text>
                      </View>
                    </View>
                  </View>

                  {/* Panel Info */}
                  <Text style={[styles.panelTitle, { color: c.text, fontFamily: 'Manrope-Bold' }]}>
                    METABOLIC PANEL Q3
                  </Text>
                  <Text style={[styles.panelSub, { color: isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>
                    NEXUS LABORATORY • REF: BB20-X
                  </Text>

                  {/* Metrics */}
                  <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, { borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
                      <Text style={[styles.metricLabel, { color: isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>GLUCOSE</Text>
                      <View style={styles.metricValueRow}>
                        <Text style={[styles.metricValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>88</Text>
                        <Text style={[styles.metricUnit, { color: isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary }]}>mg/dL</Text>
                      </View>
                    </View>
                    <View style={[styles.metricCard, { borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
                      <Text style={[styles.metricLabel, { color: isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>INSULIN</Text>
                      <View style={styles.metricValueRow}>
                        <Text style={[styles.metricValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>4.2</Text>
                        <Text style={[styles.metricUnit, { color: isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary }]}>uIU/mL</Text>
                      </View>
                    </View>
                  </View>

                  {/* Footer */}
                  <View style={[styles.reportFooter, { borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : c.divider }]}>
                    <Text style={[styles.footerInfo, { color: isDark ? 'rgba(255,255,255,0.2)' : c.textTertiary, fontFamily: 'Manrope-ExtraBold' }]}>
                      DATA SYNCHRONIZATION STABLE •{'\n'}128MS LATENCY
                    </Text>
                    <TouchableOpacity style={styles.viewPanelBtn}>
                      <Text style={[styles.viewPanelText, { color: '#34C759', fontFamily: 'Manrope-ExtraBold' }]}>
                        VIEW FULL{'\n'}PANEL
                      </Text>
                      <ChevronRight />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Follow up question */}
          <Text style={[styles.followUp, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope' }]}>
            Shall I adjust your supplement window based on these results?
          </Text>
        </View>
      </ScrollView>

      {/* Chat Input */}
      <View style={[styles.inputArea, { paddingBottom: insets.bottom + 80 }]}>
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : 'rgba(240,240,240,0.9)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            },
          ]}
        >
          <TouchableOpacity style={styles.plusBtn}>
            <PlusCircleIcon />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, { color: c.text, fontFamily: 'Manrope' }]}
            placeholder="ASK CORE AI ANYTHING..."
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : c.inputPlaceholder}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={[styles.sendBtn, { backgroundColor: '#34C759' }]}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavBar activeTab="ai" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatArea: {
    marginHorizontal: 24,
    gap: 16,
  },
  timestamp: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    lineHeight: 15,
    marginBottom: 12,
  },
  bubble: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 25,
    marginBottom: 16,
  },
  userBubble: {
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  aiBubble: {
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 18,
    fontWeight: '200',
    lineHeight: 29.25,
  },
  reportCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 32,
    marginBottom: 16,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ringWrapper: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: -4,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 4,
  },
  panelSub: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  metricUnit: {
    fontSize: 10,
  },
  reportFooter: {
    borderTopWidth: 1,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerInfo: {
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 15,
    flex: 1,
  },
  viewPanelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewPanelText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 15,
  },
  followUp: {
    fontSize: 18,
    fontWeight: '200',
    lineHeight: 29.25,
    marginTop: 8,
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  inputBar: {
    height: 66,
    borderRadius: 40,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
  },
  plusBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
