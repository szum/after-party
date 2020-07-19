export default async function fetchAddress(lat: string, long: string): string {
  try {
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.staticMapsApiKey}`);
    response = await response.json();
    return response['results'][0]['formatted_address'];
  } catch (e) {
    console.log(e);
  }
}
