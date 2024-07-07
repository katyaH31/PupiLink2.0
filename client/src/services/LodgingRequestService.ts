import Collections from "../enums/Collections";
import LodgingRequestStatus from "../enums/LodgingRequestStatus";
import LodgingRequest from "../models/LodgingRequest";
import pb from "../server/Connection";
import AuthService from "./AuthService";

interface LodgingCreationRequest {
  proposedPrice: number;
  lodging: string;
}
export default class LodginRequestService {
  public static async requestLodging(
    request: LodgingCreationRequest
  ): Promise<LodgingRequest> {
    const toUpload = {
      proposedPrice: request.proposedPrice,
      status: LodgingRequestStatus.SENT,
      lodging: request.lodging,
      applicant: AuthService.getUserData().id,
    };

    return await pb.collection(Collections.LODGING_REQUEST).create(toUpload);
  }
}
