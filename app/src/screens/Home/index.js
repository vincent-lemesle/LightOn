import React, {useState} from "react";

import Layout from "../../components/Layout/LoadResourceLayout";

const Home = ({ auth }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout auth={auth} setLoading={setLoading}>
    </Layout>
  )
}

export default Home;
