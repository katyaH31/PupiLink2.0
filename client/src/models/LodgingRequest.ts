import LodgingRequestStatus from "../enums/LodgingRequestStatus";
import Lodging from "./Lodging";
import Model from "./Model";
import User from "./User";

interface LodgingRequestExpand {
  lodging?: Lodging;
  applicant?: User;
};


interface LodgingRequest extends Model {
  proposedPrice: number;
  status: LodgingRequestStatus;
  expand?: LodgingRequestExpand;
};

export default LodgingRequest;