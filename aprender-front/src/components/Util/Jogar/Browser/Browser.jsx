import Chrome from '../../../../assets/images/chrome.png';

import './Browser.css'

export default function Browser({closeBrowser}){
    return (
        <div id="browser-alert">
            <div className="content animate__animated animate__backInDown">
                <img src={Chrome} alt="Navegador" />
                <h1>Navegador não recomendado</h1>
                <h2>Transcrição de aúdio e algumas outras funções são disponiveis apenas no Google Chrome, mude o navegador para experiência real do jogo</h2>
                <button onClick={closeBrowser}>Fechar</button>
            </div>
        </div>
    )
}