import { useContext, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import TaskContext from "../../contexts/taskContext";
import { createTask } from "../../services/tasks";



function AddTask() {
    
     const { formStatus, setTasks} = useContext(TaskContext);
     const isCreating = formStatus === "loading";
     const [formData, setFormData] = useState({
         title: "",
         due_date: "",
     });


  const handleChange = (event) => {
    const { name, value } = event.target;

    // Actualiza el estado del formulario
    setFormData({ ...formData, [name]: value });
    
  };

  
  
 
  
     

  
  async function handleSubmit(event) {
   event.preventDefault();
    
    // crear task
    
    try{
     const newTask = await createTask(formData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setFormData({ title: "", due_date: "" }); 

    }catch(error){
      console.log(error);
    }
   
   }    
    return ( 
        <>
        <form className="flex flex-col max-w-80 gap-2 m-auto mb-8 " onSubmit={handleSubmit}>
        <Input
          id="title"
          type="text"
          name="title"
           value={formData.title}
           onChange={handleChange}
          placeholder="do the dishes"
          required
          aria-label="title"
          disabled={isCreating}
        />
        <Input
          id="due_date"
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          aria-label="due_date"
          disabled={isCreating}
        />
        <Button disabled={isCreating} className="bg-violet-700 py-2 px-4 text-white">
          {isCreating ? "Adding..." : "Add task"}
        </Button>
      </form>
        </>
     );
}

export default AddTask;