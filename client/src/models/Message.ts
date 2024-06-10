import Model from "./Model";
import User from "./User";

interface MessageExpand {
  receiver?: User;
  sender?: User;
};

interface Message extends Model {
  read: Date;
  content: string;
  expand?: MessageExpand;
};

export default Message;