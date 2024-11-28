import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { handleError } from "../utils";
const Property1 = ({ index, handleCardDataChange }) => {
  const property = [
    { label: "Shear Modulus" },
    { label: "Elastic Modulus" },
    { label: "Bulk Modulus" },
    { label: "Shear Strength" },
    { label: "Tensile Strength" },
    { label: "Yield Strength" },
    { label: "Elastic Modulus" },
    { label: "Density" },
    { label: "Ultimate Tensile Strength" },
    { label: "Fatigue Strength" },
    { label: "Toughness" },
    { label: "Thermal Conductivity" },
    { label: "Bending Strength" },
    { label: "Transverse Rupture Strength" },
  ];
  const Units = [
    { label: "Mpa" },
    { label: "Kg/m³" },
    { label: "MJ/m³" },
    { label: "W/m·K" },
  ];
  const dataRef = useRef(null);
  const up = useRef(null);
  const down = useRef(null);
  const selects = useRef(null);
  const dataPart = useRef(null);
  const downSelect = useRef(null);
  const EnteredData = useRef(null);
  const [unit, setUnit] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [propty, setPropty] = useState(null);

  const [gapFlag, setGapFlag] = useState(false);
  const OpenBtn = () => {
    dataRef.current.reset;
    dataRef.current.style.display = "block";
    up.current.style.display = "block";

    down.current.style.display = "none";
    setGapFlag(true);
  };
  const Close = () => {
    up.current.style.display = "none";
    down.current.style.display = "block";
    dataPart.current.style.display = "flex";
    dataRef.current.style.display = "none";
    selects.current.style.display = "none";

    if (!propty) handleError("Select Property");
    if (!unit) handleError("Select Unit");
    if (!min) handleError("Select Minimum Value");
    if (!max) handleError("Select Maximum Value");
    EnteredData.current.innerHTML = `${propty}: ${min}-${max} ${unit}`;
  };
  const OpenD = () => {
    dataPart.current.style.display = "none";
    up.current.style.display = "block";
    down.current.style.display = "none";
    selects.current.style.display = "block";

    dataRef.current.style.display = "block";
  };
  const selectedProp = useRef(null);
  const selectedUnit = useRef(null);
  const selectedMin = useRef(null);
  const selectedMax = useRef(null);

  const ClearData = () => {
    setPropty(null);
    setUnit(null);
    setMax(null);
    setMin(null);

    selectedProp.current.value = "hidden";
    selectedMax.current.value = null;
    selectedMin.current.value = null;
    selectedUnit.current.value = "hidden";

    dataPart.current.style.display = "none";
    selects.current.style.display = "block";

    handleCardDataChange(index, {
      property: null,
      unit: null,
      max: null,
      min: null,
    });
  };

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "unit") setUnit(value);
    else if (name === "property") setPropty(value);
    else if (name === "min") setMin(value);
    else if (name === "max") setMax(value);

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    handleCardDataChange(index, updatedFormData);
  };

  return (
    <div className="w-[100%] ">
      <div
        className={`py-[0.8rem] w-[100%]  flex items-center ${
          gapFlag ? "gap-[0.8rem]" : "gap-[0rem]"
        }    justify-between border-[green] `}
        ref={downSelect}
      >
        <div
          ref={selects}
          className="flex flex-grow w-[100%]  items-center justify-center border-none self-stretch "
        >
          <select
            ref={selectedProp}
            name="property"
            onClick={OpenBtn}
            onChange={handleChange}
            className="w-[100%]  h-[2.5rem] px-[1rem] text-[#3F4948] bg-transparent text-[1.2rem] border-[#596161] border-[0.15rem] rounded-[0.5rem] outline-none "
          >
            <option value="hidden" disabled selected hidden>
              Property
            </option>
            {property.map((i, idx) => {
              return (
                <option key={idx} value={i.label}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="hidden flex-grow justify-between items-center gap-[0.5rem] font-semibold border border-[#596161] py-[0.4rem] px-[1rem]  rounded-[0.5rem] mb-[0.5rem]   min-h-[2.5rem] text-[1.2rem]  "
          ref={dataPart}
        >
          <div ref={EnteredData} className=" "></div>
          <div
            className="font-bold cursor-pointer text-[2rem] "
            onClick={ClearData}
          >
            &times;
          </div>
        </div>
        <div className="  ">
          <span
            className="hidden text-[2rem] material-symbols-outlined cursor-pointer "
            ref={up}
            onClick={Close}
          >
            expand_circle_up
          </span>
          <span
            className="hidden text-[2rem] material-symbols-outlined cursor-pointer"
            ref={down}
            onClick={OpenD}
          >
            expand_circle_down
          </span>
        </div>
      </div>

      <div ref={dataRef} className="hidden mb-[0.5rem]  ">
        <div className="flex flex-col gap-[0.8rem]">
          <select
            ref={selectedUnit}
            name="unit"
            onChange={handleChange}
            className="border outline-none rounded-[0.5rem] h-[2.5rem] px-[1rem] text-[1.2rem]"
          >
            <option value="hidden" disabled selected hidden>
              Units
            </option>
            {Units.map((items, idx) => {
              return (
                <>
                  <option key={idx} value={items.label}>
                    {items.label}
                  </option>
                </>
              );
            })}
          </select>

          <div className="flex flex-row gap-[0.3rem] justify-between  ">
            <input
              ref={selectedMin}
              name="min"
              type="number"
              onChange={handleChange}
              className="numberOnly flex-1 min-w-0 border  outline-none rounded-[0.5rem] h-[2.5rem] px-[1rem] text-[1.2rem] "
              placeholder="Min"
            />
            <input
              ref={selectedMax}
              name="max"
              type="number"
              onChange={handleChange}
              className="numberOnly flex-1 min-w-0 border  outline-none rounded-[0.5rem] h-[2.5rem] px-[1rem] text-[1.2rem]"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <hr className="mx-[1.5rem] ml-[1.5rem] mb-[0.5rem] w-[80%] h-[0.1rem] rounded-[1rem] bg-[#BEC9C8] border-0 " />
    </div>
  );
};

Property1.propTypes = {
  index: PropTypes.number.isRequired,
  handleCardDataChange: PropTypes.func.isRequired,
};

export default Property1;
