import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

export default function EditProfileScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [name, setName] = useState('Praneeth Velpuri');
  const [nickname, setNickname] = useState('User');

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Edit Profile" onBack={() => navigation.goBack()} />

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarRing, { borderColor: c.primary }]}>
            <View style={[styles.avatarInner, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
              <Ionicons name="person" size={48} color={c.textSecondary} />
            </View>
            <TouchableOpacity style={[styles.editBadge, { backgroundColor: c.primary }]}>
              <Ionicons name="pencil" size={15} color={c.textOnPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.avatarLabel, { color: c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>Profile Photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Name */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>Name</Text>
            <View style={[styles.fieldInput, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <TextInput
                style={[styles.inputText, { color: isDark ? '#F4FCEE' : c.text, fontFamily: 'Inter-Medium' }]}
                value={name}
                onChangeText={setName}
              />
              <Ionicons name="person-outline" size={16} color={c.textSecondary} />
            </View>
          </View>

          {/* Nickname */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>Nickname</Text>
            <View style={[styles.fieldInput, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <TextInput
                style={[styles.inputText, { color: isDark ? '#F4FCEE' : c.text, fontFamily: 'Inter-Medium' }]}
                value={nickname}
                onChangeText={setNickname}
              />
              <Ionicons name="at-outline" size={20} color={c.textSecondary} />
            </View>
          </View>

          {/* Email (read-only) */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>Email</Text>
            <View style={[styles.fieldInput, { backgroundColor: cardBg, borderColor: cardBorder, opacity: 0.8 }]}>
              <Text style={[styles.readOnlyText, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>user@Gmail.com</Text>
              <Ionicons name="mail-outline" size={18} color={c.textSecondary} />
            </View>
          </View>

          {/* Phone (read-only) */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>Phone Number</Text>
            <View style={[styles.fieldInput, { backgroundColor: cardBg, borderColor: cardBorder, opacity: 0.8, borderRadius: 33 }]}>
              <Text style={[styles.readOnlyText, { color: isDark ? '#BCCBB8' : c.textSecondary, fontFamily: 'Inter-Medium' }]}>+91 000 000 0000</Text>
              <Ionicons name="call-outline" size={18} color={c.textSecondary} />
            </View>
          </View>

          {/* View Address Details */}
          <TouchableOpacity 
            style={[styles.addressCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
            onPress={() => navigation.navigate('SelectAddress')}
          >
            <View style={styles.addressLeft}>
              <View style={[styles.addressIcon, { backgroundColor: isDark ? 'rgba(34,197,94,0.1)' : 'rgba(57,166,87,0.1)' }]}>
                <Ionicons name="location-outline" size={18} color={c.primary} />
              </View>
              <Text style={[styles.addressText, { color: isDark ? '#F4FCEE' : c.text, fontFamily: 'Inter-Medium' }]}>View Address Details</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={c.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: c.primary }]} onPress={() => navigation.goBack()}>
          <Ionicons name="checkmark" size={18} color={c.textOnPrimary} />
          <Text style={[styles.saveBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarRing: { width: 128, height: 128, borderRadius: 64, borderWidth: 2, padding: 6, marginBottom: 16 },
  avatarInner: { flex: 1, borderRadius: 58, alignItems: 'center', justifyContent: 'center' },
  editBadge: { position: 'absolute', bottom: 4, right: 4, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarLabel: { fontSize: 14, fontWeight: '800', textTransform: 'capitalize', lineHeight: 20 },
  formSection: { marginHorizontal: 24, gap: 24 },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '800', textTransform: 'capitalize', lineHeight: 20 },
  fieldInput: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, borderWidth: 1, paddingHorizontal: 21, paddingVertical: 17 },
  inputText: { flex: 1, fontSize: 16, fontWeight: '500', lineHeight: 24 },
  readOnlyText: { flex: 1, fontSize: 16, fontWeight: '500', lineHeight: 24 },
  addressCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 33, borderWidth: 1, padding: 21 },
  addressLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  addressIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  addressText: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
  saveBtn: { marginHorizontal: 24, height: 56, borderRadius: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32 },
  saveBtnText: { fontSize: 18, fontWeight: '700', lineHeight: 28 },
});
