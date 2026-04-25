import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/onboarding/LoginScreen";
import EnterMobileNumberScreen from "../screens/onboarding/EnterMobileNumberScreen";
import PhoneNumberKeyboardScreen from "../screens/onboarding/PhoneNumberKeyboardScreen";
import VerifyOTPScreen from "../screens/onboarding/VerifyOTPScreen";
import EmailVerificationScreen from "../screens/onboarding/EmailVerificationScreen";
import CheckInboxScreen from "../screens/onboarding/CheckInboxScreen";
import RegisterScreen from "../screens/onboarding/RegisterScreen";
import AllSetScreen from "../screens/onboarding/AllSetScreen";
// Home
import HomeScreen from "../screens/home/HomeScreen";
import EditPinnedVitalsScreen from "../screens/home/EditPinnedVitalsScreen";
import EditPinnedBiomarkersScreen from "../screens/home/EditPinnedBiomarkersScreen";

// Health Wallet
import HealthWalletScreen from "../screens/healthwallet/HealthWalletScreen";
import DemoSelectorScreen from "../screens/healthwallet/DemoSelectorScreen";

// Prescriptions
import PrescriptionsEmptyScreen from "../screens/healthwallet/prescriptions/PrescriptionsEmptyScreen";
import AllPrescriptionsScreen from "../screens/healthwallet/prescriptions/AllPrescriptionsScreen";
import PrescriptionDetailScreen from "../screens/healthwallet/prescriptions/PrescriptionDetailScreen";
import PrescriptionEditScreen from "../screens/healthwallet/prescriptions/PrescriptionEditScreen";
import PrescriptionAddScreen from "../screens/healthwallet/prescriptions/PrescriptionAddScreen";
import PrescriptionUploadScreen from "../screens/healthwallet/prescriptions/PrescriptionUploadScreen";
import PrescriptionShareScreen from "../screens/healthwallet/prescriptions/PrescriptionShareScreen";

// Analytics & Insights
import AnalyticsEmptyScreen from "../screens/healthwallet/analytics/AnalyticsEmptyScreen";
import AnalyticsListScreen from "../screens/healthwallet/analytics/AnalyticsListScreen";
import AnalyticsDetailScreen from "../screens/healthwallet/analytics/AnalyticsDetailScreen";

// Scans
import ScansEmptyScreen from "../screens/healthwallet/scans/ScansEmptyScreen";
import ScansListScreen from "../screens/healthwallet/scans/ScansListScreen";
import ScanDetailScreen from "../screens/healthwallet/scans/ScanDetailScreen";
import ScanUploadScreen from "../screens/healthwallet/scans/ScanUploadScreen";
import ScanEditScreen from "../screens/healthwallet/scans/ScanEditScreen";
import ScanShareScreen from "../screens/healthwallet/scans/ScanShareScreen";

// Insurance
import InsuranceEmptyScreen from "../screens/healthwallet/insurance/InsuranceEmptyScreen";
import InsuranceListScreen from "../screens/healthwallet/insurance/InsuranceListScreen";
import InsuranceDetailScreen from "../screens/healthwallet/insurance/InsuranceDetailScreen";
import InsuranceAddScreen from "../screens/healthwallet/insurance/InsuranceAddScreen";
import InsuranceEditScreen from "../screens/healthwallet/insurance/InsuranceEditScreen";
import InsuranceShareScreen from "../screens/healthwallet/insurance/InsuranceShareScreen";

// Health Reports
import HealthReportsEmptyScreen from "../screens/healthwallet/healthreports/HealthReportsEmptyScreen";
import HealthReportUploadScreen from "../screens/healthwallet/healthreports/HealthReportUploadScreen";
import AllHealthReportsScreen from "../screens/healthwallet/healthreports/AllHealthReportsScreen";
import HealthReportDetailScreen from "../screens/healthwallet/healthreports/HealthReportDetailScreen";
import HealthReportEditScreen from "../screens/healthwallet/healthreports/HealthReportEditScreen";
import HealthReportShareScreen from "../screens/healthwallet/healthreports/HealthReportShareScreen";

