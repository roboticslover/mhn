import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

interface NotificationItem {
  id: string;
  type: 'critical' | 'connection' | 'report' | 'insurance' | 'deleted';
  title: string;
  body: string;
  time: string;
  tag?: string;
  actionLabel?: string;
  actionLabel2?: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'critical',
    tag: 'CRITICAL',
    title: 'Rahul has an emergency.',
    body: 'Tap to know more.',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'connection',
    title: 'Connection Request',
    body: 'Pavan sent you a family connection request.',
    time: '1h ago',
    actionLabel: 'Accept',
    actionLabel2: 'Decline',
  },
  {
    id: '3',
    type: 'report',
    tag: 'Medical Report',
    title: '',
    body: 'Ram has uploaded a new report to her profile.',
    time: '3h ago',
  },
  {
    id: '4',
    type: 'insurance',
    title: 'Insurance Expiry',
    body: 'Your Health Insurance will expire in 1 day.',
    time: '12h ago',
    actionLabel: 'Renew Now',
  },
  {
    id: '5',
    type: 'report',
    title: 'Report Uploaded',
    body: 'Pavan uploaded your report. Blood test report has been uploaded by your MHN connection.',
    time: 'Yesterday',
  },
  {
    id: '6',
    type: 'deleted',
    title: 'Connection Deleted',
    body: 'Pavan has deleted your connection. Share an invite to reconnect.',
    time: '2d ago',
    actionLabel: 'Invite Again',
  },
];

function getIconForType(type: string): string {
  switch (type) {
    case 'critical': return 'alert-circle';
    case 'connection': return 'person-add';
    case 'report': return 'document-text';
    case 'insurance': return 'shield-checkmark';
    case 'deleted': return 'person-remove';
    default: return 'notifications';
  }
}

function getIconBgForType(type: string, isDark: boolean): string {
  switch (type) {
    case 'critical': return '#36191B';
    case 'connection': return isDark ? '#1F1F1F' : '#F0F0F0';
    case 'report': return isDark ? '#1F1F1F' : '#F0F0F0';
    case 'insurance': return isDark ? '#1F1F1F' : '#F0F0F0';
    case 'deleted': return isDark ? '#1B1B1B' : '#F0F0F0';
    default: return isDark ? '#1F1F1F' : '#F0F0F0';
  }
}

function getIconColorForType(type: string): string {
  switch (type) {
    case 'critical': return '#FC5440';
    case 'report': return '#55EE71';
    default: return '#AAAAAA';
  }
}

export default function NotificationsListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Notifications"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.list}>
          {NOTIFICATIONS.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: notif.type === 'critical'
                    ? '#FC5440'
                    : (isDark ? 'rgba(61,74,59,0.15)' : c.cardBorder),
                  borderLeftWidth: notif.type === 'critical' ? 4 : 1,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                if (notif.type === 'critical') {
                  navigation.navigate('SOSReceived');
                }
              }}
            >
              <View style={styles.cardInner}>
                {/* Icon */}
                <View style={[styles.iconWrap, { backgroundColor: getIconBgForType(notif.type, isDark) }]}>
                  <Ionicons
                    name={getIconForType(notif.type) as any}
                    size={20}
                    color={getIconColorForType(notif.type)}
                  />
                </View>

                {/* Content */}
                <View style={styles.cardContent}>
                  {/* Tag + Time row */}
                  <View style={styles.tagRow}>
                    {notif.tag ? (
                      <Text style={[
                        styles.tag,
                        {
                          color: notif.type === 'critical' ? '#FC5440' : '#55EE71',
                          fontFamily: 'Inter-Bold',
                        },
                      ]}>
                        {notif.tag}
                      </Text>
                    ) : notif.title ? (
                      <Text style={[styles.cardTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
                        {notif.title}
                      </Text>
                    ) : null}
                    <Text style={[styles.time, { color: isDark ? '#BCCBB7' : c.textTertiary, fontFamily: 'Inter' }]}>
                      {notif.time}
                    </Text>
                  </View>

                  {/* Title if we showed tag */}
                  {notif.tag && notif.title ? (
                    <Text style={[styles.cardTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                      {notif.title}
                    </Text>
                  ) : null}

                  {/* Body */}
                  <Text style={[styles.cardBody, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {notif.body}
                  </Text>

                  {/* Action buttons */}
                  {(notif.actionLabel || notif.actionLabel2) && (
                    <View style={styles.actionRow}>
                      {notif.actionLabel && (
                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            notif.type === 'connection'
                              ? { backgroundColor: '#55EE71' }
                              : { borderWidth: 1, borderColor: isDark ? 'rgba(61,74,59,0.3)' : c.cardBorder },
                          ]}
                        >
                          <Text
                            style={[
                              styles.actionBtnText,
                              {
                                color: notif.type === 'connection' ? '#003910' : (notif.type === 'insurance' ? '#55EE71' : (isDark ? '#E2E2E2' : c.text)),
                                fontFamily: 'Inter-Bold',
                              },
                            ]}
                          >
                            {notif.actionLabel}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {notif.actionLabel2 && (
                        <TouchableOpacity
                          style={[styles.actionBtn, { borderWidth: 1, borderColor: isDark ? 'rgba(61,74,59,0.3)' : c.cardBorder }]}
                        >
                          <Text style={[styles.actionBtnText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
                            {notif.actionLabel2}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    marginHorizontal: 24,
    gap: 24,
  },
  card: {
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 20,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  time: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  cardBody: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionBtn: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
