export interface BotRule {
  keywords: string[];
  response: string;
  type?: string;
}

export const botRules: BotRule[] = [
  {
    keywords: [
      "cómo publico",
      "publicar propiedad",
      "quiero alquilar mi lugar",
      "subir un anuncio",
      "poner en alquiler",
      "quisiera publicar",
      "deseo publicar",
      "me gustaría publicar",
      "quiero publicar",
      "cómo puedo publicar",
      "quiero subir una propiedad",
      "cómo poner mi propiedad",
      "cómo alquilar mi propiedad"
    ],
    response: "Para publicar tu propiedad, hacé clic en 'Publica tu propiedad' desde el menú superior.",
  },
  {
    keywords: [
      "contactar al dueño",
      "puedo hablar con el dueño",
      "comunicarme con el dueño",
      "hablar con el propietario",
      "contactar al arrendador",
      "cómo me comunico con el propietario"
    ],
    response: "Se habilitará un chat con el propietario para que puedan llegar a un acuerdo. El arrendador responderá en un lapso de 72 horas.",
  },
  {
    keywords: [
      "cuánto cuesta publicar",
      "es gratis publicar",
      "tengo que pagar por publicar",
      "cuánto vale poner un anuncio"
    ],
    response: "¡Publicar es completamente gratis! No cobramos ninguna comisión.",
  },
  {
    keywords: [
      "buscar pupilaje",
      "dónde buscar pupilaje",
      "cómo buscar alojamiento",
      "encontrar lugar",
      "ver lugares disponibles",
      "buscar hospedaje"
    ],
    response: "Usá los filtros de la pantalla principal para buscar por precio, tipo de lugar o ubicación.",
  },
  {
    keywords: [
      "ver mis solicitudes",
      "dónde están mis solicitudes",
      "mis reservas",
      "seguimiento de reservas",
      "consultar solicitudes"
    ],
    response: "Tus solicitudes están en la parte superior derecha, bajo 'Tus solicitudes'.",
  },
  {
    keywords: [
      "ver mis anuncios",
      "dónde están mis publicaciones",
      "mis propiedades",
      "consultar mis anuncios"
    ],
    response: "Podés ver tus anuncios activos en el menú bajo 'Tus anuncios'.",
  },
  {
    keywords: [
      "cuántas horas tengo para mudarme",
      "mudanza",
      "límite para mudarme",
      "tiempo para instalarme",
      "desocupar",
      "plazo para mudarme"
    ],
    response: "Tendrás 24 horas hábiles para reportar cualquier problema con el lugar. Te recomendamos tomar fotografías del lugar para evitar malentendidos y verificar que la propiedad cuente con los servicios acordados.",
  },
  {
    keywords: [
      "cómo reservo",
      "quiero reservar",
      "solicitar reserva",
      "reservar propiedad",
      "hacer una reserva"
    ],
    response: "Para solicitar una reserva, hacé clic en el botón 'Solicitar reserva' en la página del anuncio.",
  },
  // Saludos generales
  {
    keywords: ["hola", "holi", "buenas", "buen día", "buen dia"],
    response: "¡Hola! ¿En qué puedo ayudarte hoy?",
    type: "saludo"
  },
  {
    keywords: ["buenos días", "buenos dias"],
    response: "¡Buenos días! ¿En qué puedo ayudarte hoy?",
    type: "saludo"
  },
  {
    keywords: ["buenas noches", "noches"],
    response: "¡Buenas noches! ¿Necesitás ayuda con algo?",
    type: "saludo"
  },
  // Agradecimientos
  {
    keywords: ["gracias", "muchas gracias"],
    response: "¡De nada! Si necesitás algo más, estoy acá para ayudarte.",
    type: "agradecimiento"
  },
  // Confirmaciones
  {
    keywords: ["ok", "okay", "está bien", "vale", "de acuerdo"],
    response: "Perfecto, quedo atento por si necesitás algo más.",
    type: "confirmacion"
  }
];

const badWords = [
  "mierda", "puta", "carajo", "estúpido", "estupido", "imbécil", "imbecil",
  "pelotudo", "boludo", "pendejo", "hdp", "hijo de puta", "maldito"
];

export const getBotResponse = (message: string): string | null => {
  const normalizedMessage = message.toLowerCase();

  if (badWords.some(badWord => normalizedMessage.includes(badWord))) {
    return "Por favor, mantené un lenguaje respetuoso. No se permite el uso de malas palabras.";
  }

  const matchedIntents = botRules.filter(rule =>
    rule.keywords.some(keyword => normalizedMessage.includes(keyword))
  );

  if (matchedIntents.length > 1) {
    const responses: string[] = [];
    const seenTypes = new Set<string>();

    for (const rule of matchedIntents) {
      if (!rule.type || seenTypes.has(rule.type)) continue;
      seenTypes.add(rule.type);
      responses.push(rule.response);
    }

    return responses.join(" ");
  }

  return matchedIntents[0]?.response ?? null;
};
