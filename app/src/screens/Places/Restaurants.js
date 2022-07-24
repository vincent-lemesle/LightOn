import Places from "./Places";

const Restaurants = ({ auth, user }) => (
  <Places auth={auth} user={user} type="restaurant" />
)

export default Restaurants;
