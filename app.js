// Cepa Espejo Pro — Descubrimiento Positivo de Cepas, Íconos Vectoriales SVG y Cava del Evento

const AXES_META = [
  { key: "acidez", label: "Acidez", short: "Frescura", weight: 1.25 },
  { key: "tanino", label: "Tanino", short: "Textura", weight: 1.35 },
  { key: "cuerpo", label: "Cuerpo", short: "Cuerpo", weight: 1.15 },
  { key: "aroma", label: "Perfume", short: "Aroma", weight: 1.0 },
  { key: "frescura", label: "Fluidez", short: "Fluidez", weight: 1.2 },
  { key: "guarda", label: "Complejidad", short: "Carácter", weight: 0.95 }
];

const CLASSIC_BASELINE = {
  name: "Referencia Tinto Clásico",
  acidez: 58,
  tanino: 66,
  cuerpo: 80,
  aroma: 76,
  frescura: 60,
  guarda: 74
};

// Custom Vector SVG Emblems per Grape (100% OS-independent, never renders a missing [] box)
function getGrapeEmblemSVG(grapeId, size = 22) {
  const stroke = "#f5d491";
  const svgs = {
    // Feather / Silk Wave for Pinot Noir
    pinot: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`,
    // Lightning Bolt for Cabernet Franc
    cabfranc: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    // Warm Heart / Berry Cluster for Bonarda
    bonarda: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    // Flame for Syrah
    syrah: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    // Sun / Starburst for Torrontés
    torrontes: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    // Crown / Diamond Structure for Cabernet Sauvignon
    cabsauv: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="2 19 22 19 20 7 15 12 12 5 9 12 4 7 2 19"/></svg>`,
    // Vine Leaf for Criolla Chica
    criolla: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    // Golden Drop / Chalice for Semillón
    semillon: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    // Compass / Breeze Star for Sauvignon Blanc
    sauvblanc: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    // Diamond Gem for Chardonnay
    chardonnay: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/></svg>`,
    // Lotus / Rose Petal for Rosado
    rosado: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a4.5 4.5 0 1 1 4.5 4.5M12 5a4.5 4.5 0 1 0-4.5 4.5M12 5v14"/><path d="M7 14c-2.5 0-4.5-2-4.5-4.5S4.5 5 7 5"/><path d="M17 14c2.5 0 4.5-2 4.5-4.5S19.5 5 17 5"/><path d="M8 19h8"/></svg>`,
    // Amphora / Sun-Moon Eclipse for Vino Naranjo
    naranjo: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3l3 4a7 7 0 0 1-4 10l-2 2h-0l-2-2a7 7 0 0 1-4-10l3-4V3z"/><path d="M6 8c-2 0-3 1.5-3 3s1 3 3 3"/><path d="M18 8c2 0 3 1.5 3 3s-1 3-3 3"/></svg>`,
    // Interlocking Rings / Alchemy Star for Custom Blends & Specialties
    custom: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/><path d="M12 3l1.5 3L17 7.5 13.5 9 12 12 10.5 9 7 7.5 10.5 6z"/></svg>`
  };
  if (svgs[grapeId]) return svgs[grapeId];
  return svgs.custom;
}

const GRAPES = {
  pinot: {
    id: "pinot",
    name: "Pinot Noir",
    category: "sutil",
    defaultActive: true,
    defaultBottle: "Pinot Noir",
    defaultNote: "Servido apenas fresco para resaltar su textura de seda.",
    auraSymbol: "✨",
    auraCode: "CÓDIGO SEDA • RUBÍ",
    auraGradient: "linear-gradient(135deg, #be123c 0%, #4c0519 100%)",
    archetype: "El Sensible, Sutil y Detallista",
    region: "Tinto Sutil, Sedoso y Elegante",
    signaturePills: ["✨ Textura de Seda", "🍒 Fruta Roja Fina", "🌊 Súper Fluido"],
    plainFeel: "Es un tinto súper suave, liviano y acariciador: pasa por la boca como terciopelo, con notas a cerezas frescas y cero sensación áspera.",
    mirrorHook: "Tu psicología valora la sutileza por encima del ruido. Conectás desde la escucha, captás los pequeños detalles que otros pasan por alto y buscás experiencias que seduzcan con elegancia.",
    malbecBridge: "Refleja tu mundo interior porque combina una suavidad total (sin ninguna aspereza) con capas delicadas de fruta roja, flores secas y una fluidez que invita a la charla íntima.",
    compound: "Ésteres de fruta roja fina, cetonas de frambuesa y notas terciarias de sotobosque.",
    acidez: 86,
    tanino: 32,
    cuerpo: 44,
    aroma: 90,
    frescura: 88,
    guarda: 78,
    food: "Pesca grillada, risotto de hongos, aves o pastas suaves.",
    cheese: "Queso Brie cremoso, Camembert o Gruyère suave.",
    infusion: "Té en hebras suave o café filtrado floral.",
    service: "14 °C – 15 °C • Copa Borgoña balón • Agua de mineralización muy débil.",
    blindSight: "Capa baja y traslúcida (se lee a través de la copa), rubí brillante con reflejos granates.",
    blindNose: "Cereza roja fresca, frambuesa, hibisco, rosa seca, pino y tierra húmeda.",
    blindPalate: "Acidez alta vibrante, tanino bajo de seda pura, cuerpo ligero-medio y final fino."
  },
  cabfranc: {
    id: "cabfranc",
    name: "Cabernet Franc",
    category: "intenso",
    defaultActive: true,
    defaultBottle: "Cabernet Franc",
    defaultNote: "Expresivo, fresco y con ese toque herbal único.",
    auraSymbol: "⚡",
    auraCode: "CÓDIGO RAYO • ÁMBAR",
    auraGradient: "linear-gradient(135deg, #d97706 0%, #451a03 100%)",
    archetype: "El Curioso, Magnético y Audaz",
    region: "Tinto Expresivo, Herbal y Vibrante",
    signaturePills: ["⚡ Chispa Herbal", "🍷 Buen Cuerpo", "🌟 Final Vibrante"],
    plainFeel: "Tiene un abrazo sabroso y envolvente en la boca, pero con un toque fresco de hierbas que despierta el paladar y te invita al siguiente sorbo.",
    mirrorHook: "Tenés una mente inquieta, criterio propio y un magnetismo que escapa de lo predecible. Disfrutás de las ideas con chispa, el diseño y los caminos con identidad.",
    malbecBridge: "Es tu reflejo porque equilibra presencia y agilidad: tiene volumen sabroso en el centro de la boca, pero suma una frescura eléctrica y un carácter audaz.",
    compound: "Metoxipirazinas equilibradas (tomillo, pimiento rojo asado) + grafito mineral.",
    acidez: 76,
    tanino: 72,
    cuerpo: 76,
    aroma: 88,
    frescura: 80,
    guarda: 86,
    food: "Carnes jugosas con chimichurri de hierbas, cordero o vegetales asados.",
    cheese: "Queso de cabra estacionado o Provoleta dorada con orégano.",
    infusion: "Mate con hierbas serranas o té en hebras.",
    service: "16 °C • Copa Burdeos • Agua mineral de mineralización media.",
    blindSight: "Capa media a media(+), rubí profundo con destellos violáceos vivos.",
    blindNose: "Frambuesa, casis, mina de lápiz (grafito), pimiento rojo asado y tomillo fresco.",
    blindPalate: "Acidez media(+) tensa, tanino de grano fino tipo tiza calcárea y final eléctrico."
  },
  bonarda: {
    id: "bonarda",
    name: "Bonarda",
    category: "sutil",
    defaultActive: true,
    defaultBottle: "Bonarda",
    defaultNote: "Pura fruta jugosa y amable para disfrutar sin protocolos.",
    auraSymbol: "🍒",
    auraCode: "CÓDIGO FRUTA • CORAL",
    auraGradient: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
    archetype: "El Empático, Cálido y Descontracturado",
    region: "Tinto Jugoso, Redondo y Amigable",
    signaturePills: ["🍒 Fruta Explosiva", "😊 Cero Aspereza", "🥂 Súper Sociable"],
    plainFeel: "Es un tinto súper amigable, redondo y jugoso: entra amable por su fruta fresca (mora y cereza) y no raspa absolutamente nada en la garganta.",
    mirrorHook: "Tu personalidad genera confianza y calidez apenas llegás. Sos genuino, generoso y sin poses rígidas: para vos los mejores momentos son los que se comparten con alegría.",
    malbecBridge: "Conecta con tu empatía natural: ofrece una entrada frutal de moras y ciruelas frescas con una textura redonda, envolvente y sumamente disfrutable.",
    compound: "Antocianos profundos y ésteres frutales de mora, cereza negra e higo fresco.",
    acidez: 68,
    tanino: 46,
    cuerpo: 64,
    aroma: 80,
    frescura: 76,
    guarda: 62,
    food: "Empanadas cortadas a cuchillo, pastas con estofado o carnes al horno.",
    cheese: "Gouda estacionado, Fontina o Pategrás.",
    infusion: "Café cremoso con notas a avellana o mate suave en ronda.",
    service: "15 °C – 16 °C (ligeramente fresco) • Copa universal • Agua sin gas liviana.",
    blindSight: "Capa alta con color rojo violáceo vivo y bordes púrpura brillantes.",
    blindNose: "Explosión de mora, cereza negra, ciruela fresca e higo con toque floral.",
    blindPalate: "Entrada jugosa y amable, acidez media(+), tanino dulce sin aristas y cuerpo medio."
  },
  syrah: {
    id: "syrah",
    name: "Syrah",
    category: "intenso",
    defaultActive: true,
    defaultBottle: "Syrah",
    defaultNote: "Intenso, nocturno y con un toque natural de pimienta negra.",
    auraSymbol: "🔥",
    auraCode: "CÓDIGO FUEGO • PÚRPURA",
    auraGradient: "linear-gradient(135deg, #7e22ce 0%, #2e1065 100%)",
    archetype: "El Apasionado, Magnético y Nocturno",
    region: "Tinto Intenso, Especiado y Profundo",
    signaturePills: ["🔥 Cuerpo Pleno", "🌶️ Toque Especiado", "🌙 Carácter Nocturno"],
    plainFeel: "Es un vino que llena toda la boca con calor y presencia: envolvente, profundo y con un perfume riquísimo a especias, fuego y pimienta recién molida.",
    mirrorHook: "Vivís las emociones a fondo y tenés una presencia magnética. No te gustan las medias tintas: preferís la noche, el fuego lento y los vínculos que dejan huella.",
    malbecBridge: "Traduce tu intensidad emocional en la copa: plenitud en boca, textura envolvente y un carácter especiado y apasionado imposible de ignorar.",
    compound: "Rotundona (marcador de pimienta negra recién molida), aceituna negra y humo sutil.",
    acidez: 62,
    tanino: 82,
    cuerpo: 90,
    aroma: 86,
    frescura: 58,
    guarda: 88,
    food: "Cordero a las brasas, carnes ahumadas o risotto especiado.",
    cheese: "Lincoln o Reggianito estacionado con pimienta negra en grano.",
    infusion: "Café espresso corto bien intenso o té negro ahumado.",
    service: "16 °C – 18 °C (oxigenar 15 min) • Copa Syrah/Burdeos • Agua con gas fina.",
    blindSight: "Capa alta y opaca, núcleo púrpura azulado profundo y lágrimas densas.",
    blindNose: "Pimienta negra recién molida (rotundona), arándano, aceituna negra, panceta y cuero.",
    blindPalate: "Cuerpo pleno y envolvente, tanino firme abundante y largo final especiado."
  },
  cabsauv: {
    id: "cabsauv",
    name: "Cabernet Sauvignon",
    category: "intenso",
    defaultActive: true,
    defaultBottle: "Cabernet Sauvignon",
    defaultNote: "Elegancia clásica con cuerpo firme y gran estructura.",
    auraSymbol: "👑",
    auraCode: "CÓDIGO CORONA • CARMESÍ",
    auraGradient: "linear-gradient(135deg, #991b1b 0%, #450a0a 100%)",
    archetype: "El Líder Clásico, Firme y Determinado",
    region: "Tinto Estructurado, Firme y de Guarda",
    signaturePills: ["👑 Estructura Firme", "🍷 Clásico Atemporal", "🥩 Gran Carácter"],
    plainFeel: "Es un tinto serio, con peso y agarre firme en la boca: elegante, largo y perfecto para acompañar grandes platos o quesos estacionados.",
    mirrorHook: "Transmitís seguridad, determinación y visión a largo plazo. Valorás la palabra empeñada, la solidez y aquello que demuestra su nobleza con el tiempo.",
    malbecBridge: "Es el espejo de tu templanza y liderazgo: ofrece estructura firme, notas nobles de pimienta y madera fina, y un final largo e impecable.",
    compound: "Cassis (grosella negra), cedro, tabaco rubio y pirazinas nobles.",
    acidez: 70,
    tanino: 90,
    cuerpo: 90,
    aroma: 80,
    frescura: 64,
    guarda: 94,
    food: "Bife de chorizo ancho a las brasas, costillar o guisos de cocción lenta.",
    cheese: "Sardo estacionado, Reggianito o Cheddar maduro.",
    infusion: "Café negro bien intenso o mate amargo con cuerpo.",
    service: "17 °C – 18 °C • Copa Burdeos alta • Agua mineral con o sin gas.",
    blindSight: "Capa alta profunda, color rubí oscuro con centro opaco.",
    blindNose: "Cassis, mora, caja de habanos, cedro, pimienta y toque de pimiento asado.",
    blindPalate: "Ataque firme con taninos altos lineales en encías, acidez media(+) y gran persistencia."
  },
  torrontes: {
    id: "torrontes",
    name: "Torrontés",
    category: "blanco",
    defaultActive: true,
    defaultBottle: "Torrontés",
    defaultNote: "Huele a flores y fruta fresca, pero en boca es seco y súper refrescante.",
    auraSymbol: "☀️",
    auraCode: "CÓDIGO SOL • ESMERALDA",
    auraGradient: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
    archetype: "El Espíritu Libre, Luminoso y Expresivo",
    region: "Blanco Floral, Seco y Vibrante",
    signaturePills: ["☀️ Perfume Explosivo", "🍋 Seco y Fresco", "🌸 Súper Expresivo"],
    plainFeel: "Apenas acercás la nariz explota a flores blancas y cítricos (parece que fuera dulce), pero al tomarlo es totalmente seco, fresco y eléctrico.",
    mirrorHook: "Tu energía es luminosa, expresiva y contagiosa. Tenés la capacidad de renovar el aire de cualquier lugar con espontaneidad, encanto y frescura.",
    malbecBridge: "Sorprende igual que tu personalidad: conquista primero con un perfume inolvidable y enseguida revela en boca una frescura limpia, ágil y vibrante.",
    compound: "Terpenos libres (linalol y geraniol): jazmín, rosa, azahar y piel de pomelo.",
    acidez: 80,
    tanino: 14,
    cuerpo: 50,
    aroma: 98,
    frescura: 95,
    guarda: 55,
    food: "Empanadas picantes, ceviche, cocina asiática, sushi o picadas frescas.",
    cheese: "Queso de cabra fresco, Burrata con cítricos o queso azul suave.",
    infusion: "Té blanco o verde con jazmín, o mate con piel de naranja y cedrón.",
    service: "8 °C – 10 °C • Copa de blanco cerrada • Agua fresca sin gas.",
    blindSight: "Amarillo pálido cristalino con reflejos verdosos y acerados.",
    blindNose: "Explosión terpénica: uva recién cortada, jazmín, pétalos de rosa y cáscara de pomelo.",
    blindPalate: "Engaña al cerebro (huele dulce pero entra totalmente seco), acidez vibrante y final cítrico."
  },
  rosado: {
    id: "rosado",
    name: "Rosado",
    category: "rosado_naranjo",
    defaultActive: true,
    defaultBottle: "Rosado",
    defaultNote: "La frescura de un blanco con el alma frutal y delicada de un tinto.",
    auraSymbol: "🌸",
    auraCode: "CÓDIGO ROSÉ • CUARZO",
    auraGradient: "linear-gradient(135deg, #ec4899 0%, #701a75 100%)",
    archetype: "El Encantador, Versátil y Luminoso",
    region: "Rosado Fresco, Delicado y Versátil",
    signaturePills: ["🌸 Fruta Roja Sutil", "❄️ Súper Refrescante", "✨ Elegancia Ágil"],
    plainFeel: "Une la frescura helada y liviana de un blanco con las notas delicadas de frutilla, cereza y flores de un tinto suave.",
    mirrorHook: "Te movés con soltura entre mundos distintos sin atarte a etiquetas rígidas. Combinás sensibilidad estética, frescura social y una alegría elegante.",
    malbecBridge: "Es el puente perfecto para tu personalidad versátil: acaricia con fruta roja sutil mientras refresca el paladar con una energía limpia y moderna.",
    compound: "Tioles frutales y ésteres delicados de frutilla blanca, granada, rosa y pomelo rosado.",
    acidez: 84,
    tanino: 22,
    cuerpo: 48,
    aroma: 90,
    frescura: 93,
    guarda: 56,
    food: "Sushi, bruschettas mediterráneas, ensaladas gourmet, carnes blancas o tapeo.",
    cheese: "Burrata cremosa, Brie joven o queso de cabra fresco.",
    infusion: "Infusión fría de frutos rojos e hibisco o té en hebras floral.",
    service: "8 °C – 10 °C • Copa de blanco / universal • Agua fresca sin gas.",
    blindSight: "Rosa pálido piel de cebolla a coral brillante, cristalino y luminoso.",
    blindNose: "Frutilla fresca, frambuesa, pétalos de rosa y toque cítrico de pomelo rosado.",
    blindPalate: "Entrada ágil y refrescante, acidez viva, textura sedosa y final frutal limpio."
  },
  naranjo: {
    id: "naranjo",
    name: "Vino Naranjo",
    category: "rosado_naranjo",
    defaultActive: true,
    defaultBottle: "Vino Naranjo",
    defaultNote: "Blanco fermentado con sus pieles: complejo, ámbar y súper gastronómico.",
    auraSymbol: "🍊",
    auraCode: "CÓDIGO ÁMBAR • NARANJO",
    auraGradient: "linear-gradient(135deg, #ea580c 0%, #5c1d06 100%)",
    archetype: "El Vanguardista, Creativo y Auténtico",
    region: "Blanco Macerado con Pieles • Texturado y Curioso",
    signaturePills: ["🍊 Contacto con Pieles", "🌿 Textura con Agarre", "🎨 Fuera de Serie"],
    plainFeel: "Es un vino blanco elaborado como un tinto (con la piel de la uva): tiene color ámbar dorado, perfume a cáscara de naranja, damasco y té, y una textura envolvente única.",
    mirrorHook: "Tenés espíritu de autor y una curiosidad que no se conforma con lo estándar. Buscás historias reales, texturas con carácter y experiencias que despierten conversación.",
    malbecBridge: "Sorprende a todos porque tiene la frescura aromática de un blanco pero el agarre, la estructura en boca y la complejidad gastronómica de un tinto.",
    compound: "Fenoles de piel de uva blanca, terpenos de piel de naranja confitada, damasco seco y té negro.",
    acidez: 80,
    tanino: 46,
    cuerpo: 64,
    aroma: 92,
    frescura: 82,
    guarda: 76,
    food: "Cocina especiada, platos orientales, carnes blancas grilladas o picada de autor.",
    cheese: "Quesos semiduros de cabra, Morbier, Fontina o Pategrás estacionado.",
    infusion: "Té negro en hebras con piel de naranja o mate con hierbas y carácter.",
    service: "11 °C – 13 °C (no servir demasiado frío) • Copa universal / Burdeos.",
    blindSight: "Color ámbar profundo a cobrizo dorado con reflejos naranjas brillantes.",
    blindNose: "Cáscara de naranja confitada, quinoto, damasco seco, miel seca, hierbas y té en hebras.",
    blindPalate: "Seco, con agarre tánico fino proveniente de las pieles, acidez jugosa y final largo."
  },
  sauvblanc: {
    id: "sauvblanc",
    name: "Sauvignon Blanc",
    category: "blanco",
    defaultActive: false,
    defaultBottle: "Sauvignon Blanc",
    defaultNote: "Pura frescura cítrica y herbal que despierta el paladar al instante.",
    auraSymbol: "🍋",
    auraCode: "CÓDIGO BRISA • CÍTRICO",
    auraGradient: "linear-gradient(135deg, #10b981 0%, #065f46 100%)",
    archetype: "El Ágil, Directo y Chispeante",
    region: "Blanco Cítrico, Eléctrico y Refrescante",
    signaturePills: ["🍋 Cítrico Eléctrico", "🌿 Toque Herbal", "⚡ Pura Frescura"],
    plainFeel: "Es un blanco súper fresco, directo y vibrante: sabe a lima, pomelo rosado y maracuyá con una chispa que limpia y despierta toda la boca.",
    mirrorHook: "Tu mente es rápida, clara y resolutiva. Te gusta la gente honesta y sin vueltas, el movimiento constante y la energía limpia que va directo al punto.",
    malbecBridge: "Va con tu ritmo dinámico y vital: ofrece una entrada eléctrica, crujiente y súper refrescante que enciende los sentidos en el acto.",
    compound: "Tioles volátiles (pomelo rosado, maracuyá, lima) y pirazinas frescas.",
    acidez: 92,
    tanino: 12,
    cuerpo: 42,
    aroma: 94,
    frescura: 96,
    guarda: 50,
    food: "Ceviche, mariscos, sushi, ensaladas cítricas o pescados blancos.",
    cheese: "Queso de cabra fresco, Burrata o Mozzarella.",
    infusion: "Limonada con menta y jengibre o té verde frío.",
    service: "7 °C – 9 °C • Copa de blanco • Agua bien fresca.",
    blindSight: "Amarillo pálido casi transparente con destellos verde lima.",
    blindNose: "Pomelo rosado, lima recién exprimida, maracuyá y ruda/hierba fresca.",
    blindPalate: "Acidez alta punzante y jugosa, cuerpo ligero y final cítrico persistente."
  },
  chardonnay: {
    id: "chardonnay",
    name: "Chardonnay",
    category: "blanco",
    defaultActive: false,
    defaultBottle: "Chardonnay",
    defaultNote: "Blanco elegante que une frescura vibrante con textura cremosa.",
    auraSymbol: "💎",
    auraCode: "CÓDIGO DIAMANTE • MARFIL",
    auraGradient: "linear-gradient(135deg, #eab308 0%, #713f12 100%)",
    archetype: "El Armónico, Refinado y Equilibrado",
    region: "Blanco Elegante, Envolvente y Armónico",
    signaturePills: ["💎 Equilibrio Perfecto", "🍏 Fruta Blanca Fina", "🥂 Cremoso y Fresco"],
    plainFeel: "Es un blanco que llena la boca con suavidad y elegancia: combina la frescura de la manzana verde y el durazno blanco con una textura redonda y cremosa.",
    mirrorHook: "Buscás el equilibrio justo entre razón y sensibilidad. Apreciás las cosas bien hechas, la armonía estética y los ambientes donde todo fluye con distinción.",
    malbecBridge: "Representa tu búsqueda de armonía: no es un blanco liviano que pasa rápido, sino un vino envolvente, sedoso y lleno de matices.",
    compound: "Ésteres de fruta de carozo y pepita, mineralidad calcárea y notas de crianza fina.",
    acidez: 82,
    tanino: 20,
    cuerpo: 72,
    aroma: 85,
    frescura: 84,
    guarda: 84,
    food: "Salmón grillado, pastas rellenas con manteca y salvia, o aves al horno.",
    cheese: "Gruyère, Comté, Brie cremoso o Fontina.",
    infusion: "Flat White cremoso o té Oolong suave.",
    service: "10 °C – 12 °C • Copa Chardonnay ancha • Agua sin gas.",
    blindSight: "Amarillo dorado brillante con lágrimas densas.",
    blindNose: "Manzana verde, pera madura, durazno blanco, avellana tostada y manteca sutil.",
    blindPalate: "Entrada amplia y cremosa sostenida por una acidez tensa y final largo."
  },
  criolla: {
    id: "criolla",
    name: "Criolla Chica",
    category: "sutil",
    defaultActive: false,
    defaultBottle: "Criolla Chica",
    defaultNote: "Tinto liviano y súper fresco, ideal para servir apenas frío.",
    auraSymbol: "🌿",
    auraCode: "CÓDIGO PARRAL • TURQUESA",
    auraGradient: "linear-gradient(135deg, #0891b2 0%, #164e63 100%)",
    archetype: "El Auténtico, Libre y Descomplicado",
    region: "Tinto Ligero, Fresco y Descontracturado",
    signaturePills: ["🌿 Tinto de Sed", "🍓 Frutilla Fresca", "❄️ Se Toma Fresco"],
    plainFeel: "Es un tinto clarito, súper liviano y refrescante como morder una frutilla o granada recién cortada: te podés tomar dos copas charlando sin que te pese nunca.",
    mirrorHook: "Cero solemnidad y 100% autenticidad. Conectás con lo simple, lo honesto y los momentos donde nadie actúa para impresionar a los demás.",
    malbecBridge: "Conecta con tu frescura y naturalidad: pura fruta roja crujiente, liviandad total y una alegría descomplicada en cada sorbo.",
    compound: "Ésteres de frutilla silvestre, granada, cereza ácida y hierbas secas.",
    acidez: 82,
    tanino: 28,
    cuerpo: 38,
    aroma: 82,
    frescura: 92,
    guarda: 50,
    food: "Picada de charcutería artesanal, pizza de masa madre o carnes blancas.",
    cheese: "Queso Mar del Plata, Cuartirolo artesanal o Morbier.",
    infusion: "Infusión de hibisco frío, té rojo suave o café filtrado claro.",
    service: "12 °C – 14 °C (servir como tinto de sed) • Copa tipo Pinot/Universal.",
    blindSight: "Color rojo cereza claro y brillante, casi como un rosado profundo o rubí traslúcido.",
    blindNose: "Frutilla fresca, granada, guinda, caramelo ácido y sutil nota terrosa.",
    blindPalate: "Súper ligero y bebible, acidez jugosa, tanino mínimo pero rústico-amable."
  },
  semillon: {
    id: "semillon",
    name: "Semillón",
    category: "blanco",
    defaultActive: false,
    defaultBottle: "Semillón",
    defaultNote: "El blanco con cuerpo y cremosidad para amantes del tinto.",
    auraSymbol: "🍯",
    auraCode: "CÓDIGO ÁNFORA • ORO",
    auraGradient: "linear-gradient(135deg, #ca8a04 0%, #713f12 100%)",
    archetype: "El Reflexivo, Sereno y Profundo",
    region: "Blanco Cremoso, Sereno y Gastronómico",
    signaturePills: ["🍯 Textura Cremosa", "🍐 Pera y Miel Seca", "🍽️ Blanco con Cuerpo"],
    plainFeel: "Es un blanco diferente a todos: no es aguado ni punzante, sino cremoso y envolvente en la boca, con notas suaves a pera, miel seca y almendras.",
    mirrorHook: "Tenés una calma reflexiva que transmite paz. No buscás el impacto ruidoso sino la profundidad silenciosa, las charlas con sentido y las texturas que abrazan.",
    malbecBridge: "Es el famoso 'blanco con alma de tinto': tiene un volumen untuoso y acariciador en el centro de boca que enamora por su serenidad y nobleza.",
    compound: "Lactonas sutiles, cera de abejas, flores de tilo, pera blanca y cáscara de limón.",
    acidez: 74,
    tanino: 18,
    cuerpo: 72,
    aroma: 78,
    frescura: 82,
    guarda: 86,
    food: "Pesca blanca a la parrilla, mollejas al verdeo o aves con crema de hongos.",
    cheese: "Comté, Gruyère estacionado o Brie tibio con frutos secos.",
    infusion: "Té de manzanilla y miel en hebras o Flat White cremoso.",
    service: "10 °C – 12 °C (no helar en exceso) • Copa Chardonnay/Burdeos.",
    blindSight: "Amarillo dorado brillante con lágrimas lentas y untuosas.",
    blindNose: "Pera blanca, damasco, cera de abejas, tilo y fruto seco tostado.",
    blindPalate: "Boca ancha, untuosa y glicérica, equilibrada por acidez fresca y largo final."
  }
};

// 4 Dimensiones Psicológicas y de Personalidad (Sin tecnicismos, explora tintos, blancos, rosados y naranjos)
const QUESTIONS = [
  {
    step: 1,
    category: "1 de 4 • Tu Energía Social",
    title: "Cuando llegás a un encuentro o evento, ¿desde qué lugar conectás mejor con los demás?",
    auraLabel: "Leemos tu forma de vincular",
    options: [
      {
        emoji: "🔍",
        headline: "Desde la escucha sutil y la charla íntima",
        subline: "Prefiero las conversaciones profundas uno a uno, donde importan los matices.",
        axes: { acidez: 85, tanino: 28, cuerpo: 46, aroma: 88, frescura: 88, guarda: 78 }
      },
      {
        emoji: "⚡",
        headline: "Desde la curiosidad, el ingenio y las ideas nuevas",
        subline: "Me divierte romper el molde, descubrir lo distinto y encender charlas con chispa.",
        axes: { acidez: 78, tanino: 62, cuerpo: 70, aroma: 90, frescura: 82, guarda: 82 }
      },
      {
        emoji: "☀️",
        headline: "Desde la espontaneidad, la risa y la frescura",
        subline: "Llego para distender el ambiente: valoro la naturalidad y disfrutar sin poses.",
        axes: { acidez: 80, tanino: 26, cuerpo: 52, aroma: 92, frescura: 90, guarda: 58 }
      },
      {
        emoji: "🔥",
        headline: "Desde la presencia firme, el magnetismo y la intensidad",
        subline: "Me gusta liderar el momento, ir a fondo en lo que siento y dejar huella.",
        axes: { acidez: 66, tanino: 86, cuerpo: 90, aroma: 84, frescura: 60, guarda: 90 }
      }
    ]
  },
  {
    step: 2,
    category: "2 de 4 • Tu Brújula Interior",
    title: "A la hora de elegir un plan, un viaje o un proyecto, ¿qué te mueve por dentro?",
    auraLabel: "Tu motor emocional",
    options: [
      {
        emoji: "🕊️",
        headline: "La armonía estética, la calma y el cuidado del detalle",
        subline: "Elijo lo que tiene elegancia silenciosa, suavidad y equilibrio.",
        axes: { acidez: 82, tanino: 26, cuerpo: 54, aroma: 86, frescura: 86, guarda: 80 }
      },
      {
        emoji: "🧭",
        headline: "La exploración de lo auténtico y fuera de serie",
        subline: "Me atrae lo artesanal, lo creativo y los caminos con personalidad propia.",
        axes: { acidez: 78, tanino: 58, cuerpo: 68, aroma: 90, frescura: 82, guarda: 80 }
      },
      {
        emoji: "🌊",
        headline: "La libertad, el movimiento y la energía luminosa",
        subline: "Busco experiencias vivas, ágiles y refrescantes que se sientan en el acto.",
        axes: { acidez: 86, tanino: 20, cuerpo: 48, aroma: 94, frescura: 94, guarda: 54 }
      },
      {
        emoji: "👑",
        headline: "La solidez, la convicción y lo que trasciende",
        subline: "Apuesto por lo que tiene raíces firmes, profundidad y estructura duradera.",
        axes: { acidez: 68, tanino: 88, cuerpo: 90, aroma: 82, frescura: 62, guarda: 92 }
      }
    ]
  },
  {
    step: 3,
    category: "3 de 4 • Tu Escenario Emocional",
    title: "Si tu personalidad fuera una atmósfera o un momento del día, ¿cuál elegirías habitar?",
    auraLabel: "Tu clima interior",
    options: [
      {
        emoji: "🍂",
        headline: "Atardecer sereno, música acústica suave y luz cálida",
        subline: "Un refugio íntimo y pausado donde cada sensación se disfruta en calma.",
        axes: { acidez: 82, tanino: 30, cuerpo: 52, aroma: 86, frescura: 86, guarda: 82 }
      },
      {
        emoji: "🎨",
        headline: "Un estudio creativo, vinilos o un bar oculto de autor",
        subline: "Un ambiente ecléctico, estimulante y lleno de texturas por descubrir.",
        axes: { acidez: 78, tanino: 60, cuerpo: 70, aroma: 90, frescura: 80, guarda: 84 }
      },
      {
        emoji: "🌅",
        headline: "Mediodía radiante al aire libre, brisa fresca y amigos",
        subline: "Sol, vitalidad, mesa compartida y la alegría simple del presente.",
        axes: { acidez: 80, tanino: 28, cuerpo: 52, aroma: 90, frescura: 90, guarda: 58 }
      },
      {
        emoji: "🌙",
        headline: "Noche cerrada junto al fuego bajo las estrellas",
        subline: "Misterio, magnetismo nocturno, calor profundo y emociones intensas.",
        axes: { acidez: 64, tanino: 86, cuerpo: 90, aroma: 86, frescura: 58, guarda: 90 }
      }
    ]
  },
  {
    step: 4,
    category: "4 de 4 • Tu Reflejo en la Copa",
    title: "Si tradujéramos tu forma de ser al paladar, ¿qué sensación te representa mejor?",
    auraLabel: "El toque final",
    options: [
      {
        emoji: "✨",
        headline: "Sutil, sedosa o envolvente como una caricia",
        subline: "Delicada, cremosa o de paso aterciopelado, sin raspar jamás.",
        axes: { acidez: 82, tanino: 26, cuerpo: 50, aroma: 88, frescura: 88, guarda: 80 }
      },
      {
        emoji: "🍋",
        headline: "Vibrante, fresca y con una chispa que despierta",
        subline: "Luminosa, cítrica o delicadamente frutal (como un gran blanco o rosado).",
        axes: { acidez: 88, tanino: 18, cuerpo: 46, aroma: 94, frescura: 95, guarda: 56 }
      },
      {
        emoji: "🍊",
        headline: "Jugosa, expresiva o con una textura diferente",
        subline: "Descontracturada y sorprendente: desde fruta jugosa hasta un naranjo o corte de autor.",
        axes: { acidez: 76, tanino: 52, cuerpo: 66, aroma: 90, frescura: 80, guarda: 74 }
      },
      {
        emoji: "🌶️",
        headline: "Profunda, especiada y con carácter firme",
        subline: "Con volumen, presencia en boca y una huella larga e inolvidable.",
        axes: { acidez: 66, tanino: 88, cuerpo: 90, aroma: 84, frescura: 60, guarda: 92 }
      }
    ]
  }
];

// Oráculo Sinestésico en 1 Sorbo (Para invitados con una copa en la mano)
const ORACLE_QUESTIONS = [
  {
    id: "mouth",
    prompt: "1. Tomá un sorbito: ¿cómo lo sentiste apenas entró a tu boca?",
    options: [
      { label: "💧 Súper fresco, liviano y me hizo salivar rico", weights: { pinot: 3, torrontes: 4, sauvblanc: 4, rosado: 4, criolla: 3 } },
      { label: "🍒 Redondo, jugoso o cremoso y suavecito", weights: { bonarda: 4, chardonnay: 4, semillon: 4, rosado: 2, pinot: 2 } },
      { label: "⚡ Con textura y agarre pero súper vibrante en la lengua", weights: { cabfranc: 4, naranjo: 4, semillon: 2 } },
      { label: "🔥 Intenso, envolvente y con peso firme en la boca", weights: { syrah: 4, cabsauv: 4, cabfranc: 2 } }
    ]
  },
  {
    id: "music",
    prompt: "2. Si ese sorbo fuera música sonando ahora mismo, ¿qué sería?",
    options: [
      { label: "🎷 Jazz suave e íntimo o guitarra acústica", weights: { pinot: 4, semillon: 4, chardonnay: 3 } },
      { label: "🎸 Indie / Rock con chispa, moderno y magnético", weights: { cabfranc: 4, naranjo: 4, syrah: 2 } },
      { label: "☀️ Pop / Bossa alegre al aire libre para brindar", weights: { bonarda: 3, torrontes: 4, rosado: 4, sauvblanc: 4, criolla: 4 } },
      { label: "🥁 Tambores nocturnos o una sinfonía clásica potente", weights: { syrah: 4, cabsauv: 4 } }
    ]
  },
  {
    id: "memory",
    prompt: "3. ¿Qué recuerdo o perfume te vino primero a la cabeza?",
    options: [
      { label: "🍓 Frutillas frescas, cerezas o pétalos de rosa", weights: { pinot: 4, rosado: 4, criolla: 4, bonarda: 2 } },
      { label: "🌿 Hierbas, cáscara de naranja, té en hebras o especias", weights: { cabfranc: 4, naranjo: 4, sauvblanc: 2 } },
      { label: "🌼 Jazmín, pomelo, manzana verde, pera o miel", weights: { torrontes: 5, sauvblanc: 4, chardonnay: 4, semillon: 4 } },
      { label: "🌶️ Pimienta recién molida, mora madura o fuego", weights: { syrah: 4, cabsauv: 4, bonarda: 2 } }
    ]
  }
];

const STORAGE_KEY_STATE = "cepa_espejo_pro_state_v6";

// Quick Templates for Sommelier Custom Grapes / Blends (Sin lugares geográficos fijos)
const CUSTOM_TEMPLATES = {
  blend_tintas: {
    name: "Blend de Tintas",
    bottle: "Blend de Tintas",
    category: "intenso",
    region: "Corte Tinto Equilibrado y Envolvente",
    archetype: "El Sofisticado, Armónico y Multidimensional",
    plain: "Combina lo mejor de distintas uvas tintas: entrada jugosa de fruta, centro de boca envolvente y un final largo y elegante.",
    food: "Ojo de bife madurado, cordero braseado o pastas rellenas.",
    cheese: "Provoleta dorada, Fontina o quesos de mediana guarda.",
    acidez: 76,
    tanino: 74,
    cuerpo: 80,
    aroma: 88
  },
  blend_blancas: {
    name: "Blend de Blancas",
    bottle: "Blend de Blancas",
    category: "blanco",
    region: "Corte Blanco Aromático y Gastronómico",
    archetype: "El Curioso Elegante y Luminoso",
    plain: "Un blanco complejo que une frescura cítrica y flores blancas con una textura cremosa y envolvente en el paladar.",
    food: "Pesca blanca grillada, risotto cítrico o aves al horno.",
    cheese: "Queso Brie cremoso, Camembert o queso de cabra.",
    acidez: 82,
    tanino: 20,
    cuerpo: 66,
    aroma: 90
  },
  rosado: {
    name: "Rosado",
    bottle: "Rosado",
    category: "rosado_naranjo",
    region: "Rosado Fresco, Delicado y Expresivo",
    archetype: "El Encantador, Versátil y Luminoso",
    plain: "Une la frescura vibrante de un blanco con la fruta roja sutil y sedosa de un tinto.",
    food: "Sushi, tapeo mediterráneo, ensaladas gourmet o carnes blancas.",
    cheese: "Burrata fresca, Brie joven o queso de cabra.",
    acidez: 84,
    tanino: 22,
    cuerpo: 48,
    aroma: 90
  },
  naranjo: {
    name: "Vino Naranjo",
    bottle: "Vino Naranjo",
    category: "rosado_naranjo",
    region: "Blanco Macerado con Pieles • Curioso y Texturado",
    archetype: "El Vanguardista, Creativo y Descomplicado",
    plain: "Un vino blanco macerado con sus pieles: tiene perfume a cáscara de naranja, damasco y té en hebras con un agarre súper gastronómico.",
    food: "Cocina especiada, platos orientales o picada artesanal.",
    cheese: "Quesos semiduros de cabra, Morbier o Pategrás.",
    acidez: 80,
    tanino: 46,
    cuerpo: 62,
    aroma: 92
  },
  espumante: {
    name: "Espumante",
    bottle: "Espumante",
    category: "blanco",
    region: "Burbujas Finas, Vibrantes y Refrescantes",
    archetype: "El Celebrador Magnético y Chispeante",
    plain: "Burbujas finas y refrescantes que limpian el paladar al instante, con notas a manzana verde, pan tostado y cítricos.",
    food: "Sushi, ostras, frituras delicadas o para celebrar toda la noche.",
    cheese: "Queso Brie joven, Burrata fresca o Gruyère suave.",
    acidez: 92,
    tanino: 15,
    cuerpo: 45,
    aroma: 88
  },
  tannat: {
    name: "Tannat",
    bottle: "Tannat",
    category: "intenso",
    region: "Tinto Profundo y de Gran Estructura",
    archetype: "El Indomable, Profundo y Memorable",
    plain: "Un tinto de color negro profundo, concentrado y potente, con notas a mora madura, cacao amargo y especias.",
    food: "Carnes a la cruz, cordero o guisos de invierno.",
    cheese: "Sardo estacionado, Pepato o Reggianito.",
    acidez: 68,
    tanino: 92,
    cuerpo: 94,
    aroma: 85
  },
  malbec_autor: {
    name: "Malbec",
    bottle: "Malbec",
    category: "intenso",
    region: "Tinto Expresivo, Frutal y Envolvente",
    archetype: "El Anfitrión Magnético y Apasionado",
    plain: "Un tinto expresivo y envolvente que combina ciruelas rojas, violetas y una textura amable con final jugoso.",
    food: "Ojo de bife a las brasas, empanadas o pastas caseras.",
    cheese: "Provoleta a la parrilla, Pategrás o Gouda estacionado.",
    acidez: 74,
    tanino: 64,
    cuerpo: 78,
    aroma: 88
  }
};

let appState = {
  eventName: "Degustación Cepa Espejo",
  sommelierSig: "Tu Sommelier • Cepa Espejo",
  guestKioskLocked: false,
  activeGrapes: {},
  customBottles: {},
  customNotes: {},
  customGrapes: {},
  stats: {
    totalGuests: 0,
    byGrape: {}
  }
};

let currentTab = "evento"; // 'evento' | 'cava' | 'catalogo' | 'ciegas'
let quizStageState = "welcome"; // 'welcome' | 'questions' | 'mirror_gate' | 'revealed'
let currentQuestionIndex = 0;
let userAnswers = []; // [{ qIndex, optIndex }]
let lastComputedResult = null;
let catalogFilter = "all";
let isTransitioningQuestion = false;

// Duo / Partner Alchemy Mode State
let isPartnerPass = false;
let partnerAData = null;
let duoCombinedResult = null;

// Blind & Oracle State
let blindMode = "oracle";
let oracleAnswers = {};
let blindTargetKey = "pinot";
let blindScore = 0;
let blindTotal = 0;
let blindAnswered = false;

let lastBrandTapTime = 0;

function registerCustomGrapesIntoCatalog() {
  // Remove previously injected custom grapes from GRAPES before re-syncing
  Object.keys(GRAPES).forEach((k) => {
    if (GRAPES[k].isCustom) {
      delete GRAPES[k];
    }
  });
  Object.keys(appState.customGrapes || {}).forEach((k) => {
    const cg = appState.customGrapes[k];
    if (cg && cg.id) {
      GRAPES[cg.id] = cg;
    }
  });
}

function initState() {
  Object.keys(GRAPES).forEach((k) => {
    appState.activeGrapes[k] = GRAPES[k].defaultActive;
    appState.customBottles[k] = GRAPES[k].defaultBottle;
    appState.customNotes[k] = GRAPES[k].defaultNote;
    appState.stats.byGrape[k] = 0;
  });

  try {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.eventName) appState.eventName = parsed.eventName;
      if (parsed.sommelierSig) appState.sommelierSig = parsed.sommelierSig;
      if (typeof parsed.guestKioskLocked === "boolean") {
        appState.guestKioskLocked = parsed.guestKioskLocked;
      }
      if (parsed.customGrapes && typeof parsed.customGrapes === "object") {
        appState.customGrapes = parsed.customGrapes;
      }
      registerCustomGrapesIntoCatalog();

      if (parsed.activeGrapes) {
        Object.keys(GRAPES).forEach((k) => {
          if (typeof parsed.activeGrapes[k] === "boolean") {
            appState.activeGrapes[k] = parsed.activeGrapes[k];
          }
        });
      }
      if (parsed.customBottles) {
        Object.keys(GRAPES).forEach((k) => {
          if (parsed.customBottles[k]) {
            appState.customBottles[k] = parsed.customBottles[k];
          }
        });
      }
      if (parsed.customNotes) {
        Object.keys(GRAPES).forEach((k) => {
          if (typeof parsed.customNotes[k] === "string") {
            appState.customNotes[k] = parsed.customNotes[k];
          }
        });
      }
      if (parsed.stats) {
        appState.stats.totalGuests = parsed.stats.totalGuests || 0;
        appState.stats.byGrape = { ...appState.stats.byGrape, ...(parsed.stats.byGrape || {}) };
      }
    }
  } catch (e) {}

  const params = new URLSearchParams(window.location.search);
  const cavaParam = params.get("cava");
  if (cavaParam) {
    const list = cavaParam.split(",").map((s) => s.trim()).filter((k) => GRAPES[k]);
    if (list.length > 0) {
      Object.keys(GRAPES).forEach((k) => {
        appState.activeGrapes[k] = list.includes(k);
      });
    }
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(appState));
  } catch (e) {}
  updateTopbarCavaPill();
}

function getActiveGrapeKeys() {
  const keys = Object.keys(GRAPES).filter((k) => appState.activeGrapes[k]);
  return keys.length > 0 ? keys : ["pinot", "cabfranc", "bonarda"];
}

function vibrate(ms = 12) {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(ms);
    } catch (e) {}
  }
}

function showToast(msg) {
  const el = document.getElementById("toast-pill");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2500);
}

function updateTopbarCavaPill() {
  const activeCount = getActiveGrapeKeys().length;
  const pillText = document.getElementById("topbar-cava-count");
  if (pillText) {
    pillText.textContent = appState.guestKioskLocked
      ? `🔒 ${activeCount} Vinos Hoy`
      : `Cava Hoy: ${activeCount}`;
  }
  const heroEventTitle = document.getElementById("hero-event-badge");
  if (heroEventTitle) {
    heroEventTitle.textContent = `${appState.eventName} • ${activeCount} vinos descorchados hoy`;
  }
  const lockBtn = document.getElementById("btn-kiosk-lock");
  if (lockBtn) {
    lockBtn.textContent = appState.guestKioskLocked
      ? "🔓 Desbloquear Sommelier"
      : "🔒 Modo Invitado";
  }
}

function handleBrandTap() {
  const now = Date.now();
  if (now - lastBrandTapTime < 420) {
    if (appState.guestKioskLocked) {
      appState.guestKioskLocked = false;
      saveState();
      updateKioskLockUI();
      showToast("🔓 Modo Sommelier desbloqueado");
      return;
    }
  }
  lastBrandTapTime = now;
  resetToWelcome();
  switchTab("evento");
}

function handleCavaPillClick() {
  if (appState.guestKioskLocked) {
    showToast("Modo Invitado activo (Doble toque en el ícono de copa para editar)");
    return;
  }
  switchTab("cava");
}

function toggleGuestKioskLock() {
  vibrate(15);
  appState.guestKioskLocked = !appState.guestKioskLocked;
  saveState();
  if (appState.guestKioskLocked) {
    switchTab("evento");
    resetToWelcome();
    showToast("🔒 Modo Invitado activo (Doble toque arriba a la izquierda para salir)");
  } else {
    updateKioskLockUI();
    showToast("🔓 Panel de Sommelier habilitado");
  }
}

// HTML Escaping & Viewport Scroll Helpers
function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scrollViewportTop() {
  const vp = document.querySelector(".app-viewport");
  if (vp) vp.scrollTop = 0;
}

// Navigation
function switchTab(tabName) {
  vibrate(8);
  currentTab = tabName;
  ["evento", "cava", "catalogo", "ciegas"].forEach((t) => {
    const sec = document.getElementById(`view-${t}`);
    const navBtn = document.getElementById(`nav-${t}`);
    if (sec) sec.classList.toggle("active", t === tabName);
    if (navBtn) navBtn.classList.toggle("active", t === tabName);
  });

  updateKioskLockUI();
  scrollViewportTop();

  if (tabName === "cava") {
    renderCavaManager();
  } else if (tabName === "catalogo") {
    renderCatalog();
  } else if (tabName === "ciegas") {
    if (appState.guestKioskLocked) {
      switchBlindMode("oracle");
    }
    renderOracleQuestions();
    renderBlindChoices();
  }
}

function updateKioskLockUI() {
  const bottomNav = document.getElementById("app-bottomnav");
  if (bottomNav) {
    const inActiveGuestFlow =
      appState.guestKioskLocked ||
      (currentTab === "evento" && (quizStageState === "questions" || quizStageState === "mirror_gate"));
    bottomNav.classList.toggle("kiosk-hidden", inActiveGuestFlow);
  }
  const ciegasSelector = document.getElementById("ciegas-mode-selector");
  if (ciegasSelector) {
    ciegasSelector.style.display = appState.guestKioskLocked ? "none" : "grid";
  }
  if (appState.guestKioskLocked && blindMode === "wset") {
    switchBlindMode("oracle");
  }
}

// Psychological & Personality Matrix (4 Dimensions x 4 Options -> 12 Base Grapes/Styles)
const PSYCH_MATRIX = [
  // Q0: Tu Energía Social
  [
    { pinot: 3.6, semillon: 3.3, chardonnay: 2.9, rosado: 1.9 },
    { cabfranc: 2.9, naranjo: 3.2, sauvblanc: 3.5, chardonnay: 2.2 },
    { bonarda: 3.3, torrontes: 3.6, rosado: 2.8, criolla: 3.3, sauvblanc: 2.0 },
    { syrah: 3.4, cabsauv: 3.5, cabfranc: 1.6, bonarda: 1.0 }
  ],
  // Q1: Tu Brújula Interior
  [
    { pinot: 3.5, chardonnay: 3.6, rosado: 2.6, semillon: 2.6 },
    { naranjo: 3.5, cabfranc: 2.8, criolla: 3.4, syrah: 1.4 },
    { torrontes: 3.8, sauvblanc: 3.8, rosado: 2.7, bonarda: 2.3, criolla: 2.2 },
    { cabsauv: 3.6, syrah: 2.8, semillon: 3.0, chardonnay: 1.8 }
  ],
  // Q2: Tu Escenario Emocional
  [
    { pinot: 3.5, semillon: 3.5, chardonnay: 2.9, bonarda: 1.8, rosado: 1.5 },
    { cabfranc: 3.1, naranjo: 3.3, pinot: 1.6, chardonnay: 2.0, sauvblanc: 1.5 },
    { torrontes: 3.6, rosado: 2.9, sauvblanc: 3.5, criolla: 3.3, bonarda: 3.0 },
    { syrah: 3.6, cabsauv: 3.3, cabfranc: 1.4, bonarda: 1.2 }
  ],
  // Q3: Tu Reflejo en la Copa
  [
    { pinot: 3.9, chardonnay: 3.6, semillon: 3.6, rosado: 1.7, bonarda: 1.4 },
    { torrontes: 4.0, sauvblanc: 4.1, rosado: 3.3, criolla: 2.6 },
    { bonarda: 3.8, naranjo: 3.6, cabfranc: 2.7, criolla: 2.8 },
    { syrah: 3.7, cabsauv: 3.8, cabfranc: 2.1 }
  ]
];

// Vector Math Engine (Weighted 6D Euclidean Similarity + Psychological Archetype Calibration)
function computeUserVector() {
  if (userAnswers.length === 0) {
    return { ...CLASSIC_BASELINE };
  }
  const vec = { acidez: 0, tanino: 0, cuerpo: 0, aroma: 0, frescura: 0, guarda: 0 };
  let weightSum = 0;
  userAnswers.forEach((ans) => {
    const qWeight = ans.qIndex === 3 ? 1.35 : ans.qIndex === 1 ? 1.15 : 1.0;
    const optAxes = QUESTIONS[ans.qIndex].options[ans.optIndex].axes;
    AXES_META.forEach((m) => {
      vec[m.key] += optAxes[m.key] * qWeight;
    });
    weightSum += qWeight;
  });

  AXES_META.forEach((m) => {
    vec[m.key] = Math.round(vec[m.key] / weightSum);
  });

  const q0 = userAnswers.find((a) => a.qIndex === 0)?.optIndex ?? 0;
  const q1 = userAnswers.find((a) => a.qIndex === 1)?.optIndex ?? 0;
  const q2 = userAnswers.find((a) => a.qIndex === 2)?.optIndex ?? 0;
  const q3 = userAnswers.find((a) => a.qIndex === 3)?.optIndex ?? 0;
  const picks = [q0, q1, q2, q3];

  const scores = {};
  Object.keys(GRAPES).forEach((k) => {
    if (!GRAPES[k].isCustom) scores[k] = 0;
  });

  picks.forEach((optIdx, qIdx) => {
    const row = PSYCH_MATRIX[qIdx]?.[optIdx] || {};
    Object.keys(row).forEach((k) => {
      if (scores[k] !== undefined) scores[k] += row[k];
    });
  });

  // Psychological Archetype Synergies
  // 1. Pinot Noir: Intimate listener + aesthetic harmony/serene sunset + silky
  if (q0 === 0 && (q1 === 0 || q2 === 0) && q3 !== 3) scores.pinot += 2.2;
  if (q3 === 0 && q0 === 0 && q1 !== 3) scores.pinot += 1.6;

  // 2. Chardonnay: Aesthetic harmony + ingenious/spontaneous + silky/vibrant
  if (q1 === 0 && (q0 === 1 || q0 === 2) && (q3 === 0 || q3 === 1)) scores.chardonnay += 2.8;
  if (q2 === 1 && q3 === 0) scores.chardonnay += 2.2;

  // 3. Semillón: Serene/reflective + solid conviction or authentic + silky/enveloping
  if ((q0 === 0 || q2 === 0) && (q1 === 3 || q1 === 1) && q3 === 0) scores.semillon += 3.0;
  if (q1 === 3 && (q2 === 0 || q3 === 0)) scores.semillon += 2.4;

  // 4. Rosado: Bridge between aesthetic harmony/subtlety and luminous freshness
  if ((q0 === 0 || q1 === 0 || q2 === 0) && (q0 === 2 || q1 === 2 || q2 === 2) && (q3 === 1 || q3 === 0)) {
    scores.rosado += 2.6;
  }
  if (q1 === 0 && q3 === 1) scores.rosado += 2.4;

  // 5. Torrontés: Spontaneous/expressive + luminous freedom or outdoor + vibrant spark
  if ((q0 === 2 || q0 === 0) && (q1 === 2 || q2 === 2) && (q3 === 1 || q3 === 2)) scores.torrontes += 2.6;
  if (q1 === 2 && q2 === 2 && q0 !== 1) scores.torrontes += 2.2;

  // 6. Sauvignon Blanc: Curious/ingenious + freedom/outdoor + vibrant citrus spark
  if (q0 === 1 && (q1 === 2 || q2 === 2 || q3 === 1)) scores.sauvblanc += 2.8;
  if (q1 === 2 && q3 === 1 && q0 !== 2) scores.sauvblanc += 2.2;

  // 7. Vino Naranjo: Authentic exploration + creative studio + textured/juicy
  if (q1 === 1 && (q2 === 1 || q3 === 2) && q3 !== 3) scores.naranjo += 2.4;
  if (q0 === 1 && q3 === 2 && q2 !== 3) scores.naranjo += 2.0;

  // 8. Cabernet Franc: Ingenious/curious + creative studio + firm/textured
  if (q0 === 1 && q2 === 1 && (q1 === 3 || q3 === 3)) scores.cabfranc += 2.6;
  if ((q0 === 3 || q1 === 3 || q3 === 3) && (q0 === 1 || q1 === 1 || q2 === 1)) scores.cabfranc += 2.0;

  // 9. Bonarda: Spontaneous warmth + sunny midday / sunset + juicy fruit
  if (q0 === 2 && q3 === 2 && q1 !== 1) scores.bonarda += 2.8;
  if (q2 === 2 && q3 === 2 && q1 !== 1) scores.bonarda += 2.5;
  if (q0 === 2 && q2 === 0 && q3 !== 1) scores.bonarda += 2.4;

  // 10. Criolla Chica: Spontaneous/authentic + outdoor midday + light/juicy
  if (q1 === 1 && q2 === 2 && q3 !== 3) scores.criolla += 2.9;
  if (q0 === 2 && q1 === 1 && q3 !== 3) scores.criolla += 2.4;

  // 11. Syrah vs 12. Cabernet Sauvignon
  if (q2 === 3 && (q0 === 3 || q3 === 3 || q1 === 1 || q1 === 2)) scores.syrah += 2.4;
  if (q1 === 3 && (q0 === 3 || q3 === 3) && q2 !== 3) scores.cabsauv += 2.6;
  if (q0 === 3 && q1 === 3 && q2 === 3 && q3 === 3) scores.cabsauv += 1.5;

  const activeKeys = getActiveGrapeKeys();
  const activeBaseKeys = activeKeys.filter((k) => GRAPES[k] && !GRAPES[k].isCustom);
  const activeCustomKeys = activeKeys.filter((k) => GRAPES[k] && GRAPES[k].isCustom);

  // If ONLY custom wines/blends are active, return raw vector so Euclidean ranking picks the closest custom bottle
  if (activeBaseKeys.length === 0 && activeCustomKeys.length > 0) {
    return vec;
  }

  const allBaseKeys = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const bestOverallKey = allBaseKeys[0];

  const sortedActiveBase = (activeBaseKeys.length > 0 ? [...activeBaseKeys] : allBaseKeys).sort(
    (a, b) => scores[b] - scores[a]
  );
  const bestActiveKey = sortedActiveBase[0];

  let targetGrape = GRAPES[bestActiveKey] || GRAPES[bestOverallKey];

  // If a custom wine/blend is active and matches the user's raw 6D vector more closely than the base winner, let it win
  if (activeCustomKeys.length > 0 && targetGrape) {
    const baseRawAff = calculateAffinityScore(vec, targetGrape);
    activeCustomKeys.forEach((ck) => {
      const cg = GRAPES[ck];
      if (cg && calculateAffinityScore(vec, cg) >= baseRawAff + 1.5) {
        targetGrape = cg;
      }
    });
  }

  // If the theoretical overall winner is inactive AND from a totally different sensory family than any active bottle,
  // preserve its signal so the Vinoteca Tip banner can suggest it while still serving the closest active bottle
  if (
    bestOverallKey !== bestActiveKey &&
    GRAPES[bestOverallKey] &&
    GRAPES[bestActiveKey] &&
    calculateAffinityScore(GRAPES[bestOverallKey], GRAPES[bestActiveKey]) < 78
  ) {
    targetGrape = GRAPES[bestOverallKey];
  }

  if (!targetGrape) return vec;

  const finalVec = {};
  AXES_META.forEach((m) => {
    finalVec[m.key] = Math.round(targetGrape[m.key] * 0.9 + vec[m.key] * 0.1);
  });
  return finalVec;
}

// Síntesis Psicológica Personalizada: conecta las 4 dimensiones elegidas con la cepa
function buildPersonalSynthesis(grape) {
  if (!userAnswers || userAnswers.length < 4 || isPartnerPass) {
    return grape.malbecBridge;
  }
  const q0 = userAnswers.find((a) => a.qIndex === 0)?.optIndex ?? 0;
  const q1 = userAnswers.find((a) => a.qIndex === 1)?.optIndex ?? 0;
  const q2 = userAnswers.find((a) => a.qIndex === 2)?.optIndex ?? 0;
  const q3 = userAnswers.find((a) => a.qIndex === 3)?.optIndex ?? 0;

  const traitsQ0 = [
    "conectar desde la escucha sutil y la charla íntima",
    "vincular desde la curiosidad, el ingenio y las ideas nuevas",
    "contagiar espontaneidad, risa y frescura al llegar",
    "transmitir presencia firme, magnetismo e intensidad"
  ];
  const traitsQ1 = [
    "la búsqueda de armonía estética y cuidado del detalle",
    "el impulso de explorar lo auténtico y fuera de serie",
    "la libertad, el movimiento y la energía luminosa",
    "la convicción firme y lo que trasciende en el tiempo"
  ];
  const traitsQ2 = [
    "la calma de un atardecer sereno con luz cálida",
    "la vibra creativa de los vinilos o un bar oculto de autor",
    "la vitalidad de un mediodía radiante al aire libre",
    "el misterio de una noche cerrada junto al fuego"
  ];
  const traitsQ3 = [
    "una caricia sutil, sedosa y envolvente",
    "una chispa vibrante, fresca y luminosa",
    "una expresión jugosa y con textura diferente",
    "un carácter profundo, especiado y de huella larga"
  ];

  return `Tu personalidad combina ${traitsQ0[q0]}, ${traitsQ1[q1]} y ${traitsQ2[q2]}, buscando en la copa ${traitsQ3[q3]}. ${grape.malbecBridge}`;
}

function calculateAffinityScore(userVec, grapeObj) {
  let weightedSqSum = 0;
  let maxPossibleSqSum = 0;
  AXES_META.forEach((m) => {
    const diff = userVec[m.key] - grapeObj[m.key];
    weightedSqSum += m.weight * diff * diff;
    maxPossibleSqSum += m.weight * 75 * 75;
  });
  const dist = Math.sqrt(weightedSqSum);
  const maxDist = Math.sqrt(maxPossibleSqSum);
  return 100 * (1 - dist / maxDist);
}

function evaluateVectorAgainstGrapes(targetVec) {
  const activeKeys = getActiveGrapeKeys();

  const allRanked = Object.keys(GRAPES)
    .map((key) => {
      const exactScore = calculateAffinityScore(targetVec, GRAPES[key]);
      return {
        key,
        grape: GRAPES[key],
        isActiveTonight: activeKeys.includes(key),
        exactScore,
        pct: Math.max(40, Math.min(99, Math.round(exactScore)))
      };
    })
    .sort((a, b) => b.exactScore - a.exactScore);

  const activeRanked = allRanked.filter((item) => item.isActiveTonight);
  const servedWinner = activeRanked[0] || allRanked[0];
  const theoreticalWinner = allRanked[0];

  return {
    userVec: targetVec,
    servedWinner,
    theoreticalWinner,
    allRanked,
    activeRanked
  };
}

function evaluateQuizRanking() {
  const userVec = computeUserVector();
  return evaluateVectorAgainstGrapes(userVec);
}

function getSignaturePills(grape) {
  return grape.signaturePills || ["✨ Estilo Propio", "🍷 Equilibrio", "🌟 Alta Afinidad"];
}

// Quiz Flow Controls
function closeSommelierDrawer() {
  const body = document.getElementById("sommelier-drawer-body");
  const icon = document.getElementById("sommelier-drawer-chevron");
  if (body) body.classList.remove("open");
  if (icon) icon.textContent = "▼ Desplegar";
}

function startEventQuiz(partnerMode = false) {
  vibrate(15);
  isTransitioningQuestion = false;
  isPartnerPass = !!partnerMode;
  if (!isPartnerPass) {
    partnerAData = null;
    duoCombinedResult = null;
  }
  userAnswers = [];
  currentQuestionIndex = 0;
  closeSommelierDrawer();
  quizStageState = "questions";
  renderEventoStage();
}

function startPartnerQuiz() {
  if (!lastComputedResult) return;
  partnerAData = {
    userVec: { ...lastComputedResult.userVec },
    servedWinner: lastComputedResult.servedWinner
  };
  showToast("🥂 Pasale el teléfono a tu pareja o amigo (4 toques)");
  startEventQuiz(true);
}

function resetToWelcome() {
  vibrate(12);
  isTransitioningQuestion = false;
  isPartnerPass = false;
  partnerAData = null;
  duoCombinedResult = null;
  userAnswers = [];
  currentQuestionIndex = 0;
  closeSommelierDrawer();
  quizStageState = "welcome";
  renderEventoStage();
}

function renderEventoStage() {
  const welcomeEl = document.getElementById("stage-welcome");
  const quizEl = document.getElementById("stage-questions");
  const mirrorEl = document.getElementById("stage-mirror-gate");
  const resultEl = document.getElementById("stage-result");

  if (welcomeEl) welcomeEl.style.display = quizStageState === "welcome" ? "flex" : "none";
  if (quizEl) quizEl.style.display = quizStageState === "questions" ? "flex" : "none";
  if (mirrorEl) mirrorEl.style.display = quizStageState === "mirror_gate" ? "flex" : "none";
  if (resultEl) resultEl.style.display = quizStageState === "revealed" ? "flex" : "none";

  updateKioskLockUI();
  updateTopbarCavaPill();
  scrollViewportTop();

  if (quizStageState === "questions") {
    renderCurrentQuestion();
  } else if (quizStageState === "mirror_gate") {
    renderMirrorGate();
  } else if (quizStageState === "revealed") {
    renderRevealedResult();
  }
}

function renderCurrentQuestion() {
  const q = QUESTIONS[currentQuestionIndex];
  document.getElementById("q-step-pill").textContent = q.category;
  document.getElementById("q-aura-label").textContent = isPartnerPass
    ? "🥂 2º Paladar en juego"
    : q.auraLabel;
  document.getElementById("q-progress-fill").style.width = `${Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%`;
  document.getElementById("q-heading").textContent = q.title;

  const partnerBanner = document.getElementById("q-partner-banner");
  if (partnerBanner) {
    partnerBanner.style.display = isPartnerPass ? "inline-block" : "none";
  }

  const prevBtn = document.getElementById("btn-q-prev");
  if (prevBtn) {
    prevBtn.style.visibility = currentQuestionIndex > 0 ? "visible" : "hidden";
  }

  const grid = document.getElementById("q-options-grid");
  grid.innerHTML = q.options
    .map(
      (opt, idx) => `
      <button type="button" id="opt-card-${idx}" onclick="pickAnswer(${idx})" class="tactile-option">
        <div class="option-emoji-box">${opt.emoji}</div>
        <div class="option-copy">
          <span class="option-headline">${opt.headline}</span>
          <span class="option-subline">${opt.subline}</span>
        </div>
      </button>
    `
    )
    .join("");
}

function pickAnswer(optIndex) {
  if (isTransitioningQuestion) return;
  isTransitioningQuestion = true;
  vibrate(14);
  const btn = document.getElementById(`opt-card-${optIndex}`);
  if (btn) btn.classList.add("selected");

  userAnswers = userAnswers.filter((a) => a.qIndex !== currentQuestionIndex);
  userAnswers.push({ qIndex: currentQuestionIndex, optIndex });

  setTimeout(() => {
    isTransitioningQuestion = false;
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      currentQuestionIndex++;
      renderCurrentQuestion();
    } else {
      const currentEval = evaluateQuizRanking();

      if (isPartnerPass && partnerAData) {
        const centroidVec = {};
        AXES_META.forEach((m) => {
          centroidVec[m.key] = Math.round(
            (partnerAData.userVec[m.key] + currentEval.userVec[m.key]) / 2
          );
        });
        const bridgeEval = evaluateVectorAgainstGrapes(centroidVec);
        const harmonyPct = Math.max(
          68,
          Math.min(99, Math.round(calculateAffinityScore(partnerAData.userVec, currentEval.userVec)))
        );

        duoCombinedResult = {
          partnerAGrape: partnerAData.servedWinner.grape,
          partnerBGrape: currentEval.servedWinner.grape,
          harmonyPct,
          bridgeEval
        };
        lastComputedResult = bridgeEval;
      } else {
        duoCombinedResult = null;
        lastComputedResult = currentEval;
      }

      const winKey = lastComputedResult.servedWinner.key;
      appState.stats.totalGuests = (appState.stats.totalGuests || 0) + 1;
      appState.stats.byGrape[winKey] = (appState.stats.byGrape[winKey] || 0) + 1;
      saveState();

      if (isPartnerPass && duoCombinedResult) {
        quizStageState = "revealed";
      } else {
        quizStageState = "mirror_gate";
      }
      renderEventoStage();
    }
  }, 170);
}

function prevQuestionStep() {
  vibrate(8);
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderCurrentQuestion();
  } else {
    resetToWelcome();
  }
}

// Stage C: Inverted Mirror Gate (Warm, Non-Technical Reveal)
function renderMirrorGate() {
  if (!lastComputedResult || !lastComputedResult.servedWinner || !GRAPES[lastComputedResult.servedWinner.key]) {
    lastComputedResult = evaluateQuizRanking();
  }
  const winner = lastComputedResult.servedWinner.grape;
  const pct = lastComputedResult.servedWinner.pct;

  document.getElementById("mirror-archetype-pill").textContent = `${winner.archetype} • ${pct}% Afinidad`;
  document.getElementById("mirror-hook-text").textContent = `"${winner.mirrorHook}"`;
  document.getElementById("mirror-plain-talk").textContent = winner.plainFeel;
  document.getElementById("mirror-bridge-preview").textContent = buildPersonalSynthesis(winner);

  const pills = getSignaturePills(winner);
  document.getElementById("mirror-delta-pills").innerHTML = pills
    .map((p) => `<span class="delta-pill">${escapeHTML(p)}</span>`)
    .join("");
}

function unveilWinnerGrape() {
  vibrate(22);
  quizStageState = "revealed";
  renderEventoStage();
}

// SVG 6-Axis Radar Generator
function buildRadarSVG(grape) {
  const size = 150;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 52;
  const n = AXES_META.length;

  function pointAt(idx, val) {
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const r = (val / 100) * maxR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }

  const rings = [0.35, 0.7, 1.0].map((scale) => {
    const pts = AXES_META.map((_, i) => pointAt(i, scale * 100)).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="rgba(245,212,145,0.16)" stroke-width="1"/>`;
  });

  const spokes = AXES_META.map((m, i) => {
    const end = pointAt(i, 100);
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lx = cx + (maxR + 15) * Math.cos(angle);
    const ly = cy + (maxR + 13) * Math.sin(angle);
    return `
      <line x1="${cx}" y1="${cy}" x2="${end.split(",")[0]}" y2="${end.split(",")[1]}" stroke="rgba(245,212,145,0.15)" stroke-width="1"/>
      <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="#e2c8d1" font-size="7.2" font-weight="600" text-anchor="middle" dominant-baseline="middle">${m.short}</text>
    `;
  });

  const baselinePts = AXES_META.map((m, i) => pointAt(i, CLASSIC_BASELINE[m.key])).join(" ");
  const grapePts = AXES_META.map((m, i) => pointAt(i, grape[m.key])).join(" ");

  return `
    <svg viewBox="0 0 ${size} ${size}" width="100%" height="100%">
      ${rings.join("")}
      ${spokes.join("")}
      <polygon points="${baselinePts}" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.55)" stroke-width="1.2" stroke-dasharray="3,2"/>
      <polygon points="${grapePts}" fill="rgba(212,42,94,0.42)" stroke="#f5d491" stroke-width="2"/>
    </svg>
  `;
}

