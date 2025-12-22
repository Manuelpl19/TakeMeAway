# Usamos PHP 8.2 con Apache
FROM php:8.2-apache

# INSTALACIÓN DE DEPENDENCIAS DEL SISTEMA
# He añadido 'git', 'curl' y 'libzip-dev' que son vitales para Composer
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

# Configuración de Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf
RUN a2enmod rewrite

# Directorio de trabajo
WORKDIR /var/www/html

# Instalamos Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiamos primero los archivos de definición para aprovechar la caché de Docker
COPY composer.json composer.lock ./

# Instalamos dependencias
# Añadimos --ignore-platform-reqs por si hay alguna pequeña diferencia de versión de PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copiamos el resto del código
COPY . .

# Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Comando de arranque
CMD php artisan migrate --force && apache2-foreground