import './App.css';
import Header from "./components/Header/Header";
import TimerBar from "./components/TimerBar/TimerBar";
import Points from "./components/Points/Points";
import ClaimButton from "./components/ClaimButton/ClaimButton";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import {useTelegram} from "./hooks/useTelegram";

function App() {
    const {tg, onClose} = useTelegram();
  return (
    <div className="App">
        <Header/>
        <Points/>
        <TimerBar initialTime={60}/>
        <ClaimButton onClick={onClose}></ClaimButton>
        <FooterMenu/>
    </div>
  );
}

export default App;