import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddPeriodScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background Overlay effect for modal feel */}
      <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Period tracking</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={[styles.modalContent, { backgroundColor: isDark ? '#1A1A1A' : '#FFF' }]}>
          <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#000' }]}>Track your periods and flow</Text>
          <View style={styles.divider} />

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>HOW LONG IS YOUR CYCLE?</Text>
            <View style={[styles.inputWrapper, { backgroundColor: isDark ? '#0D0D0D' : '#F5F5F5' }]}>
              <Ionicons name="water-outline" size={20} color="#55EE71" style={{ marginRight: 12 }} />
              <TextInput 
                style={[styles.input, { color: isDark ? '#FFF' : '#000' }]}
                placeholder="e.g. 29days"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>HOW MANY DAYS DOES IT LAST?</Text>
            <View style={[styles.inputWrapper, { backgroundColor: isDark ? '#0D0D0D' : '#F5F5F5' }]}>
              <Ionicons name="water" size={20} color="#55EE71" style={{ marginRight: 12 }} />
              <TextInput 
                style={[styles.input, { color: isDark ? '#FFF' : '#000' }]}
                placeholder="e.g. 5days"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={[styles.toggleRow, { backgroundColor: isDark ? '#0D0D0D' : '#F5F5F5' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.notifIconWrap}>
                <Ionicons name="notifications-outline" size={20} color="#55EE71" />
              </View>
              <Text style={[styles.toggleLabel, { color: isDark ? '#FFF' : '#000' }]}>Notifications</Text>
            </View>
            <Switch 
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#333', true: '#55EE71' }}
              thumbColor="#FFF"
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.submitText}>Submit</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40,
    opacity: 0.3,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#FFF',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#55EE71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    marginHorizontal: 24,
    borderRadius: 40,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
    marginBottom: 32,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 12,
  },
  inputWrapper: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 24,
    marginBottom: 32,
  },
  notifIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(85,238,113,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toggleLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#55EE71',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 16,
    color: '#000',
  },
  closeBtn: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  }
});
