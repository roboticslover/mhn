import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';

export type NavTab = 'home' | 'card' | 'ai' | 'sos' | 'add';

interface BottomNavBarProps {
  activeTab: NavTab;
  navigation: any;
}

/* ─── Icon Components ─── */

// Home outline (inactive)
function HomeOutline({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
      <Path d="M11.3486 20.1699H18.6173" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M2.99805 17.1412C2.99805 10.1025 3.76555 10.5937 7.8968 6.7625C9.7043 5.3075 12.5168 2.5 14.9455 2.5C17.373 2.5 20.2418 5.29375 22.0655 6.7625C26.1968 10.5937 26.963 10.1025 26.963 17.1412C26.963 27.5 24.5143 27.5 14.9805 27.5C5.44681 27.5 2.99805 27.5 2.99805 17.1412Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Home filled (active)
function HomeFilled({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
      <Path d="M14.9453 2.5C17.3728 2.5 20.2417 5.29395 22.0654 6.7627C26.1966 10.5939 26.9629 10.1029 26.9629 17.1416C26.9628 27.5 24.5141 27.5 14.9805 27.5C5.44691 27.5 2.9981 27.5 2.99805 17.1416C2.99805 10.103 3.76547 10.5937 7.89648 6.7627C9.70393 5.30774 12.5166 2.50016 14.9453 2.5ZM11.3477 19.4189C10.9334 19.4189 10.5977 19.7547 10.5977 20.1689C10.5979 20.5829 10.9336 20.9189 11.3477 20.9189H18.6162C19.0303 20.9189 19.3659 20.5829 19.3662 20.1689C19.3662 19.7547 19.0304 19.4189 18.6162 19.4189H11.3477Z" fill={color} />
    </Svg>
  );
}

// Card/Wallet icon (always filled style, color changes)
function CardIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={19} viewBox="0 0 32 27" fill="none">
      <Path d="M25.3333 0H6.66667C2.98533 0 0 2.98533 0 6.66667V20C0 23.6813 2.98533 26.6667 6.66667 26.6667H25.3333C29.0147 26.6667 32 23.6813 32 20V6.66667C32 2.98533 29.0147 0 25.3333 0ZM8.66667 6.66667C10.508 6.66667 12 8.15867 12 10C12 11.8413 10.508 13.3333 8.66667 13.3333C6.82533 13.3333 5.33333 11.8413 5.33333 10C5.33333 8.15867 6.82533 6.66667 8.66667 6.66667ZM12.2707 19.972C12.18 19.9907 12.0893 20 11.9987 20C11.38 20 10.8253 19.5667 10.6947 18.9373C10.5013 18.008 9.64933 17.3333 8.66667 17.3333C7.684 17.3333 6.832 18.008 6.63867 18.9373C6.48933 19.6573 5.78267 20.116 5.06267 19.972C4.34133 19.8227 3.87733 19.116 4.028 18.3947C4.47467 16.2347 6.42667 14.6653 8.66667 14.6653C10.9067 14.6653 12.8587 16.2347 13.3053 18.3947C13.4547 19.116 12.992 19.8213 12.2707 19.972ZM24 20H18.6667C17.9307 20 17.3333 19.4027 17.3333 18.6667C17.3333 17.9307 17.9307 17.3333 18.6667 17.3333H24C24.736 17.3333 25.3333 17.9307 25.3333 18.6667C25.3333 19.4027 24.736 20 24 20ZM26.6667 14.6667H18.6667C17.9307 14.6667 17.3333 14.0693 17.3333 13.3333C17.3333 12.5973 17.9307 12 18.6667 12H26.6667C27.4027 12 28 12.5973 28 13.3333C28 14.0693 27.4027 14.6667 26.6667 14.6667ZM26.6667 9.33333H18.6667C17.9307 9.33333 17.3333 8.736 17.3333 8C17.3333 7.264 17.9307 6.66667 18.6667 6.66667H26.6667C27.4027 6.66667 28 7.264 28 8C28 8.736 27.4027 9.33333 26.6667 9.33333Z" fill={color} />
    </Svg>
  );
}

