// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

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
// console.log(shouldPureComponentUpdate)

function app() {
   
    

   var LandfillListing = React.createClass({
   
       // _getClosest: function(clickEvent) {
       //     return (
       //             <div className="listingClosest">*closest to your current location!</div>
       //             )
       // },
       getInitialState: function() {
           return {
               more: 'more',
           }
       },


       // _getMap: function(clickEvent) {
       //     return (
       //             <img className="mapTwo" src="mapPlace.png"/>
       //             )
       // },


       // _more: function(clickEvent) {
       //     if (this.state.more === 'more') {
       //         this.setState({ more: 'less' })
       //     } else {
       //         this.setState({ more: 'more' })
       //     }
       // },


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
      
         console.log('name', this.props.listing.Name)
           // var url ='https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + this.props.listing.Lat + "," + this.props.listing.Lon + '&heading=151.78&pitch=-0.76&key=AIzaSyAlioIpF4LPLreb8s11Mxtsm5CdDbZRkFQ'



          
           if(this.props.color >0) {
               styleObjThree={display:'inline-block'}
            
             styleObj={width: "100%"}
           }
           if(this.props.color <1) {
                // url = 'westpark.png'
               // className = 'infoDivNone'
               // classNameMat ='infoDivNone'
               styleObj ={backgroundColor: 'rgba(255, 255, 255, 0.3)'}
           }



            // if(this.props.color ===1) {
            //     url = 'sunbeam.png'
            // }
         
           return (
               <div>
                   <div userLon={this.props.userLon} userLat={this.props.userLat} className="listing" listing={this.props.listing}>
                       <div className="wordsContainer">
                          
                           <div className="words">
                               <h3> {this.props.listing.Name} </h3>
                           </div>
                           <div className="buttonContainer">
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
               list: 3,
               delete: false,
               lat: this.props.lat,
               lng: this.props.lng,
               clicked: false,
               zip: false
           }
       },
       componentDidMount: function() {
           var self = this
           this.props.rc.on('sync', function() { self.forceUpdate() })
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



       _subList: function() {
           this.state.list -= 2
                this._update()
       },



       _changeHash: function(clickEvent) {
           var label = 'all'
           var query = clickEvent.target.value
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
    
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



       _getListingsJsx: function(data, i) {
           var jsxArray = []
           for (var i = 0; i < this.state.list; i++) {
               var dataObject = data[i].attributes
               console.log('landfill', dataObject)
               var component = <LandfillListing color={i} userLat={this.props.lat} userLon={this.props.lng} listing={dataObject} key={i} />
               jsxArray.push(component)
           }
           return jsxArray
       },



       render: function() {

           var data = this.props.jsonData.models
           console.log('landfilldata', data)
           var navObj ={}
           var className='pickup'
           var styleObj = { 'display': 'none' }
           var content= <img className="loadingGifThree" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
           var title ="landfills"



           if(data.length > 1){
               content =this._getListingsJsx(data)
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
                   <button onClick={this._clicked} className="dashButton">d</button>
                   <div style={navObj} className="dashOpenSource">
                       <div> Dump is an open source application.
                           <br/>If you would like to contribute to our database please visit
                           <a className="boxLink" href="https://github.com/kvanlaan/dump">
                           <div className="boxLinkText">https://github.com/kvanlaan/dump</div>
                           </a>.
                       </div>
                   </div>
                   <div className = "dashNavBar">
                       <div className = "dashElBar">
                           <div  onClick={this._changeHash} value="recycling" className="dashNavEl">
                               Recycling Centers
                           </div>
                           <div  onClick={this._changeHash}value="clothing" className="dashNavEl">
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
                     <button className="button" onClick={this._addList}> More Results</button>
              </div>
           </div>
           )
       }



   })
  
   
   var ListingsView = React.createClass({
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
        _changeHash: function(clickEvent) {
           var label = 'all'
           var query = clickEvent.target.value
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
       },


       componentDidMount: function() {
           var self = this
           this.props.rc.on('sync', function() { self.forceUpdate() })
       },


       _goHome: function(clickEVent){
                 location.hash = `${this.props.lat}/${this.props.lng}`


       },
     
       _isError: function(keyEvent){
           var query = keyEvent.target.value
           if (keyEvent.keyCode === 13) {
           if (query !== "dump" && query !== "food" && query !== "clothing" && query !== "recycling") {
               DOM.render(<Wrong name={query} lat={this.props.lat} lng={this.props.lng} jsonData={this.props.fc}/>, document.querySelector('.errorContainer'))
               }
            }
       },


       _getContentJSX: function(list){
           var styleObj = {}
           var navObj ={}
           if (this.state.search !==  true) {
               styleObj = { marginTop: "3%"}
           } else {
               styleObj = { marginTop: "20%" }
           }
           if(this.state.clicked){
               navObj ={display: 'inline-block'}
           }else {
               navObj={}
           }
         return(
             <div className="nextContainer">
                <div className="bar">
             <button onClick={this._clicked} className="dashButton">d</button>
             <div style={navObj} className="dashOpenSource">
               <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit <a className="boxLink" href="https://github.com/kvanlaan/dump"><div className="boxLinkText">https://github.com/kvanlaan/dump</div></a>. </div>
              </div>


              <div onClick={this._changeHash}  className = "dashNavBar">
              <div className = "dashElBar">
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
              </div>
              
              <button onClick={this._goHome} className="dashHomeButton">home</button>
              </div>
              </div>
                 <div className="header"><h1 style={styleObj}>Dump</h1></div>
                   <Select
                       className="select"
                       lat={this.props.lat}
                       lng={this.props.lng}
                       tc={this.props.tc}
                       fc={this.props.fc}
                       rc={this.props.rc}
                       lc={this.props.lc}
                       yelpData={this.props.yelpData}
                       name="form-field-name"
                       value=""
                       options={list}
                       search={this.props.search}
                       onKeyDown={this._isError}
                       onChange={this._searchQuery}
                       onClick={this._getClasses}
                       />
               <div className ="errorContainer"></div>
               <div className="listingContainer">
               </div>
             </div>


         )
       },


       _searchQuery: function(changeEvent) {
           var label = changeEvent.label
           var query= changeEvent.value
           this.setState({search:'false'})
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
       },


       render: function() {
           var route = window.location.hash.substr(1),
               routeParts = route.split('/')
           var routeLat = routeParts[0],
               routeLng = routeParts[1]
           var content ={}
           if (routeLat === ""){
                 content =<img className="loadingGif" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>



           } else{


                 content = this._getContentJSX(list)


           }


           return (


               <div>


                   {content}


               </div>


           )


       }


   })

  
   var LandfillCollection = Backbone.Firebase.Collection.extend({
       initialize: function() {
           this.url = "https://dumpproject.firebaseio.com/landfills/Sheet1"
       }
   })


    var RecyclingCollection = Backbone.Firebase.Collection.extend({
        initialize: function() {
            this.url = "https://dumpproject.firebaseio.com/centers/2015%20Neighborhood%20Depositories"
        }
    })

    var YelpFetcher = Backbone.Collection.extend({

        url: "http://yelphubb.herokuapp.com/api/yelp",

        _setUrl: function(pString){
            this.url += "?"+pString
        },

        parse: function(rawData){
            return rawData.businesses
        },

        initialize: function(paramsObj){
        var paramStr = ''
        for (var key in paramsObj){
          var val = paramsObj[key]+""
          paramStr += "&"+[key]+"="+ val.replace(/ /g,'+')
        }

        console.log(paramStr)
        this._setUrl(paramStr.substr(1))
      }

    })

    var DumpModel = Backbone.Model.extend({

        initialize: function(index) { 
            this.url = `https://dumpproject.firebaseio.com/centers/2015%20Neighborhood%20Depositories/${index}.json`
        }

    })

    
   var dumpRouter = Backbone.Router.extend({
       routes: {
           ":lat/:lng/map/:address": "map",
           ":lat/:lng/:query/:label": "search",
           "*default": "home",
       },



       map: function(lat, lng, address){
           window.GoogleMapsLoader = GoogleMapsLoader
            GoogleMapsLoader.KEY = 'AIzaSyAGcVpoS35RezE4cQzMXcH-M1VdQgZXuw0'
            GoogleMapsLoader.load(function(google) {
           var geocoder = new google.maps.Geocoder;
           var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
           geocoder.geocode({'location': latlng}, function(results, status) {
           if (status === google.maps.GeocoderStatus.OK) {
           if (results[1]) {
           var origin=results[0]
           origin=origin.formatted_address
                   var directionsDisplay = new google.maps.DirectionsRenderer;
                    var ds = new google.maps.DirectionsService()
                    ds.route({
                            origin: origin,
                            destination: address,
                            travelMode: google.maps.TravelMode.DRIVING
                        }, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result)
                                            DOM.render(<DirectionsView origin={origin} address={address} data={result} />, document.querySelector('.container'))
                                            var map = new google.maps.Map(document.querySelector(".dirMap"),
                                           {zoom: 7,center: { lat: Number(lat), lng: Number(lng)}})
                                           directionsDisplay.setMap(map)
                                           var panorama = new google.maps.StreetViewPanorama(
                                                 document.querySelector('pano'), {
                                                   position: { lat: Number(lat), lng: Number(lng)},
                                                   pov: {
                                                     heading: 34,
                                                     pitch: 10
                                                   }
                                                 });
                                             map.setStreetView(panorama);
                                           
                                           }
                                     else {
                                window.alert('Directions request failed due to ' + status);
                                        }
   
                           }
                           )



                            }



                       else {
                     window.alert('No results found');
                            }
                           } else {
                           window.alert('Geocoder failed due to: ' + status);  
                                   }
                              
                          
               })
           })



       },



       search: function(lat,lng, query, label) {
           var rc = new RecyclingCollection()
           var lc = new LandfillCollection();
           console.log('lc', lc)
           var yelpData = new YelpFetcher({
               location: 'Houston',
               term: 'clothing donation',
               limit: 10,
               category_filter: ''
           })
           var route = window.location.hash.substr(1),
               routeParts = route.split('/')
           var lat = routeParts[0],
               lng = routeParts[1]
           var toyData = new YelpFetcher({
               location: 'Houston',
               term: 'toy donation',
               limit: 10,
               category_filter: ''
           })
           var foodData = new YelpFetcher({
               location: 'Houston',
               term: 'food donation',
               limit: 10,
               category_filter: ''
           })
           rc.fetch()
           toyData.fetch()
           foodData.fetch()
           yelpData.fetch()
           lc.fetch();
           var jsxArray = []
           var data = []
           var resultsArr = rc.models
           if (query === "toy") {
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           tc={toyData}
                           rc={rc}
                           yelpData={yelpData}
                           fc={foodData} jsonData={toyData}/>, document.querySelector('.container'))
           }
           if (query === "food") {
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           tc={toyData}
                           lc={lc} 
                           rc={rc}
                           yelpData={yelpData}
                           fc={foodData}
                           jsonData={foodData}/>, document.querySelector('.container'))
           }
           if (query === "dump") {
               DOM.render(<DumpView
                           lat={lat}
                           lng={lng}
                           rc={rc}
                           jsonData={data}
                           yelpData={yelpData}
                           lc={lc}
                           tc={toyData} 
                           fc={foodData}
                           jsonData={foodData}/>, document.querySelector('.container'))
           }
           if (query === "body") {
               DOM.render(<NineView 
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           jsonData={data}
                           yelpData={yelpData}
                           tc={toyData} 
                           fc={foodData}/>, document.querySelector('.container'))
           }
           if (query === "animal") {
               DOM.render(<ThreeView
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc} 
                           tc={toyData} 
                           yelpData={yelpData}
                           fc={foodData}/>, document.querySelector('.container'))
           }
           if (query === "clothing") {
               console.log('rendering clothin')
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData} 
                           yelpData={yelpData}
                           fc={foodData}
                           jsonData={yelpData}/>, document.querySelector('.container'))
           }



           if (query === "landfills") {
                console.log('rendering landfill')
                    DOM.render(<LandfillGrid
                           label={label}
                           query={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData}
                           fc={foodData}
                           yelpData={yelpData}
                           jsonData={lc}/>, document.querySelector('.container'))
           }



           if (query === "recycling"){
               console.log('renderin rc')
               rc = rc.models
               DOM.render(<ListingGrid
                           label={label}
                           query={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData}
                           fc={foodData}
                           yelpData={yelpData}
                           jsonData={rc}/>, document.querySelector('.container'))



           }



           if (query !== "dump" && query !== "food" && query !== "clothing" && query !== "toy" && query !== "animal" && query !== "body" && query !== "landfills"&& query !== "recycling") {
               for (var i = 0; i < resultsArr.length; i++) {
                   var dataObject = resultsArr[i]
                   var categories = dataObject.attributes.Category
                   var materials = dataObject.attributes.Materials



                   if (materials.indexOf(query) !== -1 || categories.indexOf(query) !== -1) {
                       data.push(dataObject)
                   }
               }
         
               DOM.render(<ListingGrid
                           label={label}
                           query={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData}
                           fc={foodData}
                           yelpData={yelpData}
                           jsonData={data}/>, document.querySelector('.container'))
                                     
           }



     
       },



       home: function(){
           var successCallback = function(positionObject) {
               var lat = positionObject.coords.latitude
               var lng = positionObject.coords.longitude
               location.hash = lat + "/" + lng
          
           }
           var errorCallback = function(error) {

           }
           window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback)



           var rc = new RecyclingCollection();
           rc.fetch();



           var lc = new LandfillCollection();
           lc.fetch();



           console.log(lc)
           var route = window.location.hash.substr(1),
               routeParts = route.split('/')
           var lat = routeParts[0],
               lng = routeParts[1]



           var yelpData = new YelpFetcher({
               location: 'Houston',
               term: 'clothing donation',
               limit: 10,
               category_filter: ''
           })



           yelpData.fetch()

           var toyData = new YelpFetcher({
               location: 'Houston',
               term: 'toy donation',
               limit: 10,
               category_filter: ''
           })
           var foodData = new YelpFetcher({
               location: 'Houston',
               term: 'food donation',
               limit: 10,
               category_filter: ''
           })
           toyData.fetch()
           foodData.fetch()
      
    DOM.render(<ListingsView
                   lat={lat}
                   lng={lng}
                   lc={lc}
                   tc={toyData}
                   fc={foodData}
                   rc={rc}
                   yelpData={yelpData}/>, document.querySelector('.container'))
       },
      
       initialize: function() {

           Backbone.history.start()



       }



   })



   var rtr = new dumpRouter()
}



app()




