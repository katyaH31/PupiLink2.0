import {z, ZodType} from "zod";

interface PublishLodgingRequest {
    title: string;
    description: string;
    type: string;
    status: string;
    price: number;
    available: Date;
    coexistenceRules: string;
    image: File;
    extras: {
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
}

export const PublishLodgingSchema: ZodType<PublishLodgingRequest> = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.string().min(1),
    status: z.string().min(1),
    price: z.number(),
    available: z.date(),
    coexistenceRules: z.string().min(1),
    image: z.instanceof(File),
    extras: z.object({
        rooms: z.number(),
        bathrooms: z.number(),
        satelliteTV: z.boolean(),
        cleaningService: z.boolean(),
        laundryService: z.boolean(),
        privateSecurity: z.boolean(),
        commonAreas: z.boolean(),
        yard: z.boolean(),
        parkingLot: z.boolean(),
        petFriendly: z.boolean(),
    })
});