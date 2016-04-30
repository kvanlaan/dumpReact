import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'
import $ from 'jquery'
import Firebase from 'firebase'
import Backbone from 'bbfire'
import Select from 'react-select'
import GoogleMapsLoader from 'google-maps'
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react'
import {ClothingGrid} from './ClothingGrid'
import {DirectionsView,Instruction} from './directions'
import {ThreeView} from './threeview'
import {NineView} from './nineview'
import {Listing,ListingGrid} from './listing'

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
            console.log('mapview')
            var item = clickEvent.target
            var locLat = item.getAttribute('data-locLat')
            var locLng = item.getAttribute('data-locLng')
            var lat=this.props.userLat
            var lng=this.props.userLon
            var add = this.props.listing.location.address[0]
            console.log(add)
           window.location.hash = lat + "/" + lng + "/map/" + add
        },

        _getMap: function(clickEvent) {
         
            return (

                <img className="mapTwo" src="mapPlace.png"/>
        
                    )
        },

        _getClosest: function(clickEvent) {
            return (
                        <div className="closest">*closest to your current location!</div>
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
                      <div className="moreButtonContainer">
            <button onClick={this._more} className="button">{triangle}  {this.state.more} </button>
            </div> 
                    </div>
                    <div className="buttonContainer">
                        {closest}

                 <button style={buttonObj} data-index={this.props.color} data-locLat={this.props.listing.location.coordinate.latitude} data-locLng={this.props.listing.location.coordinate.longitude} data-lat={this.props.userLat} data-lon={this.props.userLon}  onClick={this._triggerMapView} className="button"> Get Directions </button>
                    <p className="miniInfo"> {"\u2672" }{this.props.listing.location.address} <br/> {this.props.listing.location.city}  {this.props.listing.location.state_code} <br/> {this.props.listing.phone} <br/> </p><div className="open">{open}</div>
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

                          <div style={infoType}> url:</div>{this.props.listing.url} <br/>
                                 </div>
                          </div>
                            {content}
                        </div>
                        </div>
                )
                }

    })

export {ClothingListing}
