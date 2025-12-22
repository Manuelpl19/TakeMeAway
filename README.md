# 🚖 TakeMeAway

![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Laravel](https://img.shields.io/badge/Backend-Laravel_10-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![Status](https://img.shields.io/badge/Estado-Producción-success?style=flat-square)

> **Plataforma integral de reserva de transporte privado con geolocalización en tiempo real.**

🔗 **[VER DEMO EN VIVO](AQUÍ_PON_TU_URL_DE_PRODUCCION)**

---

## 📄 Descripción del Proyecto

**TakeMeAway** es una aplicación web Full Stack diseñada para gestionar servicios de transporte VTC (similar a Uber). El sistema permite la conexión entre usuarios y conductores, calculando rutas y tarifas de forma dinámica.

El proyecto ha sido desarrollado siguiendo una arquitectura **Headless**, separando completamente la lógica de negocio (Backend API) de la interfaz de usuario (Frontend SPA), garantizando escalabilidad y seguridad.

## 💡 Funcionalidades Clave

* **Geocodificación Inversa:** Conversión automática de coordenadas geográficas en direcciones postales legibles mediante integración con OpenStreetMap/Nominatim.
* **Cálculo de Rutas Inteligente:** Trazado de rutas optimizadas y estimación precisa de distancias utilizando OSRM (Open Source Routing Machine).
* **Tarificación Dinámica:** Algoritmo propio para el cálculo de precios basado en kilometraje y tarifas base.
* **Gestión de Usuarios:** Sistema robusto de autenticación y autorización mediante Tokens seguros.
* **Interfaz Reactiva:** Experiencia de usuario fluida (SPA) con actualizaciones de estado en tiempo real sin recargas de página.

## 🛠️ Arquitectura y Tecnologías

El sistema está construido sobre un stack tecnológico moderno, priorizando el rendimiento y la mantenibilidad:

### Frontend (Cliente)
* **Framework:** React 18 + Vite.
* **Mapas:** Leaflet & React-Leaflet.
* **Estilos:** Tailwind CSS (Diseño responsivo y sistema de diseño personalizado).
* **Routing:** React Router DOM (Gestión de rutas protegidas).

### Backend (Servidor)
* **Framework:** Laravel 10 (API RESTful).
* **Base de Datos:** MySQL.
* **Autenticación:** Laravel Sanctum (Seguridad basada en Tokens).
* **ORM:** Eloquent (Modelado de datos y relaciones).

## 👤 Autor

**Manuel**
* Desarrollador Full Stack

---
*© 2025 TakeMeAway. Todos los derechos reservados.*