import React, { Component } from "react";
import "./PlanesInfo.css";

const Header = (
  <div className="PlanesInfo-header">
    <p>CallSign</p>
    <p>Country</p>
    <p>Speed (km/hr)</p>
    <p>Altitude (ft)</p>
  </div>
);

class PlanesInfo extends Component {
  render() {
    return (
      <div className="PlanesInfo-root">
        {Header}
        <div className="PlanesInfo-">
          {this.props.planes &&
            this.props.planes.map((plane, idx) => {
              return (
                <div key={plane[0]} className="PlanesInfo-row">
                  <p>{plane[1] || "N/A"}</p>
                  <p>{plane[2] || "N/A"}</p>
                  <p>{Math.floor(plane[9]*3.6) || "N/A"}</p>
                  <p>{Math.floor(plane[13] * 3.28084) || "N/A"}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default PlanesInfo;
