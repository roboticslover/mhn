import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

export default function PrescriptionShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const files = [
    { id: '1', name: '818786755-CBC-REPORT.PDF' },
  ];

  const toggleFile = (id: string) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(f => f.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Prescription</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={21} color={c.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={21} color={c.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dimmedContent}>
        <View style={styles.tagsRow}>
          <View style={[styles.publicTag, { backgroundColor: c.accentSoft }]}>
            <Text style={[styles.publicTagText, { color: c.primary, fontFamily: 'Inter' }]}>PUBLIC</Text>
          </View>
          <View style={[styles.typeTag, { backgroundColor: c.cardElevated }]}>
            <Text style={[styles.typeTagText, { color: c.textSecondary, fontFamily: 'Inter' }]}>PRESCRIPTION</Text>
          </View>
        </View>
        <Text style={[styles.prescriptionTitle, { color: c.text, fontFamily: 'Inter' }]}>Prescription Nam</Text>
      </View>

      <View style={[styles.shareModal, { backgroundColor: c.modal, borderColor: c.cardGlassBorder }]}>
        <View style={styles.modalHeader}>
          <Ionicons name="share-outline" size={20} color={c.primary} />
          <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter' }]}>Select files to share</Text>
        </View>
        <View style={styles.selectAllRow}>
          <TouchableOpacity style={[styles.checkbox, { borderColor: c.textSecondary }, selectAll && { backgroundColor: c.primary, borderColor: c.primary }]} onPress={toggleSelectAll}>
            {selectAll && <Ionicons name="checkmark" size={12} color={c.textOnPrimary} />}
          </TouchableOpacity>
          <Text style={[styles.selectAllText, { color: c.text, fontFamily: 'Inter' }]}>Select  All</Text>
          <Text style={[styles.fileCountText, { color: c.text, fontFamily: 'Inter' }]}>{selectedFiles.length} Files Selected</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: c.cardGlassBorder }]} />
        {files.map(file => (
          <View key={file.id} style={styles.fileRow}>
            <TouchableOpacity style={[styles.checkbox, { borderColor: c.textSecondary }, selectedFiles.includes(file.id) && { backgroundColor: c.primary, borderColor: c.primary }]} onPress={() => toggleFile(file.id)}>
              {selectedFiles.includes(file.id) && <Ionicons name="checkmark" size={12} color={c.textOnPrimary} />}
            </TouchableOpacity>
            <Ionicons name="document-outline" size={20} color={c.error} />
            <Text style={[styles.fileNameText, { color: c.text, fontFamily: 'Inter' }]}>{file.name}</Text>
          </View>
        ))}
        <TouchableOpacity style={[styles.shareBtn, { backgroundColor: c.primary }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.shareBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>Share</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar activeTab="card" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  headerRight: { flexDirection: 'row', gap: 12 },
  dimmedContent: { opacity: 0.4, paddingHorizontal: 31, marginBottom: 20 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  publicTagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  prescriptionTitle: { fontSize: 48, fontWeight: '300', letterSpacing: -2.4 },
  shareModal: { position: 'absolute', bottom: 100, left: 0, right: 0, borderTopLeftRadius: 33, borderTopRightRadius: 33, borderWidth: 1, paddingHorizontal: 36, paddingTop: 30, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  selectAllRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 0.7, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: {},
  selectAllText: { fontSize: 14, fontWeight: '700', flex: 1 },
  fileCountText: { fontSize: 14, fontWeight: '700' },
  divider: { height: 1, marginVertical: 12 },
  fileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8, marginBottom: 20 },
  fileNameText: { fontSize: 14, textTransform: 'uppercase' },
  shareBtn: { height: 52, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  shareBtnText: { fontSize: 18, fontWeight: '700' },
});
