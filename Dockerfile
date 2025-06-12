FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --force --legacy-peer-deps --only=production
EXPOSE 3000
CMD ["npm", "start"]
