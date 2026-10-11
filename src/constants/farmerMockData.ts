import {
  FarmerProfile,
  WeatherMetrics,
  FarmerSummaryStats,
  QuickFeatureCard,
  FieldItem,
} from '../types/farmer.types';

// TODO: Connect to Supabase to fetch current farmer's profile
export const mockFarmerProfile: FarmerProfile = {
  id: 'farmer-001',
  fullName: 'Priya Kumari',
  location: 'Kandy District',
  farmerType: 'Greenhouse farmer',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
};

// TODO: Connect with weather service API (e.g., OpenWeatherMap)
export const mockWeatherMetrics: WeatherMetrics = {
  location: 'Kandy District',
  farmerType: 'Greenhouse farmer',
  temperatureC: 27,
  weatherCondition: 'Partly sunny',
  highTempC: 30,
  lowTempC: 21,
  humidityPercent: 72,
  precipitationPercent: 20,
  windSpeedKmh: 9,
};

// TODO: Calculate stats from active crops and harvests records in Supabase
export const mockFarmerStats: FarmerSummaryStats = {
  activeCrops: 3,
  recordsMonthCount: 12,
  monthName: 'Sep',
  readyToHarvestCount: 1,
};

export const mockQuickFeatures: QuickFeatureCard[] = [
  {
    id: 'crops',
    title: 'My Crops',
    subtext: '5 fields',
    iconName: 'sprout',
    themeColor: '#255D35',
    badgeDotColor: '#2B7A42',
    bgTint: '#E8F3EA',
    route: '/(farmer)/harvests',
  },
  {
    id: 'trace',
    title: 'Trace',
    subtext: '10 records',
    iconName: 'shield-check-outline',
    themeColor: '#284E34',
    badgeDotColor: '#E66926',
    bgTint: '#EBF4ED',
    route: '/(farmer)/contracts',
  },
  {
    id: 'catalogue',
    title: 'Catalogue',
    subtext: '6 supplies',
    iconName: 'book-open-outline',
    themeColor: '#6B4A2D',
    badgeDotColor: '#8B5A2B',
    bgTint: '#FAF2E7',
    route: '/(farmer)/suppliers',
  },
];

// TODO: Fetch fields from database
export const mockFields: FieldItem[] = [
  {
    id: 'field-1',
    name: 'Greenhouse Block A',
    cropName: 'Bell Peppers',
    cropEmoji: '🫑',
    areaAcres: 1.2,
    stageName: 'Fruiting',
    daysToHarvest: 14,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'field-2',
    name: 'Open Terrace Field',
    cropName: 'Ceylon Tea',
    cropEmoji: '🍃',
    areaAcres: 3.5,
    stageName: 'Vegetative',
    daysToHarvest: 45,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
];