// Vitals outline (inactive)
function VitalsOutline({ color }: { color: string }) {
  return (
    <Svg width={22} height={21} viewBox="0 0 31 30" fill="none">
      <Path d="M21.7971 29.9992H9.17541C5.06973 29.9937 1.66225 26.8616 1.52207 22.5352C1.3765 17.9491 1.36302 13.3958 1.53285 8.80976C1.6946 4.49152 5.18834 1.41683 9.2509 1.42776L22.1556 1.46603C26.1238 1.47696 29.3615 4.7621 29.5205 8.84255C29.6985 13.4341 29.6823 17.919 29.5367 22.4914C29.4019 26.7906 26.0187 30.0019 21.7944 29.9992H21.7971ZM22.2958 27.7526C25.1641 27.7362 27.3639 25.1972 27.3639 22.4231L27.3585 8.93821C27.3585 5.86352 24.7948 3.64701 21.8915 3.64701L9.09454 3.65247C6.13726 3.65247 3.73531 5.97557 3.66252 9.0694C3.55739 13.568 3.54391 18.0229 3.6814 22.4914C3.78384 25.7711 6.4311 27.8482 9.45038 27.8318L22.2931 27.7553L22.2958 27.7526Z" fill={color} />
      <Path d="M18.553 22.0449C18.4587 22.3374 17.9546 22.8293 17.6607 22.8758C17.3184 22.9305 16.5851 22.4658 16.4746 22.1297L13.5901 13.3456L12.2072 16.7975L8.92099 16.833C8.51931 16.8385 7.8885 16.2891 7.8238 15.9202C7.75101 15.5157 8.19582 14.6684 8.60019 14.6602L10.7919 14.6138L12.4606 9.49201C12.5711 9.15585 13.0914 8.66116 13.4095 8.58464C13.7276 8.50811 14.4447 8.96727 14.5498 9.28157L17.4693 18.0984L18.7337 14.7176C19.8821 14.611 21.4753 14.5755 22.6452 14.7285C23.028 14.7777 23.3462 15.819 23.1709 16.1415C22.9957 16.464 22.3271 16.8221 21.9228 16.833L20.2352 16.874L18.553 22.0449Z" fill={color} />
    </Svg>
  );
}

// Vitals filled (active)
function VitalsFilled({ color }: { color: string }) {
  return (
    <Svg width={22} height={21} viewBox="0 0 32 30" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M22.4573 1.46976C26.4802 1.48088 29.7629 4.76637 29.9241 8.84671C30.1045 13.438 30.0883 17.9229 29.9407 22.4951C29.804 26.7941 26.3736 30.0055 22.0911 30.003H9.29813C5.13575 29.9975 1.68059 26.8654 1.53837 22.5391C1.39078 17.9531 1.37791 13.3995 1.55009 8.81351C1.71412 4.49535 5.25565 1.42078 9.37431 1.43167L22.4573 1.46976ZM13.5921 8.58792C13.2696 8.66445 12.7412 9.15898 12.6292 9.49515L10.9378 14.6162L8.7161 14.6631C8.30617 14.6713 7.85528 15.5184 7.92899 15.9229C7.99459 16.2918 8.63407 16.8414 9.0413 16.836L12.3724 16.8008L13.7747 13.3487L16.6995 22.1328C16.812 22.469 17.5547 22.9335 17.9016 22.8789C18.1995 22.8325 18.7101 22.3403 18.8059 22.0479L20.512 16.877L22.2229 16.836C22.6328 16.8249 23.3097 16.4669 23.4876 16.1446C23.6652 15.8221 23.3433 14.7811 22.9554 14.7315C21.7692 14.5784 20.1538 14.6141 18.9895 14.7207L17.7073 18.1016L14.7474 9.28421C14.6404 8.97001 13.9146 8.51178 13.5921 8.58792Z" fill={color} />
    </Svg>
  );
}

