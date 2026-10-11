export interface FarmerProfile {
  id: string;
  fullName: string;
  location: string;
  farmerType: string;
  avatarUrl?: string;
}

export interface WeatherMetrics {
  location: string;
  farmerType: string;
  temperatureC: number;
  weatherCondition: string;
  highTempC: number;
  lowTempC: number;
  humidityPercent: number;
  precipitationPercent: number;
  windSpeedKmh: number;
}

export interface FarmerSummaryStats {
  activeCrops: number;
  recordsMonthCount: number;
  monthName: string;
  readyToHarvestCount: number;
}

export interface QuickFeatureCard {
  id: string;
  title: string;
  subtext: string;
  iconName: string;
  themeColor: string;
  badgeDotColor?: string;
  bgTint: string;
  route?: string;
}

export interface FieldItem {
  id: string;
  name: string;
  cropName: string;
  cropEmoji: string;
  areaAcres: number;
  stageName: string;
  daysToHarvest: number;
  imageUrl?: string;
}
