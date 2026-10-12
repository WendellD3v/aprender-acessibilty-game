import { useEffect, useState } from "react"

// Components
import Menu from "../../components/UI/Jogar/menu/Menu.jsx";
import Lobby from "../../components/UI/Jogar/lobby/Lobby.jsx";
import MemoryGame from "../../components/Game/Memory/MemoryGame.jsx";
import Browser from "../../components/Util/Jogar/Browser/Browser.jsx";
import ImagesGame from "../../components/Game/Images/ImagesGame.jsx";

// Style
import './Jogar.css';

export default function Jogar() {

    const [page, setPage] = useState('ImagesGame');
    const [navAlert, setNavAlert] = useState(false)

    useEffect(() => {
        const ua = navigator.userAgent;

        const isOpera = /OPR|Opera/i.test(ua);
        const isEdge = /Edg|Edge/i.test(ua);
        const isChrome = /Chrome|CriOS/i.test(ua);

        if (!isChrome || isOpera || isEdge) {
            setNavAlert(true);
            return;
        }

        setNavAlert(false);
    }, []);

    return (
        <section id="Jogar">      

            {navAlert && (
                <Browser closeBrowser={() => setNavAlert(false)}/>
            )}     

            {page == 'menu' ? (
                <Menu changeScreen={(screen) => {setPage(screen)}} />
            ) : page == 'lobby' ? (
                <Lobby changeScreen={(screen) => {setPage(screen)}} />
            ) : page == 'MemoryGame' ?(
                <MemoryGame changeScreen={(screen) => {setPage(screen)}}/>
            ) : page == 'ImagesGame' ? (
                <ImagesGame changeScreen={(screen) => {setPage(screen)}}/>
            ) : null}

            

        </section>
    )
}