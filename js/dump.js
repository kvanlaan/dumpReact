import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'



   var DumpView = React.createClass({
        getInitialState: function() {
           return {
               clicked: false,
               search: true
           }
       },
          
       _clicked: function(clickEvent){
           if(this.state.clicked !== true){
               this.setState({clicked: true})
           }
           else{
               this.setState({clicked: false})
           }
       },
       _searchQuery: function(changeEvent) {
           this.setState({search:'false'})
           var label = changeEvent.label
           var query = changeEvent.value
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
        
       },


       _changeHash: function(clickEvent) {
           var label = 'all'
           var query = clickEvent.target.value
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
        
       },
       _goHome: function(clickEVent){
                 location.hash = `${this.props.lat}/${this.props.lng}`


       },


      render: function() {
           var navObj ={}
           if(this.state.clicked){
               navObj ={display: 'inline-block'}
           }else {
               navObj={}
           }


         return(
               <div className="nextContainer">
                   <button onClick={this._clicked} className="dashButton">d</button>
                   <div style={navObj} className="dashOpenSource">
                       <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit
                           <a className="boxLink" href="https://github.com/kvanlaan/dump">
                               <div className="boxLinkText">https://github.com/kvanlaan/dump</div>
                           </a>.
                       </div>
                   </div>
                   <div onClick={this._changeHash}  className="dashNavBar">
                       <div  value="recycling" className="dashNavEl">
                           Recycling Centers
                       </div>
                       <div  value="clothing" className="dashNavEl">
                           Clothing Donation
                       </div>
                       <div value="toy" onClick={this._changeHash} className="dashNavEl">
                           Toy Donation
                       </div>
                       <div onClick ={this._changeHash} value="food" className="dashNavEl">
                        Food Donation
                       </div>
                       <div onClick ={this._changeHash} value="landfills" className="dashNavEl">
                       Landfills
                       </div>
                      <button onClick={this._goHome} className="dashHomeButton">home</button>
                   </div>
                   <div className="header">
                       <h1>Dump<div className="listingTitle"> it!</div></h1>
                   </div>
                   <Select
                       className="select"
                       lat={this.props.lat}
                       lng={this.props.lng}
                       tc={this.props.tc}
                       fc={this.props.fc}
                       rc={this.props.rc}
                       lc={this.props.lc}
                       yelpData={this.props.yelpData}
                       updater={this._updater} 
                       name="form-field-name"
                       value=""
                       options={list}
                       onChange={this._searchQuery}    />
                   <img className="loadingGifTwo" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
          </div>
          )
      }
   })


export {DumpView}