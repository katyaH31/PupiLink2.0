import Model from "./Model";

interface Location extends Model {
  name: string;
  description: string;
  zoneId: string;
  latitude: string;
  longitude: string;
};

export default Location;