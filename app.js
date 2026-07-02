/* ============================================================
   IESE Case Experience — Motor de la aplicación v2
   ============================================================ */
"use strict";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function fmtTime(seg) {
  seg = Math.max(0, Math.round(seg));
  return `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
}
function fmtMin(seg) {
  const m = seg / 60;
  return m >= 10 ? `${Math.round(m)} min` : `${m.toFixed(1).replace(".", ",")} min`;
}
function palabras(txt) { return (txt || "").trim().split(/\s+/).filter(Boolean).length; }
function iniciales(nombre) { return nombre.split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase(); }

let C_ACTIVE = CASO;
let DECISION_STEPS = C_ACTIVE.pasos.filter(p => p.tipo === "decision");
let FASES = [...new Set(C_ACTIVE.pasos.map(p => p.fase))];

/* ============================================================
   Diccionario de Traducción (Bilingüe ES/EN)
   ============================================================ */
const TXT = {
  es: {
    kicker: "IESE Case Experience · Plataforma de simulación",
    heroTitle: "Los <span class=\"hl\">casos</span> ya no se leen.<br/>Se viven.",
    heroSub: "Experiencias interactivas de toma de decisiones sobre casos reales de empresa, con narración por avatar IA, recreaciones cinematográficas, datos en cada momento clave y evaluación detallada del desempeño del alumno.",
    studentTitle: "Soy alumno",
    studentDesc: "Vive el caso en primera persona: recibe el contexto, analiza los datos reales y toma las decisiones que marcaron la historia de la empresa.",
    studentCta: "Entrar como alumno",
    profTitle: "Soy profesor",
    profDesc: "Evalúa el desempeño de tu clase: árboles de decisión, tiempos, razonamientos escritos y análisis de competencias generado por IA.",
    profCta: "Entrar como profesor",
    stat1Num: "1:1",
    stat1Title: "Experiencia personalizada para cada alumno, a su ritmo",
    stat2Num: "100%",
    stat2Title: "De las decisiones trazadas: opción, tiempo, datos consultados y razonamiento",
    stat3Num: "Casos reales",
    stat3Title: "Decisiones documentadas de empresas reales, con datos verificados",
    demoNote: "<b>Modo demo</b> · Todos los datos son simulados. Los vídeos se muestran como marcadores de posición con transcripción y timeline interactivo.",
    exit: "Salir",
    studentBadge: "Alumno",
    profBadge: "Profesor",
    // QR Code Widget
    qrFloatText: "Probar en móvil",
    qrModalTitle: "Pruébalo en tu móvil",
    qrModalSubtitle: "Escanea para abrir la simulación en tu dispositivo",
    qrModalInstructions: "Abre la cámara de tu smartphone y enfoca el código QR para continuar la experiencia en tu móvil.",
    qrCopyBtn: "Copiar enlace",
    qrCopied: "¡Copiado!",
    // Student Home
    crumbsHome: "Inicio &nbsp;|&nbsp; <b>Mis casos</b>",
    assignedCases: "Mis casos asignados",
    welcomeTitle: "Hola, bienvenido de nuevo",
    welcomeSub: "Tu profesor te ha asignado un nuevo caso. Recuerda: no hay respuestas correctas escritas de antemano — se evalúa la calidad de tu razonamiento con la información disponible en cada momento.",
    caseNewTag: "Nuevo · Asignado",
    caseStartBtn: "Comenzar el caso",
    caseSoonTag: "Próximamente",
    caseZaraTitle: "Zara: la velocidad como estrategia",
    caseZaraDesc: "Cómo un fabricante gallego reinventó la cadena de suministro de la moda y decidió no hacer publicidad cuando todos la hacían.",
    caseLegoTitle: "LEGO: reconstruir un imperio",
    caseLegoDesc: "De estar a meses de la quiebra a ser la juguetera más valiosa del mundo: las decisiones de la mayor remontada de la historia empresarial reciente.",
    // Player UI
    caseInProgress: "Caso en curso",
    progressCompleted: "completado",
    progressStep: "Paso",
    progressOf: "de",
    sessionTime: "Tiempo de sesión",
    btnContinue: "Continuar",
    btnAnalyzed: "He analizado los datos",
    btnConfirm: "Confirmar decisión",
    decisionTitle: "La decisión es tuya",
    decisionTimer: "Tiempo en esta decisión",
    reasonLabel: "Tu razonamiento",
    reasonRequired: "(obligatorio — el profesor lo leerá)",
    reasonPlaceholder: "¿Por qué eliges esta opción? Apóyate en los datos que has visto: ¿qué riesgos asumes y qué esperas conseguir?",
    reasonHintEmpty: "Selecciona una opción y escribe al menos 15 palabras.",
    reasonHintSelected: (opt, words) => `Opción ${opt} seleccionada · ${words}/15 palabras escritas.`,
    reasonHintReady: (opt, words) => `Opción ${opt} · razonamiento listo (${words} palabras). Esta decisión no se puede deshacer.`,
    confidenceLabel: "¿Cómo de seguro estás de esta decisión?",
    confidenceScaleLow: "Nada seguro",
    confidenceScaleHigh: "Totalmente seguro",
    confidenceHint: "Tu nivel de seguridad se compara con la calidad real de la decisión: el profesor verá tu <b>calibración</b>.",
    realBanner: "Lo que ocurrió en la realidad",
    realMatch: (coincide, realOpt, title) => coincide
      ? `✓ Tu decisión coincide con la que tomó ${C_ACTIVE.empresa}: opción ${realOpt} — «${title}».`
      : `Tu decisión (opción ${S.decisiones[S.decisiones.length-1]?.opcion || "—"}) difiere de la real: ${C_ACTIVE.empresa} eligió la opción ${realOpt} — «${title}». Recuerda: discrepar puede ser un acierto.`,
    transcriptBtn: "Transcripción de la voz en off",
    ovEditorToggle: "Ajustar tiempos de rótulos",
    ovEditorTitle: "Sincronizar rótulos con el vídeo",
    ovEditorHelp: "Escribe el segundo en que aparece cada tarjeta y cuántos segundos permanece. También puedes arrastrar el vídeo al momento exacto y pulsar «⏱ ahora». Se guarda automáticamente.",
    ovEditorNow: "⏱ ahora",
    ovEditorAppears: "Aparece en",
    ovEditorDura: "Dura",
    ovEditorExport: "Exportar tiempos",
    // Final UI
    finalTitle: "Caso completado",
    finalSub: `Has tomado las ${C_ACTIVE.decisiones} decisiones del caso. Este es tu informe de desempeño — tu profesor recibe automáticamente una copia ampliada en su panel.`,
    evalGlobal: "Evaluación global",
    evalGlobalDet: "Calidad, análisis, criterio y ritmo",
    evalStrategic: "Calidad estratégica",
    evalStrategicDet: "Valor de las opciones según el claustro",
    evalMatch: "Coincidencia con la realidad",
    evalMatchDet: "Coincidir no siempre es acertar (Decisión 3)",
    evalTime: "Tiempo en decisiones",
    evalTimeDet: (avgMin) => `Media de ${avgMin} por decisión`,
    finalTreeTitle: "Tu árbol de decisiones",
    finalTreeSub: (empresa) => `Tu camino frente al camino real de ${empresa} (2007–2013)`,
    finalDecisionsTitle: "Tus decisiones, una a una",
    finalCompetenciesTitle: "Perfil de competencias",
    finalYouLegend: "Tú",
    finalClassLegend: "Media de la clase",
    btnViewAsProf: "Ver cómo lo ve el profesor",
    btnBackHome: "Volver al inicio",
    // Professor UI
    profCrumbs: "Inicio &nbsp;|&nbsp; <b>Panel del profesor</b>",
    profKicker: (title) => `Panel del profesor · ${title}`,
    profTitle: "Evaluación de la clase",
    profSub: (n) => `MBA · Sección B · ${n} alumnos han completado el caso. Haz clic en cualquier alumno para ver su árbol de decisiones, tiempos, razonamientos y análisis de competencias.`,
    btnCreateCase: "＋ Crear caso",
    kpiAlumniCompleted: "Alumnos completados",
    kpiParticipation: "100 % de participación",
    kpiAvgEvaluation: "Evaluación media",
    kpiAvgCalidad: (c) => `Calidad estratégica media: ${c}/100`,
    kpiAvgCoincide: "Coincidencia con la realidad",
    kpiAvgCoincideSub: "Media de decisiones iguales a las reales",
    kpiAvgTime: "Tiempo medio en decisiones",
    kpiAvgTimeSub: (t) => `${t} por decisión`,
    profPanelWhatClassChose: "¿Qué eligió la clase en cada momento?",
    profPanelReadings: "Lectura rápida para la sesión en aula",
    profPanelStudents: "Alumnos",
    tblStudent: "Alumno",
    tblEvaluation: "Evaluación",
    tblCoincidence: "Coincidencia",
    tblTimeDecisions: "Tiempo decisiones",
    tblReasoning: "Razonamiento medio",
    tblQuality: "Calidad por decisión",
    tblViewReport: "Ver informe",
    btnBackToClass: "Volver a la clase",
    profDetailTitle: "Evaluación global",
    profDetailCompleted: (fecha) => `Completado: ${fecha}`,
    profDetailTime: (t) => `Tiempo en decisiones: ${t}`,
    iaTitle: "Análisis generado por IA · Revisable por el profesor",
    calibTitle: "Confianza vs. acierto",
    calibDesc: "Tu nivel de seguridad se compara con la calidad real de tus decisiones.",
    treeTitle: "Árbol de decisiones del alumno",
    treeSub: (empresa) => `Camino del alumno frente al camino real de ${empresa}`,
    radarYourLegend: (name) => `Alumno: ${name}`,
    radarClassLegend: "Media de la clase",
    timeGraphTitle: "Tiempo por decisión",
    timeGraphSub: "El tiempo se mide desde que aparece la decisión hasta la confirmación.",
    decisionsAndReasonings: "Decisiones y razonamientos",
    opcionRealText: "= decisión real",
    opcionAltText: "camino alternativo",
    eligiText: (opt, title, qual) => `Eligió <span style="color:#e2001a">${opt}</span> — ${title} <span style="color:#9a9a9a;font-weight:600">· Calidad: ${qual}/100</span>`,
    studentConf: "Confianza del alumno",
    realQuality: "Calidad real",
    exportPdfBtn: "Exportar informe (PDF)",
    // Additional UI
    avatarIaBadge: "Avatar IA",
    liveTag: "EN VIVO",
    live: "En directo",
    profDept: "Dirección Estratégica · IESE",
    formatIaTag: "FORMATO 9:16 · AVATAR IA",
    profSpeechHint: "Pulsa play para reproducir el vídeo del profesor. Las cifras aparecen sobreimpresas en el vídeo 9:16.",
    aoetBtn: "Ajustar tiempos de las cifras",
    aoeTitle: "Sincronizar cifras con el vídeo del profesor",
    aoeHelp: "Escribe el segundo en que aparece cada cifra y cuántos segundos permanece (abajo a la izquierda, sin tapar al profesor). También puedes pulsar «⏱ ahora» con el vídeo en el momento deseado.",
    aoeAppears: "Aparece en",
    aoeDuration: "Dura",
    aoeNow: "⏱ ahora",
    aoeExport: "Exportar tiempos",
    layoutLabel: "Distribución",
    layoutVideoTop: "Vídeo arriba",
    layoutVideoSide: "Vídeo al lado",
    dataContextKicker: "Datos de contexto",
    quickReadingText: `<p style="margin-bottom:12px">· La <b>Decisión 3 (crisis Qwikster)</b> es la que más divide a la clase: es el mejor punto de partida para la discusión, porque la opción real fue un error empresarial.</p>
          <p style="margin-bottom:12px">· Los alumnos que más pantallas de datos consultaron eligieron mayoritariamente la opción B (marca única) en la crisis: buen ejemplo de decisión informada frente a intuición.</p>
          <p>· Hay un perfil claramente <b>conservador</b> (0/4 coincidencias) y otro <b>intuitivo-acelerado</b> (4/4 en tiempo récord pero razonamiento superficial): contraste ideal para abrir el debate.</p>`,
    calibrationIndex: "Índice de calibración",
    confidenceVsSuccess: "Confianza vs. acierto",
    riskLabel: "Riesgo",
    decisionMoment: (momento, total) => `Momento de decisión ${momento} de ${total}`,
    demoNoteTimeline: "<b>Demo</b> · Los vídeos tienen timeline interactivo: haz clic en los marcadores ◉ para ver los datos del momento. Usa el botón «Transcripción» para leer la voz en off.",
    demoNoteFinal: "<b>Tu sesión ya está en el panel del profesor</b> · Pulsa «Ver cómo lo ve el profesor» para enseñar la evaluación en la reunión.",
    demoNoteProf: "<b>Panel del profesor</b> · Haz clic en un alumno para abrir su evaluación individual con análisis IA.",
    demoNoteStudio: "<b>IESE Case Studio (maqueta)</b> · Demuestra cómo un profesor crea su propio caso sin programar. Es navegable; no guarda datos.",
  },
  en: {
    kicker: "IESE Case Experience · Simulation Platform",
    heroTitle: "Cases are <span class=\"hl\">no longer read</span>.<br/>They are lived.",
    heroSub: "Interactive decision-making experiences based on real business cases, featuring AI avatar narration, cinematic recreations, key data at every milestone, and detailed student performance evaluation.",
    studentTitle: "I am a student",
    studentDesc: "Live the case in the first person: receive the context, analyze real data, and make the decisions that shaped the company's history.",
    studentCta: "Enter as student",
    profTitle: "I am a professor",
    profDesc: "Evaluate your class performance: decision trees, timings, written reasoning, and AI-generated competency analysis.",
    profCta: "Enter as professor",
    stat1Num: "1:1",
    stat1Title: "Personalized experience for each student, at their own pace",
    stat2Num: "100%",
    stat2Title: "Of decisions tracked: option, time, consulted data, and reasoning",
    stat3Num: "Real cases",
    stat3Title: "Documented decisions of real companies, with verified data",
    demoNote: "<b>Demo mode</b> · All data is simulated. Videos are shown as placeholders with transcription and interactive timeline.",
    exit: "Exit",
    studentBadge: "Student",
    profBadge: "Professor",
    // QR Code Widget
    qrFloatText: "Try on mobile",
    qrModalTitle: "Try it on your mobile",
    qrModalSubtitle: "Scan to open the simulation on your device",
    qrModalInstructions: "Open your smartphone camera and point it at the QR code to continue the experience on your mobile.",
    qrCopyBtn: "Copy link",
    qrCopied: "Copied!",
    // Student Home
    crumbsHome: "Home &nbsp;|&nbsp; <b>My Cases</b>",
    assignedCases: "My Assigned Cases",
    welcomeTitle: "Welcome back",
    welcomeSub: "Your professor has assigned a new case. Remember: there are no pre-written correct answers — the quality of your reasoning is evaluated based on the information available at each moment.",
    caseNewTag: "New · Assigned",
    caseStartBtn: "Start case",
    caseSoonTag: "Coming Soon",
    caseZaraTitle: "Zara: Speed as Strategy",
    caseZaraDesc: "How a Galician manufacturer reinvented the fashion supply chain and decided not to advertise when everyone else was.",
    caseLegoTitle: "LEGO: Rebuilding an Empire",
    caseLegoDesc: "From being months away from bankruptcy to becoming the world's most valuable toy company: the decisions of the greatest turnaround in recent business history.",
    // Player UI
    caseInProgress: "Case in progress",
    progressCompleted: "completed",
    progressStep: "Step",
    progressOf: "of",
    sessionTime: "Session time",
    btnContinue: "Continue",
    btnAnalyzed: "I have analyzed the data",
    btnConfirm: "Confirm decision",
    decisionTitle: "The decision is yours",
    decisionTimer: "Time on this decision",
    reasonLabel: "Your reasoning",
    reasonRequired: "(required — the professor will read it)",
    reasonPlaceholder: "Why do you choose this option? Support it with the data you have seen: what risks do you assume and what do you hope to achieve?",
    reasonHintEmpty: "Select an option and write at least 15 words.",
    reasonHintSelected: (opt, words) => `Option ${opt} selected · ${words}/15 words written.`,
    reasonHintReady: (opt, words) => `Option ${opt} · reasoning ready (${words} words). This decision cannot be undone.`,
    confidenceLabel: "How confident are you in this decision?",
    confidenceScaleLow: "Not confident",
    confidenceScaleHigh: "Fully confident",
    confidenceHint: "Your confidence level is compared with the actual quality of this decision: the professor will see your <b>calibration</b>.",
    realBanner: "What actually happened",
    realMatch: (coincide, realOpt, title) => coincide
      ? `✓ Your decision matches the one made by ${C_ACTIVE.empresa}: option ${realOpt} — "${title}".`
      : `Your decision (option ${S.decisiones[S.decisiones.length-1]?.opcion || "—"}) differs from the real one: ${C_ACTIVE.empresa} chose option ${realOpt} — "${title}". Remember: disagreeing can be a correct path.`,
    transcriptBtn: "Voiceover transcript",
    ovEditorToggle: "Adjust overlay timings",
    ovEditorTitle: "Sync overlays with video",
    ovEditorHelp: "Type the second in which each card appears and how many seconds it remains. You can also drag the video to the exact moment and click '⏱ now'. Saved automatically.",
    ovEditorNow: "⏱ now",
    ovEditorAppears: "Appears at",
    ovEditorDura: "Duration",
    ovEditorExport: "Export timings",
    // Final UI
    finalTitle: "Case Completed",
    finalSub: `You have made all ${C_ACTIVE.decisiones} decisions of the case. This is your performance report — your professor automatically receives an expanded copy on their panel.`,
    evalGlobal: "Overall evaluation",
    evalGlobalDet: "Quality, analysis, criteria, and pace",
    evalStrategic: "Strategic quality",
    evalStrategicDet: "Value of options according to the faculty",
    evalMatch: "Coincidence with reality",
    evalMatchDet: "Matching is not always the best choice (Decision 3)",
    evalTime: "Time in decisions",
    evalTimeDet: (avgMin) => `Average of ${avgMin} per decision`,
    finalTreeTitle: "Your decision tree",
    finalTreeSub: (empresa) => `Your path vs. the actual path of ${empresa} (2007–2013)`,
    finalDecisionsTitle: "Your decisions, one by one",
    finalCompetenciesTitle: "Competency profile",
    finalYouLegend: "You",
    finalClassLegend: "Class average",
    btnViewAsProf: "See how the professor sees it",
    btnBackHome: "Back to home",
    // Professor UI
    profCrumbs: "Home &nbsp;|&nbsp; <b>Professor Panel</b>",
    profKicker: (title) => `Professor Panel · ${title}`,
    profTitle: "Class Evaluation",
    profSub: (n) => `MBA · Section B · ${n} students have completed the case. Click on any student to view their decision tree, timings, reasoning, and competency analysis.`,
    btnCreateCase: "＋ Create case",
    kpiAlumniCompleted: "Students completed",
    kpiParticipation: "100% participation",
    kpiAvgEvaluation: "Average evaluation",
    kpiAvgCalidad: (c) => `Average strategic quality: ${c}/100`,
    kpiAvgCoincide: "Coincidence with reality",
    kpiAvgCoincideSub: "Average decisions matching reality",
    kpiAvgTime: "Average decision time",
    kpiAvgTimeSub: (t) => `${t} per decision`,
    profPanelWhatClassChose: "What did the class choose at each moment?",
    profPanelReadings: "Quick summary for the classroom session",
    profPanelStudents: "Students",
    tblStudent: "Student",
    tblEvaluation: "Evaluation",
    tblCoincidence: "Coincidence",
    tblTimeDecisions: "Decision time",
    tblReasoning: "Avg reasoning",
    tblQuality: "Quality per decision",
    tblViewReport: "View report",
    btnBackToClass: "Back to class",
    profDetailTitle: "Overall evaluation",
    profDetailCompleted: (fecha) => `Completed: ${fecha}`,
    profDetailTime: (t) => `Time in decisions: ${t}`,
    iaTitle: "AI-generated analysis · Reviewable by the professor",
    calibTitle: "Confidence vs. success",
    calibDesc: "Your confidence level is compared with the actual quality of your decisions.",
    treeTitle: "Student decision tree",
    treeSub: (empresa) => `Student path vs. real path of ${empresa}`,
    radarYourLegend: (name) => `Student: ${name}`,
    radarClassLegend: "Class average",
    timeGraphTitle: "Time per decision",
    timeGraphSub: "Time is measured from decision onset to confirmation.",
    decisionsAndReasonings: "Decisions and reasonings",
    opcionRealText: "= real decision",
    opcionAltText: "alternative path",
    eligiText: (opt, title, qual) => `Chose <span style="color:#e2001a">${opt}</span> — ${title} <span style="color:#9a9a9a;font-weight:600">· Quality: ${qual}/100</span>`,
    studentConf: "Student confidence",
    realQuality: "Real quality",
    exportPdfBtn: "Export report (PDF)",
    // Additional UI
    avatarIaBadge: "AI Avatar",
    liveTag: "LIVE",
    live: "Live",
    profDept: "Strategic Management · IESE",
    formatIaTag: "9:16 FORMAT · AI AVATAR",
    profSpeechHint: "Press play to reproduce the professor's video. Figures appear overlaid on the 9:16 video.",
    aoetBtn: "Adjust figure timings",
    aoeTitle: "Sync figures with professor's video",
    aoeHelp: "Type the second in which each figure appears and how many seconds it remains (bottom left, without covering the professor). You can also press '⏱ now' with the video at the desired moment.",
    aoeAppears: "Appears at",
    aoeDuration: "Duration",
    aoeNow: "⏱ now",
    aoeExport: "Export timings",
    layoutLabel: "Layout",
    layoutVideoTop: "Video on top",
    layoutVideoSide: "Video aside",
    dataContextKicker: "Context Data",
    quickReadingText: `<p style="margin-bottom:12px">· The <b>Decision 3 (Qwikster crisis)</b> is the one that most divides the class: it is the best starting point for discussion, because the real option was a business mistake.</p>
          <p style="margin-bottom:12px">· Students who consulted the most data screens predominantly chose option B (single brand) in the crisis: a good example of informed decision-making versus intuition.</p>
          <p>· There is a clearly <b>conservative</b> profile (0/4 matches) and another <b>intuitive-accelerated</b> one (4/4 in record time but superficial reasoning): ideal contrast to open the debate.</p>`,
    calibrationIndex: "Calibration Index",
    confidenceVsSuccess: "Confidence vs. Success",
    riskLabel: "Risk",
    decisionMoment: (momento, total) => `Decision Moment ${momento} of ${total}`,
    demoNoteTimeline: "<b>Demo</b> · Videos have an interactive timeline: click on the ◉ markers to view the data for that moment. Use the 'Transcript' button to read the voiceover.",
    demoNoteFinal: "<b>Your session is now in the professor panel</b> · Click 'See how the professor sees it' to show the evaluation in the meeting.",
    demoNoteProf: "<b>Professor Panel</b> · Click on a student to open their individual evaluation with AI analysis.",
    demoNoteStudio: "<b>IESE Case Studio (mockup)</b> · Demonstrates how a professor creates their own case without coding. It is navigable; it does not save data.",
  }
};

function t(key, ...args) {
  const lang = S.lang || 'es';
  const item = TXT[lang]?.[key] || TXT['es']?.[key] || key;
  if (typeof item === 'function') {
    return item(...args);
  }
  return item;
}

function tFase(f) {
  if (S.lang !== 'en') return f;
  if (f === 'Introducción') return 'Introduction';
  if (f === 'Decisión 1 · Streaming') return 'Decision 1 · Streaming';
  if (f === 'Decisión 2 · Internacional') return 'Decision 2 · International';
  if (f === 'Decisión 3 · La crisis') return 'Decision 3 · The Crisis';
  if (f === 'Decisión 4 · Contenido original') return 'Decision 4 · Original Content';
  if (f === 'Cierre') return 'Conclusion';
  return f;
}

function tTitle(title) {
  if (S.lang !== 'en') return title;
  switch (title) {
    case 'Bienvenida al caso': return 'Welcome to the Case';
    case 'Los orígenes de Netflix': return 'The Origins of Netflix';
    case 'La foto de salida (enero 2007)': return 'The Starting Point (January 2007)';
    case 'El dilema del innovador': return 'The Innovator\'s Dilemma';
    case '¿Lanzamos el streaming?': return 'Should We Launch Streaming?';
    case 'Lo que hizo Netflix': return 'What Netflix Did';
    case 'Crecer fuera de casa': return 'Growing Beyond Borders';
    case 'El negocio en 2010': return 'The Business in 2010';
    case '¿Cómo salimos al exterior?': return 'How Do We Expand Internationally?';
    case 'Lo que hizo Netflix': return 'What Netflix Did';
    case 'El verano más difícil': return 'The Most Difficult Summer';
    case 'La hemorragia, en datos': return 'The Bleeding, in Data';
    case '¿Cómo gestionas la crisis?': return 'How Do You Manage the Crisis?';
    case 'Lo que hizo Netflix (y por qué salió mal)': return 'What Netflix Did (And Why It Went Wrong)';
    case 'La apuesta de los 100 millones': return 'The 100 Million Dollar Bet';
    case 'Los números de la apuesta': return 'The Numbers Behind the Bet';
    case '¿Apostamos por el contenido original?': return 'Should We Bet on Original Content?';
    case 'Lo que hizo Netflix': return 'What Netflix Did';
    case 'Cierre del caso': return 'Case Conclusion';
    default: return title;
  }
}

function translateRisk(risk) {
  if (S.lang !== 'en') return risk;
  if (risk === 'Bajo') return 'Low';
  if (risk === 'Medio') return 'Medium';
  if (risk === 'Alto') return 'High';
  if (risk === 'Muy alto') return 'Very High';
  return risk;
}

function translateOption(decIdx, opt) {
  if (S.lang !== 'en') return opt;
  const tOpts = [
    // Decisión 1
    {
      A: { titulo: "Launch streaming now, included free in the DVD subscription", desc: "Deliberately cannibalize our own business. Every DVD subscriber gets streaming hours at no extra cost. Small initial catalog (~1,000 titles vs. 70,000 on DVD)." },
      B: { titulo: "Wait 2–3 years and reinforce leadership in DVD", desc: "The streaming catalog is still poor and studios do not want to license. Consolidate the profitable business and enter when technology and rights mature." },
      C: { titulo: "Launch streaming as a separate premium paid service", desc: "Protect margins: streaming is charged separately ($4.99/month extra). Whoever wants it, pays for it. No DVD cannibalization." }
    },
    // Decisión 2
    {
      A: { titulo: "Launch streaming-only in Canada", desc: "First 100% streaming market in company history. Cheap and fast, but without the massive DVD catalog: value proposition depends on the rights you secure." },
      B: { titulo: "Replicate the complete DVD + streaming model", desc: "Bring the proven value proposition to Canada. $120–180M investment and 18–24 months to set up postal logistics." },
      C: { titulo: "Postpone expansion and defend the US market", desc: "Hulu and Amazon are pushing at home. Concentrate resources on content and product for the domestic market and review expansion in 2012." }
    },
    // Decisión 3
    {
      A: { titulo: "Separate DVD into a new company: 'Qwikster'", desc: "Accelerate transition: Netflix remains streaming-only, and DVD moves to a new brand with independent website, billing, and queues. Total strategic clarity." },
      B: { titulo: "Keep single brand, apologize, and compensate", desc: "Acknowledge the communication error: public letter from CEO, maintain new prices but offer 2–3 months discount to affected customers and simplify plan migration." },
      C: { titulo: "Revert price increase completely", desc: "Go back to the $9.99 combined plan. Stops the bleeding in the short term, but gives up ~$200M/year needed to buy content and fight Amazon and HBO." }
    },
    // Decisión 4
    {
      A: { titulo: "Commit $100M: two full seasons without a pilot", desc: "Win the bidding war against HBO and AMC. Release the entire season at once and use viewership data as an advantage. If it fails, the financial crisis deepens." },
      B: { titulo: "Offer to finance only a pilot + preferential option", desc: "Conservative counteroffer to the industry model. Minimal risk, but the production company has already said they will go to HBO under this model." },
      C: { titulo: "Do not enter production: reinforce catalog licensing", desc: "Production is not your business. Allocate the $100M to renew licensing agreements (Starz, Epix, Disney) that customers already value today." }
    }
  ];

  const trans = tOpts[decIdx]?.[opt.id];
  if (trans) {
    return { ...opt, titulo: trans.titulo, desc: trans.desc };
  }
  return opt;
}


/* ============================================================
   Gráficos SVG
   ============================================================ */
const COL = { rojo: "#e2001a", negro: "#1a1a1a", gris: "#9a9a9a", grisClaro: "#d6d6d6", verde: "#1e8a4c" };

function ejeY(max, W, H, padL, padT, padB) {
  const innerH = H - padT - padB;
  let out = "";
  for (let i = 0; i <= 4; i++) {
    const v = (max / 4) * i;
    const y = H - padB - (innerH * i) / 4;
    out += `<line x1="${padL}" y1="${y}" x2="${W - 10}" y2="${y}" stroke="#ececec" stroke-width="1"/>`;
    out += `<text x="${padL - 8}" y="${y + 4}" font-size="10.5" fill="#9a9a9a" text-anchor="end">${v >= 100 ? Math.round(v) : Math.round(v * 10) / 10}</text>`;
  }
  return out;
}

function lineChart(b) {
  const W = 560, H = 250, padL = 48, padR = 18, padT = 20, padB = 32;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const all = b.series.flatMap(s => s.valores);
  const max = Math.max(...all) * 1.12;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">` + ejeY(max, W, H, padL, padT, padB);
  const n = b.labels.length;
  const x = (i) => padL + (innerW * i) / Math.max(1, n - 1);
  const y = (v) => H - padB - (v / max) * innerH;
  b.labels.forEach((lb, i) => {
    svg += `<text x="${x(i)}" y="${H - 10}" font-size="11" fill="#767676" text-anchor="middle">${lb}</text>`;
  });
  const colores = [COL.rojo, COL.negro];
  b.series.forEach((s, si) => {
    const pts = s.valores.map((v, i) => `${x(i)},${y(v)}`).join(" ");
    svg += `<polyline points="${pts}" fill="none" stroke="${colores[si]}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    s.valores.forEach((v, i) => {
      svg += `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="#fff" stroke="${colores[si]}" stroke-width="3"/>`;
      svg += `<text x="${x(i)}" y="${y(v) - 11}" font-size="11" font-weight="700" fill="${colores[si]}" text-anchor="middle">${v}</text>`;
    });
  });
  return svg + "</svg>";
}

function barChart(b) {
  const W = 560, H = 250, padL = 48, padR = 18, padT = 20, padB = 46;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const vals = b.series[0].valores;
  const max = Math.max(...vals) * 1.15;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">` + ejeY(max, W, H, padL, padT, padB);
  const n = vals.length;
  const slot = innerW / n, bw = Math.min(64, slot * 0.55);
  vals.forEach((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const h = (v / max) * innerH;
    svg += `<rect x="${cx - bw / 2}" y="${H - padB - h}" width="${bw}" height="${h}" fill="${COL.rojo}"/>`;
    svg += `<text x="${cx}" y="${H - padB - h - 8}" font-size="11.5" font-weight="700" fill="#1a1a1a" text-anchor="middle">${v}</text>`;
    const lb = b.labels[i];
    if (lb.length > 14) {
      const corte = lb.lastIndexOf(" ", 16);
      svg += `<text x="${cx}" y="${H - 28}" font-size="9.5" fill="#767676" text-anchor="middle">${lb.slice(0, corte)}</text>`;
      svg += `<text x="${cx}" y="${H - 16}" font-size="9.5" fill="#767676" text-anchor="middle">${lb.slice(corte + 1)}</text>`;
    } else {
      svg += `<text x="${cx}" y="${H - 22}" font-size="10.5" fill="#767676" text-anchor="middle">${lb}</text>`;
    }
  });
  return svg + "</svg>";
}

function barChart2(b) {
  const W = 560, H = 260, padL = 48, padR = 18, padT = 20, padB = 34;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const all = b.series.flatMap(s => s.valores);
  const max = Math.max(...all) * 1.15;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">` + ejeY(max, W, H, padL, padT, padB);
  const n = b.labels.length, slot = innerW / n, bw = Math.min(36, slot * 0.26);
  const colores = [COL.negro, COL.rojo];
  b.labels.forEach((lb, i) => {
    const cx = padL + slot * i + slot / 2;
    svg += `<text x="${cx}" y="${H - 12}" font-size="11" fill="#767676" text-anchor="middle">${lb}</text>`;
    b.series.forEach((s, si) => {
      const v = s.valores[i];
      const h = (v / max) * innerH;
      const bx = cx - bw + si * (bw + 4);
      svg += `<rect x="${bx}" y="${H - padB - h}" width="${bw}" height="${h}" fill="${colores[si]}"/>`;
      svg += `<text x="${bx + bw / 2}" y="${H - padB - h - 7}" font-size="10.5" font-weight="700" fill="${colores[si]}" text-anchor="middle">${v}</text>`;
    });
  });
  return svg + "</svg>";
}

function legendHTML(series, colores) {
  return `<div class="legend">${series.map((s, i) =>
    `<span class="li"><span class="sw" style="background:${colores[i]}"></span>${s.nombre}</span>`).join("")}</div>`;
}

function renderBloqueDatos(b) {
  let inner = "";
  if (b.tipo === "linea") inner = lineChart(b);
  else if (b.tipo === "barras") inner = barChart(b);
  else if (b.tipo === "barras2") inner = barChart2(b) + legendHTML(b.series, [COL.negro, COL.rojo]);
  else if (b.tipo === "tabla") {
    inner = `<table class="dt"><thead><tr>${b.columnas.map(c => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>${b.filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  return `<div class="data-card"><h4>${b.titulo}</h4>${b.fuente ? `<div class="src">Fuente: ${b.fuente}</div>` : `<div class="src">&nbsp;</div>`}${inner}</div>`;
}

/* Radar */
function radarChart(valoresAlumno, valoresMedia) {
  const ejes = [S.lang === 'es' ? "Visión estratégica" : "Strategic Vision", S.lang === 'es' ? "Gestión del riesgo" : "Risk Management", S.lang === 'es' ? "Decisión con datos" : "Data-driven Decision", S.lang === 'es' ? "Orient. al cliente" : "Customer Focus", S.lang === 'es' ? "Profundidad analítica" : "Analytical Depth"];
  const W = 380, H = 320, cx = W / 2, cy = H / 2 + 6, R = 104;
  const ang = (i) => -Math.PI / 2 + (2 * Math.PI * i) / 5;
  const pt = (i, frac) => `${cx + Math.cos(ang(i)) * R * frac},${cy + Math.sin(ang(i)) * R * frac}`;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (let lvl = 1; lvl <= 4; lvl++) {
    const pts = ejes.map((_, i) => pt(i, lvl / 4)).join(" ");
    svg += `<polygon points="${pts}" fill="none" stroke="#e4e4e4" stroke-width="1"/>`;
  }
  ejes.forEach((e, i) => {
    svg += `<line x1="${cx}" y1="${cy}" x2="${pt(i, 1).split(",")[0]}" y2="${pt(i, 1).split(",")[1]}" stroke="#e4e4e4"/>`;
    const lx = cx + Math.cos(ang(i)) * (R + 24), ly = cy + Math.sin(ang(i)) * (R + 22);
    const anchor = Math.abs(Math.cos(ang(i))) < 0.3 ? "middle" : Math.cos(ang(i)) > 0 ? "start" : "end";
    svg += `<text x="${lx}" y="${ly + 4}" font-size="10.5" font-weight="700" fill="#4a4a4a" text-anchor="${anchor}">${e}</text>`;
  });
  const poly = (vals, color, fill, sw) => {
    const pts = vals.map((v, i) => pt(i, Math.max(0.04, v / 100))).join(" ");
    return `<polygon points="${pts}" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  };
  if (valoresMedia) svg += poly(valoresMedia, "#9a9a9a", "rgba(120,120,120,0.10)", 2);
  svg += poly(valoresAlumno, COL.rojo, "rgba(226,0,26,0.14)", 3);
  valoresAlumno.forEach((v, i) => {
    const [x, y] = pt(i, Math.max(0.04, v / 100)).split(",");
    svg += `<circle cx="${x}" cy="${y}" r="3.6" fill="${COL.rojo}"/>`;
  });
  return svg + "</svg>";
}

/* Árbol de decisiones */
function treeSVG(pathAlumno) {
  const nD = DECISION_STEPS.length;
  const colW = 196, x0 = 86, xi = (i) => 240 + i * colW;
  const yj = (j) => 84 + j * 96;
  const W = 240 + (nD - 1) * colW + 150, H = 84 + 2 * 96 + 86;
  const yMid = yj(1);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" style="min-width:${Math.round(W * 0.85)}px">`;
  const realPath = DECISION_STEPS.map(d => d.opciones.findIndex(o => o.esReal));
  const aluPath = pathAlumno.map((letra, i) => DECISION_STEPS[i].opciones.findIndex(o => o.id === letra));
  const linkRecto = (x1, y1, x2, y2) => `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
  let px = x0 + 26, py = yMid;
  for (let i = 0; i < nD; i++) {
    for (let j = 0; j < 3; j++) {
      svg += `<path d="${linkRecto(px, py, xi(i) - 23, yj(j))}" fill="none" stroke="#e6e6e6" stroke-width="1.5"/>`;
    }
    px = xi(i) + 23; py = yj(aluPath[i] >= 0 ? aluPath[i] : 1);
  }
  const drawPath = (idxs, color, dash, offset) => {
    let d = ""; let ppx = x0 + 26, ppy = yMid + offset;
    idxs.forEach((j, i) => {
      const nx = xi(i) - 23, ny = yj(j) + offset;
      d += linkRecto(ppx, ppy, nx, ny) + " "; ppx = xi(i) + 23; ppy = yj(j) + offset;
    });
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="3.5" ${dash ? `stroke-dasharray="7 6"` : ""} opacity="0.95"/>`;
  };
  svg += drawPath(realPath, COL.verde, true, 5);
  svg += drawPath(aluPath, COL.rojo, false, 0);
  svg += `<circle cx="${x0}" cy="${yMid}" r="26" fill="#1a1a1a"/>
    <text x="${x0}" y="${yMid + 4}" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">INICIO</text>
    <text x="${x0}" y="${yMid + 48}" font-size="10.5" fill="#767676" text-anchor="middle">2007</text>`;
  DECISION_STEPS.forEach((dec, i) => {
    svg += `<text x="${xi(i)}" y="26" font-size="11" font-weight="800" fill="#1a1a1a" text-anchor="middle">${S.lang === 'es' ? 'DECISIÓN' : 'DECISION'} ${i + 1}</text>
      <text x="${xi(i)}" y="40" font-size="10" fill="#767676" text-anchor="middle">${dec.anio}</text>`;
    dec.opciones.forEach((o, j) => {
      const esAlu = aluPath[i] === j, esReal = realPath[i] === j;
      const fill = esAlu ? COL.rojo : "#fff";
      const stroke = esAlu ? COL.rojo : esReal ? COL.verde : "#c9c9c9";
      svg += `<circle cx="${xi(i)}" cy="${yj(j)}" r="21" fill="${fill}" stroke="${stroke}" stroke-width="${esAlu || esReal ? 3 : 2}" ${esReal && !esAlu ? `stroke-dasharray="5 4"` : ""}/>
        <text x="${xi(i)}" y="${yj(j) + 5}" font-size="14" font-weight="800" fill="${esAlu ? "#fff" : "#4a4a4a"}" text-anchor="middle">${o.id}</text>`;
      if (esReal) svg += `<text x="${xi(i)}" y="${yj(j) + 38}" font-size="9" font-weight="800" fill="${COL.verde}" text-anchor="middle">${S.lang === 'es' ? 'REAL' : 'REAL'}</text>`;
    });
  });
  const xf = xi(nD - 1) + 118;
  svg += `<path d="${linkRecto(xi(nD - 1) + 23, yj(aluPath[nD - 1]), xf - 25, yMid)}" fill="none" stroke="${COL.rojo}" stroke-width="3.5"/>`;
  svg += `<path d="${linkRecto(xi(nD - 1) + 23, yj(realPath[nD - 1]) + 5, xf - 25, yMid + 5)}" fill="none" stroke="${COL.verde}" stroke-width="3.5" stroke-dasharray="7 6"/>`;
  svg += `<circle cx="${xf}" cy="${yMid}" r="26" fill="#fff" stroke="#1a1a1a" stroke-width="3"/>
    <text x="${xf}" y="${yMid + 4}" font-size="9.5" font-weight="800" fill="#1a1a1a" text-anchor="middle">2013</text>`;
  svg += `<line x1="${x0 - 20}" y1="${H - 18}" x2="${x0 + 14}" y2="${H - 18}" stroke="${COL.rojo}" stroke-width="3.5"/>
    <text x="${x0 + 22}" y="${H - 14}" font-size="11" font-weight="700" fill="#4a4a4a">${S.lang === 'es' ? 'Tu camino' : 'Your path'}</text>
    <line x1="${x0 + 110}" y1="${H - 18}" x2="${x0 + 144}" y2="${H - 18}" stroke="${COL.verde}" stroke-width="3.5" stroke-dasharray="7 6"/>
    <text x="${x0 + 152}" y="${H - 14}" font-size="11" font-weight="700" fill="#4a4a4a">${S.lang === 'es' ? 'Camino real de' : 'Real path of'} ${C_ACTIVE.empresa}</text>`;
  return svg + "</svg>";
}

/* ============================================================
   Cinematic video player HTML + interactividad
   ============================================================ */

function cinePlayerHTML(paso, id) {
  const total = paso.duracionSeg || 120;
  const ovs = paso.overlays || [];
  const markers = ovs.map((o, i) =>
    `<div class="ctl-marker" id="m_${id}_${i}" data-cid="${id}" data-idx="${i}" style="left:${Math.round(o.seg / total * 100)}%" title="${o.titulo}"></div>`
  ).join("");
  const overlayCards = ovs.map((o, i) =>
    `<div class="cinema-oc" id="oc_${id}_${i}">
       <div class="coc-titulo">${o.titulo}</div>
       <div class="coc-dato">${o.dato}</div>
       <div class="coc-sub">${o.subtexto}</div>
     </div>`
  ).join("");

  const tieneVideo = !!paso.videoSrc;
  const videoEl = tieneVideo
    ? `<video class="cinema-video" id="cv_${id}" src="${paso.videoSrc}" playsinline preload="metadata"></video>`
    : "";
  const mediaLayer = `
       ${videoEl}
       <div class="cinema-center" id="cc_${id}">
         <button class="cinema-play" id="cp_${id}" aria-label="Reproducir">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>
         </button>
         <div class="cinema-ph-text" id="cpt_${id}">
           <div class="cinema-vtag">[ ${S.lang === 'es' ? 'Vídeo de producción' : 'Production video'} ]</div>
           <div class="cinema-desc">${paso.videoDe}</div>
           <div class="cinema-dur">${S.lang === 'es' ? 'Duración estimada' : 'Estimated duration'}: ${paso.duracionVideo}</div>
         </div>
       </div>`;
  return `
    <div class="cinema-wrap" id="cw_${id}">
      <div class="cinema-frame">
        <div class="cinema-bg" id="cbg_${id}">
          <div class="film-grain"></div>
          <div class="cinema-badge"><span class="rec-dot"></span>${S.lang === 'es' ? 'Recreación IA' : 'AI Recreation'}</div>
          <div class="cinema-based">${S.lang === 'es' ? 'Basado en hechos documentados' : 'Based on documented facts'} · ${C_ACTIVE.periodo}</div>
          ${mediaLayer}
          ${overlayCards}
        </div>
        <div class="cinema-tl">
          <button class="ctl-play" id="ctlp_${id}" aria-label="Play/Pausa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>
          </button>
          <div class="ctl-track" id="ctltrack_${id}">
            <div class="ctl-fill" id="ctlf_${id}" style="width:0%"></div>
            ${markers}
            <div class="ctl-scrub" id="ctlscrub_${id}"></div>
          </div>
          <span class="ctl-time" id="ctlt_${id}">0:00 / ${paso.duracionVideo}</span>
          <button class="ctl-fullscreen" id="ctlfs_${id}" aria-label="Pantalla completa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>
      </div>
      <div class="transcript-bar">
        <button class="transcript-btn" id="tb_${id}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          ${t('transcriptBtn')}
        </button>
        ${(ovs.length && !tieneVideo) ? `<button class="ov-edit-toggle" id="oet_${id}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>
          ${t('ovEditorToggle')}
        </button>` : ""}
        <div class="transcript-panel" id="tp_${id}" style="display:none">${paso.transcript || (S.lang === 'es' ? "Transcripción no disponible para este fragmento." : "Transcript not available for this segment.")}</div>
        ${(ovs.length && !tieneVideo) ? overlayEditorHTML(ovs, id) : ""}
      </div>
    </div>`;
}

/* Editor visual de tiempos de los rótulos del vídeo (segundero + duración) */
function overlayEditorHTML(ovs, id) {
  return `<div class="ov-editor" id="ove_${id}" style="display:none">
    <div class="ove-head">${t('ovEditorTitle')}</div>
    <div class="ove-help">${t('ovEditorHelp')}</div>
    ${ovs.map((o, i) => `
      <div class="ove-row">
        <div class="ove-info"><b>${o.titulo}</b> · <span class="dat">${o.dato}</span></div>
        <label class="ove-field">${t('ovEditorAppears')}
          <input type="number" min="0" step="1" class="ove-start" data-cid="${id}" data-idx="${i}" value="${o.seg}">
          <span class="mmss" id="ovemm_${id}_${i}">${fmtTime(o.seg)}</span>
        </label>
        <label class="ove-field">${t('ovEditorDura')}
          <input type="number" min="1" step="1" class="ove-dur" data-cid="${id}" data-idx="${i}" value="${o.dur || 5}"> s
        </label>
        <button class="ove-now" data-cid="${id}" data-idx="${i}">${t('ovEditorNow')}</button>
      </div>`).join("")}
    <div class="ove-actions">
      <button class="btn sec" style="padding:9px 16px" id="oveexp_${id}">${t('ovEditorExport')}</button>
      <span class="ove-saved" id="ovesaved_${id}"></span>
    </div>
    <textarea class="ove-out" id="oveout_${id}" readonly style="display:none"></textarea>
  </div>`;
}

function wireCinePlayer(paso, id) {
  const vid = document.getElementById(`cv_${id}`);
  let total = paso.duracionSeg || 120;
  const ovs = paso.overlays || [];
  const subsWords = (paso.transcript || "").split(/\s+/).filter(Boolean);
  let curSeg = 0, playing = false, lastTs = null, activeOv = -1, rafId = null;
  let useVid = !!vid;

  ovs.forEach(o => { if (typeof o.dur !== "number") o.dur = 5; });

  const ovKey = "iese_ov_v2_" + (paso.videoSrc || paso.titulo);
  let tieneOverride = false;
  try {
    const saved = JSON.parse(localStorage.getItem(ovKey) || "null");
    if (Array.isArray(saved) && saved.length === ovs.length) {
      saved.forEach((s, i) => {
        if (typeof s === "number") { ovs[i].seg = s; }
        else if (s && typeof s === "object") { if (typeof s.seg === "number") ovs[i].seg = s.seg; if (typeof s.dur === "number") ovs[i].dur = s.dur; }
      });
      tieneOverride = true;
    }
  } catch (e) { }
  function guardarOv() {
    try { localStorage.setItem(ovKey, JSON.stringify(ovs.map(o => ({ seg: o.seg, dur: o.dur })))); } catch (e) {}
    tieneOverride = true;
  }

  function hideAllOv() {
    ovs.forEach((_, i) => {
      const el = document.getElementById(`oc_${id}_${i}`);
      if (el) el.style.display = "none";
      const m = document.getElementById(`m_${id}_${i}`);
      if (m) m.classList.remove("act");
    });
    activeOv = -1;
  }

  function showOv(idx) {
    hideAllOv();
    if (idx < 0 || idx >= ovs.length) return;
    const el = document.getElementById(`oc_${id}_${idx}`);
    if (el) el.style.display = "flex";
    const m = document.getElementById(`m_${id}_${idx}`);
    if (m) m.classList.add("act");
    activeOv = idx;
  }

  function updateUI(seg) {
    curSeg = Math.min(seg, total);
    const pct = (curSeg / total) * 100;
    const fill = document.getElementById(`ctlf_${id}`);
    if (fill) fill.style.width = pct + "%";
    const scrub = document.getElementById(`ctlscrub_${id}`);
    if (scrub) scrub.style.left = pct + "%";
    const timeEl = document.getElementById(`ctlt_${id}`);
    if (timeEl) timeEl.textContent = fmtTime(curSeg) + " / " + fmtTime(total);

    let targetOv = -1;
    for (let i = ovs.length - 1; i >= 0; i--) {
      if (curSeg >= ovs[i].seg && curSeg < ovs[i].seg + ovs[i].dur) { targetOv = i; break; }
    }
    if (targetOv !== activeOv) showOv(targetOv);
  }

  function tick(ts) {
    if (!playing) return;
    if (lastTs !== null) {
      curSeg += (ts - lastTs) / 1000;
      updateUI(curSeg);
      if (curSeg >= total) { stopPlay(); return; }
    }
    lastTs = ts;
    rafId = requestAnimationFrame(tick);
  }

  function setPlayIcon(isPlaying) {
    const btn = document.getElementById(`ctlp_${id}`);
    if (!btn) return;
    btn.innerHTML = isPlaying
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>`;
  }

  function seek(seg) {
    curSeg = Math.max(0, Math.min(seg, total));
    if (useVid) vid.currentTime = curSeg;
    updateUI(curSeg);
  }

  function startPlay() {
    if (curSeg >= total) { curSeg = 0; hideAllOv(); updateUI(0); if (useVid) vid.currentTime = 0; }
    playing = true; lastTs = null;
    setPlayIcon(true);
    const bigPlay = document.getElementById(`cp_${id}`);
    if (bigPlay) bigPlay.style.display = "none";
    if (useVid) { vid.play().catch(() => {}); } else { rafId = requestAnimationFrame(tick); }
  }

  function stopPlay() {
    playing = false; lastTs = null;
    if (rafId) cancelAnimationFrame(rafId);
    if (useVid) vid.pause();
    setPlayIcon(false);
    if (curSeg >= total) {
      const bigPlay = document.getElementById(`cp_${id}`);
      if (bigPlay) bigPlay.style.display = "flex";
    }
  }

  if (vid) {
    const phText = document.getElementById(`cpt_${id}`);
    vid.addEventListener("loadedmetadata", () => {
      if (isFinite(vid.duration) && vid.duration > 0) {
        total = vid.duration;
        if (phText) phText.style.display = "none";
        const timeEl = document.getElementById(`ctlt_${id}`);
        if (timeEl) timeEl.textContent = fmtTime(0) + " / " + fmtTime(total);
        const prevista = paso.duracionSeg || total;
        if (!tieneOverride && Math.abs(prevista - total) > 3) {
          const factor = total / prevista;
          ovs.forEach(o => { o.seg = Math.min(total - 1, Math.round(o.seg * factor)); });
        }
        repintarMarcadores();
      }
    });
    vid.addEventListener("timeupdate", () => updateUI(vid.currentTime));
    vid.addEventListener("seeked", () => updateUI(vid.currentTime));
    vid.addEventListener("play", () => { playing = true; setPlayIcon(true); });
    vid.addEventListener("pause", () => { if (vid.currentTime < total - 0.3) { playing = false; setPlayIcon(false); } });
    vid.addEventListener("ended", () => { curSeg = total; stopPlay(); });
    vid.addEventListener("error", () => {
      useVid = false;
      vid.style.display = "none";
      if (phText) phText.style.display = "";
    });
  }

  const cpBtn = document.getElementById(`cp_${id}`);
  if (cpBtn) cpBtn.onclick = startPlay;

  const ctlpBtn = document.getElementById(`ctlp_${id}`);
  if (ctlpBtn) ctlpBtn.onclick = () => { playing ? stopPlay() : startPlay(); };

  const track = document.getElementById(`ctltrack_${id}`);
  if (track) {
    const posDesde = (clientX) => {
      const rect = track.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * total;
    };
    let dragging = false;
    const onMove = (e) => {
      if (!dragging) return;
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      seek(posDesde(cx));
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
    const onDown = (e) => {
      dragging = true;
      track.classList.add("dragging");
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      seek(posDesde(cx));
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onUp);
      e.preventDefault();
    };
    track.addEventListener("mousedown", onDown);
    track.addEventListener("touchstart", onDown, { passive: false });
  }

  document.querySelectorAll(`.ctl-marker[data-cid="${id}"]`).forEach(m => {
    m.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const idx = parseInt(m.dataset.idx);
      seek(ovs[idx].seg);
    });
  });

  const tbBtn = document.getElementById(`tb_${id}`);
  const tpPanel = document.getElementById(`tp_${id}`);
  if (tbBtn && tpPanel) {
    tbBtn.onclick = () => {
      const vis = tpPanel.style.display !== "none";
      tpPanel.style.display = vis ? "none" : "block";
      tbBtn.classList.toggle("active", !vis);
    };
  }

  function repintarMarcadores() {
    ovs.forEach((o, i) => {
      const mk = document.getElementById(`m_${id}_${i}`);
      if (mk) mk.style.left = Math.min(99, Math.round(o.seg / total * 100)) + "%";
    });
  }

  const flashGuardado = () => {
    const sv = document.getElementById(`ovesaved_${id}`);
    if (sv) { sv.textContent = S.lang === 'es' ? "✓ Guardado" : "✓ Saved"; setTimeout(() => { if (sv) sv.textContent = ""; }, 1600); }
  };

  const oetBtn = document.getElementById(`oet_${id}`);
  const oeEditor = document.getElementById(`ove_${id}`);
  if (oetBtn && oeEditor) {
    oetBtn.onclick = () => {
      const vis = oeEditor.style.display !== "none";
      oeEditor.style.display = vis ? "none" : "block";
      oetBtn.classList.toggle("active", !vis);
    };
    document.querySelectorAll(`.ove-start[data-cid="${id}"]`).forEach(inp => {
      inp.addEventListener("input", () => {
        const idx = parseInt(inp.dataset.idx);
        let v = Math.max(0, Math.min(Math.round(total) - 1, parseInt(inp.value) || 0));
        ovs[idx].seg = v;
        const mm = document.getElementById(`ovemm_${id}_${idx}`);
        if (mm) mm.textContent = fmtTime(v);
        repintarMarcadores();
        updateUI(curSeg);
        guardarOv(); flashGuardado();
      });
    });
    document.querySelectorAll(`.ove-dur[data-cid="${id}"]`).forEach(inp => {
      inp.addEventListener("input", () => {
        const idx = parseInt(inp.dataset.idx);
        ovs[idx].dur = Math.max(1, parseInt(inp.value) || 1);
        updateUI(curSeg);
        guardarOv(); flashGuardado();
      });
    });
    document.querySelectorAll(`.ove-now[data-cid="${id}"]`).forEach(b => {
      b.onclick = () => {
        const idx = parseInt(b.dataset.idx);
        const t = Math.round((useVid && vid) ? vid.currentTime : curSeg);
        ovs[idx].seg = t;
        const inp = document.querySelector(`.ove-start[data-cid="${id}"][data-idx="${idx}"]`);
        if (inp) inp.value = t;
        const mm = document.getElementById(`ovemm_${id}_${idx}`);
        if (mm) mm.textContent = fmtTime(t);
        repintarMarcadores();
        updateUI(curSeg);
        guardarOv(); flashGuardado();
      };
    });
    const expBtn = document.getElementById(`oveexp_${id}`);
    const expOut = document.getElementById(`oveout_${id}`);
    if (expBtn && expOut) {
      expBtn.onclick = () => {
        const json = "overlays: [\n" + ovs.map(o =>
          `  { seg: ${o.seg}, dur: ${o.dur}, titulo: ${JSON.stringify(o.titulo)}, dato: ${JSON.stringify(o.dato)}, subtexto: ${JSON.stringify(o.subtexto)} },`
        ).join("\n") + "\n],";
        expOut.style.display = "block";
        expOut.value = json;
        expOut.select();
        try { navigator.clipboard.writeText(json); } catch (e) {}
      };
    }
  }

  const fsBtn = document.getElementById(`ctlfs_${id}`);
  const wrapEl = document.getElementById(`cw_${id}`);
  const frameEl = wrapEl ? wrapEl.querySelector(".cinema-frame") : null;
  if (fsBtn && frameEl) {
    fsBtn.onclick = () => {
      if (!document.fullscreenElement) {
        frameEl.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    };
    frameEl.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === frameEl) {
        fsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h3v3m0-3l-3 3m16-3h-3v3m0-3l3 3M4 10h3V7m0 3L4 7m16 3h-3V7m0 3l3-7"/></svg>`;
        frameEl.classList.add("is-fullscreen");
      } else {
        fsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
        frameEl.classList.remove("is-fullscreen");
      }
    });
  }
}

