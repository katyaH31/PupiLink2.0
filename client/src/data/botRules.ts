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
    response: "Para publicar tu propiedad, hacé clic en 'Publica tu propiedad' desde el menú superior, te dirigirá a un formulario donde podrás ingresar los detalles de tu anuncio.",
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
    response: "Si, ya solicitastes una reserva se habilitará un chat con el propietario para que puedan llegar a un acuerdo. El arrendador responderá en un lapso de 72 horas.",
  },
  {
    keywords: [
      "cuánto cuesta publicar",
      "es gratis publicar",
      "tengo que pagar por publicar",
      "cuánto vale poner un anuncio",
      "se paga por publicar",
      "costo de publicar",
      "precio de publicar",
      "cuánto cuesta poner en alquiler",
      "cuánto vale publicar",
      
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

// Función de normalización mejorada
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres acentuados en base y diacrítico
    .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos (acentos)
    .replace(/[¿?¡!.,;:]/g, "") // Elimina puntuación
    .trim();
};

export const getBotResponse = (message: string): string | null => {
  const normalizedMessage = normalizeText(message);
  const messageWords = normalizedMessage.split(/\s+/).filter(word => word.length > 0); // Divide en palabras

  // Manejo de malas palabras
  if (badWords.some(badWord => normalizedMessage.includes(badWord))) {
    return "Por favor, mantené un lenguaje respetuoso. No se permite el uso de malas palabras.";
  }

  let bestMatch: BotRule | null = null;
  let maxMatchedKeywords = 0;

  for (const rule of botRules) {
    let currentMatchedKeywords = 0;
    // Normalizar las palabras clave de la regla una sola vez al inicio del bucle
    const normalizedRuleKeywords = rule.keywords.map(kw => normalizeText(kw));

    for (const ruleKeyword of normalizedRuleKeywords) {
      // Si la frase normalizada del usuario contiene la palabra clave normalizada de la regla
      if (normalizedMessage.includes(ruleKeyword)) {
        // Incrementa la cuenta por la coincidencia de una frase clave completa
        currentMatchedKeywords += ruleKeyword.split(/\s+/).filter(word => word.length > 0).length; // Suma las palabras de la frase clave
      } else {
        // Intenta coincidir palabras individuales de la palabra clave con palabras de la frase del usuario
        const ruleKeywordWords = ruleKeyword.split(/\s+/).filter(word => word.length > 0);
        let individualWordMatches = 0;
        for (const rkWord of ruleKeywordWords) {
          if (messageWords.includes(rkWord)) {
            individualWordMatches++;
          }
        }
        if (individualWordMatches > 0) {
            // Asigna un peso menor a las coincidencias de palabras individuales
            currentMatchedKeywords += individualWordMatches * 0.5; // Por ejemplo, medio punto por palabra individual
        }
      }
    }

    // Un umbral mínimo para considerar una coincidencia
    // Podrías ajustar este umbral (ej. 1, 1.5, 2)
    const threshold = 1; 

    if (currentMatchedKeywords > maxMatchedKeywords && currentMatchedKeywords >= threshold) {
      maxMatchedKeywords = currentMatchedKeywords;
      bestMatch = rule;
    }
  }

  // Si no se encuentra una coincidencia fuerte, devuelve null para que Ollama se encargue
  return bestMatch?.response ?? null;
};