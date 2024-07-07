import Collections from "../enums/Collections";
import Location from "../models/Location";
import Lodging from "../models/Lodging";
import LodgingExtras from "../models/LodgingExtras";
import pb from "../server/Connection";
import { PublishLodgingRequest } from "../utils/PublishLodgingSchema";
import AuthService from "./AuthService";
import LocationService from "./LocationService";
import LodgingExtrasService from "./LodgingExtrasService";

interface LodgingRelations {
  location: string;
  extras: string;
  owner: string;
}

export default class LodgingService {
  static async createLodging(lodging: PublishLodgingRequest) {
    const toUploadLocation: Partial<Location> = {
      name: lodging.location.split(',').splice(0, 3).join(' '),
      latitude: lodging.latitude,
      longitude: lodging.longitude,
      description: lodging.location
    };

    const toUploadExtras: Partial<LodgingExtras> = {
      internet: lodging.extras.internet ? Number(lodging.extras.internet) : 0,
      rooms: lodging.extras.rooms ? Number(lodging.extras.rooms) : 0,
      bathrooms: lodging.extras.bathrooms ? Number(lodging.extras.bathrooms) : 0,
      satelliteTV: !!lodging.extras.satelliteTV,
      cleaningService: !!lodging.extras.cleaningService,
      laundryService: !!lodging.extras.laundryService,
      privateSecurity: !!lodging.extras.privateSecurity,
      commonAreas: !!lodging.extras.commonAreas,
      yard: !!lodging.extras.yard,
      parkingLot: !!lodging.extras.parkingLot,
      petFriendly: !!lodging.extras.petFriendly
    };

    const owner = AuthService.getUserData();
    const extras = await LodgingExtrasService.createLodgingExtras(toUploadExtras);
    const location = await LocationService.createLocation(toUploadLocation);

    const toUploadLoding: Partial<Lodging> & LodgingRelations = {
      title: lodging.title,
      description: lodging.description,
      type: lodging.type,
      status: lodging.status,
      price: lodging.price ? Number(lodging.price) : 0,
      available: lodging.available.toDate(),
      coexistenceRules: lodging.coexistenceRules,
      image: lodging.image,
      location: location.id,
      extras: extras.id,
      owner: owner.id
    };

    return await pb.collection(Collections.LODGING).create(toUploadLoding);
  };

  public static async getLodging(id: string): Promise<Lodging> {
    const lodging: Lodging = await pb.collection(Collections.LODGING).getOne(id, {
      expand: "owner,location,extras",
    }); 

    const imageUrl = pb.files.getUrl(lodging, lodging.image);
    lodging.image = imageUrl;
    return lodging;
  }
}
