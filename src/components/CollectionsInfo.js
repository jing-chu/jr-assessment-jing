import React from "react"
import "../styles.css"
import { getCollectionsAsync } from "../api/data.js"
import AssetsInfo from './AssetsInfo'
import { getAssetsByCollectionAsync } from "../api/data.js"


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
            appCallback={this.props.appCallback}
          />
        )}
      </div>
    )
  }
}

export class CollectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick=(e)=>{
    e.preventDefault()
    console.dir(this.props)
    let collectionID = this.props.ID
    getAssetsByCollectionAsync(collectionID).then((data) => {
      this.props.appCallback(data)
    })

  }

  render() {
    return (
      <div className="collection-card">
        <img src="https://via.placeholder.com/150" alt="profile" />
        <div className="collection-detail">
          <p onClick={this.handleClick}>
            {this.props.name}
          </p>
        </div>
      </div>
    )
  }
}