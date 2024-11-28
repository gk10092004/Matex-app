import { useState } from "react";
import VendorMaterialCard from "./VendorMasterCard";
import PropTypes from "prop-types";

const VendorShopMaterial = ({ his }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="xs3:w-[40rem]   flex-grow xs3:self-stretch xs2:w-full xs3:h-[full] bg-[white] rounded-[1.5rem] xs0:px-[0.5rem] xs2:px-[2rem] py-[1rem] flex flex-col gap-[0.7rem] border-[2px] ">
      <div className=" h-[3rem] flex items-center bg-[#E3E9E9] rounded-[2rem] gap-[0.5rem] text-[1.1rem] px-[2rem] py-[1.5rem]  ">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-[0.2rem] text-[#3F4948] font-semibold outline-none bg-transparent "
        />
      </div>
      <div className="  flex gap-[0.3rem] justify-between items-center ">
        <div className="font-semibold text-[1.2rem]">All Material</div>
      </div>
      <div className=" flex-grow-[1] min-h-[20vh]  flex flex-col gap-[1rem] py-[0.5rem] overflow-auto scrollbar-hide  ">
        {his
          .filter((it) => {
            return search.toLowerCase() === ""
              ? it
              : it.basic_detail.material_name.toLowerCase().includes(search);
          })
          .map((items) => {
            return <VendorMaterialCard key={items._id} items={items} />;
          })}
      </div>
    </div>
  );
};

VendorShopMaterial.propTypes = {
  his: PropTypes.array.isRequired,
};

export default VendorShopMaterial;
