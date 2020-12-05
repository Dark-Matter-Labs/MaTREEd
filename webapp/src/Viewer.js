import {useState} from 'react';
import './App.css';
import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import data from './app_data/neighborhoods_madrid_stats.json'
import {Link} from "react-router-dom";
const madridCenter = [40.475, -3.70];


const Tooltip = ({closeTooltip, style, properties}) =>{
  
  if(!properties){
    return null
  }
  const {perc_caducifolio, perc_perennifolio, tree_valid, tree_tot,
    especie_1, especie_1_perc, 
    especie_2, especie_2_perc,
    especie_3, especie_3_perc,
    other_perc,
    sum_c_stock, sum_c_seq,
    CODBARRIO,
    NOMBRE,
  } = properties;

  const treeData=[
     ['TREES COUNT',tree_tot],
     ['VALID TREE RECORDS',tree_valid+'%'],
     ['EVERGREEN',perc_perennifolio+'%'],
     ['DECIDUOUS',perc_caducifolio+'%'],
  ]

  const treeSpecies=[
    [ especie_1,especie_1_perc],
    [ especie_2,especie_2_perc],
    [ especie_3,especie_3_perc],
    ['others',other_perc],
 ]

 const carbonInfo=[
  ['CO2 stock ', Math.round(sum_c_stock*100)/100+' Kg'],
  ['CO2 sequestration',Math.round(sum_c_seq*100)/100+' Kg/y'],
]
  return(
    <div style={style} className='tooltip'>
        <div className='singleRow'>
          <p>{NOMBRE}</p>
        </div>
      {treeData.map(([name,val])=>(
        <div className='row'>
          <p>{name}</p>
          <p>{val}</p>
        </div>
      ))}
        <div className='singleRow'>
          <p>TREE SPECIES</p>
        </div>
        {treeSpecies.map(([name,val])=>(
        <div className='row'>
          <p>{name}</p>
          <p>{val}%</p>
        </div>
        ))}
       <div className='singleRow'>
          <p>CO2 PERFORMANCE</p>
        </div>
          {carbonInfo.map(([name,val])=>(
          <div className='row'>
            <p>{name}</p>
            <p>{val}</p>
          </div>
      ))}
    {/* <Link to={`/simulator?id=${CODBARRIO}`}>
      <button className='blueButton goToSimulator'>View in Simulator</button>
    </Link> */}
    <button className='blueButton closeButton' onClick={closeTooltip}>Close</button>
    
    </div>
  )
}

const App = ()=> {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [properties, setProperties]= useState(null)
  const [layerH, setLayerH]= useState(null)
  const left = tooltipVisible?'0px':'-100%';
  return (
  <div id='container'>
    <div className='pageName'>MaTREEd Viewer
    <Link to="/simulator">
       <button className='blueButton linkButton'>Go to Simulator</button>
      </Link>
    </div>
     <Tooltip 
     properties={properties}
     style={{ left: left}}
     closeTooltip={()=>setTooltipVisible(false)}>
    </Tooltip>

    <MapContainer id='mapContainer' center={madridCenter} zoom={11} scrollWheelZoom={false}>
  
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON 
          onEachFeature={ layer => {}}
          eventHandlers={{
            click: async(e) => {
              console.log('marker clicked', e.layer.feature)
              setProperties(e.layer.feature.properties)
              setLayerH(e.layer.feature)
              setTooltipVisible(true)
            },
          }}
          key={'madrid'} data={data} />
          {tooltipVisible && layerH && (
            <GeoJSON 
            pathOptions={{color:'red'}}
            key={layerH.properties.NOMBRE} data={layerH} />
          )}
    </MapContainer>
  </div>
  )}
export default App;
