import { useState } from "react"

// Components
import Menu from "../../components/UI/Jogar/menu/Menu.jsx";

// Assets
import CyberScripts from '../../assets/images/logo.png';

// Style
import './Jogar.css';

export default function Jogar() {

    const [page, setPage] = useState('menu');

    return (
        <section id="Jogar">           
        
            <Menu changeScreen={(screen) => {setPage(screen)}} />

        </section>
    )
}