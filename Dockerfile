FROM node:18 as build-stage
WORKDIR /app
COPY ./ ./


ARG VITE_API_URL
RUN echo VITE_API_URL=$VITE_API_URL

RUN rm -rf build node_modules
RUN npm install --legacy-peer-deps
RUN npm run build


FROM registry.access.redhat.com/ubi8/nginx-122 as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /opt/app-root/src/

USER 1001

CMD /usr/libexec/s2i/run
