
export interface Weather {
  temp: number;
  condition: string;
}

export interface Destination {
  id: string;
  title: string;
  description: string;
  price: number; // in RUB
  duration: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  images: string[];
  features: string[];
  weather: Weather;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface BookingRequest {
  destinationId: string;
  name: string;
  phone: string;
  date: string;
  guests: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
}
