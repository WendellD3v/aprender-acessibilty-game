// Components
import { useState, useEffect } from "react";
import Navbar from "../../Util/Jogar/Nav/Navbar";
import MemoryCard from "./MemoryCard";

// CSS
import './MemoryGame.css';

// Assets
import Progress from '../../../assets/images/Jogar/games/progress.png';
import Avatar from '../../../assets/images/Jogar/menu/avatar.png'

export default function MemoryGame({changeScreen}){

    // Cartas
    const defaultCards = [
        {id: 1, name: 'Cachorro', icon: '/games/memory/cachorro.png'},
        {id: 2, name: 'Cachorro', icon: '/games/memory/cachorro.png'},
        {id: 3, name: 'Gato', icon: '/games/memory/gato.png'},
        {id: 4, name: 'Gato', icon: '/games/memory/gato.png'},
        {id: 5, name: 'Galinha', icon: '/games/memory/galinha.png'},
        {id: 6, name: 'Galinha', icon: '/games/memory/galinha.png'},
        {id: 7, name: 'Papagaio', icon: '/games/memory/papagaio.png'},
        {id: 8, name: 'Papagaio', icon: '/games/memory/papagaio.png'},
        
        {id: 9, name: 'Leão', icon: '/games/memory/leao.png'},
        {id: 10, name: 'Leão', icon: '/games/memory/leao.png'},
        {id: 11, name: 'Rato', icon: '/games/memory/rato.png'},
        {id: 12, name: 'Rato', icon: '/games/memory/rato.png'},
        {id: 13, name: 'Coelho', icon: '/games/memory/coelho.png'},
        {id: 14, name: 'Coelho', icon: '/games/memory/coelho.png'},
        {id: 15, name: 'Porco', icon: '/games/memory/porco.png'},
        {id: 16, name: 'Porco', icon: '/games/memory/porco.png'}
    ]

    function shuffleCards(cards) {
        const shuffled = [...cards];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }
    
    const [cards, setCards] = useState(() => shuffleCards(defaultCards));

    // Estado Das Cartas
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isLocked, setIsLocked] = useState(false)

    // Tutorial
    const [inTutorial, setTutorial] = useState(true)

    // Vitória
    const [hasWon, setHasWon] = useState(false);

    useEffect(() => {
        if (flippedCards.length !== 2) return;

        const [firstCard, secondCard] = flippedCards;

        if (firstCard.name === secondCard.name) return;

        const timeout = setTimeout(() => {
            setFlippedCards([]);
            setIsLocked(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [flippedCards]);

    function restartGame(){
        setFlippedCards([])
        setMatchedCards([])
        setIsLocked(false)
        setCards(() => shuffleCards(defaultCards))
        setHasWon(false)
    }

    function handleClick(card){
        // Impedir Click
        if (isLocked) return;

        // Impredir Selecionar Mesma Carta
        const alredyFlipped = flippedCards.some((item) => item.id === card.id);
        if (alredyFlipped) return;


        // Impedir Selecionar Par
        const alredyMatched = matchedCards.some((item) => item.name === card.name);
        if (alredyMatched) return

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2){

            setIsLocked(true);
            
            const [firstCard, secoundCard] = newFlippedCards;

            if (firstCard.name === secoundCard.name){
                setMatchedCards((previous) => {
                    const updatedCards  = [...previous, firstCard];

                    if (updatedCards.length === cards.length / 2){
                        setHasWon(true)
                    }

                    return updatedCards
                });

                setFlippedCards([]);
                setIsLocked(false);
            }

        }

    }

    return (
        <section id="MemoryGame">
            <div className="background">
                {inTutorial ? (
                    <>
                        <Navbar changeScreen = {(screen) => {
                            changeScreen(screen)
                        }}/>

                        <div className="memory-tutorial animate__animated animate__bounceInUp" onClick={() => setTutorial(false)}>
                            <div className="avatar">
                                <img src={Avatar} alt="Avatar"/>
                            </div>
                            <div className="content">
                                <div className="say">
                                    <h1>Vamos testar sua memória?</h1>
                                    <p>Combine as cartas para acumular pontos e ganhar o jogo</p>
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

                            <div className="premium">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.6046 10.3447L19.1661 9.26368L15.8409 2.52247C15.7501 2.3379 15.6007 2.18849 15.4161 2.09767C14.9532 1.86915 14.3907 2.05958 14.1593 2.52247L10.8341 9.26368L3.39561 10.3447C3.19053 10.374 3.00303 10.4707 2.85948 10.6172C2.68593 10.7956 2.59029 11.0356 2.59359 11.2844C2.59688 11.5333 2.69884 11.7706 2.87705 11.9443L8.25889 17.1914L6.98741 24.6006C6.95759 24.773 6.97666 24.9502 7.04246 25.1123C7.10826 25.2743 7.21815 25.4147 7.35968 25.5175C7.5012 25.6203 7.6687 25.6814 7.84317 25.6938C8.01764 25.7063 8.1921 25.6696 8.34678 25.5879L15.0001 22.0899L21.6534 25.5879C21.8351 25.6846 22.046 25.7168 22.2482 25.6817C22.7579 25.5938 23.1007 25.1104 23.0128 24.6006L21.7413 17.1914L27.1232 11.9443C27.2696 11.8008 27.3663 11.6133 27.3956 11.4082C27.4747 10.8955 27.1173 10.4209 26.6046 10.3447Z" fill="#F7FF0B"/>
                                </svg>

                                <h1>30 pontos</h1>

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
                        <Navbar changeScreen = {(screen) => {
                            changeScreen(screen)
                        }}/>

                        <div className="content">
                            <div className="cards-grid">
                                {cards.map((card) => (
                                    <MemoryCard 
                                        key = {card.id}
                                        card = {card}
                                        isShowing = {flippedCards.some(
                                            (item) => item.id === card.id
                                        )}
                                        isMatched={matchedCards.some(
                                            (item) => item.name == card.name
                                        )}
                                        onClick={() => handleClick(card)}
                                    />
                                ))}

                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}