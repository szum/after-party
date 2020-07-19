import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import StaticMap from '../components/static-map';
import StreetView from '../components/street-view';
import Emoji from '../components/emoji';
import fetchAddress from '../lib/fetch-address';
import getUber from '../lib/get-uber';
import * as mutations from '../graphql/mutations';

export default function RsvpPage(): React.Element<typeof Component> {
  const router = useRouter();
  const { lat, long } = router.query;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [hasRsvp, setHasRsvp] = useState(false);

  // useEffect here
  fetchAddress(lat,long).then((addr) => setAddress(addr));

  const handleSubmit = (e) => {
    e.preventDefault();
    API.graphql(graphqlOperation(mutations.createRsvp, {
      input: {
        firstName,
        lastName
      }
    })).then(() => {
      setHasRsvp(true);
    });
  };

  const formattedAddress = address && address.split(',').slice(0,2).join(' ');

  return(
    <div className="RsvpPage">
      <div className="Location">
        <h1>Where is the after party?</h1>
        <StaticMap
          lat={lat}
          long={long}
          size={'400x200'}
        />
        <StreetView
          lat={lat}
          long={long}
          size={'400x200'}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>{formattedAddress}</h3>
        <ol>
          <li>
            RSVP to put your name on the <Emoji label="clipboard" symbol="📋"/>:
            <p>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
              />
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
              />
              {
                hasRsvp ? <Emoji label="party-popper" symbol="🎉"/> : <button>RSVP</button>
              }
            </p>
           </li>
           <li><Emoji label="person-walking" symbol="🚶"/>, <Emoji label="bicycle" symbol="🚲"/>, or <a href={getUber(lat, long, address)}>request an Uber</a></li>
           <li>
             Be mindful of the neighbours when you're walking in.
            </li>
            <p>See you on the dancefloor <Emoji label="man-dancing" symbol="🕺"/></p>
        </ol>

      </form>
    </div>
  );
}