// Vaccines
import VaccinesEmptyScreen from "../screens/healthwallet/vaccines/VaccinesEmptyScreen";
import VaccineUploadScreen from "../screens/healthwallet/vaccines/VaccineUploadScreen";
import AllVaccinesScreen from "../screens/healthwallet/vaccines/AllVaccinesScreen";
import VaccineAddScreen from "../screens/healthwallet/vaccines/VaccineAddScreen";
import VaccineEditScreen from "../screens/healthwallet/vaccines/VaccineEditScreen";
import VaccineDetailScreen from "../screens/healthwallet/vaccines/VaccineDetailScreen";
import VaccineShareScreen from "../screens/healthwallet/vaccines/VaccineShareScreen";

// Notifications
import NotificationsEmptyScreen from "../screens/notifications/NotificationsEmptyScreen";
import NotificationsListScreen from "../screens/notifications/NotificationsListScreen";

// Profile
import ProfileScreen from "../screens/profile/ProfileScreen";

// Connect - Doctor
import DoctorConnectEmptyScreen from "../screens/connect/doctor/DoctorConnectEmptyScreen";
import DoctorListScreen from "../screens/connect/doctor/DoctorListScreen";
import DoctorSearchScreen from "../screens/connect/doctor/DoctorSearchScreen";
import DoctorAddScreen from "../screens/connect/doctor/DoctorAddScreen";
import DoctorDetailScreen from "../screens/connect/doctor/DoctorDetailScreen";
import DoctorDetailConnectedScreen from "../screens/connect/doctor/DoctorDetailConnectedScreen";
// Connect - Family
import FamilyConnectEmptyScreen from "../screens/connect/family/FamilyConnectEmptyScreen";
import FamilyListScreen from "../screens/connect/family/FamilyListScreen";
import FamilyAddScreen from "../screens/connect/family/FamilyAddScreen";
import FamilyMemberDetailScreen from "../screens/connect/family/FamilyMemberDetailScreen";
import FamilySharedReportsScreen from "../screens/connect/family/FamilySharedReportsScreen";

// Medical Information
import MedicalInformationScreen from "../screens/medical/MedicalInformationScreen";

// Surgical History
import SurgicalHistoryEmptyScreen from "../screens/medical/surgical-history/SurgicalHistoryEmptyScreen";
import SurgicalHistoryListScreen from "../screens/medical/surgical-history/SurgicalHistoryListScreen";
import SurgicalHistoryDetailScreen from "../screens/medical/surgical-history/SurgicalHistoryDetailScreen";
import SurgicalHistoryAddEditScreen from "../screens/medical/surgical-history/SurgicalHistoryAddEditScreen";

// Allergies
import AllergiesEmptyScreen from "../screens/medical/allergies/AllergiesEmptyScreen";
import AllergiesListScreen from "../screens/medical/allergies/AllergiesListScreen";
import AllergiesDetailScreen from "../screens/medical/allergies/AllergiesDetailScreen";
import AllergiesAddEditScreen from "../screens/medical/allergies/AllergiesAddEditScreen";

// Medical Conditions
import MedicalConditionsEmptyScreen from "../screens/medical/medical-conditions/MedicalConditionsEmptyScreen";
import MedicalConditionsListScreen from "../screens/medical/medical-conditions/MedicalConditionsListScreen";
import MedicalConditionsDetailScreen from "../screens/medical/medical-conditions/MedicalConditionsDetailScreen";
import MedicalConditionsAddEditScreen from "../screens/medical/medical-conditions/MedicalConditionsAddEditScreen";

// Medication
import MedicationEmptyScreen from "../screens/medical/medication/MedicationEmptyScreen";
import MedicationListScreen from "../screens/medical/medication/MedicationListScreen";
import MedicationDetailScreen from "../screens/medical/medication/MedicationDetailScreen";
import MedicationAddEditScreen from "../screens/medical/medication/MedicationAddEditScreen";

