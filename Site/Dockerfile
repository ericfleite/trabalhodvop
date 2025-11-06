FROM nginx:alpine

# Copia o conteúdo do site para o servidor NGINX
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
