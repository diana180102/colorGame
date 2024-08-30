// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import Nav from "./Nav";
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";



afterEach(() => {
        cleanup();
});



function ColorGame() {
    return <div>ColorGame</div>;
}

function Doable() {
    return <div>Doable</div>;
}

describe("nav ", () =>{
    test("renderizado", () =>{
       render(
        
       <MemoryRouter initialEntries={["/"]}>
         
          <Routes>
            <Route path="/" element={<div>Home</div>}/>
            <Route path="/color-game" element={<ColorGame />} />
            <Route path="/doable" element={<Doable />} />
          </Routes>
          <Nav/>
       </MemoryRouter>

       
       );
        
        
        //Se verifica que estamos en inicio
       expect(screen.getByText(/home/i)).toBeInTheDocument();
       
       //Se verifica que los botones estan renderizados
       const gameButton = screen.getByText(/color game/i);
       const doableButton = screen.getByText(/doable/i);
       
       expect(gameButton).toBeInTheDocument();
       expect(doableButton).toBeInTheDocument();
       
       //Se verifica que los botones redireccionan a la ruta correspondiente
       fireEvent.click(gameButton);
       expect(screen.getByText(/color game/i)).toBeInTheDocument();

       
       fireEvent.click(gameButton);
       expect(screen.getByText(/color game/i)).toBeInTheDocument();
    });
});