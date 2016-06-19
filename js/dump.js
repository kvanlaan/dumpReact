import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'



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
           <div  className= "dashNavBar">
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
                   <div className="header">
                       <h1>Dump<div className="listingTitle"> it!</div></h1>
                   </div>
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


export {DumpView}