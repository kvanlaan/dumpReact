import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'
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
               <button  onClick ={this._goHome} className="meButton">home</button>
               </div>
                    <div className="header"><h1>Dump<div className="title"> um...</div></h1></div>
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
                
                    <div className="big">
                 <div className="bigText"> 911 <br/>
                Url:<a style={{'color': 'white'}} href="http://www.911.org"> 911.org </a><br/>
                 Phone: 911 </div>
                </div>
                </div>
                )
        }
    })

export {NineView}