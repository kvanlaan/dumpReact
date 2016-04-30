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
              <div style={navObj} className="openSource"> 
                <div> Dump is an open source application. <br/>If you would like to contribute to our database please visit <a className="boxLink" href="https://github.com/kvanlaan/dump"><div className="boxLinkText">https://github.com/kvanlaan/dump</div></a>. </div>
               </div>

               <div onClick={this._changeHash}  className = "navBar">
                 <div  value="paper" className="navEl">
               Recycling Centers
               </div>
               <div  value="clothing" className="navEl">
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

               <button onClick ={this._goHome} className="meButton">home</button>
               </div>
                    <div className="header"><h1>Dump<div className="title"> it!</div></h1></div>
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