# Utilisez l'image de base Node.js
FROM node:14

WORKDIR /my-story

COPY package*.json ./

RUN npm install


RUN npm install -g nodemon


COPY . .

EXPOSE 5173
EXPOSE 3000



CMD ["npm", "run","dev"]