/* ============================================================
   Métricas
   ============================================================ */
function buscaOpcion(momentoIdx, letra) {
  return DECISION_STEPS[momentoIdx].opciones.find(o => o.id === letra);
}

function calcularMetricas(decisiones) {
  const opts = decisiones.map((d, i) => buscaOpcion(i, d.opcion));
  const calidad = Math.round(opts.reduce((a, o) => a + o.calidad, 0) / opts.length);
  const coincid = opts.filter(o => o.esReal).length;
  const wAvg = decisiones.reduce((a, d) => a + palabras(d.razonamiento), 0) / decisiones.length;
  const vAvg = decisiones.reduce((a, d) => a + (d.vistasDatos || 1), 0) / decisiones.length;
  const profundidad = Math.min(100, Math.round((Math.min(wAvg, 60) / 60) * 72 + (Math.min(vAvg, 4) / 4) * 28));
  const ritmoPor = decisiones.map(d => {
    const t = d.tiempoSeg;
    if (t < 60) return 45; if (t < 120) return 70; if (t <= 480) return 100; if (t <= 720) return 82; return 62;
  });
  const ritmo = Math.round(ritmoPor.reduce((a, b) => a + b, 0) / ritmoPor.length);
  const global = Math.round(0.45 * calidad + 0.25 * profundidad + 0.15 * (coincid / opts.length) * 100 + 0.15 * ritmo);
  const comp = {
    vision: Math.round(opts.reduce((a, o) => a + o.competencias.vision, 0) / opts.length),
    riesgo: Math.round(opts.reduce((a, o) => a + o.competencias.riesgo, 0) / opts.length),
    datos: Math.round(opts.reduce((a, o) => a + o.competencias.datos, 0) / opts.length),
    cliente: Math.round(opts.reduce((a, o) => a + o.competencias.cliente, 0) / opts.length),
    analisis: profundidad,
  };
  const tiempoTotal = decisiones.reduce((a, d) => a + d.tiempoSeg, 0);
  return { calidad, coincid, profundidad, ritmo, global, comp, tiempoTotal, wAvg: Math.round(wAvg), vAvg };
}

