import React from "react"
import AssetsInfo from './components/AssetsInfo'
import CollectionsInfo from './components/CollectionsInfo'
import "./styles.css"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      assets: [],
      //path:"",  //path of master img, from A to C
      //collectionId:0,  //default
      //defaultMasterId:0
      masterIdObj:{}
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

  setMasterId = (collectionId, masterId)=> {
    const T=this.state.masterIdObj
    T[collectionId]=masterId
    this.setState({masterIdObj: T})
  }

  render(){
    //console.log(this.state.masterIdObj)
    const curMasterId=this.state.assets.length===0 ? 0 : 
      this.state.masterIdObj[this.state.assets[0].collectionId]
    return(
      <div className="app">
        <CollectionsInfo setDataFromCollection={this.setDataFromCollection}
          setDefaultMasterId={this.setMasterId} 
          masterPath={this.state.path} 
          collectionId={this.state.collectionId}
          masterIdObj={this.state.masterIdObj}
          />
   
        <AssetsInfo selectedAssets={this.state.assets}
          setMasterId={this.setMasterId}
          //defaultMasterId={this.state.defaultMasterId} 
          masterId={curMasterId}
          setImgFromMaster={this.setImgFromMaster} 
          setCollectionId={this.setCollectionId} />
      </div>
    )
  }
}
