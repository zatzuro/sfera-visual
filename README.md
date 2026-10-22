# SFERA Visual — réplica de interfaz

**Estado del repositorio:** réplica visual sintética publicada como archivos Git; la activación de GitHub Pages es independiente.

- Fuente privada oficial: [zatzuro/mn-core-27](https://github.com/zatzuro/mn-core-27), rama `main`.
- Flujo de construcción y QA: [PR #92 integrado](https://github.com/zatzuro/mn-core-27/pull/92).
- Versión fuente inicial integrada: `af40639de387fc1a6ba8b862dc5c657c465de8f7`.
- URL prevista tras habilitar Pages: https://zatzuro.github.io/sfera-visual/
- Entorno: **SOLO DATOS FICTICIOS**, sin acceso a Apps Script, Drive ni Google Sheets.

La sincronización futura se ejecuta desde CI de SFERA en cada `push` aprobado a `main`; requiere que el propietario configure **una sola vez** el secreto `SFERA_VISUAL_PUBLISH_TOKEN` con alcance exclusivo `zatzuro/sfera-visual`, permiso Contents read/write. No introducir el token en el código ni en este repositorio público. Mientras no exista el secreto, CI emite un aviso y omite la publicación; no fingir automatización activa.

GitHub Pages se habilita en **Settings → Pages → Deploy from a branch → main / (root)**. El sitio es público; nunca añadir datos comerciales reales, secretos ni URLs autenticadas.
