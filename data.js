/* ============================================================
   IESE Case Experience — Datos del caso y datos simulados
   ============================================================ */

const CASO = {
  id: "netflix-2007",
  titulo: "Netflix: reinventarse o morir",
  subtitulo: "Cómo decidir canibalizar tu propio negocio antes de que lo haga otro",
  empresa: "Netflix, Inc.",
  sector: "Entretenimiento · Tecnología",
  periodo: "2007 – 2013",
  dificultad: "Avanzado",
  duracion: "25–35 min",
  decisiones: 4,
  areas: ["Estrategia", "Innovación", "Marketing", "Gestión del cambio"],
  resumen:
    "En 2007 Netflix domina el alquiler de DVD por correo en EE. UU., pero su fundador sabe que el formato físico tiene fecha de caducidad. A lo largo de seis años tendrás que tomar las mismas decisiones a las que se enfrentó Reed Hastings: lanzar el streaming, salir al exterior, gestionar la mayor crisis de marca de la compañía y apostar —o no— 100 millones de dólares por el contenido original.",

  pasos: [
    /* ---------- BLOQUE 0 · Introducción ---------- */
    {
      tipo: "profesor",
      fase: "Introducción",
      titulo: "Bienvenida al caso",
      videoSrc: "media/P1_profesor_bienvenida_9x16.mp4",
      avatarOverlays: [
        { t: 4, dur: 3, dato: "Enero 2007", sub: "Punto de partida del caso" },
        { t: 8, dur: 3, dato: "6,3 M", sub: "Suscriptores de Netflix" },
        { t: 22, dur: 3, dato: "8.000", sub: "Tiendas de Blockbuster" },
        { t: 46, dur: 5, dato: "4 decisiones", sub: "Las tomarás tú" },
      ],
      texto:
        "Bienvenido. Soy tu profesor para este caso. Estamos en enero de 2007. Netflix tiene 6,3 millones de suscriptores que reciben DVD por correo en sobres rojos, y acaba de cerrar el mejor año de su historia. Blockbuster, con 8.000 tiendas, sigue siendo el gigante del sector… pero pierde dinero. Tú vas a ponerte en la piel de Reed Hastings, fundador y CEO de Netflix. A lo largo del caso te daré contexto, verás datos reales de la compañía y, en cuatro momentos clave, la decisión será tuya. No hay marcha atrás: igual que en la realidad, decidirás con la información disponible en ese momento. Tu razonamiento importa tanto como tu elección.",
    },
    {
      tipo: "video",
      fase: "Introducción",
      titulo: "Los orígenes de Netflix",
      videoSrc: "media/NETFLIX_R1_MASTER_V02.mp4",
      videoDe:
        "Recreación de los orígenes de Netflix (1997–2006): Reed Hastings devuelve tarde una copia de 'Apolo 13', paga 40 $ de multa y concibe un videoclub por correo con suscripción mensual y sin penalizaciones.",
      duracionVideo: "1:26",
      duracionSeg: 86,
      transcript: "Estamos en 1997, en Santa Cruz, California. Reed Hastings devuelve tarde una copia de Apolo Trece a un Blockbuster local. El cargo por demora: cuarenta dólares. De camino al gimnasio, una idea: ¿y si alquilar películas funcionara como una cuota mensual, sin fechas de devolución, sin penalizaciones? Junto a Marc Randolph, lanza Netflix punto com en abril de 1998. El modelo: catálogo de DVD por correo, suscripción plana, sin tiendas. Amazon les ofrece veintidós millones por la compañía. Lo rechazan. Para 2006, Netflix tiene seis coma tres millones de suscriptores y envía un millón seiscientos mil sobres rojos al día. Blockbuster tiene ocho mil tiendas y pierde dinero. La ventaja de Hastings es invisible: la banda ancha está cruzando el cincuenta por ciento de los hogares americanos. Y él ya está pensando en lo que viene después del DVD.",
      overlays: [
        { seg: 17, dur: 3, titulo: "La multa que lo cambió todo", dato: "40 $", subtexto: "Cargo por devolución tardía en Blockbuster · 1997" },
        { seg: 35, dur: 3, titulo: "Lanzamiento de Netflix.com", dato: "1998", subtexto: "Primer videoclub por correo del mundo" },
        { seg: 53, dur: 3, titulo: "Suscriptores en 2006", dato: "6,3 M", subtexto: "El mejor año de su historia hasta entonces" },
      ],
    },
    {
      tipo: "datos",
      fase: "Introducción",
      titulo: "La foto de salida (enero 2007)",
      intro:
        "Antes de decidir nada, estudia los números. Netflix crece rápido, pero el envío postal tiene costes crecientes y el DVD es un formato en su madurez.",
      bloques: [
        {
          tipo: "linea",
          titulo: "Suscriptores de Netflix (millones)",
          fuente: "Informes anuales Netflix 1999–2006",
          labels: ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006"],
          series: [{ nombre: "Suscriptores (M)", valores: [0.1, 0.29, 0.46, 0.86, 1.49, 2.61, 4.18, 6.3] }],
        },
        {
          tipo: "tabla",
          titulo: "Indicadores clave 2006",
          columnas: ["Indicador", "Netflix", "Blockbuster"],
          filas: [
            ["Ingresos anuales", "997 M$", "5.520 M$"],
            ["Resultado neto", "+49 M$", "−74 M$"],
            ["Tiendas físicas", "0", "≈ 8.000"],
            ["Coste de envío por DVD (ida y vuelta)", "0,78 $", "—"],
            ["Crecimiento de suscriptores (interanual)", "+51 %", "−2 % (alquileres en tienda)"],
          ],
        },
        {
          tipo: "barras",
          titulo: "Penetración de banda ancha en hogares de EE. UU. (%)",
          fuente: "Pew Research",
          labels: ["2003", "2004", "2005", "2006", "2007 (prev.)"],
          series: [{ nombre: "% hogares", valores: [20, 29, 37, 45, 53] }],
        },
      ],
    },

    /* ---------- DECISIÓN 1 · Streaming (2007) ---------- */
    {
      tipo: "profesor",
      fase: "Decisión 1 · Streaming",
      titulo: "El dilema del innovador",
      texto:
        "Tu equipo de ingeniería lleva años trabajando en la entrega de vídeo por internet. La tecnología por fin es viable: la banda ancha supera el 50 % de los hogares. Pero hay un problema: cada dólar que inviertas en streaming es un dólar que no inviertes en el negocio de DVD, que es el que paga las nóminas. Y peor aún: si el streaming funciona, matará a tu propio negocio principal. Es el dilema del innovador en estado puro. Tienes 40 millones de dólares presupuestados para este proyecto. ¿Qué haces?",
    },
    {
      tipo: "decision",
      fase: "Decisión 1 · Streaming",
      momento: 1,
      anio: "Enero 2007",
      titulo: "¿Lanzamos el streaming?",
      contexto:
        "Eres Reed Hastings. El consejo espera tu propuesta sobre los 40 M$ destinados al proyecto de vídeo por internet.",
      opciones: [
        {
          id: "A",
          titulo: "Lanzar el streaming ya, incluido gratis en la suscripción de DVD",
          desc: "Canibalizar el propio negocio de forma deliberada. Todo suscriptor de DVD obtiene horas de streaming sin coste adicional. Catálogo inicial pequeño (≈1.000 títulos frente a 70.000 en DVD).",
          riesgo: "Alto",
          calidad: 92,
          esReal: true,
          competencias: { vision: 95, riesgo: 85, datos: 70, cliente: 90 },
        },
        {
          id: "B",
          titulo: "Esperar 2–3 años y reforzar el liderazgo en DVD",
          desc: "El catálogo en streaming es aún pobre y los estudios no quieren licenciar. Consolidar el negocio rentable y entrar cuando la tecnología y los derechos maduren.",
          riesgo: "Bajo",
          calidad: 35,
          esReal: false,
          competencias: { vision: 25, riesgo: 30, datos: 60, cliente: 40 },
        },
        {
          id: "C",
          titulo: "Lanzar el streaming como servicio premium separado de pago",
          desc: "Proteger los márgenes: el streaming se cobra aparte (4,99 $/mes adicionales). Quien lo quiera, que lo pague. Sin canibalización del DVD.",
          riesgo: "Medio",
          calidad: 55,
          esReal: false,
          competencias: { vision: 55, riesgo: 50, datos: 65, cliente: 35 },
        },
      ],
    },
    {
      tipo: "real",
      fase: "Decisión 1 · Streaming",
      titulo: "Lo que hizo Netflix",
      opcionReal: "A",
      texto:
        "En enero de 2007 Netflix lanzó «Watch Instantly»: streaming incluido gratis para todos los suscriptores de DVD, con solo 1.000 títulos. Hastings asumió la canibalización como estrategia: «Mejor que nos lo hagamos nosotros mismos a que nos lo haga otro». El streaming pasó de curiosidad a motor del negocio en cuatro años, mientras Blockbuster —que no movió ficha— quebró en 2010.",
      videoDe:
        "Recreación de la rueda de prensa de enero de 2007: Reed Hastings presenta 'Watch Instantly' ante analistas escépticos que preguntan por qué regala el streaming.",
      duracionVideo: "1:50",
      duracionSeg: 110,
      transcript: "Enero de 2007. Reed Hastings sube al escenario ante analistas e inversores. El anuncio no es lo que esperaban: Netflix va a regalar el streaming. Cada suscriptor del plan de DVD obtiene acceso a Watch Instantly, mil títulos disponibles en el navegador, sin coste adicional. Los analistas preguntan: ¿por qué regalar un servicio que podría cobrar? Hastings responde: porque si no lo hacemos nosotros, lo hará otro. Es la aplicación deliberada del dilema del innovador. El streaming empieza como función secundaria. En cuatro años superará al DVD como canal principal de consumo. Blockbuster no mueve ficha. En 2010 declara bancarrota con ocho mil tiendas.",
      overlays: [
        { seg: 22, titulo: "Catálogo inicial", dato: "1.000", subtexto: "Títulos en streaming el día del lanzamiento frente a 70.000 en DVD" },
        { seg: 78, titulo: "Blockbuster (2010)", dato: "Quiebra", subtexto: "8.000 tiendas · No respondió a la amenaza del streaming" },
      ],
      impacto: {
        tipo: "barras",
        titulo: "Suscriptores tras el lanzamiento (millones)",
        labels: ["2007", "2008", "2009", "2010"],
        series: [{ nombre: "Suscriptores (M)", valores: [7.5, 9.4, 12.3, 20.0] }],
      },
    },

    /* ---------- DECISIÓN 2 · Internacional (2010) ---------- */
    {
      tipo: "profesor",
      fase: "Decisión 2 · Internacional",
      titulo: "Crecer fuera de casa",
      texto:
        "Saltamos a verano de 2010. El streaming despega: ya supone más de la mitad del consumo de tus clientes. Blockbuster acaba de declararse en quiebra. Pero aparecen nuevos rivales: Hulu, Amazon, y los propios estudios. Tu consejo plantea la expansión internacional. La pregunta no es solo dónde, sino cómo: ¿replicas el modelo completo de DVD + streaming, o apuestas por un modelo solo-streaming que nunca has probado?",
    },
    {
      tipo: "datos",
      fase: "Decisión 2 · Internacional",
      titulo: "El negocio en 2010",
      intro:
        "Observa el cambio de mezcla: el streaming crece, pero el DVD sigue generando la mayor parte del margen. Replicar la logística postal fuera de EE. UU. costaría años y cientos de millones.",
      bloques: [
        {
          tipo: "barras2",
          titulo: "Horas de consumo por canal (% del total)",
          fuente: "Netflix Q2 2010",
          labels: ["2008", "2009", "2010"],
          series: [
            { nombre: "DVD por correo", valores: [85, 65, 45] },
            { nombre: "Streaming", valores: [15, 35, 55] },
          ],
        },
        {
          tipo: "tabla",
          titulo: "Coste estimado de entrada por mercado (Canadá)",
          columnas: ["Modelo", "Inversión inicial", "Tiempo de lanzamiento", "Riesgo operativo"],
          filas: [
            ["DVD + streaming (modelo completo)", "120–180 M$", "18–24 meses", "Alto (logística postal nueva)"],
            ["Solo streaming", "25–40 M$", "4–6 meses", "Medio (derechos de contenido)"],
            ["No expandirse aún", "0 $", "—", "Competidores ocupan el espacio"],
          ],
        },
        {
          tipo: "linea",
          titulo: "Coste anual de licencias de contenido (M$)",
          fuente: "Netflix 10-K",
          labels: ["2008", "2009", "2010 (est.)"],
          series: [{ nombre: "Licencias (M$)", valores: [48, 64, 180] }],
        },
      ],
    },
    {
      tipo: "decision",
      fase: "Decisión 2 · Internacional",
      momento: 2,
      anio: "Julio 2010",
      titulo: "¿Cómo salimos al exterior?",
      contexto:
        "Canadá es el mercado candidato: cercano, angloparlante y con buena banda ancha. El consejo vota tu propuesta la próxima semana.",
      opciones: [
        {
          id: "A",
          titulo: "Lanzar en Canadá solo streaming",
          desc: "Primer mercado 100 % streaming de la historia de la compañía. Barato y rápido, pero sin el catálogo enorme del DVD: la propuesta de valor depende de los derechos que consigas.",
          riesgo: "Medio",
          calidad: 90,
          esReal: true,
          competencias: { vision: 90, riesgo: 75, datos: 85, cliente: 70 },
        },
        {
          id: "B",
          titulo: "Replicar el modelo completo DVD + streaming",
          desc: "Llevar a Canadá la propuesta de valor probada. Inversión de 120–180 M$ y 18–24 meses para montar la logística postal.",
          riesgo: "Alto",
          calidad: 40,
          esReal: false,
          competencias: { vision: 35, riesgo: 40, datos: 45, cliente: 65 },
        },
        {
          id: "C",
          titulo: "Aplazar la expansión y defender EE. UU.",
          desc: "Hulu y Amazon aprietan en casa. Concentrar recursos en contenido y producto para el mercado doméstico y revisar la expansión en 2012.",
          riesgo: "Bajo",
          calidad: 50,
          esReal: false,
          competencias: { vision: 40, riesgo: 35, datos: 60, cliente: 55 },
        },
      ],
    },
    {
      tipo: "real",
      fase: "Decisión 2 · Internacional",
      titulo: "Lo que hizo Netflix",
      opcionReal: "A",
      texto:
        "En septiembre de 2010 Netflix lanzó en Canadá su primer servicio solo-streaming, a 7,99 $/mes. Fue el laboratorio de su futuro: validó que el negocio funcionaba sin DVD y se convirtió en la plantilla de la expansión a Latinoamérica (2011), Europa (2012) y, finalmente, los 190 países actuales.",
      videoDe:
        "Recreación del lanzamiento en Toronto, septiembre de 2010: el equipo celebra el primer mercado sin sobres rojos mientras monitoriza en directo las primeras altas.",
      duracionVideo: "1:35",
      duracionSeg: 95,
      transcript: "Septiembre de 2010, Toronto. Netflix abre su primer mercado internacional: Canadá. Sin sobres rojos. Sin logística postal. Solo streaming, a siete noventa y nueve al mes. El catálogo es limitado: los derechos internacionales están fragmentados por territorio. Pero el experimento funciona: valida que la propuesta de valor sobrevive sin el DVD. En la sede central de Los Gatos, el equipo monitoriza en directo las primeras altas. El servidor aguanta. El modelo es exportable. Este lanzamiento es la plantilla que se replicará en cuarenta y cuatro países latinoamericanos en 2011, y en Europa en 2012. El modelo que tardó quince años en construirse en Estados Unidos se despliega globalmente en tres años.",
      overlays: [
        { seg: 20, titulo: "1er mercado internacional", dato: "7,99 $/mes", subtexto: "Solo streaming · Septiembre 2010 · Toronto" },
        { seg: 72, titulo: "Expansión global", dato: "190 países", subtexto: "Destino final del modelo iniciado en Canadá" },
      ],
      impacto: {
        tipo: "barras",
        titulo: "Países con servicio Netflix",
        labels: ["2009", "2010", "2011", "2012"],
        series: [{ nombre: "Países", valores: [1, 2, 45, 51] }],
      },
    },

    /* ---------- DECISIÓN 3 · Crisis Qwikster (2011) ---------- */
    {
      tipo: "profesor",
      fase: "Decisión 3 · La crisis",
      titulo: "El verano más difícil",
      texto:
        "Julio de 2011. Acabas de anunciar una reestructuración de precios: separar el plan combinado de 9,99 $ en dos planes de 7,99 $ cada uno. Para quien quiera DVD y streaming, es una subida del 60 %. La reacción es brutal: miles de cancelaciones diarias, 82.000 comentarios negativos en el blog corporativo, la acción cae en picado y los medios hablan del «mayor error de marketing del año». Tu equipo te presenta tres caminos. Lo que decidas en las próximas semanas definirá la marca durante años. Y un aviso: esta vez, lo que hizo Netflix en la realidad no es necesariamente la mejor respuesta.",
    },
    {
      tipo: "datos",
      fase: "Decisión 3 · La crisis",
      titulo: "La hemorragia, en datos",
      intro:
        "Estos son los datos sobre tu mesa en septiembre de 2011. La pregunta de fondo: ¿es una crisis de precio, de marca o de comunicación?",
      bloques: [
        {
          tipo: "linea",
          titulo: "Cotización de Netflix (US$, cierre mensual 2011)",
          fuente: "NASDAQ: NFLX",
          labels: ["Jun", "Jul", "Ago", "Sep", "Oct"],
          series: [{ nombre: "US$", valores: [263, 281, 233, 169, 84] }],
        },
        {
          tipo: "barras",
          titulo: "Cancelaciones netas estimadas (miles de suscriptores)",
          fuente: "Netflix Q3 2011",
          labels: ["Jul", "Ago", "Sep"],
          series: [{ nombre: "Bajas netas (miles)", valores: [120, 280, 400] }],
        },
        {
          tipo: "tabla",
          titulo: "Diagnóstico: motivos declarados de cancelación",
          columnas: ["Motivo declarado", "% de menciones"],
          filas: [
            ["«La subida de precio es abusiva»", "47 %"],
            ["«No me siento respetado como cliente»", "31 %"],
            ["«Ya no uso el DVD, solo quería streaming»", "14 %"],
            ["Otros", "8 %"],
          ],
        },
      ],
    },
    {
      tipo: "decision",
      fase: "Decisión 3 · La crisis",
      momento: 3,
      anio: "Septiembre 2011",
      titulo: "¿Cómo gestionas la crisis?",
      contexto:
        "La subida de precios ya está hecha y revertirla del todo costaría ≈200 M$ anuales de ingresos. El consejo te pide una respuesta estructural, no solo comunicación.",
      opciones: [
        {
          id: "A",
          titulo: "Separar el DVD en una empresa nueva: «Qwikster»",
          desc: "Acelerar la transición: Netflix queda solo como streaming y el DVD pasa a una marca nueva con web, facturación y colas de películas independientes. Claridad estratégica total.",
          riesgo: "Alto",
          calidad: 25,
          esReal: true,
          competencias: { vision: 60, riesgo: 25, datos: 25, cliente: 10 },
        },
        {
          id: "B",
          titulo: "Mantener la marca única, disculparse y compensar",
          desc: "Asumir el error de comunicación: carta pública del CEO, mantener los nuevos precios pero ofrecer 2–3 meses de descuento a los clientes afectados y simplificar la migración entre planes.",
          riesgo: "Medio",
          calidad: 88,
          esReal: false,
          competencias: { vision: 75, riesgo: 70, datos: 80, cliente: 95 },
        },
        {
          id: "C",
          titulo: "Revertir la subida de precios por completo",
          desc: "Volver al plan combinado de 9,99 $. Detiene la sangría a corto plazo, pero renuncia a ≈200 M$/año que necesitas para comprar contenido y financiar la guerra contra Amazon y HBO.",
          riesgo: "Medio",
          calidad: 45,
          esReal: false,
          competencias: { vision: 30, riesgo: 45, datos: 50, cliente: 75 },
        },
      ],
    },
    {
      tipo: "real",
      fase: "Decisión 3 · La crisis",
      titulo: "Lo que hizo Netflix (y por qué salió mal)",
      opcionReal: "A",
      texto:
        "Hastings anunció Qwikster en un vídeo casero grabado un domingo. La reacción fue aún peor: los clientes tendrían dos webs, dos facturas y dos colas. Hasta la cuenta de Twitter @Qwikster pertenecía a otra persona. Tres semanas después, Netflix enterró Qwikster sin haberlo llegado a lanzar. Coste total: 800.000 suscriptores perdidos y un desplome del 77 % en bolsa. La lección: una decisión estratégicamente coherente puede ser un desastre si ignora al cliente.",
      videoDe:
        "Recreación del vídeo de disculpa de Reed Hastings (septiembre 2011) y del comunicado de tres semanas después cancelando Qwikster.",
      duracionVideo: "2:10",
      duracionSeg: 130,
      transcript: "Septiembre de 2011. Reed Hastings publica un vídeo casero desde una silla de jardín. Se disculpa por la subida de precios. Y anuncia algo más: el negocio de DVD pasará a llamarse Qwikster, una empresa completamente separada. Sitio web distinto. Facturas distintas. Colas de películas distintas. La reacción es inmediata y brutal. Los clientes que ya se sentían maltratados ahora descubren que tendrán que gestionar dos cuentas. Para colmo, la cuenta de Twitter arroba Qwikster pertenece a otra persona. Tres semanas después, Netflix entierra Qwikster sin haberlo llegado a lanzar. El coste total: ochocientos mil suscriptores perdidos y una caída del setenta y siete por ciento en bolsa. La lección: la coherencia estratégica no basta si la ejecución ignora al cliente.",
      overlays: [
        { seg: 35, titulo: "Reacción del mercado", dato: "−77 %", subtexto: "Caída de la acción NFLX entre julio y octubre de 2011" },
        { seg: 98, titulo: "Qwikster: duración total", dato: "3 semanas", subtexto: "Anunciado y cancelado sin llegar a lanzarse" },
      ],
      impacto: {
        tipo: "linea",
        titulo: "Suscriptores EE. UU. (millones, 2011)",
        labels: ["Q1", "Q2", "Q3", "Q4"],
        series: [{ nombre: "Suscriptores (M)", valores: [23.6, 24.6, 23.8, 24.4] }],
      },
    },

    /* ---------- DECISIÓN 4 · Contenido original (2011-2013) ---------- */
    {
      tipo: "profesor",
      fase: "Decisión 4 · Contenido original",
      titulo: "La apuesta de los 100 millones",
      texto:
        "Marzo de 2011, unos meses antes de la crisis, llegó a tu mesa una oportunidad que ahora, a finales de año, sigue viva: los derechos de una serie política llamada «House of Cards», con David Fincher como director y Kevin Spacey como protagonista. El problema: HBO y AMC también la quieren, y la productora exige un compromiso sin precedentes: dos temporadas completas pagadas por adelantado, unos 100 millones de dólares, sin rodar siquiera un episodio piloto. Acabas de perder 800.000 clientes y la acción está en mínimos. Tu director financiero está en contra. ¿Qué decides?",
    },
    {
      tipo: "datos",
      fase: "Decisión 4 · Contenido original",
      titulo: "Los números de la apuesta",
      intro:
        "Tu ventaja oculta: los datos. Sabes que la 'House of Cards' británica original, las películas de Fincher y las de Spacey tienen audiencias muy solapadas entre tus suscriptores. Nadie más tiene esa información.",
      bloques: [
        {
          tipo: "tabla",
          titulo: "La oferta sobre la mesa",
          columnas: ["Condición", "Modelo tradicional (cadenas)", "Lo que exige la productora"],
          filas: [
            ["Episodio piloto previo", "Sí, siempre", "No — compromiso directo"],
            ["Compromiso", "1 temporada (si el piloto funciona)", "2 temporadas (26 episodios)"],
            ["Inversión", "≈ 4–6 M$ (piloto)", "≈ 100 M$ por adelantado"],
            ["% de pilotos que llegan a serie", "≈ 25 %", "—"],
            ["% de series renovadas tras la 1ª temporada", "≈ 35 %", "—"],
          ],
        },
        {
          tipo: "barras",
          titulo: "Solapamiento de audiencias en la base de datos de Netflix (%)",
          fuente: "Analítica interna Netflix (estimación caso)",
          labels: ["Ven 'HoC' BBC", "Ven cine Fincher", "Ven cine Spacey", "Solapan 2 de 3", "Solapan 3 de 3"],
          series: [{ nombre: "% suscriptores", valores: [11, 32, 28, 18, 7] }],
        },
        {
          tipo: "linea",
          titulo: "Coste anual de licencias de terceros (M$)",
          fuente: "Netflix 10-K",
          labels: ["2009", "2010", "2011", "2012 (est.)"],
          series: [{ nombre: "Licencias (M$)", valores: [64, 180, 612, 1300] }],
        },
      ],
    },
    {
      tipo: "decision",
      fase: "Decisión 4 · Contenido original",
      momento: 4,
      anio: "Diciembre 2011",
      titulo: "¿Apostamos por el contenido original?",
      contexto:
        "Es la última gran decisión del caso. La compañía está debilitada por la crisis de Qwikster, pero los datos internos cuentan una historia que solo tú puedes ver.",
      opciones: [
        {
          id: "A",
          titulo: "Comprometer los 100 M$: dos temporadas sin piloto",
          desc: "Ganar la puja a HBO y AMC. Estrenar toda la temporada de golpe y usar los datos de audiencia como ventaja. Si falla, la crisis financiera se agrava seriamente.",
          riesgo: "Muy alto",
          calidad: 90,
          esReal: true,
          competencias: { vision: 95, riesgo: 90, datos: 95, cliente: 80 },
        },
        {
          id: "B",
          titulo: "Ofrecer financiar solo un piloto + opción preferente",
          desc: "Contraoferta conservadora al modelo de la industria. Riesgo mínimo, pero la productora ya ha dicho que con ese modelo se irá con HBO.",
          riesgo: "Bajo",
          calidad: 40,
          esReal: false,
          competencias: { vision: 35, riesgo: 30, datos: 50, cliente: 45 },
        },
        {
          id: "C",
          titulo: "No entrar en producción: reforzar licencias de catálogo",
          desc: "Producir no es tu negocio. Destinar los 100 M$ a renovar acuerdos de licencias (Starz, Epix, Disney) que el cliente ya valora hoy.",
          riesgo: "Medio",
          calidad: 35,
          esReal: false,
          competencias: { vision: 20, riesgo: 40, datos: 40, cliente: 60 },
        },
      ],
    },
    {
      tipo: "real",
      fase: "Decisión 4 · Contenido original",
      titulo: "Lo que hizo Netflix",
      opcionReal: "A",
      texto:
        "Netflix ganó la puja con el compromiso de 100 M$ y dos temporadas sin piloto. «House of Cards» se estrenó el 1 de febrero de 2013 con los 13 episodios a la vez, inventando el 'binge-watching' como estrategia de producto. Ganó 3 Emmy, disparó las altas y abrió la era del contenido original: hoy Netflix invierte más de 17.000 M$ al año en producción propia.",
      videoDe:
        "Recreación de la negociación final con Media Rights Capital y montaje del estreno mundial de 'House of Cards' (1 de febrero de 2013).",
      duracionVideo: "2:30",
      duracionSeg: 150,
      transcript: "Febrero de 2013. Netflix estrena los trece episodios de House of Cards de golpe, en una sola noche. Con David Fincher en la dirección y Kevin Spacey en el papel protagonista, la apuesta de cien millones de dólares está por fin en pantalla. La prensa predice fracaso: nadie ha apostado tanto sin episodio piloto. La audiencia responde diferente. En cuarenta y ocho horas, el maratón de visionado se convierte en fenómeno global. Netflix acuña el término binge-watching. Gana tres Emmy. Las altas de nuevos suscriptores baten récords trimestrales. La ventaja que nadie más tenía: los datos de audiencia que demostraban el solapamiento entre los fans de Fincher, de Spacey y de la versión británica de la serie. Una apuesta ciega para todos. Una apuesta informada para Netflix.",
      overlays: [
        { seg: 45, titulo: "Inversión comprometida", dato: "100 M$", subtexto: "Dos temporadas sin rodar un solo episodio piloto" },
        { seg: 112, titulo: "Estreno global", dato: "1 feb 2013", subtexto: "13 episodios disponibles simultáneamente · Nace el binge-watching" },
      ],
      impacto: {
        tipo: "linea",
        titulo: "Suscriptores globales (millones)",
        labels: ["2011", "2012", "2013", "2014", "2015"],
        series: [{ nombre: "Suscriptores (M)", valores: [26, 33, 44, 57, 75] }],
      },
    },

    /* ---------- Cierre ---------- */
    {
      tipo: "profesor",
      fase: "Cierre",
      titulo: "Cierre del caso",
      texto:
        "Hemos terminado. Has tomado las cuatro decisiones que definieron la transformación de Netflix entre 2007 y 2013: canibalizar el negocio propio, elegir el modelo de expansión, gestionar una crisis de marca y apostar por el contenido original. Fíjate en algo importante: imitar a la empresa real no siempre era la respuesta correcta — Qwikster lo demuestra. Lo que evaluamos no es si aciertas la historia, sino la calidad de tu razonamiento con la información disponible. A continuación verás tu árbol de decisiones comparado con el camino real y tu informe de desempeño, que tu profesor también recibirá en su panel.",
    },
  ],
};

