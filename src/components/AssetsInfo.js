import React from "react"
import "../styles.css"

import { getAssetByIdAsync } from "../api/data.js"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollectionsInfo from './CollectionsInfo'


export default class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
     this.state ={
     masterID: 0
  }
  }
 
  componentWillReceiveProps(props){
    //console.log(props.collectionId)
    //console.log(this.props.collectionId)
    if(props.collectionId!==this.props.collectionId){
      this.setState({masterID:props.defaultMasterId})
    }
  }

  setMasterID=(state)=>{
    this.setState({
      masterID: state
    })
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
            defaultMasterId={this.props.defaultMasterId}
            setMasterID={this.setMasterID}
            masterID={this.state.masterID}
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
    this.setMaster = this.setMaster.bind(this)
  }

  componentDidMount(){
  
  }

  setMaster() {
    this.props.setMasterID(this.props.ID)
    this.props.setImgFromMaster(this.props.path)
    this.props.setCollectionId(this.props.collectionId)
  }


  render() {
    
    //console.log("defaultMasterId"+this.props.defaultMasterId)
    //console.log("masterID"+this.props.masterID)
    return (
      <div className="asset-card">
        <img src={this.props.path} alt={this.props.name} width="150" height="150" />
        <div className="asset-detail">
          <p>Name: {this.props.name}</p>
          <p>ID: {this.props.ID}</p>
          {  
            (this.props.ID===this.props.masterID) ?
              <FontAwesomeIcon icon={faThumbtack} size="2x" />
              : <button className="master" onClick={this.setMaster}>
                  Set Master
                </button>
          }
        </div>
      </div>

    )
  }
}