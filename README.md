# 🧠 NutriBrain: Clinical Knowledge Management System

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-Visuals-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Logic-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**NutriBrain** es una plataforma de vanguardia diseñada para la gestión y visualización de conocimiento nutricional basado en evidencia científica. Utiliza un motor de grafo neuronal en 3D para interconectar estudios clínicos, permitiendo una exploración orgánica del conocimiento sobre microbiota, resistencia a la insulina y trayectorias de salud vital.

---

## 🌌 Características Principales

| Característica | Descripción Técnica | Impacto UX |
| :--- | :--- | :--- |
| **3D Knowledge Graph** | Renderizado de fuerza dirigida mediante `Three.js` (ForceGraph3D) que procesa enlaces bidireccionales de archivos Markdown. | Exploración inmersiva del "Cerebro de Datos". |
| **NutriBot Heurístico** | Motor de búsqueda semántica local que analiza el corpus de artículos para responder consultas sin IA externa costosa. | Respuestas instantáneas basadas en datos reales. |
| **Evolution Chart 3D** | Visualización reactiva de trayectorias de salud comparando nutrición óptima vs. déficit crónico. | Validación visual del impacto a largo plazo de la dieta. |
| **Zettelkasten Digital** | Sistema de gestión de contenidos basado en archivos planos (`.md`) con sintaxis de wiki-links `[[Link]]`. | Escalabilidad y portabilidad total del conocimiento. |

---

## 🛠️ Stack Tecnológico

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/).
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) con Glassmorphism y Dark Navy Theme.
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/).
- **Visualización 3D**: `Three.js`, `react-force-graph-3d`, `@react-three/fiber`.
- **Procesamiento de Datos**: `gray-matter`, `remark`, `remark-html`.

---

## 🚀 Guía de Instalación

### Requisitos Previos
- **Node.js**: Versión 18.x o superior.
- **Gestor de Paquetes**: `npm` (recomendado) o `pnpm`.

### Pasos a Seguir

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/MarxAlonso/nutribrain.git
   cd nutribrain
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Configurar el Entorno**
   Crea un archivo `.env` (si es necesario para futuras integraciones), aunque por defecto el proyecto funciona de forma local y estática.

4. **Ejecutar en Desarrollo**
   ```bash
   npm run dev
   ```
   Accede a [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Arquitectura del Flujo de Datos

El sistema sigue un modelo de **Digital Garden** donde los datos fluyen de la siguiente manera:

1.  **Ingesta de Datos**: Los estudios científicos se agregan como archivos `.md` en la carpeta `/content`.
2.  **Procesamiento**: El servidor dinámico (`lib/markdown.ts`) parsea el Frontmatter y los Wiki-links.
3.  **Generación de Grafo**: La API `/api/graph` mapea las relaciones entre archivos para el mapa 3D.
4.  **Interacción**: El usuario navega visualmente o consulta al NutriBot, que realiza un escaneo heurístico de los contenidos.

### Estructura de un Artículo (Ejemplo)
```markdown
---
title: "Microbiota Intestinal y Salud"
date: "2026-04-09"
author: "NutriBrain clinical team"
tags: ["Microbiota", "Metabolismo"]
model3d: "neuron"
evolutionData: [
  { stage: "Infancia", impact: 90 },
  { stage: "Adultez", impact: 75 }
]
---
El contenido aquí apoya la conexión con [[Resistencia a la Insulina]].
```

---

## 📈 Metodología de Desarrollo

El proyecto se desarrolla bajo estándares de **Clean Architecture** y **UI/UX Premium**:

| Fase | Objetivo | Resultado |
| :--- | :--- | :--- |
| **Investigación** | Scrapeo y síntesis de estudios científicos (`revisas.txt`). | 10+ Artículos integrados. |
| **Motor 3D** | Integración de grafos y visualizadores biológicos. | Mapa 3D Funcional con labels. |
| **Optimización** | Asegurar responsividad y accesibilidad en el 100% de vistas. | Puntuación 95+ en Lighthouse. |

---

## 🤝 Contribución

Si deseas añadir nuevos estudios científicos o mejorar el motor de visualización:
1. Realiza un Fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/AmazingStudy`).
3. Commit tus cambios (`git commit -m 'Add new study on Omega3'`).
4. Push a la rama (`git push origin feature/AmazingStudy`).
5. Abre un Pull Request.

---

**NutriBrain** - *Inteligencia Nutricional para Humanos del Siglo XXI* 🧠🌿
