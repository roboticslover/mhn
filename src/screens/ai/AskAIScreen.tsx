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
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Analysis icon (chart bars)
function AnalysisIcon({ color = '#C5C9AC', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Rect x={1} y={10} width={4} height={7} rx={1} stroke={color} strokeWidth={1.2} />
      <Rect x={7} y={5} width={4} height={12} rx={1} stroke={color} strokeWidth={1.2} />
      <Rect x={13} y={1} width={4} height={16} rx={1} stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

// Metrics icon (trending line)
function MetricsIcon({ color = '#C5C9AC', size = 17 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <Path d="M1 13L6 8L9 11L16 4" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 4H16V8" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Microphone icon
function MicIcon({ color = '#FFF', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect x={6} y={1} width={8} height={12} rx={4} stroke={color} strokeWidth={1.5} />
      <Path d="M3 10C3 13.866 6.134 17 10 17C13.866 17 17 13.866 17 10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={10} y1={17} x2={10} y2={19} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Attachment icon
function AttachIcon({ color = 'rgba(255,255,255,0.4)', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M19 11L11.5 18.5C9.01472 20.9853 5.01472 20.9853 2.52944 18.5C0.044158 16.0147 0.044158 12.0147 2.52944 9.52944L10.0294 2.02944C11.767 0.291864 14.5964 0.291864 16.334 2.02944C18.0716 3.76701 18.0716 6.59644 16.334 8.33401L9.16833 15.4997C8.29954 16.3685 6.88483 16.3685 6.01604 15.4997C5.14726 14.6309 5.14726 13.2162 6.01604 12.3474L12.5 5.86345"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Camera icon
function CameraIcon({ color = 'rgba(255,255,255,0.4)', size = 23 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 20" fill="none">
      <Path
        d="M1 7C1 5.89543 1.89543 5 3 5H5L7 2H16L18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H3C1.89543 19 1 18.1046 1 17V7Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle cx={11.5} cy={11.5} r={3.5} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

// Send arrow icon
function SendIcon({ color = '#FFF', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 18" fill="none">
      <Path d="M1 1L19 9L1 17V10L11 9L1 8V1Z" fill={color} />
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

interface SuggestionCard {
  icon: 'analysis' | 'metrics';
  category: string;
  text: string;
}

const SUGGESTIONS: SuggestionCard[] = [
  { icon: 'analysis', category: 'Analysis', text: 'Analyze my latest Blood Panel' },
  { icon: 'metrics', category: 'Metrics', text: 'What does my Sync Score mean?' },
];

export default function AskAIScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [message, setMessage] = useState('');

  const handleSendOrNavigate = () => {
    if (message.trim()) {
      navigation.navigate('AskAIChat', { initialMessage: message });
    }
  };

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

        {/* Big headline */}
        <Text style={[styles.headline, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope-Bold' }]}>
          Ask me{'\n'}anything!
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Manrope' }]}>
          Your clinical intelligence partner. Ask me to analyze a report, track a symptom, or optimize your protocols.
        </Text>

        {/* Suggestion Cards */}
        <View style={styles.suggestionsContainer}>
          {SUGGESTIONS.map((suggestion, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.suggestionCard,
                {
                  backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AskAIChat', { initialMessage: suggestion.text })}
            >
              <View style={styles.suggestionIcon}>
                {suggestion.icon === 'analysis' ? (
                  <AnalysisIcon color={isDark ? '#C5C9AC' : c.textSecondary} />
                ) : (
                  <MetricsIcon color={isDark ? '#C5C9AC' : c.textSecondary} />
                )}
              </View>
              <View>
                <Text style={[styles.suggestionCategory, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>
                  {suggestion.category.toUpperCase()}
                </Text>
                <Text style={[styles.suggestionText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope' }]}>
                  {suggestion.text}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
          <TextInput
            style={[styles.textInput, { color: c.text, fontFamily: 'Manrope' }]}
            placeholder="Type your message"
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.6)' : c.inputPlaceholder}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.inputIcon}>
            <AttachIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIcon}>
            <CameraIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.micBtn, { backgroundColor: isDark ? '#AAA' : c.primary }]}
          onPress={handleSendOrNavigate}
        >
          {message.trim() ? <SendIcon /> : <MicIcon />}
        </TouchableOpacity>
      </View>

      <BottomNavBar activeTab="ai" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headline: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -1.2,
    lineHeight: 60,
    marginTop: 40,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    lineHeight: 29.25,
    marginHorizontal: 32,
    marginBottom: 40,
  },
  suggestionsContainer: {
    marginHorizontal: 24,
    gap: 16,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 25,
    borderRadius: 33,
    borderWidth: 1,
  },
  suggestionIcon: {
    marginTop: 4,
  },
  suggestionCategory: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 15,
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: '200',
    lineHeight: 24,
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  inputBar: {
    flex: 1,
    height: 49,
    borderRadius: 40,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
  },
  inputIcon: {
    padding: 6,
  },
  micBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
