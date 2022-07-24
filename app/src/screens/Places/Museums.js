import Places from "./Places";

const Museums = ({ auth, user }) => (
  <Places auth={auth} user={user} type="museum" />
)

export default Museums;
