FROM node:12-stretch

RUN mkdir /opt/ibm
ADD clidriver /opt/ibm

ENV IBM_DB_HOME /opt/ibm

RUN apt-get update && \
    apt-get install -y make g++ unixodbc unixodbc-dev vim
WORKDIR /app
COPY package.json .
COPY index.js .
COPY odbcinst.ini /etc/odbcinst.ini
RUN npm install

CMD ["/bin/bash"]