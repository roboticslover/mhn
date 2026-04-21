import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

// Insurance
import InsuranceEmptyScreen from '../screens/healthwallet/insurance/InsuranceEmptyScreen';
import InsuranceListScreen from '../screens/healthwallet/insurance/InsuranceListScreen';
import InsuranceDetailScreen from '../screens/healthwallet/insurance/InsuranceDetailScreen';

// Health Reports
import HealthReportsEmptyScreen from '../screens/healthwallet/healthreports/HealthReportsEmptyScreen';
import HealthReportUploadScreen from '../screens/healthwallet/healthreports/HealthReportUploadScreen';

// Vaccines
import VaccinesEmptyScreen from '../screens/healthwallet/vaccines/VaccinesEmptyScreen';
import VaccineUploadScreen from '../screens/healthwallet/vaccines/VaccineUploadScreen';

export type RootStackParamList = {
  Login: undefined;
  EnterMobileNumber: undefined;
  PhoneNumberKeyboard: { country?: any; phone?: string } | undefined;
  VerifyOTP: { country?: any; phone?: string } | undefined;
  EmailVerification: { country?: any; phone?: string } | undefined;
  CheckInbox: { country?: any; phone?: string; email?: string } | undefined;
  Register: undefined;
  AllSet: undefined;
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
  // Insurance
  InsuranceEmpty: undefined;
  InsuranceList: undefined;
  InsuranceDetail: undefined;
  // Health Reports
  HealthReportsEmpty: undefined;
  HealthReportUpload: undefined;
  // Vaccines
  VaccinesEmpty: undefined;
  VaccineUpload: undefined;
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

      {/* Insurance */}
      <Stack.Screen name="InsuranceEmpty" component={InsuranceEmptyScreen} />
      <Stack.Screen name="InsuranceList" component={InsuranceListScreen} />
      <Stack.Screen name="InsuranceDetail" component={InsuranceDetailScreen} />

      {/* Health Reports */}
      <Stack.Screen name="HealthReportsEmpty" component={HealthReportsEmptyScreen} />
      <Stack.Screen name="HealthReportUpload" component={HealthReportUploadScreen} />

      {/* Vaccines */}
      <Stack.Screen name="VaccinesEmpty" component={VaccinesEmptyScreen} />
      <Stack.Screen name="VaccineUpload" component={VaccineUploadScreen} />
    </Stack.Navigator>
  );
}
