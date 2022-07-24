import MyPlaces from "./MyPlaces";

const MyMuseums = ({ auth, user }) => (
  <MyPlaces auth={auth} user={user} type="museum" />
)

export default MyMuseums;
