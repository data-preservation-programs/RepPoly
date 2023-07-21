FROM public.ecr.aws/docker/library/node:18
WORKDIR /app
COPY . .
RUN npm ci
CMD npm run populate
