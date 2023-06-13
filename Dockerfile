FROM node:18-alpine

WORKDIR /adminisration-back

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 80