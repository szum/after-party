import React, { useState, useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';

export default function AdminPage(props) {
  const [state, dispatch] = useReducer(reducer, props.rsvps);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(subscriptions.onCreateRsvp)).subscribe({
      next: (rsvpData) => {
        const newRsvp = rsvpData.value.data.onCreateRsvp;
        dispatch({type: 'addRsvp', data: newRsvp});
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCheckIn = (e) => {
    dispatch({type: 'toggleCheckIn', data: e.target.value });
  }

  const totalCheckIns = state.filter((rsvp) => rsvp.checkedIn ).length;

  return(
    <React.Fragment>
      <div className="totalAttendees">Attendees: {state.length}</div>
      <div className="totalCheckIns">Checked In: {totalCheckIns}</div>
      <ul className="GuestList">
        {
          state.map((rsvp, idx) => {
            return (
              <li key={idx}>
                {rsvp.firstName}, {rsvp.lastName}
                <input
                  type="checkbox"
                  value={rsvp.id}
                  checked={rsvp.checkedIn}
                  onChange={handleCheckIn} />
              </li>
            );
          })
        }
      </ul>
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

function reducer(state, action) {
  switch (action.type) {
    case 'addRsvp':
      return [...state, action.data];
    case 'toggleCheckIn':
      return state.map((rsvp, idx) => {
        if (action.data !== rsvp.id) {
          return rsvp;
        }
        return {
          ...rsvp,
          checkedIn: !rsvp.checkedIn
        }
      })
    default:
      throw new Error();
  }
}

