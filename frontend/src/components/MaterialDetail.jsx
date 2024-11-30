import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "/logo2.png";

const MaterialDetail = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);
  const { id } = useParams();
  const [single, setSingle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://matexbackend.vercel.app/api/vendors/allMaterial";
        const response = await fetch(url);
        if (!response.ok) throw new Error("netork issue");
        const data = await response.json();
        const product = data.find((item) => item._id === id);
        setSingle(product);
      } catch (error) {
        console.log(`error is ${error}`);
      }
    };
    fetchData();
  }, [single, id]);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [typeIs, setTypeIs] = useState(null);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setTypeIs(localStorage.getItem("userType"));
  }, [loggedInUser]);

  const up = useRef(null);
  const down = useRef(null);

  const Close = () => {
    console.log(single);
    down.current.style.display = "block";
    up.current.style.display = "none";
  };
  const OpenD = () => {
    down.current.style.display = "none";
    up.current.style.display = "block";
  };
  const [focusedDiv, setFocusedDiv] = useState(null);

  const handleDownload = () => {
    const pdfUrl = single.datasheet_pdf;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "hello";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const type = localStorage.getItem("userType");
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, type]);

  return (
    <div className="w-full h-[100vh] bg-[#F4FBFA]  flex flex-col  ">
      <div className="min-h-[10%] flex justify-between xs1:px-[0.5rem] xs3:px-[4rem] py-[0.8rem] items-center overflow-hidden ">
        <a
          href="/"
          className="flex items-center gap-[0.5rem] text-[1.1rem] font-bold px-[1rem] "
        >
          <img
            src={logo}
            className="xs3:h-[2.5rem] xs1:h-[1.8rem] xs0:h-[1.6rem]"
            alt=""
          />
        </a>
        <div className="xs0:hidden xs2:block">
          {single ? (
            <p className=" font-extrabold xs2:text-[1.3rem] xs3:text-[2rem] text-[#5c5c5c] ">
              Material Name: {single.basic_detail.material_name}
            </p>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[0.5rem] font-bold ">
            <img
              src="https://th.bing.com/th/id/OIP.f3DM2upCo-p_NPRwBAwbKQAAAA?rs=1&pid=ImgDetMain"
              alt=""
              className="h-[2.5rem] w-[2.5rem] rounded-[2rem]"
            />
            <div className="flex gap-[0.5rem] items-center ">
              <div>
                <div>{loggedInUser}</div>
                <div className="text-[0.8rem] text-[#909090] ">{typeIs}</div>
              </div>
              <div className="">
                <span
                  className="hidden material-symbols-outlined cursor-pointer "
                  ref={up}
                  onClick={Close}
                >
                  expand_circle_up
                </span>
                <span
                  className=" material-symbols-outlined cursor-pointer"
                  ref={down}
                  onClick={OpenD}
                >
                  expand_circle_down
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detailPage xs0:px-[1rem] xs3:px-[0rem] overflow-auto pb-[3rem] scrollbar-hide scroll-smooth flex-grow  bg-[#F4FBFA] flex flex-col  ">
        {single ? (
          <div className="xs2:px-[4rem]  ">
            <div className="navBarOfMaterial py-[0.5rem]  flex justify-center items-center xs0:gap-[0.5rem] xs2:gap-[1.5rem] ">
              <a href="#basicDetail">
                <div
                  tabIndex={0}
                  onFocus={() => setFocusedDiv(1)}
                  className={`border-[2px] border-[#919191] ${
                    focusedDiv === 1
                      ? "bg-[#CCE8E7] border-[#CCE8E7] "
                      : " text-black"
                  }  xs0:px-[0.5rem] xs0:py-[0.3rem] xs2:px-[1rem] xs2:py-[0.3rem] rounded-[0.5rem] font-semibold xs0:text-[0.7rem] xs3:text-[1.1rem] `}
                >
                  Basic Details
                </div>
              </a>
              <a href="#materialProperties">
                <div
                  tabIndex={0}
                  onFocus={() => setFocusedDiv(2)}
                  className={`border-[2px] border-[#919191] ${
                    focusedDiv === 2
                      ? "bg-[#CCE8E7] border-[#CCE8E7] "
                      : " text-black"
                  } xs0:px-[0.5rem] xs0:py-[0.3rem] xs2:px-[1rem] xs2:py-[0.3rem] rounded-[0.5rem] font-semibold xs0:text-[0.7rem] xs3:text-[1.1rem] `}
                >
                  Material Properties
                </div>
              </a>
              {userType === "User" ? (
                <a href="#vendorDetail">
                  <div
                    tabIndex={0}
                    onFocus={() => setFocusedDiv(3)}
                    className={`border-[2px] border-[#919191] ${
                      focusedDiv === 3
                        ? "bg-[#CCE8E7] border-[#CCE8E7] "
                        : " text-black"
                    } xs0:px-[0.5rem] xs0:py-[0.3rem] xs2:px-[1rem] xs2:py-[0.3rem] rounded-[0.5rem] font-semibold xs0:text-[0.7rem] xs3:text-[1.1rem] `}
                  >
                    Vendor Details
                  </div>
                </a>
              ) : (
                ""
              )}
            </div>
            <div
              className="basicDetail  flex xs0:flex-col  xs3:flex-row  justify-between "
              id="basicDetail"
            >
              <div className="flex-grow flex flex-col xs0:order-2 xs3:order-1 gap-[0.5rem] py-[0.5rem] ">
                <div className="font-bold text-[1.8rem] ">Basic Details</div>
                <div className="name flex items-center gap-[1rem] ">
                  <span className="text-[1.3rem] self-start w-[15rem] font-semibold text-[#747474]">
                    Material Name:
                  </span>
                  <span className="text-[1.3rem]  w-[15ch] font-semibold text-[#747474]">
                    {single.basic_detail.material_name}
                  </span>
                </div>
                <div className="name flex items-center gap-[1rem] ">
                  <span className="text-[1.3rem] self-start w-[15rem] font-semibold text-[#747474]">
                    Material Category:
                  </span>
                  <span className="text-[1.3rem] w-[15ch] font-semibold text-[#747474]">
                    {single.basic_detail.material_cat}
                  </span>
                </div>
                <div className="name flex items-center gap-[1rem] ">
                  <span className="text-[1.3rem]  xs0:min-w-[15ch] xs3:w-[15rem] font-semibold text-[#747474] self-start ">
                    Additional Details:
                  </span>
                  <span className="text-[1.3rem] w-[60ch] font-semibold text-[#747474]">
                    {single.basic_detail.addtional_detail}
                  </span>
                </div>
                {
                  single.process_name.length? (
                    <div className="name flex items-center gap-[1rem] ">
                      <span className="text-[1.3rem]  xs0:min-w-[15ch] xs3:w-[15rem] font-semibold text-[#747474] self-start ">
                        Possible Process:
                      </span>
                      <div className="flex gap-[0.3rem] flex-wrap pr-[1rem] flex-grow " >
                        {
                          single.process_name.map((item)=>{
                            return(
                              <>
                              <span className="text-[1.3rem] border border-[#a9a9a9] px-[0.4rem] py-[0.1rem] rounded-[0.3rem] font-semibold text-[#747474]" >
                                {item}
                              </span>
                              </>
                            )
                          })
                        }
                      </div>
                      {/* <span className="text-[1.3rem] w-[60ch] font-semibold text-[#747474]">
                        {single.basic_detail.addtional_detail}
                      </span> */}
                  </div>
                  ): ""
                }
              </div>
              <img
                src={single.material_photo}
                className="xs3:w-[20rem] xs3:h-[20rem] xs0:h-[20rem] xs0:w-full  xs0:order-1 xs3:order-2 rounded-[1rem] "
                alt="hkhkjh"
              />
            </div>
            <div className="materialProperties   " id="materialProperties">
              <div className="flex-grow flex flex-col gap-[0.5rem] py-[0.5rem] ">
                <div className="font-bold text-[1.8rem] ">
                  Material Properties
                </div>
                <div className="propert flex flex-col gap-[0.2rem]  ">
                  <div className=" flex justify-between px-[1rem] bg-[#CCE8E7] rounded-[0.4rem] xs3:pr-[10rem] border border-[#898989] border-x-0 border-t-0 ">
                    <div className=" p-[0.2rem] w-[15rem] text-[1.3rem] font-semibold ">
                      Property
                    </div>
                    <div className=" p-[0.2rem] w-[15rem] text-[1.3rem] font-semibold ">
                      Value
                    </div>
                    <div className=" p-[0.2rem] w-[15rem] text-[1.3rem] font-semibold ">
                      Units
                    </div>
                  </div>
                  {Array.isArray(single.material_properties.material_properties)
                    ? single.material_properties.material_properties.map(
                        (propert) => {
                          return (
                            <>
                              <div className=" flex justify-between px-[1rem] xs3:pr-[10rem] border border-[#898989] border-x-0 border-t-0 ">
                                <div className=" p-[0.2rem] w-[15rem] text-[#747474] text-[1.3rem]   ">
                                  {propert.property}
                                </div>
                                <div className=" p-[0.2rem] w-[15rem] text-[#747474] text-[1.3rem]  ">
                                  {`${propert.min}-${propert.max}`}
                                </div>
                                <div className=" p-[0.2rem] w-[15rem] text-[#747474] text-[1.3rem]  ">
                                  {propert.unit}
                                </div>
                              </div>
                            </>
                          );
                        }
                      )
                    : "No property"}
                </div>
              </div>
            </div>
            <div className="dataSheet    my-[1rem] flex gap-[1rem] items-center ">
              <div className=" text-[#747474] font-semibold py-[0.2rem] xs3:text-[1.3rem]  ">
                Download detailed properties data-sheet:
              </div>
              <div
                onClick={handleDownload}
                className="border text-[white] bg-[#005C5C] cursor-pointer flex items-center gap-[0.2rem] rounded-[4rem] px-[1rem] py-[0.5rem] "
              >
                <span className=" material-symbols-outlined">download</span>
                <span>Datasheet</span>
              </div>
            </div>
            {userType === "User" ? (
              <div className="vendorDetail   " id="vendorDetail">
                <div className="font-bold text-[1.8rem] ">Vendor Detail</div>
                <div className="vdetail  ">
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      Shop Name:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] items-start  font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.company}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      Street Name:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.street}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      Zip Code:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.zip}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      City Name:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      State Name:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.state}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-[2rem]">
                    <span className=" text-[#747474] xs3:w-[15rem] self-start font-semibold py-[0.2rem] text-[1.3rem]  ">
                      Country Name:
                    </span>
                    <span className=" text-[#747474] xs0:w-[12ch] xs3:w-[50ch] font-semibold py-[0.2rem] text-[1.3rem]  ">
                      {single.vendor_contact.country}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MaterialDetail;
