import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header";
import TimerBar from "./components/TimerBar/TimerBar";
import Points from "./components/Points/Points";
import ClaimButton from "./components/ClaimButton/ClaimButton";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import {useTelegram} from "./hooks/useTelegram";

function App() {
    const {tg, user} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    return (
    <div className="App">
        <Header/>
        <Points/>
        <TimerBar initialTime={60}/>
        <ClaimButton/>
        <FooterMenu/>
    </div>
  );
}

export default App;
