import Button from "../Button/Button";
import Nav from "../Nav/Nav";
import './header.css';
import reactIconUrl from "../../assets/react-icon.svg";
import { useNavigate } from "react-router-dom";


function Header() {
   const navigate = useNavigate();
   
    return ( 
        <header className="header max-w-7xl py-0 px-4 gap-8">
            <Button
            className={`logo text-[#171717] text-xl leading-8` }
            onClick={() => navigate("/")}
        >
          <img src={reactIconUrl} /> React Evaluation
           </Button>

           <Nav/>
        </header>
     )
}

export default Header;