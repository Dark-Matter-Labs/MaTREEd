import {useState, useRef} from 'react';
import './App.css';
import {MapContainer, TileLayer, GeoJSON, MapConsumer} from 'react-leaflet'
import data from './app_data/neighborhoods_madrid_stats.json'

const madridCenter = [40.475, -3.70];

const App = ()=> {


  const [currentJSON, setCurrentJSON]= useState(data)
  const currentJSONRef = useRef(null)


  return (
  <div id='container'>
    <MapContainer id='mapContainer' center={madridCenter} zoom={11} scrollWheelZoom={false}>
    <MapConsumer>
        {(map) => {
      return(
         <>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON 
          ref={currentJSONRef}
          onEachFeature={ layer => {}}
          eventHandlers={{
            click: async(e) => {
              console.log('marker clicked', e.layer.feature)

              const CODBARRIO = e.layer.feature.properties.CODBARRIO;
              const fileName = `./app_data/trees_neighbours/T_CODBARRIO_${CODBARRIO}.json`;

              fetch(fileName)
                .then(res=>res.json())
                .then(data=>{
                  setCurrentJSON(data)
                  if(currentJSONRef.current){
                    const bounds = currentJSONRef.current.getBounds()
                    console.log(bounds)
                    map.fitBounds(bounds)
                  }
                });
            },
          }}
          key={currentJSON.name} data={currentJSON} />
          </>
        )}}
      </MapConsumer>
    </MapContainer>
  </div>
  )
  }
export default App;
