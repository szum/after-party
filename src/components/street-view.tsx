import React from 'react';

const STATIC_API_URL = 'https://maps.googleapis.com/maps/api/streetview?';

type Props = {
  long: string;
  lat: string;
  size: string;
}

export default function streetView(props: Props): React.Element<typeof Component> {
  const mapParams = `location=${props.lat},${props.long}&size=${props.size}&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`;
  return(
    <img src={`${STATIC_API_URL}${mapParams}`} />
  );
}
