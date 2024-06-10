import Model from "./Model";

interface LodgingExtras extends Model {
  internet: number;
  rooms: number;
  bathrooms: number;
  satelliteTV: boolean;
  cleaningService: boolean;
  laundryService: boolean;
  privateSecurity: boolean;
  commonAreas: boolean;
  yard: boolean;
  parkingLot: boolean;
  petFriendly: boolean;
};

export default LodgingExtras;