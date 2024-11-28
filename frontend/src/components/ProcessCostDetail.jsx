import { useState } from "react";
import PropTypes from "prop-types";
const ProcessCostDetail = ({ id, onDataChange }) => {
  const [cost, setCost] = useState(null);
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState(null);

  const handleChange = () => {
    onDataChange(id, { cost,price,currency });
  };


  const Currency = [
    { label: "USD (United States Dollar)" },
    { label: "EUR (Euro)" },
    { label: "JPY (Japanese Yen)" },
    { label: "GBP (British Pound)" },
    { label: "AUD (Australian Dollar)" },
    { label: "CAD (Canadian Dollar)" },
    { label: "CHF (Swiss Franc)" },
    { label: "CNY (Chinese Yuan)" },
    { label: "INR (Indian Rupee)" },
    { label: "MXN (Mexican Peso)" }
];

  return (
    <div className=" flex xs0:flex-col xs2:flex-row gap-[1rem] w-full ">
      <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
        <div className="font-semibold">Add Cost</div>
        <input
          type="text"
          required
          className="h-[3.5rem]  text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
          placeholder="Add Cost"
          name="cost"
          onChange={(e)=>{
            setCost(e.target.value);
            handleChange();
          }}
        />
      </div>
      <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow ">
        <div className="font-semibold">Add Price</div>
        <input
          type="text"
          className="h-[3.5rem]  text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
          placeholder="Add Price"
          required
          name="price"
          onChange={(e)=>{
            setPrice(e.target.value);
            handleChange();
          }}
        />
      </div>
      <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow  ">
        <div className="font-semibold">Currency</div>
        <select
          name="currency"
          required
          id="material"
          onChange={(e)=>{
            setCurrency(e.target.value);
            handleChange();
          }}
          className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
        >
          <option value="hidden" disabled selected hidden>
            Currency
          </option>
          {Currency.map((i, idx) => {
            return (
              <option key={idx} value={i.label}>
                {i.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

ProcessCostDetail.propTypes = {
  id: PropTypes.number.isRequired,
  onDataChange: PropTypes.func.isRequired, 
};

export default ProcessCostDetail;
