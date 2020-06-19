import React from "react"
import "../styles.css"

import { getAssetByIdAsync } from "../api/data.js"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollectionsInfo from './CollectionsInfo'


export default class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="assetsInfo">
        <h1>Assets Info</h1>
        {this.props.selectedAssets.map(asset =>
          <AssetCard
            key={asset.id}
           
            name={asset.name}
            path="https://via.placeholder.com/150"
          />
        )}
      </div>
    )
  }
}

export class AssetCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showIcon: false,
    }
    this.setMaster = this.setMaster.bind(this)
  }

  setMaster() {
    this.setState(state => ({
      showIcon: !state.showIcon
    }))
  }

  render() {

    return (
      <div className="asset-card">
        <img src={this.props.path} alt="profile" />
        <div className="asset-detail">
          <p>Name: {this.props.name}</p>
          <p>ID: {this.props.id}</p>
          {this.state.showIcon ?
            <FontAwesomeIcon icon={faThumbtack} size="2x" />
            : <button onClick={this.setMaster}>
              Set Master
                </button>}

        </div>
      </div>

    )
  }
}