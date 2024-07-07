import LodgingType from "../enums/LodgingType";

export default class LodgingUtils {
    static getReadableType(lodgingType: LodgingType) {
        const map ={
            [LodgingType.APARTMENT]: "Apartamento",
            [LodgingType.STUDIO]: "Estudio",
            [LodgingType.HOUSE]: "Casa",
            [LodgingType.ROOM]: "Habitación",
            [LodgingType.STUDENT_RESIDENCE]: "Residencia Estudiantil",
        }
        return map[lodgingType];
    }
};