function renderRevealedResult(overrideGrapeKey) {
  if (!lastComputedResult || !lastComputedResult.servedWinner || !GRAPES[lastComputedResult.servedWinner.key]) {
    lastComputedResult = evaluateQuizRanking();
  }
  if (overrideGrapeKey) {
    scrollViewportTop();
  }

  const targetItem = overrideGrapeKey
    ? lastComputedResult.allRanked.find((r) => r.key === overrideGrapeKey) || lastComputedResult.servedWinner
    : lastComputedResult.servedWinner;

  const g = targetItem.grape;
  const bottleLabel = appState.customBottles[g.id] || g.defaultBottle;
  const bottleNote = appState.customNotes[g.id] ?? g.defaultNote;

  document.getElementById("res-archetype-badge").textContent = g.archetype;
  const emblemEl = document.getElementById("res-grape-emblem");
  if (emblemEl) emblemEl.innerHTML = getGrapeEmblemSVG(g.id, 22);
  document.getElementById("res-grape-title").textContent = g.name;
  document.getElementById("res-region-sub").textContent = g.region;
  document.getElementById("res-match-pct").textContent = `${targetItem.pct}%`;
  document.getElementById("res-bottle-tonight").textContent = bottleLabel;

  const noteEl = document.getElementById("res-bottle-note");
  if (noteEl) {
    noteEl.textContent = bottleNote ? `«${bottleNote}»` : "";
    noteEl.style.display = bottleNote ? "block" : "none";
  }

  document.getElementById("res-plain-feel").textContent = ` ${g.plainFeel}`;
  document.getElementById("res-bridge-copy").textContent =
    !overrideGrapeKey || overrideGrapeKey === lastComputedResult.servedWinner.key
      ? buildPersonalSynthesis(g)
      : g.malbecBridge;
  document.getElementById("res-radar-holder").innerHTML = buildRadarSVG(g);

  document.getElementById("res-pill-food").textContent = g.food;
  document.getElementById("res-pill-cheese").textContent = g.cheese;
  document.getElementById("res-pill-infusion").textContent = g.infusion;

  // Duo Alchemy Banner
  const duoBanner = document.getElementById("res-duo-banner");
  const btnStartDuo = document.getElementById("btn-start-duo");
  const showDuoBanner =
    duoCombinedResult &&
    (!overrideGrapeKey || overrideGrapeKey === lastComputedResult.servedWinner.key);
  if (showDuoBanner) {
    duoBanner.style.display = "flex";
    document.getElementById("res-duo-harmony").textContent = `${duoCombinedResult.harmonyPct}% Química Sensorial`;
    document.getElementById("res-duo-p1").textContent = `1º: ${duoCombinedResult.partnerAGrape.name}`;
    document.getElementById("res-duo-p2").textContent = `2º: ${duoCombinedResult.partnerBGrape.name}`;
    document.getElementById("res-duo-explanation").textContent =
      duoCombinedResult.partnerAGrape.id === duoCombinedResult.partnerBGrape.id
        ? `¡Almas gemelas! Ambos conectaron con ${g.name} de forma independiente.`
        : `La botella puente que equilibra los dos paladares hoy en barra es ${g.name}.`;
    if (btnStartDuo) btnStartDuo.style.display = "none";
  } else {
    if (duoBanner) duoBanner.style.display = "none";
    if (btnStartDuo) btnStartDuo.style.display = "flex";
  }

  // Theoretical gem notice if #1 overall grape is not in tonight's active stock
  const gemNotice = document.getElementById("res-theoretical-gem");
  if (
    !overrideGrapeKey &&
    lastComputedResult.theoreticalWinner.key !== lastComputedResult.servedWinner.key
  ) {
    const theo = lastComputedResult.theoreticalWinner;
    gemNotice.style.display = "block";
    gemNotice.innerHTML = `💡 <strong>Tip para tu próxima compra:</strong> Entre los vinos del evento hoy tu ideal es <strong>${escapeHTML(g.name)}</strong>. Cuando vayas a una vinoteca, probá también un <strong>${escapeHTML(theo.grape.name)} (${theo.pct}% afín)</strong>.`;
  } else {
    gemNotice.style.display = "none";
  }

  // Sommelier Technical Drawer
  document.getElementById("res-somm-service").textContent = g.service;
  document.getElementById("res-somm-compound").textContent = g.compound;

  const rankContainer = document.getElementById("res-somm-ranking");
  rankContainer.innerHTML = lastComputedResult.allRanked
    .map((item) => {
      const isSelected = item.key === g.id;
      const stockTag = item.isActiveTonight ? "🍾 En Evento Hoy" : "No cargada hoy";
      return `
        <button type="button" onclick="renderRevealedResult('${item.key}')" style="width:100%;text-align:left;padding:8px 10px;border-radius:10px;border:1px solid ${
        isSelected ? "var(--gold-bright)" : "var(--border-subtle)"
      };background:${
        isSelected ? "rgba(220,163,84,0.18)" : "rgba(0,0,0,0.3)"
      };color:var(--text-primary);display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:0.76rem;">
          <span style="display:inline-flex;align-items:center;gap:6px;">${getGrapeEmblemSVG(item.key, 15)} <strong>${escapeHTML(item.grape.name)}</strong> <small style="color:var(--text-muted)">(${stockTag})</small></span>
          <strong style="color:var(--gold-bright)">${item.pct}% afín</strong>
        </button>
      `;
    })
    .join("");

  window._currentDisplayedGrapeKey = g.id;
  window._currentDisplayedPct = targetItem.pct;
}

