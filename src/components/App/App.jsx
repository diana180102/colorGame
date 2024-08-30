
// import Home from "../Home";
// import ColorGame from "../ColorGame";
// import Doable from "../Doable";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";







const Home = lazy(() => import('../Home'));
const ColorGame = lazy(() => import('../ColorGame'));
const DoableComponent = lazy(() => import('../Doable'));



function App() {
 

  return (
    <div className="min-h-screen grid grid-rows-[64px_1fr] font-inter">
      <Header />
      <main className="max-w-7xl w-full py-0 px-4 m-auto mt-0">
       
       
      <Suspense fallback={<Loading/>}>
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/color-game" element={<ColorGame />} />
            <Route path="/doable" element={<DoableComponent />} />
         
        </Routes>
      </Suspense>
      
      </main>
    </div>
  );
}

export default App;
