import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'
import {DumpView} from './dump'
import {DirectionsView,Instruction} from './directions'
import {ThreeView} from './threeview'
import {NineView} from './nineview'
import Select from 'react-select'
import {LandfillListing,LandfillGrid} from './landfill'
import {ClothingListing} from './ClothingListing'


   var ClothingGrid = React.createClass({
      componentWillMount: function() {
           var self = this
           this.props.yelpData.on('sync', function() { self.forceUpdate() })
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
       _clicked: function(clickEvent) {
           if (this.state.clicked !== true) {
               this.setState({ clicked: true })
           } else {
               this.setState({ clicked: false })
           }
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

       _searchQuery: function(changeEvent) {
           this.setState({ search: 'false' })
           var label = changeEvent.label
           var query = changeEvent.value
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`

       },

     _changeHash: function(clickEvent) {
           var label = 'all'
           var state = ''
        
           var query = clickEvent.target.value
           query = query.split(' ')
           console.log(query)
            if(query[1] =='Wisconsin'){
            state ='Wisconsin'
           }else {
            state = 'Texas'
           }

           query = query[0] 
           console.log('click event', state)
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}/${state}`
       },


       _goHome: function(clickEVent) {
           location.hash = `${this.props.lat}/${this.props.lng}`
       },


       render: function() {
         var data = this.props.yelpData
             if(this.props.myd.length > 0 && this.props.state === 'Wisconsin'){
            console.log('is madison')
            data = this.props.myd.models
            }

           if(data.length > 2 && this.props.state !== 'Wisconsin'){
             data = this.props.yelpData.models
           }
           var styleObj = { 'display': 'none' }
           if (this.state.list > 1) {
               styleObj.display = "inline-block"
           }
           var content=<img className="loadingGifThree" src="https://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>

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
                   <div  className= "dashNavBar">
                       <button onClick={this._clicked} className="dashButton">d</button>
                       <div style={navObj} className="dashOpenSource">
                           <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit <a className="boxLink" href="https://github.com/kvanlaan/dump"><div className="boxLinkText">https://github.com/kvanlaan/dump</div></a>. </div>
                       </div>
                       
                    <div className = "dashElBar">
                      <div className="dashNavEl">
                             <div className="dashNavElTitle">
                   Recycling Centers 
                   </div>
                       <div className="drop"> 
                      <div className="dropEl" onClick={this._changeHash} value="recycling Texas" data-state="Texas" >Houston</div>
                      <div className="dropEl" onClick={this._changeHash} value="recycling Wisconsin" data-state="Wisconsin" >Madison</div>
                      </div>
                      </div>
                      <div className="dashNavEl">
                        <div className="dashNavElTitle">
                      Clothing Donation
                      </div>
                       <div className="drop"> 
                      <div className="dropEl"  value="clothing Texas" data-state="Texas" onClick={this._changeHash}>Houston</div>
                      <div  className="dropEl" value="clothing Wisconsin" data-state="Wisconsin" onClick={this._changeHash}>Madison</div>
                      </div>
                      </div>
                      <div  className="dashNavEl">
                         <div className="dashNavElTitle">
                      Toy Donation
                      </div>
                       <div className="drop"> 
                      <div  className="dropEl" value="toy Texas" data-state="Texas" onClick={this._changeHash}>Houston</div>
                      <div className="dropEl" value="toy Wisconsin" data-state="Wisconsin" onClick={this._changeHash}>Madison</div>
                      </div>
                      </div>
                       <div className="dashNavEl">
                       <div className="dashNavElTitle">
                      Food Donation
                      </div>
                       <div className="drop"> 
                      <div  className="dropEl" onClick={this._changeHash} value="food Texas" data-state="Texas" >Houston</div>
                      <div className="dropEl" onClick={this._changeHash} value="food Wisconsin" data-state="Wisconsin" >Madison</div>
                      </div>
                      </div>
                      <div  className="dashNavEl">
                       <div className="dashNavElTitle">
                    Landfills
                      </div>
                       <div className="drop"> 
                      <div className="dropEl" onClick={this._changeHash}  value="landfills Texas" data-state="Texas">Houston</div>
                      <div className="dropEl" onClick={this._changeHash} value="landfills Wisconsin" data-state="Wisconsin" >Madison</div>
                      </div>
                      </div>
                    <button onClick={this._goHome} className="dashHomeButton">home</button>
              </div>
              </div>
                   <div className="header"><h1>Dump<div className="listingTitle">{this.props.name} donation</div></h1></div>
                   
                   <Select
                       className="select"
                       lat={this.props.lat}
                       lng={this.props.lng}
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
               </div>
           )
       }
   })


export {ClothingGrid}
