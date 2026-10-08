// CSS
import './Lobby.css'

// Components
import Navbar from '../../../Util/Jogar/Nav/Navbar'

// Assets
import Avatar from '../../../../assets/images/Jogar/menu/avatar.png'

import MemoryGameIcon from '../../../../assets/images/Jogar/games/memory.png'
import ImagesGameIcon from '../../../../assets/images/Jogar/games/images.png'
import QuizGameIcon from '../../../../assets/images/Jogar/games/quiz.png'
import NumerosGameIcon from '../../../../assets/images/Jogar/games/numeros.png'
import JuntosGameIcon from '../../../../assets/images/Jogar/games/juntos.png'
import Progress from '../../../../assets/images/Jogar/games/progress.png'

export default function Lobby({changeScreen}){
    return (
        <section id='lobby-jogar'>

            <Navbar changeScreen = {(screen) => {
                changeScreen(screen)
            }}/>

            <div className="games-grid">
                <div className="game animate__animated animate__flipInX" onClick={() => {
                    changeScreen('MemoryGame')
                }}>
                    <img src={MemoryGameIcon} alt="" />
                    <h1>Memória e atenção</h1>
                </div>

                <div className="game animate__animated animate__flipInX">
                    <img src={ImagesGameIcon} alt="" />
                    <h1>Assosiação de imagens</h1>
                </div>

                <div className="game animate__animated animate__flipInX">
                    <img src={QuizGameIcon} alt="" />
                    <h1>Quiz Das Cartas</h1>
                </div>

                <div className="game animate__animated animate__flipInX">
                    <img src={NumerosGameIcon} alt="" />
                    <h1>Números</h1>
                </div>

                <div className="game animate__animated animate__flipInX">
                    <img src={JuntosGameIcon} alt="" />
                    <h1>Aprender Juntos</h1>
                </div>

                <div className="game animate__animated animate__flipInX">
                    <img src={Progress} alt="" />
                    <h1>Meu Progresso</h1>
                </div>
            </div>

            <footer id='lobby-jogar-footer' className='animate__animated animate__backInLeft'>
                <div className="avatar">
                    <img src={Avatar} alt="" />
                </div>
                <div className="content">
                    <div className="say">
                        <h1>Olá, vamos aprender hoje?</h1>
                        <h2>Escolha uma atividade para começar</h2>
                    </div>
                </div>
            </footer>

        </section>
    )
}