import {  useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import './nav.css';


function Nav() {

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
        <nav className="flex items-center gap-4">
           {
             navigation.map((item) => (
              
               <Button
                 key={item.to}
                 className={`nav-item py-2 px-3 leading-5 text-base rounded-md text-[#171717]`}
                 onClick={() => navigate(item.to)}
               >
                 {item.name}
               </Button>
             
             ))
           }
           
         
        </nav> 
     );
}

export default Nav;