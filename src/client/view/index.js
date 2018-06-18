import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Marktext from '../component/marktext/index';
import PopupContent from '../component/PopupContent/index';
import styles from './styles.scss';
import Popup from "reactjs-popup";
import 'whatwg-fetch';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; // Set your mapbox token here


export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 1400,
        height: 800,
        latitude: 59.332554,
        longitude: 18.068381,
        zoom: 14,
        open: false,
        pupupData: {},
      }
    }
  };


  componentWillMount() {
    window.fetch("http://localhost:3000/api/stations")
    .then((response) => response.json())
    .then(response => this.setState({stops: response.LocationList.StopLocation}))
    .then(() => this.fetchStopInfo());
  }

  fetchStopInfo() {
    if (this.state.stops) {
      this.state.stops.forEach((stop, index) => {
        window.fetch(`http://localhost:3000/api/station/${stop.id.substring(5)}`).then(response => response.json())
        .then(response => {
          const newList = this.state.stops;
          const stop = Object.assign( this.state.stops[index], {transportData: response.ResponseData });
          newList[index] = stop;
          this.setState({ stops: newList });
        });
      })
    }
  }


  openPopUp(data) {
    this.setState({ open: true, popupData: data});
  }

  closePopUp() {
    console.log("CLOSING POPUP");
    this.setState({ open: false });
  }
  render() {
    const stopList = [];
    if (this.state.stops) {
      this.state.stops.forEach(stop => {
        if(stop.transportData) {
          stopList.push(
            <Marker latitude={stop.lat} longitude={stop.lon} offsetLeft={-20} offsetTop={-10}>
              <div onClick={()=> this.openPopUp(stop.transportData)}>
                <Marktext name={stop.name} transports={stop.transportData} />
              </div>
            </Marker>
          )
        }
      });
    }
    return (
      <div>
      <div className={styles.test}>

      </div>
      <div>
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
      {stopList}
      </ReactMapGL>
      </div>
      <Popup open={this.state.open} closeOnDocumentClick onClose={() => this.closePopUp()}>
        <PopupContent data={this.state.popupData} />
      </Popup>
      </div>
    );
  }
}
