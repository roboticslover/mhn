import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/onboarding/LoginScreen';
import EnterMobileNumberScreen from '../screens/onboarding/EnterMobileNumberScreen';
import PhoneNumberKeyboardScreen from '../screens/onboarding/PhoneNumberKeyboardScreen';
import VerifyOTPScreen from '../screens/onboarding/VerifyOTPScreen';
import EmailVerificationScreen from '../screens/onboarding/EmailVerificationScreen';
import CheckInboxScreen from '../screens/onboarding/CheckInboxScreen';
import RegisterScreen from '../screens/onboarding/RegisterScreen';
import AllSetScreen from '../screens/onboarding/AllSetScreen';
// Home
import HomeScreen from '../screens/home/HomeScreen';
import EditPinnedVitalsScreen from '../screens/home/EditPinnedVitalsScreen';
import EditPinnedBiomarkersScreen from '../screens/home/EditPinnedBiomarkersScreen';

// Health Wallet
import HealthWalletScreen from '../screens/healthwallet/HealthWalletScreen';

// Prescriptions
import PrescriptionsEmptyScreen from '../screens/healthwallet/prescriptions/PrescriptionsEmptyScreen';
import AllPrescriptionsScreen from '../screens/healthwallet/prescriptions/AllPrescriptionsScreen';
import PrescriptionDetailScreen from '../screens/healthwallet/prescriptions/PrescriptionDetailScreen';
import PrescriptionEditScreen from '../screens/healthwallet/prescriptions/PrescriptionEditScreen';
import PrescriptionUploadScreen from '../screens/healthwallet/prescriptions/PrescriptionUploadScreen';
import PrescriptionShareScreen from '../screens/healthwallet/prescriptions/PrescriptionShareScreen';

// Analytics & Insights
import AnalyticsEmptyScreen from '../screens/healthwallet/analytics/AnalyticsEmptyScreen';
import AnalyticsListScreen from '../screens/healthwallet/analytics/AnalyticsListScreen';
import AnalyticsDetailScreen from '../screens/healthwallet/analytics/AnalyticsDetailScreen';

// Scans
import ScansEmptyScreen from '../screens/healthwallet/scans/ScansEmptyScreen';
import ScansListScreen from '../screens/healthwallet/scans/ScansListScreen';
import ScanDetailScreen from '../screens/healthwallet/scans/ScanDetailScreen';
import ScanUploadScreen from '../screens/healthwallet/scans/ScanUploadScreen';
import ScanEditScreen from '../screens/healthwallet/scans/ScanEditScreen';
import ScanShareScreen from '../screens/healthwallet/scans/ScanShareScreen';

// Insurance
import InsuranceEmptyScreen from '../screens/healthwallet/insurance/InsuranceEmptyScreen';
import InsuranceListScreen from '../screens/healthwallet/insurance/InsuranceListScreen';
import InsuranceDetailScreen from '../screens/healthwallet/insurance/InsuranceDetailScreen';
import InsuranceAddScreen from '../screens/healthwallet/insurance/InsuranceAddScreen';
import InsuranceAddWithFilesScreen from '../screens/healthwallet/insurance/InsuranceAddWithFilesScreen';
import InsuranceShareScreen from '../screens/healthwallet/insurance/InsuranceShareScreen';

// Health Reports
import HealthReportsEmptyScreen from '../screens/healthwallet/healthreports/HealthReportsEmptyScreen';
import HealthReportUploadScreen from '../screens/healthwallet/healthreports/HealthReportUploadScreen';

// Vaccines
import VaccinesEmptyScreen from '../screens/healthwallet/vaccines/VaccinesEmptyScreen';
import VaccineUploadScreen from '../screens/healthwallet/vaccines/VaccineUploadScreen';

// Notifications
import NotificationsEmptyScreen from '../screens/notifications/NotificationsEmptyScreen';
import NotificationsListScreen from '../screens/notifications/NotificationsListScreen';

// Profile
import ProfileScreen from '../screens/profile/ProfileScreen';

// Connect
import DoctorConnectEmptyScreen from '../screens/connect/DoctorConnectEmptyScreen';
import FamilyConnectEmptyScreen from '../screens/connect/FamilyConnectEmptyScreen';

