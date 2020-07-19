export default function getUber(lat: string, long: string, address: string): string {
  return `https://m.uber.com/ul/?action=setPickup&client_id=bMjQq0HxxgXuZ2FWUb1poW4kt3lMQB2s&pickup=my_location&dropoff[formatted_address]=${encodeURI(address)}&dropoff[latitude]=${lat}&dropoff[longitude]=${long}`;
}
