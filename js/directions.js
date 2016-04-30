import DOM from 'react-dom'
import React, {PropTypes, Component} from 'react'




 var Instruction = React.createClass({
        render: function(){
            return (
                <div className="instruction"><div className="instructNum">{this.props.index}</div><div className="instructMain">{this.props.instructions}</div></div> 
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
            var data = this.props.data
            var jsxArray = []
            data = data.routes[0].legs[0].steps
            console.log('parse', data)
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
            var newName ="map"
            var styleObj={}
            var styleObjTwo={}
            if(!this.state.clicked){
                arrow ="\u25B6"
            }
            if (this.state.clicked){
                content = this._getSteps()
                arrow="\u25BC"
                newName ="mapNone"
                styleObj={width:'33%', marginLeft: 0, marginTop: 0, left:'5.72%', fontSize: '24px'}
                 styleObjTwo={height: '9%', width:'4%', left: '1.2%', marginRight: '0%'}
            }
          
            return (
                <div>
                    <div style={styleObjTwo} className="dirTitle"> <button className="buttonDir" onClick={this._clicked}>{arrow} </button> <div className="dirTitleDirect">{this.state.directions}</div></div>
                    <h1 style={styleObj} className="dirH1"> <div className="origin">{this.props.origin}</div> to <div className="origin">{this.props.address}</div></h1>
                    <div className="directions">
                    {content}
                    </div>
                    <div  className={newName}></div>
                     <div className="pano"></div>
                </div>
                )
        }
    })

export {DirectionsView,Instruction}
