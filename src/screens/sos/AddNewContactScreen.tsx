import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

// Close icon
function CloseIcon({ color = '#FFF', size = 12 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path d="M1 1L11 11M11 1L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Person placeholder icon
function PersonIcon({ color = '#666', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={5} r={3} stroke={color} strokeWidth={1.2} />
      <Path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// Plus badge icon
function PlusIcon({ color = '#141414', size = 8 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <Path d="M4 0V8M0 4H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Chevron down
function ChevronDown({ color = '#FFF', size = 6 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 0.6} viewBox="0 0 6 4" fill="none">
      <Path d="M1 1L3 3L5 1" stroke={color} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function AddNewContactScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Emergency Contacts"
          onBack={() => navigation.goBack()}
        />
      </View>

      {/* Main Glass Modal */}
      <View
        style={[
          styles.modal,
          {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          },
        ]}
      >
        {/* Close button */}
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : 'rgba(0,0,0,0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <CloseIcon color={c.text} />
        </TouchableOpacity>

        {/* Family illustration */}
        <View style={styles.illustrationSection}>
          <View style={[styles.illustrationCircle, { borderColor: isDark ? 'rgba(85,248,115,0.2)' : 'rgba(57,166,87,0.2)' }]}>
            <View style={[styles.illustrationInner, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
              <PersonIcon color={c.textSecondary} size={40} />
            </View>
          </View>
          <View style={[styles.plusBadge, { backgroundColor: c.primary }]}>
            <PlusIcon color={c.textOnPrimary} />
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
          Add New Contact For{'\n'}Emergency
        </Text>

        {/* Input Form Section */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: c.primary, fontFamily: 'Inter-Medium' }]}>
              FULL NAME
            </Text>
            <View
              style={[
                styles.inputField,
                {
                  backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.inputBorder,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: c.inputText, fontFamily: 'Inter' }]}
                placeholder="Enter Name"
                placeholderTextColor={isDark ? 'rgba(170,170,170,0.5)' : c.inputPlaceholder}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: c.primary, fontFamily: 'Inter-Medium' }]}>
              MOBILE NUMBER
            </Text>
            <View style={styles.phoneRow}>
              {/* Country picker */}
              <TouchableOpacity
                style={[
                  styles.countryPicker,
                  {
                    backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : c.inputBackground,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.inputBorder,
                  },
                ]}
              >
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={[styles.countryCode, { color: c.text, fontFamily: 'Inter-Medium' }]}>+91</Text>
                <ChevronDown color={c.textSecondary} />
              </TouchableOpacity>

              {/* Phone field */}
              <View
                style={[
                  styles.phoneField,
                  {
                    backgroundColor: isDark ? 'rgba(19,19,19,0.6)' : c.inputBackground,
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.inputBorder,
                  },
                ]}
              >
                <TextInput
                  style={[styles.input, { color: c.inputText, fontFamily: 'Inter' }]}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={isDark ? 'rgba(170,170,170,0.5)' : c.inputPlaceholder}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          This is not a replacement to{'\n'}calling 108, but an easy way to{'\n'}alert your family.
        </Text>
      </View>

      {/* Add Contact button */}
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: c.primary }]}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>
          Add Contact
        </Text>
      </TouchableOpacity>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modal: {
    marginHorizontal: 16,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    paddingBottom: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  illustrationSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  illustrationCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    padding: 6,
  },
  illustrationInner: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBadge: {
    position: 'absolute',
    bottom: -4,
    right: '50%',
    marginRight: -56,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 24,
  },
  formSection: {
    marginHorizontal: 32,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 15,
  },
  inputField: {
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 21,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 8,
  },
  countryPicker: {
    width: 87,
    height: 48,
    borderRadius: 32,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  flag: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  phoneField: {
    flex: 1,
    height: 48,
    borderRadius: 32,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 24,
    marginHorizontal: 50,
  },
  addBtn: {
    marginHorizontal: 50,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