// Medical Information
import MedicalInformationScreen from '../screens/medical/MedicalInformationScreen';
import SurgicalHistoryScreen from '../screens/medical/SurgicalHistoryScreen';
import AllergiesScreen from '../screens/medical/AllergiesScreen';
import MedicalConditionsScreen from '../screens/medical/MedicalConditionsScreen';
import MedicationsScreen from '../screens/medical/MedicationsScreen';

// Profile Sub-screens
import AboutYouScreen from '../screens/profile/AboutYouScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SelectAddressScreen from '../screens/profile/SelectAddressScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';
import TermsAndConditionsScreen from '../screens/profile/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';

// Ask AI
import AskAIScreen from '../screens/ai/AskAIScreen';
import AskAIChatScreen from '../screens/ai/AskAIChatScreen';

// SOS
import SOSMainScreen from '../screens/sos/SOSMainScreen';
import EmergencyContactsScreen from '../screens/sos/EmergencyContactsScreen';
import SOSSendingScreen from '../screens/sos/SOSSendingScreen';
import EnableLocationScreen from '../screens/sos/EnableLocationScreen';
import SOSReceivedScreen from '../screens/sos/SOSReceivedScreen';
import AddContactFromFamilyScreen from '../screens/sos/AddContactFromFamilyScreen';
import AddNewContactScreen from '../screens/sos/AddNewContactScreen';

