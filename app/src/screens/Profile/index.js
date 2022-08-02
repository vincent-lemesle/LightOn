import { useState } from 'react';
import { Text } from 'native-base';

import LoadResourceLayout from '../../components/Layout/LoadResourceLayout';

const Profile = ({ auth, user }) => {
  console.log(user);
  const [loading, setLoading] = useState(false);

  return (
    <LoadResourceLayout auth={auth} user={user} setLoading={setLoading}>
      <Text>
        Vincent
      </Text>
    </LoadResourceLayout>
  )
}

export default Profile;
