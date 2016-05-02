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


 var Listing = React.createClass({
     
        _getClosest: function(clickEvent) {
            return (
                        <div className="closest">*closest to your current location!</div>
                    )
        },
          getInitialState: function() {
            return {
                more: 'more',
            }
        },

        _getMap: function(clickEvent) {
            return (
            <img className="mapTwo" src="mapPlace.png"/>
       
                    )
        },

        _more: function(clickEvent) {
            if (this.state.more === 'more') {
                this.setState({ more: 'less' })
            } else {
                this.setState({ more: 'more' })
            }
        },

           _triggerMapView: function(clickEvent) {
            var item = clickEvent.target
            var lat=this.props.userLat
            var lng=this.props.userLon
            var address=this.props.listing.Location
            var nameParts= name.split('/')
                name = nameParts[0]
            window.location.hash = lat + "/" + lng + "/map/" + address
        },
      
        render: function() {
            var triangle = ''
            var content = ''
            var closest = ''
            var styleObj ={}
            var styleObjThree ={}
            var buttonObj = {}
            var detailObj = {}
            var className ="infoDiv"
            var classNameMat ="infoDivMat"
             var infoType ={fontWeight: 'bold', textDecoration: 'underline', marginLeft: 0}
            if(this.state.more === 'more'){
                triangle ="\u25B6"
            }
         
            var url ='https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + this.props.listing.Lat + "," + this.props.listing.Lon + '&heading=151.78&pitch=-0.76&key=AIzaSyAlioIpF4LPLreb8s11Mxtsm5CdDbZRkFQ'

            if (this.state.more === 'less') {
                triangle="\u25BC"
                detailObj = { display: 'block' }
            } else {
                detailObj = { display: "none" }
            }
            
            if(this.props.color >0) {
                styleObjThree={display:'inline-block'}
              
              styleObj={width: "100%"}
            }
            if(this.props.color <1) {
                 url = 'westpark.png'
                content = this._getMap()
                closest = this._getClosest()
                className = 'infoDivNone'
                classNameMat ='infoDivNone'
                styleObj ={backgroundColor: 'rgba(255, 255, 255, 0.3)'}
            } 

             if(this.props.color ===1) {
                 url = 'sunbeam.png'
             }
           
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
                                <h3 data-lat={this.props.userLat} data-lon={this.props.userLon} data-locLat={this.props.listing.Lat} data-locLng={this.props.listing.Lon} onClick={this._triggerMapView} data-name={this.props.listing.Business}> {this.props.listing.Business} </h3>
                                <div className="moreButtonContainer">
                                    <button onClick={this._more} className="moreButton">{triangle} {this.state.more} info</button>
                                </div>
                            </div>
                            <div className="buttonContainer">
                                {closest}
                            <button style={buttonObj} data-index={this.props.color} data-locLat={this.props.listing.Lat} data-locLng={this.props.listing.Lon} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
                            <p className="miniInfo"> {"\u2672"}{this.props.listing.Address} <br/> {"\u260E"} {this.props.listing.Phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="info" style={detailObj}>
                        <div style={styleObj} className="infoWords" >
                            <div className={className}>
                                <div style={infoType}> Hours:</div>
                                {this.props.listing.Hours}<br/>
                            </div>
                            <div className={className}>
                                 <div style={infoType}>Categories:</div> 
                                 {this.props.listing.Category} <br/>
                            </div>
                            <div className={classNameMat}>
                                <div style={infoType}>Materials:</div> {this.props.listing.Materials} 
                            </div>
                        </div>
                           {content}
                    </div>
                </div>
                )
                }

    })

    var ListingGrid = React.createClass({
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

        var label = 'grid'
        var query = clickEvent.target.value
        location.hash = `${this.props.lat}/${this.props.lng}/${query}/${label}`
      
        },

        _goHome: function(clickEVent){
                  location.hash = `${this.props.lat}/${this.props.lng}`

        },


        _findMin: function(resultsArr, w) {
            var objArr = []
            var hypArr = []
            for (var i = 0; i < resultsArr.length; i++) {
                var dataObject = resultsArr[i].attributes
                var hyp = (Math.pow(dataObject.Lat - this.props.lat, 2) + Math.pow(dataObject.Lon - this.props.lng, 2))
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
                var component = <Listing color={i} userLat={this.props.lat} userLon={this.props.lng} listing={dataObject} key={i} />
                jsxArray.push(component)
            }
            return jsxArray
        },

        render: function() {
            var data = this.props.jsonData
            console.log(data)
            var hypo = this._findMin(data)
            var zip={}
            var navObj ={}
            var className='neighborhood'
            var styleObj = { 'display': 'none' }
            var content= <img className="loadingGifThree" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
            var title ="recycling centers"

            if(this.props.query === "landfills"){
                title ="landfills"
            }


            if(data.length > 2){
                content =this._findMin(data)
            }
            if (this.state.list > 1) {
                styleObj.display = "inline-block"
            }
           
            if(this.props.query === "paper" || this.props.query === 'plastic'|| this.props.query === 'can' || this.props.query === 'cardboard'){
                console.log('check')
                 className='neighborhoodTwo'
             } else {
                className='neighborhood'
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
               <div style={zip} className={className}>
                    <button onClick={this._delete} className="buttonX">x </button> 
                     * It looks like your zip code offers recycling pick-up for {this.props.label}! 
                        <p></p> 
                        Click 
                     <a href="http://mycity.houstontx.gov/public/" target="_blank" className="boxLink"> <div className="boxLinkText">here</div> </a> 
                     for scheduling info!  
                </div>
                 <div className="bar">
                <button onClick={this._clicked} className="dashButton">d</button>
                 <div style={navObj} className="openSource"> 
                <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit <a className="boxLink" href="https://github.com/kvanlaan/dump"><div className="boxLinkText">https://github.com/kvanlaan/dump</div></a>. </div>
               </div>
     <div className = "navBar">
                 <div className = "elBar">
               <div  onClick={this._changeHash} value="paper" className="navEl">
               Recycling Centers
               </div>
               <div  onClick={this._changeHash}value="clothing" className="navEl">
               Clothing Donation
               </div>
                <div value="toy" onClick={this._changeHash} className="navEl">
                Toy Donation

               </div>
                <div onClick ={this._changeHash} value="food" className="navEl">
                Food Donation
               </div>
                 <div onClick ={this._changeHash} value="landfills" className="navEl">
                Landfills
               </div>
               </div>
               
               <button onClick={this._goHome}className="meButton">home</button>
                  </div>
                  </div>
                  <div className="header"><h1>Dump<div className="title">{title}</div></h1></div>
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
    
export {Listing,ListingGrid}