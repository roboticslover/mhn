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
import Svg, { Path } from 'react-native-svg';

// Warning triangle icon
function WarningTriangle({ color = '#FF4B4B', size = 25 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 0.86} viewBox="0 0 25 22" fill="none">
      <Path
        d="M12.5 1L24 21H1L12.5 1Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M12.5 9V14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12.5 17V17.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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
  const c = theme.colors;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: isDark ? 'rgba(23,23,23,0.95)' : 'rgba(255,255,255,0.98)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            },
          ]}
        >
          {/* Red glow decoration */}
          <View style={styles.glowDecor} />

          {/* Warning icon */}
          <View style={[styles.warningCircle, { backgroundColor: 'rgba(255,75,75,0.05)', borderColor: 'rgba(255,75,75,0.3)' }]}>
            <WarningTriangle color="#FF4B4B" size={25} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: c.text, fontFamily: 'Manrope-SemiBold' }]}>
            Delete
          </Text>

          {/* Description */}
          <Text style={[styles.description, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Manrope' }]}>
            Are you sure you want to permanently delete this {itemType}? This action cannot be undone.
          </Text>

          {/* Confirm Delete button */}
          <TouchableOpacity
            style={styles.confirmBtn}
            activeOpacity={0.8}
            onPress={onConfirm}
          >
            <Text style={[styles.confirmBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
              CONFIRM DELETE
            </Text>
          </TouchableOpacity>

          {/* Keep Record button */}
          <TouchableOpacity
            style={[styles.keepBtn, { borderColor: isDark ? 'rgba(68,73,51,0.3)' : 'rgba(0,0,0,0.15)' }]}
            activeOpacity={0.7}
            onPress={onCancel}
          >
            <Text style={[styles.keepBtnText, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>
              KEEP RECORD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 350,
    borderRadius: 33,
    borderWidth: 1,
    padding: 49,
    alignItems: 'center',
    overflow: 'hidden',
  },
  glowDecor: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    width: 256,
    height: 256,
    borderRadius: 12,
    backgroundColor: 'rgba(255,75,75,0.2)',
  },
  warningCircle: {
    width: 64,
    height: 64,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.9,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#FF4B4B',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 4,
    marginBottom: 16,
  },
  confirmBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 15,
  },
  keepBtn: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 17,
    paddingHorizontal: 41,
    alignItems: 'center',
  },
  keepBtnText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 15,
  },
});
