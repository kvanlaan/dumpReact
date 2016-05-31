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
import {LandfillListing,LandfillGrid} from './landfill'
import {DumpView} from './dump'

function app() {

   var ListingsView = React.createClass({
        getInitialState: function() {
           return {
               clicked: false,
               search: true,
               showing: false
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

       _showDrop: function(clickEvent){
          if(this.state.showing === false) {
               this.setState({ showing: true })
           } else {
               this.setState({ showing: false })
           }

       },

       _getContentJSX: function(list){
           var styleObj = {}
           var navObj ={}
           var cityContent ={}
           var styleObjDrop = {display: 'none'}
           if(this.state.showing){
            styleObjDrop = {display: 'block'}
           } else {
            styleObjDrop = {display: 'none'}
           }
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
                      <div className="dropEl" onClick={this._changeHash} value="landfills Texas" data-state="Texas">Houston</div>
                      <div className="dropEl" onClick={this._changeHash} value="landfills Wisconsin" data-state="Wisconsin" >Madison</div>
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
                   name="form-field-name"
                   value=""
                   options={list}
                   search={this.props.search}
                   onKeyDown={this._isError}
                   onChange={this._searchQuery}
                   onClick={this._getClasses}
                   rc={this.props.rc}
                />
               <div className ="errorContainer"></div>
               <div className="listingContainer"></div>
             </div>
             </div>
         )
       },
       _searchQuery: function(changeEvent) {
           var label = changeEvent.label
           var query= changeEvent.value
           var state = this.props.state
           this.setState({search:'false'})
           location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}/${state}`
       },
       render: function() {
           var route = window.location.hash.substr(1),
               routeParts = route.split('/')
           var routeLat = routeParts[0],
               routeLng = routeParts[1]
           var content ={}
           if (routeLat === ""){
                 content =<img className="loadingGif" src="https://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
           } 
            else{
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

      var LandfillCollectionMad = Backbone.Firebase.Collection.extend({
       initialize: function() {
           this.url = "https://dumpproject.firebaseio.com/landfills/morelandfills/Sheet1"
       }
   })


    var RecyclingCollection = Backbone.Firebase.Collection.extend({
        initialize: function() {
            this.url = "https://dumpproject.firebaseio.com/centers/2015%20Neighborhood%20Depositories"
        }

    })

    var RecyclingCollectionMad = Backbone.Firebase.Collection.extend({
        initialize: function() {
            this.url = "https://dumpproject.firebaseio.com/madisonCenters/2015%20Neighborhood%20Depositories"
        }
    })

    var YelpFetcher = Backbone.Collection.extend({

        url: "https://yelphubb.herokuapp.com/api/yelp",

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
           ":lat/:lng/:query/:label/:state": "search",
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

       search: function(lat,lng, query, label, state) {
           var rc = new RecyclingCollection()
             rc.fetch()
           var rcm = new RecyclingCollectionMad()
           var lc = new LandfillCollection()
           var lcm = new LandfillCollectionMad()
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

           var yelpDataMad = new YelpFetcher({
               location: 'Madison',
               term: 'clothing donation',
               limit: 10,
               category_filter: ''
           })

           var toyDataMad = new YelpFetcher({
               location: 'Madiso',
               term: 'toy donation',
               limit: 10,
               category_filter: ''
           })
           var foodDataMad = new YelpFetcher({
               location: 'Madison',
               term: 'food donation',
               limit: 10,
               category_filter: ''
           })
       
         
           rcm.fetch()
           yelpData.fetch()
           yelpDataMad.fetch()
           toyDataMad.fetch()
           toyData.fetch()
           lc.fetch()
           lcm.fetch()
           foodData.fetch()
           foodDataMad.fetch()
           var jsxArray = []
           var data = []
           var resultsArr = rc.models

           if(state === 'Wisconsin'){
            resultsArr = rcm.models
           } 
           if (query === "toy") {
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           tc={toyData}
                           rc={rc}
                           yelpData={toyData}
                           myd ={toyDataMad}
                          jsonData={toyData}/>, document.querySelector('.container'))
           }
           if (query === "food") {
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           tc={toyData}
                           lc={lc} 
                           rc={rc}
                           yelpData={foodData}
                           fc={foodData}
                             mtc ={toyDataMad}
                           mfc ={foodDataMad}
                           myd ={foodDataMad}
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
               DOM.render(<ClothingGrid
                           name={query}
                           lat={lat}
                           lng={lng}
                           state={state}
                           yelpData={yelpData}
                           myd ={yelpDataMad}
                           />, document.querySelector('.container'))
           }

           if (query === "landfills") {
                    DOM.render(<LandfillGrid
                           label={label}
                           query={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData}
                           fc={foodData}
                           state={state}
                           yelpData={yelpData}
                           lcm = {lcm}
                           jsonData={lc}/>, document.querySelector('.container'))
           }

           if (query === "recycling"){
               rc = rc.models
               rcm = rcm.models
               DOM.render(<ListingGrid
                           state={state}
                           label={label}
                           query={query}
                           lat={lat}
                           lng={lng}
                           lc={lc}
                           rc={rc}
                           tc={toyData}
                           fc={foodData}
                           rcm={rcm}
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
                           state={state}
                           lc={lc}
                           rc={data}
                           tc={toyData}
                           fc={foodData}
                           rcm={data}
                           yelpData={yelpData}
                           jsonData={data}/>, document.querySelector('.container'))                         
           }
       },

       home: function(){
       var rc = new RecyclingCollection()
       rc.fetch()

       var rcm = new RecyclingCollectionMad()
       rcm.fetch()
       var lc = new LandfillCollection()
       lc.fetch()
       var lcm = new LandfillCollection()
       lcm.fetch()
       var toyData = new YelpFetcher({
           location: 'Houston',
           term: 'toy donation',
           limit: 10,
           category_filter: ''
       })

       toyData.fetch()

           var successCallback = function(positionObject) {
               var lat = positionObject.coords.latitude
               var lng = positionObject.coords.longitude
               location.hash = lat + "/" + lng
          
           }
           var errorCallback = function(error) {
           }
           window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

          
           var route = window.location.hash.substr(1),
               routeParts = route.split('/')
           var lat = routeParts[0],
               lng = routeParts[1]
       
          window.GoogleMapsLoader = GoogleMapsLoader
            GoogleMapsLoader.KEY = 'AIzaSyAGcVpoS35RezE4cQzMXcH-M1VdQgZXuw0'
            GoogleMapsLoader.load(function(google) {
           var geocoder = new google.maps.Geocoder;
           var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
           geocoder.geocode({'location': latlng}, function(results, status) {
           if (status === google.maps.GeocoderStatus.OK) {
           if (results[1]) {
           var origin=results[0]
           var state = ""
           for(var i = 0; i < origin.address_components.length; i++){
           var originState = origin.address_components[i]
           if (originState.types.includes("administrative_area_level_1")){
              state = originState.long_name
           }
        
          DOM.render(<ListingsView
                   lat={lat}
                   lng={lng}
                   state={state}
                   rc={rc}
                    />, document.querySelector('.container'))
                }
           }
           else {
         window.alert('No results found');
                }
           } 
          }
        )
      })
      },
      
       initialize: function() {
           Backbone.history.start()

       }

   })

   var rtr = new dumpRouter()
}

app()
