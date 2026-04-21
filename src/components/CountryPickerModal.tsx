import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COUNTRIES, Country } from '../utils/countries';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selected?: Country;
}

export default function CountryPickerModal({ visible, onClose, onSelect, selected }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12, backgroundColor: c.modal }]}>
          <View style={[styles.handle, { backgroundColor: c.cardGlassBorder }]} />
          <View style={styles.headerRow}>
            <Text style={[styles.title, { color: c.text, fontFamily: 'Inter' }]}>Select country</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={24} color={c.text} />
            </TouchableOpacity>
          </View>

          <View style={[styles.searchBox, { backgroundColor: c.inputBackground }]}>
            <Ionicons name="search" size={18} color={c.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search country or code"
              placeholderTextColor={c.inputPlaceholder}
              style={[styles.searchInput, { color: c.text, fontFamily: 'Inter' }]}
            />
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.code}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSel = selected?.code === item.code;
              return (
                <TouchableOpacity
                  style={[styles.row, { borderBottomColor: c.divider }, isSel && { backgroundColor: c.accentSoft, borderRadius: 12 }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={[styles.name, { color: c.text, fontFamily: 'Inter' }]}>{item.name}</Text>
                  <Text style={[styles.dial, { color: c.textSecondary, fontFamily: 'Inter' }]}>{item.dial}</Text>
                  {isSel && <Ionicons name="checkmark" size={18} color={c.primary} style={{ marginLeft: 8 }} />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%', paddingHorizontal: 20, paddingTop: 10 },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, marginBottom: 12 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: { fontSize: 18, fontWeight: '700' },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 14, height: 46, marginBottom: 12 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 6, borderBottomWidth: StyleSheet.hairlineWidth },
  flag: { fontSize: 24, marginRight: 14 },
  name: { flex: 1, fontSize: 15, fontWeight: '500' },
  dial: { fontSize: 14, fontWeight: '600' },
});
