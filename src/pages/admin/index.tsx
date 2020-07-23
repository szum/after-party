import React, { useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GetStaticProps } from 'next';
import Emoji from '../../components/emoji';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as subscriptions from '../../graphql/subscriptions';
import styles from './index.module.css';

type Rsvp = {
  id: string;
  firstName: string;
  lastName: string;
  checkedIn: boolean;
}

type Props = {
  rsvps: Array<Rsvp>;
}

export default function AdminPage(props: Props): React.ReactNode {
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
    const rsvp = state.find((rsvp) => rsvp.id === e.target.value);
    API.graphql(graphqlOperation(mutations.updateRsvp, { input: {...rsvp, checkedIn: !rsvp.checkedIn }})).then((res) => {
        dispatch({ type: 'updateRsvp', data: res.data.updateRsvp });
    });
  }

  const totalCheckIns = state.filter((rsvp) => rsvp.checkedIn ).length;

  return(
    <div className={styles.AdminPage}>
      <h1 className={styles.AdminHead}>
        After-party <Emoji label="devil" symbol="😈"/>
      </h1>
      <div className={styles.Totals}>
        <h3 className={styles.TotalAttendees}>Attendees: {state.length}</h3>
        <h3 className={styles.TotalCheckIns}>Checked In: {totalCheckIns}</h3>
      </div>
      <ul className={styles.GuestList}>
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
    </div>
  );
}

export async function getStaticProps(): GetStaticProps {
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
    case 'updateRsvp':
      return state.map((rsvp) => {
        if (action.data.id !== rsvp.id) {
          return rsvp;
        }
        return {
          ...action.data
        };
      })
    default:
      throw new Error();
  }
}