/* ============================================================
   Alumnos simulados para el panel del profesor
   ============================================================ */

const ALUMNOS_DEMO = [
  {
    id: "a1",
    nombre: "Lucía Fernández",
    programa: "MBA · Sección B",
    estado: "completado",
    fecha: "10 jun 2026, 09:42",
    decisiones: [
      { opcion: "A", tiempoSeg: 312, vistasDatos: 3, confianza: 78, razonamiento: "La banda ancha cruza el 50% de hogares y el coste postal crece con el volumen: el DVD tiene techo estructural. Prefiero canibalizar con control que perder el mercado frente a un entrante. Incluirlo gratis reduce la fricción de adopción y me da datos de consumo desde el día uno." },
      { opcion: "A", tiempoSeg: 268, vistasDatos: 2, confianza: 75, razonamiento: "El modelo solo-streaming es 4 veces más barato y 4 veces más rápido de desplegar. Canadá funciona como experimento controlado: si la propuesta de valor sin DVD no sostiene el churn, lo aprendo gastando 30M$ y no 150M$." },
      { opcion: "B", tiempoSeg: 421, vistasDatos: 4, confianza: 82, razonamiento: "El diagnóstico de la encuesta es claro: 78% de las bajas son de percepción (precio abusivo + falta de respeto), no de producto. Es una crisis de confianza, no de estrategia. Separar marcas ahora añade fricción al cliente justo cuando se siente maltratado. Disculpa del CEO + compensación temporal protege los 200M$ de ingresos sin romper la relación." },
      { opcion: "A", tiempoSeg: 387, vistasDatos: 3, confianza: 80, razonamiento: "El dato de solapamiento de audiencias convierte una apuesta ciega en una apuesta informada: 18% solapan 2 de 3 afinidades. Además, el coste de licencias se duplica cada año: no producir también es caro. El riesgo financiero es alto pero el riesgo de no diferenciarse es mayor." },
    ],
  },
  {
    id: "a2",
    nombre: "Marc Vidal",
    programa: "MBA · Sección B",
    estado: "completado",
    fecha: "10 jun 2026, 10:15",
    decisiones: [
      { opcion: "A", tiempoSeg: 95, vistasDatos: 1, confianza: 90, razonamiento: "Si no lo hacemos nosotros lo hará otro. Hay que moverse rápido." },
      { opcion: "A", tiempoSeg: 88, vistasDatos: 1, confianza: 92, razonamiento: "Streaming es el futuro, el DVD no merece más inversión fuera de EE.UU." },
      { opcion: "A", tiempoSeg: 121, vistasDatos: 1, confianza: 95, razonamiento: "Mejor cortar por lo sano y separar los dos negocios, así cada uno va a su ritmo." },
      { opcion: "A", tiempoSeg: 102, vistasDatos: 1, confianza: 88, razonamiento: "Hay que diferenciarse con contenido propio, los 100M se recuperan con las altas." },
    ],
  },
  {
    id: "a3",
    nombre: "Sofia Marini",
    programa: "MBA · Sección B",
    estado: "completado",
    fecha: "10 jun 2026, 11:03",
    decisiones: [
      { opcion: "C", tiempoSeg: 356, vistasDatos: 4, confianza: 50, razonamiento: "El catálogo inicial de 1.000 títulos puede dañar la percepción de la marca si se regala. Como premium opcional, los early adopters lo financian y el catálogo madura antes del despliegue masivo." },
      { opcion: "A", tiempoSeg: 298, vistasDatos: 3, confianza: 62, razonamiento: "La tabla de costes es concluyente: 30M$ frente a 150M$ y 6 meses frente a 24. El riesgo de derechos de contenido existe pero es acotable mercado a mercado." },
      { opcion: "B", tiempoSeg: 334, vistasDatos: 4, confianza: 58, razonamiento: "Los datos de la encuesta apuntan a comunicación, no a estructura. Mantener marca única y compensar. Qwikster duplicaría la fricción operativa para el cliente." },
      { opcion: "B", tiempoSeg: 412, vistasDatos: 4, confianza: 45, razonamiento: "Con la caja debilitada tras la crisis, comprometer 100M$ sin piloto es una apuesta existencial. La contraoferta de piloto + opción preferente mantiene la puerta abierta limitando la pérdida máxima. Acepto perder la puja si el precio es la supervivencia." },
    ],
  },
  {
    id: "a4",
    nombre: "Andrés Rocha",
    programa: "MBA · Sección B",
    estado: "completado",
    fecha: "11 jun 2026, 16:40",
    decisiones: [
      { opcion: "B", tiempoSeg: 198, vistasDatos: 2, confianza: 70, razonamiento: "El negocio DVD crece al 51% y es rentable. No veo motivo para arriesgar el flujo de caja en una tecnología inmadura con 1.000 títulos." },
      { opcion: "C", tiempoSeg: 176, vistasDatos: 2, confianza: 72, razonamiento: "Con Hulu y Amazon presionando en casa, expandirse es dispersar fuerzas. Primero asegurar el mercado doméstico." },
      { opcion: "C", tiempoSeg: 243, vistasDatos: 3, confianza: 68, razonamiento: "La prioridad es frenar las cancelaciones ya. Revertir precios duele en ingresos pero recupera la confianza, y se puede volver a subir más adelante de forma gradual." },
      { opcion: "C", tiempoSeg: 187, vistasDatos: 2, confianza: 75, razonamiento: "Producir no es nuestra competencia. Las licencias son contenido probado que el cliente ya pide." },
    ],
  },
  {
    id: "a5",
    nombre: "Chen Wei",
    programa: "MBA · Sección B",
    estado: "completado",
    fecha: "11 jun 2026, 17:22",
    decisiones: [
      { opcion: "A", tiempoSeg: 245, vistasDatos: 2, confianza: 72, razonamiento: "La penetración de banda ancha marca el punto de inflexión tecnológico. Regalarlo acelera la curva de aprendizaje del consumidor y levanta una barrera de datos frente a futuros entrantes." },
      { opcion: "B", tiempoSeg: 312, vistasDatos: 3, confianza: 55, razonamiento: "El cliente canadiense espera la propuesta completa que hizo famosa a Netflix. Entrar con un catálogo de streaming limitado puede quemar el mercado. Prefiero invertir más y entrar con la oferta probada." },
      { opcion: "B", tiempoSeg: 289, vistasDatos: 3, confianza: 70, razonamiento: "El 31% que se siente 'no respetado' es la señal clave: es un problema de relación. CEO da la cara, compensación a afectados, y mantener la estructura de precios que financia el contenido." },
      { opcion: "A", tiempoSeg: 334, vistasDatos: 3, confianza: 80, razonamiento: "La ventaja informacional es decisiva: ningún competidor puede valorar este activo con nuestros datos de audiencia. Pagar 100M$ por una opción que para HBO vale a ciegas es comprar con ventaja." },
    ],
  },
];

