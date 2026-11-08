export type UserRole = 'passenger' | 'driver' | 'admin';

export type TripStatus = 'scheduled' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface CabinPreferences {
  quiet_mode: boolean;
  temperature_celsius: number;
  music_style: string;
}

export interface PassengerProfile {
  id: string;
  full_name: string;
  phone: string;
  preferences: CabinPreferences;
  created_at: string;
}

export interface Routine {
  id: string;
  passenger_id: string;
  title: string;
  origin_address: string;
  destination_address: string;
  scheduled_time: string; // Ex: "07:30"
  days_of_week: number[]; // [1,2,3,4,5] (Seg-Sex)
  active: boolean;
}

export interface Trip {
  id: string;
  passenger_id: string;
  origin_address: string;
  destination_address: string;
  scheduled_for: string; // ISO Timestamp
  estimated_price: number;
  status: TripStatus;
  notes?: string;
  created_at: string;
}
