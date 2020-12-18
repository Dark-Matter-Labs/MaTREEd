
const Simulator = ({visible, onClose, properties}) =>{
    if (!properties) {
        return null;
      }
    const {
        tree_valid,
        tree_tot,
        sum_c_stock,
        sum_c_seq,
        NOMBRE,
      } = properties;

const simulate = ()=>{};

    return (
        <div className='simulator' style={{height: visible?'400px':'0px'}}>
             <div className="singleRow">
                <p>Simulator - {NOMBRE}</p>
            </div>
            <button className="blueButton" onClick={onClose}>
        Close
      </button>
        </div>
    )

}
export default Simulator;
//details https://github.com/GISdevio/MaTREEd/blob/main/project-description.md#methodology
/**
 * The tree carbon stock and annual sequestration rate for each neighborhood are computed as the sum of the CO2 stocked and the CO2 sequestration rate contributed by each single tree available in the neighborhood. In turn, these are computed using simplified allometric equations based on the trunk_girth, the tree diameter (diameter, computed as trunk_girth/𝜋) and the value of the senescence attribute - distinguishing between deciduous trees (value CADUCIFOLIO) and evergreen trees (value PERENNIFOLIO) - as follows:
CO2 stock [Kg] (stock):
if senescence == PERENNIFOLIO
    stock = (0.16155*((trunk_girth/𝜋)*100)^2.310647)*0.5*3.67
if senescence == CADUCIFOLIO
    stock = (0.035702*((trunk_girth/𝜋)*100)^2.580671)*0.5*3.67
where 0.5 is the fraction of the average carbon content on the tree’s dry weight total volume and 3.67 is the ratio of CO2 to C (44/12 = 3.67) (see here); the multiplier 100 is used because the calculation assumes that the value of trunk_girth/𝜋, i.e. diameter, is expressed in cm. These equations are presented and explained in this scientific paper.

CO2 sequestration [Kg/y] (sequestration):
diameter_t0 = (trunk_girth_t0/𝜋)*100
diameter_t1 = diameter_t0 + (-0.5425 + 0.3189*ln((trunk_girth_t0/𝜋)*100))
sequestration = stock(t1) - stock(t0)
where diameter_t0 and diameter_t1 are the initial diameter of the tree and the diameter of the tree after one year, respectively; trunk_girth_t0 is the initial trunk girth of the tree; and stock(t1) and stock(t0) are the initial tree carbon stock and the tree carbon stock after one year, which are computed through the equation above using the initial value and the value after one year of trunk_girth. The equation models the annual growth of the diameter of a tree and is derived from this scientific paper.

For each neighborhood, the absolute values of stock and sequestration are finally divided by the area to obtain the areal CO2 stock [Kg/km2] (areal_stock) and the areal CO2 sequestration [Kg/y/km2] (areal_sequestration).
 */