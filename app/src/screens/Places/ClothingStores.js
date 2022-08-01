import Places from "./Places";

const ClothingStores = ({ auth, user }) => (
  <Places auth={auth} user={user} type="clothing_store" />
)

export default ClothingStores;
