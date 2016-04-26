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

// console.log(shouldPureComponentUpdate)

function app() {

    var ClothingListing = React.createClass({
        getInitialState: function() {
            return {
                more: 'more',
            }
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
            var locLat = item.getAttribute('data-locLat')
            var locLng = item.getAttribute('data-locLng')
            var lat=this.props.userLat
            var lng=this.props.userLon
            var add = this.props.listing.location.address[0]
            window.location.hash = lat + "/" + lng + "/map/" + add
        },

        _getMap: function(clickEvent) {
            return (
                <img className="mapTwo" src="mapPlace.png"/>
                    )
        },

        _getClosest: function(clickEvent) {
            return (
                        <div className="listingClosest">*closest to your current location!</div>
                    )
        },
        render: function() {
            var triangle = ''
            var url = this.props.listing.image_url
            var buttonObj = {}
            var detailObj = {}
            var content = ''
            var closest = ''
            var styleObj ={}
            var className ="infoDiv"
            var classNameMat ="infoDivMat"
            var infoType ={fontWeight: 'bold', textDecoration: 'underline', marginLeft: 0}
            var cat =this.props.listing.categories[0]
                cat =cat[0]
            var open = ''
            var buttonDir = {fontSize: "15px", marginTop: "3%", marginBottom: "2%"}
            var styleObjThree ={}
            var hObj={fontSize: '45px'}
     
            if(this.state.more === 'more'){
                triangle ="\u25B6"
                }
            if (this.state.more === 'less') {
                detailObj = { display: 'block' }
                triangle="\u25BC"
                } else {
                detailObj = { display: "none" }
                 }
           
            if(this.props.color >0) {    
              styleObj={width: "100%"}
                 styleObjThree={display:'inline-block'}
                }
            if(this.props.color <1) {
                content = this._getMap()
                closest = this._getClosest()
                className = 'infoDivNone'
                classNameMat ='infoDivNone'
                 styleObj ={backgroundColor: 'rgba(255, 255, 255, 0.3)'}
              } 
          
            if(this.props.listing.is_closed){
                open = 'now closed'
                }else {
                open = 'open now!'
            }

            return (
                <div>
                    <div  userLon={this.props.userLon} userLat={this.props.userLat} className="listing" listing={this.props.listing}>
                        <div className="streetViewContainer">
                            <img className="streetViewYelp" src={url}/>
                            <div className="streetViewArrowYelp">
                            </div>
                        </div>
                    <div className="wordsContainer">
                        <div className="words">
                            <h3 style={hObj} data-lat={this.props.userLat} data-lon={this.props.userLon} data-locLat={this.props.listing.location.coordinate.latitude} data-locLng={this.props.listing.location.coordinate.longitude} data-name={this.props.listing.name}> {this.props.listing.name} </h3>
                            <div className="infoMoreButtonContainer">
                                <button onClick={this._more} className="button">{triangle}  {this.state.more} </button>
                            </div> 
                        </div>
                    <div className="buttonContainer">
                        {closest}
                        <button style={buttonObj} data-index={this.props.color} data-locLat={this.props.listing.location.coordinate.latitude} data-locLng={this.props.listing.location.coordinate.longitude} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
                        <p className="infoMini"> {"\u2672" }{this.props.listing.location.address} <br/> {this.props.listing.location.city}  {this.props.listing.location.state_code} <br/> {this.props.listing.phone} <br/> </p>
                        <div className="infoOpen">{open}</div>
                    </div>
                    </div>
                    </div>
                    <div className="info" style={detailObj}>
                        <div style={styleObj}className="infoWords">
                            <div className={className}>
                                <div style={infoType}>Categories:</div> {cat} <br/>
                            </div>
                            <div className={className}>
                                <div style={infoType}>Rating:</div> <img src={this.props.listing.rating_img_url}/> <br/>
                            </div>
                            <div className={classNameMat}>
                                <div style={infoType}> url:
                                </div>{this.props.listing.url} <br/>
                            </div>
                        </div>
                        {content}
                    </div>
                </div>
                )
                }

    })

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

            var label = 'grid'
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
                                <div  onClick={this._changeHash}value="paper" className="dashNavEl">
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
                        </div>
                        <button onClick ={this._goHome} className="dashHomeButton">home</button>
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

    var Instruction = React.createClass({
        render: function(){
            return (
                <div className="dirInstruction"><div className="dirNum">{this.props.index}</div><div className="dirMain">{this.props.instructions}</div></div> 
                )
        }

    })
    var DirectionsView = React.createClass({
        getInitialState: function(){
            return {
            clicked: false,
            directions: 'directions'
            }
        },

        _clicked: function(clickEvent){
            if(this.state.clicked !== true){
                this.setState({clicked: true})
                      this.setState({directions: ''})
            }
            else{
                this.setState({clicked: false})
                 this.setState({directions: 'directions'})
            }
        },
        _getSteps: function() {
            var jsxArray = []
            var data = this.props.data
                data = data.routes[0].legs[0].steps
            var x = 0
                for (var i = 0; i < data.length; i++) {
                var instructions = data[i].instructions
                    instructions = instructions.replace(/<(?:.|\n)*?>/gm, '')
                    x = x + 1
                var component = <Instruction index={x} instructions={instructions} /> 
                jsxArray.push(component)       
                }
            return jsxArray
        },

        render: function(){
            var content = ''
            var arrow =""
            var newName ="dirMap"
            var styleObj={}
            var styleObjTwo={}
            if(!this.state.clicked){
                arrow ="\u25B6"
            }
            if (this.state.clicked){
                content = this._getSteps()
                arrow="\u25BC"
                newName ="dirMapTwo"
                styleObj={width:'33%', marginLeft: 0, marginTop: 0, left:'5.72%', fontSize: '24px'}
                 styleObjTwo={height: '9%', width:'4%', left: '1.2%', marginRight: '0%'}
            }
          
            return (
                <div>
                    <div style={styleObjTwo} className="dirTitle"> 
                        <button className="dirButton" onClick={this._clicked}>{arrow} </button> 
                        <div className="dirTitleDirect">{this.state.directions}</div>
                    </div>
                    <h1 style={styleObj} className="dirH1"> 
                    <div className="dirOrigin">{this.props.origin}</div> to <div className="origin">{this.props.address}</div>
                    </h1>
                    <div className="directions">
                    {content}
                    </div>
                    <div  className={newName}></div>
                    <div className="pano"></div>
                </div>
                )
        }
    })
    var Wrong = React.createClass({
        render: function(){
            return (
                <div> Whoops! Looks like we don't have that, try reconfiguring your search-- e.g. 'microphone' ---> electronics </div>
                )
        }
    })
    
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
            var label = 'grid'
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
                        <div  value="paper" className="dashNavEl">
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

    var ThreeView = React.createClass({
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
            return (
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
                        <div  value="paper" className="dashNavEl">
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
                       <button  onClick ={this._goHome} className="dashHomeButton">home</button>
                   </div>
                        <div className="header"><h1>Dump<div className="listingTitle"> um...</div></h1>
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
                    <div className="misc">
                     311 <br/>
                    url: <a style={{'color': 'white'}} href="http://www.houstontx.gov/311/"> http://www.houstontx.gov/311/ </a><br/>
                  Phone: (713) 837-0311
                    </div>
                </div>
                )
        }
    })
    var NineView = React.createClass({
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
            return (
                <div className="nextContainer">
                    <button onClick={this._clicked} className="dashButton">d</button>
                    <div style={navObj} className="dashOpenSource"> 
                        <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit 
                        <a className="boxLink" href="https://github.com/kvanlaan/dump">
                            <div className="boxLinkText">https://github.com/kvanlaan/dump
                            </div>
                        </a>. 
                        </div>
                    </div>
                    <div onClick={this._changeHash}  className="dashNavBar">
                        <div  value="paper" className="dashNavEl">
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
                       <button  onClick ={this._goHome} className="dashHomeButton">home</button>
                    </div>
                    <div className="header">
                        <h1>Dump<div className="listingTitle"> um...</div>
                        </h1>
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
                
                    <div className="misc">
                        <div className="miscText"> 911 <br/>
                        Url:<a style={{'color': 'white'}} href="http://www.911.org"> 911.org </a><br/>
                        Phone: 911 
                        </div>
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
            var label = 'grid'
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
                 <div  value="paper" className="dashNavEl">
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
               </div>
               <button onClick={this._goHome} className="dashHomeButton">home</button>
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
            window.location.hash = lat + "/" + lng + "/map/" + address
        },
      
        render: function() {
            var closest = ''
            var styleObj ={}
            var styleObjThree ={}
            var buttonObj = {}
            var detailObj = {}
        
          
            // var url ='https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + this.props.listing.Lat + "," + this.props.listing.Lon + '&heading=151.78&pitch=-0.76&key=AIzaSyAlioIpF4LPLreb8s11Mxtsm5CdDbZRkFQ'

            
            if(this.props.color >0) {
                styleObjThree={display:'inline-block'}
              
              styleObj={width: "100%"}
            }
            if(this.props.color <1) {
                 url = 'westpark.png'
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
            var navObj ={}
            var className='pickup'
            var styleObj = { 'display': 'none' }
            var content= <img className="loadingGifThree" src="http://www.animatedimages.org/data/media/576/animated-garbage-bin-image-0004.gif"></img>
            var title ="landfills"

            if(data.length > 1){
                content =this._getListingsJsx(data)
            }
            if (this.state.list > 1) {
                styleObj.display = "inline-block"
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
                            <div  onClick={this._changeHash} value="paper" className="dashNavEl">
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
                    </div>
                        <button onClick={this._goHome} className="dashHomeButton">home</button>
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
    

            
    var Listing = React.createClass({
     
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
                                <div className="infoMoreButtonContainer">
                                    <button onClick={this._more} className="button">{triangle} {this.state.more} info</button>
                                </div>
                            </div>
                            <div className="buttonContainer">
                                {closest}
                            <button style={buttonObj} data-index={this.props.color} data-locLat={this.props.listing.Lat} data-locLng={this.props.listing.Lon} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
                            <p className="infoMini"> {"\u2672"}{this.props.listing.Address} <br/> {"\u260E"} {this.props.listing.Phone}</p>
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
                                <div style={infoType}>Materials:
                                </div> 
                                {this.props.listing.Materials} 
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
            var className='pickup'
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
                <div style={zip} className={className}>
                    <button onClick={this._delete} className="pickupX">x </button> 
                     * It looks like your zip code offers recycling pick-up for {this.props.label}! 
                        <p></p> 
                        Click 
                     <a href="http://mycity.houstontx.gov/public/" target="_blank" className="boxLink"> <div className="boxLinkText">here</div> </a> 
                     for scheduling info!  
                </div>
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
                            <div  onClick={this._changeHash} value="paper" className="dashNavEl">
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
                    </div>
                        <button onClick={this._goHome} className="dashHomeButton">home</button>
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
    

    var MapView = React.createClass({

        shouldComponentUpdate: shouldPureComponentUpdate,

        render: function() {
            var centerName =this.props.name
            var centerLat =Number(this.props.lat)
            var centerLng =Number(this.props.lng)
            var center = { lat: Number(this.props.lat), lng: Number(this.props.lng) }
            var locLat=Number(this.props.locLat)
            var locLng=Number(this.props.locLng)
            return (
                 <GoogleMap
                  bootstrapURLKeys={{key: "AIzaSyCtujOuqqTmqL4tC1G47tRrAOhZ8HJnbVU"}}
                  defaultCenter={center} 
                  defaultZoom={13}>
                  <SweetMarker text="A" lat={centerLat} lng={centerLng}>
                  </SweetMarker>
                   <SweetMarker text="B" lat={locLat} lng={locLng}>
                  </SweetMarker>
                </GoogleMap>  
            )
        }
    })

    var SweetMarker = React.createClass({
        render: function() {
            return (
                <div className="marker">
                  {this.props.text}
                </div>
            )
        }
    })

    var RecyclingCollection = Backbone.Firebase.Collection.extend({
        initialize: function() {
            this.url = "https://dumpproject.firebaseio.com/centers/2015%20Neighborhood%20Depositories"
        }
    })

    var LandfillCollection = Backbone.Firebase.Collection.extend({
        initialize: function() {
            this.url = "https://dumpproject.firebaseio.com/landfills/Sheet1"
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
                            jsonData={data}/>, document.querySelector('.container'))
            }

            if (query !== "dump" && query !== "food" && query !== "clothing" && query !== "toy" && query !== "animal" && query !== "body" && query !== "landfill") {
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




// var DetailView = React.createClass({

//         componentWillMount: function() {
//           var self = this
//           this.props.listing.on('sync',function() {self.forceUpdate()})
//         },

//         _getDetailJSX: function(mod) {
          
//             return (

//                       <div className="listing">
//                     <div className="wordsContainer">
//                     <h3 onClick={this._triggerDetailView}> {mod.attributes.Business} </h3>
//                     <div >
//                     <p>{mod.attributes.Address} -- {mod.attributes.Hours} -- {mod.attributes.Phone} </p>
//                        <p> {mod.attributes.Category} </p> 
//                         </div>
//                     </div>
//                     <div className="imgContainer">
//                      <button className="button"> Get Directions </button>
//                    <MapView
//                       name={mod.attributes.Business} 
//                       locLat={mod.get('Lat')} 
//                       locLng={mod.get('Lon')} 
//                       lat={this.props.lat} 
//                       lng={this.props.lng}></MapView>
//                   </div>   
//                 </div>
//             )
//         },

      
//         render: function() {
//             var mod = this.props.listing
//             console.log(mod)
//             if(mod.get('Lat') === undefined) {
//                 var content = "moo"
//             } else {

//             content = this._getDetailJSX(mod)
//         }
//             console.log('mod>>>>', mod)
//             return (       
//                 <div className="listing">
//                 <div className="title"> Dump it Here! </div>
//                   {content}
//                 </div>
//             )
//         }
//     })

// var YelpDetailView = React.createClass({
//         _getDetailJSX: function(yelpMod) {
//           return (<div><div className="wordsContainer">
//                     <h2> {yelpMod.get('')} </h2>
//                     <div className="info">
//                       <p> {yelpMod.get('location').address} </p>
//                       <p> {yelpMod.get('location').city} </p>
//                       <p> {yelpMod.get('location').state_code} </p>
//                       <p> {yelpMod.get('phone')} </p>
//                       <p> {yelpMod.get('url')} </p>
//                       <p> {yelpMod.get('is_closed')} </p>
//                     </div>
//                   </div>
//                   <div className="imgContainer">
//                     <img src={yelpMod.image_url}></img>
//                     <button className="button"> Get Directions </button>  
//                     <MapView 
//                       name={yelpMod.get('Business')} 
//                       locLat={yelpMod.get('location').coordinate.latitude} 
//                       locLng={yelpMod.get('location').coordinate.longitude} 
//                       lat={this.props.lat} 
//                       lng={this.props.lng}>
//                     </MapView>
//                   </div>
//                   </div>
//                 )
//         },

//         componentWillMount: function() {
//           var self = this
//           this.props.listing.on('sync',function() {self.forceUpdate()})
//         },

//         render: function() {
//             var coll = this.props.listing
//                 var content =<img id="loadingGif" src="http://www.animatedimages.org/cat-garbage-bin-576.html"></img>
//             if (coll.models.length > 0) {
//                 var yelpMod = coll.models[0]
//                 content = this._getDetailJSX(yelpMod)
//             }
//             console.log('yelpmod>>>>', yelpMod)
//             return (
//                 <div className="listing">
//                 <h1> Dump it Here! </h1>
//                   {content}
//                 </div>
//             )
//         }
//     })     

    // <div className="imgContainer">
    //          <button style={buttonDir} data-index={this.props.color} data-locLat={this.props.listing.location.coordinate.latitude} data-locLng={this.props.listing.location.coordinate.longitude} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
    //             <MapView 
    //                   name={this.props.listing.name} 
    //                   locLat={this.props.listing.location.coordinate.latitude} 
    //                   locLng={this.props.listing.location.coordinate.longitude} 
    //                   lat={this.props.userLat} 
    //                   lng={this.props.userLon}>
    //             </MapView>
    //         </div>

    
