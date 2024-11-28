import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import VendorShopMaterial from "./VendorShopMaterial";

const UserHome = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);

  const MatProcess = (e) => {
    e.preventDefault();
    setFlag(false);
  };
  const MatHis = (e) => {
    e.preventDefault();
    setFlag(true);
  };

  //historyCard
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userType");
      navigate("/user-login");
    }, 86400000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const [owner, setOwner] = useState(null);
  useEffect(() => {
    setOwner(localStorage.getItem("owner"));
  }, []);
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const type = localStorage.getItem("userType");
  useEffect(() => {
    if (isAuthenticated) {
      if (type == "User") navigate("/user-home");
      else navigate("/vendor-home");
    } else navigate("/");
  }, [isAuthenticated, navigate, type]);

  //process and material
  const [history, setHistory] = useState([]);
  const [process, setProcess] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = "https://matexbackend.vercel.app/api/vendors/all-vendor";
        const response = await fetch(url);
        if (!response.ok) throw new Error("server not found");
        const data = await response.json();
        const vendor = data.filter((item) => {
          if (item._id == owner) return item;
        });

        const his = vendor.flatMap((item) => item.likedPart);

        const proc = vendor.flatMap((item) => item.materialProcess);
        setHistory(his);
        setProcess(proc);

        const updateProp = proc.map((item) => {
          const relatedMaterial = his
            .filter((mat) => {
              return mat.process_name.includes(item.basic_detail.process_name);
            })
            .map((mat) => mat.basic_detail.material_name);
          return {
            ...item,
            related_material: relatedMaterial,
          };
        });
        setProcess(updateProp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [owner]);

  const demoRun = () => {
    console.log(process);
  };

  return (
    <div className="w-full  bg-[#F4FBFA] flex flex-col  ">
      <div className="h-[90vh] xs0:px-[0.5rem] xs2:px-[0rem]  xs1:px-[1rem]  xs3:px-[2.5rem] xs1:py-[2rem] xs2:py-[1rem] xs1:mt-[2rem] xs2:mt-[0rem] xs2:flex xs1:flex-col xs1:items-center xs3:flex-row xs3:justify-between xs2:gap-[1.5rem]">
        <div className="xs3:w-[20rem] xs3:self-stretch xs2:w-full pl-[0.1rem]  xs3:h-[100%] text-[#3F4948] flex flex-col  py-[1rem]  ">
          <div className="flex flex-col gap-[0.7rem]  ">
            <button
              onClick={MatHis}
              className={`flex gap-[1rem] text-[#3F4948]  font-bold items-center rounded-[2rem] px-[1.5rem] py-[0.6rem] ${
                flag ? "bg-[#cce8e7]" : ""
              }  `}
            >
              <span className="material-symbols-outlined">category</span>
              <span>Materials</span>
            </button>
            <button
              onClick={MatProcess}
              className={`flex gap-[1rem] text-[#3F4948]  font-bold items-center   rounded-[2rem] px-[1.5rem] py-[0.6rem] ${
                flag ? "" : "bg-[#cce8e7]"
              } `}
            >
              <span className="material-symbols-outlined">manufacturing</span>
              <span>Manufacturing Processes</span>
            </button>
          </div>
        </div>
        {flag ? (
          <VendorShopMaterial his={history} />
        ) : (
          // <VendorShopProcess proc={process} />
          <div className="flex-grow h-[100%] flex justify-center items-center text-[1.5rem] font-bold ">
            <span onClick={demoRun}>
              Manufacturing Process is in developing phase......
            </span>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserHome;
