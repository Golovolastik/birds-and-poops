import './App.css';
import Header from "./components/Header/Header";
import TimerBar from "./components/TimerBar/TimerBar";
import Points from "./components/Points/Points";
import ClaimButton from "./components/ClaimButton/ClaimButton";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import {useTelegram} from "./hooks/useTelegram";


function App() {
    const {tg, user} = useTelegram();
    console.log(tg);
    const handleClick = async () => {
        const response = await fetch('https://potty-pals.fun/api/claim', {
            headers: {
                user: user?.id,
            }
        });
        const text = await response.text();
        console.log(text);
    };
    return (
        <div className="App">
            <Header/>
            <Points/>
            <TimerBar initialTime={60}/>
            <span className={'userId'}>
                Hi! {user?.username}
            </span>
            <ClaimButton onClick={handleClick}/>
            <FooterMenu/>
        </div>
    );
}

export default App;
