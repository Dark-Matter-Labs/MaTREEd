import './App.css';
import {MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import data from './data/export'

const madridCenter = [40.41, -3.70];

const App = ()=> (
<div id='container'>
  <MapContainer id='mapContainer' center={madridCenter} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <GeoJSON 
    // onEachFeature={(feature, layer)=>
    //   console.log(feature)
    // }
    eventHandlers={{
      click: (e) => {
        console.log('marker clicked', e.layer.feature)
        alert(e.layer.feature.id)
      },
    }}
    key={'madrid'} data={data} />

    <Marker position={madridCenter}>
      <Popup>
        Popup
      </Popup>
    </Marker>
  </MapContainer>
</div>
)

export default App;