function toggleSommelierDrawer() {
  vibrate(8);
  const body = document.getElementById("sommelier-drawer-body");
  const icon = document.getElementById("sommelier-drawer-chevron");
  if (!body) return;
  const isOpen = body.classList.toggle("open");
  if (icon) icon.textContent = isOpen ? "▲ Ocultar" : "▼ Desplegar";
}

// =========================================================================
// MECÁNICA TRIZ 2: PASE LUMINOSO DE BARRA (LECTURA A 3 METROS)
// =========================================================================
function openBarPassModal() {
  vibrate(15);
  const fallbackKey = getActiveGrapeKeys()[0] || "pinot";
  const key = GRAPES[window._currentDisplayedGrapeKey] ? window._currentDisplayedGrapeKey : fallbackKey;
  const g = GRAPES[key] || GRAPES.pinot;
  const bottle = appState.customBottles[g.id] || g.defaultBottle;

  const card = document.getElementById("bar-pass-card");
  if (card) card.style.background = g.auraGradient;

  document.getElementById("bar-pass-code").textContent = g.auraCode;
  document.getElementById("bar-pass-symbol").innerHTML = getGrapeEmblemSVG(g.id, 68);
  document.getElementById("bar-pass-grape").textContent = g.name;
  document.getElementById("bar-pass-bottle").textContent = `🍾 ${bottle}`;

  document.getElementById("bar-pass-modal").classList.add("open");
}

