import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'




 
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
           var styleObjTwo={}
           var nameDirH1 = "dirH1"
      
           if(!this.state.clicked){
               arrow ="\u25B6"
           }
           if (this.state.clicked){
               content = this._getSteps()
               arrow="\u25BC"
               newName ="dirMapTwo"
               styleObjTwo={left: '1%'}
               nameDirH1="dirH1Two"
           }
        
           return (
               <div>
                   <div style={styleObjTwo} className="dirTitle">
                       <button className="dirButton" onClick={this._clicked}>{arrow} </button>
                       <div className="dirTitleDirect">{this.state.directions}</div>
                   </div>
                   <h1 className={nameDirH1}>
                   <div className="dirOrigin">{this.props.origin}</div> to <div className="dirOrigin">{this.props.address}</div>
                   </h1>
                   <div className="directions">
                   {content}
                   </div>
                   <div className={newName}></div>
                   <div className="pano"></div>
               </div>
               )
       }
   })

export {DirectionsView,Instruction}
