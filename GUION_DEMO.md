# IESE Case Experience — Guion para la reunión

## Cómo arrancar
Doble clic en **index.html** (no necesita servidor ni instalación, funciona offline).
Recomendado: Chrome/Edge a pantalla completa (F11).

## Recorrido sugerido (10–12 min)

### 1. Portada (30 s)
- "Los casos ya no se leen, se viven": el alumno vive el caso en primera persona.
- Dos perfiles: **alumno** y **profesor**.

### 2. Vista de alumno (5–6 min)
1. Entrar como alumno → catálogo con el caso asignado (**Netflix: reinventarse o morir**, caso real 2007–2013) y dos casos "próximamente" (Zara, LEGO) para mostrar que es una plataforma, no un caso suelto.
2. Comenzar el caso:
   - **Profesor avatar IA** narra el contexto (efecto de escritura; clic en el texto para completarlo y agilizar la demo). Aquí irá voz y vídeo generados por IA.
   - **Placeholders de vídeo**: "[ Aquí iría un vídeo de: … ]" — recreaciones de lo que hizo la empresa real.
   - **Pantallas de datos reales**: gráficos y tablas (suscriptores, banda ancha, costes…). Todo se registra: cuántas pantallas de datos consulta el alumno antes de decidir.
   - **Momento de decisión**: cronómetro visible, 3 opciones con nivel de riesgo, y razonamiento escrito **obligatorio** (mínimo 15 palabras). La decisión no se puede deshacer, como en la realidad.
   - Tras decidir: **"Lo que hizo la empresa"** — comparación inmediata con la decisión real y su impacto en datos.
3. Punto clave para contar en la reunión: en la **Decisión 3 (crisis Qwikster)** la decisión real de Netflix fue un error. La plataforma no evalúa "acertar la historia", sino la **calidad del razonamiento** (cada opción tiene una valoración del claustro).
4. Al terminar: **informe del alumno** con evaluación global, árbol de decisiones (su camino en rojo vs. el camino real en verde), revisión decisión a decisión y radar de competencias vs. la media de la clase.
5. Botón **"Ver cómo lo ve el profesor"** → transición perfecta a la segunda parte.

> Consejo: si quieres que tu sesión aparezca "EN VIVO" en el panel del profesor, completa el caso de verdad (puedes ir rápido: clic en el texto del avatar, opción + 15 palabras en cada decisión, ~3 min).

### 3. Vista de profesor (4–5 min)
- **Visión general de la clase**: 5 alumnos simulados (+ tu sesión en vivo si completaste el caso):
  - KPIs: evaluación media, coincidencia con la realidad, tiempos.
  - Gráfico "¿Qué eligió la clase en cada momento?" con la opción real marcada en verde.
  - "Lectura rápida para la sesión en aula": insights listos para preparar la discusión.
- **Clic en cualquier alumno** → informe individual:
  - **Análisis generado por IA** del perfil decisor (revisable por el profesor).
  - Árbol de decisiones del alumno vs. camino real.
  - Radar de competencias vs. media de la clase.
  - Tiempo por decisión vs. media.
  - **Razonamientos escritos completos** de cada decisión, con tiempo, pantallas de datos consultadas y calidad de la opción.
  - Exportar informe en PDF (imprime la vista).
- Perfiles interesantes para enseñar el contraste:
  - **Lucía Fernández** (87/100): analítica, detectó que Qwikster era un error.
  - **Marc Vidal**: coincide 4/4 con la realidad pero decide en segundos con razonamientos pobres — la nota lo penaliza. Demuestra que la herramienta mide *cómo* se decide, no solo *qué*.
  - **Andrés Rocha**: perfil conservador, 0/4 — material perfecto para el debate en aula.

## Qué es real y qué es simulado
- El caso (Netflix) usa datos y decisiones documentadas reales.
- Los vídeos son marcadores de posición (pendientes de producción).
- Los 5 alumnos del panel y sus razonamientos son datos de demostración.
- La "sesión en vivo" sí es real: registra opción, tiempo, datos consultados y razonamiento del que usa la app.

## Reiniciar la demo
Para borrar tu sesión en vivo del panel del profesor: abre la consola del navegador (F12) y ejecuta
`localStorage.removeItem('iese_live_session')`, o usa una ventana de incógnito nueva.
