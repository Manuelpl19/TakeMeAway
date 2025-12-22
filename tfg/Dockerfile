# Usamos PHP 8.2 con Apache (lo estándar para Laravel)
FROM php:8.2-apache

# Instalamos las librerías necesarias para que funcione PostgreSQL (Neon) y otras
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

# Configuramos Apache para que apunte a la carpeta pública de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf
RUN a2enmod rewrite

# Preparamos la carpeta de trabajo
WORKDIR /var/www/html

# Copiamos todo tu código al contenedor
COPY . /var/www/html

# Instalamos Composer (el gestor de paquetes)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalamos las dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Damos permisos a las carpetas de almacenamiento (para que no de error 500)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Comando final: Corremos las migraciones y arrancamos el servidor
CMD php artisan migrate --force && apache2-foreground