# TakeMeAway

TakeMeAway es una aplicación de demostración que combina un backend en **Laravel** y un frontend en **React** para simular un servicio de transporte. Permite registrarse, iniciar sesión, solicitar viajes, consultar conductores disponibles y revisar el historial de trayectos. El proyecto está pensado como un ejemplo educativo para un Trabajo Fin de Grado.

## Estructura del repositorio

- **`tfg/`** – Backend desarrollado en Laravel.
- **`VistasTFG/`** – Frontend creado con React y Vite.

Cada parte se ejecuta y configura de forma independiente.

## Requisitos

- PHP 8.2 o superior con Composer
- Node.js 18 o superior y npm
- Servidor MySQL (o MariaDB)

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Configura el backend:
   ```bash
   cd tfg
   cp .env.example .env
   composer install
   npm install
   php artisan key:generate
   php artisan migrate --seed  # crea tablas y datos de ejemplo
   ```
3. Configura el frontend:
   ```bash
   cd ../VistasTFG
   npm install
   ```

## Variables de entorno

Para enviar correos reales cambia `MAIL_MAILER` a `smtp` en `tfg/.env` y rellena tus credenciales de Gmail (puede que necesites una contraseña de aplicación).

En `VistasTFG/.env` indica la URL del backend y tu enlace de Revolut para los pagos:

```bash
VITE_API_URL=http://127.0.0.1:8000/api
VITE_REVOLUT_LINK=https://revolut.me/tu_cuenta
```
Asegúrate de no dejar espacios alrededor del signo `=` y reinicia el servidor de desarrollo si modificas estas variables.

## Puesta en marcha

- **Backend**: desde `tfg/` puedes lanzar el entorno de desarrollo con:
  ```bash
  composer dev
  ```
  Esto iniciará el servidor de Laravel, la cola de trabajos, el visor de logs y Vite para los recursos.

- **Frontend**: en `VistasTFG/` ejecuta:
  ```bash
  npm run dev
  ```
  La aplicación React estará disponible normalmente en `http://localhost:5173`.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Listado de conductores con su valoración y zona de trabajo.
- Cálculo de rutas y precio estimado utilizando Leaflet y OSRM.
- Creación de viajes y notificación por correo al conductor seleccionado.
- Historial de viajes para cada usuario.
- Pago mediante enlace de Revolut (código QR en el frontend).

## Pruebas

El backend incluye pruebas de ejemplo que puedes ejecutar con:
```bash
cd tfg
php artisan test
```

## Contribución

Se aceptan sugerencias y mejoras mediante *pull requests*. Este proyecto se ofrece únicamente con fines formativos.