export type RootStackParamList = {
  Login: undefined;
  EnterMobileNumber: undefined;
  PhoneNumberKeyboard: { country?: any; phone?: string } | undefined;
  VerifyOTP: { country?: any; phone?: string } | undefined;
  EmailVerification: { country?: any; phone?: string } | undefined;
  CheckInbox: { country?: any; phone?: string; email?: string } | undefined;
  Register: undefined;
  AllSet: undefined;
  MainTabs: undefined;
  Home: undefined;
  EditPinnedVitals: undefined;
  EditPinnedBiomarkers: undefined;
  // Health Wallet
  HealthWallet: undefined;
  // Prescriptions
  PrescriptionsEmpty: undefined;
  AllPrescriptions: undefined;
  PrescriptionDetail: undefined;
  PrescriptionEdit: undefined;
  PrescriptionUpload: undefined;
  PrescriptionShare: undefined;
  // Analytics
  AnalyticsEmpty: undefined;
  AnalyticsList: undefined;
  AnalyticsDetail: undefined;
  // Scans
  ScansEmpty: undefined;
  ScansList: undefined;
  ScanDetail: undefined;
  ScanUpload: undefined;
  ScanEdit: undefined;
  ScanShare: undefined;
  // Insurance
  InsuranceEmpty: undefined;
  InsuranceList: undefined;
  InsuranceDetail: undefined;
  InsuranceAdd: undefined;
  InsuranceAddWithFiles: undefined;
  InsuranceShare: undefined;
  // Health Reports
  HealthReportsEmpty: undefined;
  HealthReportUpload: undefined;
  // Vaccines
  VaccinesEmpty: undefined;
  VaccineUpload: undefined;
  // Notifications
  NotificationsEmpty: undefined;
  NotificationsList: undefined;
  // Profile
  Profile: undefined;
  // Connect
  DoctorConnectEmpty: undefined;
  FamilyConnectEmpty: undefined;
  // Medical Information
  MedicalInformation: undefined;
  SurgicalHistory: undefined;
  Allergies: undefined;
  MedicalConditions: undefined;
  Medications: undefined;
  // Profile Sub-screens
  AboutYou: undefined;
  SettingsScreen: undefined;
  ProfileDetail: undefined;
  SelectAddress: undefined;
  AddAddress: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  // Ask AI
  AskAI: undefined;
  AskAIChat: { initialMessage?: string } | undefined;
  // SOS
  SOSMain: undefined;
  EmergencyContacts: undefined;
  SOSSending: undefined;
  EnableLocation: undefined;
  SOSReceived: undefined;
  AddContactFromFamily: undefined;
  AddNewContact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EnterMobileNumber" component={EnterMobileNumberScreen} />
      <Stack.Screen name="PhoneNumberKeyboard" component={PhoneNumberKeyboardScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="CheckInbox" component={CheckInboxScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AllSet" component={AllSetScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditPinnedVitals" component={EditPinnedVitalsScreen} />
      <Stack.Screen name="EditPinnedBiomarkers" component={EditPinnedBiomarkersScreen} />

      {/* Health Wallet */}
      <Stack.Screen name="HealthWallet" component={HealthWalletScreen} />

      {/* Prescriptions */}
      <Stack.Screen name="PrescriptionsEmpty" component={PrescriptionsEmptyScreen} />
      <Stack.Screen name="AllPrescriptions" component={AllPrescriptionsScreen} />
      <Stack.Screen name="PrescriptionDetail" component={PrescriptionDetailScreen} />
      <Stack.Screen name="PrescriptionEdit" component={PrescriptionEditScreen} />
      <Stack.Screen name="PrescriptionUpload" component={PrescriptionUploadScreen} />
      <Stack.Screen name="PrescriptionShare" component={PrescriptionShareScreen} />

      {/* Analytics & Insights */}
      <Stack.Screen name="AnalyticsEmpty" component={AnalyticsEmptyScreen} />
      <Stack.Screen name="AnalyticsList" component={AnalyticsListScreen} />
      <Stack.Screen name="AnalyticsDetail" component={AnalyticsDetailScreen} />

      {/* Scans */}
      <Stack.Screen name="ScansEmpty" component={ScansEmptyScreen} />
      <Stack.Screen name="ScansList" component={ScansListScreen} />
      <Stack.Screen name="ScanDetail" component={ScanDetailScreen} />
      <Stack.Screen name="ScanUpload" component={ScanUploadScreen} />
      <Stack.Screen name="ScanEdit" component={ScanEditScreen} />
      <Stack.Screen name="ScanShare" component={ScanShareScreen} />

      {/* Insurance */}
      <Stack.Screen name="InsuranceEmpty" component={InsuranceEmptyScreen} />
      <Stack.Screen name="InsuranceList" component={InsuranceListScreen} />
      <Stack.Screen name="InsuranceDetail" component={InsuranceDetailScreen} />
      <Stack.Screen name="InsuranceAdd" component={InsuranceAddScreen} />
      <Stack.Screen name="InsuranceAddWithFiles" component={InsuranceAddWithFilesScreen} />
      <Stack.Screen name="InsuranceShare" component={InsuranceShareScreen} />

      {/* Health Reports */}
      <Stack.Screen name="HealthReportsEmpty" component={HealthReportsEmptyScreen} />
      <Stack.Screen name="HealthReportUpload" component={HealthReportUploadScreen} />

      {/* Vaccines */}
      <Stack.Screen name="VaccinesEmpty" component={VaccinesEmptyScreen} />
      <Stack.Screen name="VaccineUpload" component={VaccineUploadScreen} />

      {/* Notifications */}
      <Stack.Screen name="NotificationsEmpty" component={NotificationsEmptyScreen} />
      <Stack.Screen name="NotificationsList" component={NotificationsListScreen} />

      {/* Profile */}
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* Connect */}
      <Stack.Screen name="DoctorConnectEmpty" component={DoctorConnectEmptyScreen} />
      <Stack.Screen name="FamilyConnectEmpty" component={FamilyConnectEmptyScreen} />

      {/* Medical Information */}
      <Stack.Screen name="MedicalInformation" component={MedicalInformationScreen} />
      <Stack.Screen name="SurgicalHistory" component={SurgicalHistoryScreen} />
      <Stack.Screen name="Allergies" component={AllergiesScreen} />
      <Stack.Screen name="MedicalConditions" component={MedicalConditionsScreen} />
      <Stack.Screen name="Medications" component={MedicationsScreen} />

      {/* Profile Sub-screens */}
      <Stack.Screen name="AboutYou" component={AboutYouScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ProfileDetail" component={EditProfileScreen} />
      <Stack.Screen name="SelectAddress" component={SelectAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

      {/* Ask AI */}
      <Stack.Screen name="AskAI" component={AskAIScreen} />
      <Stack.Screen name="AskAIChat" component={AskAIChatScreen} />

      {/* SOS */}
      <Stack.Screen name="SOSMain" component={SOSMainScreen} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
      <Stack.Screen name="SOSSending" component={SOSSendingScreen} />
      <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />
      <Stack.Screen name="SOSReceived" component={SOSReceivedScreen} />
      <Stack.Screen name="AddContactFromFamily" component={AddContactFromFamilyScreen} />
      <Stack.Screen name="AddNewContact" component={AddNewContactScreen} />
    </Stack.Navigator>
  );
}
