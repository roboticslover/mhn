import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../../components/BottomNavBar';

const IMG_PROFILE = "https://images.unsplash.com/photo-1584308666744-24d5e4b6c310?q=80&w=896&auto=format&fit=crop";

export default function AllergiesDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const allergy = route?.params?.allergy ?? {
    id: '1',
    name: 'Food',
    impact: 'High Impact',
    triggers: ['Cedar', 'Shellfish', 'Latex'],
    reactions: [
      { title: 'Urticaria', sub: 'Localized skin inflammation' },
      { title: 'Dyspnea', sub: 'Mild respiratory shortness' },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
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
          {/* Sensitivity Vectors */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>SENSITIVITY VECTORS</Text>
              <TouchableOpacity 
                style={styles.editIconContainer}
                onPress={() => navigation.navigate('AllergiesAdd', { allergy })}
              >
                <Ionicons name="pencil" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.vectorCard}>
              <View style={styles.vectorIconContainer}>
                <Ionicons 
                  name={
                    allergy.name === 'Food' ? "restaurant-outline" :
                    allergy.name === 'Respiratory' ? "cloud-outline" :
                    allergy.name === 'Medicine' ? "medical-outline" :
                    allergy.name === 'Environment' ? "leaf-outline" :
                    allergy.name === 'Eyes' ? "eye-outline" :
                    "hand-left-outline"
                  } 
                  size={24} 
                  color="#55EE71" 
                />
              </View>
              <View style={styles.vectorInfo}>
                <Text style={styles.vectorTitle}>{allergy.name}</Text>
                <Text style={[styles.vectorImpact, allergy.impact === 'High Impact' && { color: '#FF6E5D' }]}>
                  {allergy.impact || 'Moderate Impact'}
                </Text>
              </View>
            </View>
          </View>

          {/* Primary Triggers */}
          <View style={styles.section}>
            <View style={styles.triggerHeader}>
              <Ionicons name="flash" size={16} color="#55EE71" />
              <Text style={styles.sectionLabel}>PRIMARY TRIGGERS</Text>
            </View>
            <View style={styles.triggersWrapper}>
              <View style={styles.triggersGrid}>
                {allergy.triggers.map((trigger: string, i: number) => {
                  let icon = "leaf-outline";
                  if (trigger === 'Shellfish') icon = "fish-outline";
                  if (trigger === 'Latex') icon = "close-circle-outline";
                  
                  return (
                    <View key={i} style={styles.triggerTag}>
                      <Ionicons name={icon as any} size={14} color="#BCCBB7" />
                      <Text style={styles.triggerTagText}>{trigger}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Documented Reactions */}
          <View style={styles.section}>
            <View style={styles.triggerHeader}>
              <Ionicons name="medical" size={16} color="#55EE71" />
              <Text style={styles.sectionLabel}>DOCUMENTED REACTIONS</Text>
            </View>
            <View style={styles.reactionsList}>
              {allergy.reactions.map((reaction: any, i: number) => (
                <View key={i} style={styles.reactionItem}>
                  <View style={styles.reactionLeft}>
                    <View style={styles.reactionIndicator} />
                    <View>
                      <Text style={styles.reactionTitle}>{reaction.title}</Text>
                      <Text style={styles.reactionSub}>{reaction.sub}</Text>
                    </View>
                  </View>
                  <Ionicons name="information-circle-outline" size={20} color="rgba(255,255,255,0.4)" />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="home" navigation={navigation} />
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
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#BCCBB7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  editIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vectorCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 33,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  vectorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(85,238,113,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vectorInfo: {
    gap: 2,
  },
  vectorTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  vectorImpact: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FF6E5D',
  },
  triggerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  triggersWrapper: {
    backgroundColor: '#161616',
    borderRadius: 33,
    padding: 24,
  },
  triggersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  triggerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  triggerTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E2E2E2',
  },
  reactionsList: {
    gap: 12,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F1F1F',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reactionIndicator: {
    width: 4,
    height: 32,
    backgroundColor: '#55EE71',
    borderRadius: 2,
  },
  reactionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#E2E2E2',
  },
  reactionSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#BCCBB7',
  },
});
