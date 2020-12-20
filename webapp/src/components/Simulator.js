import { useState, useEffect } from "react";
const Simulator = ({ visible, onClose, properties }) => {
  const [coniferNumber, setConiferNumber] = useState(0);
  const [broadleafNumber, setBroadleafNumber] = useState(0);
  const [co2Initial, setCo2Initial] = useState(0);

  const [coniferCm, setConiferCm] = useState('');
  const [broadleafCm, setBroadleafCm] = useState('');

  const [sequestration, setSequestration] = useState(null);
  
  const changeConiferNumber = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value)) {
      setConiferNumber(value);
    }else{
        setConiferNumber('');
    }
  };
  const changeBroadleafNumber = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value)) {
      setBroadleafNumber(value);
    }else{
        setBroadleafNumber('');
    }
  };

  const changeConiferCm = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value)) {
      setConiferCm(value);
    }else{
        setConiferCm('');
    }
  };
  const changeBroadleafCm = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value)) {
      setBroadleafCm(value);
    }else{
        setBroadleafCm('');
    }
  };

  const simulate = () => {
    const get_co2 = (senescence, cm) => {
        if (!senescence || !cm) {
            return 0;
        }
        if (senescence === "evergreen") { //perennifolio
          return 0.16155 * Math.pow(cm, 2.310647) * 0.5 * 3.67;
        }
        if (senescence === "deciduous") { //caducifolio
        return 0.035702 * Math.pow(cm, 2.580671) * 0.5 * 3.67;
      }
    };
    const co2_initial_conifer = get_co2("evergreen", coniferCm) * coniferNumber;
    const co2_initial_broadleaf = get_co2("deciduous", broadleafCm) * broadleafNumber;

    const co2_initial = co2_initial_conifer + co2_initial_broadleaf;
    setCo2Initial(co2_initial);

    const get_t1 = (diameter_t0) => {
      if (!diameter_t0) {
        return 0;
      }
      return diameter_t0 + (-0.5425 + 0.3189 * Math.log(diameter_t0));
    };

    const co2_final_conifer =get_co2("evergreen", get_t1(coniferCm)) * coniferNumber;

    const co2_final_broadleaf =get_co2("deciduous", get_t1(broadleafCm)) * broadleafNumber;

    const co2_final = co2_final_conifer + co2_final_broadleaf;

    const sequestrationValue = co2_final - co2_initial;

    return Math.round(sequestrationValue);
  };

  useEffect(() => {
    const sequestrationValue = simulate();
    if(sequestrationValue){
    setSequestration(sequestrationValue);
    }
  }, [coniferNumber, broadleafNumber, coniferCm, broadleafCm]);

  if (!properties) {
    return null;
  }

  const { tree_valid, sum_c_seq, sum_c_stock, NOMBRE } = properties;

  return (
    <div className="simulator" style={{ height: visible ? "100%" : "0px" }}>
      <div>
        <div className="singleRow">
          <p>Simulator - {NOMBRE}</p>
        </div>

        <table className="greenRows">
          <thead>
            <tr>
              <th>Type</th>
              <th>Number of trees</th>
              <th>Diameter [cm]</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Evergreen</td>
              <td>
                <input
                  type="number"
                  placeholder="number"
                  name="coniferNumber"
                  value={coniferNumber}
                  onChange={changeConiferNumber}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="cm"
                  name="coniferDiameter"
                  value={coniferCm}
                  onChange={changeConiferCm}
                />
              </td>
            </tr>
            <tr>
              <td>Deciduous</td>
              <td>
                <input
                  type="number"
                  placeholder="number"
                  name="broadleafNumber"
                  value={broadleafNumber}
                  onChange={changeBroadleafNumber}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="cm"
                  name="broadlefDiameter"
                  value={broadleafCm}
                  onChange={changeBroadleafCm}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {sequestration && !isNaN(sequestration) && (!isNaN(coniferNumber) || !isNaN(broadleafNumber)) && (
        <div className='resultName'>
            <div className="row">
            <p className='resultName'>Current CO₂ stock</p>
            <p className='resultVal'>{Math.round(sum_c_stock)} kg</p>
            </div>
            <div className="row">
            <p className='resultName'>Additional simulated CO₂ stock</p>
            <p className='resultVal'>{Math.round(co2Initial)} kg</p>
            </div>
            <div className="row">
            <p className='resultName'>Total simulated CO₂ stock</p>
            <p className='resultVal'>{Math.round(sum_c_stock+co2Initial)} kg</p>
            </div>
            <div className="row">
            <p className='resultName'>Current CO₂ sequestration</p>
            <p className='resultVal'>{Math.round(sum_c_seq)} kg/y</p>
             </div>
            <div className="row">
            <p className='resultName'>Additional simulated CO₂ sequestration</p>
            <p className='resultVal'>{Math.round(sequestration)} kg/y</p>
            </div>
            <div className="row">
            <p className='resultName'>Total simulated CO₂ sequestration</p>
            <p className='resultVal'>{Math.round(sequestration+sum_c_seq)} kg/y</p>
            </div>
        </div>
      )}
      <button className="blueButton" onClick={
          ()=>{onClose(); setSequestration(null)}
      }
        >
        Close
      </button>
    </div>
  );
};
export default Simulator;