// SOS icon — larger size so it's visually prominent
function SOSIcon({ color }: { color: string }) {
  return (
    <Svg width={36} height={36} viewBox="0 0 56 56" fill="none">
      <Path d="M25.7831 13H28.1885C28.5229 13.1166 29.0171 13.1129 29.3769 13.1777C30.0175 13.2929 30.6464 13.4317 31.2703 13.6184C35.1998 14.7998 38.48 17.5282 40.3573 21.1769C41.0088 22.4475 41.4735 23.8056 41.7372 25.2089C41.7873 25.4835 41.9511 26.7574 42 26.8944V29.1362L41.9915 29.163C41.9007 29.4589 41.8456 30.1921 41.787 30.5294C41.6868 31.1051 41.5667 31.6253 41.4026 32.1882C40.2661 36.0484 37.6364 39.2956 34.0968 41.2099C32.8017 41.9097 31.4123 42.4187 29.9716 42.7211C29.6401 42.7876 28.4178 42.92 28.2454 43H25.8048C25.6334 42.9341 24.4444 42.7826 24.1651 42.7334C23.3424 42.5808 22.5352 42.354 21.7532 42.0564C17.4475 40.4352 14.116 36.9392 12.704 32.5604C12.5328 32.0281 12.3929 31.4862 12.2853 30.9374C12.2315 30.6497 12.0876 29.4189 12 29.2496V26.7511C12.0829 26.578 12.2393 25.2996 12.309 24.961C12.5607 23.7207 12.9739 22.5186 13.5379 21.3856C15.3807 17.6289 18.7094 14.8131 22.7196 13.6186C23.3516 13.4322 23.9944 13.2847 24.6444 13.1771C24.9406 13.1296 25.5183 13.0966 25.7831 13ZM27.3215 33.0687C28.1892 33.0508 28.8293 32.8977 29.4571 32.2458C29.7815 31.9137 30.0086 31.499 30.1135 31.0468C30.2193 30.5992 30.202 30.1406 30.2004 29.6844C30.1957 28.3557 30.2015 27.0251 30.1983 25.6966C30.1965 24.9346 29.9503 24.1999 29.3873 23.6698C28.5463 22.8658 27.5991 22.925 26.5124 22.9457C25.6238 22.9644 24.9617 23.0657 24.3068 23.7483C23.9931 24.076 23.7725 24.4815 23.668 24.923C23.5617 25.3693 23.577 25.8524 23.5772 26.3097C23.5779 27.6436 23.579 28.9739 23.5797 30.3081C23.5802 31.0885 23.8326 31.8123 24.4115 32.3533C25.2875 33.1709 26.2191 33.0752 27.3215 33.0687ZM19.8139 33.035C20.7287 32.8727 21.4446 32.5776 22 31.7947C22.446 31.1659 22.5585 30.3818 22.4262 29.6415C22.1838 28.4259 21.3009 27.8689 20.1897 27.4142C19.2904 27.0463 16.969 26.639 17.9485 25.1146C18.3255 24.5279 19.7059 24.6258 20.2223 25.0093C20.8237 25.4558 20.4975 26.1561 21.1134 26.5451C22.0496 26.8803 22.535 26.1458 22.3729 25.3265C22.0185 23.5356 20.2765 22.8151 18.6216 22.9729C17.728 23.1351 16.9583 23.4213 16.454 24.1855C15.6169 25.4536 15.8844 27.2296 17.209 28.0485C17.5537 28.3023 17.9006 28.4161 18.2856 28.593C19.0037 28.9228 20.5023 29.1327 20.7123 30.0119C20.853 30.6009 20.3696 31.2044 19.7682 31.2689C19.2447 31.3251 18.7064 31.3163 18.2513 31.0015C17.5273 30.5178 18.0496 29.2319 16.7852 29.3916C16.58 29.4175 16.3185 29.5362 16.2214 29.7147C15.7093 30.6563 16.4623 31.9348 17.2543 32.4386C18.0957 32.9738 18.8868 33.1091 19.8139 33.035ZM35.3619 33.0334C36.9228 32.7555 37.9993 31.8682 38.0153 30.1812C38.0291 28.7122 36.9882 27.875 35.7188 27.4094C34.7825 27.0026 32.5905 26.6911 33.4559 25.1726C33.8781 24.432 35.8161 24.587 36.0916 25.4142C36.278 25.9739 36.3037 26.7167 37.1535 26.6215C37.808 26.5481 38.0379 25.9451 37.9179 25.36C37.6088 23.5602 35.8051 22.8049 34.1461 22.9749C33.2615 23.1374 32.4848 23.4345 31.9897 24.1905C31.16 25.4576 31.4235 27.2373 32.7505 28.0507C33.0984 28.3079 33.4418 28.4127 33.8293 28.5937C34.5333 28.9226 36.0379 29.129 36.2454 29.999C36.3887 30.6 35.92 31.1905 35.3162 31.266C34.7968 31.331 34.233 31.3139 33.7833 30.9997C33.0632 30.5146 33.5887 29.2348 32.327 29.3939C32.1234 29.4195 31.8691 29.5244 31.7676 29.7013C31.2417 30.6182 31.985 31.9062 32.7541 32.4112C33.6015 32.9676 34.4143 33.1131 35.3619 33.0334Z" fill={color} />
      <Path d="M26.0892 24.7024C26.5938 24.6565 27.6202 24.6105 28.0658 24.8572C28.5165 25.1067 28.4369 25.8075 28.4373 26.26L28.4379 27.7356L28.4374 29.4958C28.4369 30.2598 28.6111 31.1324 27.6329 31.307C27.0707 31.3485 25.4469 31.4974 25.3731 30.6822C25.3134 30.0221 25.3399 29.2192 25.3394 28.5452L25.3385 26.6762C25.3383 25.9085 25.1355 24.9011 26.0892 24.7024Z" fill={color} />
    </Svg>
  );
}

