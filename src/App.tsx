import React, {useEffect} from 'react';
import './App.css';
import {penguinSlice} from "./store/reducers/penguinSlice";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUsers} from "./store/reducers/ActionCreators";
import PenguinContainer from "./components/PenguinContainer";
import Navbar from "./components/UI/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import To_Do from "./components/To_Do";

function App() {
    const dispatch = useAppDispatch();
    const {penguins,isLoading,error} = useAppSelector(state => state.penguin);
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL === 'production' ? '/Sahashirokov/' : '/'}>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<PenguinContainer/>}/>
                <Route index element={<PenguinContainer/>}/>
                <Route path="/To_Do/:id" element={<To_Do/>}/>
                <Route path="/To_Do/*" element={<To_Do/>}/>
            </Routes>
        </BrowserRouter>

     </div>
    );
}

export default App;
