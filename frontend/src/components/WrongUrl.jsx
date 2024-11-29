import { useNavigate } from "react-router"

const WrongUrl = () => {
  const navigate = useNavigate();
  const GotoHome = () => {
    navigate("/");
  }
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center " >
      <h1 className="text-[5rem] font-bold text-[#395634] " >You are on wrong URL</h1>
      <h2 onClick={GotoHome} className="text-[3rem] font-bold text-[#395634] hover:text-[black] cursor-pointer " >Click here for valid url</h2>
    </div>
  )
}

export default WrongUrl
