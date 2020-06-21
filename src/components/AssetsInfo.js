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
            ID={asset.id}
            name={asset.name}
            path={`/images/${asset.path}`}
            collectionId={asset.collectionId}
            getImgFromMaster={this.props.getImgFromMaster}
            getCollectionId={this.props.getCollectionId}
            defaultMasterId={this.props.defaultMasterId}
            //selectedAssets={this.props.selectedAssets}
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

  componentDidMount(){
    
  }

  setMaster() {
    this.setState(state => ({
      showIcon: !state.showIcon,
      
    }))
    this.props.getImgFromMaster(this.props.path)
    this.props.getCollectionId(this.props.collectionId)
  }


  render() {
    let defaultMasterId = this.props.defaultMasterId
    console.log("vvvvvvvv"+this.props.defaultMasterId)
    return (
      <div className="asset-card">
        <img src={this.props.path} alt="profile" width="150" height="150" />
        <div className="asset-detail">
          <p>Name: {this.props.name}</p>
          <p>ID: {this.props.ID}</p>
          {this.props.ID===defaultMasterId ? 
            !this.state.showIcon : this.state.showIcon ?
            <FontAwesomeIcon icon={faThumbtack} size="2x" />
            : <button className="master" onClick={this.setMaster}
              style={{ visibility: this.state.showIcon ? 'hidden' : 'visible' }}>
              Set Master
              </button>
          }
        </div>
      </div>

    )
  }
}