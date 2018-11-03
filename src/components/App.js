import React, {
  Component
} from "react";
import "./App.css";
import Planes from "./Planes";
import PlanesInfo from "./PlanesInfo";

import {
  getCurrentLocation,
  getBoundingBox,
  sendNotification
} from "../utils";
const REFRESH_INTERVAL = 15 * 1000;
let API_URL = "https://opensky-network.org/api/states/all?";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfPlanes: 0,
      planes: [],
      lastAcquiredAt: null,
      prevLocation: null,
      prevBoundingBox: null
    };
  }
  _process = () => {
    getCurrentLocation(this.state.prevLocation).then(result => {
        return result;
      })
      .then((result) => {
        const boundingBox = getBoundingBox(result.currentLocation, this.state.prevLocation);

        let query = Object.keys(boundingBox)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(boundingBox[k]))
          .join('&');

        // Now that we have queried, let's set the state;

        this.setState({
          prevLocation: result.currentLocation,
          lastAcquiredAt: result.timestamp
        })

        const endpoint = API_URL + query;
        return fetch(endpoint);
      })
      .then(res => res.json())
      .then(resJson => {
        if ((this.state.noOfPlanes && this.state.noOfPlanes) !== (resJson.states && resJson.states.length)) {
          sendNotification(this.state.noOfPlanes);
        }

          this.setState({
              noOfPlanes: resJson.states && resJson.states.length,
              planes: resJson.states
            })
      });}

    componentDidMount() {
      this._process();
      setInterval(this._process, REFRESH_INTERVAL);
    }

    render() {
      return ( <div className = "App" >
        <div className = "header" >
        <p style = {
          {
            textAlign: "center"
          }
        } > Air < span style = {
          {
            fontWeight: 100
          }
        }> planes </span></p >
        </div>  <Planes noOfPlanes = {
          this.state.noOfPlanes
        }/> <PlanesInfo planes = {
          this.state.planes
        }
        />  </div >
      );
    }
  }

  export default App;