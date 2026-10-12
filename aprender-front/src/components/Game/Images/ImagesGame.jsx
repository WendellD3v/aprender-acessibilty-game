// Config
import imagesConfig from '../../../config/Images.json';

// CSS
import './ImagesGame.css'

// Components
import Navbar from '../../Util/Jogar/Nav/Navbar';

// Images
import mutedIcon from '../../../assets/images/muted.png'
import talkingIcon from '../../../assets/images/microphone.png'
import { useState } from 'react';

export default function ImagesGame({changeScreen}){

    const [microphoneStatus, setMicrophoneStatus] = useState(false)

    return (
        <section id="ImagesGame">
            <Navbar changeScreen = {(screen) => {
                changeScreen(screen)
            }}/>
            <div className="content">
                <div className="question">
                    <h1>{imagesConfig.questions[0]['Question']}</h1>
                    <img src={imagesConfig.questions[0]['Icon']} alt="" />
                </div>
                <div className="options">
                    {imagesConfig.questions[0].options.map((value, index) => {
                        return(
                            <button key={index}>{value}</button>
                        )
                    })}
                </div>
            </div>

            <div className="microphone">
                {microphoneStatus ? (
                    <>
                        <h1 className='talking'>Escutando sua resposta...</h1>
                        <img onClick={() => setMicrophoneStatus(false)} src={talkingIcon} alt="Falando" />
                    </>
                ): (
                    <>
                        <h1>Pressione para falar sua resposta</h1>
                        <img onClick={() => setMicrophoneStatus(true)} src={mutedIcon} alt="Mutado" />
                    </>
                )}
            </div>
        </section>
    )
}