function scoreClass(v) { return v >= 75 ? "hi" : v >= 55 ? "mid" : "lo"; }

/* Calibración: compara la confianza declarada con la calidad real de la decisión */
function calibracion(conf, cal) {
  if (conf == null) return { label: S.lang === 'es' ? "—" : "—", tipo: "na" };
  if (conf >= 70 && cal < 50) return { label: S.lang === 'es' ? "Exceso de confianza" : "Overconfidence", tipo: "danger" };
  if (conf <= 50 && cal >= 70) return { label: S.lang === 'es' ? "Inseguro pese a acertar" : "Underconfident despite success", tipo: "warn" };
  if (Math.abs(conf - cal) <= 22) return { label: S.lang === 'es' ? "Bien calibrado" : "Well calibrated", tipo: "ok" };
  if (conf - cal > 22) return { label: S.lang === 'es' ? "Algo sobreconfiado" : "Somewhat overconfident", tipo: "warn" };
  return { label: S.lang === 'es' ? "Algo inseguro" : "Somewhat underconfident", tipo: "warn" };
}

function translateCalibLabel(tipo, label) {
  if (S.lang !== 'en') return label;
  if (tipo === 'na') return '—';
  if (tipo === 'danger') return 'Overconfidence';
  if (label.includes('Inseguro pese') || label.includes('Underconfident despite')) return 'Underconfident despite success';
  if (label.includes('Bien calibrado') || label.includes('Well calibrated')) return 'Well calibrated';
  if (label.includes('sobreconfiado') || label.includes('overconfident')) return 'Somewhat overconfident';
  if (label.includes('inseguro') || label.includes('underconfident')) return 'Somewhat underconfident';
  return label;
}

