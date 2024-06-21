//import { useCookie } from 'nuxt/app';
import './App.css';
import React, { useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import Header from './components/Header/Header';

function App() {

    const {onToggleButton, tg} = useTelegram();

    useEffect( () => {
        tg.ready();
    }, [])

  return (
    <div className="App">
        <Header />
        <b>work</b>
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
