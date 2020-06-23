import React from "react"
import "../styles.css"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class AssetsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      sortAssets:[]
    }
  }

  setSortAssets = (sortAssets)=>{
    this.setState({
      sortAssets:sortAssets
    })
  }

  render() {
    return (
      <div>
        <div className="sortForm">
          {
            this.props.selectedAssets.length!==0?
            <SortForm 
            setSortAssets={this.setSortAssets}
            selectedAssets={this.props.selectedAssets} 
            /> 
            : null
          }
          
        </div>
        
        <div className="assetsInfo">
          {this.state.sortAssets.length===0 ? 
            this.props.selectedAssets.map(asset =>
              <AssetCard
                key={asset.id}
                ID={asset.id}
                name={asset.name}
                path={`/images/${asset.path}`}
                collectionId={asset.collectionId}
                setMasterId={this.props.setMasterId}
                masterId={this.props.masterId}
              />)
            : this.state.sortAssets.map(
              asset =>
              <AssetCard
                key={asset.id}
                ID={asset.id}
                name={asset.name}
                path={`/images/${asset.path}`}
                collectionId={asset.collectionId}
                setMasterId={this.props.setMasterId}
                masterId={this.props.masterId}
              />
            )
        }
        </div>
      </div>
    )
  }
}

export class SortForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'name' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let assetArr = this.props.selectedAssets
    function compare_name(a, b){
      if(a.name < b.name){
              return -1;
      }else if(a.name > b.name){
              return 1;
      }else{
              return 0;
      }
    }
    function compare_id(a, b){
      if(a.id < b.id){
              return -1;
      }else if(a.id > b.id){
              return 1;
      }else{
              return 0;
      }
    }
    this.state.value==='name'? 
      assetArr.sort(compare_name) 
      : assetArr.sort(compare_id)
    this.props.setSortAssets(assetArr)
    event.preventDefault();
  }

  render() {
   
    
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="sort-label">
          Sort by:
        <select className="sort-select" value={this.state.value} onChange={this.handleChange}>
            <option value="name">Name</option>
            <option value="id">Id</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
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
  }


  render() {
    return (
      <div className="asset-card">
        <img src={this.props.path} alt={this.props.name} width="150" height="150" />
        <div className="asset-detail">
          <p>Name: {this.props.name}</p>
          <p>ID: {this.props.ID}</p>
          {
            (this.props.ID === this.props.masterId) ?
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