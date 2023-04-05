#Base image
FROM node:latest

COPY ["SERVICE.tgz", "/SERVICE.tgz"]
COPY ["env", "/SERVICE/.env"]
COPY ["start.sh", "/start.sh"]

ARG REACT_APP_ENDPOINT='http://13.229.70.136:3001/'
# Set environment variables
ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT

RUN tar -xzf SERVICE.tgz --directory /SERVICE && rm SERVICE.tgz

RUN chmod -R 775 /SERVICE

RUN chmod -R 775 /start.sh

EXPOSE 3002

WORKDIR /SERVICE

RUN yarn

RUN yarn build

ENTRYPOINT ["/start.sh"]
