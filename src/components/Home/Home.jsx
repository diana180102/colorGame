import reactIconUrl from "../../assets/react-icon-lg.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  
  const navigate = useNavigate();
    
    const navigation = [
      {
        name: "Color Game",
        to: "/color-game",
      },
      {
        name: "Doable",
        to: "/doable",
      },
   ];
  
  
  return (
    <div className="flex flex-col items-center gap-4 py-24 px-0">
      <img src={reactIconUrl} />
      <h1 className="text-center font-inter text-4xl font-semibold leading-none">React Evaluation</h1>
      <p className="color-[#525252] font-inter text-2xl text-center font-bold leading-8">Diana Mayorga</p>
      <div className="flex justify-center gap-4">
       
         {
             navigation.map((item) => (
              
               <Button
                 key={item.to}
                 className={`w-32, border border-[#D4D4D4] py-2 p-4 hover:bg-[#e6e6e6]`}
                 onClick={() => navigate(item.to)}
               >
                 {item.name}
               </Button>
             
             ))
           }
      </div>
    </div>
  );
}

export default Home;