// Plus icon — bare cross, no circle (circle is the FAB button itself)
function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill={color} />
    </Svg>
  );
}

// Speed-dial: Camera
function CameraIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M15.04 4.0515C16.05 4.4535 16.359 5.8535 16.772 6.3035C17.185 6.7535 17.776 6.9065 18.103 6.9065C19.841 6.9065 21.25 8.3155 21.25 10.0525V15.8475C21.25 18.1775 19.36 20.0675 17.03 20.0675H6.97C4.639 20.0675 2.75 18.1775 2.75 15.8475V10.0525C2.75 8.3155 4.159 6.9065 5.897 6.9065C6.223 6.9065 6.814 6.7535 7.228 6.3035C7.641 5.8535 7.949 4.4535 8.959 4.0515C9.97 3.6495 14.03 3.6495 15.04 4.0515Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.495 9.5H17.504" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M15.1788 13.1282C15.1788 11.3722 13.7558 9.94922 11.9998 9.94922C10.2438 9.94922 8.8208 11.3722 8.8208 13.1282C8.8208 14.8842 10.2438 16.3072 11.9998 16.3072C13.7558 16.3072 15.1788 14.8842 15.1788 13.1282Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Speed-dial: Document / Upload
function DocumentIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15.7161 16.2227H8.49609" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.7161 12.0371H8.49609" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.2511 7.85938H8.49609" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M15.9085 2.75C15.9085 2.75 8.23149 2.754 8.21949 2.754C5.45949 2.771 3.75049 4.587 3.75049 7.357V16.553C3.75049 19.337 5.47249 21.16 8.25649 21.16C8.25649 21.16 15.9325 21.157 15.9455 21.157C18.7055 21.14 20.4155 19.323 20.4155 16.553V7.357C20.4155 4.573 18.6925 2.75 15.9085 2.75Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Speed-dial: Scan
function ScanIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M22.5 12.8047H1.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20.6299 8.59V7.08C20.6299 5.02 18.9589 3.35 16.8969 3.35H15.6919" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3.37012 8.59V7.08C3.37012 5.02 5.04112 3.35 7.10312 3.35H8.33912" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20.6299 12.8047V16.88C20.6299 18.94 18.9589 20.61 16.8969 20.61H15.6919" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3.37012 12.8047V16.88C3.37012 18.94 5.04112 20.61 7.10312 20.61H8.33912" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/* ─── Tab Config ─── */
const TAB_KEYS: NavTab[] = ['home', 'card', 'ai', 'sos'];

const TAB_LABELS: Record<string, string> = {
  home: 'HOME',
  card: 'CARD',
  ai: 'VITALS',
  sos: 'ALERT',
};

const TAB_ROUTES: Record<string, string> = {
  home: 'HomeTab',
  card: 'CardTab',
  ai: 'AITab',
  sos: 'SOSTab',
};

/* ─── Active Tab Item (pill with icon + label) ─── */
function ActiveTabContent({ tab, pillColor, textColor, iconColor }: {
  tab: NavTab; pillColor: string; textColor: string; iconColor: string;
}) {
  const renderIcon = () => {
    switch (tab) {
      case 'home': return <HomeFilled color={iconColor} />;
      case 'card': return <CardIcon color={iconColor} />;
      case 'ai': return <VitalsFilled color={iconColor} />;
      case 'sos': return <SOSIcon color={iconColor} />;
      default: return null;
    }
  };
  return (
    <View style={[styles.activePill, { backgroundColor: pillColor }]}>
      {renderIcon()}
      <Text style={[styles.activeLabel, { color: textColor }]}>
        {TAB_LABELS[tab]}
      </Text>
    </View>
  );
}

/* ─── Inactive Tab Item (just icon) ─── */
function InactiveTabContent({ tab, iconColor }: { tab: NavTab; iconColor: string }) {
  switch (tab) {
    case 'home': return <HomeOutline color={iconColor} />;
    case 'card': return <CardIcon color={iconColor} />;
    case 'ai': return <VitalsOutline color={iconColor} />;
    case 'sos': return <SOSIcon color={iconColor} />;
    default: return null;
  }
}

/* ─── Speed-dial action config ─── */
const SPEED_DIAL_ITEMS = [
  { key: 'scan', label: 'Scan', icon: 'scan' },
  { key: 'document', label: 'Upload', icon: 'document' },
  { key: 'camera', label: 'Camera', icon: 'camera' },
] as const;

