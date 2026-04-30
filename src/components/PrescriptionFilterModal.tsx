import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Svg, { Path } from 'react-native-svg';

// ─── Chevron Icon (rotates based on open/closed) ──────────────────────────────
function ChevronIcon({ color, size = 11 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size + 9} viewBox="0 0 11 20" fill="none">
      <Path
        d="M9 4L3 10L9 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Checkmark SVG ─────────────────────────────────────────────────────────────
function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        d="M2 5L4.2 7.5L8 2.5"
        stroke="#000000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export type SortOrderValue = 'newest' | 'oldest' | 'az' | null;
export type VisibilityValue = 'all' | 'public' | 'private' | null;
export type StatusValue = 'all' | 'normal' | 'warning' | null;

export interface FilterState {
  sortOrder: SortOrderValue;
  visibility: VisibilityValue;
  status: StatusValue;
}

interface PrescriptionFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const DEFAULT_FILTERS: FilterState = {
  sortOrder: null,
  visibility: null,
  status: null,
};

// ─── Filter Section Data ───────────────────────────────────────────────────────
const SORT_OPTIONS: { label: string; value: SortOrderValue }[] = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'A - Z', value: 'az' },
];

const VISIBILITY_OPTIONS: { label: string; value: VisibilityValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
];

const STATUS_OPTIONS: { label: string; value: StatusValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Normal', value: 'normal' },
  { label: 'Warning', value: 'warning' },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PrescriptionFilterModal({
  visible,
  onClose,
  onSave,
  initialFilters,
}: PrescriptionFilterModalProps) {
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [filters, setFilters] = useState<FilterState>(initialFilters ?? DEFAULT_FILTERS);
  const [openSection, setOpenSection] = useState<'sort' | 'visibility' | 'status' | null>(null);

  // Sync with initial filters when modal opens
  useEffect(() => {
    if (visible) {
      setFilters(initialFilters ?? DEFAULT_FILTERS);
      setOpenSection(null);
    }
  }, [visible]);

  // Count selected filters
  const selectedCount = [filters.sortOrder, filters.visibility, filters.status].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setOpenSection(null);
  }, []);

  const handleSave = useCallback(() => {
    onSave(filters);
    onClose();
  }, [filters, onSave, onClose]);

  const toggleSection = useCallback((section: 'sort' | 'visibility' | 'status') => {
    setOpenSection(prev => (prev === section ? null : section));
  }, []);

  // ─── Theme-aware colors ────────────────────────────────────────────────────
  const containerBg = isDark ? '#1F1F1F' : '#FFFFFF';
  const containerBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const sectionBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const checkboxBorder = isDark ? '#484848' : '#C0C0C0';
  const optionRowBorder = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const labelColor = isDark ? '#E5E5E5' : '#161E14';
  const optionTextColor = isDark ? '#FFFFFF' : '#161E14';
  const chevronColor = isDark ? '#757575' : '#999999';
  const countColor = isDark ? '#757575' : '#999999';
  const clearAllColor = isDark ? '#6FFB85' : '#39A657';
  const selectedBg = isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.08)';
  const selectedBorder = isDark ? 'rgba(111,251,133,0.5)' : 'rgba(57,166,87,0.5)';
  const checkboxActiveBg = isDark ? '#6FFB85' : '#39A657';
  const saveBtnBg = isDark ? '#6FFB85' : '#39A657';
  const saveBtnText = isDark ? '#141414' : '#FFFFFF';

  // ─── Render a filter section ───────────────────────────────────────────────
  const renderSection = (
    title: string,
    sectionKey: 'sort' | 'visibility' | 'status',
    options: { label: string; value: any }[],
    currentValue: any,
    onChange: (value: any) => void,
  ) => {
    const isOpen = openSection === sectionKey;
    const hasValue = currentValue !== null;

    return (
      <View key={sectionKey}>
        {/* Section Header */}
        <TouchableOpacity
          style={[
            styles.sectionHeader,
            { borderColor: sectionBorder },
          ]}
          activeOpacity={0.7}
          onPress={() => toggleSection(sectionKey)}
        >
          {/* Checkbox */}
          <View
            style={[
              styles.sectionCheckbox,
              hasValue
                ? { backgroundColor: checkboxActiveBg, borderColor: checkboxActiveBg }
                : { borderColor: checkboxBorder },
            ]}
          >
            {hasValue && <CheckIcon size={10} />}
          </View>

          {/* Label */}
          <Text style={[styles.sectionLabel, { color: labelColor }]}>{title}</Text>

          {/* Chevron */}
          <View style={[styles.chevronWrap, { transform: [{ rotate: isOpen ? '90deg' : '-90deg' }] }]}>
            <ChevronIcon color={chevronColor} size={11} />
          </View>
        </TouchableOpacity>

        {/* Options (visible when open) */}
        {isOpen && (
          <View style={[styles.optionsList, { borderColor: sectionBorder }]}>
            {options.map((opt) => {
              const isSelected = currentValue === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.optionRow,
                    {
                      borderColor: isSelected ? selectedBorder : optionRowBorder,
                      backgroundColor: isSelected ? selectedBg : 'transparent',
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => onChange(isSelected ? null : opt.value)}
                >
                  {/* Option Checkbox */}
                  <View
                    style={[
                      styles.optionCheckbox,
                      isSelected
                        ? { backgroundColor: checkboxActiveBg, borderColor: checkboxActiveBg }
                        : { borderColor: checkboxBorder },
                    ]}
                  >
                    {isSelected && <CheckIcon size={10} />}
                  </View>

                  {/* Option Text */}
                  <Text style={[styles.optionText, { color: optionTextColor }]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: containerBg,
              borderColor: containerBorder,
            },
          ]}
          activeOpacity={1}
          onPress={() => {}}
        >
          {/* Filter Sections */}
          {renderSection('Sort Order', 'sort', SORT_OPTIONS, filters.sortOrder, (v) =>
            setFilters((prev) => ({ ...prev, sortOrder: v })),
          )}
          {renderSection('Visibility', 'visibility', VISIBILITY_OPTIONS, filters.visibility, (v) =>
            setFilters((prev) => ({ ...prev, visibility: v })),
          )}
          {renderSection('Status', 'status', STATUS_OPTIONS, filters.status, (v) =>
            setFilters((prev) => ({ ...prev, status: v })),
          )}

          {/* Footer: Selected count + Clear All */}
          {selectedCount > 0 && (
            <View style={styles.footer}>
              <Text style={[styles.selectedText, { color: countColor }]}>
                Selected {selectedCount}
              </Text>
              <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
                <Text style={[styles.clearAllText, { color: clearAllColor }]}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: saveBtnBg }]}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text style={[styles.saveBtnText, { color: saveBtnText }]}>SAVE</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 214,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },

  // ── Section Header ────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
  },
  sectionCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
  },
  chevronWrap: {
    width: 20,
    height: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Options List ──────────────────────────
  optionsList: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 4,
    paddingBottom: 4,
    paddingTop: 4,
    gap: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 4,
    gap: 8,
  },
  optionCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter',
  },

  // ── Footer ────────────────────────────────
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  selectedText: {
    fontSize: 9,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  clearAllText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: 0.5,
  },

  // ── Save Button ───────────────────────────
  saveBtn: {
    marginTop: 12,
    height: 40,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
