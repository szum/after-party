const STATIC_API_URL = 'https://maps.googleapis.com/maps/api/streetview?';

export default function streetView(props) {
  const mapParams = `location=${props.lat},${props.long}&size=${props.size}&key=${process.env.staticMapsApiKey}`;
  return(
    <img src={`${STATIC_API_URL}${mapParams}`} />
  );
}
