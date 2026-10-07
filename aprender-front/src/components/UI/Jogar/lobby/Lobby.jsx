// CSS
import './Lobby.css'

// Components
import Navbar from '../../../Util/Jogar/Nav/Navbar'

export default function Lobby({changeScreen}){
    return (
        <section id='lobby-jogar'>

            <Navbar changeScreen = {(screen) => {
                changeScreen(screen)
            }}/>

        </section>
    )
}