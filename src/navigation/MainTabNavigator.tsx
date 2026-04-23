import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home screens
import HomeScreen from '../screens/home/HomeScreen';
import EditPinnedVitalsScreen from '../screens/home/EditPinnedVitalsScreen';
import EditPinnedBiomarkersScreen from '../screens/home/EditPinnedBiomarkersScreen';

// Health Wallet screens
import HealthWalletScreen from '../screens/healthwallet/HealthWalletScreen';
import PrescriptionsEmptyScreen from '../screens/healthwallet/prescriptions/PrescriptionsEmptyScreen';
import AllPrescriptionsScreen from '../screens/healthwallet/prescriptions/AllPrescriptionsScreen';
import PrescriptionDetailScreen from '../screens/healthwallet/prescriptions/PrescriptionDetailScreen';
import PrescriptionEditScreen from '../screens/healthwallet/prescriptions/PrescriptionEditScreen';
import PrescriptionUploadScreen from '../screens/healthwallet/prescriptions/PrescriptionUploadScreen';
import PrescriptionShareScreen from '../screens/healthwallet/prescriptions/PrescriptionShareScreen';
import AnalyticsEmptyScreen from '../screens/healthwallet/analytics/AnalyticsEmptyScreen';
import AnalyticsListScreen from '../screens/healthwallet/analytics/AnalyticsListScreen';
import AnalyticsDetailScreen from '../screens/healthwallet/analytics/AnalyticsDetailScreen';
import ScansEmptyScreen from '../screens/healthwallet/scans/ScansEmptyScreen';
import ScansListScreen from '../screens/healthwallet/scans/ScansListScreen';
import ScanDetailScreen from '../screens/healthwallet/scans/ScanDetailScreen';
import ScanUploadScreen from '../screens/healthwallet/scans/ScanUploadScreen';
import ScanEditScreen from '../screens/healthwallet/scans/ScanEditScreen';
import ScanShareScreen from '../screens/healthwallet/scans/ScanShareScreen';
import InsuranceEmptyScreen from '../screens/healthwallet/insurance/InsuranceEmptyScreen';
import InsuranceListScreen from '../screens/healthwallet/insurance/InsuranceListScreen';
import InsuranceDetailScreen from '../screens/healthwallet/insurance/InsuranceDetailScreen';
import InsuranceAddScreen from '../screens/healthwallet/insurance/InsuranceAddScreen';
import InsuranceAddWithFilesScreen from '../screens/healthwallet/insurance/InsuranceAddWithFilesScreen';
import InsuranceShareScreen from '../screens/healthwallet/insurance/InsuranceShareScreen';
import HealthReportsEmptyScreen from '../screens/healthwallet/healthreports/HealthReportsEmptyScreen';
import HealthReportUploadScreen from '../screens/healthwallet/healthreports/HealthReportUploadScreen';
import VaccinesEmptyScreen from '../screens/healthwallet/vaccines/VaccinesEmptyScreen';
import VaccineUploadScreen from '../screens/healthwallet/vaccines/VaccineUploadScreen';

// AI screens
import AskAIScreen from '../screens/ai/AskAIScreen';
import AskAIChatScreen from '../screens/ai/AskAIChatScreen';

// SOS screens
import EmergencyContactsScreen from '../screens/sos/EmergencyContactsScreen';
import SOSMainScreen from '../screens/sos/SOSMainScreen';
import SOSReceivedScreen from '../screens/sos/SOSReceivedScreen';
import EnableLocationScreen from '../screens/sos/EnableLocationScreen';
import AddContactFromFamilyScreen from '../screens/sos/AddContactFromFamilyScreen';
import AddNewContactScreen from '../screens/sos/AddNewContactScreen';

// Connect screens (sub-screens of Home)
import DoctorConnectEmptyScreen from '../screens/connect/DoctorConnectEmptyScreen';
import FamilyConnectEmptyScreen from '../screens/connect/FamilyConnectEmptyScreen';

// Medical screens (sub-screens of Home)
import MedicalInformationScreen from '../screens/medical/MedicalInformationScreen';

import BottomNavBar from '../components/BottomNavBar';
import type { NavTab } from '../components/BottomNavBar';

export type MainTabParamList = {
  HomeTab: undefined;
  CardTab: undefined;
  AITab: undefined;
  SOSTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

/* ─── Home stack (home + sub-screens that still show navbar) ─── */
const HomeStack = createNativeStackNavigator();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="EditPinnedVitals" component={EditPinnedVitalsScreen} />
      <HomeStack.Screen name="EditPinnedBiomarkers" component={EditPinnedBiomarkersScreen} />
      <HomeStack.Screen name="DoctorConnectEmpty" component={DoctorConnectEmptyScreen} />
      <HomeStack.Screen name="FamilyConnectEmpty" component={FamilyConnectEmptyScreen} />
      <HomeStack.Screen name="MedicalInformation" component={MedicalInformationScreen} />
    </HomeStack.Navigator>
  );
}

