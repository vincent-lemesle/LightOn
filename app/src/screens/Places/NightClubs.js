import Places from "./Places";

const NightClubs = ({ auth, user }) => (
  <Places auth={auth} user={user} type="night_club" />
)

export default NightClubs;
