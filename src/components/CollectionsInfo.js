import React from "react"
import "../styles.css"
import { getCollectionsAsync } from "../api/data.js"
import AssetsInfo from './AssetsInfo'
import { getAssetsByCollectionAsync } from "../api/data.js"
import { getAssetByIdAsync } from "../api/data.js"


export default class CollectionsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: []
    }
  }

  componentDidMount() {
    getCollectionsAsync().then((data) => {
      this.setState({
        collections: data
      })
    })
  }

  render() {
    return (
      <div className="collectionsInfo">
        <h1>Please select one collection</h1>
        {this.state.collections.map(collection =>
          <CollectionCard
            key={collection.id}
            ID={collection.id}
            name={collection.name}
            masterAssetId={collection.masterAssetId}
            setDataFromCollection={this.props.setDataFromCollection}
            setDefaultMasterId={this.props.setDefaultMasterId}
            masterPath={this.props.masterPath}
            collectionId={this.props.collectionId}
          />
        )}
      </div>
    )
  }
}

export class CollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      defaultMasterPath:""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick=(e)=>{
    e.preventDefault()
    //console.dir(this.props)
    let collectionID = this.props.ID
    getAssetsByCollectionAsync(collectionID).then((data) => {
      this.props.setDataFromCollection(data)
      this.props.setDefaultMasterId(this.props.masterAssetId)
    })
  }

  componentDidMount(){
   let defaultMasterID = this.props.masterAssetId
   getAssetByIdAsync(defaultMasterID).then((data) => {
    this.setState({defaultMasterPath:"/images/"+data.path})
    
    })    
  }

  render() {    
    return (
      <div className="collection-card">
        <img src={this.props.masterPath!=='' && this.props.ID===this.props.collectionId? 
          this.props.masterPath : 
          this.state.defaultMasterPath} alt={this.props.name} width="150" height="150" />
        <div className="collection-detail">
          <p className="collection-select" onClick={this.handleClick}>
            {this.props.name}
          </p>
        </div>
      </div>
    )
  }
}