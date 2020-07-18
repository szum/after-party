import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

export default function HomePage(props) {
  return(
    <div>
      {
        props.rsvps.map((rsvp) => {
          return (<div>{rsvp.firstName}, {rsvp.lastName}</div>);
        })
      }
    </div>
  );

}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const response = await API.graphql({ query: queries.listRsvps });
  const rsvps = await response.data.listRsvps.items;

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      rsvps
    }
  }
}