function closeBarPassModal() {
  document.getElementById("bar-pass-modal").classList.remove("open");
}

// =========================================================================
// MECÁNICA TRIZ 3: TAROT STORY CARD 9:16 EN <CANVAS> CON FIRMA DEL SOMMELIER
// =========================================================================
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY + lineHeight;
}

function drawFittedCanvasText(ctx, text, x, y, maxWidth, startPx, minPx, fontWeight, fontFamily) {
  let px = startPx;
  while (px > minPx) {
    ctx.font = `${fontWeight} ${px}px ${fontFamily}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    px -= 2;
  }
  if (ctx.measureText(text).width > maxWidth) {
    return wrapCanvasText(ctx, text, x, y - Math.round(px * 0.35), maxWidth, Math.round(px * 1.12));
  }
  ctx.fillText(text, x, y);
  return y + Math.round(px * 0.55);
}

function drawTarotStoryCanvas() {
  const canvas = document.getElementById("tarot-story-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const fallbackKey = getActiveGrapeKeys()[0] || "pinot";
  const key = GRAPES[window._currentDisplayedGrapeKey] ? window._currentDisplayedGrapeKey : fallbackKey;
  const pct = window._currentDisplayedPct || 94;
  const g = GRAPES[key] || GRAPES.pinot;
  const bottle = appState.customBottles[g.id] || g.defaultBottle;

  const grad = ctx.createRadialGradient(W / 2, H * 0.2, 40, W / 2, H / 2, H * 0.85);
  grad.addColorStop(0, "#54112c");
  grad.addColorStop(0.55, "#1d0811");
  grad.addColorStop(1, "#0d0408");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(245, 212, 145, 0.65)";
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.strokeStyle = "rgba(245, 212, 145, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.textAlign = "center";
  ctx.fillStyle = "#dca354";
  drawFittedCanvasText(ctx, appState.eventName.toUpperCase(), W / 2, 92, W - 120, 22, 15, "bold", "sans-serif");

  ctx.fillStyle = "#f5d491";
  drawFittedCanvasText(ctx, `✨ ${g.archetype} ✨`, W / 2, 144, W - 120, 24, 16, "600", "sans-serif");

  ctx.fillStyle = "#ffffff";
  drawFittedCanvasText(ctx, g.name, W / 2, 238, W - 110, 62, 34, "bold", "Georgia, serif");

  ctx.fillStyle = "#34d399";
  ctx.font = "bold 25px sans-serif";
  ctx.fillText(`${pct}% AFINIDAD CON TU PALADAR`, W / 2, 302);

  const rCx = W / 2;
  const rCy = 485;
  const rMax = 112;
  const n = AXES_META.length;

  function pt(i, val) {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (val / 100) * rMax;
    return [rCx + r * Math.cos(a), rCy + r * Math.sin(a)];
  }

  [0.4, 0.75, 1].forEach((s) => {
    ctx.beginPath();
    AXES_META.forEach((_, i) => {
      const [x, y] = pt(i, s * 100);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "rgba(245, 212, 145, 0.18)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  ctx.beginPath();
  AXES_META.forEach((m, i) => {
    const [x, y] = pt(i, CLASSIC_BASELINE[m.key]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  AXES_META.forEach((m, i) => {
    const [x, y] = pt(i, g[m.key]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(212, 42, 94, 0.45)";
  ctx.fill();
  ctx.strokeStyle = "#f5d491";
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.fillStyle = "#e2c8d1";
  ctx.font = "600 19px sans-serif";
  AXES_META.forEach((m, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lx = rCx + (rMax + 34) * Math.cos(a);
    const ly = rCy + (rMax + 26) * Math.sin(a);
    ctx.fillText(m.short, lx, ly);
  });

  ctx.fillStyle = "#fdf7f9";
  ctx.font = "italic 24px Georgia, serif";
  const plainText = g.plainFeel.length > 175 ? g.plainFeel.slice(0, 172) + "..." : g.plainFeel;
  const nextY = wrapCanvasText(ctx, `"${plainText}"`, W / 2, 675, W - 140, 32);

  const boxTop = Math.min(nextY + 18, H - 220);
  const boxHeight = 122;
  ctx.fillStyle = "rgba(245, 212, 145, 0.14)";
  ctx.fillRect(65, boxTop, W - 130, boxHeight);
  ctx.strokeStyle = "rgba(245, 212, 145, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(65, boxTop, W - 130, boxHeight);

  ctx.fillStyle = "#f5d491";
  ctx.font = "bold 19px sans-serif";
  ctx.fillText("MI VINO RECOMENDADO HOY:", W / 2, boxTop + 34);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 23px sans-serif";
  wrapCanvasText(ctx, bottle, W / 2, boxTop + 70, W - 160, 28);

  ctx.fillStyle = "#dca354";
  drawFittedCanvasText(ctx, `Experiencia curada por ${appState.sommelierSig}`, W / 2, H - 62, W - 120, 21, 15, "bold", "sans-serif");
}

function openShareModal() {
  vibrate(10);
  drawTarotStoryCanvas();
  document.getElementById("share-modal").classList.add("open");
}

function closeShareModal() {
  document.getElementById("share-modal").classList.remove("open");
}

function shareOrDownloadStoryCanvas() {
  const canvas = document.getElementById("tarot-story-canvas");
  if (!canvas) return;
  const fallbackKey = getActiveGrapeKeys()[0] || "pinot";
  const key = GRAPES[window._currentDisplayedGrapeKey] ? window._currentDisplayedGrapeKey : fallbackKey;
  const g = GRAPES[key] || GRAPES.pinot;

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], `cepa-espejo-${g.id}.png`, { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Mi Cepa Espejo: ${g.name}`,
          text: `Descubrí mi Cepa Espejo (${g.name}) en ${appState.eventName}`
        });
        showToast("Carta Story compartida");
        return;
      } catch (e) {}
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cepa-espejo-${g.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Imagen Story descargada en tu dispositivo");
  }, "image/png");
}