/* Índice de calibración del alumno (0-100, mayor = mejor ajuste confianza/calidad) */
function indiceCalibracion(decisiones) {
  const conGap = decisiones.filter(d => d.confianza != null);
  if (!conGap.length) return null;
  const gaps = conGap.map((d, i) => Math.abs(d.confianza - buscaOpcion(decisiones.indexOf(d), d.opcion).calidad));
  const media = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  return Math.max(0, Math.round(100 - media));
}

const ANALISIS_IA_EN = {
  a1: "High-performance analytical-strategic profile. Lucía bases each decision on available data (cites concrete figures in 4 out of 4 reasonings) and demonstrates counterfactual thinking: in Decision 3 she correctly identified that the actual option (Qwikster) was suboptimal, separating 'strategic coherence' from 'customer-centric execution'. Her decision times (4–7 min) reflect deliberation without paralysis. Development area: make contingency plans explicit in high-risk bets (Decisions 1 and 4).",
  a2: "Intuitive-accelerated profile. Marc decides 4 to 8 times faster than the class average and matches the real decision in all 4 moments — but his reasonings are superficial (average of 14 words) and he only consulted 1 data screen per decision. The success in Decision 3 (Qwikster) is paradoxical: he chose the real option, which was a business mistake, without detecting its risks. Recommendation: work on analytical discipline; in class, ask him to defend decision 3 before the group.",
  a3: "Analytical-prudent profile with excellent data reading. Sofia consulted the maximum number of screens and her reasonings show explicit cost-benefit structures. She disagreed with the real decision in moments 1 and 4 with data-driven, defensible arguments, making her a valuable counterpoint for classroom discussion. Development area: assess the opportunity cost of not acting — her aversion to the original content bet ignored the inflation of licensing costs she herself had consulted.",
  a4: "Conservative-defensive profile. Andrés systematically prioritized protecting the current business over creating the future (0 out of 4 matches with the real decision, average strategic quality 44/100). His reasonings are internally coherent but anchored in the present. Ideal case study to discuss the 'innovator's dilemma' in class. Recommendation: exercise 5-year scenario projections.",
  a5: "Balanced profile with own criteria. Chen combines data reading with qualitative judgment and disagrees with the real decision when he has arguments (Decision 2: protecting customer experience). His reasoning in Decision 4 ('buying with informational advantage') demonstrates a sophisticated understanding of the strategic value of data. Development area: quantify his qualitative arguments more."
};

function generarAnalisisIA(m, decisiones) {
  const frases = [];
  if (S.lang === 'en') {
    frases.push(m.calidad >= 75
      ? `High strategic quality (${m.calidad}/100): chosen options maximize long-term value creation with the information available at each moment.`
      : m.calidad >= 55
        ? `Medium strategic quality (${m.calidad}/100): combines well-founded decisions with choices that prioritize the short term.`
        : `Low strategic quality (${m.calidad}/100): defensive pattern, prioritizes protecting current business over creating the future.`);
    frases.push(m.profundidad >= 70
      ? `Solid reasoning (average of ${m.wAvg} words per decision) citing the consulted data.`
      : `Reasoning could be improved (average of ${m.wAvg} words per decision): it is recommended to require explicit references to case data.`);
    const d3 = decisiones[2];
    if (d3) frases.push(d3.opcion === "A"
      ? `In Decision 3 (Qwikster crisis) they chose the real option, which was a business mistake: an interesting point for classroom discussion.`
      : d3.opcion === "B"
        ? `In Decision 3 they avoided the company's actual mistake and prioritized the customer: independent judgment vs. history.`
        : `In Decision 3 they opted to revert prices: protects customer relationship at the expense of funding content.`);
    frases.push(`Average time per decision: ${fmtMin(m.tiempoTotal / decisiones.length)}. Matching with real decision: ${m.coincid} out of ${decisiones.length}.`);
  } else {
    frases.push(m.calidad >= 75
      ? `Calidad estratégica alta (${m.calidad}/100): las opciones elegidas maximizan la creación de valor a largo plazo con la información disponible en cada momento.`
      : m.calidad >= 55
        ? `Calidad estratégica media (${m.calidad}/100): combina decisiones bien fundamentadas con elecciones que priorizan el corto plazo.`
        : `Calidad estratégica baja (${m.calidad}/100): patrón defensivo, prioriza la protección del negocio actual frente a la creación del futuro.`);
    frases.push(m.profundidad >= 70
      ? `Razonamientos sólidos (media de ${m.wAvg} palabras por decisión) que citan los datos consultados.`
      : `Razonamientos mejorables (media de ${m.wAvg} palabras por decisión): se recomienda exigir referencias explícitas a los datos del caso.`);
    const d3 = decisiones[2];
    if (d3) frases.push(d3.opcion === "A"
      ? `En la Decisión 3 (crisis Qwikster) eligió la opción real, que fue un error empresarial: punto interesante para la discusión en aula.`
      : d3.opcion === "B"
        ? `En la Decisión 3 evitó el error real de la compañía y priorizó al cliente: criterio propio frente a la historia.`
        : `En la Decisión 3 optó por revertir precios: protege la relación con el cliente a costa de la financiación del contenido.`);
    frases.push(`Tiempo medio por decisión: ${fmtMin(m.tiempoTotal / decisiones.length)}. Coincidencia con la decisión real: ${m.coincid} de ${decisiones.length}.`);
  }
  return frases.join(" ");
}

/* ============================================================
   Estado y navegación
   ============================================================ */
const S = {
  lang: "es",
  role: null,
  stepIdx: 0,
  caseStartTs: null,
  stepEnterTs: null,
  decisiones: [],
  dataViews: 0,
  selOpt: null,
  timerInt: null,
  decTimerInt: null,
  profOvInt: null,
  isCombined: false,
  layoutDatos: "stack",
};

function show(id) {
  $$(".screen").forEach(s => s.classList.remove("visible"));
  $(id).classList.add("visible");
  window.scrollTo({ top: 0 });
}

function setRole(role) {
  S.role = role;
  const badge = $("#roleBadge"), exit = $("#btnExit");
  if (!role) { badge.style.display = "none"; exit.style.display = "none"; return; }
  badge.style.display = "inline-block";
  exit.style.display = "inline-block";
  badge.textContent = role === "prof" ? t("profBadge") : t("studentBadge");
  badge.classList.toggle("prof", role === "prof");
}

function demoNote(html) {
  const n = $("#demoNote");
  $("#demoNoteTxt").innerHTML = html;
  n.style.display = "block";
}

function pararTimers() {
  clearInterval(S.timerInt); clearInterval(S.decTimerInt); clearInterval(S.profOvInt);
  S.timerInt = S.decTimerInt = S.profOvInt = null;
}

function wireProfFrame(paso) {
  const ovs = paso.avatarOverlays || [];
  const vid = document.getElementById("profVid");
  const playBtn = document.getElementById("profVidPlay");
  let curSeg = 0;

  ovs.forEach(o => { if (typeof o.dur !== "number") o.dur = 5; });

  const aoKey = "iese_avov_v2_" + (paso.videoSrc || paso.titulo);
  try {
    const saved = JSON.parse(localStorage.getItem(aoKey) || "null");
    if (Array.isArray(saved) && saved.length === ovs.length) {
      saved.forEach((s, i) => {
        if (typeof s === "number") { ovs[i].t = s; }
        else if (s && typeof s === "object") { if (typeof s.t === "number") ovs[i].t = s.t; if (typeof s.dur === "number") ovs[i].dur = s.dur; }
      });
    }
  } catch (e) {}
  const guardarAo = () => { try { localStorage.setItem(aoKey, JSON.stringify(ovs.map(o => ({ t: o.t, dur: o.dur })))); } catch (e) {} };

  const revelar = (segs) => {
    curSeg = segs;
    ovs.forEach((o, i) => {
      const el = document.getElementById(`pov_${i}`);
      if (el) el.classList.toggle("show", segs >= o.t && segs < o.t + o.dur);
    });
  };

  let useVid = !!vid;

  const arrancarTimer = () => {
    if (!ovs.length || S.profOvInt) return;
    const t0 = Date.now();
    const fin = Math.max(...ovs.map(o => o.t + o.dur)) + 1;
    S.profOvInt = setInterval(() => {
      const segs = (Date.now() - t0) / 1000;
      revelar(segs);
      if (segs > fin) { clearInterval(S.profOvInt); S.profOvInt = null; }
    }, 300);
  };

  if (vid) {
    const fb = document.getElementById("profFallback");
    if (playBtn) playBtn.onclick = () => { vid.play().catch(() => {}); };
    vid.addEventListener("loadeddata", () => { if (fb) fb.style.display = "none"; });
    vid.addEventListener("play", () => { if (playBtn) playBtn.style.display = "none"; });
    vid.addEventListener("pause", () => { if (playBtn && vid.currentTime < 0.1) playBtn.style.display = "flex"; });
    vid.addEventListener("timeupdate", () => { if (useVid) revelar(vid.currentTime); });
    vid.addEventListener("seeked", () => { if (useVid) revelar(vid.currentTime); });
    vid.addEventListener("error", () => {
      useVid = false;
      vid.style.display = "none";
      if (playBtn) playBtn.style.display = "none";
      arrancarTimer();
    });
  } else {
    arrancarTimer();
  }

  const aoetBtn = document.getElementById("aoet");
  const aoEditor = document.getElementById("aoe");
  if (aoetBtn && aoEditor) {
    aoetBtn.onclick = () => {
      const vis = aoEditor.style.display !== "none";
      aoEditor.style.display = vis ? "none" : "block";
      aoetBtn.classList.toggle("active", !vis);
    };
    const flashAo = () => {
      const sv = document.getElementById("aoesaved");
      if (sv) { sv.textContent = S.lang === 'es' ? "✓ Guardado" : "✓ Saved"; setTimeout(() => { if (sv) sv.textContent = ""; }, 1600); }
    };
    document.querySelectorAll(".aoe-start[data-aidx]").forEach(inp => {
      inp.addEventListener("input", () => {
        const i = parseInt(inp.dataset.aidx);
        ovs[i].t = Math.max(0, parseInt(inp.value) || 0);
        const mm = document.getElementById(`aoemm_${i}`);
        if (mm) mm.textContent = fmtTime(ovs[i].t);
        revelar(curSeg); guardarAo(); flashAo();
      });
    });
    document.querySelectorAll(".aoe-dur[data-aidx]").forEach(inp => {
      inp.addEventListener("input", () => {
        const i = parseInt(inp.dataset.aidx);
        ovs[i].dur = Math.max(1, parseInt(inp.value) || 1);
        revelar(curSeg); guardarAo(); flashAo();
      });
    });
    document.querySelectorAll(".ove-now[data-aidx]").forEach(b => {
      b.onclick = () => {
        const i = parseInt(b.dataset.aidx);
        const t = Math.round((useVid && vid) ? vid.currentTime : curSeg);
        ovs[i].t = t;
        const inp = document.querySelector(`.aoe-start[data-aidx="${i}"]`);
        if (inp) inp.value = t;
        const mm = document.getElementById(`aoemm_${i}`);
        if (mm) mm.textContent = fmtTime(t);
        revelar(curSeg); guardarAo(); flashAo();
      };
    });
    const exp = document.getElementById("aoeexp");
    const out = document.getElementById("aoeout");
    if (exp && out) exp.onclick = () => {
      const json = "avatarOverlays: [\n" + ovs.map(o =>
        `  { t: ${o.t}, dur: ${o.dur}, dato: ${JSON.stringify(o.dato)}, sub: ${JSON.stringify(o.sub)} },`
      ).join("\n") + "\n],";
      out.style.display = "block"; out.value = json; out.select();
      try { navigator.clipboard.writeText(json); } catch (e) {}
    };
  }
}

/* ============================================================
   Pantalla: Login
   ============================================================ */
function renderLogin() {
  pararTimers();
  setRole(null);
  $("#screen-login").innerHTML = `
    <div class="login-hero">
      <div class="login-inner">
        <div class="kicker">${t('kicker')}</div>
        <h1>${t('heroTitle')}</h1>
        <p class="sub">${t('heroSub')}</p>
      </div>
    </div>
    <div class="login-cards">
      <div class="login-card" id="goStudent">
        <div class="ic"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg></div>
        <h2>${t('studentTitle')}</h2>
        <p>${t('studentDesc')}</p>
        <span class="cta">${t('studentCta')}&nbsp;&nbsp;&#10142;</span>
      </div>
      <div class="login-card" id="goProf">
        <div class="ic"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="14" rx="1"/><path d="M7 13l3-4 2.5 2.5L17 7"/><path d="M8 21h8M12 17v4"/></svg></div>
        <h2>${t('profTitle')}</h2>
        <p>${t('profDesc')}</p>
        <span class="cta">${t('profCta')}&nbsp;&nbsp;&#10142;</span>
      </div>
    </div>
    <div class="login-stats">
      <div class="stat-card">
        <div class="ic"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5"/></svg></div>
        <div class="num">${t('stat1Num')}</div>
        <div class="lbl">${t('stat1Title')}</div>
      </div>
      <div class="stat-card">
        <div class="ic"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 20V10M12 20V4M18 20v-7"/></svg></div>
        <div class="num">${t('stat2Num')}</div>
        <div class="lbl">${t('stat2Title')}</div>
      </div>
      <div class="stat-card">
        <div class="ic"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l2.4 4.9L20 8l-4 3.9.9 5.6L12 14.8 7.1 17.5 8 11.9 4 8l5.6-1.1z"/></svg></div>
        <div class="num">${t('stat3Num')}</div>
        <div class="lbl">${t('stat3Title')}</div>
      </div>
    </div>`;
  $("#goStudent").onclick = () => { setRole("alumno"); renderStudentHome(); show("#screen-student-home"); };
  $("#goProf").onclick = () => { setRole("prof"); renderProfessor(); show("#screen-professor"); };
  show("#screen-login");
  demoNote(t('demoNote'));
}

/* ============================================================
   Catálogo del alumno
   ============================================================ */
function renderStudentHome() {
  pararTimers();
  $("#screen-student-home").innerHTML = `
    <div class="crumbs">${t('crumbsHome')}</div>
    <div class="section">
      <div class="section-head">
        <div class="kicker">${t('assignedCases')}</div>
        <h1>${t('welcomeTitle')}</h1>
        <p class="lead">${t('welcomeSub')}</p>
      </div>
      <div class="case-grid">
        <div class="case-card active" id="openCase">
          <div class="case-img" style="background:linear-gradient(160deg,#1a1a1a 30%,#5a0009),radial-gradient(circle at 80% 20%,#e2001a55,transparent)">
            <span class="tag">${t('caseNewTag')}</span>
          </div>
          <div class="case-body">
            <h3>${C_ACTIVE.titulo}</h3>
            <div class="meta">${C_ACTIVE.empresa} · ${C_ACTIVE.periodo} · ${C_ACTIVE.duracion} · ${C_ACTIVE.decisiones} ${S.lang === 'es' ? 'decisiones' : 'decisions'}</div>
            <p class="desc">${C_ACTIVE.resumen}</p>
            <div class="case-foot">
              <div class="pills">${C_ACTIVE.areas.map(a => `<span class="pill">${a}</span>`).join("")}</div>
            </div>
            <div style="margin-top:22px"><button class="btn">${t('caseStartBtn')} <span class="arr">&#10142;</span></button></div>
          </div>
        </div>
        <div class="case-card locked">
          <div class="case-img" style="background:linear-gradient(160deg,#26282e,#3c4a5a)"><span class="tag soon">${t('caseSoonTag')}</span></div>
          <div class="case-body">
            <h3>${t('caseZaraTitle')}</h3>
            <div class="meta">${S.lang === 'en' ? 'Inditex · 1985 – 2012 · Operations' : 'Inditex · 1985 – 2012 · Operaciones'}</div>
            <p class="desc">${t('caseZaraDesc')}</p>
            <div class="case-foot"><div class="pills">${S.lang === 'en' ? '<span class="pill">Operations</span><span class="pill">Marketing</span>' : '<span class="pill">Operaciones</span><span class="pill">Marketing</span>'}</div></div>
          </div>
        </div>
        <div class="case-card locked">
          <div class="case-img" style="background:linear-gradient(160deg,#2e2618,#6b5426)"><span class="tag soon">${t('caseSoonTag')}</span></div>
          <div class="case-body">
            <h3>${t('caseLegoTitle')}</h3>
            <div class="meta">${S.lang === 'en' ? 'LEGO Group · 2003 – 2015 · Transformation' : 'LEGO Group · 2003 – 2015 · Transformación'}</div>
            <p class="desc">${t('caseLegoDesc')}</p>
            <div class="case-foot"><div class="pills">${S.lang === 'en' ? '<span class="pill">Strategy</span><span class="pill">Innovation</span>' : '<span class="pill">Estrategia</span><span class="pill">Innovación</span>'}</div></div>
          </div>
        </div>
      </div>
    </div>`;
  $("#openCase").onclick = empezarCaso;
}

