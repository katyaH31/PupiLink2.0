import Collections from "../enums/Collections";
import Lodging from "../models/Lodging";
import pb from "../server/Connection";

export default class LodgingService {
  public static async getLodging(id: string): Promise<Lodging> {
    console.log("Lodging ID:", id);
    const lodging: Lodging = await pb.collection(Collections.LODGING).getOne(id, {
      expand: "owner,location,extras",
    }); 

    const imageUrl = pb.files.getUrl(lodging, lodging.image);
    lodging.image = imageUrl;
    return lodging;
  }
}
