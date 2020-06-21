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

  getDataFromCollection = (dataFromCollection)=>{
    this.setState({assets:dataFromCollection})
  }

  getImgFromMaster = (imgFromMaster)=>{
    this.setState({path:imgFromMaster})
  }

  getCollectionId = (collectionId)=>{
    this.setState({collectionId:collectionId})
  }

  getDefaultMasterId = (defaultMasterId)=> {
    this.setState({defaultMasterId:defaultMasterId})
  }


  render(){
    //console.log("IIIIDDDD"+this.state.defaultMasterId)
    return(
      <div className="app">
        <CollectionsInfo getDataFromCollection={this.getDataFromCollection}
          getDefaultMasterId={this.getDefaultMasterId} 
          masterPath={this.state.path} 
          collectionId={this.state.collectionId} />

        <AssetsInfo selectedAssets={this.state.assets}
          defaultMasterId={this.state.defaultMasterId} 
          getImgFromMaster={this.getImgFromMaster} 
          getCollectionId={this.getCollectionId} />
      </div>
    )
  }
}
