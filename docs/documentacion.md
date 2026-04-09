# NutriBrain - Documentación del Proyecto

## Resumen del Proyecto

NutriBrain es una plataforma interactiva diseñada para explorar la relación entre la nutrición y el desarrollo biológico y cognitivo a corto y largo plazo. Utiliza visualizaciones interactivas en 3D para ilustrar conceptos médicos y biológicos complejos, como la programación fetal, el neurodesarrollo y la microbiota intestinal.

El núcleo conceptual de NutriBrain es entender la alimentación no solo como ingesta calórica, sino como un **"evento de impronta"** que condiciona la estructura funcional del individuo en la adultez, previniendo o facilitando enfermedades crónicas no transmisibles (ENT) como la hipertensión, la diabetes tipo 2 y el deterioro cognitivo.

## Funcionalidades Principales

1.  **Visor 3D Interactivo**: Modelos procedurales generados con `Three.js` (a través de `@react-three/fiber` y `@react-three/drei`) que ilustran conceptos anatómicos y celulares:
    *   **Corazón Pulsante (`heart`)**: Representa la programación cardiovascular y el riesgo de aterosclerosis temprana.
    *   **Red Neuronal (`neuron`)**: Modela el impacto del zinc, folato y omega-3 durante los primeros 1,000 días de vida.
    *   **Hélice Genética/ADN (`growth`)**: Simula el reloj biológico y los estadios de crecimiento (0-9 años).
    *   **Defensa Celular (`defense`)**: Una barrera inmunológica protectora impulsada por la microbiota y la lactancia materna.
    *   **Cristal Metabólico (`crystal`)**: Modela la influencia de los azúcares y ultraprocesados en la resistencia a la insulina.
2.  **Grafo de Conocimiento 3D (`ThreeGraph`)**: Un mapa estelar navegable en 3D construido con `react-force-graph-3d`. Representa los artículos clíniocs y cómo se conectan los conceptos a gran escala, permitiendo navegación no lineal.
3.  **Proyección de Evolución Biológica**: Gráficos integrados en cada artículo clínico (`ArticleEvolutionDisplay`) que muestran cómo el impacto de la condición estudiada evoluciona según la etapa vital del individuo en porcentajes, enfatizando el control a corto vs. largo plazo.
4.  **Sistema de Enlazado Bidireccional Orgánico**: Los artículos se vinculan usando sintaxis de corchetes dobles (`[[Tema]]`). El sistema genera una sección de "Estudios Relacionados" dinámicamente si otros artículos mencionan el actual.

## Organización del Contenido (Fusionado y Actualizado)

El esfuerzo de contenido más reciente incluyó la fusión de conceptos redundantes para generar artículos más robustos y cohesivos:

*   **Salud Cardiovascular y Programación Temprana (`hipertension.md` + `sal.md`)**: Analiza la hipertensión no como un estado adulto, sino como disfunción endotelial nacida en la niñez.
*   **Competencia Nutricional y Desarrollo (`nutricion-infantil.md` + hitos 0-9 años)**: Guía sobre los hitos dietéticos en la infancia y control metabólico.
*   **Salud Cognitiva y Neurodesarrollo (`neurodesarrollo.md`)**: Subraya la ventana de protección de 1,000 días y la formación estructural de la cognición del ser humano.
*   **Gestión de Riesgos: Azúcares y Procesados (`riesgos-metabolicos.md` + `dietas-sodio.md`)**: El impacto crónico del ultraprocesamiento y la dependencia glicémica.
*   **Microbiota e Inmunología Celular (`microbiota.md` + lactancia materna)**: La flora como primer escudo inmunológico desde la etapa lactante.

## Tecnologías Utilizadas

*   **Framework**: Next.js (App Router), React
*   **Estilos**: Tailwind CSS, Framer Motion (para transiciones suaves).
*   **Motor 3D**: Three.js, React Three Fiber, React Three Drei, react-force-graph-3d, three-spritetext.
*   **Gestión de Contenido**: Markdown, `gray-matter` (frontmatter parser), `remark` y `remark-html`.

## Proyección Futura

El diseño modular de NutrientBrain permite incluir en un futuro más sub-vistas analíticas y cruzar datos médicos de pacientes mediante IA (`ChatBot` heurístico) para recomendaciones personalizadas basadas en este corpus nutricional.
