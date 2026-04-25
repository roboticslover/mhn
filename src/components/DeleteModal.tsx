import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Warning triangle icon with exclamation mark
function WarningIcon({ color = '#FF4B4B', size = 28 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4L3 20H21L12 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="11.5" y="10" width="1" height="5" rx="0.5" fill={color} />
      <Circle cx="12" cy="17" r="1" fill={color} />
    </Svg>
  );
}

interface DeleteModalProps {
  visible: boolean;
  itemType?: string; // "Prescription", "report", "scan", "medication"
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ visible, itemType = 'record', onConfirm, onCancel }: DeleteModalProps) {
  const { theme, isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <BlurView
            intensity={30}
            tint="dark"
            style={[
              styles.modal,
              {
                backgroundColor: 'rgba(23, 23, 23, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              },
            ]}
          >
            {/* Red glow decoration - Shade at bottom left */}
            <LinearGradient
              colors={['rgba(255, 75, 75, 0.3)', 'rgba(255, 75, 75, 0)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.glowDecor}
            />

            {/* Subtle top rim light */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.topRim}
            />

            <View style={styles.content}>
              {/* Warning icon container */}
              <View style={styles.iconWrapper}>
                <View style={[styles.warningCircle, { backgroundColor: 'rgba(255,75,75,0.05)', borderColor: 'rgba(255,75,75,0.3)' }]}>
                  <WarningIcon color="#FF4B4B" size={28} />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.title}>Delete</Text>

              {/* Description */}
              <Text style={styles.description}>
                Are you sure you want to permanently delete this {itemType}? This action cannot be undone.
              </Text>

              <View style={styles.buttonContainer}>
                {/* Confirm Delete button */}
                <TouchableOpacity
                  style={styles.confirmBtn}
                  activeOpacity={0.8}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmBtnText}>CONFIRM DELETE</Text>
                </TouchableOpacity>

                {/* Keep Record button */}
                <TouchableOpacity
                  style={styles.keepBtn}
                  activeOpacity={0.7}
                  onPress={onCancel}
                >
                  <Text style={styles.keepBtnText}>KEEP RECORD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 350,
    borderRadius: 33,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modal: {
    padding: 40,
    paddingBottom: 48,
    alignItems: 'center',
    position: 'relative',
  },
  glowDecor: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.6,
  },
  topRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  iconWrapper: {
    marginBottom: 32,
  },
  warningCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.9,
    lineHeight: 40,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
    color: '#C5C9AC',
    fontFamily: 'Manrope',
    marginBottom: 48,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#FF4B4B',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  confirmBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  keepBtn: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(68, 73, 51, 0.33)',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#C5C9AC',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
});


