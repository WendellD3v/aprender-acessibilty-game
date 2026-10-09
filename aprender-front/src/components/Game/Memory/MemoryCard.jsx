// CSS
import './MemoryCard.css'

// Assets
import HideCard from '../../../assets/images/Jogar/games/memory/hide.png'

export default function MemoryCard(
        {
            card, 
            isShowing,
            isMatched,
            onClick
        }
    ){

    return (
        <section id="MemoryCard" onClick={() => onClick(card)}>

            {isShowing || isMatched ? (
                <div key={`showing-${card.id}-${isShowing}`} className="showingCard animate__animated animate__flipInY">
                    <img src={card.icon} alt="" />
                    <h1>{card.name}</h1>
                </div>
            ) : (
                <div key={`showing-${card.id}-false`} className="hideCard animate__animated animate__flipInY">
                    <img src={HideCard} alt="" />
                </div>
            )}
            

            
        </section>
    )
}