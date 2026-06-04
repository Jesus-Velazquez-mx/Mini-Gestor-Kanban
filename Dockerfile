# 1. Usar una imagen oficial de Nginx súper ligera
FROM nginx:alpine

# 2. Copiar la carpeta 'dist' (que GitHub Actions ya generó) dentro de Nginx
COPY dist /usr/share/nginx/html

# 3. Exponer el puerto 80 (el puerto estándar para web)
EXPOSE 80

# 4. Encender el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]