/* ─── Main Component ─── */
export default function BottomNavBar({ activeTab, navigation }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [fabOpen, setFabOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const menuAnim = useRef(new Animated.Value(0)).current;

  const barBg = c.navBackground;
  const barBorder = c.navBorder;
  const pillBg = c.navActivePill;
  const pillText = c.navActiveText;
  const pillIcon = isDark ? '#FFFFFF' : '#000000';
  const inactiveIcon = c.navInactive;
  const fabBg = isDark ? '#FFFFFF' : '#141414';
  const fabBorder = barBorder;
  const fabIconColor = isDark ? '#000000' : '#FFFFFF';
  const menuItemBg = isDark ? '#1A1A1A' : '#F5F5F5';
  const menuItemBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  const toggleFab = () => {
    const toValue = fabOpen ? 0 : 1;
    Animated.parallel([
      Animated.spring(rotateAnim, { toValue, useNativeDriver: true, tension: 120, friction: 8 }),
      Animated.spring(menuAnim, { toValue, useNativeDriver: true, tension: 120, friction: 8 }),
    ]).start();
    setFabOpen(!fabOpen);
  };

  const closeFab = () => {
    if (!fabOpen) return;
    Animated.parallel([
      Animated.spring(rotateAnim, { toValue: 0, useNativeDriver: true, tension: 120, friction: 8 }),
      Animated.spring(menuAnim, { toValue: 0, useNativeDriver: true, tension: 120, friction: 8 }),
    ]).start();
    setFabOpen(false);
  };

  const rotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  const handlePress = (key: NavTab) => {
    if (key === activeTab) return;
    const route = TAB_ROUTES[key];
    if (route) navigation.navigate(route);
  };

  const renderSpeedDialIcon = (icon: string, color: string) => {
    switch (icon) {
      case 'camera': return <CameraIcon color={color} />;
      case 'document': return <DocumentIcon color={color} />;
      case 'scan': return <ScanIcon color={color} />;
      default: return null;
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) + 4 }]} pointerEvents="box-none">
      {/* Backdrop to close menu on outside tap */}
      {fabOpen && (
        <Pressable style={StyleSheet.absoluteFill} onPress={closeFab} />
      )}

      {/* Speed-dial menu items (slide up above FAB) */}
      {SPEED_DIAL_ITEMS.map((item, index) => {
        const itemTranslateY = menuAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(72 + index * 68)],
        });
        const itemOpacity = menuAnim.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0, 0, 1],
        });
        const iconColor = isDark ? '#FFFFFF' : '#141414';
        return (
          <Animated.View
            key={item.key}
            style={[
              styles.speedDialItem,
              {
                transform: [{ translateY: itemTranslateY }],
                opacity: itemOpacity,
              },
            ]}
            pointerEvents={fabOpen ? 'auto' : 'none'}
          >
            <Text style={[styles.speedDialLabel, { color: isDark ? '#FFFFFF' : '#141414' }]}>
              {item.label}
            </Text>
            <TouchableOpacity
              style={[styles.speedDialBtn, { backgroundColor: menuItemBg, borderColor: menuItemBorder }]}
              activeOpacity={0.7}
              onPress={closeFab}
            >
              {renderSpeedDialIcon(item.icon, iconColor)}
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <View style={styles.row}>
        {/* Main pill bar */}
        <View style={[styles.bar, { backgroundColor: barBg, borderColor: barBorder }]}>
          {TAB_KEYS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                onPress={() => { closeFab(); handlePress(tab); }}
                onLongPress={tab === 'sos' ? () => navigation.navigate('SOSMain') : undefined}
                delayLongPress={tab === 'sos' ? 3000 : undefined}
                style={isActive ? styles.activeTabTouch : styles.inactiveTabTouch}
              >
                {isActive ? (
                  <ActiveTabContent
                    tab={tab}
                    pillColor={pillBg}
                    textColor={pillText}
                    iconColor={pillIcon}
                  />
                ) : (
                  <InactiveTabContent tab={tab} iconColor={inactiveIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FAB — rotates + → × */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: fabBg, borderColor: fabBorder }]}
          activeOpacity={0.8}
          onPress={toggleFab}
        >
          <Animated.View style={{ transform: [{ rotate }] }}>
            <PlusIcon color={fabIconColor} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  bar: {
    width: 280,
    height: 64,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
    borderWidth: 1,
  },
  activeTabTouch: {
    height: 48,
    width: 106,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTabTouch: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    width: 106,
    height: 48,
    borderRadius: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  speedDialItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  speedDialLabel: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  speedDialBtn: {
    width: 48,
    height: 48,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
