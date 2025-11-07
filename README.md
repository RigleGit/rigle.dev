# rigle.dev

Sitio web personal desplegado en GitHub Pages.

## Arquitectura

Este repositorio contiene el **sitio compilado/deployed** que se sirve directamente desde GitHub Pages.

El **código fuente** (contenido markdown, configuración Hugo, temas, etc.) se encuentra en el repositorio privado `rigle.dev-hugo`.

## Tecnología

- **Generador estático**: [Hugo](https://gohugo.io/) (v0.152.2 Extended)
- **Tema**: [DoIt](https://github.com/HEIGE-PCloud/DoIt)
- **Hosting**: GitHub Pages
- **Dominio personalizado**: rigle.dev

## Estructura del sitio

El sitio incluye:
- Página principal
- Newsletter
- Libro: *Programación en C en 100 ejercicios resueltos*
  - Pack del lector (chuleta PDF, Devcontainer, plantilla)
  - Repositorio de código
  - Erratas
- Blog de tecnología y programación
- Sección de proyectos

## Deployment

El sitio se actualiza automáticamente mediante GitHub Actions desde el repositorio fuente `rigle.dev-hugo`.

Cada push a la rama principal del repositorio fuente:
1. Compila el sitio con Hugo
2. Despliega el contenido compilado a este repositorio
3. GitHub Pages sirve el contenido actualizado

---

**Nota**: Este repositorio no debe editarse manualmente. Todos los cambios deben realizarse en el repositorio fuente `rigle.dev-hugo`.
