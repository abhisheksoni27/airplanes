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
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="PlanesInfo-root">{Header}</div>;
  }
}

export default PlanesInfo;
