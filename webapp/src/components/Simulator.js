import { useState, useEffect } from "react";
const Simulator = ({ visible, onClose, properties }) => {
  const [coniferNumber, setConiferNumber] = useState(0);
  const [broadleafNumber, setBroadleafNumber] = useState(0);

  const [coniferCm, setConiferCm] = useState(null);
  const [broadleafCm, setBroadleafCm] = useState(null);

  const [sequestration, setSequestration] = useState(null);
  
  const changeConiferNumber = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value) || value === null) {
      setConiferNumber(value);
    }
  };
  const changeBroadleafNumber = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value) || value === null) {
      setBroadleafNumber(value);
    }
  };

  const changeConiferCm = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value) || value === null) {
      setConiferCm(value);
    }
  };
  const changeBroadleafCm = (event) => {
    const value = Number(event.target.value) || null;
    if (Number.isInteger(value) || value === null) {
      setBroadleafCm(value);
    }
  };

  const simulate = () => {
    const get_co2 = (senescence, cm) => {
      if (!senescence || !cm) {
        return 0;
      }
      if (senescence == "broadleaf") {
        return 0.16155 * Math.pow(cm, 2.310647) * 0.5 * 3.67;
      }
      if (senescence == "conifer") {
        return 0.035702 * Math.pow(cm, 2.580671) * 0.5 * 3.67;
      }
    };
    const co2_initial_conifer = get_co2("conifer", coniferCm) * coniferNumber;
    const co2_initial_broadleaf =
      get_co2("broadleaf", broadleafCm) * broadleafNumber;

    const co2_initial = co2_initial_conifer + co2_initial_broadleaf;

    const get_t1 = (diameter_t0) => {
      if (!diameter_t0) {
        return 0;
      }
      return diameter_t0 + (-0.5425 + 0.3189 * Math.log(diameter_t0));
    };
    const co2_final_conifer =
      get_co2("conifer", get_t1(coniferCm)) * coniferNumber;

    const co2_final_broadleaf =
      get_co2("broadleaf", get_t1(broadleafCm)) * broadleafNumber;

    const co2_final = co2_final_conifer + co2_final_broadleaf;

    const sequestrationValue = co2_final - co2_initial;

    return Math.round(sequestrationValue*1000)/1000;
    //     Current CO2 stock [kg] (quello che mostriamo già nel Viewer, in basso a sinistra)
    // Additional simulated CO2 stock [kg] (somma tra quello al giorno d'oggi e la somma di tutti i CO2 stock iniziali dei nuovi alberi)
    // Total simulated CO2 stock [kg] (somma dei precedenti 2)
    // Current CO2 sequestration [kg/y]  (quello che mostriamo già nel Viewer, in basso a sinistra)
    // Additional simulated CO2 sequestration [kg/y] (questo numero deriva dal calcolo sopra [*])
    // Total simulated CO2 sequestration (somma dei precedenti due)
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

  const { tree_valid, tree_tot, sum_c_stock, sum_c_seq, NOMBRE } = properties;

  return (
    <div className="simulator" style={{ height: visible ? "400px" : "0px" }}>
      <div>
        <div className="singleRow">
          <p>Simulator - {NOMBRE}</p>
        </div>

        <table class="greenRows">
          <thead>
            <tr>
              <th>Type</th>
              <th>Number</th>
              <th>Diameter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conifer</td>
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
              <td>Broadleaf</td>
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
      {sequestration && !isNaN(sequestration) && (
        <p className='sequestration'>Sequestration: {sequestration}</p>
      )}
      <button className="blueButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
export default Simulator;
