import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import EditPinnedVitalsScreen from '../screens/home/EditPinnedVitalsScreen';
import EditPinnedBiomarkersScreen from '../screens/home/EditPinnedBiomarkersScreen';
import HealthWalletScreen from '../screens/healthwallet/HealthWalletScreen';
import AskAIScreen from '../screens/ai/AskAIScreen';
import AskAIChatScreen from '../screens/ai/AskAIChatScreen';
import EmergencyContactsScreen from '../screens/sos/EmergencyContactsScreen';
import SOSMainScreen from '../screens/sos/SOSMainScreen';
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
    </HomeStack.Navigator>
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
      <Tab.Screen name="CardTab" component={HealthWalletScreen} />
      <Tab.Screen name="AITab" component={AIStackNavigator} />
      <Tab.Screen name="SOSTab" component={SOSStackNavigator} />
    </Tab.Navigator>
  );
}
