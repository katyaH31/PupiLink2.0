import dayjs, { type Dayjs } from "dayjs";
import { z, ZodType } from "zod";
import LodgingType from "../enums/LodgingType";
import LodgingStatus from "../enums/LodgingStatus";

export interface PublishLodgingRequest {
  title: string;
  description: string;
  type: LodgingType;
  status: LodgingStatus;
  price: string;
  available: Dayjs;
  coexistenceRules?: string;
  image?: any;
  location: string;
  latitude?: string;
  longitude?: string;
  extras: {
    internet?: string;
    rooms?: string;
    bathrooms?: string;
    satelliteTV?: boolean;
    cleaningService?: boolean;
    laundryService?: boolean;
    privateSecurity?: boolean;
    commonAreas?: boolean;
    yard?: boolean;
    parkingLot?: boolean;
    petFriendly?: boolean;
  };
}

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const PublishLodgingSchema: ZodType<PublishLodgingRequest> = z.object({
  title: z.string({ required_error: "El título es obligatorio." }).min(1),
  description: z.string({ required_error: "La descripción es obligatoria." }).min(1),
  type: z.nativeEnum( LodgingType, { required_error: "El tipo de alojamiento es obligatorio." }),
  status: z.nativeEnum(LodgingStatus, ({ required_error: "El estado de alojamiento es obligatorio." })),
  price: z.string({ required_error: "El precio es obligatorio." })
    .refine(price => !isNaN(Number(price)), { message: "El precio debe ser un número." })
    .refine(val => Number(val) >= 0, { message: "El precio debe ser un número positivo." }),
  available: z.instanceof(dayjs as unknown as typeof Dayjs, { message: "La fecha de disponibilidad es obligatoria." }),
  coexistenceRules: z.string().optional(),
  image: z
    .any()
    .refine(file => !!file, "La imagen es obligatoria.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Imagen es demasiado grande.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Unicamente se aceptan archivos jpeg, jpg, png, webp."
    ),
  location: z.string({ required_error: "La ubicación es obligatoria." }).min(1),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  extras: z.object({
    internet: z.string().optional()
      .refine(val => !val || !isNaN(Number(val)), { message: "La capacidad de internet debe ser un número." })
      .refine(val => !val || Number(val) >= 0, { message: "La capacidad de internet debe ser un número positivo." }),
    rooms: z.string().optional()
      .refine(val => !val || !isNaN(Number(val)), { message: "La cantidad de habitaciones debe ser un número." })
      .refine(val => !val || Number(val) >= 0, { message: "La cantidad de habitaciones debe ser un número positivo." }),
    bathrooms: z.string().optional()
      .refine(val => !val || !isNaN(Number(val)), { message: "La cantidad de baños debe ser un número." })
      .refine(val => !val || Number(val) >= 0, { message: "La cantidad de baños debe ser un número positivo." }),
    satelliteTV: z.boolean().optional(),
    cleaningService: z.boolean().optional(),
    laundryService: z.boolean().optional(),
    privateSecurity: z.boolean().optional(),
    commonAreas: z.boolean().optional(),
    yard: z.boolean().optional(),
    parkingLot: z.boolean().optional(),
    petFriendly: z.boolean().optional(),
  })
});