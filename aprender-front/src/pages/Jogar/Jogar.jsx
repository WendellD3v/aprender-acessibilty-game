import { useState } from "react"

// Components
import Menu from "../../components/UI/Jogar/menu/Menu.jsx";
import Lobby from "../../components/UI/Jogar/lobby/Lobby.jsx";
import MemoryGame from "../../components/Game/Memory/MemoryGame.jsx";

// Style
import './Jogar.css';

export default function Jogar() {

    const [page, setPage] = useState('MemoryGame');

    return (
        <section id="Jogar">           

            {page == 'menu' ? (
                <Menu changeScreen={(screen) => {setPage(screen)}} />
            ) : page == 'lobby' ? (
                <Lobby changeScreen={(screen) => {setPage(screen)}} />
            ) : page == 'MemoryGame' ?(
                <MemoryGame changeScreen={(screen) => {setPage(screen)}}/>
            ) : null}

        </section>
    )
}