import Places from "./Places";

const TouristAttractions = ({ auth, user }) => (
  <Places auth={auth} user={user} type="tourist_attraction" />
)

export default TouristAttractions;
