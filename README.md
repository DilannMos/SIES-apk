# SIES — proyecto para crear el APK (Android)

Esta carpeta convierte la web de SIES en una app de Android con **Capacitor**. Para no tener que instalar Android Studio, **GitHub construye el APK por ti** en la nube (gratis).

```
SIES-apk/
├─ www/                      ← aquí vive la web de SIES (index.html, app.js, styles.css…)
├─ assets/                   ← íconos de la app
├─ capacitor.config.json     ← nombre y datos de la app
├─ package.json              ← herramientas que necesita Capacitor
└─ .github/workflows/android.yml   ← la "receta" que arma el APK en GitHub
```

## Lo que necesitas (una sola vez)

1. **VS Code** — https://code.visualstudio.com
2. **Git** — https://git-scm.com (instálalo con las opciones por defecto)
3. Una cuenta gratis en **GitHub** — https://github.com

> No necesitas instalar Node, Java ni Android Studio: GitHub ya los tiene.

## Paso a paso

### 1. Abre la carpeta en VS Code
Extrae el ZIP, abre VS Code → **Archivo → Abrir carpeta…** → elige `SIES-apk`.

### 2. Sube el proyecto a GitHub
1. En VS Code, abre **Control de código fuente** (el ícono de ramas en la barra izquierda, o `Ctrl+Shift+G`).
2. Pulsa **Inicializar repositorio**.
3. Escribe un mensaje (por ejemplo `Primera versión`) y pulsa **Confirmar** (Commit). Si te pregunta si guardas todo, di que sí.
4. Pulsa **Publicar rama** (Publish Branch). VS Code te pedirá iniciar sesión en GitHub; acepta, elige un nombre (por ejemplo `sies-app`) y puedes dejarlo **privado**.

### 3. Deja que GitHub arme el APK
1. Entra a tu repositorio en github.com y abre la pestaña **Actions**.
2. Verás "Crear APK de SIES" ejecutándose (círculo amarillo). Tarda unos **5 a 10 minutos**. Cuando salga una palomita verde ✅, terminó.
3. Si no arrancó solo: **Actions → Crear APK de SIES → Run workflow**.

### 4. Descarga e instala
1. Entra a la ejecución terminada (haz clic en ella) y baja hasta **Artifacts**.
2. Descarga **SIES-apk** (viene en un .zip; dentro está `app-debug.apk`).
3. Pasa el `app-debug.apk` a tu celular (WhatsApp, Drive, cable…) y ábrelo.
4. Android te pedirá permiso para **instalar apps de origen desconocido**: actívalo solo para ese gestor de archivos o navegador. Si aparece un aviso de Play Protect, es normal en APK que no vienen de Play Store.

Los archivos descargables de Actions se conservan un tiempo limitado (por defecto, unos 90 días); si caduca, vuelve a ejecutar el workflow.

## Cómo actualizar la app después

1. Cambia lo que quieras dentro de `www/` (por ejemplo `app.js` o `styles.css`).
2. En Control de código fuente: **Confirmar** y **Sincronizar cambios**.
3. GitHub crea un APK nuevo (paso 3 y 4). Instálalo encima del anterior: **tus datos se conservan**.

> Dentro del APK no hace falta subir la versión de `sw.js`; eso es solo para la versión publicada en internet.

## Cosas que debes saber

- **Es un APK de prueba ("debug")**: sirve para instalar en tus celulares y compartir con compañeros. **No sirve para Play Store**; para eso hay que firmar una versión "release" (.aab) y pagar la cuenta de desarrollador de Google.
- **Los datos se guardan en el celular** (igual que en la web). Si desinstalas la app, se borran.
- **Este proyecto lo armé sin poder compilarlo aquí**, así que la primera vez puede que algo falle (por ejemplo por una versión nueva de alguna herramienta). Si la ejecución sale con ❌, abre el paso que falló en la pestaña Actions y copia el mensaje de error: con eso se corrige rápido.
- Si el paso **"Generar íconos de la app"** falla, no pasa nada: la app se crea igual, solo que con el ícono por defecto.
- Para cambiar el nombre del paquete (por defecto `com.sies.app`) o el nombre de la app, edita `capacitor.config.json`.

## Alternativas

- **Con Android Studio en tu PC:** instala Node 22 o superior y Android Studio, y en una terminal dentro de la carpeta ejecuta `npm install`, `npx cap add android` y `npx cap open android`; luego **Build → Build APK(s)**.
- **Sin código:** publica la web en un sitio con https (por ejemplo Netlify) y usa https://www.pwabuilder.com para generar el paquete de Android.
