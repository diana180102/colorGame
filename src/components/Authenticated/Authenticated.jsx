
import  "./Authenticated.css";
import { BadgeAlert, Trash2} from "lucide-react";
import { filterTasks, formatDate, sortTasks } from "./utils";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TaskContext from "../../contexts/taskContext";
import { useContext} from "react";
import AddTask from "../Task/AddTask";
import Aside from "../Task/Aside";
import { deleteTask, editTask } from "../../services/tasks";


function Authenticated() {
  
  const {status, tasks, setTasks, pending, important, order} = useContext(TaskContext);
  
   
 

  async function handleEdit(id, updates) {
  
     // editar task
    const updatedTask = await editTask(id, updates);
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === id ? updatedTask : task;
      });
    })
  }

  async function handleDelete(id) {
    // eliminar task
    await deleteTask(id);
  
   
   setTasks((prevTasks) => {
     return prevTasks.filter((task) => task.id !== id);
   });
  
  }

  const isLoading = status === "loading";
 

  const filteredTasks = filterTasks(tasks, { onlyPending: pending, onlyImportant: important });
  const sortedTasks = sortTasks(filteredTasks, order);

  return (
    <>
      <AddTask/>
      <div className="grid grid-cols-[240px_1fr] max-w-3xl m-auto">
        <Aside/>
        <div className="flex flex-col py-2 px-4 gap-2">
          {isLoading && <p>Loading...</p>}
          {tasks.length > 0 &&
            sortedTasks.map((task) => (
              <div key={task.id} className="flex  items-center mb-4  w-full max-w-md">
                <div className="task-data flex flex-row gap-2 flex-grow ">
                  <Input
                    className="w-4 h-4"
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    onChange={() => {
                      handleEdit(task.id, { completed: !task.completed });
                    }}
                  />
                  <div className="flex-grow flex flex-col">
                    <label htmlFor={task.id} className="text-lg leading-8 block">
                      {task.title}
                    </label>
                    <small className="text-[#525252] text-sm leading-6">
                      { task["due_date"] && formatDate(task["due_date"])}
                    </small>
                  </div>
                </div>

                <div className="flex gap-2">
                  
                   <Button 
                    className={`${"border border-gray-300 p-2 w-10 h-10 hover:bg-gray-300"} ${task.important && "bg-violet-700"}`}
                    onClick={() => {
                      handleEdit(task.id, { important: !task.important });
                    }}
                  >
                    <BadgeAlert className={task.important ? "text-white" : "text-black"	} />
                  </Button>
                  <Button
                    className="border border-gray-300 p-2 w-10 h-10 hover:bg-gray-300"
                    onClick={() => {
                      handleDelete(task.id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Authenticated;
