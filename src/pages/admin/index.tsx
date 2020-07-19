import React, { useState, useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';

export default function AdminPage(props) {
  const [rsvps, setRsvps] = useState(props.rsvps);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(subscriptions.onCreateRsvp)).subscribe({
      next: (rsvpData) => {
        const newRsvp = (rsvpData.value.data.onCreateRsvp);
        setRsvps([...rsvps, newRsvp]);
      }
    });
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  return(
    <React.Fragment>
      <div class="counter">Attendees: {rsvps.length}</div>
      <div class="GuestList">
        {
          rsvps.map((rsvp) => {
            return (<div>{rsvp.firstName}, {rsvp.lastName}</div>);
          })
        }
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const response = await API.graphql(graphqlOperation(queries.listRsvps));
  const rsvps = await Array.from(response.data.listRsvps.items);

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      rsvps
    }
  }
}
