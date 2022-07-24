import MyPlaces from "./MyPlaces";

const MyBars = ({ auth, user }) => (
  <MyPlaces auth={auth} user={user} type="bar" />
)

export default MyBars;
