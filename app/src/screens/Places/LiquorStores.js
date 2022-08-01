import Places from "./Places";

const LiquorStores = ({ auth, user }) => (
  <Places auth={auth} user={user} type="liquor_store" />
)

export default LiquorStores;
