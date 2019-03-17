---
title: deploying nodejs hello world via kubernetes
created: '2019-03-03T21:27:18.385Z'
modified: '2019-03-03T21:42:21.019Z'
---

deploying nodejs hello world via kubernetes

`~/k8s/server.js`
```javascript
var http = require("http");

var handleRequest = function(request, response) {
  console.log("Received request for URL: " + request.url);
  response.writeHead(200);
  response.end("Hello World!");
};
var www = http.createServer(handleRequest);
www.listen(8080);
```

`~/k8s/Dockerfile`
```Dockerfile
FROM node:10.11.0
EXPOSE 8080
COPY server.js .
CMD node server.js
```

1. build docker image
`docker build .`


2.
```kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node```


3load balancer
`kubectl expose deployment hello-node --type=LoadBalancer --port=8080`
By default, the Pod is only accessible by its internal IP address within the Kubernetes cluster. To make the hello-node Container accessible from outside the Kubernetes virtual network, you have to expose the Pod as a Kubernetes Service.

`kubectl create deployment hello-foo --image=browserless/chrome:latest`
