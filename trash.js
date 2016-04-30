    var Wrong = React.createClass({
        render: function(){
            return (
                <div> Whoops! Looks like we don't have that, try reconfiguring your search-- e.g. 'microphone' ---> electronics </div>
                )
        }
    })
    
    


                //       name={this.props.listing.Business} 
                //       locLat={this.props.listing.Lat} 
                //       locLng={this.props.listing.Lon} 
                //       lat={this.props.userLat} 
                //       lng={this.props.userLon}>
                // </MapView>
            
   

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

    
