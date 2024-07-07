import LodgingStatus from "../enums/LodgingStatus";
import LodgingType from "../enums/LodgingType";
import Location from "./Location";
import LodgingExtras from "./LodgingExtras";
import Model from "./Model";
import User from "./User";

interface LodgingExpand {
  owner?: User;
  location?: Location;
  extras?: LodgingExtras;
}

interface Lodging extends Model {
  title: string;
  description: string;
  type: LodgingType;
  status: LodgingStatus;  
  price: number;
  available: Date;
  coexistenceRules: string;
  expand?: LodgingExpand;
  image: string;
}

export default Lodging;
