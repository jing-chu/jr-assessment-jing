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
      data.forEach(collection=>{
        this.props.setDefaultMasterId(collection.id, collection.masterAssetId)
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
            //masterAssetId={collection.masterAssetId}
            setDataFromCollection={this.props.setDataFromCollection}
            setDefaultMasterId={this.props.setDefaultMasterId}
            //masterPath={this.props.masterPath}
            masterId={this.props.masterIdObj[collection.id] || collection.masterAssetId}
            collectionId={collection.id}
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
      masterPath:""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  updateCollectionIcon=(masterId)=>{
    getAssetByIdAsync(masterId).then((data) => {
      this.setState({masterPath:"/images/"+data.path})   
    })
  }

  handleClick=(e)=>{
    e.preventDefault()
    //console.dir(this.props)
    let collectionId = this.props.ID
    getAssetsByCollectionAsync(collectionId).then((data) => {
      this.props.setDataFromCollection(data)
      //this.props.setDefaultMasterId(this.props.collectionId, this.props.masterAssetId)
    })
  }

  componentDidMount(){this.updateCollectionIcon(this.props.masterId)}
  componentWillReceiveProps(props){this.updateCollectionIcon(props.masterId)}

  render() {    
    return (
      <div className="collection-card">
        <img src={this.state.masterPath} alt={this.props.name} width="150" height="150" />
        <div className="collection-detail">
          <p className="collection-select" onClick={this.handleClick}>
            {this.props.name}
          </p>
        </div>
      </div>
    )
  }
}