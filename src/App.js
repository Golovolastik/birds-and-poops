import './App.css';
import Header from "./components/Header/Header";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import {useTelegram} from "./hooks/useTelegram";
import MainComponent from "./components/MainComponent/MainComponent";


function App() {
    const {tg, user} = useTelegram();
    console.log(tg);
    return (
        <div className="App">
            <Header/>
            <MainComponent/>
            <FooterMenu/>
        </div>
    );
}

export default App;
