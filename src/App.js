import React from "react"
import AssetsInfo from './components/AssetsInfo'
import CollectionsInfo from './components/CollectionsInfo'
import "./styles.css"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      assets: [],
      path:"",  //path of master img, from A to C
      collectionId:0,  //default
      defaultMasterId:0
    }
}

  setDataFromCollection = (dataFromCollection)=>{
    this.setState({assets:dataFromCollection})
  }

  setImgFromMaster = (imgFromMaster)=>{
    this.setState({path:imgFromMaster})
  }

  setCollectionId = (collectionId)=>{
    this.setState({collectionId:collectionId})
  }

  setDefaultMasterId = (defaultMasterId)=> {
    this.setState({defaultMasterId:defaultMasterId})
  }


  render(){
    //console.log(this.state.assets)
    return(
      <div className="app">
        <CollectionsInfo setDataFromCollection={this.setDataFromCollection}
          setDefaultMasterId={this.setDefaultMasterId} 
          masterPath={this.state.path} 
          collectionId={this.state.collectionId} />
   
        <AssetsInfo selectedAssets={this.state.assets}
          collectionId={this.state.assets.length==0 ? 0 : this.state.assets[0].collectionId}
          defaultMasterId={this.state.defaultMasterId} 
          setImgFromMaster={this.setImgFromMaster} 
          setCollectionId={this.setCollectionId} />
      </div>
    )
  }
}