// Profile Sub-screens
import AboutYouScreen from "../screens/profile/AboutYouScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SelectAddressScreen from "../screens/profile/SelectAddressScreen";
import AddAddressScreen from "../screens/profile/AddAddressScreen";
import TermsAndConditionsScreen from "../screens/profile/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";

// Ask AI
import AskAIScreen from "../screens/ai/AskAIScreen";
import AskAIChatScreen from "../screens/ai/AskAIChatScreen";

// SOS
import SOSMainScreen from "../screens/sos/SOSMainScreen";
import EmergencyContactsScreen from "../screens/sos/EmergencyContactsScreen";
import SOSSendingScreen from "../screens/sos/SOSSendingScreen";
import EnableLocationScreen from "../screens/sos/EnableLocationScreen";
import SOSReceivedScreen from "../screens/sos/SOSReceivedScreen";
import AddContactFromFamilyScreen from "../screens/sos/AddContactFromFamilyScreen";
import AddNewContactScreen from "../screens/sos/AddNewContactScreen";

// Tracker
import PeriodTrackerScreen from "../screens/tracker/period/PeriodTrackerScreen";
import AddPeriodScreen from "../screens/tracker/period/AddPeriodScreen";
import WeightTrackerScreen from "../screens/tracker/weight/WeightTrackerScreen";
import AddWeightScreen from "../screens/tracker/weight/AddWeightScreen";

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
  DemoSelector: { title: string; withDataRoute: string; emptyRoute: string };
  // Prescriptions
  PrescriptionsEmpty: undefined;
  AllPrescriptions: undefined;
  PrescriptionDetail: undefined;
  PrescriptionEdit: undefined;
  PrescriptionAdd: undefined;
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
  InsuranceEdit: undefined;
  InsuranceShare: undefined;
  // Health Reports
  HealthReportsEmpty: undefined;
  HealthReportUpload: undefined;
  AllHealthReports: undefined;
  HealthReportDetail: undefined;
  HealthReportEdit: undefined;
  HealthReportShare: undefined;
  // Vaccines
  VaccinesEmpty: undefined;
  VaccineUpload: undefined;
  AllVaccines: undefined;
  VaccineAdd: undefined;
  VaccineEdit: undefined;
  VaccineDetail: { vaccineId?: string } | undefined;
  VaccineShare: undefined;
  // Notifications
  NotificationsEmpty: undefined;
  NotificationsList: undefined;
  // Profile
  Profile: undefined;
  // Connect - Doctor
  DoctorConnectEmpty: undefined;
  DoctorListScreen: undefined;
  DoctorSearchScreen: undefined;
  DoctorAddScreen: undefined;
  DoctorDetailScreen: { doctor?: any } | undefined;
  DoctorDetailConnectedScreen: { doctor?: any } | undefined;
  // Connect - Family
  FamilyConnectEmpty: undefined;
  FamilyListScreen: undefined;
  FamilyAddScreen: undefined;
  FamilyMemberDetailScreen: { member?: any } | undefined;
  FamilySharedReportsScreen: { member?: any } | undefined;
  // Medical Information
  MedicalInformation: undefined;
  // Surgical History
  SurgicalHistoryEmpty: undefined;
  SurgicalHistoryList: undefined;
  SurgicalHistoryDetail: { record?: any } | undefined;
  SurgicalHistoryAdd: { record?: any } | undefined;
  SurgicalHistoryEdit: { record?: any } | undefined;
  AllergiesEmpty: undefined;
  // Allergies
  AllergiesList: undefined;
  AllergiesDetail: { allergy?: any } | undefined;
  AllergiesAdd: { allergy?: any } | undefined;
  // Medical Conditions
  MedicalConditionsEmpty: undefined;
  MedicalConditionsList: undefined;
  MedicalConditionsDetail: { condition?: any } | undefined;
  MedicalConditionsAdd: { condition?: any } | undefined;
  // Medication
  MedicationEmpty: undefined;
  MedicationList: undefined;
  MedicationDetail: { medication?: any } | undefined;
  MedicationAdd: { medication?: any } | undefined;
  MedicationEdit: { medication?: any } | undefined;
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
  // Tracker
  PeriodTracker: undefined;
  AddPeriod: undefined;
  WeightTracker: undefined;
  AddWeight: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="EnterMobileNumber"
        component={EnterMobileNumberScreen}
      />
      <Stack.Screen
        name="PhoneNumberKeyboard"
        component={PhoneNumberKeyboardScreen}
      />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
      <Stack.Screen name="CheckInbox" component={CheckInboxScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AllSet" component={AllSetScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="EditPinnedVitals"
        component={EditPinnedVitalsScreen}
      />
      <Stack.Screen
        name="EditPinnedBiomarkers"
        component={EditPinnedBiomarkersScreen}
      />

      {/* Health Wallet */}
      <Stack.Screen name="HealthWallet" component={HealthWalletScreen} />
      <Stack.Screen name="DemoSelector" component={DemoSelectorScreen} />

      {/* Prescriptions */}
      <Stack.Screen
        name="PrescriptionsEmpty"
        component={PrescriptionsEmptyScreen}
      />
      <Stack.Screen
        name="AllPrescriptions"
        component={AllPrescriptionsScreen}
      />
      <Stack.Screen
        name="PrescriptionDetail"
        component={PrescriptionDetailScreen}
      />
      <Stack.Screen
        name="PrescriptionEdit"
        component={PrescriptionEditScreen}
      />
      <Stack.Screen name="PrescriptionAdd" component={PrescriptionAddScreen} />
      <Stack.Screen
        name="PrescriptionUpload"
        component={PrescriptionUploadScreen}
      />
      <Stack.Screen
        name="PrescriptionShare"
        component={PrescriptionShareScreen}
      />

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
      <Stack.Screen
        name="InsuranceEdit"
        component={InsuranceEditScreen}
      />
      <Stack.Screen name="InsuranceShare" component={InsuranceShareScreen} />

      {/* Health Reports */}
      <Stack.Screen
        name="HealthReportsEmpty"
        component={HealthReportsEmptyScreen}
      />
      <Stack.Screen
        name="HealthReportUpload"
        component={HealthReportUploadScreen}
      />
      <Stack.Screen
        name="AllHealthReports"
        component={AllHealthReportsScreen}
      />
      <Stack.Screen
        name="HealthReportDetail"
        component={HealthReportDetailScreen}
      />
      <Stack.Screen
        name="HealthReportEdit"
        component={HealthReportEditScreen}
      />
      <Stack.Screen
        name="HealthReportShare"
        component={HealthReportShareScreen}
      />

      {/* Vaccines */}
      <Stack.Screen name="VaccinesEmpty" component={VaccinesEmptyScreen} />
      <Stack.Screen name="VaccineUpload" component={VaccineUploadScreen} />
      <Stack.Screen name="AllVaccines" component={AllVaccinesScreen} />
      <Stack.Screen name="VaccineAdd" component={VaccineAddScreen} />
      <Stack.Screen name="VaccineEdit" component={VaccineEditScreen} />
      <Stack.Screen name="VaccineDetail" component={VaccineDetailScreen} />
      <Stack.Screen name="VaccineShare" component={VaccineShareScreen} />

      {/* Notifications */}
      <Stack.Screen
        name="NotificationsEmpty"
        component={NotificationsEmptyScreen}
      />
      <Stack.Screen
        name="NotificationsList"
        component={NotificationsListScreen}
      />

      {/* Profile */}
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* Connect - Doctor */}
      <Stack.Screen
        name="DoctorConnectEmpty"
        component={DoctorConnectEmptyScreen}
      />
      <Stack.Screen name="DoctorListScreen" component={DoctorListScreen} />
      <Stack.Screen name="DoctorSearchScreen" component={DoctorSearchScreen} />
      <Stack.Screen name="DoctorAddScreen" component={DoctorAddScreen} />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
      <Stack.Screen
        name="DoctorDetailConnectedScreen"
        component={DoctorDetailConnectedScreen}
      />
      {/* Connect - Family */}
      <Stack.Screen
        name="FamilyConnectEmpty"
        component={FamilyConnectEmptyScreen}
      />
      <Stack.Screen name="FamilyListScreen" component={FamilyListScreen} />
      <Stack.Screen name="FamilyAddScreen" component={FamilyAddScreen} />
      <Stack.Screen
        name="FamilyMemberDetailScreen"
        component={FamilyMemberDetailScreen}
      />
      <Stack.Screen
        name="FamilySharedReportsScreen"
        component={FamilySharedReportsScreen}
      />

      {/* Medical Information */}
      <Stack.Screen
        name="MedicalInformation"
        component={MedicalInformationScreen}
      />
      {/* Surgical History */}
      <Stack.Screen
        name="SurgicalHistoryEmpty"
        component={SurgicalHistoryEmptyScreen}
      />
      <Stack.Screen
        name="SurgicalHistoryList"
        component={SurgicalHistoryListScreen}
      />
      <Stack.Screen
        name="SurgicalHistoryDetail"
        component={SurgicalHistoryDetailScreen}
      />
      <Stack.Screen
        name="SurgicalHistoryAdd"
        component={SurgicalHistoryAddEditScreen}
      />
      <Stack.Screen
        name="SurgicalHistoryEdit"
        component={SurgicalHistoryAddEditScreen}
      />
      {/* Allergies */}
      <Stack.Screen name="AllergiesEmpty" component={AllergiesEmptyScreen} />
      <Stack.Screen name="AllergiesList" component={AllergiesListScreen} />
      <Stack.Screen name="AllergiesDetail" component={AllergiesDetailScreen} />
      <Stack.Screen name="AllergiesAdd" component={AllergiesAddEditScreen} />
      {/* Medical Conditions */}
      <Stack.Screen
        name="MedicalConditionsEmpty"
        component={MedicalConditionsEmptyScreen}
      />
      <Stack.Screen
        name="MedicalConditionsList"
        component={MedicalConditionsListScreen}
      />
      <Stack.Screen
        name="MedicalConditionsDetail"
        component={MedicalConditionsDetailScreen}
      />
      <Stack.Screen
        name="MedicalConditionsAdd"
        component={MedicalConditionsAddEditScreen}
      />
      {/* Medication */}
      <Stack.Screen name="MedicationEmpty" component={MedicationEmptyScreen} />
      <Stack.Screen name="MedicationList" component={MedicationListScreen} />
      <Stack.Screen
        name="MedicationDetail"
        component={MedicationDetailScreen}
      />
      <Stack.Screen name="MedicationAdd" component={MedicationAddEditScreen} />
      <Stack.Screen name="MedicationEdit" component={MedicationAddEditScreen} />

      {/* Profile Sub-screens */}
      <Stack.Screen name="AboutYou" component={AboutYouScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ProfileDetail" component={EditProfileScreen} />
      <Stack.Screen name="SelectAddress" component={SelectAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

      {/* Ask AI */}
      <Stack.Screen name="AskAI" component={AskAIScreen} />
      <Stack.Screen name="AskAIChat" component={AskAIChatScreen} />

      {/* SOS */}
      <Stack.Screen name="SOSMain" component={SOSMainScreen} />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
      />
      <Stack.Screen name="SOSSending" component={SOSSendingScreen} />
      <Stack.Screen name="EnableLocation" component={EnableLocationScreen} />
      <Stack.Screen name="SOSReceived" component={SOSReceivedScreen} />
      <Stack.Screen
        name="AddContactFromFamily"
        component={AddContactFromFamilyScreen}
      />
      <Stack.Screen name="AddNewContact" component={AddNewContactScreen} />
      
      {/* Tracker */}
      <Stack.Screen name="PeriodTracker" component={PeriodTrackerScreen} />
      <Stack.Screen name="AddPeriod" component={AddPeriodScreen} />
      <Stack.Screen name="WeightTracker" component={WeightTrackerScreen} />
      <Stack.Screen name="AddWeight" component={AddWeightScreen} />
    </Stack.Navigator>
  );
}
