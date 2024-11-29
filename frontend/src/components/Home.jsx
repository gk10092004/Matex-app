import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const mainBox = useRef(null);
  const loginBox = useRef(null);
  const signupBox = useRef(null);
  const Login = () => {
    mainBox.current.style.display = "flex";
    loginBox.current.style.display = "flex";
    signupBox.current.style.display = "none";
  };
  const SignUp = () => {
    mainBox.current.style.display = "flex";
    signupBox.current.style.display = "flex";
    loginBox.current.style.display = "none";
  };
  const Cancel = () => {
    mainBox.current.style.display = "none";
  };
  const UserSignUp = () => {
    navigate("/user-signup");
  };
  const VendorSignUp = () => {
    navigate("/vendor-signup");
  };
  const UserLogin = () => {
    navigate("/user-login");
  };
  const VendorLogin = () => {
    navigate("/vendor-login");
  };
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const type = localStorage.getItem("userType");
  useEffect(() => {
    if (isAuthenticated) {
      if (type == "User") navigate("/user-home");
      else navigate("/vendor-home");
    }
  }, [isAuthenticated, navigate, type]);
  return (
    <div className="flex flex-col bg-[#F4FBFA] items-center  ">
      <div className="navbar">
        <nav className="bg-[#F4FBFA] dark:bg-[#F4FBFA] fixed w-full z-20 top-0 start-0 ">
          <div className=" flex flex-wrap items-center justify-between mx-auto xs0:py-4 xs3:px-[5rem] xs2:px-[2rem] xs1:px-[0.8rem] xs0:px-[0.5rem] xs2:p-4  ">
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
            <div className="flex items-center xs2:gap-[0.8rem] md:order-2 xs0:space-x-1.5 xs1:space-x-2  md:space-x-0 rtl:space-x-reverse">
              <a href="#auth">
                <button
                  onClick={Login}
                  type="button"
                  className=" xs3:text-[1.4rem] font-bold text-[#797979] hover:text-[black] bg-[#CCE8E7] hover:bg-[#b6fffd]  focus:outline-none  xs3:rounded-[2rem]  xs3:px-[1.5rem] xs2:px-[1.6rem] xs1:px-[1rem] xs0:px-[1.2rem] xs0:rounded-[2rem] xs0:py-[0.3rem] xs1:py-[0.4rem] text-center dark:bg-[#CCE8E7] dark:hover:bg-[#b6fffd] dark:focus:ring-[#CCE8E7]"
                >
                  Login
                </button>
              </a>
              <a href="#auth">
                <button
                  onClick={SignUp}
                  type="button"
                  className="xs3:text-[1.4rem] font-bold text-[#797979] hover:text-[black] bg-[#CCE8E7] hover:bg-[#b6fffd]  focus:outline-none  xs3:rounded-[2rem]  xs3:px-[1.5rem] xs2:px-[1.6rem] xs1:px-[1rem] xs0:px-[0.8rem] xs0:rounded-[2rem] xs0:py-[0.3rem] xs1:py-[0.4rem]  text-center dark:bg-[#CCE8E7] dark:hover:bg-[#b6fffd] dark:focus:ring-[#CCE8E7]"
                >
                  Sign Up
                </button>
              </a>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="inline-flex items-center xs0:py-[0.3rem] xs1:py-[0.4rem] xs0:w-9 xs1:w-10 xs0:h-8 xs1:h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-[#CCE8E7] focus:outline-none   dark:text-gray-400  "
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`md:flex md:w-auto md:order-1 ${
                isMenuOpen ? "block" : "hidden"
              } w-full `}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-[#F4FBFA] md:bg-[#F4FBFA] ">
                <li>
                  <a
                    href="#home"
                    className="block py-2 px-3 text-[1.4rem] font-bold text-[#797979] rounded-[0.5rem] hover:bg-[#CCE8E7] md:hover:bg-transparent md:hover:text-[black] md:p-0 md:dark:hover:text-[black] dark:text-[#797979] dark:hover:text-[black] dark:hover:bg-[#b6fffd]  md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="block py-2 px-3 text-[1.4rem] font-bold text-[#797979] rounded-[0.5rem] hover:bg-[#CCE8E7] md:hover:bg-transparent md:hover:text-[black] md:p-0 md:dark:hover:text-[black] dark:text-[#797979] dark:hover:text-[black] dark:hover:bg-[#b6fffd]  md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div
        ref={mainBox}
        id="auth"
        className="select z-[100] absolute text-[#000000] xs0:w-full xs3:w-[40vw] xs3:h-[100vh] xs3:rounded-[2rem]  hidden justify-center items-center xs3:border-[2px] border-[#7c7c7c] bg-[#CCE8E7] xs0:py-[2rem]  "
      >
        <div
          ref={loginBox}
          className="login hidden flex-col items-center gap-[2rem] "
        >
          <div className="text-[2.5rem] font-bold ">You can Login as</div>
          <div className="flex gap-[8rem] ">
            <div
              onClick={UserLogin}
              className="userLogin flex flex-col items-center gap-[0.5rem] cursor-pointer "
            >
              <img
                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?semt=ais_hybrid"
                alt=""
                className="w-[7rem] rounded-[7rem]"
              />
              <h3 className="text-[2rem] font-bold ">User</h3>
            </div>
            <div
              onClick={VendorLogin}
              className="vendorLogin flex flex-col items-center gap-[0.5rem] cursor-pointer "
            >
              <img
                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?semt=ais_hybrid"
                alt=""
                className="w-[7rem] rounded-[7rem]"
              />
              <h3 className="text-[2rem] font-bold ">Vendor</h3>
            </div>
          </div>
          <button
            onClick={Cancel}
            className="border-[2px] border-[#7c7c7c] py-[0.5rem] px-[1.5rem] rounded-[0.5rem] outline-none font-semibold hover:bg-[#b6fffd] hover:border-[#b6fffd] mt-[3rem] "
          >
            Cancel
          </button>
        </div>
        <div
          ref={signupBox}
          className="sigup hidden flex-col items-center gap-[2rem] "
        >
          <div className="text-[2.5rem] font-bold ">You can SignUp as</div>
          <div className="flex gap-[8rem] ">
            <div
              onClick={UserSignUp}
              className="userSignUp flex flex-col items-center gap-[0.5rem] cursor-pointer"
            >
              <img
                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?semt=ais_hybrid"
                alt=""
                className="w-[7rem] rounded-[7rem]"
              />
              <h3 className="text-[2rem] font-bold ">User</h3>
            </div>
            <div
              onClick={VendorSignUp}
              className="vendorSignUp flex flex-col items-center gap-[0.5rem] cursor-pointer"
            >
              <img
                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?semt=ais_hybrid"
                alt=""
                className="w-[7rem] rounded-[7rem]"
              />
              <h3 className="text-[2rem] font-bold ">Vendor</h3>
            </div>
          </div>
          <button
            onClick={Cancel}
            className="border-[2px] border-[#7c7c7c] py-[0.5rem] px-[1.5rem] rounded-[0.5rem] outline-none font-semibold hover:bg-[#b6fffd] hover:border-[#b6fffd] mt-[3rem] "
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="main xs2:block mt-[5rem]  ">
        <div
          id="home"
          className="home flex flex-col  xs3:bg-[transparent]  xs0:p-[0.5rem] xs3:p-[2rem] gap-[5rem] "
        >
          <div className="user  w-full flex xs0:flex-col xs3:flex-row xs0:items-center xs0:py-[2rem] xs0:px-[1rem] xs3:py-[0rem]  xs0:border-[0.15rem] xs3:border-none xs0:rounded-[1rem] xs3:rounded-none  md:justify-around xs0:gap-[1rem] xs2:gap-[3rem]  ">
            <img
              src="./tig_welding.jpg"
              alt=""
              className="xs3:w-[50vw] xs1:w-[80vw] xs3:h-[50vh] xs2:h-[35vh] xs1:h-[25vh] rounded-[1rem] "
            />
            <div className="px-[1rem] xs1:w-[80vw] xs3:w-[30rem] flex flex-col justify-center items-center gap-[0.5rem] ">
              <h1 className="text-[2rem] font-bold">Tig Welding</h1>
              <p className="xs0:text-[1.1rem] xs2:text-[1.3rem] text-[#000000bb] font-[500] text-center ">
                TIG Welding (Tungsten Inert Gas Welding), or Gas Tungsten Arc
                Welding (GTAW), uses a non-consumable tungsten electrode and an
                inert gas, like argon, to shield the weld. Known for precision
                and clean welds, it is ideal for thin materials such as
                stainless steel and aluminum, commonly used in aerospace,
                automotive, and high-quality fabrication industries.
              </p>
            </div>
          </div>
          <div className="vendor w-full flex xs0:flex-col xs3:flex-row xs0:items-center xs0:py-[2rem] xs3:py-[0rem] xs0:border-[0.15rem] xs3:border-none xs0:rounded-[1rem] xs3:rounded-none md:justify-around xs0:gap-[1rem] xs2:gap-[3rem]  ">
            <img
              src="./steel.jpg"
              alt=""
              className="xs3:w-[50vw] xs0:w-[80vw] xs3:h-[50vh] xs2:h-[35vh] xs0:h-[25vh] rounded-[1rem] xs3:order-2 "
            />
            <div className="px-[1rem] xs0:w-[80vw] xs3:w-[30rem] flex flex-col justify-center items-center gap-[0.5rem] xs3:order-1 ">
              <h1 className="text-[2rem] font-bold">Steel 1095</h1>
              <p className="xs0:text-[1.1rem] xs2:text-[1.3rem] text-[#000000bb] font-[500] text-center ">
                Steel 1095 is a high-carbon steel with approximately 0.95%
                carbon content. Known for its hardness and strength, it is
                commonly used in making knives, blades, and cutting tools. It
                offers excellent wear resistance but is more brittle compared to
                lower carbon steels. Proper heat treatment and care are required
                to prevent rust.
              </p>
            </div>
          </div>
          <div className="user  w-full flex xs0:flex-col xs3:flex-row xs0:items-center xs0:py-[2rem] xs0:px-[1rem] xs3:py-[0rem]  xs0:border-[0.15rem] xs3:border-none xs0:rounded-[1rem] xs3:rounded-none  md:justify-around xs0:gap-[1rem] xs2:gap-[3rem]  ">
            <img
              src="./forging.jpg"
              alt=""
              className="xs3:w-[50vw] xs1:w-[80vw] xs3:h-[50vh] xs2:h-[35vh] xs1:h-[25vh] rounded-[1rem] "
            />
            <div className="px-[1rem] xs1:w-[80vw] xs3:w-[30rem] flex flex-col justify-center items-center gap-[0.5rem] ">
              <h1 className="text-[2rem] font-bold">Forging Process</h1>
              <p className="xs0:text-[1.1rem] xs2:text-[1.3rem] text-[#000000bb] font-[500] text-center ">
                Forging is a manufacturing process where metal is shaped by
                compressive forces using tools like hammers, presses, or dies.
                It can be performed hot or cold, improving the materials
                strength and grain structure. Commonly used for automotive
                parts, tools, and machinery components, forging ensures high
                durability and resistance to wear, making it ideal for critical
                applications.
              </p>
            </div>
          </div>
          <div className="vendor w-full flex xs0:flex-col xs3:flex-row xs0:items-center xs0:py-[2rem] xs3:py-[0rem] xs0:border-[0.15rem] xs3:border-none xs0:rounded-[1rem] xs3:rounded-none md:justify-around xs0:gap-[1rem] xs2:gap-[3rem]  ">
            <img
              src="./copper.jpg"
              alt=""
              className="xs3:w-[50vw] xs0:w-[80vw] xs3:h-[50vh] xs2:h-[35vh] xs0:h-[25vh] rounded-[1rem] xs3:order-2 "
            />
            <div className="px-[1rem] xs0:w-[80vw] xs3:w-[30rem] flex flex-col justify-center items-center gap-[0.5rem] xs3:order-1 ">
              <h1 className="text-[2rem] font-bold">Copper C10100</h1>
              <p className="xs0:text-[1.1rem] text-[#000000bb] font-[500] xs2:text-[1.3rem]  text-center ">
                Copper C10100, also known as oxygen-free copper (OFC), is highly
                regarded for its exceptional electrical conductivity and
                resistance to corrosion. It contains very low oxygen content,
                making it ideal for high-performance applications like
                electronics, telecommunications, and aerospace. C10100 is
                commonly used in wires, connectors, and components requiring
                high conductivity and durability.
              </p>
            </div>
          </div>
        </div>
        <div
          id="about"
          className="about  md:px-[10rem] md:py-[3rem] md:my-[2rem] py-[1rem]  flex flex-col gap-[2rem] justify-center items-center "
        >
          <h1 className="text-[2.5rem] font-bold ">About Us </h1>
          <div className="aboutContainer text-[#000000bb] font-[500] xs0:px-[0.8rem] text-center xs0:text-[1.1rem] xs2:text-[1.4rem] md:border-[2px] rounded-[1rem] xs3:p-[4rem] sm:p-[0rem] flex flex-wrap justify-center gap-[1.2rem]  ">
            Matex (Expert in Materials) specializes in materials, providing a platform for users to
            find the most relevant materials based on the properties they
            specify. Users can input material properties, and our system
            suggests the best materials that match those criteria. For vendors,
            Matex offers a dedicated section where they can add materials and
            related processes, making it easier for them to manage and display
            their offerings. The platform connects material suppliers with those
            seeking the best material solutions for their needs.
          </div>
        </div>
      </div>
      <div className="footer w-full relative bottom-0 ">
        <footer className="bg-gray-800 text-[1.2rem] text-white py-6">
          <div className="max-w-screen-xl mx-auto px-2 md:px-1">
            <p className="text-center text-gray-400">
              <a
                href="mailto:gkn7049@gmail.com?subject=Your%20quiry%20subject%20here&body=Write%20Your%20Message%20Here"
                className="text-[#4d4dff] font-semibold "
              >
                Contact Us{" "}
              </a>
              &copy; 2024 MATEX All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
