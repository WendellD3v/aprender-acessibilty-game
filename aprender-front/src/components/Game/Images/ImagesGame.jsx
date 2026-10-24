// Library
import { use, useEffect, useState } from 'react';

// Config
import imagesConfig from '../../../config/Images.json';

// CSS
import './ImagesGame.css'

// Components
import Navbar from '../../Util/Jogar/Nav/Navbar';

// Images
import mutedIcon from '../../../assets/images/muted.png'
import talkingIcon from '../../../assets/images/microphone.png'
import Progress from '../../../assets/images/Jogar/games/progress.png';
import Avatar from '../../../assets/images/Jogar/menu/avatar.png'


export default function ImagesGame({playerData, changeScreen}){

    const [microphoneStatus, setMicrophoneStatus] = useState(false)
    const [perguntasPartida, setPerguntasPartida] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [atualQuestion, setAtualQuestion] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    const [inTutorial, setTutorial] = useState(true)
    const [hasWon, setHasWon] = useState(false)

    
    useEffect(() => {
        const perguntas = [...imagesConfig.questions];

        // Embaralha as perguntas
        for (let i = perguntas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [perguntas[i], perguntas[j]] = [
                perguntas[j],
                perguntas[i]
            ];
        }

        // Seleciona até 10 perguntas
        setPerguntasPartida(perguntas.slice(0, 10));
    }, []);


    // Voice
    function verificarResposta(texto) {
        const perguntaAtual = perguntasPartida[atualQuestion];

        if (!perguntaAtual || isLocked || !texto.trim()) return;

        const normalizar = (valor) =>
            valor
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/g, "")
                .trim();

        const respostaFalada = normalizar(texto);

        // Verifica se a fala corresponde a alguma opção
        const opcaoSelecionada = perguntaAtual.options.find((opcao) => {
            return respostaFalada === normalizar(opcao);
        });

        // Se não corresponde a nenhuma opção, não avança
        if (!opcaoSelecionada) {
            console.log("Resposta não encontrada nas opções:", texto);
            return;
        }

        // Verifica se a opção selecionada é correta
        const acertou = perguntaAtual.correctAnswer.some(
            (resposta) =>
                normalizar(resposta) === normalizar(opcaoSelecionada)
        );

        // Marca a opção falada, seja ela correta ou incorreta
        setSelectedAnswer(opcaoSelecionada);
        setIsLocked(true);

        // Contabiliza somente se acertar
        if (acertou) {
            setCorrectCount((count) => count + 1);
        }

        // Avança após 1 segundo
        setTimeout(() => {
            if (atualQuestion < perguntasPartida.length - 1) {
                setAtualQuestion((atual) => atual + 1);
                setSelectedAnswer(null);
                setIsLocked(false);
            } else {
                setHasWon(true);
            }
        }, 1000);
    }


    function iniciarReconhecimento() {
        const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz.");
        console.log("Seu navegador não suporta reconhecimento de voz.")
        return;
        }
        console.log('passou')
        const reconhecimento = new SpeechRecognition();

        reconhecimento.lang = "pt-BR";
        reconhecimento.continuous = false;
        reconhecimento.interimResults = true;

        reconhecimento.onresult = (event) => {
            let resultado = "";

            for (let i = 0; i < event.results.length; i++) {
                resultado += event.results[i][0].transcript + " ";
            }

            // Verifica quando a fala estiver completa
            const ultimoResultado = event.results[event.results.length - 1];

            if (ultimoResultado.isFinal) {
                verificarResposta(resultado);
            }
        };

        reconhecimento.onstart = () => setMicrophoneStatus(true);
        reconhecimento.onend = () => {
            setMicrophoneStatus(false)
        };

        reconhecimento.onerror = (event) => {
        console.error("Erro no reconhecimento:", event.error);
        setMicrophoneStatus(false);
        };

        reconhecimento.start();

        window.reconhecimentoVoz = reconhecimento;
    }

    function pararReconhecimento() {
        window.reconhecimentoVoz?.stop();
        setMicrophoneStatus(false);
    }


    function restartGame(){
        const perguntas = [...imagesConfig.questions];

        // Embaralha as perguntas
        for (let i = perguntas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [perguntas[i], perguntas[j]] = [
                perguntas[j],
                perguntas[i]
            ];
        }

        // Seleciona até 10 perguntas
        setPerguntasPartida(perguntas.slice(0, 10));
        setSelectedAnswer(null)
        setAtualQuestion(0)
        setIsLocked(false)
        setCorrectCount(0)
        setHasWon(false)
        setTutorial(true)
    }


    return (
        <section id="ImagesGame">
            <div className="background">
                {inTutorial ? (
                    <>
                        <Navbar playerData={playerData} changeScreen = {(screen) => {
                            changeScreen(screen)
                        }}/>

                        <div className="images-tutorial animate__animated animate__bounceInUp" onClick={() => setTutorial(false)}>
                            <div className="avatar">
                                <img src={Avatar} alt="Avatar"/>
                            </div>
                            <div className="content">
                                <div className="say">
                                    <h1>Vamos testar seu conhecimento?</h1>
                                    <p>Responda o nome do que aparecer em sua tela</p>
                                </div>

                                <div className="actions">
                                    <button className="start-game">
                                        <h1>Jogar</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : hasWon ? (
                    <>
                        <div className="win-popup animate__animated animate__bounceInUp">
                            <div className="win">
                                <img src={Progress} alt="Progress Icon" />
                                <h1>Parabéns</h1>
                                <p>Você completou a atividade com sucesso</p>
                            </div>

                            <div className="premium-container">
                                <div className="premium">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.6046 10.3447L19.1661 9.26368L15.8409 2.52247C15.7501 2.3379 15.6007 2.18849 15.4161 2.09767C14.9532 1.86915 14.3907 2.05958 14.1593 2.52247L10.8341 9.26368L3.39561 10.3447C3.19053 10.374 3.00303 10.4707 2.85948 10.6172C2.68593 10.7956 2.59029 11.0356 2.59359 11.2844C2.59688 11.5333 2.69884 11.7706 2.87705 11.9443L8.25889 17.1914L6.98741 24.6006C6.95759 24.773 6.97666 24.9502 7.04246 25.1123C7.10826 25.2743 7.21815 25.4147 7.35968 25.5175C7.5012 25.6203 7.6687 25.6814 7.84317 25.6938C8.01764 25.7063 8.1921 25.6696 8.34678 25.5879L15.0001 22.0899L21.6534 25.5879C21.8351 25.6846 22.046 25.7168 22.2482 25.6817C22.7579 25.5938 23.1007 25.1104 23.0128 24.6006L21.7413 17.1914L27.1232 11.9443C27.2696 11.8008 27.3663 11.6133 27.3956 11.4082C27.4747 10.8955 27.1173 10.4209 26.6046 10.3447Z" fill="#F7FF0B"/>
                                    </svg>

                                    <h1>{(imagesConfig['points-of-answer'] * correctCount)} pontos</h1>

                                </div>

                                <div className="premium">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_80_102)">
                                        <path d="M14.9998 1.6665C12.3628 1.6665 9.7849 2.44849 7.59224 3.91358C5.39958 5.37866 3.69062 7.46104 2.68145 9.89739C1.67228 12.3337 1.40824 15.0146 1.92271 17.601C2.43718 20.1875 3.70705 22.5632 5.57175 24.4279C7.43645 26.2926 9.81223 27.5625 12.3986 28.077C14.9851 28.5914 17.6659 28.3274 20.1023 27.3182C22.5386 26.3091 24.621 24.6001 26.0861 22.4074C27.5512 20.2148 28.3332 17.6369 28.3332 14.9998C28.3332 11.4636 26.9284 8.07223 24.4279 5.57175C21.9274 3.07126 18.5361 1.6665 14.9998 1.6665ZM23.7082 10.5248L12.7582 21.4665L6.29151 14.9998C6.0705 14.7788 5.94633 14.4791 5.94633 14.1665C5.94633 13.8539 6.0705 13.5542 6.29151 13.3332C6.51252 13.1122 6.81228 12.988 7.12484 12.988C7.4374 12.988 7.73716 13.1122 7.95818 13.3332L12.7748 18.1498L22.0582 8.87484C22.1676 8.7654 22.2975 8.67859 22.4405 8.61937C22.5835 8.56014 22.7367 8.52966 22.8915 8.52966C23.0463 8.52966 23.1995 8.56014 23.3425 8.61937C23.4855 8.67859 23.6154 8.7654 23.7248 8.87484C23.8343 8.98427 23.9211 9.11419 23.9803 9.25717C24.0395 9.40016 24.07 9.55341 24.07 9.70817C24.07 9.86293 24.0395 10.0162 23.9803 10.1592C23.9211 10.3022 23.8343 10.4321 23.7248 10.5415L23.7082 10.5248Z" fill="#07FD7A"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_80_102">
                                        <rect width="30" height="30" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>


                                    <h1>{correctCount} Acertos</h1>

                                </div>
                            </div>
                            
                            <div className="actions">
                                <button className="menu" onClick={() => changeScreen('lobby')}>
                                    <h1>Continuar</h1>
                                </button>

                                <button className="jogar-novamente" onClick={() => restartGame()}>
                                    <h1>Jogar novamente</h1>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {perguntasPartida.length > 0 && (
                            <>
                                <Navbar changeScreen = {(screen) => {
                                    changeScreen(screen)
                                }}/>
                                <div className="content">
                                    <div className="question animate__animated animate__flipInX">
                                        <h1>{perguntasPartida[atualQuestion]['Question']}</h1>
                                        <img src={perguntasPartida[atualQuestion]['Icon']} alt="" />
                                    </div>
                                    <div className="options animate__animated animate__fadeIn">
                                        {perguntasPartida[atualQuestion].options.map((value, index) => {
                                            const isCorrect = perguntasPartida[atualQuestion].correctAnswer.includes(value);
                                            return(
                                                <button 
                                                    key={index}
                                                    className={
                                                        selectedAnswer === value
                                                            ? (isCorrect ? 'correct' : 'incorrect')
                                                        : ''
                                                    }
                                                    onClick={() => {
                                                        if (!isLocked) {
                                                            setSelectedAnswer(value);
                                                            setIsLocked(true);

                                                            if (isCorrect) {
                                                                setCorrectCount((count) => count + 1);
                                                            }

                                                            setTimeout(() => {
                                                                if (atualQuestion < (perguntasPartida.length - 1)){
                                                                    setAtualQuestion((atual) => atual + 1);
                                                                    setIsLocked(false)
                                                                    setSelectedAnswer(null);
                                                                    console.log('Atualizado a Page')
                                                                } else{
                                                                    setHasWon(true)
                                                                }
                                                            }, 1000)
                                                        }
                                                    }}
                                                >
                                                    {value}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="microphone">
                                    {microphoneStatus ? (
                                        <>
                                            <h1 className='talking'>Escutando sua resposta...</h1>
                                            <img onClick={() => pararReconhecimento()} src={talkingIcon} alt="Falando" />
                                        </>
                                    ): (
                                        <>
                                            <h1>Pressione para falar sua resposta</h1>
                                            <img onClick={() => iniciarReconhecimento()} src={mutedIcon} alt="Mutado" />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}