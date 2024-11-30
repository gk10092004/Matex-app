import { useEffect, useState } from "react";

const Admin = () => {
  const [allUser, setAllUser] = useState([]);
  const [allVendor, setAllVendor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "https://matexbackend.vercel.app/api/vendors/all-vendor"
        );
        const response2 = await fetch(
          "https://matexbackend.vercel.app/api/users/all-user"
        );
        if (!response1.ok) throw new Error("Network response was not ok");
        if (!response2.ok) throw new Error("Network response was not ok");

        const data1 = await response1.json();
        const data2 = await response2.json();
        const vendor = data1.map((item) => {
          return item;
        });
        setAllVendor(vendor);
        const user = data2.map((item) => {
          return item;
        });
        setAllUser(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [flag, setFlag] = useState(false);
  const handleCliete = () => {
    setFlag(true);
  };
  const handleFlow = () => {
    setFlag(false);
  };
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [submit, setSubmit] = useState(true);
  const Submit = () => {
    if (name === "1234" && password === "1234") {
      setSubmit(false);
    } else {
      alert("Enter correct credentials");
    }
  };

  return (
    <>
      <div className="xs2:hidden text-[2rem] font-bold ">
        Open in Big Screen
      </div>
      {submit ? (
        <div className="bg-[#F4FBFA] w-[100vw] h-[100vh] xs01:hidden  xs3:flex flex-col justify-center items-center ">
          <div className="text-[2.5rem] font-semibold text-[#727272] ">
            Admin
          </div>
          <div className=" border-[0.2rem] border-[#686868] p-[2rem] flex flex-col gap-[0.8rem] ">
            <div className="flex flex-col">
              <label className="text-[1.5rem] text-[#313131] font-semibold ">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-[30rem] px-[1rem] py-[0.5rem] text-[1.2rem] outline-none rounded-[0.5rem] bg-transparent text-[#6d6d6d] border-[#4b4b4b] border-[0.1rem] "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[1.5rem] text-[#313131] font-semibold ">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-[30rem] px-[1rem] py-[0.5rem] text-[1.2rem] outline-none rounded-[0.5rem] bg-transparent text-[#6d6d6d] border-[#4b4b4b] border-[0.1rem] "
              />
            </div>
            <button
              onClick={Submit}
              className="border-[#999999] px-[1.2rem] border-[2px] rounded-[1rem] font-semibold hover:bg-[green] hover:border-[green] hover:text-[white] py-[0.2rem] w-fit self-center "
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#F4FBFA] flex flex-col w-[100vw] h-[100vh] ">
          <nav className=" xs2:h-[4rem] px-[2rem] py-[0.5rem] xs01:hidden xs3:flex justify-between items-center">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="./logo2.png"
                className="xs3:h-[2.5rem] xs1:h-[1.6rem] xs0:h-[1.6rem] "
                alt="Flowbite Logo"
              />
            </a>
            <div
              onClick={handleFlow}
              className="text-[2.5rem] cursor-pointer font-bold text-[#838383] "
            >
              Admin Page
            </div>
            <div
              onClick={handleCliete}
              className="text-[2rem] cursor-pointer font-bold text-[#838383] "
            >
              Gaurav Kumar
            </div>
          </nav>
          {flag ? (
            <div className="mainPage xs01:hidden bg-[#00800000] flex-grow xs3:flex ">
              <div className="bg-[#0000ff00] flex-1 flex items-center justify-center   ">
                <div className="VendorList border border-[#515151] xs2:h-[85vh] xs2:w-[45vw] rounded-[1rem] xs2:p-[1rem] flex flex-col gap-[0.4rem] ">
                  <div className="flex justify-between border  border-[#838383] rounded-[0.4rem] px-[0.3rem] py-[0.2rem] ">
                    <span className="text-[1.2rem] font-semibold ">
                      Vendor Name
                    </span>
                    <span className="text-[1.2rem] font-semibold ">
                      Company Name
                    </span>
                    <span className="text-[1.2rem] font-semibold ">
                      Contact Number
                    </span>
                  </div>
                  <div className="bg-[#ffffff00] flex-grow flex flex-col gap-[0.5rem] overflow-auto scrollbar-hide ">
                    {allVendor.map((user) => {
                      return (
                        <>
                          <div
                            key={user._id}
                            className="flex justify-between border text-[#878787]  border-[#838383] rounded-[0.4rem] px-[0.3rem] py-[0.2rem] "
                          >
                            <span className="text-[1.2rem] font-semibold ">
                              {user.vendorname}
                            </span>
                            <span className="text-[1.2rem] font-semibold ">
                              {user.companyName}
                            </span>
                            <span className="text-[1.2rem] font-semibold ">
                              {user.phoneNumber}
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center  ">
                <div className="UserList border border-[#515151] xs2:h-[85vh] xs2:w-[45vw] rounded-[1rem] xs2:p-[1rem] flex flex-col gap-[0.4rem] ">
                  <div className="flex justify-between border  border-[#838383] rounded-[0.4rem] px-[0.3rem] py-[0.2rem] ">
                    <span className="text-[1.2rem] font-semibold ">
                      User Name
                    </span>
                    <span className="text-[1.2rem] font-semibold ">
                      Job Role
                    </span>
                    <span className="text-[1.2rem] font-semibold ">
                      Contact Number
                    </span>
                  </div>
                  <div className="bg-[#ffffff00] flex-grow flex flex-col gap-[0.2rem] overflow-auto scrollbar-hide ">
                    {allUser.map((user) => {
                      return (
                        <>
                          <div
                            key={user._id}
                            className="flex justify-between text-[#878787] border  border-[#838383] rounded-[0.4rem] px-[0.3rem] py-[0.2rem] "
                          >
                            <span className="text-[1.2rem] font-semibold ">
                              {user.username}
                            </span>
                            <span className="text-[1.2rem] font-semibold ">
                              {user.jobTitle}
                            </span>
                            <span className="text-[1.2rem] font-semibold ">
                              {user.phoneNumber}
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" xs01:hidden xs3:block flex-1 overflow-hidden ">
              <img
                src="/flow.png"
                className="w-full h-full object-fill "
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
