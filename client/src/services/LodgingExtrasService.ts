import Collections from "../enums/Collections";
import LodgingExtras from "../models/LodgingExtras";
import pb from "../server/Connection";

export default class LodgingExtrasService {
  static async createLodgingExtras(lodgingExtras: Partial<LodgingExtras>) {
    return await pb.collection(Collections.LODGING_EXTRAS).create(lodgingExtras);
  }
}