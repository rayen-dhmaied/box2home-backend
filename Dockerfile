FROM node:18-alpine
WORKDIR /adminisration-back
COPY . .
RUN npm install
run npx prisma generate
run npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 80