/* ─── Card/Health Wallet stack ─── */
const CardStack = createNativeStackNavigator();
function CardStackNavigator() {
  return (
    <CardStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <CardStack.Screen name="HealthWallet" component={HealthWalletScreen} />
      {/* Prescriptions */}
      <CardStack.Screen name="PrescriptionsEmpty" component={PrescriptionsEmptyScreen} />
      <CardStack.Screen name="AllPrescriptions" component={AllPrescriptionsScreen} />
      <CardStack.Screen name="PrescriptionDetail" component={PrescriptionDetailScreen} />
      <CardStack.Screen name="PrescriptionEdit" component={PrescriptionEditScreen} />
      <CardStack.Screen name="PrescriptionUpload" component={PrescriptionUploadScreen} />
      <CardStack.Screen name="PrescriptionShare" component={PrescriptionShareScreen} />
      {/* Analytics */}
      <CardStack.Screen name="AnalyticsEmpty" component={AnalyticsEmptyScreen} />
      <CardStack.Screen name="AnalyticsList" component={AnalyticsListScreen} />
      <CardStack.Screen name="AnalyticsDetail" component={AnalyticsDetailScreen} />
      {/* Scans */}
      <CardStack.Screen name="ScansEmpty" component={ScansEmptyScreen} />
      <CardStack.Screen name="ScansList" component={ScansListScreen} />
      <CardStack.Screen name="ScanDetail" component={ScanDetailScreen} />
      <CardStack.Screen name="ScanUpload" component={ScanUploadScreen} />
      <CardStack.Screen name="ScanEdit" component={ScanEditScreen} />
      <CardStack.Screen name="ScanShare" component={ScanShareScreen} />
      {/* Insurance */}
      <CardStack.Screen name="InsuranceEmpty" component={InsuranceEmptyScreen} />
      <CardStack.Screen name="InsuranceList" component={InsuranceListScreen} />
      <CardStack.Screen name="InsuranceDetail" component={InsuranceDetailScreen} />
      <CardStack.Screen name="InsuranceAdd" component={InsuranceAddScreen} />
      <CardStack.Screen name="InsuranceAddWithFiles" component={InsuranceAddWithFilesScreen} />
      <CardStack.Screen name="InsuranceShare" component={InsuranceShareScreen} />
      {/* Health Reports */}
      <CardStack.Screen name="HealthReportsEmpty" component={HealthReportsEmptyScreen} />
      <CardStack.Screen name="HealthReportUpload" component={HealthReportUploadScreen} />
      {/* Vaccines */}
      <CardStack.Screen name="VaccinesEmpty" component={VaccinesEmptyScreen} />
      <CardStack.Screen name="VaccineUpload" component={VaccineUploadScreen} />
    </CardStack.Navigator>
  );
}

/* ─── AI/Vitals stack ─── */
const AIStack = createNativeStackNavigator();
function AIStackNavigator() {
  return (
    <AIStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <AIStack.Screen name="AskAI" component={AskAIScreen} />
      <AIStack.Screen name="AskAIChat" component={AskAIChatScreen} />
    </AIStack.Navigator>
  );
}

/* ─── SOS stack ─── */
const SOSStack = createNativeStackNavigator();
function SOSStackNavigator() {
  return (
    <SOSStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <SOSStack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
      <SOSStack.Screen name="SOSMain" component={SOSMainScreen} />
      <SOSStack.Screen name="SOSReceived" component={SOSReceivedScreen} />
      <SOSStack.Screen name="EnableLocation" component={EnableLocationScreen} />
      <SOSStack.Screen name="AddContactFromFamily" component={AddContactFromFamilyScreen} />
      <SOSStack.Screen name="AddNewContact" component={AddNewContactScreen} />
    </SOSStack.Navigator>
  );
}

/* ─── Tab → NavTab key mapping ─── */
const ROUTE_TO_TAB: Record<string, NavTab> = {
  HomeTab: 'home',
  CardTab: 'card',
  AITab: 'ai',
  SOSTab: 'sos',
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const currentRoute = state.routes[state.index].name;
        const activeTab = ROUTE_TO_TAB[currentRoute] ?? 'home';
        return (
          <BottomNavBar
            activeTab={activeTab}
            navigation={navigation}
          />
        );
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="CardTab" component={CardStackNavigator} />
      <Tab.Screen name="AITab" component={AIStackNavigator} />
      <Tab.Screen name="SOSTab" component={SOSStackNavigator} />
    </Tab.Navigator>
  );
}
