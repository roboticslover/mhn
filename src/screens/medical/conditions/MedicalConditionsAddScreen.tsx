import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../../components/BottomNavBar';

const IMG_HEADER = "https://images.unsplash.com/photo-1584308666744-24d5e4b6c310?q=80&w=896&auto=format&fit=crop";

export default function MedicalConditionsAddScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedStatus, setSelectedStatus] = useState<'Active' | 'Resolved'>('Active');
  const [selectedTime, setSelectedTime] = useState<'0 Years' | '6 Months'>('0 Years');

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, { marginTop: insets.top + 20 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          
          <View style={styles.headerImageContainer}>
            <Image source={{ uri: IMG_HEADER }} style={styles.headerImage} />
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              Medical Conditi...
            </Text>
            <View style={styles.headerIcon}>
              <Ionicons name="alert" size={12} color={isDark ? '#FFFFFF' : '#000000'} />
            </View>
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.contentSection}>
          <Text style={[styles.sectionTitle, { color: '#BCCBB7' }]}>CONDITION OR CONCERN</Text>
          
          <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(28,28,30,0.7)' : '#F8F9FA' }]}>
            <TextInput
              style={[styles.input, { color: isDark ? '#E2E2E2' : '#111111' }]}
              placeholder="e.g., High Blood Pressure"
              placeholderTextColor={isDark ? 'rgba(170,170,170,0.4)' : '#999999'}
            />
            <Ionicons name="pencil-outline" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.bentoGrid}>
          {/* Time Since Diagnosis */}
          <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : '#F8F9FA' }]}>
            <Text style={[styles.cardTitle, { color: '#BCCBB7' }]}>TIME SINCE DIAGNOSIS</Text>
            <View style={styles.timeOptions}>
              <TouchableOpacity 
                style={[
                  styles.timeOption, 
                  { backgroundColor: isDark ? '#353535' : '#E5E5E5' },
                  selectedTime === '0 Years' && { borderColor: '#55EE71', borderWidth: 1 }
                ]}
                onPress={() => setSelectedTime('0 Years')}
              >
                <Text style={[styles.timeText, { color: isDark ? '#E2E2E2' : '#111111' }]}>0 Years</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.timeOption, 
                  { backgroundColor: isDark ? '#353535' : '#E5E5E5' },
                  selectedTime === '6 Months' && { borderColor: '#55EE71', borderWidth: 1 }
                ]}
                onPress={() => setSelectedTime('6 Months')}
              >
                <Text style={[styles.timeText, { color: isDark ? '#E2E2E2' : '#111111' }]}>6 Months</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Status Toggle */}
          <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : '#F8F9FA' }]}>
            <Text style={[styles.cardTitle, { color: '#BCCBB7', marginBottom: 16 }]}>CURRENT STATUS</Text>
            <View style={[styles.toggleContainer, { backgroundColor: isDark ? '#0E0E0E' : '#E5E5E5' }]}>
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  selectedStatus === 'Active' && styles.toggleActive
                ]}
                onPress={() => setSelectedStatus('Active')}
              >
                <Text style={[
                  styles.toggleText,
                  { color: selectedStatus === 'Active' ? '#131313' : (isDark ? '#BCCBB7' : '#666666') }
                ]}>
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  selectedStatus === 'Resolved' && styles.toggleActive
                ]}
                onPress={() => setSelectedStatus('Resolved')}
              >
                <Text style={[
                  styles.toggleText,
                  { color: selectedStatus === 'Resolved' ? '#131313' : (isDark ? '#BCCBB7' : '#666666') }
                ]}>
                  Resolved
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timeline Selector */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: '#BCCBB7' }]}>TREATMENT TIMELINE</Text>
          <View style={[styles.timelineCard, { backgroundColor: isDark ? '#1F1F1F' : '#F8F9FA' }]}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIcon, { backgroundColor: isDark ? '#353535' : '#E5E5E5' }]}>
                <Ionicons name="medical-outline" size={14} color="#55EE71" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: isDark ? '#E2E2E2' : '#111111' }]}>Vitamin Supplements</Text>
                <Text style={[styles.timelineSubtitle, { color: isDark ? '#BCCBB7' : '#666666' }]}>Daily Dosage • morning</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIcon, { backgroundColor: isDark ? '#353535' : '#E5E5E5' }]}>
                <Ionicons name="fitness-outline" size={14} color="#55EE71" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: isDark ? '#E2E2E2' : '#111111' }]}>Lifestyle Modification</Text>
                <Text style={[styles.timelineSubtitle, { color: isDark ? '#BCCBB7' : '#666666' }]}>Cardio & Reduced Sodium</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Impact Field */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: '#BCCBB7' }]}>DAILY LIFE IMPACT (OPTIONAL)</Text>
          <View style={[styles.textAreaContainer, { backgroundColor: isDark ? '#1B1B1B' : '#F8F9FA' }]}>
            <TextInput
              style={[styles.textArea, { color: isDark ? '#E2E2E2' : '#111111' }]}
              placeholder="e.g., Difficulty climbing stairs, affects sleep..."
              placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : '#999999'}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MedicalConditionsList')}
          >
            <Text style={styles.saveButtonText}>SAVE MEDICAL PROFILE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="home" navigation={navigation} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 12,
    zIndex: 10,
    padding: 8,
  },
  headerImageContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  headerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 150,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 13,
  },
  headerIcon: {
    position: 'absolute',
    left: -20,
    top: 60,
    transform: [{ rotate: '180deg' }],
  },
  contentSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingVertical: 17,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  bentoGrid: {
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 32,
  },
  bentoCard: {
    padding: 24,
    borderRadius: 33,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  timeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  timeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  timeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 9999,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 9999,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#55EE71',
  },
  toggleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  timelineCard: {
    borderRadius: 33,
    padding: 16,
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timelineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  timelineSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
  textAreaContainer: {
    borderRadius: 33,
    padding: 20,
    paddingTop: 16,
  },
  textArea: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 100,
  },
  actionContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#30D158',
    width: '100%',
    height: 56,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(48,209,88,0.25)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#003910',
  },
});
