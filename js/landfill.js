import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'
import $ from 'jquery'
import Firebase from 'firebase'
import Backbone from 'bbfire'
import Select from 'react-select'
import GoogleMapsLoader from 'google-maps'
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react'
import {ClothingListing} from './ClothingListing'
import {ClothingGrid} from './ClothingGrid'
import {DirectionsView,Instruction} from './directions'
import {ThreeView} from './threeview'
import {NineView} from './nineview'
import {Listing,ListingGrid} from './listing'
import {DumpView} from './dump'

   var LandfillListing = React.createClass({
   
       _getClosest: function(clickEvent) {
           return (
                   <div className="listingClosest">*closest to your current location!</div>
                   )
       },
       getInitialState: function() {
           return {
               more: 'more',
           }
       },

       _triggerMapView: function(clickEvent) {
           var item = clickEvent.target
           var lat=this.props.userLat
           var lng=this.props.userLon
           var address=this.props.listing.Location
           window.location.hash = lat + "/" + lng + "/map/" + address
       },
    
       render: function() {
           var closest = ''
           var styleObj ={}
           var styleObjThree ={}
           var buttonObj = {}
           var detailObj = {}
           var className ="infoDiv"
           var classNameMat ="infoDivMat"
           var url ='https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + this.props.listing.Address + '&heading=151.78&pitch=-0.76&key=AIzaSyAlioIpF4LPLreb8s11Mxtsm5CdDbZRkFQ'
           if(this.props.color >0) {
               styleObjThree={display:'inline-block'}
            
             styleObj={width: "100%"}
           }
           if(this.props.color <1) {
                url = 'westpark.png'
               styleObj ={backgroundColor: 'rgba(255, 255, 255, 0.3)'}

               closest = this._getClosest()
               className = 'infoDivNone'
               classNameMat ='infoDivNone'
               styleObj ={backgroundColor: 'rgba(255, 255, 255, 0.3)'}
           }
            // if(this.props.color ===1) {
            //     url = 'sunbeam.png'
            // }

        
           return (
               <div>
                   <div userLon={this.props.userLon} userLat={this.props.userLat} className="listing" listing={this.props.listing}>
                       <div className="wordsContainer">
                       <div className="streetViewContainer">
                               <img className="streetView" src={url}/>
                               <div className="streetViewArrow">
                            </div>
                           </div>
                           <div className="words">
                               <h3> {this.props.listing.Name} </h3>
                           </div>
                           <div className="buttonContainer">
                              {closest}
                           <button style={buttonObj} data-index={this.props.color} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
                           <p className="infoMini"> {"\u2672"}{this.props.listing.Address} <br/> {"\u260E"} {this.props.listing.Phone}</p>
                           </div>
                       </div>
                   </div>
               </div>
               )
               }
   })

   var LandfillGrid = React.createClass({
       getInitialState: function() {
           return {
               search: true,
               list: 1,
               delete: false,
               lat: this.props.lat,
               lng: this.props.lng,
               clicked: false,
               zip: false
           }
       },
       componentDidMount: function() {
           var self = this
           this.props.jsonData.on('sync', function() { self.forceUpdate() })
            this.props.lcm.on('sync', function() { self.forceUpdate() })
       },

       _clicked: function(clickEvent){
           if(this.state.clicked !== true){
               this.setState({clicked: true})
           }
           else{
               this.setState({clicked: false})
           }
       },
       _update: function() {
           this.setState({
               more: this.state.more,
               list: this.state.list
           })
       },
       _addList: function() {
           this.state.list += 2
           this._update()
       },

       _delete: function() {
           this.setState({ delete: true})
       },

      _findMin: function(resultsArr, w) {
           var newLatitude = 0
           var newLongitude = 0
           var objArr = []
           var hypArr = []
           for (var i = 0; i < resultsArr.length; i++) {
               var dataObject = resultsArr[i].attributes
               console.log('dataObject', dataObject)
            var coord = "https://maps.googleapis.com/maps/api/geocode/json?address=" + dataObject.Address + "TX&key=AIzaSyAGcVpoS35RezE4cQzMXcH-M1VdQgZXuw0"
            var coordDat = $.get(coord)
              coordDat.then(function(data){
                     newLatitude = data.results[0].geometry.location.lat
                     newLongitude = data.results[0].geometry.location.lon
               })     
                  
               var hyp = (Math.pow(newLatitude - this.props.lat, 2) + Math.pow(newLongitude - this.props.lng, 2))
               var hypObj = { x: i, y: hyp, z: { dataObject } }
               objArr.push(hypObj)
               hypArr.push(hyp)
           }
           var hyp = Math.min.apply(Math, hypArr)
           var list = objArr.sort(function(a, b) {
               var hypA = (a.y),
                   hypB = (b.y)
               return hypA - hypB
           })
           var finalArr = this._getListingsJsx(list, i)
           return finalArr
       },

       _subList: function() {
           this.state.list -= 2
           this._update()
       },
       _changeHash: function(clickEvent) {
           var label = 'all'
           var state = ''
        
           var query = clickEvent.target.value
           query = query.split(' ')
            if(query[1] =='Wisconsin'){
            state ='Wisconsin'
           }else {
            state = 'Texas'
           }
           query = query[0] 
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}/${state}`
       },

       _goHome: function(clickEvent){
           location.hash = `${this.props.lat}/${this.props.lng}`
       },

       _searchQuery: function(changeEvent) {
           this.setState({search:'false'})
           var label = changeEvent.label
           var query = changeEvent.value
         
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
           query = ''
       },
   _getListingsJsx: function(resultsArr, i) {
           var jsxArray = []
           for (var i = 0; i < this.state.list; i++) {
               var dataObject = resultsArr[i].z.dataObject
               var component = <LandfillListing color={i} userLat={this.props.lat} userLon={this.props.lng} listing={dataObject} key={i} />
               jsxArray.push(component)
           }
           return jsxArray
       },

       render: function() {
           var data = this.props.jsonData.models
           var buttonObjTwo = {display: 'inline-block'}
           if (data.length > 0 && this.props.state === 'Wisconsin') {
               buttonObjTwo.display = "none"
               data = this.props.lcm.models
           }
           var navObj ={}
           var className='pickup'
           var styleObj = { 'display': 'none' }
           var content= <img className="loadingGifThree" src="https://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
           var title ="landfills"
           if(data.length > 0){
               content =this._findMin(data)
           }
           if (this.state.list > 1) {
               styleObj.display="inline-block"
           }
         
           if(this.props.query === "paper" || this.props.query === 'plastic'|| this.props.query === 'can' || this.props.query === 'cardboard'){
                className='pickupTwo'
            } else {
               className='pickup'
            }
           if (this.state.delete) {
               zip.display = 'none'
           }
           
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
                       <div> Dump is an open source application.
                           <br/>If you would like to contribute to our database please visit
                           <a className="boxLink" href="https://github.com/kvanlaan/dump">
                           <div className="boxLinkText">https://github.com/kvanlaan/dump</div>
                           </a>.
                       </div>
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
               <div className="header"><h1>Dump<div className="listingTitle">{title}</div></h1></div>
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
                       onChange={this._searchQuery}/>
               <div className ="errorContainer"></div>
               <div className="listingContainer">
                     {content}
                     <button style={styleObj} className="button" updater={this.props.updater} onClick={this._subList}> Less Results</button>
                     <button style={buttonObjTwo}className="button" onClick={this._addList}> More Results</button>
              </div>
           </div>
           </div>
           )
       }
   })

export {LandfillListing,LandfillGrid}