/* Textos de análisis IA pregenerados por alumno (panel profesor) */
const ANALISIS_IA = {
  a1: "Perfil analítico-estratégico de alto rendimiento. Lucía fundamenta cada decisión en los datos disponibles (cita cifras concretas en 4 de 4 razonamientos) y demuestra pensamiento contrafactual: en la Decisión 3 identificó correctamente que la opción real (Qwikster) era subóptima, separando «coherencia estratégica» de «ejecución centrada en el cliente». Sus tiempos de decisión (4–7 min) reflejan deliberación sin parálisis. Área de desarrollo: explicitar planes de contingencia en las apuestas de alto riesgo (Decisiones 1 y 4).",
  a2: "Perfil intuitivo-acelerado. Marc decide entre 4 y 8 veces más rápido que la media de la clase y coincide con la decisión real en los 4 momentos — pero sus razonamientos son superficiales (media de 14 palabras) y solo consultó 1 pantalla de datos por decisión. El acierto en la Decisión 3 (Qwikster) es paradójico: eligió la opción real, que fue un error empresarial, sin detectar sus riesgos. Recomendación: trabajar la disciplina analítica; en clase, pedirle que defienda la decisión 3 ante el grupo.",
  a3: "Perfil analítico-prudente con excelente lectura de datos. Sofia consultó el máximo de pantallas y sus razonamientos muestran estructura coste-beneficio explícita. Discrepó de la decisión real en los momentos 1 y 4 con argumentos defendibles, lo que la convierte en un contrapunto valioso para la discusión en aula. Área de desarrollo: valorar el coste de oportunidad de no actuar — su aversión a la apuesta de contenido original ignoraba la inflación del coste de licencias que ella misma había consultado.",
  a4: "Perfil conservador-defensivo. Andrés priorizó sistemáticamente la protección del negocio actual frente a la creación del futuro (0 de 4 coincidencias con la decisión real, calidad estratégica media 44/100). Sus razonamientos son coherentes internamente pero anclados en el presente. Caso de estudio ideal para discutir el «dilema del innovador» en aula. Recomendación: ejercicios de proyección de escenarios a 5 años.",
  a5: "Perfil equilibrado con criterio propio. Chen combina lectura de datos con juicio cualitativo y discrepa de la decisión real cuando tiene argumentos (Decisión 2: protección de la experiencia de cliente). Su razonamiento en la Decisión 4 («comprar con ventaja informacional») demuestra comprensión sofisticada del valor estratégico de los datos. Área de desarrollo: cuantificar más sus argumentos cualitativos.",
};
