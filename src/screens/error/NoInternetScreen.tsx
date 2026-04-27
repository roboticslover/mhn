import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

export default function NoInternetScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + 20, backgroundColor: c.cardGlassBorder }]} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={c.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { borderColor: c.primary + '4D' }]} />
          <Ionicons name="wifi-outline" size={48} color={c.primary} style={styles.icon} />
          {/* Diagonal Line for crossed out effect */}
          <View style={[styles.crossLine, { backgroundColor: c.primary }]} />
        </View>

        <Text style={[styles.title, { color: c.text }]}>No Internet{'\n'}Connection</Text>
        
        <Text style={[styles.description, { color: c.textSecondary }]}>
          Your data is safe, but we need{'\n'}
          a connection to sync your{'\n'}
          latest vitals. Please check{'\n'}
          your Wi-Fi or cellular settings.
        </Text>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: c.primary, shadowColor: c.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="refresh-outline" size={20} color="#000" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  iconBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(111,251,133,0.3)',
    borderStyle: 'dashed',
  },
  icon: {
    opacity: 0.8,
  },
  crossLine: {
    position: 'absolute',
    width: 80,
    height: 2,
    backgroundColor: '#6FFB85',
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 36,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
    letterSpacing: -0.75,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#ABABAB',
    textAlign: 'center',
    lineHeight: 29,
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#6FFB85',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#64A1FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
});
