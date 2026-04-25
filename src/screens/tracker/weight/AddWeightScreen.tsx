import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AddWeightScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [weight, setWeight] = useState(108.5);

  const lbs = (weight * 2.20462).toFixed(0);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <View style={[styles.header, { marginTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000' }]}>Weight Journey</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.weightCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
          <Text style={styles.weightLabel}>WEIGHT</Text>
          <View style={styles.weightDisplay}>
            <Text style={[styles.weightValue, { color: isDark ? '#FFF' : '#000' }]}>{weight.toFixed(1)}</Text>
            <Text style={styles.weightUnit}> kg</Text>
            <Text style={styles.lbsValue}>({lbs} lbs)</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={{ width: SCREEN_WIDTH - 80, height: 40 }}
              minimumValue={0}
              maximumValue={300}
              value={weight}
              onValueChange={setWeight}
              minimumTrackTintColor="#55EE71"
              maximumTrackTintColor="#333"
              thumbTintColor="#55EE71"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>0KG</Text>
              <Text style={styles.sliderLabelText}>150KG</Text>
              <Text style={styles.sliderLabelText}>300KG</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.dateCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
          <View>
            <Text style={styles.dateLabel}>DATE</Text>
            <Text style={[styles.dateValue, { color: isDark ? '#FFF' : '#000' }]}>Today</Text>
          </View>
          <View style={styles.calendarIconWrap}>
            <Ionicons name="calendar-outline" size={24} color="#55EE71" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Save Weight</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Measured using standard smart scale sync.</Text>
      </View>
    </View>
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
    marginBottom: 40,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  weightCard: {
    borderRadius: 40,
    padding: 32,
    marginBottom: 20,
    alignItems: 'center',
  },
  weightLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  weightDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 40,
  },
  weightValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 64,
  },
  weightUnit: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    color: '#55EE71',
    marginRight: 12,
  },
  lbsValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#666',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginTop: -8,
  },
  sliderLabelText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 32,
    marginBottom: 40,
  },
  dateLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  calendarIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(85,238,113,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#55EE71',
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 18,
    color: '#000',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  }
});
