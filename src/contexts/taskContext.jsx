import { createContext, useEffect, useState } from "react";
import { getTasks } from "../services/tasks";
import { useAuth } from "./authContext";

export const TaskContext = createContext({});

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {
  

  const { isAuthenticated, token } = useAuth();

  const [status, setStatus] = useState("idle");
  const [formStatus, setFormStatus] = useState("idle");
  const [tasks, setTasks] = useState([]);
  
  
  const [pending, setPending] = useState(false);
  const [important, setImportant] = useState(false);
  const [order, setOrder] = useState("alphabetical-asc");

  useEffect(() => {
    if(isAuthenticated) {
      
     getTasks().then((data) => setTasks(data))
      .catch((error) => console.log(error));
    }

      
       
  },[isAuthenticated, token]);

  return <TaskContext.Provider value={
      {
        status, 
        setStatus, 
        tasks, 
        setTasks,
        formStatus,
        setFormStatus,
        pending,
        setPending,
        important,
        setImportant,
        order,
        setOrder

     }}>{children}</TaskContext.Provider>;
}

export default TaskContext;