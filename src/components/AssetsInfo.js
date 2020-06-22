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
            setImgFromMaster={this.props.setImgFromMaster}
            setCollectionId={this.props.setCollectionId}
            //defaultMasterId={this.props.defaultMasterId}
            setMasterId={this.props.setMasterId}
            masterId={this.props.masterId}
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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.props.setMasterId)
    this.props.setMasterId(this.props.collectionId, this.props.ID)
    this.props.setImgFromMaster(this.props.path)
    this.props.setCollectionId(this.props.collectionId)
  }


  render() {
    
    //console.log("defaultMasterId"+this.props.defaultMasterId)
    //console.log("masterId"+this.props.masterId)
    return (
      <div className="asset-card">
        <img src={this.props.path} alt={this.props.name} width="150" height="150" />
        <div className="asset-detail">
          <p>Name: {this.props.name}</p>
          <p>ID: {this.props.ID}</p>
          {  
            (this.props.ID===this.props.masterId) ?
              <FontAwesomeIcon icon={faThumbtack} size="2x" />
              : <button className="master" onClick={this.handleClick}>
                  Set Master
                </button>
          }
        </div>
      </div>

    )
  }
}