import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated,
  Easing,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { FarmerWeatherCard } from '../../src/components/farmer/FarmerWeatherCard';
import {
  mockFarmerProfile,
  mockWeatherMetrics,
  mockFarmerStats,
  mockQuickFeatures,
  mockFields,
} from '../../src/constants/farmerMockData';

export default function FarmerHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  // Ensure the plant growth animation and loop run reliably on dashboard
  const isFocused = true;

  // Staggered Entrance Animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-15)).current;
  const weatherFade = useRef(new Animated.Value(0)).current;
  const weatherSlide = useRef(new Animated.Value(20)).current;
  const statsFade = useRef(new Animated.Value(0)).current;
  const statsSlide = useRef(new Animated.Value(20)).current;
  const actionsFade = useRef(new Animated.Value(0)).current;
  const actionsSlide = useRef(new Animated.Value(25)).current;

  // Summary numbers count-up animated values
  const countCropsAnim = useRef(new Animated.Value(0)).current;
  const countRecordsAnim = useRef(new Animated.Value(0)).current;
  const countHarvestAnim = useRef(new Animated.Value(0)).current;

  const [displayCrops, setDisplayCrops] = useState(0);
  const [displayRecords, setDisplayRecords] = useState(0);
  const [displayHarvest, setDisplayHarvest] = useState(0);

  // Button Press Feedback Animations
  const recordBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Staggered section entrances
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(weatherFade, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(weatherSlide, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(statsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(statsSlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(actionsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(actionsSlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();

    // 2. Count-up animation listeners
    countCropsAnim.addListener(({ value }) => setDisplayCrops(Math.round(value)));
    countRecordsAnim.addListener(({ value }) => setDisplayRecords(Math.round(value)));
    countHarvestAnim.addListener(({ value }) => setDisplayHarvest(Math.round(value)));

    Animated.parallel([
      Animated.timing(countCropsAnim, {
        toValue: mockFarmerStats.activeCrops,
        duration: 900,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(countRecordsAnim, {
        toValue: mockFarmerStats.recordsMonthCount,
        duration: 1100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(countHarvestAnim, {
        toValue: mockFarmerStats.readyToHarvestCount,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      countCropsAnim.removeAllListeners();
      countRecordsAnim.removeAllListeners();
      countHarvestAnim.removeAllListeners();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // TODO: Connect to Supabase to refetch farmer stats, weather, and harvests
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const handlePressInRecord = () => {
    Animated.spring(recordBtnScale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOutRecord = () => {
    Animated.spring(recordBtnScale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const handleAddRecord = () => {
    // Navigate to live photo evidence capture
    router.push('/(farmer)/harvests/new');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You have 1 harvest alert and 2 new orders waiting for review.');
  };

  const handleSearchPress = () => {
    Alert.alert('Search', 'Search through crops, cultivation stages, batches, and records.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EFE6" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1E3C25" />
        }
      >
        {/* 1. Header Greeting Section */}
        <Animated.View
          style={[
            styles.headerRow,
            {
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            },
          ]}
        >
          <View style={styles.headerLeft}>
            {/* Farmer Avatar with green border ring */}
            <TouchableOpacity
              style={styles.avatarBorder}
              activeOpacity={0.8}
              onPress={() => router.push('/(farmer)/profile')}
            >
              <Image
                source={{ uri: mockFarmerProfile.avatarUrl }}
                style={styles.avatarImg}
              />
            </TouchableOpacity>

            <View style={styles.greetingTextGroup}>
              <Text style={styles.welcomeSub}>Welcome back! 🍃</Text>
              <Text style={styles.farmerName}>{mockFarmerProfile.fullName}</Text>
            </View>
          </View>

          {/* Top-Right Circular Action Icons */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.circleIconBtn}
              activeOpacity={0.7}
              onPress={handleSearchPress}
            >
              <Feather name="search" size={18} color="#203E26" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleIconBtn}
              activeOpacity={0.7}
              onPress={handleNotificationPress}
            >
              <Feather name="bell" size={18} color="#203E26" />
              {/* Notification orange indicator dot */}
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* 2. Top Weather & Growing Plant Animation Hero Card */}
        <Animated.View
          style={[
            styles.weatherCardWrapper,
            {
              opacity: weatherFade,
              transform: [{ translateY: weatherSlide }],
            },
          ]}
        >
          <FarmerWeatherCard weather={mockWeatherMetrics} isFocused={isFocused} />
        </Animated.View>

        {/* 3. Three Summary Metrics Cards (Active crops, Records, Ready to harvest) */}
        <Animated.View
          style={[
            styles.statsRow,
            {
              opacity: statsFade,
              transform: [{ translateY: statsSlide }],
            },
          ]}
        >
          {/* Card 1: Active crops */}
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#1B4725' }]}>{displayCrops}</Text>
            <Text style={styles.statLabel}>Active crops</Text>
          </View>

          {/* Card 2: Records · Month */}
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#1B4725' }]}>{displayRecords}</Text>
            <Text style={styles.statLabel}>Records · {mockFarmerStats.monthName}</Text>
          </View>

          {/* Card 3: Ready to harvest */}
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#E46724' }]}>{displayHarvest}</Text>
            <Text style={styles.statLabel}>Ready to harvest</Text>
          </View>
        </Animated.View>

        {/* 4. Large Action Card: "Add a record" */}
        <Animated.View
          style={[
            styles.addRecordWrapper,
            {
              opacity: actionsFade,
              transform: [{ translateY: actionsSlide }],
            },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: recordBtnScale }] }}>
            <TouchableOpacity
              style={styles.addRecordCard}
              activeOpacity={0.9}
              onPressIn={handlePressInRecord}
              onPressOut={handlePressOutRecord}
              onPress={handleAddRecord}
            >
              <View style={styles.cameraIconCircle}>
                <Ionicons name="camera-outline" size={24} color="#16351E" />
              </View>

              <View style={styles.addRecordTextGroup}>
                <Text style={styles.addRecordTitle}>Add a record</Text>
                <Text style={styles.addRecordSubtitle}>
                  Capture live photo evidence of today's work
                </Text>
              </View>

              <View style={styles.diagonalArrowCircle}>
                <Feather name="arrow-up-right" size={18} color="#D6EBD9" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* 5. Three Rounded Quick Action Cards (My Crops, Trace, Catalogue) */}
        <Animated.View
          style={[
            styles.quickFeaturesRow,
            {
              opacity: actionsFade,
              transform: [{ translateY: actionsSlide }],
            },
          ]}
        >
          {mockQuickFeatures.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.featureCard, { backgroundColor: item.bgTint }]}
              activeOpacity={0.8}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.featureTopRow}>
                <View style={[styles.featureIconBadge, { backgroundColor: item.themeColor }]}>
                  <MaterialCommunityIcons
                    name={item.iconName as any}
                    size={18}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.featureArrow}>
                  <Feather name="arrow-up-right" size={13} color="#7E9484" />
                </View>
              </View>

              <View style={styles.featureBottom}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <View style={styles.subtextRow}>
                  {item.badgeDotColor ? (
                    <View style={[styles.statusDot, { backgroundColor: item.badgeDotColor }]} />
                  ) : null}
                  <Text style={styles.featureSubtext}>{item.subtext}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* 6. Section: "My Fields" */}
        <Animated.View
          style={[
            styles.myFieldsSection,
            {
              opacity: actionsFade,
              transform: [{ translateY: actionsSlide }],
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>My Fields</Text>
            <TouchableOpacity
              style={styles.seeAllBtn}
              activeOpacity={0.7}
              onPress={() => router.push('/(farmer)/harvests')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <Feather name="chevron-right" size={14} color="#5D7A65" />
            </TouchableOpacity>
          </View>

          {/* Field Cards Preview */}
          {mockFields.map((field) => (
            <TouchableOpacity
              key={field.id}
              style={styles.fieldCard}
              activeOpacity={0.8}
              onPress={() => router.push('/(farmer)/harvests')}
            >
              <View style={styles.fieldEmojiBadge}>
                <Text style={styles.fieldEmoji}>{field.cropEmoji}</Text>
              </View>

              <View style={styles.fieldDetails}>
                <Text style={styles.fieldName}>{field.name}</Text>
                <Text style={styles.fieldCrop}>
                  {field.cropName} · {field.areaAcres} acres · {field.stageName}
                </Text>
              </View>

              <View style={styles.harvestPill}>
                <Text style={styles.harvestPillText}>{field.daysToHarvest}d to harvest</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Extra Bottom Spacer for floating bottom tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFE6', // Warm earthy parchment tone matching screenshot
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 90,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBorder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2D6B3C',
    padding: 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingTextGroup: {
    justifyContent: 'center',
  },
  welcomeSub: {
    fontSize: 12,
    color: '#657E6B',
    fontWeight: '500',
    marginBottom: 2,
  },
  farmerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#15321B',
    fontFamily: 'Georgia',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circleIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E86629',
  },
  weatherCardWrapper: {
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECEAE2',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6D8271',
    fontWeight: '500',
    lineHeight: 14,
  },
  addRecordWrapper: {
    marginBottom: 14,
  },
  addRecordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C3A24', // Deep green pill card
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#A6CFA8', // Mint icon badge
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  addRecordTextGroup: {
    flex: 1,
  },
  addRecordTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  addRecordSubtitle: {
    color: '#9EBEA3',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  diagonalArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  quickFeaturesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  featureCard: {
    flex: 1,
    borderRadius: 22,
    padding: 12,
    minHeight: 108,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  featureTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureArrow: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureBottom: {
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C3122',
    marginBottom: 2,
  },
  subtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  featureSubtext: {
    fontSize: 10,
    color: '#657E6B',
    fontWeight: '500',
  },
  myFieldsSection: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16351E',
    fontFamily: 'Georgia',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 3,
    borderWidth: 1,
    borderColor: '#ECEAE2',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5D7A65',
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ECEAE2',
  },
  fieldEmojiBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F5F2EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fieldEmoji: {
    fontSize: 20,
  },
  fieldDetails: {
    flex: 1,
  },
  fieldName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15321B',
    marginBottom: 2,
  },
  fieldCrop: {
    fontSize: 11,
    color: '#6C8370',
    fontWeight: '500',
  },
  harvestPill: {
    backgroundColor: '#EBF4ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  harvestPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#286237',
  },
  bottomSpacer: {
    height: 35,
  },
});
