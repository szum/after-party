import React from 'react';

const STATIC_API_URL = 'https://maps.googleapis.com/maps/api/staticmap?';

type Props = {
  long: string;
  lat: string;
  size: string;
}

export default function StaticMap(props: Props): React.Element<typeof Component> {
  const mapParams = `center=${props.lat},${props.long}&zoom=15&size=${props.size}&markers=color:red%7C${props.lat},${props.long}&key=${process.env.staticMapsApiKey}`;
  return(
    <img src={`${STATIC_API_URL}${mapParams}`} />
  );
}
