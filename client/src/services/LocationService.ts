import Collections from "../enums/Collections";
import Location from "../models/Location";
import pb from "../server/Connection";

export default class LocationService {
  static async createLocation(location: Partial<Location>): Promise<Location> {
    const toUpload = {
      zoneId: location.zoneId,
      latitude: location.latitude,
      longitude: location.longitude,
      description: location.description,
      name: location.name,
    };

    return await pb.collection(Collections.LOCATION).create(toUpload);
  }
}