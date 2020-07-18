import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import StaticMap from '../components/static-map';
import StreetView from '../components/street-view';
import { useRouter } from 'next/router';
import fetchAddress from '../lib/fetch-address';
import getUber from '../lib/get-uber';

export default function RsvpPage() {
  const router = useRouter();
  const { lat, long } = router.query;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  fetchAddress(lat,long).then((addr) => setAddress(addr));

  const handleSubmit = (e) => {
    e.preventDefault();
    API.graphql(graphqlOperation(mutations.createRsvp, {
      input: {
        firstName,
        lastName
      }
    }));
  };

  return(
    <React.Fragment>
      <h1>{address}</h1>
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
      <form onSubmit={handleSubmit}>
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
        <button>RSVP</button>
      </form>
      <a href={getUber(lat, long, address)}>Uber there</a>
    </React.Fragment>
  );
}
