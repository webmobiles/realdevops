# Dockerfile to create image with cron services
FROM alpine:latest
WORKDIR /opt
RUN apk update
RUN apk add --no-cache bash socat curl openssl git

# clone zero.sh repository
RUN git clone https://github.com/acmesh-official/acme.sh.git /opt/acme-installer

# infinite loop
CMD ["tail", "-f", "/dev/null"]
