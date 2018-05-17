import express from 'express';
import fetch from 'node-fetch';
import cache from 'memory-cache';

import path from 'path';
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/dist'))

const realtimedeparturesV4Key = process.env.REALTIMEDEPARTURESV4KEY || '';
const nearbystopsKey = process.env.NEARBYSTOPKEY || '';

app.get('/api/test', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({ a: 1 }));
})

app.get('/api/stations', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    const apiRequest = `http://api.sl.se/api2/nearbystops.json?key=${nearbystopsKey}&originCoordLat=59.333848&originCoordLong=18.074610&maxresults=10&radius=500`
    const casheValue = cache.get(apiRequest);
    console.log("CACHE VALUE: ", casheValue)
    console.log("KEYS ", cache.keys())
    if(casheValue === null) {
      console.log("api request", apiRequest);
      const responseJson = fetch(apiRequest).then(response => response.json())
      .then(responseJson => {
          console.log('responseJson', responseJson);
          response.send(responseJson);
          cache.put(apiRequest, responseJson, 100);
      });
    } else {
      console.log('RETRIVE CACHE');
      response.send(casheValue);
    }
})
app.get('/api/station/:stopId', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    const apiRequest = `http://api.sl.se/api2/realtimedeparturesV4.json?key=${realtimedeparturesV4Key}&siteid=${request.params.stopId}&timewindow=1000`
    const casheValue = cache.get(apiRequest);
    console.log("CACHE VALUE: ", casheValue)
    console.log("KEYS ", cache.keys())
    if(casheValue === null) {
      console.log("api request", apiRequest);
      const responseJson = fetch(apiRequest).then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        response.send(responseJson);
        cache.put(apiRequest, responseJson, 100);
      });
    } else {
      console.log('RETRIVE CACHE');
      response.send(casheValue);
    }
})

app.get('/', ( request, response ) => {
    response.sendFile(path.resolve(__dirname, '/dist', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
