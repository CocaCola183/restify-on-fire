# restify-on-fire
Restify on fire for development.

## Before you start
* Node 4.0.0  
* restify ^4.0.2  

so make sure your Node.js version is right.  

server.js starts a https server by default, if you want to start a http server, just remove this two lines:  
```js
certificate: fs.readFileSync('./cert/certificate.pem'),
key: fs.readFileSync('./cert/privatekey.pem'),
```

if you want to start a https server, follow the steps:  
```
openssl genrsa -out privatekey.pem 1024  
openssl req -new -key privatekey.pem -out certrequest.csr  
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem  
```
then you will get three files: 
* privatekey.pem
* certrequest.csr
* certificate.pem

create a folder 'cert' and move those files into it.

## Usage
```js
nvm use 4.0  
npm i  
node server.js (npm start)  
```