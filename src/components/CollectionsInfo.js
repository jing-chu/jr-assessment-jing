import React from "react"
import "../styles.css"
import { getCollectionsAsync } from "../api/data.js"
import { getAssetsByCollectionAsync } from "../api/data.js"
import { getAssetByIdAsync } from "../api/data.js"
import { faJoint } from "@fortawesome/free-solid-svg-icons"


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
      data.forEach(collection => {
        this.props.setDefaultMasterId(collection.id, collection.masterAssetId)
      })
    })
  }

  getRecurName(tag){
    if('subTag' in tag === false){
      return tag.name
    }
    return `${tag.name} > ${this.getRecurName(tag.subTag)}`
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
            tag={this.getRecurName(collection.tags)}
            setDataFromCollection={this.props.setDataFromCollection}
            masterId={this.props.masterIdObj[collection.id] || collection.masterAssetId}
          />
        )}
      </div>
    )
  }
}

export class CollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterPath: ""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  updateCollectionIcon = (masterId) => {
    getAssetByIdAsync(masterId).then((data) => {
      this.setState({ masterPath: "/images/" + data.path })
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    let collectionId = this.props.ID
    getAssetsByCollectionAsync(collectionId).then((data) => {
      this.props.setDataFromCollection(data)
    })
  }

  componentDidMount() {
    this.updateCollectionIcon(this.props.masterId)
  }
  componentWillReceiveProps(props) {
    this.updateCollectionIcon(props.masterId)
  }

  render() {
    return (
      <div>
        <p >{this.props.tag}</p>
        <div className="collection-card">
          <img className="collection-img" src={this.state.masterPath} alt={this.props.name} onClick={this.handleClick} width="150" height="150" />
          <div className="collection-detail">
            <p className="collection-select" onClick={this.handleClick}>
              {this.props.name}
            </p>
          </div>
        </div>
      </div>
    )
  }
}