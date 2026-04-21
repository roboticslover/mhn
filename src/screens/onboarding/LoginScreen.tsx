import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SvgIcon from '../../components/SvgIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BrandLogo from '../../components/BrandLogo';
import { useTheme } from '../../theme/ThemeProvider';

const { width, height } = Dimensions.get('window');

const BG_IMAGE = require('../../../assets/white-water-lily-with-yellow-center-is-surrounded-by-lily-pads.jpg 1.png');

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.55)',
            'rgba(0,0,0,0.15)',
            'rgba(0,0,0,0.55)',
            'rgba(0,0,0,0.92)',
          ]}
          locations={[0, 0.35, 0.65, 1]}
          style={styles.overlay}
        >
          <View style={[styles.topRow, { paddingTop: insets.top + 10 }]}>
            <BrandLogo size={44} />
          </View>

          {/* Bottom - Welcome content */}
          <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
            <Text style={[styles.welcome, { color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter' }]}>Welcome</Text>
            <Text style={[styles.heading, { color: '#FFFFFF', fontFamily: 'Inter' }]}>
              You're about to{'\n'}see <Text style={styles.eyes}>👀</Text> your health{'\n'}differently.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('EnterMobileNumber')}
              style={[styles.loginBtn, { backgroundColor: 'rgba(30,30,30,0.85)', borderColor: 'rgba(255,255,255,0.08)' }]}
            >
              <Text style={[styles.loginText, { color: '#FFFFFF', fontFamily: 'Inter' }]}>Login</Text>
              <SvgIcon name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={[styles.disclaimer, { color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter' }]}>
              By Continuing, You agree to our{' '}
              <Text style={[styles.disclaimerLink, { color: '#FFFFFF' }]}>Terms and Conditions</Text>
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width, height },
  overlay: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bottom: { paddingHorizontal: 4 },
  welcome: { fontSize: 16, fontWeight: '400', marginBottom: 10 },
  heading: { fontSize: 30, fontWeight: '700', lineHeight: 40, letterSpacing: -0.4, marginBottom: 28 },
  eyes: { fontSize: 26 },
  loginBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 58, borderRadius: 33, borderWidth: 1, marginBottom: 14 },
  loginText: { fontSize: 18, fontWeight: '700' },
  disclaimer: { fontSize: 12, textAlign: 'center', lineHeight: 18 },
  disclaimerLink: { textDecorationLine: 'underline', fontWeight: '600' },
});
