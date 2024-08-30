import { useState } from "react";

function useLocalStorage(key, initialValue) {
  
  //Retorna el valor del localStorage y lo actualiza si cambia el valor de la variable key en el localStorage o si es la primera vez que se renderiza el componente. Además de inicializar el estado de la variable key con el valor inicial del localStorage y el estado de la variable value con el valor inicial del useState.
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteLocalStorage = () => {
  //   window.localStorage.removeItem(key);
  // };
  
  return [value, setLocalStorage, setValue];

}

export default useLocalStorage;

