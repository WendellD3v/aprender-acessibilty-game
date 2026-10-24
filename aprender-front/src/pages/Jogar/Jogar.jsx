import { useEffect, useState } from "react"

// Components
import Menu from "../../components/UI/Jogar/menu/Menu.jsx";
import Lobby from "../../components/UI/Jogar/lobby/Lobby.jsx";
import MemoryGame from "../../components/Game/Memory/MemoryGame.jsx";
import Browser from "../../components/Util/Jogar/Browser/Browser.jsx";
import ImagesGame from "../../components/Game/Images/ImagesGame.jsx";

// Service
import { getPlayerPoints, getPlayer } from "../../hooks/points.js";

// Style
import './Jogar.css';

export default function Jogar() {

    const [playerdata, setPlayerData] = useState(getPlayerPoints());
    const [page, setPage] = useState('menu');
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

    function updatePlayerData(){
        return setPlayerData(getPlayer())
    }

    return (
        <section id="Jogar">      

            {navAlert && (
                <Browser closeBrowser={() => setNavAlert(false)}/>
            )}     

            {page == 'menu' ? (
                <Menu playerData={playerdata} changeScreen={(screen) => {
                    setPage(screen)
                    updatePlayerData()
                }} />
            ) : page == 'lobby' ? (
                <Lobby playerData={playerdata} changeScreen={(screen) => {
                    setPage(screen)
                    updatePlayerData()
                }} />
            ) : page == 'MemoryGame' ?(
                <MemoryGame playerData={playerdata} changeScreen={(screen) => {
                    setPage(screen)
                    updatePlayerData()
                }}/>
            ) : page == 'ImagesGame' ? (
                <ImagesGame playerData={playerdata} changeScreen={(screen) => {
                    setPage(screen)
                    updatePlayerData()
                }}/>
            ) : null}

        </section>
    )
}