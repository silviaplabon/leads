FROM node:21-alpine AS builder

# Make sure we got brotli
RUN apk update
RUN apk add --upgrade brotli

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package*.json ./
RUN npm i --force

# Copy app files
COPY . ./

# Build the app
RUN npm run build

# List Files
RUN ls -latr

# Compress files
RUN cd /app/build && find . -type f -exec brotli {} \;

FROM alpine
RUN apk add brotli nginx nginx-mod-http-brotli

# Minimal config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Actual data
COPY --from=builder /app/build /usr/share/nginx/html/lead
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80