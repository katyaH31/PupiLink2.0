import Message from "./Message";
import Model from "./Model";
import User from "./User";

interface ChatExpand {
  participants?: User[];
  messages?: Message[];
}
interface Chat extends Model {
  title: string;
  expand?: ChatExpand;
}

export default Chat;
