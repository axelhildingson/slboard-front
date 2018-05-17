import { app } from 'express';

const realtimedeparturesV4Key = process.env.REALTIMEDEPARTURESV4KEY || '';
const nearbystopsKey = process.env.NEARBYSTOPKEY || '';

app.get('/api/axel', async (req, res) => {
  res.send('Hello World async')
});

app.get('/api/station/:stopId', async (req, res) => {
    const responseJson = await fetch(`http://api.sl.se/api2/nearbystops.json?
        key=${nearbystopsKey}
        &originCoordLat=59.333848
        &originCoordLong=18.074610
        &maxresults=10
        &radius=500`);
    console.log('responseJson', responseJson);
    const retr = responseJson.json();
    console.log('responseJson', retr);
    res.send(responseJson);
});

app.get('/api/stations', async (req, res) => {
    const responseJson = await fetch(`http://api.sl.se/api2/nearbystops.json?
        key=${nearbystopsKey}
        &originCoordLat=59.333848
        &originCoordLong=18.074610
        &maxresults=10
        &radius=500`);
    console.log('responseJson', responseJson);
    const retr = responseJson.json();
    console.log('responseJson', retr);
    res.send(responseJson);
});

app.get('*', (req, res) => {
    res.sendfile('./../../dist/index.html');
});

app.listen(3000);
