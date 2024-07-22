import './App.css';
import Header from "./components/Header/Header";
import Points from "./components/Points/Points";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import {useTelegram} from "./hooks/useTelegram";
import MainComponent from "./components/MainComponent/MainComponent";


function App() {
    const {tg, user} = useTelegram();
    console.log(tg);
    return (
        <div className="App">
            <Header/>
            <Points/>
            <span className={'userId'}>
                Hi! {user?.username}
            </span>
            <MainComponent/>
            <FooterMenu/>
        </div>
    );
}

export default App;