async function triggerNativeShare() {
  const fallbackKey = getActiveGrapeKeys()[0] || "pinot";
  const key = GRAPES[window._currentDisplayedGrapeKey] ? window._currentDisplayedGrapeKey : fallbackKey;
  const pct = window._currentDisplayedPct || 94;
  const g = GRAPES[key] || GRAPES.pinot;
  const bottle = appState.customBottles[g.id] || g.defaultBottle;

  const text = `🍷 Mi Cepa Espejo es ${g.name} (${pct}% de afinidad)\n✨ ${g.archetype}\n🍾 En copa hoy: ${bottle}\n• Cómo se siente: ${g.plainFeel}\n• Curado por: ${appState.sommelierSig}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: `Mi Cepa Espejo: ${g.name}`, text });
      showToast("Ficha compartida");
      return;
    } catch (err) {}
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Texto copiado para WhatsApp");
      return;
    } catch (e) {}
  }
}

// =========================================================================
// TAB 2: PRECARGA DE VINOS DEL EVENTO & REPORTE EJECUTIVO B2B
// =========================================================================
function renderCavaManager() {
  const evInput = document.getElementById("input-event-name");
  if (evInput) evInput.value = appState.eventName;

  const sigInput = document.getElementById("input-sommelier-sig");
  if (sigInput) sigInput.value = appState.sommelierSig;

  document.getElementById("stat-total-guests").textContent = String(appState.stats.totalGuests || 0);

  let topKey = null;
  let topVal = 0;
  Object.keys(appState.stats.byGrape || {}).forEach((k) => {
    if (GRAPES[k] && appState.stats.byGrape[k] > topVal) {
      topVal = appState.stats.byGrape[k];
      topKey = k;
    }
  });
  document.getElementById("stat-top-grape").textContent =
    topKey && topVal > 0 && GRAPES[topKey] ? `${GRAPES[topKey].name} (${topVal})` : "Sin datos aún";

  const listEl = document.getElementById("cava-stock-list");
  if (!listEl) return;

  // Render custom blends/wines at the top so the sommelier sees their newly created bottles immediately
  const sortedGrapes = Object.values(GRAPES).sort((a, b) => {
    const aCust = a.isCustom ? 1 : 0;
    const bCust = b.isCustom ? 1 : 0;
    return bCust - aCust;
  });

  listEl.innerHTML = sortedGrapes
    .map((g) => {
      const isOn = !!appState.activeGrapes[g.id];
      const bottleVal = escapeHTML(appState.customBottles[g.id] || g.defaultBottle);
      const noteVal = escapeHTML(appState.customNotes[g.id] ?? g.defaultNote);
      const countTonight = appState.stats.byGrape[g.id] || 0;
      const customActions = g.isCustom
        ? `
          <button type="button" onclick="editCustomGrape('${g.id}')" class="btn-ghost-sm" style="padding:4px 8px;font-size:0.68rem;color:var(--gold-bright);border-color:var(--border-gold);">Editar</button>
          <button type="button" onclick="deleteCustomGrape('${g.id}')" class="btn-ghost-sm" style="padding:4px 8px;font-size:0.68rem;color:#fda4af;border-color:rgba(244,63,94,0.4);">Eliminar</button>
        `
        : "";
      return `
        <div class="cava-item-row ${isOn ? "active-stock" : ""}">
          <div class="cava-row-top">
            <div style="display:flex;align-items:center;gap:9px;">
              <span class="grape-emblem-badge" style="width:32px;height:32px;">${getGrapeEmblemSVG(g.id, 18)}</span>
              <div>
                <strong style="font-size:0.95rem;color:var(--gold-bright)">${escapeHTML(g.name)} ${g.isCustom ? '<small style="color:var(--emerald-ok);font-size:0.65rem;">(Personalizada)</small>' : ""}</strong>
                <span style="display:block;font-size:0.7rem;color:var(--text-muted)">
                  ${isOn ? "🟢 ACTIVA EN EL EVENTO" : "⚪ Apagada hoy"} • ${countTonight} invitados afines
                </span>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
              ${customActions}
              <button type="button" onclick="toggleGrapeStock('${g.id}')" class="switch-btn ${isOn ? "on" : ""}" aria-label="Activar ${escapeHTML(g.name)}">
                <span class="switch-knob"></span>
              </button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:0.66rem;color:var(--gold-main);font-weight:700;text-transform:uppercase;">
              Etiqueta / Bodega que vas a servir hoy:
            </label>
            <input
              type="text"
              class="input-luxury"
              value="${bottleVal}"
              placeholder="Ej: Zuccardi Polígonos Cabernet Franc"
              onchange="updateBottleLabel('${g.id}', this.value)"
            />
            <input
              type="text"
              class="input-luxury"
              style="padding:7px 10px;"
              value="${noteVal}"
              placeholder="Nota breve para el invitado (opcional)..."
              onchange="updateBottleNote('${g.id}', this.value)"
            />
          </div>
        </div>
      `;
    })
    .join("");
}

function toggleCustomGrapeCreator(forceOpen) {
  vibrate(10);
  const box = document.getElementById("custom-grape-creator");
  const btn = document.getElementById("btn-toggle-creator");
  if (!box) return;
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : box.style.display === "none";
  box.style.display = shouldOpen ? "flex" : "none";
  if (!shouldOpen) {
    const editEl = document.getElementById("cg-editing-id");
    if (editEl) editEl.value = "";
  }
  if (btn) {
    btn.textContent = shouldOpen ? "▲ Cerrar Creador" : "➕ Cargar Vino / Blend";
  }
}

function fillCustomTemplate(tplKey) {
  vibrate(10);
  const t = CUSTOM_TEMPLATES[tplKey];
  if (!t) return;
  document.getElementById("cg-name").value = t.name;
  document.getElementById("cg-bottle").value = t.bottle;
  document.getElementById("cg-category").value = t.category;
  document.getElementById("cg-region").value = t.region;
  document.getElementById("cg-archetype").value = t.archetype;
  document.getElementById("cg-plain").value = t.plain;
  document.getElementById("cg-food").value = t.food;
  const cheeseEl = document.getElementById("cg-cheese");
  if (cheeseEl) cheeseEl.value = t.cheese || "Provoleta dorada, Fontina o Brie cremoso.";

  ["acidez", "tanino", "cuerpo", "aroma"].forEach((axis) => {
    const slider = document.getElementById(`cg-${axis}`);
    const lbl = document.getElementById(`cg-val-${axis}`);
    if (slider) slider.value = String(t[axis]);
    if (lbl) lbl.textContent = `${t[axis]}%`;
  });
  showToast(`Plantilla «${t.name}» cargada, ajustala a tu gusto`);
}

function editCustomGrape(grapeKey) {
  vibrate(10);
  const g = appState.customGrapes?.[grapeKey] || GRAPES[grapeKey];
  if (!g || !g.isCustom) return;

  toggleCustomGrapeCreator(true);
  const editEl = document.getElementById("cg-editing-id");
  if (editEl) editEl.value = grapeKey;

  document.getElementById("cg-name").value = g.name;
  document.getElementById("cg-bottle").value = appState.customBottles[grapeKey] || g.defaultBottle;
  document.getElementById("cg-category").value = g.category;
  document.getElementById("cg-region").value = g.region;
  document.getElementById("cg-archetype").value = g.archetype;
  document.getElementById("cg-plain").value = g.plainFeel;
  document.getElementById("cg-food").value = g.food;
  const cheeseEl = document.getElementById("cg-cheese");
  if (cheeseEl) cheeseEl.value = g.cheese || "";

  ["acidez", "tanino", "cuerpo", "aroma"].forEach((axis) => {
    const slider = document.getElementById(`cg-${axis}`);
    const lbl = document.getElementById(`cg-val-${axis}`);
    if (slider) slider.value = String(g[axis]);
    if (lbl) lbl.textContent = `${g[axis]}%`;
  });

  scrollViewportTop();
  showToast(`Editando «${g.name}»`);
}

function saveCustomGrapeToCava() {
  vibrate(18);
  const editingId = (document.getElementById("cg-editing-id")?.value || "").trim();
  const name = (document.getElementById("cg-name")?.value || "").trim();
  const bottle = (document.getElementById("cg-bottle")?.value || "").trim();
  const category = document.getElementById("cg-category")?.value || "intenso";
  const region = (document.getElementById("cg-region")?.value || "").trim() || "Estilo de Autor • Selección del Sommelier";
  const archetype = (document.getElementById("cg-archetype")?.value || "").trim() || "El Sofisticado, Curioso y Armónico";
  const plainFeel =
    (document.getElementById("cg-plain")?.value || "").trim() ||
    "Un vino de autor elegido especialmente para el evento por su equilibrio, expresión y placer en boca.";
  const food =
    (document.getElementById("cg-food")?.value || "").trim() ||
    "Carnes braseadas, pastas artesanales o platos de estación.";
  const cheese =
    (document.getElementById("cg-cheese")?.value || "").trim() ||
    (category === "blanco" || category === "rosado_naranjo"
      ? "Queso Brie cremoso, Camembert o queso de cabra."
      : "Provoleta dorada, Fontina o quesos de mediana guarda.");

  if (!name) {
    showToast("Por favor escribí el nombre de la cepa o blend");
    return;
  }

  const acidez = Number(document.getElementById("cg-acidez")?.value || 74);
  const tanino = Number(document.getElementById("cg-tanino")?.value || 70);
  const cuerpo = Number(document.getElementById("cg-cuerpo")?.value || 78);
  const aroma = Number(document.getElementById("cg-aroma")?.value || 88);

  // Calibrated 6D derivation so custom Red Blends, White Blends, Rosados and Naranjos compete fairly on all 6 axes
  const frescura =
    category === "blanco" || category === "rosado_naranjo"
      ? Math.min(96, Math.max(72, Math.round(acidez * 0.85 + (100 - tanino) * 0.18)))
      : Math.min(92, Math.max(58, Math.round(acidez * 0.88 + (100 - tanino) * 0.28)));
  const guarda = Math.min(96, Math.max(52, Math.round(cuerpo * 0.62 + tanino * 0.38)));

  const customId = editingId && appState.customGrapes?.[editingId] ? editingId : "custom_" + Date.now();
  const finalBottle = bottle || name;

  const bodyPill =
    cuerpo >= 78 ? "🍷 Cuerpo Envolvente" : cuerpo >= 58 ? "✨ Equilibrio Armónico" : "🌊 Paso Súper Fluido";
  const freshPill =
    acidez >= 80 ? "⚡ Frescura Vibrante" : tanino >= 72 ? "🔥 Carácter Firme" : "🍒 Textura Amable";

  const bridgeCopy =
    category === "blanco" || category === "rosado_naranjo"
      ? `Conecta con tu lado curioso y luminoso: equilibra una frescura limpia que despierta el paladar con una textura envolvente y muy gastronómica.`
      : tanino >= 70
      ? `Encaja con tu búsqueda de presencia y armonía: une volumen sabroso en el centro de la boca con capas aromáticas complejas y un final largo.`
      : `Va perfecto con vos porque prioriza la suavidad, la fruta expresiva y un paso por boca fluido y sedoso sin ninguna aspereza.`;

  const newGrapeObj = {
    id: customId,
    isCustom: true,
    name,
    category,
    defaultActive: true,
    defaultBottle: finalBottle,
    defaultNote: appState.customNotes?.[customId] || "Selección especial cargada por el Sommelier para hoy.",
    auraSymbol: "✨",
    auraCode: "CÓDIGO AUTOR • DORADO",
    auraGradient:
      category === "blanco"
        ? "linear-gradient(135deg, #ca8a04 0%, #064e3b 100%)"
        : category === "rosado_naranjo"
        ? "linear-gradient(135deg, #ea580c 0%, #701a75 100%)"
        : "linear-gradient(135deg, #9d174d 0%, #3b0764 100%)",
    archetype,
    region,
    signaturePills: ["✨ Corte de Autor", bodyPill, freshPill],
    plainFeel,
    mirrorHook: `Tu personalidad busca equilibrio y carácter propio: conectás de inmediato con vinos pensados al detalle que combinan ${
      tanino > 60 ? "estructura envolvente" : "textura amable y fluida"
    } con gran expresión aromática.`,
    malbecBridge: bridgeCopy,
    compound: `Perfil calibrado por el Sommelier (Acidez ${acidez} • Tanino ${tanino} • Cuerpo ${cuerpo} • Aroma ${aroma}).`,
    acidez,
    tanino,
    cuerpo,
    aroma,
    frescura,
    guarda,
    food,
    cheese,
    infusion:
      category === "blanco" || category === "rosado_naranjo"
        ? "Té en hebras cítrico/floral o café filtrado suave."
        : tanino > 65
        ? "Café espresso intenso o mate amargo con hierbas."
        : "Café cremoso o mate suave en ronda.",
    service:
      category === "blanco" || category === "rosado_naranjo"
        ? "9 °C – 12 °C • Copa de blanco / universal."
        : "15 °C – 17 °C • Copa Burdeos / universal.",
    blindSight:
      category === "blanco"
        ? "Brillante con reflejos dorados/acerados."
        : category === "rosado_naranjo"
        ? "Reflejos rosados cobrizos a ámbar brillante."
        : "Rojo rubí profundo con matices vivos.",
    blindNose: `Expresión aromática (${aroma}/100) con capas frutales y de crianza armónica.`,
    blindPalate: `Acidez ${acidez}/100, textura tánica ${tanino}/100 y volumen en boca ${cuerpo}/100.`
  };

  if (!appState.customGrapes) appState.customGrapes = {};
  appState.customGrapes[customId] = newGrapeObj;
  registerCustomGrapesIntoCatalog();

  appState.activeGrapes[customId] = true;
  appState.customBottles[customId] = finalBottle;
  if (!appState.customNotes[customId]) {
    appState.customNotes[customId] = newGrapeObj.defaultNote;
  }
  if (typeof appState.stats.byGrape[customId] !== "number") {
    appState.stats.byGrape[customId] = 0;
  }

  lastComputedResult = evaluateQuizRanking();
  saveState();
  renderCavaManager();
  renderCatalog();
  renderBlindChoices();

  // Clear inputs and close creator
  document.getElementById("cg-name").value = "";
  document.getElementById("cg-bottle").value = "";
  const editEl = document.getElementById("cg-editing-id");
  if (editEl) editEl.value = "";
  toggleCustomGrapeCreator(false);
  showToast(editingId ? `✨ «${name}» actualizado en tu Cava` : `🍷 «${name}» sumado y activado en tu Cava de Hoy`);
}

function deleteCustomGrape(grapeKey) {
  vibrate(12);
  if (!appState.customGrapes || !appState.customGrapes[grapeKey]) return;
  const removedName = appState.customGrapes[grapeKey].name;
  delete appState.customGrapes[grapeKey];
  delete appState.activeGrapes[grapeKey];
  delete appState.customBottles[grapeKey];
  delete appState.customNotes[grapeKey];
  delete appState.stats.byGrape[grapeKey];
  registerCustomGrapesIntoCatalog();

  // Ensure at least 2 grapes remain active
  const remainingActive = getActiveGrapeKeys();
  if (remainingActive.length < 2) {
    ["pinot", "cabfranc", "bonarda"].forEach((fallbackK) => {
      if (getActiveGrapeKeys().length < 2 && GRAPES[fallbackK]) {
        appState.activeGrapes[fallbackK] = true;
      }
    });
  }

  // Clean up any active pointers to the deleted custom grape
  if (window._currentDisplayedGrapeKey === grapeKey) {
    window._currentDisplayedGrapeKey = getActiveGrapeKeys()[0] || "pinot";
  }
  if (duoCombinedResult) {
    duoCombinedResult = null;
  }
  lastComputedResult = evaluateQuizRanking();
  if (blindTargetKey === grapeKey) {
    nextBlindRound();
  }

  saveState();
  renderCavaManager();
  renderCatalog();
  renderBlindChoices();
  showToast(`«${removedName}» eliminado de la cava`);
}

function updateEventName(val) {
  appState.eventName = val.trim() || "Degustación Cepa Espejo";
  saveState();
  showToast("Nombre del evento guardado");
}

function updateSommelierSignature(val) {
  appState.sommelierSig = val.trim() || "Tu Sommelier • Cepa Espejo";
  saveState();
  showToast("Firma de Sommelier guardada");
}

function toggleGrapeStock(grapeKey) {
  vibrate(10);
  const currentActive = getActiveGrapeKeys();
  if (appState.activeGrapes[grapeKey] && currentActive.length <= 2) {
    showToast("Dejá al menos 2 cepas encendidas para el evento");
    return;
  }
  appState.activeGrapes[grapeKey] = !appState.activeGrapes[grapeKey];
  saveState();
  renderCavaManager();
}

function applyCavaPreset(preset) {
  vibrate(12);
  const customKeys = Object.keys(GRAPES).filter((k) => GRAPES[k].isCustom);
  if (preset === "custom_only" && customKeys.length === 0) {
    showToast("Primero cargá al menos un Vino o Blend propio arriba");
    return;
  }

  Object.keys(GRAPES).forEach((k) => {
    if (preset === "all8") {
      appState.activeGrapes[k] = true;
    } else if (preset === "all6") {
      appState.activeGrapes[k] = !GRAPES[k].isCustom && GRAPES[k].defaultActive;
    } else if (preset === "blancos_rosados") {
      appState.activeGrapes[k] =
        GRAPES[k].category === "blanco" || GRAPES[k].category === "rosado_naranjo";
    } else if (preset === "tintos") {
      appState.activeGrapes[k] =
        GRAPES[k].category === "sutil" || GRAPES[k].category === "intenso";
    } else if (preset === "custom_only") {
      appState.activeGrapes[k] = !!GRAPES[k].isCustom;
    }
  });

  // Guarantee at least 2 active wines so the comparator always has a contrast pair
  if (getActiveGrapeKeys().length < 2) {
    ["pinot", "cabfranc"].forEach((k) => {
      if (getActiveGrapeKeys().length < 2 && GRAPES[k]) {
        appState.activeGrapes[k] = true;
      }
    });
  }

  saveState();
  renderCavaManager();
  showToast("Cava del evento actualizada");
}

function updateBottleLabel(grapeKey, val) {
  if (!GRAPES[grapeKey]) return;
  appState.customBottles[grapeKey] = val.trim() || GRAPES[grapeKey].defaultBottle;
  saveState();
  showToast(`Vino de ${GRAPES[grapeKey].name} guardado`);
}

function updateBottleNote(grapeKey, val) {
  if (!GRAPES[grapeKey]) return;
  appState.customNotes[grapeKey] = val.trim();
  saveState();
  showToast("Nota de servicio guardada");
}

function resetEventStats() {
  vibrate(12);
  appState.stats.totalGuests = 0;
  Object.keys(GRAPES).forEach((k) => {
    appState.stats.byGrape[k] = 0;
  });
  saveState();
  renderCavaManager();
  showToast("Contador del evento reiniciado a cero");
}

async function exportB2BEventReport() {
  vibrate(14);
  const total = appState.stats.totalGuests || 0;
  const activeKeys = getActiveGrapeKeys();
  const lines = Object.keys(GRAPES)
    .filter((k) => activeKeys.includes(k) || (appState.stats.byGrape[k] || 0) > 0)
    .sort((a, b) => (appState.stats.byGrape[b] || 0) - (appState.stats.byGrape[a] || 0))
    .map((k) => {
      const count = appState.stats.byGrape[k] || 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      return `• ${GRAPES[k].name} (${appState.customBottles[k] || GRAPES[k].defaultBottle}): ${count} invitados (${pct}%)`;
    });

  const report = [
    `📊 REPORTE DE PERFILES DE PALADAR — ${appState.eventName.toUpperCase()}`,
    `Curado por: ${appState.sommelierSig}`,
    `Total de invitados perfilados en vivo: ${total}`,
    ``,
    `🍷 PREFERENCIAS DE CEPA EN EL EVENTO:`,
    ...lines,
    ``,
    `Generado con Cepa Espejo Pro.`
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(report);
      showToast("📊 Informe Ejecutivo copiado al portapapeles");
      return;
    } catch (e) {}
  }
  showToast("Informe generado");
}

// =========================================================================
// TAB 3: GUÍA DE CEPAS (EXPLICACIÓN SIMPLE + APUNTE SOMMELIER)
// =========================================================================
function setCatalogFilter(cat) {
  vibrate(8);
  catalogFilter = cat;
  ["all", "sutil", "intenso", "blanco", "rosado_naranjo"].forEach((c) => {
    const btn = document.getElementById(`cat-filter-${c}`);
    if (btn) {
      btn.style.background = c === cat ? "var(--gold-main)" : "rgba(0,0,0,0.35)";
      btn.style.color = c === cat ? "#1a080f" : "var(--text-secondary)";
    }
  });
  renderCatalog();
}

function renderCatalog() {
  const container = document.getElementById("catalog-cards-container");
  if (!container) return;

  const allBtn = document.getElementById("cat-filter-all");
  if (allBtn) {
    allBtn.textContent = `Todas (${Object.keys(GRAPES).length})`;
  }

  const list = Object.values(GRAPES).filter(
    (g) => catalogFilter === "all" || g.category === catalogFilter
  );

  container.innerHTML = list
    .map((g) => {
      const isOn = !!appState.activeGrapes[g.id];
      const bottle = appState.customBottles[g.id] || g.defaultBottle;
      return `
        <div class="section-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="grape-emblem-badge">${getGrapeEmblemSVG(g.id, 20)}</span>
              <div>
                <span style="font-size:0.68rem;color:var(--gold-bright);font-weight:700;text-transform:uppercase;">${escapeHTML(g.archetype)}</span>
                <h3 style="font-family:var(--font-serif);font-size:1.35rem;margin:2px 0;color:var(--text-primary);">${escapeHTML(g.name)}</h3>
                <p style="font-size:0.73rem;color:var(--text-muted);margin:0;">🍾 Hoy: ${escapeHTML(bottle)}</p>
              </div>
            </div>
            <span style="font-size:0.68rem;padding:4px 8px;border-radius:99px;background:${
              isOn ? "rgba(52,211,153,0.16)" : "rgba(255,255,255,0.06)"
            };color:${isOn ? "var(--emerald-ok)" : "var(--text-muted)"};border:1px solid var(--border-subtle);">
              ${isOn ? "En Cava Hoy" : "Apagada"}
            </span>
          </div>
          <div style="padding:9px 11px;border-radius:10px;background:rgba(245,212,145,0.08);border:1px solid var(--border-subtle);font-size:0.79rem;color:var(--text-primary);line-height:1.4;">
            <strong style="color:var(--gold-bright);">En simple:</strong> ${escapeHTML(g.plainFeel)}
          </div>
          <p style="font-size:0.78rem;line-height:1.42;color:var(--text-secondary);margin:0;">
            <strong style="color:var(--gold-main);">Por qué conquista:</strong> ${escapeHTML(g.malbecBridge)}
          </p>
          <button type="button" class="btn-secondary-wine" style="padding:10px;" onclick="inspectGrapeInResult('${g.id}')">
            Ver Ficha & Pase de Barra →
          </button>
        </div>
      `;
    })
    .join("");
}

function inspectGrapeInResult(grapeKey) {
  switchTab("evento");
  lastComputedResult = evaluateQuizRanking();
  quizStageState = "revealed";
  renderEventoStage();
  renderRevealedResult(grapeKey);
}

// =========================================================================
// TAB 4: MODO ORÁCULO SINESTÉSICO (INVITADOS) + CATA A CIEGAS (WSET)
// =========================================================================
function openOracleDirect() {
  switchTab("ciegas");
  switchBlindMode("oracle");
}

function switchBlindMode(mode) {
  vibrate(8);
  if (appState.guestKioskLocked && mode === "wset") {
    mode = "oracle";
  }
  blindMode = mode;
  const btnO = document.getElementById("seg-btn-oracle");
  const btnW = document.getElementById("seg-btn-wset");
  const subO = document.getElementById("subview-oracle");
  const subW = document.getElementById("subview-wset");

  if (btnO) btnO.classList.toggle("active", mode === "oracle");
  if (btnW) btnW.classList.toggle("active", mode === "wset");
  if (subO) subO.style.display = mode === "oracle" ? "flex" : "none";
  if (subW) subW.style.display = mode === "wset" ? "flex" : "none";
}

function renderOracleQuestions() {
  const box = document.getElementById("oracle-questions-box");
  if (!box) return;

  box.innerHTML = ORACLE_QUESTIONS.map((q, qIdx) => {
    const selectedOpt = oracleAnswers[qIdx];
    return `
      <div style="background:rgba(0,0,0,0.34);border:1px solid var(--border-subtle);border-radius:14px;padding:12px;">
        <div style="font-size:0.82rem;font-weight:700;color:var(--gold-bright);margin-bottom:8px;">
          ${q.prompt}
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${q.options
            .map(
              (opt, oIdx) => `
            <button
              type="button"
              onclick="selectOracleOption(${qIdx}, ${oIdx})"
              style="text-align:left;padding:9px 11px;border-radius:10px;border:1px solid ${
                selectedOpt === oIdx ? "var(--gold-bright)" : "var(--border-subtle)"
              };background:${
                selectedOpt === oIdx ? "rgba(212,42,94,0.45)" : "rgba(255,255,255,0.03)"
              };color:var(--text-primary);font-size:0.78rem;cursor:pointer;"
            >
              ${opt.label}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }).join("");
}

function selectOracleOption(qIdx, oIdx) {
  vibrate(10);
  oracleAnswers[qIdx] = oIdx;
  renderOracleQuestions();

  if (
    oracleAnswers[0] !== undefined &&
    oracleAnswers[1] !== undefined &&
    oracleAnswers[2] !== undefined
  ) {
    computeOracleResult();
  }
}

function computeOracleResult() {
  const activeKeys = getActiveGrapeKeys();
  const scores = {};
  Object.keys(GRAPES).forEach((k) => {
    scores[k] = activeKeys.includes(k) ? 2 : 0;
  });

  ORACLE_QUESTIONS.forEach((q, qIdx) => {
    const oIdx = oracleAnswers[qIdx];
    const w = q.options[oIdx]?.weights || {};
    Object.keys(w).forEach((k) => {
      if (scores[k] !== undefined) {
        scores[k] = (scores[k] || 0) + w[k];
      }
    });
  });

  // Also score custom grapes/blends dynamically based on structural traits
  Object.keys(GRAPES).forEach((k) => {
    const g = GRAPES[k];
    if (!g.isCustom) return;
    if (oracleAnswers[0] === 0 && g.acidez >= 78 && g.tanino <= 40) scores[k] += 4;
    if (oracleAnswers[0] === 1 && g.tanino >= 35 && g.tanino <= 65) scores[k] += 4;
    if (oracleAnswers[0] === 2 && g.acidez >= 72 && g.cuerpo >= 65) scores[k] += 4;
    if (oracleAnswers[0] === 3 && g.tanino >= 72 && g.cuerpo >= 78) scores[k] += 4;

    if (oracleAnswers[1] === 0 && g.tanino <= 45) scores[k] += 3;
    if (oracleAnswers[1] === 1 && g.cuerpo >= 65 && g.acidez >= 70) scores[k] += 4;
    if (oracleAnswers[1] === 2 && g.frescura >= 78) scores[k] += 4;
    if (oracleAnswers[1] === 3 && g.cuerpo >= 80) scores[k] += 4;

    if (oracleAnswers[2] === 0 && g.category === "rosado_naranjo") scores[k] += 4;
    if (oracleAnswers[2] === 1 && g.category === "rosado_naranjo") scores[k] += 4;
    if (oracleAnswers[2] === 2 && g.category === "blanco") scores[k] += 5;
    if (oracleAnswers[2] === 3 && g.tanino >= 70) scores[k] += 4;
  });

  const sorted = Object.keys(GRAPES).sort((a, b) => {
    const aActive = activeKeys.includes(a) ? 1 : 0;
    const bActive = activeKeys.includes(b) ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;
    return scores[b] - scores[a];
  });

  const winKey = sorted[0];
  const g = GRAPES[winKey] || GRAPES.pinot;
  const bottle = appState.customBottles[g.id] || g.defaultBottle;
  window._currentDisplayedGrapeKey = g.id;

  const resBox = document.getElementById("oracle-result-box");
  resBox.style.display = "block";
  document.getElementById("oracle-res-grape").textContent = `¡Tu copa habla como un ${g.name}!`;
  document.getElementById("oracle-res-bottle").textContent = `🍾 En nuestro evento: ${bottle}`;
  document.getElementById("oracle-res-desc").textContent = g.plainFeel;
}

function resetOracleGame() {
  vibrate(10);
  oracleAnswers = {};
  const resBox = document.getElementById("oracle-result-box");
  if (resBox) resBox.style.display = "none";
  renderOracleQuestions();
}

// WSET / CMS Blind Trainer
function nextBlindRound() {
  vibrate(10);
  const allKeys = Object.keys(GRAPES);
  const others = allKeys.filter((k) => k !== blindTargetKey);
  const pool = others.length > 0 ? others : allKeys;
  blindTargetKey = pool[Math.floor(Math.random() * pool.length)] || "pinot";
  blindAnswered = false;

  const g = GRAPES[blindTargetKey] || GRAPES.pinot;
  document.getElementById("blind-sight-text").textContent = g.blindSight;

  const noseEl = document.getElementById("blind-nose-text");
  noseEl.textContent = "Tocá «Revelar Nariz» para oler los marcadores aromáticos.";
  noseEl.style.color = "var(--text-muted)";

  const palateEl = document.getElementById("blind-palate-text");
  palateEl.textContent = "Tocá «Revelar Boca» para analizar acidez, taninos y cuerpo.";
  palateEl.style.color = "var(--text-muted)";

  const fb = document.getElementById("blind-feedback-box");
  if (fb) fb.style.display = "none";

  renderBlindChoices();
}

function revealBlindStage(stage) {
  vibrate(8);
  const g = GRAPES[blindTargetKey] || GRAPES.pinot;
  if (stage === "nose") {
    const el = document.getElementById("blind-nose-text");
    el.textContent = g.blindNose;
    el.style.color = "var(--gold-bright)";
  } else if (stage === "palate") {
    const el = document.getElementById("blind-palate-text");
    el.textContent = g.blindPalate;
    el.style.color = "var(--gold-bright)";
  }
}

function renderBlindChoices() {
  const box = document.getElementById("blind-choices-grid");
  if (!box) return;
  box.innerHTML = Object.keys(GRAPES)
    .map(
      (k) => `
      <button type="button" onclick="guessBlind('${k}')" class="btn-secondary-wine" style="padding:10px 8px;font-size:0.78rem;">
        ${getGrapeEmblemSVG(k, 16)} <span>${escapeHTML(GRAPES[k].name)}</span>
      </button>
    `
    )
    .join("");
}

function guessBlind(guessedKey) {
  vibrate(15);
  revealBlindStage("nose");
  revealBlindStage("palate");

  const target = GRAPES[blindTargetKey] || GRAPES.pinot;
  const guessed = GRAPES[guessedKey] || GRAPES.pinot;

  if (!blindAnswered) {
    blindTotal++;
    if (guessedKey === target.id) blindScore++;
    blindAnswered = true;
    document.getElementById("blind-score-badge").textContent = `${blindScore}/${blindTotal}`;
  }

  const fb = document.getElementById("blind-feedback-box");
  const title = document.getElementById("blind-feedback-title");
  const body = document.getElementById("blind-feedback-body");
  fb.style.display = "block";

  if (guessedKey === target.id) {
    fb.style.borderColor = "var(--emerald-ok)";
    title.style.color = "var(--emerald-ok)";
    title.textContent = `¡Exacto! En la copa hay ${target.name}`;
    body.textContent = `Marcador clave: ${target.compound}`;
  } else {
    fb.style.borderColor = "var(--gold-main)";
    title.style.color = "var(--gold-bright)";
    title.textContent = `Elegiste ${guessed.name}, pero es ${target.name}`;
    body.textContent = `Pista diferencial: ${target.blindSight} + ${target.compound}`;
  }
}

function registerPWA() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initState();
  renderEventoStage();
  renderCavaManager();
  renderCatalog();
  renderOracleQuestions();
  nextBlindRound();
  registerPWA();
});
