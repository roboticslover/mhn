import React, { useState, useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

const IMG_PROFILE = "https://images.unsplash.com/photo-1584308666744-24d5e4b6c310?q=80&w=896&auto=format&fit=crop";

export default function AllergiesAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  
  const existingAllergy = route?.params?.allergy;
  const isEdit = !!existingAllergy;

  const [selectedFactor, setSelectedFactor] = useState<string | null>(existingAllergy?.type?.toLowerCase() || 'respiratory');
  const [trigger, setTrigger] = useState(existingAllergy?.name || '');
  const [reaction, setReaction] = useState(existingAllergy?.description || '');
  const [selectedSensitivity, setSelectedSensitivity] = useState<string>(existingAllergy?.severity || 'Moderate');

  const factors = [
    { id: 'food', label: 'Food', icon: 'restaurant-outline' },
    { id: 'respiratory', label: 'Respiratory', icon: 'cloud-outline' },
    { id: 'medicine', label: 'Medicine', icon: 'medical-outline' },
    { id: 'environment', label: 'Environment', icon: 'leaf-outline' },
    { id: 'eyes', label: 'Eyes', icon: 'eye-outline' },
    { id: 'skin', label: 'Skin', icon: 'hand-left-outline' },
  ];

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: '#000000' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header */}
        <View style={[styles.header, { marginTop: insets.top + 20 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Allergies</Text>
          <Image source={{ uri: IMG_PROFILE }} style={styles.profileImage} />
        </View>

        <View style={styles.content}>
          {/* Affecting Factors */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>AFFECTING FACTORS</Text>
            <View style={styles.factorsGrid}>
              {factors.map((factor) => {
                const isActive = selectedFactor === factor.id;
                return (
                  <TouchableOpacity
                    key={factor.id}
                    style={[
                      styles.factorButton,
                      { backgroundColor: isActive ? 'rgba(85,238,113,0.1)' : '#1F1F1F' },
                      { borderColor: isActive ? 'rgba(85,238,113,0.2)' : 'transparent', borderWidth: 1 }
                    ]}
                    onPress={() => {
                      setSelectedFactor(factor.id);
                      navigation.navigate('AllergiesDetail', { 
                        allergy: { 
                          id: factor.id, 
                          name: factor.label, 
                          impact: 'Moderate Impact',
                          triggers: factor.id === 'food' ? ['Seeds', 'Shellfish', 'Latex'] : ['Pollen', 'Dust'],
                          reactions: [
                            { title: 'Urticaria', sub: 'Localized skin inflammation' },
                            { title: 'Dyspnea', sub: 'Mild respiratory shortness' },
                          ]
                        } 
                      });
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.factorIconContainer,
                      { backgroundColor: isActive ? '#55EE71' : 'rgba(85,238,113,0.1)' },
                      isActive && { shadowColor: '#30D158', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15 }
                    ]}>
                      <Ionicons 
                        name={factor.icon as any} 
                        size={20} 
                        color={isActive ? '#003910' : '#55EE71'} 
                      />
                    </View>
                    <Text style={[
                      styles.factorLabel,
                      { color: isActive ? '#55EE71' : '#E2E2E2' }
                    ]}>
                      {factor.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Minimalist Text Fields */}
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>What triggers it?</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Peanuts, Pollen, Ibuprofen"
                placeholderTextColor="#353535"
                value={trigger}
                onChangeText={setTrigger}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>What reaction do you experience?</Text>
              <TextInput
                style={[styles.input, { height: 60 }]}
                placeholder="Describe the physical symptoms..."
                placeholderTextColor="#353535"
                multiline
                value={reaction}
                onChangeText={setReaction}
              />
            </View>
          </View>

          {/* Severity Level */}
          <View style={styles.severitySection}>
            <View style={styles.severityHeader}>
              <Text style={styles.severityLabel}>SENSITIVITY LEVEL</Text>
              <Text style={styles.severityValue}>{selectedSensitivity}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <LinearGradient
                  colors={['#FF977C', '#EC6644']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.sliderFill}
                />
              </View>
              <View style={styles.sliderThumb} />
            </View>

            <View style={styles.sliderLabelRow}>
              <Text style={styles.sliderPointLabel}>LOW</Text>
              <Text style={styles.sliderPointLabel}>HIGH</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.saveButtonText}>{isEdit ? 'UPDATE CHANGES' : 'SAVE CHANGES'}</Text>
            </TouchableOpacity>

            <Text style={styles.lastUpdated}>Last updated: October 24, 2023</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={() => navigation.goBack()}>
              <Text style={styles.deleteButtonText}>DELETE RECORD</Text>
              <Ionicons name="trash-outline" size={16} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 35,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    position: 'absolute',
    left: 64,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    paddingHorizontal: 30,
  },
  section: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  factorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  factorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 33,
    gap: 12,
    width: '48%',
  },
  factorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factorLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  inputSection: {
    gap: 32,
    marginBottom: 48,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#3D4A3B',
    paddingBottom: 8,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#E2E2E2',
    paddingVertical: 8,
  },
  severitySection: {
    marginBottom: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(61,74,59,0.1)',
    paddingTop: 33,
  },
  severityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  severityLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  severityValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#EC6644',
  },
  sliderContainer: {
    height: 8,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#0E0E0E',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  sliderFill: {
    width: '60%',
    height: '100%',
  },
  sliderThumb: {
    position: 'absolute',
    left: '58%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC6644',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderPointLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#353535',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  actionSection: {
    paddingTop: 32,
    gap: 24,
  },
  saveButton: {
    backgroundColor: '#30D158',
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#30D158',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 14,
    color: '#00541B',
    letterSpacing: 2.8,
  },
  lastUpdated: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(188,203,183,0.4)',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: -8,
  },
  deleteButton: {
    height: 59,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deleteButtonText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    color: '#FF4D4D',
    letterSpacing: 1.2,
  },
});
