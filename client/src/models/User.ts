import Model from "./Model";

interface User extends Model {
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar: string;
}

export default User;
