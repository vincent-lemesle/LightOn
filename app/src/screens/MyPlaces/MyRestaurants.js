import MyPlaces from "./MyPlaces";

const MyRestaurants = ({ auth, user }) => (
  <MyPlaces auth={auth} user={user} type="restaurant" />
)

export default MyRestaurants;