/* ============================================================
   Player del caso
   ============================================================ */
function empezarCaso() {
  S.stepIdx = 0;
  S.caseStartTs = Date.now();
  S.decisiones = [];
  S.dataViews = 0;
  S.isCombined = false;
  renderPlayer();
  show("#screen-player");
  demoNote(t('demoNoteTimeline'));
}

function detectaCombined(idx) {
  const paso = C_ACTIVE.pasos[idx];
  const next = C_ACTIVE.pasos[idx + 1];
  if (!next) return false;
  return (paso.tipo === "video" && next.tipo === "datos") ||
         (paso.tipo === "profesor" && next.tipo === "datos");
}

function renderSidebar() {
  const paso = C_ACTIVE.pasos[S.stepIdx];
  const faseAct = paso.fase;
  const idxFaseAct = FASES.indexOf(faseAct);
  const pct = Math.round((S.stepIdx / (C_ACTIVE.pasos.length - 1)) * 100);
  
  return `
    <aside class="player-side">
      <div class="case-mini">${t('caseInProgress')}</div>
      <h2>${C_ACTIVE.titulo}</h2>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="progress-lbl">${pct}% ${t('progressCompleted')} · ${t('progressStep')} ${S.stepIdx + 1} ${t('progressOf')} ${C_ACTIVE.pasos.length}</div>
      <ul class="phase-list">
        ${FASES.map((f, i) => `<li class="${i < idxFaseAct ? "done" : i === idxFaseAct ? "now" : ""}">${tFase(f)}</li>`).join("")}
      </ul>
      <div class="side-timer">
        <div class="t-lbl">${t('sessionTime')}</div>
        <div class="t-val" id="sessionTimer">0:00</div>
      </div>
    </aside>`;
}

function renderPlayer(soloRelayout) {
  const paso = C_ACTIVE.pasos[S.stepIdx];
  const nextPaso = C_ACTIVE.pasos[S.stepIdx + 1];
  S.isCombined = detectaCombined(S.stepIdx);
  if (!soloRelayout) S.stepEnterTs = Date.now();
  S.selOpt = null;
  pararTimers();
  const contar = !soloRelayout;

  let cuerpo = "";
  let ancho = false;
  if (S.isCombined && paso.tipo === "video") {
    if (contar) S.dataViews++;
    cuerpo = vistaVideoConDatos(paso, nextPaso);
    ancho = true;
  } else if (S.isCombined && paso.tipo === "profesor") {
    if (contar) S.dataViews++;
    cuerpo = vistaProfConDatos(paso, nextPaso);
    ancho = true;
  } else if (paso.tipo === "profesor") {
    cuerpo = vistaProfesorIA(paso);
  } else if (paso.tipo === "video") {
    cuerpo = vistaCineVideo(paso);
    ancho = true;
  } else if (paso.tipo === "datos") {
    if (contar) S.dataViews++;
    cuerpo = vistaDatos(paso);
  } else if (paso.tipo === "decision") {
    cuerpo = vistaDecision(paso);
  } else if (paso.tipo === "real") {
    cuerpo = vistaReal(paso);
    ancho = true;
  }

  $("#screen-player").innerHTML = `<div class="player">${renderSidebar()}<div class="player-main${ancho ? " wide" : ""}">${cuerpo}</div></div>`;

  S.timerInt = setInterval(() => {
    const el = $("#sessionTimer");
    if (el) el.textContent = fmtTime((Date.now() - S.caseStartTs) / 1000);
  }, 1000);

  wirePaso(paso);
}

function translateOverlayData(text) {
  if (S.lang !== 'en') return text;
  if (text === 'Enero 2007') return 'January 2007';
  if (text === 'Punto de partida del caso') return 'Starting point of the case';
  if (text === 'Suscriptores de Netflix') return 'Netflix subscribers';
  if (text === 'Tiendas de Blockbuster') return 'Blockbuster stores';
  if (text === 'Las tomarás tú') return 'You will make them';
  if (text === '4 decisiones') return '4 decisions';
  return text;
}

function profScreenHTML(paso, ratio) {
  const ov = (paso.avatarOverlays || []).map((o, i) =>
    `<div class="prof-ov" id="pov_${i}"><div class="pov-dato">${translateOverlayData(o.dato)}</div><div class="pov-sub">${translateOverlayData(o.sub)}</div></div>`
  ).join("");
  const fallback =
    `<div class="prof-cam-fallback" id="profFallback">
       <div class="prof-cam-rings"><span></span><span></span><span></span></div>
       <div class="prof-cam-ava">
         <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.3">
           <circle cx="12" cy="9" r="3.4"/><path d="M5.5 20c.6-3.4 3.2-5.2 6.5-5.2s5.9 1.8 6.5 5.2"/>
         </svg>
       </div>
     </div>`;
  const videoLayer = paso.videoSrc
    ? `<video class="prof-cam-video" id="profVid" src="${paso.videoSrc}" playsinline preload="metadata"></video>
       <button class="prof-cam-play" id="profVidPlay" aria-label="Reproducir">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>
       </button>`
    : "";
  const inner = fallback + videoLayer;
  return `
    <div class="prof-cam-screen" style="aspect-ratio:${ratio || "9/16"}">
      ${inner}
      <div class="cinema-badge" style="top:12px;left:12px">${paso.videoSrc ? t('avatarIaBadge') : t('avatarIaBadge').toUpperCase()}</div>
      <div class="prof-ov-wrap">${ov}</div>
    </div>`;
}

function vistaProfesorIA(paso) {
  return `
    <div class="step-fase">${tFase(paso.fase)}</div>
    <div class="step-title">${tTitle(paso.titulo)}</div>
    <div class="prof-cinema">
      <div class="prof-cam-wrap">
        ${profScreenHTML(paso, "9/16")}
        <div class="prof-cam-info">
          <div class="prof-cam-badge"><span class="rec-dot"></span>${paso.videoSrc ? (S.lang === 'es' ? 'Vídeo del profesor' : 'Professor video') : t('live')}</div>
          <div class="prof-cam-name">Prof. A. Valls</div>
          <div class="prof-cam-role">${t('profDept')}</div>
          ${paso.videoSrc ? '' : `<span class="prof-cam-ia-tag">${t('formatIaTag')}</span>`}
        </div>
      </div>
      <div class="prof-speech-area">
        <div class="prof-bubble" id="profText" title="${S.lang === 'es' ? 'Haz clic para mostrar todo el texto' : 'Click to show all text'}"></div>
        <div class="prof-speech-hint">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 010 7M19 5a9 9 0 010 14"/></svg>
          ${paso.videoSrc ? t('profSpeechHint') : (S.lang === 'es' ? 'El avatar IA narraría este bloque con voz y vídeo 9:16. Haz clic en el texto para completarlo.' : 'The AI avatar would narrate this block with voice and 9:16 video. Click on the text to complete it.')}
        </div>
        ${(!paso.videoSrc && paso.avatarOverlays && paso.avatarOverlays.length) ? `
        <div class="transcript-bar" style="margin-top:18px">
          <button class="ov-edit-toggle" id="aoet" style="border-left:none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>
            ${t('aoetBtn')}
          </button>
          <div class="ov-editor" id="aoe" style="display:none">
            <div class="ove-head">${t('aoeTitle')}</div>
            <div class="ove-help">${t('aoeHelp')}</div>
            ${paso.avatarOverlays.map((o, i) => `
              <div class="ove-row">
                <div class="ove-info"><span class="dat">${translateOverlayData(o.dato)}</span> · ${translateOverlayData(o.sub)}</div>
                <label class="ove-field">${t('aoeAppears')}
                  <input type="number" min="0" step="1" class="aoe-start" data-aidx="${i}" value="${o.t}">
                  <span class="mmss" id="aoemm_${i}">${fmtTime(o.t)}</span>
                </label>
                <label class="ove-field">${t('aoeDuration')}
                  <input type="number" min="1" step="1" class="aoe-dur" data-aidx="${i}" value="${o.dur || 5}"> s
                </label>
                <button class="ove-now" data-aidx="${i}">${t('aoeNow')}</button>
              </div>`).join("")}
            <div class="ove-actions"><button class="btn sec" style="padding:9px 16px" id="aoeexp">${t('aoeExport')}</button><span class="ove-saved" id="aoesaved"></span></div>
            <textarea class="ove-out" id="aoeout" readonly style="display:none"></textarea>
          </div>
        </div>` : ""}
      </div>
    </div>
    <div class="step-actions"><button class="btn" id="btnNext">${t('btnContinue')} <span class="arr">&#10142;</span></button></div>`;
}

function vistaCineVideo(paso) {
  const id = `v${S.stepIdx}`;
  return `
    <div class="step-fase">${tFase(paso.fase)}</div>
    <div class="step-title">${tTitle(paso.titulo)}</div>
    ${cinePlayerHTML(paso, id)}
    <div class="step-actions" style="margin-top:16px"><button class="btn" id="btnNext">${t('btnContinue')} <span class="arr">&#10142;</span></button></div>`;
}

function vistaVideoConDatos(video, datos) {
  const id = `v${S.stepIdx}`;
  const modo = S.layoutDatos || "stack";
  const toggle = `
    <div class="layout-toggle">
      <span class="lt-lbl">${t('layoutLabel')}</span>
      <button class="lt-btn ${modo === "stack" ? "act" : ""}" onclick="setLayoutDatos('stack')">${t('layoutVideoTop')}</button>
      <button class="lt-btn ${modo === "split" ? "act" : ""}" onclick="setLayoutDatos('split')">${t('layoutVideoSide')}</button>
    </div>`;
  const head = `
    <div class="step-fase">${tFase(video.fase)}</div>
    <div class="vd-title-row">
      <div class="step-title" style="margin-bottom:0">${tTitle(video.titulo)}</div>
      ${toggle}
    </div>`;

  let body;
  if (modo === "split") {
    body = `
    <div class="vd-split">
      <div class="vd-left">${cinePlayerHTML(video, id)}</div>
      <div class="vd-right">
        <div class="vd-datos-head">
          <div class="vd-kicker">${t('dataContextKicker')}</div>
          <div class="vd-tit">${S.lang === 'en' ? (datos.tituloEN || datos.titulo) : datos.titulo}</div>
          <p>${S.lang === 'en' ? (datos.introEN || datos.intro) : datos.intro}</p>
        </div>
        <div class="data-grid">${datos.bloques.map(renderBloqueDatos).join("")}</div>
      </div>
    </div>`;
  } else {
    body = `
    <div class="vd-stack">
      <div class="vd-video-hero">${cinePlayerHTML(video, id)}</div>
      <div class="vd-datos-head vd-datos-head-row">
        <div>
          <div class="vd-kicker">${t('dataContextKicker')}</div>
          <div class="vd-tit">${S.lang === 'en' ? (datos.tituloEN || datos.titulo) : datos.titulo}</div>
        </div>
        <p>${S.lang === 'en' ? (datos.introEN || datos.intro) : datos.intro}</p>
      </div>
      <div class="data-row">${datos.bloques.map(renderBloqueDatos).join("")}</div>
    </div>`;
  }

  return head + body +
    `<div class="step-actions" style="margin-top:24px"><button class="btn" id="btnNext">${t('btnAnalyzed')} <span class="arr">&#10142;</span></button></div>`;
}

function setLayoutDatos(mode) {
  S.layoutDatos = mode;
  renderPlayer(true);
  window.scrollTo({ top: 0 });
}

function vistaProfConDatos(prof, datos) {
  return `
    <div class="step-fase">${tFase(prof.fase)}</div>
    <div class="step-title">${tTitle(prof.titulo)}</div>
    <div class="pd-split">
      <div class="pd-left">
        ${profScreenHTML(prof, "3/4")}
        <div class="prof-cam-info">
          <div class="prof-cam-badge"><span class="rec-dot"></span>${t('live')}</div>
          <div class="prof-cam-name">Prof. A. Valls</div>
          <div class="prof-cam-role">${t('profDept')}</div>
          <span class="prof-cam-ia-tag">${t('avatarIaBadge').toUpperCase()}</span>
        </div>
      </div>
      <div class="pd-right">
        <div class="prof-bubble" id="profText" title="${S.lang === 'es' ? 'Haz clic para mostrar todo el texto' : 'Click to show all text'}" style="margin-bottom:24px"></div>
        <div class="vd-datos-head">
          <div class="vd-kicker">${S.lang === 'en' ? 'Case data' : 'Datos del caso'}</div>
          <div class="vd-tit">${S.lang === 'en' ? (datos.tituloEN || datos.titulo) : datos.titulo}</div>
          <p>${S.lang === 'en' ? (datos.introEN || datos.intro) : datos.intro}</p>
        </div>
        <div class="data-grid">${datos.bloques.map(renderBloqueDatos).join("")}</div>
      </div>
    </div>
    <div class="step-actions" style="margin-top:20px"><button class="btn" id="btnNext">${t('btnAnalyzed')} <span class="arr">&#10142;</span></button></div>`;
}

function vistaDatos(paso) {
  return `
    <div class="step-fase">${tFase(paso.fase)}</div>
    <div class="step-title">${tTitle(paso.titulo)}</div>
    <div class="data-intro">${S.lang === 'en' ? (paso.introEN || paso.intro) : paso.intro}</div>
    <div class="data-grid">${paso.bloques.map(renderBloqueDatos).join("")}</div>
    <div class="step-actions"><button class="btn" id="btnNext">${t('btnAnalyzed')} <span class="arr">&#10142;</span></button></div>`;
}

function vistaDecision(paso) {
  return `
    <div class="step-fase">${tFase(paso.fase)} · ${t('decisionMoment', paso.momento, C_ACTIVE.decisiones)}</div>
    <div class="step-title">${tTitle(paso.titulo)}</div>
    <div class="decision-head">
      <div class="dh-l">
        <div class="anio">${paso.anio} · ${t('decisionTitle')}</div>
        <div class="ctx">${S.lang === 'en' ? (paso.contextoEN || paso.contexto) : paso.contexto}</div>
      </div>
      <div class="decision-timer">
        <div class="lbl">${t('decisionTimer')}</div>
        <div class="val" id="decTimer">0:00</div>
      </div>
    </div>
    <div class="opt-grid">
      ${paso.opciones.map(o => {
        const trans = translateOption(paso.momento - 1, o);
        return `
        <button class="opt" data-opt="${trans.id}">
          <span class="letter">${trans.id}</span>
          <span><h5>${trans.titulo}</h5><p>${trans.desc}</p></span>
          <span class="risk r-${trans.riesgo.toLowerCase().replace(" ", "-")}">${t('riskLabel')} ${translateRisk(trans.riesgo)}</span>
        </button>`;
      }).join("")}
    </div>
    <div class="reason-box">
      <label>${t('reasonLabel')} <span>${t('reasonRequired')}</span></label>
      <textarea id="reasonTxt" placeholder="${t('reasonPlaceholder')}"></textarea>
      <div class="reason-hint" id="reasonHint">${t('reasonHintEmpty')}</div>
    </div>
    <div class="conf-box">
      <label>${t('confidenceLabel')}</label>
      <div class="conf-row">
        <input type="range" min="0" max="100" step="5" value="60" id="confSlider" class="conf-slider">
        <span class="conf-val" id="confVal">60%</span>
      </div>
      <div class="conf-scale"><span>${t('confidenceScaleLow')}</span><span>${t('confidenceScaleHigh')}</span></div>
      <div class="conf-hint">${t('confidenceHint')}</div>
    </div>
    <div class="step-actions"><button class="btn" id="btnConfirm" disabled>${t('btnConfirm')} <span class="arr">&#10142;</span></button></div>`;
}

function vistaReal(paso) {
  const id = `r${S.stepIdx}`;
  const momentoIdx = S.decisiones.length - 1;
  const dec = S.decisiones[momentoIdx];
  const coincide = dec && dec.opcion === paso.opcionReal;
  const opReal = DECISION_STEPS[momentoIdx].opciones.find(o => o.id === paso.opcionReal);
  const transOpReal = translateOption(momentoIdx, opReal);
  
  const matchesText = t('realMatch', coincide, paso.opcionReal, transOpReal.titulo);

  return `
    <div class="step-fase">${tFase(paso.fase)}</div>
    <div class="step-title">${tTitle(paso.titulo)}</div>
    <div class="real-banner">&#9679; ${t('realBanner')}</div>
    <div class="match-banner ${coincide ? "si" : "no"}">
      ${matchesText}
    </div>
    <div class="real-texto">${S.lang === 'en' ? (paso.textoEN || paso.texto) : paso.texto}</div>
    <div class="vd-split" style="margin-top:18px">
      <div>${cinePlayerHTML(paso, id)}</div>
      <div>${renderBloqueDatos(paso.impacto)}</div>
    </div>
    <div class="step-actions" style="margin-top:16px"><button class="btn" id="btnNext">${t('btnContinue')} <span class="arr">&#10142;</span></button></div>`;
}

function wirePaso(paso) {
  if (paso.tipo === "profesor" || S.isCombined) {
    const el = document.getElementById("profText");
    if (el) {
      const txt = paso.texto;
      let i = 0, done = false;
      const tick = () => {
        if (done) return;
        i += 3;
        if (i >= txt.length) { el.textContent = txt; done = true; return; }
        el.innerHTML = txt.slice(0, i) + '<span class="cursor"></span>';
        setTimeout(tick, 16);
      };
      tick();
      el.onclick = () => { done = true; el.textContent = txt; };
    }
  }

  if (paso.tipo === "profesor" || S.isCombined) {
    wireProfFrame(paso);
  }

  if (paso.tipo === "video" || (S.isCombined && paso.tipo === "video")) {
    wireCinePlayer(paso, `v${S.stepIdx}`);
  }
  if (paso.tipo === "real") {
    wireCinePlayer(paso, `r${S.stepIdx}`);
  }

  if (paso.tipo === "decision") {
    S.decTimerInt = setInterval(() => {
      const el = document.getElementById("decTimer");
      if (el) el.textContent = fmtTime((Date.now() - S.stepEnterTs) / 1000);
    }, 1000);
    const valida = () => {
      const w = palabras(document.getElementById("reasonTxt")?.value || "");
      const ok = S.selOpt && w >= 15;
      const btn = document.getElementById("btnConfirm");
      if (btn) btn.disabled = !ok;
      const hint = document.getElementById("reasonHint");
      if (hint) hint.textContent = !S.selOpt
        ? t('reasonHintEmpty')
        : w < 15 ? t('reasonHintSelected', S.selOpt, w)
                 : t('reasonHintReady', S.selOpt, w);
    };
    $$(".opt").forEach(b => b.onclick = () => {
      $$(".opt").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      S.selOpt = b.dataset.opt;
      valida();
    });
    const rt = document.getElementById("reasonTxt");
    if (rt) rt.oninput = valida;
    const cs = document.getElementById("confSlider");
    const cv = document.getElementById("confVal");
    if (cs && cv) cs.oninput = () => { cv.textContent = cs.value + "%"; };
    const bc = document.getElementById("btnConfirm");
    if (bc) bc.onclick = () => {
      S.decisiones.push({
        opcion: S.selOpt,
        tiempoSeg: Math.round((Date.now() - S.stepEnterTs) / 1000),
        vistasDatos: Math.max(1, S.dataViews),
        confianza: parseInt(document.getElementById("confSlider")?.value || "60"),
        razonamiento: (document.getElementById("reasonTxt")?.value || "").trim(),
      });
      S.dataViews = 0;
      avanzar();
    };
    return;
  }

  const btn = document.getElementById("btnNext");
  if (btn) btn.onclick = avanzar;
}

