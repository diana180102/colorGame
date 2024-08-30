import { useContext } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import TaskContext from "../../contexts/taskContext";
import { useAuth } from "../../contexts/authContext";


function Aside() {
  
    const {logout} = useAuth();
    const { setPending, pending, setImportant, important, setOrder, order} = useContext(TaskContext);
    
    function handlePending(e) {
        setPending(e.target.checked);
    }

    function handleImportant(e) {
      setImportant(e.target.checked);
    }

    function handleOrder(e) {
      setOrder(e.target.value);
    }

  
    
    
    return ( 
      <aside className="flex flex-col py-4 px-2 gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="sort_by">Sort by</label>
            <select id="sort_by" className="border focus:border py-2 px-3 gap-4 rounded-md" value={order} onChange={handleOrder}>
              <option value="due_date-asc">Due Date (old first)</option>
              <option value="due_date-desc">Due Date (new first)</option>
              <option value="alphabetical-asc">Alphabetical (a-z)</option>
              <option value="alphabetical-desc">Alphabetical (z-a)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Filter</label>
            <div className="flex items-center gap-2">
              <Input type="checkbox" id="pending" className="w-4 h-4"  checked={pending} onChange={(e) => handlePending(e)}   />
              <label htmlFor="pending">Only pending</label>
            </div>
            <div className="flex items-center gap-2">
              <Input type="checkbox" id="important" className="w-4 h-4"  checked={important} onChange={(e) => handleImportant(e)}/>
              <label htmlFor="important">Only important</label>
            </div>
          </div>
         
          <Button
          className="bg-gray-200 py-2 px-4"
            onClick={logout}
          >
            Logout
          </Button>
        </aside> );
}

export default Aside;