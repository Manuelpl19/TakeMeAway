# Usamos PHP 8.2 con Apache
FROM php:8.2-apache

# Instalamos dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd zip

# --- CONFIGURACIÓN DE APACHE (AQUÍ ESTÁ LA SOLUCIÓN) ---
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# 1. Cambiamos la carpeta raíz a /public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 2. ACTIVAMOS .htaccess (Esto arregla el error 404 en rutas /api) 🚨IMPORTANTE🚨
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# 3. Activamos el módulo rewrite
RUN a2enmod rewrite

# --- FIN CONFIGURACIÓN APACHE ---

WORKDIR /var/www/html

# Instalamos Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiamos archivos de dependencias
COPY composer.json composer.lock ./

# Instalamos dependencias
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copiamos el resto del código
COPY . .

# Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Limpiamos caché y arrancamos (incluye el fix del mensaje anterior)
CMD php artisan optimize:clear && php artisan migrate --force && apache2-foreground