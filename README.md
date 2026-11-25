# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
## Mejora de mantenibilidad

**Problema identificado:** El tipo `CryptoFilter` estaba declarado por separado en `HomePage.tsx` y `SearchForm.tsx`. Esta duplicación podía generar inconsistencias si se modificaban las opciones de filtrado.

**Modificación realizada:** Se centralizó la definición de `CryptoFilter` en `src/types/crypto.ts`, exportándolo para reutilizarlo mediante imports en ambos archivos. Se eliminaron las declaraciones duplicadas y se quitó un import de `CryptoId` que quedó sin uso.

**Verificación de regresiones:**
- Se comprobó que la aplicación continuara funcionando.
- Se ejecutó `npm.cmd run build`.
- La compilación finalizó correctamente, transformando 131 módulos y generando la carpeta `dist`.
- No se detectaron errores de compilación.
## Pruebas automatizadas

Se configuró Vitest para ejecutar pruebas automatizadas sobre el servicio de consulta de cotizaciones.

Se implementaron dos pruebas para `getCryptoPrices()`:

- Verificar que devuelve correctamente los precios cuando la API responde satisfactoriamente.
- Verificar que lanza un error cuando la API responde con un fallo.

**Comando para ejecutar las pruebas:**

```bash
npm run test
```

**Resultado:** 2 pruebas aprobadas.