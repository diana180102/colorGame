
import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { TaskProvider } from "../../contexts/taskContext";
import Authenticated from "../Authenticated";
import Unauthenticated from "../Unauthenticated";

function Doable() {
 
  const{ isAuthenticated} = useAuth();

   
 

  
  
  

  return (
   <TaskProvider>
    <div className="p-12">
      <h1 className="font-inter font-bold text-4xl text-center leading-none mb-4">Doable</h1>
      <p className="text-center text-lg leading-8 mb-4">Add and filter your most important tasks</p>
      {isAuthenticated ? <Authenticated /> : <Unauthenticated />}
    </div>
    </TaskProvider>  
  );
}

export default Doable;
