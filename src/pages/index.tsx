import { API, graphqlOperation } from '@aws-amplify/api';
import * as queries from '../graphql/queries';

export default function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const rsvpData = API.graphqlOperation(queries.listRsvps);

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      rsvpData
    }
  }
}
