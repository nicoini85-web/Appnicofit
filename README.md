# Appnicofit

Una app de fitness con biblioteca de ejercicios animados, construida con **React + Vite + Tailwind CSS** e integrada con la API gratuita de **ExerciseDB (AscendAPI)**.

## Características

- 1,500+ ejercicios con GIFs animados (180p)
- Filtros por parte del cuerpo y equipamiento
- Búsqueda en tiempo real
- Infinite scroll (scroll infinito)
- Vista de detalle con instrucciones paso a paso y músculos involucrados
- Diseño oscuro moderno y completamente responsivo

## Stack

| Tecnología | Uso |
|---|---|
| React 18 | UI |
| Vite 5 | Bundler / Dev Server |
| Tailwind CSS 3 | Estilos |
| React Router 6 | Navegación SPA |
| ExerciseDB V1 (AscendAPI) | Datos + GIFs de ejercicios |

## Primeros pasos

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Lint con ESLint |

## API

Los datos de ejercicios son provistos por [AscendAPI / ExerciseDB](https://ascendapi.com) bajo la versión gratuita V1.
- Base URL: `https://oss.exercisedb.dev/api/v1`
- Sin API key requerida (plan gratuito)
- Atribución requerida: [ascendapi.com](https://ascendapi.com)

> **Nota:** La versión gratuita es para proyectos personales y no comerciales.
> Para uso comercial, consulta los planes de pago en [ascendapi.com](https://ascendapi.com).
