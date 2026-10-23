# SFERA Visual — ventana automática al desarrollo de SFERA

**URL:** https://zatzuro.github.io/sfera-visual/

## Regla permanente
El código de interfaz se desarrolla **una sola vez** en el repositorio privado `zatzuro/mn-core-27` (`gas/Index.html` → `web/app.js`). **No** mantener copias manuales ni pedir a otros agentes que reproduzcan cambios aquí.

Un PR abierto, incluso borrador y sin integración en `main`, con CI `MegaDash CI` exitoso, genera un paquete de navegador y lo publica en SFERA Visual automáticamente. La fuente, el número de PR y el commit aparecen en `__test/manifest.json`; una etiqueta superior identifica los previews y las pestañas abiertas comprueban versiones cada 30 segundos.

El publicador seguro vive en la rama `main` **del repositorio privado**, ejecutado por `workflow_run` después del CI. No ejecuta código del PR con secretos, valida PR/commit actual y bloquea archivos con conexiones de producción. Solo utiliza el secreto EXISTENTE `SFERA_VISUAL_PUBLISH_TOKEN`, con permiso Contents write exclusivo para este repositorio público. Sin ese secreto, la publicación falla: no interpretar CI exitoso como sitio actualizado.

Si varios PR están activos, se muestra el **último PR con CI exitoso que haya sido publicado**; cada actualización sustituye todo el paquete, sin mezclar archivos. Un `push` integrado en `main` también puede actualizar el espejo. Si un cambio no está en un PR abierto, aún no se publica como preview automático.

## Límites de seguridad
Este sitio es **público** y utiliza exclusivamente **datos sintéticos**. No lee ni guarda información en las hojas comerciales, Google Apps Script productivo o Google Drive; los guardados reales deben comprobarse en otro entorno TEST aislado. Jamás subir secretos, URL autenticadas ni datos comerciales reales.

La publicación de SFERA Oficial sigue siendo separada: CI de un PR aprobado no integra ni despliega en producción. La revisión Senior, autorizaciones, reversión y smoke productivo siguen obligatorios.

**Gates:** no prometer actualización visible sin comprobar SHA publicado en `__test/manifest.json`, GitHub Pages y el job `SFERA Visual live preview`.

Referencia: [PR #94 — automatización de previews](https://github.com/zatzuro/mn-core-27/pull/94).
