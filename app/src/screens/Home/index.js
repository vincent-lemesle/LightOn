import React, {useEffect, useState} from "react";

import Layout from "../../components/Layout/LoadResourceLayout";

const Home = ({ auth }) => {
  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
  }, [])
  return (
    <Layout auth={auth} setLoading={setLoading} fetchData={() => {}}>

    </Layout>
  )
}

export default Home;