function avanzar() {
  if (S.stepIdx >= C_ACTIVE.pasos.length - 1) { terminarCaso(); return; }
  S.stepIdx += S.isCombined ? 2 : 1;
  if (S.stepIdx >= C_ACTIVE.pasos.length) { terminarCaso(); return; }
  renderPlayer();
  window.scrollTo({ top: 0 });
}

function terminarCaso() {
  pararTimers();
  const m = calcularMetricas(S.decisiones);
  try {
    localStorage.setItem("iese_live_session", JSON.stringify({
      id: "live", nombre: S.lang === 'es' ? "Alumno demo (tú)" : "Demo Student (you)", programa: "MBA · Sección B",
      estado: "completado", live: true,
      fecha: new Date().toLocaleString(S.lang === 'es' ? "es-ES" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      decisiones: S.decisiones,
    }));
  } catch (e) { }

  const path = S.decisiones.map(d => d.opcion);
  $("#screen-final").innerHTML = `
    <div class="final-hero">
      <div class="final-hero-in">
        <div class="kicker">${t('finalTitle')}</div>
        <h1>${C_ACTIVE.titulo}</h1>
        <p>${t('finalSub')}</p>
      </div>
    </div>
    <div class="score-strip">
      <div class="score-card">
        <div class="lbl">${t('evalGlobal')}</div>
        <div class="val">${m.global}<small>/100</small></div>
        <div class="det">${t('evalGlobalDet')}</div>
      </div>
      <div class="score-card">
        <div class="lbl">${t('evalStrategic')}</div>
        <div class="val">${m.calidad}<small>/100</small></div>
        <div class="det">${t('evalStrategicDet')}</div>
      </div>
      <div class="score-card">
        <div class="lbl">${t('evalMatch')}</div>
        <div class="val">${m.coincid}<small>/${C_ACTIVE.decisiones}</small></div>
        <div class="det">${t('evalMatchDet')}</div>
      </div>
      <div class="score-card">
        <div class="lbl">${t('evalTime')}</div>
        <div class="val">${fmtTime(m.tiempoTotal)}</div>
        <div class="det">${t('evalTimeDet', fmtMin(m.tiempoTotal / C_ACTIVE.decisiones))}</div>
      </div>
    </div>
    <div class="section">
      <div class="tree-wrap">
        <h3>${t('finalTreeTitle')}</h3>
        <div class="sub">${t('finalTreeSub', C_ACTIVE.empresa)}</div>
        ${treeSVG(path)}
      </div>
      <div class="final-cols">
        <div class="panel">
          <h3>${t('finalDecisionsTitle')}</h3>
          ${S.decisiones.map((d, i) => {
            const o = translateOption(i, buscaOpcion(i, d.opcion));
            return `<div class="dec-review">
              <div class="dr-top"><b>${S.lang === 'es' ? 'Decisión' : 'Decision'} ${i + 1} · ${tTitle(DECISION_STEPS[i].titulo)}</b>
              <span class="dr-meta">${fmtTime(d.tiempoSeg)} · ${d.razonamiento ? palabras(d.razonamiento) : 0} ${S.lang === 'es' ? 'palabras' : 'words'}</span></div>
              <div class="dr-pick"><b>${d.opcion}</b> — ${o.titulo}</div>
              <span class="chip ${o.esReal ? "real" : "alt"}">${o.esReal ? (S.lang === 'es' ? "Coincide con la decisión real" : "Matches the real decision") : (S.lang === 'es' ? "Camino alternativo" : "Alternative path")}</span>
            </div>`;
          }).join("")}
        </div>
        <div class="panel">
          <h3>${t('finalCompetenciesTitle')}</h3>
          ${radarChart([m.comp.vision, m.comp.riesgo, m.comp.datos, m.comp.cliente, m.comp.analisis], mediaClase().radar)}
          <div class="legend">
            <span class="li"><span class="sw" style="background:${COL.rojo}"></span>${t('finalYouLegend')}</span>
            <span class="li"><span class="sw" style="background:#9a9a9a"></span>${t('finalClassLegend')}</span>
          </div>
        </div>
      </div>
      <div class="step-actions" style="margin-top:36px">
        <button class="btn" id="btnVerProf">${t('btnViewAsProf')} <span class="arr">&#10142;</span></button>
        <button class="btn sec" id="btnHome2">${t('btnBackHome')}</button>
      </div>
    </div>`;
  $("#btnVerProf").onclick = () => { setRole("prof"); renderProfessor(); show("#screen-professor"); };
  $("#btnHome2").onclick = renderLogin;
  show("#screen-final");
  demoNote(t('demoNoteFinal'));
}

function listaAlumnos() {
  const lista = [];
  try {
    const live = localStorage.getItem("iese_live_session");
    if (live) {
      const liveSession = JSON.parse(live);
      if (S.lang === 'en') {
        liveSession.nombre = "Demo Student (you)";
      }
      lista.push(liveSession);
    }
  } catch (e) { }
  if (S.lang === 'en') {
    return lista.concat(ALUMNOS_DEMO_EN);
  }
  return lista.concat(ALUMNOS_DEMO);
}

function mediaClase() {
  const als = listaAlumnos();
  const ms = als.map(a => calcularMetricas(a.decisiones));
  const avg = (fn) => Math.round(ms.reduce((a, m) => a + fn(m), 0) / ms.length);
  return {
    n: als.length,
    global: avg(m => m.global),
    calidad: avg(m => m.calidad),
    coincid: (ms.reduce((a, m) => a + m.coincid, 0) / ms.length),
    tiempo: avg(m => m.tiempoTotal),
    radar: ["vision", "riesgo", "datos", "cliente", "analisis"].map(k => avg(m => m.comp[k])),
  };
}

function distribucionSVG() {
  const als = listaAlumnos();
  const W = 560, H = 270, padL = 36, padB = 64, padT = 26;
  const innerH = H - padT - padB;
  const grupos = DECISION_STEPS.map((d, i) => {
    const counts = { A: 0, B: 0, C: 0 };
    als.forEach(a => counts[a.decisiones[i].opcion]++);
    return { dec: d, counts };
  });
  const max = als.length;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  const gw = (W - padL - 20) / grupos.length;
  grupos.forEach((g, i) => {
    const gx = padL + gw * i;
    ["A", "B", "C"].forEach((letra, j) => {
      const opt = g.dec.opciones.find(o => o.id === letra);
      const v = g.counts[letra];
      const bw = 30, bx = gx + gw / 2 - 1.5 * bw - 4 + j * (bw + 8);
      const h = (v / max) * innerH;
      const fill = opt.esReal ? COL.verde : COL.grisClaro;
      svg += `<rect x="${bx}" y="${H - padB - h}" width="${bw}" height="${Math.max(2, h)}" fill="${fill}"/>`;
      svg += `<text x="${bx + bw / 2}" y="${H - padB - h - 7}" font-size="11.5" font-weight="800" fill="#1a1a1a" text-anchor="middle">${v}</text>`;
      svg += `<text x="${bx + bw / 2}" y="${H - padB + 16}" font-size="11" font-weight="700" fill="#767676" text-anchor="middle">${letra}</text>`;
    });
    svg += `<text x="${gx + gw / 2}" y="${H - padB + 36}" font-size="10.5" font-weight="800" fill="#1a1a1a" text-anchor="middle">${S.lang === 'es' ? 'Decisión' : 'Decision'} ${i + 1}</text>`;
    svg += `<text x="${gx + gw / 2}" y="${H - padB + 50}" font-size="9.5" fill="#9a9a9a" text-anchor="middle">${g.dec.anio}</text>`;
  });
  svg += `<rect x="${padL}" y="6" width="11" height="11" fill="${COL.verde}"/><text x="${padL + 17}" y="16" font-size="11" font-weight="700" fill="#4a4a4a">${S.lang === 'es' ? 'Opción que tomó la empresa real' : 'Option taken by real company'}</text>`;
  return svg + "</svg>";
}

function tiemposSVG(alumno) {
  const W = 560, H = 230, padL = 46, padB = 46, padT = 24;
  const innerH = H - padT - padB, innerW = W - padL - 20;
  const als = listaAlumnos();
  const tAl = alumno.decisiones.map(d => d.tiempoSeg);
  const tMed = DECISION_STEPS.map((_, i) => Math.round(als.reduce((a, x) => a + x.decisiones[i].tiempoSeg, 0) / als.length));
  const max = Math.max(...tAl, ...tMed) * 1.2;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (let i = 0; i <= 3; i++) {
    const y = H - padB - (innerH * i) / 3;
    svg += `<line x1="${padL}" y1="${y}" x2="${W - 14}" y2="${y}" stroke="#ececec"/><text x="${padL - 7}" y="${y + 4}" font-size="10" fill="#9a9a9a" text-anchor="end">${fmtTime((max * i) / 3)}</text>`;
  }
  const slot = innerW / tAl.length, bw = 34;
  tAl.forEach((t, i) => {
    const cx = padL + slot * i + slot / 2;
    const h1 = (t / max) * innerH, h2 = (tMed[i] / max) * innerH;
    svg += `<rect x="${cx - bw - 3}" y="${H - padB - h1}" width="${bw}" height="${h1}" fill="${COL.rojo}"/>`;
    svg += `<rect x="${cx + 3}" y="${H - padB - h2}" width="${bw}" height="${h2}" fill="${COL.grisClaro}"/>`;
    svg += `<text x="${cx - bw / 2 - 3}" y="${H - padB - h1 - 6}" font-size="10" font-weight="800" fill="${COL.rojo}" text-anchor="middle">${fmtTime(t)}</text>`;
    svg += `<text x="${cx}" y="${H - padB + 17}" font-size="10.5" font-weight="700" fill="#4a4a4a" text-anchor="middle">${S.lang === 'es' ? 'Decisión' : 'Decision'} ${i + 1}</text>`;
  });
  svg += `<rect x="${padL}" y="6" width="11" height="11" fill="${COL.rojo}"/><text x="${padL + 17}" y="16" font-size="11" font-weight="700" fill="#4a4a4a">${S.lang === 'es' ? 'Alumno' : 'Student'}</text>
    <rect x="${padL + 90}" y="6" width="11" height="11" fill="${COL.grisClaro}"/><text x="${padL + 107}" y="16" font-size="11" font-weight="700" fill="#4a4a4a">${S.lang === 'es' ? 'Media de la clase' : 'Class average'}</text>`;
  return svg + "</svg>";
}

function renderProfessor() {
  pararTimers();
  const als = listaAlumnos();
  const mc = mediaClase();
  $("#screen-professor").innerHTML = `
    <div class="crumbs">${t('crumbsHome')}</div>
    <div class="section">
      <div class="section-head">
          <div class="kicker">${t('profKicker', C_ACTIVE.titulo)}</div>
          <h1>${t('profTitle')}</h1>
          <p class="lead">${t('profSub', als.length)}</p>
      </div>
      <div id="profBody"></div>
    </div>`;
  renderProfOverview();
  show("#screen-professor");
  demoNote(t('demoNoteProf'));
}



function renderProfOverview() {
  const als = listaAlumnos();
  const mc = mediaClase();
  const filas = als.map(a => {
    const m = calcularMetricas(a.decisiones);
    const mini = a.decisiones.map((d, i) => {
      const o = buscaOpcion(i, d.opcion);
      return `<span class="mb ${o.esReal ? "real" : ""}" style="height:${8 + (o.calidad / 100) * 18}px"></span>`;
    }).join("");
    return `<tr class="row-st" data-id="${a.id}">
      <td><div class="st-name"><span class="st-ava ${a.live ? "live" : ""}">${a.live ? (S.lang === 'es' ? "TÚ" : "YOU") : iniciales(a.nombre)}</span>
        <span><span class="n">${a.nombre}${a.live ? '<span class="live-tag">EN VIVO</span>' : ""}</span><br/><span class="p">${a.programa} · ${a.fecha}</span></span></div></td>
      <td><span class="score-pill ${scoreClass(m.global)}">${m.global}/100</span></td>
      <td>${m.coincid}/${C_ACTIVE.decisiones}</td>
      <td>${fmtTime(m.tiempoTotal)}</td>
      <td>${m.wAvg} ${S.lang === 'es' ? 'palabras' : 'words'}</td>
      <td><div class="mini-bars">${mini}</div></td>
      <td style="text-align:right;color:#e2001a;font-weight:800;white-space:nowrap">${t('tblViewReport')} &#10142;</td>
    </tr>`;
  }).join("");

  $("#profBody").innerHTML = `
    <div class="kpi-grid">
      <div class="kpi"><div class="lbl">${t('kpiAlumniCompleted')}</div><div class="val">${mc.n}<small>/${mc.n}</small></div><div class="sub">${t('kpiParticipation')}</div></div>
      <div class="kpi"><div class="lbl">${t('kpiAvgEvaluation')}</div><div class="val">${mc.global}<small>/100</small></div><div class="sub">${t('kpiAvgCalidad', mc.calidad)}</div></div>
      <div class="kpi"><div class="lbl">${t('kpiAvgCoincide')}</div><div class="val">${mc.coincid.toFixed(1).replace(".", S.lang === 'es' ? "," : ".")}<small>/${C_ACTIVE.decisiones}</small></div><div class="sub">${t('kpiAvgCoincideSub')}</div></div>
      <div class="kpi"><div class="lbl">${t('kpiAvgTime')}</div><div class="val">${fmtTime(mc.tiempo)}</div><div class="sub">${t('kpiAvgTimeSub', fmtMin(mc.tiempo / C_ACTIVE.decisiones))}</div></div>
    </div>
    <div class="prof-cols">
      <div class="panel"><h3>${t('profPanelWhatClassChose')}</h3>${distribucionSVG()}</div>
      <div class="panel"><h3>${t('profPanelReadings')}</h3>
        <div style="font-family:Georgia,serif;font-size:15.5px;line-height:1.7;color:#4a4a4a">
          ${t('quickReadingText')}
        </div>
      </div>
    </div>
    <div class="panel"><h3>${t('profPanelStudents')}</h3>
      <table class="students">
        <thead><tr><th>${t('tblStudent')}</th><th>${t('tblEvaluation')}</th><th>${t('tblCoincidence')}</th><th>${t('tblTimeDecisions')}</th><th>${t('tblReasoning')}</th><th>${t('tblQuality')}</th><th></th></tr></thead>
        <tbody>${filas}</tbody>
      </table>
    </div>`;
  $$("#profBody .row-st").forEach(tr => tr.onclick = () => renderProfDetail(tr.dataset.id));
}

function renderProfDetail(id) {
  const a = listaAlumnos().find(x => x.id === id);
  if (!a) return;
  const m = calcularMetricas(a.decisiones);
  const mc = mediaClase();
  const ia = S.lang === 'en' 
    ? (ANALISIS_IA_EN[id] || generarAnalisisIA(m, a.decisiones))
    : (ANALISIS_IA[id] || generarAnalisisIA(m, a.decisiones));
  const path = a.decisiones.map(d => d.opcion);

  const calIdx = indiceCalibracion(a.decisiones);
  const overconf = a.decisiones.filter((d, i) => d.confianza != null && d.confianza >= 70 && buscaOpcion(i, d.opcion).calidad < 50);
  const insegOk = a.decisiones.filter((d, i) => d.confianza != null && d.confianza <= 50 && buscaOpcion(i, d.opcion).calidad >= 70);
  let calMsg, calTipo;
  if (overconf.length >= 2) { calTipo = "danger"; calMsg = S.lang === 'es' ? `Patrón de <b>exceso de confianza</b>: ${overconf.length} decisiones tomadas con alta seguridad resultaron de baja calidad. Perfil de riesgo en un directivo — caso de aula recomendado.` : `Pattern of <b>overconfidence</b>: ${overconf.length} decisions taken with high confidence resulted in low quality. Risk profile for an executive — recommended classroom case.`; }
  else if (overconf.length === 1) { calTipo = "warn"; calMsg = S.lang === 'es' ? `Una decisión de baja calidad tomada con alta seguridad (Decisión ${a.decisiones.indexOf(overconf[0]) + 1}): trabajar el reconocimiento de incertidumbre.` : `A low quality decision taken with high confidence (Decision ${a.decisiones.indexOf(overconf[0]) + 1}): address uncertainty recognition.`; }
  else if (insegOk.length >= 2) { calTipo = "warn"; calMsg = S.lang === 'es' ? `<b>Inseguridad infundada</b>: ${insegOk.length} decisiones acertadas tomadas con baja confianza. Tiene buen criterio pero no se fía de él — trabajar la asertividad.` : `<b>Unfounded self-doubt</b>: ${insegOk.length} sound decisions taken with low confidence. Good criteria but doubts it — address assertiveness.`; }
  else { calTipo = "ok"; calMsg = S.lang === 'es' ? `Confianza bien ajustada a la calidad de sus decisiones: autoconocimiento sólido del propio criterio.` : `Confidence well calibrated with decision quality: solid self-knowledge of own criteria.`; }
  const calibBanner = calIdx == null ? "" : `
    <div class="calib-banner calib-${calTipo}">
      <div class="cbn-idx"><div class="cbn-num">${calIdx}<small>/100</small></div><div class="cbn-lbl">${t('calibrationIndex')}</div></div>
      <div class="cbn-msg"><div class="cbn-head">${t('confidenceVsSuccess')}</div><p>${calMsg}</p></div>
    </div>`;

  $("#profBody").innerHTML = `
    <div class="print-only-header" style="display:none">
      <div class="print-logo-row">
        <img src="assets/iese-logo-dark.svg" alt="IESE Business School" />
        <span class="print-title-badge">${t('kicker')}</span>
      </div>
    </div>
    <button class="btn ghost" id="btnBackProf">&#8592; ${t('btnBackToClass')}</button>
    <div class="det-head" style="margin-top:14px">
      <div class="l">
        <span class="st-ava ${a.live ? "live" : ""}">${a.live ? t('liveTag') : iniciales(a.nombre)}</span>
        <div>
          <h2>${a.nombre}${a.live ? `<span class="live-tag">${t('liveTag')}</span>` : ""}</h2>
          <div class="sub">${a.programa} · ${t('profDetailCompleted', a.fecha)} · ${t('profDetailTime', fmtTime(m.tiempoTotal))}</div>
        </div>
      </div>
      <div><span class="score-pill ${scoreClass(m.global)}" style="font-size:17px;padding:9px 20px">${t('profDetailTitle')}: ${m.global}/100</span></div>
    </div>
    <div class="ia-box">
      <div class="ia-head"><span class="dot"></span> ${t('iaTitle')}</div>
      <p>${ia}</p>
    </div>
    ${calibBanner}
    <div class="kpi-grid">
      <div class="kpi"><div class="lbl">${t('evalStrategic')}</div><div class="val">${m.calidad}<small>/100</small></div><div class="sub">${t('finalClassLegend')}: ${mc.calidad}</div></div>
      <div class="kpi"><div class="lbl">${S.lang === 'es' ? 'Profundidad de análisis' : 'Depth of analysis'}</div><div class="val">${m.profundidad}<small>/100</small></div><div class="sub">${m.wAvg} ${S.lang === 'es' ? 'palabras/decisión' : 'words/decision'} · ${m.vAvg.toFixed(1).replace(".", S.lang === 'es' ? "," : ".")} ${S.lang === 'es' ? 'vistas' : 'views'}</div></div>
      <div class="kpi"><div class="lbl">${t('evalMatch')}</div><div class="val">${m.coincid}<small>/${C_ACTIVE.decisiones}</small></div><div class="sub">${S.lang === 'es' ? 'Coincidir no es siempre acertar' : 'Matching is not always right'}</div></div>
      <div class="kpi"><div class="lbl">${S.lang === 'es' ? 'Ritmo de decisión' : 'Decision pace'}</div><div class="val">${m.ritmo}<small>/100</small></div><div class="sub">${fmtMin(m.tiempoTotal / C_ACTIVE.decisiones)} ${S.lang === 'es' ? 'de media' : 'on average'}</div></div>
    </div>
    <div class="tree-wrap">
      <h3>${t('treeTitle')}</h3>
      <div class="sub">${t('treeSub', C_ACTIVE.empresa)}</div>
      ${treeSVG(path)}
    </div>
    <div class="prof-cols" style="margin-top:26px">
      <div class="panel"><h3>${t('finalCompetenciesTitle')}</h3>
        ${radarChart([m.comp.vision, m.comp.riesgo, m.comp.datos, m.comp.cliente, m.comp.analisis], mc.radar)}
        <div class="legend">
          <span class="li"><span class="sw" style="background:${COL.rojo}"></span>${a.live ? t('radarYourLegend', t('liveTag')) : t('radarYourLegend', a.nombre)}</span>
          <span class="li"><span class="sw" style="background:#9a9a9a"></span>${t('radarClassLegend')}</span>
        </div>
      </div>
      <div class="panel"><h3>${t('timeGraphTitle')}</h3>
        ${tiemposSVG(a)}
        <div style="font-family:Georgia,serif;font-size:14px;color:#767676;margin-top:14px">${t('timeGraphSub')}</div>
      </div>
    </div>
    <div class="panel decisions-section-panel" style="margin-top:26px">
      <h3>${t('decisionsAndReasonings')}</h3>
      ${a.decisiones.map((d, i) => {
        const o = translateOption(i, buscaOpcion(i, d.opcion));
        const dec = DECISION_STEPS[i];
        const cal = calibracion(d.confianza, o.calidad);
        return `<div class="dec-detail">
          <div class="dd-head">
            <b>${S.lang === 'es' ? 'Decisión' : 'Decision'} ${i + 1} · ${tTitle(dec.titulo)} <span style="color:#9a9a9a;font-weight:600">(${dec.anio})</span></b>
            <div class="dd-meta">
              <span>⏱ ${fmtTime(d.tiempoSeg)}</span>
              <span>📊 ${d.vistasDatos || 1} ${S.lang === 'es' ? 'pantalla(s) de datos' : 'data screen(s)'}</span>
              <span>✍ ${palabras(d.razonamiento)} ${S.lang === 'es' ? 'palabras' : 'words'}</span>
              <span class="chip ${o.esReal ? "real" : "alt"}" style="margin:0">${o.esReal ? t('opcionRealText') : t('opcionAltText')}</span>
            </div>
          </div>
          <div class="dd-body">
            <div class="dd-pick">${t('eligiText', d.opcion, o.titulo, o.calidad)}</div>
            ${d.confianza != null ? `<div class="calib-row">
              <div class="calib-bars">
                <div class="cb"><span class="cb-lbl">${t('studentConf')}</span><div class="cb-track"><div class="cb-fill conf" style="width:${d.confianza}%"></div></div><span class="cb-num">${d.confianza}%</span></div>
                <div class="cb"><span class="cb-lbl">${t('realQuality')}</span><div class="cb-track"><div class="cb-fill qual" style="width:${o.calidad}%"></div></div><span class="cb-num">${o.calidad}</span></div>
              </div>
              <span class="calib-tag calib-${cal.tipo}">${translateCalibLabel(cal.tipo, cal.label)}</span>
            </div>` : ""}
            <div class="dd-reason">«${d.razonamiento}»</div>
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="step-actions">
      <button class="btn sec" id="btnBackProf2">&#8592; ${t('btnBackToClass')}</button>
      <button class="btn" onclick="window.print()">${t('exportPdfBtn')} <span class="arr">&#10142;</span></button>
    </div>`;
  document.getElementById("btnBackProf").onclick = renderProfOverview;
  document.getElementById("btnBackProf2").onclick = renderProfOverview;
  window.scrollTo({ top: 0 });
}

/* ============================================================
   Widget QR "Pruébalo en tu móvil"
   ============================================================ */
function translateQrWidget() {
  const floatBtn = $("#qrFloatBtn");
  if (floatBtn) {
    floatBtn.innerHTML = `<span class="qr-btn-icon">📱</span><span class="qr-btn-text">${t('qrFloatText')}</span>`;
  }
  const overlay = $("#qrModalOverlay");
  if (overlay) {
    const title = overlay.querySelector(".qr-modal-header h3");
    if (title) title.textContent = t('qrModalTitle');
    const subtitle = overlay.querySelector(".qr-modal-subtitle");
    if (subtitle) subtitle.textContent = t('qrModalSubtitle');
    const instr = overlay.querySelector(".qr-modal-instructions");
    if (instr) instr.textContent = t('qrModalInstructions');
    const copyBtn = overlay.querySelector(".qr-copy-btn");
    if (copyBtn) copyBtn.textContent = t('qrCopyBtn');
  }
}

function initQrWidget() {
  if ($("#qrFloatBtn")) return;

  const floatBtn = document.createElement("div");
  floatBtn.id = "qrFloatBtn";
  floatBtn.className = "qr-float-btn";
  document.body.appendChild(floatBtn);

  const overlay = document.createElement("div");
  overlay.id = "qrModalOverlay";
  overlay.className = "qr-modal-overlay";
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  overlay.innerHTML = `
    <div class="qr-modal-card">
      <span class="qr-modal-close" id="qrModalClose">×</span>
      <div class="qr-modal-header">
        <h3>${t('qrModalTitle')}</h3>
        <p class="qr-modal-subtitle">${t('qrModalSubtitle')}</p>
      </div>
      <div class="qr-modal-body">
        <div class="qr-code-container" id="qrCodeContainer"></div>
        <p class="qr-modal-instructions">${t('qrModalInstructions')}</p>
        <div class="qr-url-box">
          <span class="qr-url-text" id="qrUrlText"></span>
          <button class="qr-copy-btn" id="qrCopyBtn">${t('qrCopyBtn')}</button>
        </div>
      </div>
    </div>`;

  translateQrWidget();

  $("#qrModalClose").onclick = () => { overlay.style.display = "none"; };

  const copyBtn = $("#qrCopyBtn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        copyBtn.textContent = t('qrCopied');
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = t('qrCopyBtn');
          copyBtn.classList.remove("copied");
        }, 2000);
      });
    };
  }

  floatBtn.onclick = () => {
    const currentUrl = window.location.href;
    const qrContainer = $("#qrCodeContainer");
    const urlText = $("#qrUrlText");
    
    if (urlText) urlText.textContent = currentUrl;
    
    if (qrContainer) {
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`;
      qrContainer.innerHTML = `<img src="${qrApiUrl}" alt="QR Code" class="qr-code-img" />`;
    }
    
    overlay.style.display = "flex";
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  };
}

