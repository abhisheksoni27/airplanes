import React, { Component } from "react";
import "./PlanesInfo.css";

const Header = (
  <div className="PlanesInfo-header">
    <p>CallSign</p>
    <p>Speed</p>
    <p>Altitude</p>
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
                <div className="PlanesInfo-row">
                  <p>{plane.callSign}</p>
                  <p>{plane.speed}</p>
                  <p>{plane.altitude}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default PlanesInfo;
