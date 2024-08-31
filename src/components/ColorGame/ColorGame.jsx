import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./ColorGame.css";
import { getRandomColors, getStatus, rgbString, statusMessage } from "./utils";
import { useEffect } from "react";

function ColorGame() {
  const [numOfColors, setNumOfColors] = useState(6); // Número de colores
  const [colors, setColors] = useState(getRandomColors(numOfColors)); // Arreglo de colores
  const [attempts, setAttempts] = useState([]); // Arreglo de intentos
  const [status, setStatus] = useState("playing"); // Estado del juego
  const [target, setTarget] = useState(
    Math.floor(Math.random() * colors.length)
  ); // Índice del color objetivo
  const selectColor = colors[target];

  useEffect(() => {
    // Actualizar colors y target cuando numOfColors cambie
    const newColors = getRandomColors(numOfColors);
    setColors(newColors);
    setTarget(Math.floor(Math.random() * newColors.length));
  }, [numOfColors]);

  function handleReset() {
    setAttempts([]);
    const newColors = getRandomColors(numOfColors);
    setColors(newColors);
    setTarget(Math.floor(Math.random() * newColors.length));
  }

  function handleChangeNumber(event) {
    const newNumOfColors = parseInt(event.target.value);
    setNumOfColors(newNumOfColors);
  }

  useEffect(() => {
    // Actualiza el estado `status` cuando cambian los intentos
    const newStatus = getStatus(attempts, colors[target], numOfColors);
    setStatus(newStatus);
  }, [attempts, colors, numOfColors, target]);

  function handleGame(color) {
    setAttempts((prevAttempts) => {
      const newAttempts = [...prevAttempts, color];
      return newAttempts;
    });
  }

  return (
    <div className="py-12 px-0">
      <h1 className="text-center font-inter text-4xl font-semibold leading-none mb-4">
        Color Game
      </h1>
      <p className="text-center font-lg leading-8 mb-4 ">
        Guess which color correspond to the following RGB code
      </p>

      <div className="flex justify-center gap-2 mb-8">
        <div className="border-red-600  border-4 rgb">
          <p className="color-number">{colors[target][0]}</p>
          <p className="color-name">Red</p>
        </div>
        <div className="border-green-600 border-4  rgb">
          <p className="color-number">{colors[target][1]}</p>
          <p className="color-name">Green</p>
        </div>
        <div className="border-blue-600 border-4  rgb">
          <p className="color-number">{colors[target][2]}</p>
          <p className="color-name">Blue</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8 mb-8">
        <div className="text-center flex items-center gap-2 text-[#171717]">
          <label
            htmlFor="colors"
            className="flex-shrink-0 text-[#525252] font-base font-normal leading-7"
          >
            # Colors
          </label>
          <Input
            className="  focus:outline-offset-4 focus:outline-gray-300"
            id="colors"
            type="number"
            value={numOfColors}
            onChange={handleChangeNumber}
            step={3}
            min={3}
            max={9}
          />
        </div>
        <p className={"font-xl font-semibold leading-8 w-40 text-center"}>
          {statusMessage[status]}
        </p>
        <Button
          className={"bg-[#6D28D9] py-2 px-4 text-white"}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="flex justify-center flex-wrap max-w-md gap-2 m-auto">
        {colors.map((color, index) => {
          const backgroundColor = rgbString(color);
          const opacity = attempts.includes(color) ? "0" : "100";
          const bgColor =
            status === "win"
              ? `rgb(${selectColor.join(",")})`
              : backgroundColor;
          const op = status === "win" ? "100" : opacity;

          const isActive = status === "win" || status === "lose" ? true : false;

          return (
            <Button
              
              key={index}
              style={{ backgroundColor: bgColor, opacity: op }}
              disabled ={isActive}
              onClick={() => {
                handleGame(color);
              }}
              className="square border-none cursor-pointer w-36 h-36 rounded-md"
            ></Button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorGame;