/* ============================================================
   Lógica Bilingüe (ES/EN)
   ============================================================ */
const TOPBAR_LINKS = {
  es: ["Agenda", "Alumni", "Estudiantes", "Emprendedores", "Talento IESE", "Empresas", "Staff", "Media"],
  en: ["Agenda", "Alumni", "Students", "Entrepreneurs", "IESE Talent", "Companies", "Staff", "Media"]
};

const FOOTER_TEXTS = {
  es: {
    left: "<b>IESE Case Experience</b> · Plataforma de simulación de casos — Demo interna",
    right: "Barcelona · Madrid · Múnich · Nueva York · São Paulo"
  },
  en: {
    left: "<b>IESE Case Experience</b> · Case simulation platform — Internal demo",
    right: "Barcelona · Madrid · Munich · New York · São Paulo"
  }
};

function translateGlobalElements() {
  const lang = S.lang || 'es';
  const linksContainer = $(".topbar .links");
  if (linksContainer) {
    linksContainer.innerHTML = TOPBAR_LINKS[lang].map(link => `<span>${link}</span>`).join("");
  }
  const footer = $(".footer");
  if (footer) {
    const divs = footer.querySelectorAll("div");
    if (divs.length >= 2) {
      divs[0].innerHTML = FOOTER_TEXTS[lang].left;
      divs[1].textContent = FOOTER_TEXTS[lang].right;
    }
  }
  const exitBtn = $("#btnExit");
  if (exitBtn) {
    exitBtn.textContent = lang === 'es' ? "Salir" : "Exit";
  }
}

const ALUMNOS_DEMO_EN = [
  {
    id: "a1",
    nombre: "Lucia Fernandez",
    programa: "MBA · Section B",
    estado: "completed",
    fecha: "Jun 10, 2026, 09:42",
    decisiones: [
      { opcion: "A", tiempoSeg: 312, vistasDatos: 3, confianza: 78, razonamiento: "Broadband is crossing 50% of households and mailing costs grow with volume: DVD has a structural ceiling. I prefer to cannibalize with control than to lose the market to a new entrant. Including it for free reduces adoption friction and gives me consumption data from day one." },
      { opcion: "A", tiempoSeg: 268, vistasDatos: 2, confianza: 75, razonamiento: "The streaming-only model is 4 times cheaper and 4 times faster to deploy. Canada works as a controlled experiment: if the value proposition without DVD does not sustain churn, I learn it by spending $30M and not $150M." },
      { opcion: "B", tiempoSeg: 421, vistasDatos: 4, confianza: 82, razonamiento: "The survey diagnosis is clear: 78% of dropouts are perception-based (abusive price + lack of respect), not product-based. It is a trust crisis, not a strategic one. Separating brands now adds friction to the customer just when they feel mistreated. CEO apology + temporary compensation protects the $200M revenue without breaking the relationship." },
      { opcion: "A", tiempoSeg: 387, vistasDatos: 3, confianza: 80, razonamiento: "The audience overlap data turns a blind bet into an informed one: 18% overlap 2 of 3 affinities. In addition, the cost of licenses doubles every year: not producing is also expensive. The financial risk is high but the risk of not differentiating is greater." }
    ]
  },
  {
    id: "a2",
    nombre: "Marc Vidal",
    programa: "MBA · Section B",
    estado: "completed",
    fecha: "Jun 10, 2026, 10:15",
    decisiones: [
      { opcion: "A", tiempoSeg: 95, vistasDatos: 1, confianza: 90, razonamiento: "If we don't do it someone else will. We have to move fast." },
      { opcion: "A", tiempoSeg: 88, vistasDatos: 1, confianza: 92, razonamiento: "Streaming is the future, DVD does not deserve more investment outside the US." },
      { opcion: "A", tiempoSeg: 121, vistasDatos: 1, confianza: 95, razonamiento: "Better to cut clean and separate the two businesses, so each goes at its own pace." },
      { opcion: "A", tiempoSeg: 102, vistasDatos: 1, confianza: 88, razonamiento: "We must differentiate with our own content, the 100M will be recovered with sign-ups." }
    ]
  },
  {
    id: "a3",
    nombre: "Sofia Marini",
    programa: "MBA · Section B",
    estado: "completed",
    fecha: "Jun 10, 2026, 11:03",
    decisiones: [
      { opcion: "C", tiempoSeg: 356, vistasDatos: 4, confianza: 50, razonamiento: "The initial catalog of 1,000 titles can damage brand perception if given away. As an optional premium, early adopters finance it and the catalog matures before mass deployment." },
      { opcion: "A", tiempoSeg: 298, vistasDatos: 3, confianza: 62, razonamiento: "The cost table is conclusive: $30M vs $150M and 6 months vs 24. The content rights risk exists but can be bounded market by market." },
      { opcion: "B", tiempoSeg: 334, vistasDatos: 4, confianza: 58, razonamiento: "The survey data points to communication, not structure. Keep single brand and compensate. Qwikster would double the operational friction for the customer." },
      { opcion: "B", tiempoSeg: 412, vistasDatos: 4, confianza: 45, razonamiento: "With the cash weakened after the crisis, committing $100M without a pilot is an existential bet. The pilot counteroffer + preferential option keeps the door open while limiting the maximum loss. I accept losing the bid if the price is survival." }
    ]
  },
  {
    id: "a4",
    nombre: "Andres Rocha",
    programa: "MBA · Section B",
    estado: "completed",
    fecha: "Jun 11, 2026, 16:40",
    decisiones: [
      { opcion: "B", tiempoSeg: 198, vistasDatos: 2, confianza: 70, razonamiento: "The DVD business is growing at 51% and is profitable. I see no reason to risk cash flow on an immature technology with 1,000 titles." },
      { opcion: "C", tiempoSeg: 176, vistasDatos: 2, confianza: 72, razonamiento: "With Hulu and Amazon pressing at home, expanding is dispersing forces. First secure the domestic market." },
      { opcion: "C", tiempoSeg: 243, vistasDatos: 3, confianza: 68, razonamiento: "The priority is to stop cancellations now. Reverting prices hurts revenues but restores trust, and they can be raised again gradually later." },
      { opcion: "C", tiempoSeg: 187, vistasDatos: 2, confianza: 75, razonamiento: "Producing is not our competence. Third-party licensing is proven content that the customer already demands." }
    ]
  },
  {
    id: "a5",
    nombre: "Chen Wei",
    programa: "MBA · Section B",
    estado: "completed",
    fecha: "Jun 11, 2026, 17:22",
    decisiones: [
      { opcion: "A", tiempoSeg: 245, vistasDatos: 2, confianza: 72, razonamiento: "Broadband penetration marks the technological tipping point. Giving it away accelerates the consumer learning curve and builds a data barrier against future entrants." },
      { opcion: "B", tiempoSeg: 312, vistasDatos: 3, confianza: 55, razonamiento: "The Canadian customer expects the full value proposition that made Netflix famous. Entering with a limited streaming catalog can burn the market. I prefer to invest more and enter with the proven offer." },
      { opcion: "B", tiempoSeg: 289, vistasDatos: 3, confianza: 70, razonamiento: "The 31% who feel 'not respected' is the key signal: it is a relationship issue. CEO shows face, compensation to affected, and maintain the pricing structure that funds content." },
      { opcion: "A", tiempoSeg: 334, vistasDatos: 3, confianza: 80, razonamiento: "Informational advantage is decisive: no competitor can value this asset with our viewership data. Paying $100M for an option that HBO values blindly is buying with an advantage." }
    ]
  }
];

