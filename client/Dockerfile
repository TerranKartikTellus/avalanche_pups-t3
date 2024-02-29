FROM node:alpine
WORKDIR /app/client
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
