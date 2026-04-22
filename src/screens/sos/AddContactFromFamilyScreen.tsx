import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Close icon
function CloseIcon({ color = '#FFF', size = 12 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path d="M1 1L11 11M11 1L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Person placeholder icon
function PersonIcon({ color = '#666', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={5} r={3} stroke={color} strokeWidth={1.2} />
      <Path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// Plus icon for the illustration badge
function PlusIcon({ color = '#141414', size = 8 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <Path d="M4 0V8M0 4H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

interface FamilyContact {
  id: string;
  name: string;
  relation: string;
}

const FAMILY_CONTACTS: FamilyContact[] = [
  { id: '1', name: 'Jaswanth', relation: 'Friend' },
  { id: '2', name: 'Praneeth', relation: 'Friend' },
  { id: '3', name: 'Abhi', relation: 'Friend' },
  { id: '4', name: 'Venkat', relation: 'Friend' },
];

export default function AddContactFromFamilyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [selectedId, setSelectedId] = useState<string>('1');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Emergency Contacts"
          onBack={() => navigation.goBack()}
        />
      </View>

      {/* Main Glass Modal */}
      <View
        style={[
          styles.modal,
          {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          },
        ]}
      >
        {/* Close button */}
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : 'rgba(0,0,0,0.05)' }]}
          onPress={() => navigation.goBack()}
        >
          <CloseIcon color={c.text} />
        </TouchableOpacity>

        {/* Family illustration */}
        <View style={styles.illustrationSection}>
          <View style={[styles.illustrationCircle, { borderColor: isDark ? 'rgba(85,248,115,0.2)' : 'rgba(57,166,87,0.2)' }]}>
            <View style={[styles.illustrationInner, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
              <PersonIcon color={c.textSecondary} size={40} />
            </View>
          </View>
          <View style={[styles.plusBadge, { backgroundColor: c.primary }]}>
            <PlusIcon color={c.textOnPrimary} />
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
          Add a Contact For{'\n'}Emergency
        </Text>

        {/* Contact selection list */}
        <View
          style={[
            styles.selectionList,
            {
              backgroundColor: isDark ? 'rgba(85,248,115,0.05)' : 'rgba(57,166,87,0.05)',
              borderColor: isDark ? 'rgba(111,251,133,0.4)' : 'rgba(57,166,87,0.3)',
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 260 }}>
            {FAMILY_CONTACTS.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactRow}
                onPress={() => setSelectedId(contact.id)}
                activeOpacity={0.7}
              >
                <View style={styles.contactRowLeft}>
                  <View style={[styles.contactAvatar, { backgroundColor: isDark ? '#262626' : '#E0E0E0' }]}>
                    <PersonIcon color={c.textSecondary} size={16} />
                  </View>
                  <View>
                    <Text style={[styles.contactName, { color: c.text, fontFamily: 'Inter-SemiBold' }]}>
                      {contact.name}
                    </Text>
                    <Text style={[styles.contactRelation, { color: isDark ? '#ABABAB' : c.textSecondary, fontFamily: 'Inter-Medium' }]}>
                      {contact.relation.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radioBtn,
                    {
                      borderColor: selectedId === contact.id ? c.primary : isDark ? '#676767' : '#CCCCCC',
                      backgroundColor: selectedId === contact.id ? c.primary : 'transparent',
                    },
                  ]}
                >
                  {selectedId === contact.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          This is not a replacement to{'\n'}calling 108, but an easy way to{'\n'}alert your family.
        </Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>
            Add Contact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewContact')}
        >
          <Text style={[styles.altText, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>
            Not in family? <Text style={{ color: c.primary }}>Add their number</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modal: {
    marginHorizontal: 16,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  illustrationSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  illustrationCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    padding: 6,
  },
  illustrationInner: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBadge: {
    position: 'absolute',
    bottom: -4,
    right: '50%',
    marginRight: -56,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 24,
  },
  selectionList: {
    marginHorizontal: 24,
    borderRadius: 32,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  contactRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
  },
  contactRelation: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    lineHeight: 20,
  },
  radioBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 20,
    marginHorizontal: 50,
  },
  actionArea: {
    marginHorizontal: 49,
    marginTop: 24,
    gap: 16,
    alignItems: 'center',
  },
  addBtn: {
    width: '100%',
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  altText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
