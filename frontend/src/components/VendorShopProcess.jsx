import PropTypes from "prop-types";
import VendorProcessCard from "./VendorProcessCard";

const VendorShopProcess = ({ proc }) => {
  const demoRun = () => {
    console.log(proc);
  };
  return (
    <div className="xs3:w-[40rem]  flex-grow xs3:self-stretch xs2:w-full xs3:h-[full] bg-[white] rounded-[1.5rem] xs1:px-[0.5rem] xs2:px-[2rem] py-[1rem] flex flex-col gap-[0.7rem] border-[2px] ">
      <div className=" h-[3rem] flex items-center bg-[#E3E9E9] rounded-[2rem] gap-[0.5rem] text-[1.1rem] px-[2rem] py-[1.5rem]  ">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search"
          className="w-full py-[0.2rem] text-[#3F4948] font-semibold outline-none bg-transparent "
        />
      </div>
      <div className="  flex gap-[0.3rem] justify-between items-center ">
        <div onClick={demoRun} className="font-semibold text-[1.2rem]">
          All Material
        </div>
      </div>
      <div className=" flex-grow-[1] min-h-[20vh]  flex flex-col gap-[1rem] py-[0.5rem] overflow-auto scrollbar-hide  ">
        {proc.map((items) => {
          return <VendorProcessCard key={items._id} items={items} />;
        })}
      </div>
    </div>
  );
};

VendorShopProcess.propTypes = {
  proc: PropTypes.array.isRequired,
};

export default VendorShopProcess;
