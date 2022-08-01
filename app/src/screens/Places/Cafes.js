import Places from "./Places";

const Cafes = ({ auth, user }) => (
  <Places auth={auth} user={user} type="cafe" />
)

export default Cafes;
