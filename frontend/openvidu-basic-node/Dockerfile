FROM node:20-alpine

# Copy openvidu-basic-node
COPY . /opt/openvidu-basic-node

# Install openvidu-basic-node dependencies
RUN npm --prefix /opt/openvidu-basic-node install

WORKDIR /opt/openvidu-basic-node

EXPOSE 8500

ENTRYPOINT [ "node", "index.js" ]