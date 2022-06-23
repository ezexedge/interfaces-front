import React,{Component,useState} from 'react';

import {GoogleApiWrapper,Map,Marker} from 'google-maps-react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
 
  const containerStyle = {
   width: '100%',
   height: 'auto'
    }

    const style = {
      width: '100%',
      height: '300px',
      position:'relative',
      marginBottom: '30px'
    }

  const  MapContainer = (props) => {


    console.log('acaa veo los props',props)


    const [address,setAddres] = useState('')
    const [showingInfoWindow,setShowingInfoWindow] = useState(false)
    const [activeMarker,setActiveMarker] = useState({})
    const [selectedPlace,setSelectedPlace] = useState({})
    const [lat,setLat] = useState(props.data.lat)
    const [lng,setLng] = useState( props.data.lng)
    
    

   const  handleChange = address => {

        console.log('address---->',address)
       // this.setState({ address });
       setAddres(address)
      };
     
      const handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
             // this.setState({address})
             setAddres(address) 
             console.log('latlng',latLng)
             setLat(latLng.lat)
             setLng(latLng.lng)
             props.onchange(latLng);

              //this.setState({mapCenter:latLng})
              
          })
          .catch(error => console.error('Error', error));
      };
     
    


      return (
          <div id="googleMap"       style={style}>
            {props.search === true && (
         <PlacesAutocomplete
         value={address}
         onChange={handleChange}
         onSelect={handleSelect}
       >
         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
           <div>
             <input
               {...getInputProps({
                 placeholder: 'BUSCAR TU LOCAL..',
                 className: 'location-search-input',
               })}
             />
             <div className="autocomplete-dropdown-container"
             style={{position: 'relative!important'}}
             >
               {loading && <div>Loading...</div>}
               {suggestions.map(suggestion => {
                 const className = suggestion.active
                   ? 'suggestion-item--active'
                   : 'suggestion-item';
                 // inline style for demonstration purpose
                 const style = suggestion.active
                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
                 return (
                   <div
                   style={style}
                     {...getSuggestionItemProps(suggestion, {
                       className,
                       style,
                     })}
                     style={{position: 'relative!important'}}
                   >
                     <span>{suggestion.description}</span>
                   </div>
                 );
               })}
             </div>
           </div>
         )}
       </PlacesAutocomplete>

            )}
      

       <Map google={props.google}
          className="mapa"
      style={containerStyle}
    

        initialCenter={{
            lat: lat,
            lng: lng
        }}
        center={{
            lat: lat,
            lng: lng
        }}
            >
          <Marker 
          position={{
            lat: lat,
            lng: lng
          }}
          />
   
         
        </Map>
          </div>
 
      )
    }
  

  export default GoogleApiWrapper({
    apiKey: ('AIzaSyAXr-FMeBXB3G1Xq0p7mg8Ek2gUC-BB3a8')
  })(MapContainer)