export type UserRole = 'passenger' | 'driver' | 'admin';
export type TripStatus = 'scheduled' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export interface CabinPreferences {
  quiet_mode: boolean;
  temperature_celsius: number;
  music_style: string;
}
export interface Routine {
  id: string;
  passenger_id: string;
  title: string;
  origin_address: string;
  destination_address: string;
  scheduled_time: string;
  days_of_week: number[];
  active: boolean;
}
