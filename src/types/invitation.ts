export interface EventDetails {
  childName: string;
  celebrationTitle: string;
  dateText: string;
  targetDateIso: string; // "2027-01-28T16:00:00"
  timeText: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  whatsappPhone: string;
  notes: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  age: string;
  caption?: string;
  isCustom?: boolean;
}

export interface GuestWish {
  id: string;
  guestName: string;
  message: string;
  fruitEmoji: string;
  timestamp: string;
}
