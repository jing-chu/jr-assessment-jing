import React from "react"
import AssetsInfo from './components/AssetsInfo'
import CollectionsInfo from './components/CollectionsInfo'
import "./styles.css"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      asstes: [] 
    }
}

  callback = (dataFromCollection)=>{
    this.setState({asstes:dataFromCollection})
  }

  render(){
    return(
      <div className="app">
        <CollectionsInfo appCallback={this.callback}/>
        <AssetsInfo selectedAssets={this.state.asstes}/>
      </div>
    )
  }
}
