import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'
import {DumpView} from './dump'
import {DirectionsView,Instruction} from './directions'
import {ThreeView} from './threeview'
import {NineView} from './nineview'
import Select from 'react-select'
import {ClothingListing} from './ClothingListing'





   var ClothingGrid = React.createClass({



       componentWillMount: function() {
         var self = this
         this.props.jsonData.on('sync',function() {self.forceUpdate()})
       },



       getInitialState: function() {
                   return {
                       search: true,
                       list: 1,
                       clicked: false
                   }
               },
       _update: function() {
           this.setState({
               more: this.state.more,
               list: this.state.list,
           })
       },
       _addList: function() {
           this.state.list += 2
           this._update()
       },



       _subList: function() {
           this.state.list -= 2
                this._update()
       },



       _clicked: function(clickEvent){
           if(this.state.clicked !== true){
               this.setState({clicked: true})
           }
           else{
               this.setState({clicked: false})
           }
       },
       _findMin: function(data) {
           var objArr = []
           var hypArr = []
           for (var i = 0; i < data.length; i++) {
               var dataObject = data[i].attributes
               var hyp = (Math.pow(dataObject.location.coordinate.latitude - this.props.lat, 2) + Math.pow(dataObject.location.coordinate.longitude - this.props.lng, 2))
               var hypObj = { x: i, y: hyp, z: { dataObject } }
               objArr.push(hypObj)
               hypArr.push(hyp)
           }
           var hyp = Math.min.apply(Math, hypArr)



           var list = objArr.sort(function(a, b) {
               var hypA = (a.y),
                   hypB = (b.y)
               return hypA - hypB //sort by date ascending
           })



           var finalArr = this._getListingsJsx(list, i)
           return finalArr



       },
       _getListingsJsx: function(resultsArr, i) {
           var jsxArray = []
           for (var i = 0; i < this.state.list; i++) {
               var dataObject = resultsArr[i].z.dataObject
               var component = <ClothingListing color={i} userLat={this.props.lat} userLon={this.props.lng} listing={dataObject} key={i} />
               jsxArray.push(component)
           }
           return jsxArray
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
          var data =  this.props.jsonData.models
           var styleObj = { 'display': 'none' }
           if (this.state.list > 1) {
               styleObj.display = "inline-block"
           }
           var content=<img className="loadingGifThree" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>



           if (data.length > 5){
               content =  this._findMin(data)
           }
             var navObj ={}
           if(this.state.clicked){
               navObj ={display: 'inline-block'}
           }else {
               navObj={}
           }
           return (
               <div className="nextContainer">
                   <div className="bar">
                       <button onClick={this._clicked} className="dashButton">d</button>
                       <div style={navObj} className="dashOpenSource">
                           <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit <a className="boxLink" href="https://github.com/kvanlaan/dump"><div className="boxLinkText">https://github.com/kvanlaan/dump</div></a>. </div>
                       </div>
                       <div  className="dashNavBar">
                           <div className = "dashElBar">
                               <div  onClick={this._changeHash} value="recycling" className="dashNavEl">
                               Recycling Centers
                               </div>
                           <div  onClick={this._changeHash} value="clothing" className="dashNavEl">
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
                           </div>
                       
                       <button onClick ={this._goHome} className="dashHomeButton">home</button>
                   </div>
                   </div>
                   <div className="header"><h1 >Dump<div className="listingTitle">{this.props.name} donation</div></h1>
                   </div>
                   <Select
                       className="select"
                       lat={this.props.lat}
                       lng={this.props.lng}
                       tc={this.props.tc}
                       fc={this.props.fc}
                       rc={this.props.rc}
                       lc={this.props.lc}
                       yelpData={this.props.jsonData}
                       name="form-field-name"
                       value=""
                       options={list}
                       search={this.props.search}
                       onChange={this._searchQuery}/>
                   <div className ="errorContainer"></div>
                   <div className="listingContainer">
                       {content}
                       <button style={styleObj} className="button" updater={this.props.updater} onClick={this._subList}> Less Results</button>
                       <button className="button" onClick={this._addList}> More Results</button>
                   </div>
               </div>
           )
       }
   })


export {ClothingGrid}