const CASE_TRANSLATIONS = {
  en: {
    titulo: "Netflix: Reinvent or Die",
    subtitulo: "How to decide to cannibalize your own business before someone else does",
    sector: "Entertainment · Technology",
    resumen: "In 2007 Netflix dominates DVD rental by mail in the US, but its founder knows that the physical format has an expiration date. Over six years you will have to make the same decisions Reed Hastings faced: launch streaming, expand internationally, manage the company's biggest brand crisis, and bet —or not— 100 million dollars on original content.",
    areas: ["Strategy", "Innovation", "Marketing", "Change Management"],
    pasos: [
      // Step 0
      {
        texto: "Welcome. I am your professor for this case. We are in January 2007. Netflix has 6.3 million subscribers who receive DVDs by mail in red envelopes, and has just closed the best year in its history. Blockbuster, with 8,000 stores, is still the giant of the industry... but it is losing money. You are going to put yourself in the shoes of Reed Hastings, founder and CEO of Netflix. Throughout the case I will give you context, you will see real company data, and at four key moments, the decision will be yours. There is no turning back: just like in reality, you will decide with the information available at that moment. Your reasoning matters as much as your choice."
      },
      // Step 1
      {
        videoDe: "Recreation of the origins of Netflix (1997–2006): Reed Hastings returns a copy of 'Apollo 13' late, pays a $40 fine, and conceives a DVD-by-mail club with monthly subscription and no penalties.",
        transcript: "It's 1997 in Santa Cruz, California. Reed Hastings returns a copy of Apollo 13 late to a local Blockbuster. The late fee: forty dollars. On his way to the gym, an idea hits him: what if renting movies worked like a monthly fee, with no return dates, no penalties? Along with Marc Randolph, he launches Netflix.com in April 1998. The model: DVD-by-mail catalog, flat subscription, no stores. Amazon offers twenty-two million for the company. They reject it. By 2006, Netflix has six point three million subscribers and ships one million six hundred thousand red envelopes a day. Blockbuster has eight thousand stores and is losing money. Hastings' advantage is invisible: broadband is crossing fifty percent of American households. And he is already thinking about what comes after the DVD.",
        overlays: [
          { titulo: "The fine that changed everything", subtexto: "Late return fee at Blockbuster · 1997" },
          { titulo: "Launch of Netflix.com", subtexto: "First DVD-by-mail videoclub in the world" },
          { titulo: "Subscribers in 2006", subtexto: "The best year in its history until then" }
        ]
      },
      // Step 2
      {
        intro: "Before making any decisions, study the numbers. Netflix is growing fast, but shipping costs are rising and the DVD format is maturing.",
        bloques: [
          {
            titulo: "Netflix Subscribers (millions)",
            fuente: "Netflix Annual Reports 1999–2006",
            series: [{ nombre: "Subscribers (M)" }]
          },
          {
            titulo: "Key Indicators 2006",
            columnas: ["Indicator", "Netflix", "Blockbuster"],
            filas: [
              ["Annual revenues", "997 M$", "5,520 M$"],
              ["Net income", "+49 M$", "−74 M$"],
              ["Physical stores", "0", "≈ 8,000"],
              ["Shipping cost per DVD (round trip)", "0.78 $", "—"],
              ["Subscriber growth (year-on-year)", "+51%", "−2% (in-store rentals)"]
            ]
          },
          {
            titulo: "Broadband Penetration in US Households (%)",
            fuente: "Pew Research",
            series: [{ nombre: "% households" }]
          }
        ]
      },
      // Step 3
      {
        texto: "Your engineering team has been working for years on internet video delivery. The technology is finally viable: broadband exceeds 50% of households. But there is a problem: every dollar you invest in streaming is a dollar you don't invest in the DVD business, which is the one that pays the payroll. And worse yet: if streaming works, it will kill your own core business. It is the classic innovator's dilemma. You have 40 million dollars budgeted for this project. What do you do?"
      },
      // Step 4
      {
        contexto: "You are Reed Hastings. The board awaits your proposal on the $40M budgeted for the internet video project.",
        opciones: [
          {
            titulo: "Launch streaming now, included free in the DVD subscription",
            desc: "Deliberately cannibalize our own DVD business. Every DVD subscriber gets streaming hours at no extra cost. Small initial catalog (~1,000 titles vs. 70,000 on DVD)."
          },
          {
            titulo: "Wait 2–3 years and reinforce leadership in DVD",
            desc: "The streaming catalog is still poor and studios do not want to license. Consolidate the profitable business and enter when technology and rights mature."
          },
          {
            titulo: "Launch streaming as a separate premium paid service",
            desc: "Protect margins: streaming is charged separately ($4.99/month extra). Whoever wants it, pays for it. No DVD cannibalization."
          }
        ]
      },
      // Step 5
      {
        texto: "In January 2007 Netflix launched 'Watch Instantly': streaming included free for all DVD subscribers, with only 1,000 titles. Hastings embraced cannibalization as a strategy: 'Better do it to ourselves than have someone else do it to us'. Streaming went from a curiosity to the business engine in four years, while Blockbuster —which failed to move— filed for bankruptcy in 2010.",
        videoDe: "Recreation of the press conference in January 2007: Reed Hastings presents 'Watch Instantly' to skeptical analysts asking why he is giving streaming away.",
        transcript: "January 2007. Reed Hastings takes the stage before analysts and investors. The announcement is not what they expected: Netflix is going to give streaming away. Every subscriber on the DVD plan gets access to Watch Instantly, one thousand titles available in the browser, at no additional cost. Analysts ask: why give away a service you could charge for? Hastings answers: because if we don't do it, someone else will. It is the deliberate application of the innovator's dilemma. Streaming begins as a secondary feature. In four years it will surpass DVD as the main consumption channel. Blockbuster doesn't move. In 2010 it declares bankruptcy with eight thousand stores.",
        overlays: [
          { titulo: "Initial catalog", subtexto: "Streaming titles on launch day vs 70,000 on DVD" },
          { titulo: "Blockbuster (2010)", subtexto: "8,000 stores · Failed to respond to the streaming threat" }
        ],
        impacto: {
          titulo: "Subscribers after launch (millions)",
          series: [{ nombre: "Subscribers (M)" }]
        }
      },
      // Step 6
      {
        texto: "We jump to summer 2010. Streaming is taking off: it already accounts for more than half of your customers' consumption. Blockbuster has just filed for bankruptcy. But new rivals are appearing: Hulu, Amazon, and the studios themselves. Your board proposes international expansion. The question is not just where, but how: do you replicate the complete DVD + streaming model, or do you bet on a streaming-only model that you have never tested?"
      },
      // Step 7
      {
        intro: "Observe the change in mix: streaming is growing, but DVD still generates most of the margin. Replicating postal logistics outside the US would cost years and hundreds of millions.",
        bloques: [
          {
            titulo: "Consumption Hours by Channel (% of total)",
            fuente: "Netflix Q2 2010",
            series: [
              { nombre: "DVD by mail" },
              { nombre: "Streaming" }
            ]
          },
          {
            titulo: "Estimated Cost of Entry by Market (Canada)",
            columnas: ["Model", "Initial Investment", "Time to Launch", "Operational Risk"],
            filas: [
              ["DVD + streaming (full model)", "$120–180M", "18–24 months", "High (new postal logistics)"],
              ["Streaming only", "$25–40M", "4–6 months", "Medium (content rights)"],
              ["Do not expand yet", "$0", "—", "Competitors occupy the space"]
            ]
          },
          {
            titulo: "Annual Content License Cost ($M)",
            fuente: "Netflix 10-K",
            series: [{ nombre: "Licensing ($M)" }]
          }
        ]
      },
      // Step 8
      {
        contexto: "Canada is the candidate market: close, English-speaking, and with good broadband. The board votes on your proposal next week.",
        opciones: [
          {
            titulo: "Launch in Canada streaming-only",
            desc: "First 100% streaming market in company history. Cheap and fast, but without the massive DVD catalog: value proposition depends on the rights you secure."
          },
          {
            titulo: "Replicate the complete DVD + streaming model",
            desc: "Bring the proven value proposition to Canada. $120–180M investment and 18–24 months to set up postal logistics."
          },
          {
            titulo: "Postpone expansion and defend the US market",
            desc: "Hulu and Amazon are pushing at home. Concentrate resources on content and product for the domestic market and review expansion in 2012."
          }
        ]
      },
      // Step 9
      {
        texto: "In September 2010 Netflix launched in Canada its first streaming-only service, at $7.99/month. It was the laboratory of its future: it validated that the business worked without DVD and became the template for expansion to Latin America (2011), Europe (2012), and finally, the current 190 countries.",
        videoDe: "Recreation of the launch in Toronto, September 2010: the team celebrates the first market without red envelopes while monitoring live sign-ups.",
        transcript: "September 2010, Toronto. Netflix opens its first international market: Canada. No red envelopes. No postal logistics. Just streaming, at seven ninety-nine a month. The catalog is limited: international rights are fragmented by territory. But the experiment works: it validates that the value proposition survives without the DVD. At the Los Gatos headquarters, the team monitors the first sign-ups live. The server holds. The model is exportable. This launch is the template that will be replicated in forty-four Latin American countries in 2011, and in Europe in 2012. The model that took fifteen years to build in the United States is deployed globally in three years.",
        overlays: [
          { titulo: "1st international market", subtexto: "Streaming only · September 2010 · Toronto" },
          { titulo: "Global expansion", subtexto: "Final destination of the model started in Canada" }
        ],
        impacto: {
          titulo: "Countries with Netflix service",
          series: [{ nombre: "Countries" }]
        }
      },
      // Step 10
      {
        texto: "July 2011. You have just announced a price restructuring: separating the combined $9.99 plan into two plans of $7.99 each. For anyone wanting DVD and streaming, it is a 60% price increase. The reaction is brutal: thousands of daily cancellations, 82,000 negative comments on the corporate blog, the stock plummets, and the media calls it 'the biggest marketing blunder of the year'. Your team presents three paths. What you decide in the next few weeks will define the brand for years. And a warning: this time, what Netflix did in reality is not necessarily the best response."
      },
      // Step 11
      {
        intro: "These are the data on your desk in September 2011. The underlying question: is it a price, brand, or communication crisis?",
        bloques: [
          {
            titulo: "Netflix Stock Price ($US, monthly close 2011)",
            fuente: "NASDAQ: NFLX",
            series: [{ nombre: "US$" }]
          },
          {
            titulo: "Estimated Net Cancellations (thousands of subscribers)",
            fuente: "Netflix Q3 2011",
            series: [{ nombre: "Net drops (thousands)" }]
          },
          {
            titulo: "Diagnosis: Declared Reasons for Cancellation",
            columnas: ["Declared Reason", "% of mentions"],
            filas: [
              ["'The price increase is abusive'", "47%"],
              ["'I do not feel respected as a customer'", "31%"],
              ["'I no longer use DVD, I only wanted streaming'", "14%"],
              ["Others", "8%"]
            ]
          }
        ]
      },
      // Step 12
      {
        contexto: "The price increase is already done and reversing it completely would cost ~$200M/year in revenue. The board asks you for a structural response, not just communication.",
        opciones: [
          {
            titulo: "Separate DVD into a new company: 'Qwikster'",
            desc: "Accelerate transition: Netflix remains streaming-only, and DVD moves to a new brand with independent website, billing, and queues. Total strategic clarity."
          },
          {
            titulo: "Keep single brand, apologize, and compensate",
            desc: "Acknowledge the communication error: public letter from CEO, maintain new prices but offer 2–3 months discount to affected customers and simplify plan migration."
          },
          {
            titulo: "Revert price increase completely",
            desc: "Go back to the $9.99 combined plan. Stops the bleeding in the short term, but gives up ~$200M/year needed to buy content and fight Amazon and HBO."
          }
        ]
      },
      // Step 13
      {
        texto: "Hastings announced Qwikster in a home video recorded on a Sunday. The reaction was even worse: customers would have two websites, two bills, and two queues. Even the Twitter account @Qwikster belonged to someone else. Three weeks later, Netflix buried Qwikster without ever launching it. Total cost: 800,000 lost subscribers and a 77% drop in the stock market. The lesson: a strategically coherent decision can be a disaster if it ignores the customer.",
        videoDe: "Recreation of Reed Hastings' apology video (September 2011) and the statement three weeks later cancelling Qwikster.",
        transcript: "September 2011. Reed Hastings publishes a home video from a lawn chair. He apologizes for the price increase. And he announces something else: the DVD business will be renamed Qwikster, a completely separate company. Separate website. Separate bills. Separate movie queues. The reaction is immediate and brutal. Customers who already felt mistreated now find out they will have to manage two accounts. To make matters worse, the Twitter account at Qwikster belongs to someone else. Three weeks later, Netflix buries Qwikster without ever launching it. The total cost: eight hundred thousand subscribers lost and a seventy-seven percent drop in the stock market. The lesson: strategic coherence is not enough if execution ignores the customer.",
        overlays: [
          { titulo: "Market reaction", subtexto: "Drop in NFLX stock price between July and October 2011" },
          { titulo: "Qwikster: total duration", subtexto: "Announced and cancelled without ever launching" }
        ],
        impacto: {
          titulo: "US Subscribers (millions, 2011)",
          series: [{ nombre: "Subscribers (M)" }]
        }
      },
      // Step 14
      {
        texto: "March 2011, a few months before the crisis, an opportunity came to your desk that now, at the end of the year, is still active: the rights to a political series called 'House of Cards', with David Fincher as director and Kevin Spacey as protagonist. The problem: HBO and AMC also want it, and the production company demands an unprecedented commitment: two full seasons paid upfront, about 100 million dollars, without even filming a pilot episode. You have just lost 800,000 customers and the stock is at its lows. Your CFO is against it. What do you decide?"
      },
      // Step 15
      {
        intro: "Your hidden advantage: data. You know that the original British 'House of Cards', Fincher's films, and Spacey's films have highly overlapping audiences among your subscribers. No one else has that information.",
        bloques: [
          {
            titulo: "The Offer on the Table",
            columnas: ["Condition", "Traditional Model (Networks)", "What the Producer Demands"],
            filas: [
              ["Prior pilot episode", "Yes, always", "No — direct commitment"],
              ["Commitment", "1 season (if pilot works)", "2 seasons (26 episodes)"],
              ["Investment", "≈ 4–6 M$ (pilot)", "≈ 100 M$ upfront"],
              ["% of pilots that go to series", "≈ 25%", "—"],
              ["% of series renewed after 1st season", "≈ 35%", "—"]
            ]
          },
          {
            titulo: "Audience Overlap in Netflix Database (%)",
            fuente: "Netflix Internal Analytics (case estimate)",
            labels: ["Watch BBC 'HoC'", "Watch Fincher films", "Watch Spacey films", "Overlap 2 of 3", "Overlap 3 of 3"],
            series: [{ nombre: "% subscribers" }]
          },
          {
            titulo: "Third-Party Annual License Cost ($M)",
            fuente: "Netflix 10-K",
            series: [{ nombre: "Licensing ($M)" }]
          }
        ]
      },
      // Step 16
      {
        contexto: "This is the final major decision of the case. The company is weakened by the Qwikster crisis, but internal data tells a story that only you can see.",
        opciones: [
          {
            titulo: "Commit $100M: two full seasons without a pilot",
            desc: "Win the bidding war against HBO and AMC. Release the entire season at once and use viewership data as an advantage. If it fails, the financial crisis deepens."
          },
          {
            titulo: "Offer to finance only a pilot + preferential option",
            desc: "Conservative counteroffer to the industry model. Minimal risk, but the production company has already said they will go to HBO under this model."
          },
          {
            titulo: "Do not enter production: reinforce catalog licensing",
            desc: "Production is not your business. Allocate the $100M to renew licensing agreements (Starz, Epix, Disney) that customers already value today."
          }
        ]
      },
      // Step 17
      {
        texto: "Netflix won the bidding war with the $100M commitment and two seasons without a pilot. 'House of Cards' premiered on February 1, 2013, with all 13 episodes released at once, inventing 'binge-watching' as a product strategy. It won 3 Emmys, drove sign-ups, and ushered in the era of original content: today Netflix invests more than $17,000M a year in its own productions.",
        videoDe: "Recreation of final negotiations with Media Rights Capital and montage of 'House of Cards' global release (February 1, 2013).",
        transcript: "February 2013. Netflix releases all thirteen episodes of House of Cards at once, in a single night. With David Fincher directing and Kevin Spacey starring, the hundred million dollar bet is finally on screen. The press predicts failure: no one has bet so much without a pilot episode. The audience responds differently. Within forty-eight hours, marathon viewing becomes a global phenomenon. Netflix coins the term binge-watching. It wins three Emmys. New subscriber sign-ups beat quarterly records. The advantage that no one else had: viewership data that showed the overlap between fans of Fincher, Spacey, and the British version of the series. A blind bet for everyone. An informed bet for Netflix.",
        overlays: [
          { titulo: "Committed investment", subtexto: "Two seasons without shooting a single pilot episode" },
          { titulo: "Global release", subtexto: "13 episodes available simultaneously · Binge-watching is born" }
        ],
        impacto: {
          titulo: "Global Subscribers (millions)",
          series: [{ nombre: "Subscribers (M)" }]
        }
      },
      // Step 18
      {
        texto: "We have finished. You have made the four decisions that defined Netflix's transformation between 2007 and 2013: cannibalizing your own business, choosing the expansion model, managing a brand crisis, and betting on original content. Notice something important: mimicking the real company was not always the correct answer — Qwikster proves it. What we evaluate is not whether you match history, but the quality of your reasoning with the information available. Below you will see your decision tree compared to the real path, and your performance report, which your professor will also receive on their panel."
      }
    ]
  }
};

function getTranslatedCaso() {
  if (S.lang !== 'en') return CASO;
  
  const transCaso = JSON.parse(JSON.stringify(CASO));
  const dict = CASE_TRANSLATIONS.en;
  if (!dict) return transCaso;
  
  transCaso.titulo = dict.titulo;
  transCaso.subtitulo = dict.subtitulo;
  transCaso.sector = dict.sector;
  transCaso.resumen = dict.resumen;
  transCaso.areas = dict.areas;
  
  transCaso.pasos.forEach((p, idx) => {
    const tp = dict.pasos[idx];
    if (!tp) return;
    
    if (tp.texto) p.texto = tp.texto;
    if (tp.videoDe) p.videoDe = tp.videoDe;
    if (tp.transcript) p.transcript = tp.transcript;
    if (tp.intro) p.intro = tp.intro;
    if (tp.contexto) p.contexto = tp.contexto;
    
    if (tp.overlays && p.overlays) {
      p.overlays.forEach((o, oIdx) => {
        const to = tp.overlays[oIdx];
        if (to) {
          if (to.titulo) o.titulo = to.titulo;
          if (to.subtexto) o.subtexto = to.subtexto;
        }
      });
    }
    
    if (tp.bloques && p.bloques) {
      p.bloques.forEach((b, bIdx) => {
        const tb = tp.bloques[bIdx];
        if (tb) {
          if (tb.titulo) b.titulo = tb.titulo;
          if (tb.fuente) b.fuente = tb.fuente;
          if (tb.columnas) b.columnas = tb.columnas;
          
          if (tb.labels && b.labels) {
            b.labels = JSON.parse(JSON.stringify(tb.labels));
          } else if (b.labels) {
            b.labels = b.labels.map(l => {
              if (l === 'Ago') return 'Aug';
              if (l === '2007 (prev.)') return '2007 (est.)';
              return l;
            });
          }
          
          if (tb.series && b.series) {
            b.series.forEach((s, sIdx) => {
              const ts = tb.series[sIdx];
              if (ts && ts.nombre) s.nombre = ts.nombre;
            });
          }
          
          if (tb.filas && b.filas) {
            b.filas.forEach((r, rIdx) => {
              const tr = tb.filas[rIdx];
              if (tr) {
                r.forEach((cell, cIdx) => {
                  if (tr[cIdx]) r[cIdx] = tr[cIdx];
                });
              }
            });
          }
        }
      });
    }
    
    if (tp.opciones && p.opciones) {
      p.opciones.forEach((o, oIdx) => {
        const to = tp.opciones[oIdx];
        if (to) {
          if (to.titulo) o.titulo = to.titulo;
          if (to.desc) o.desc = to.desc;
        }
      });
    }
    
    if (tp.impacto && p.impacto) {
      const ti = tp.impacto;
      const i = p.impacto;
      if (ti.titulo) i.titulo = ti.titulo;
      if (ti.labels && i.labels) {
        i.labels = JSON.parse(JSON.stringify(ti.labels));
      }
      if (ti.series && i.series) {
        i.series.forEach((s, sIdx) => {
          const ts = ti.series[sIdx];
          if (ts && ts.nombre) s.nombre = ts.nombre;
        });
      }
    }
  });
  
  return transCaso;
}

const exitBtn = $("#btnExit");

function updateLanguageUI(lang) {
  S.lang = lang;
  $$(".topbar .langs span").forEach((span, idx) => {
    span.classList.toggle("act", (lang === 'es' && idx === 0) || (lang === 'en' && idx === 1));
  });
  
  C_ACTIVE = getTranslatedCaso();
  DECISION_STEPS = C_ACTIVE.pasos.filter(p => p.tipo === "decision");
  FASES = [...new Set(C_ACTIVE.pasos.map(p => p.fase))];
  
  translateGlobalElements();
  translateQrWidget();
  
  // Re-render active screen
  if ($("#screen-login").classList.contains("visible")) {
    renderLogin();
  } else if ($("#screen-student-home").classList.contains("visible")) {
    renderStudentHome();
  } else if ($("#screen-player").classList.contains("visible")) {
    renderPlayer();
  } else if ($("#screen-final").classList.contains("visible")) {
    terminarCaso();
  } else if ($("#screen-professor").classList.contains("visible")) {
    renderProfessor();
  }
}

function initLangs() {
  const spans = $$(".topbar .langs span");
  if (spans.length >= 2) {
    spans[0].onclick = () => updateLanguageUI('es');
    spans[1].onclick = () => updateLanguageUI('en');
  }
  translateGlobalElements();
}

/* ============================================================
   Protección de código fuente y DevTools
   ============================================================ */
function disableViewSource() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("debug") === "true") return;

  // Desactivar click derecho
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Desactivar atajos de teclado del inspector
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      return false;
    }
  });

  // Bucle anti-debuggers
  setInterval(() => {
    const t0 = Date.now();
    debugger;
    const t1 = Date.now();
    if (t1 - t0 > 100) {
      document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#1a1a1a; color:#fff; font-family:'Archivo',sans-serif; text-align:center; padding:20px;">
          <h1 style="font-size:24px; font-weight:800; color:#e2001a; margin-bottom:12px;">Acceso Restringido</h1>
          <p style="font-size:15px; color:#ccc; max-width:400px; line-height:1.5;">Esta maqueta del simulador está protegida para evitar la copia o inspección de su código fuente.</p>
        </div>`;
    }
  }, 1000);
}

/* ============================================================
   Arranque
   ============================================================ */
$("#brandHome").onclick = renderLogin;
$("#btnExit").onclick = renderLogin;
initLangs();
initQrWidget();
disableViewSource();
renderLogin();
