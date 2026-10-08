// CSS
import './MemoryCard.css'

// Assets
import Dog from '../../../assets/images/Jogar/games/memory/Dog.png'
import HideCard from '../../../assets/images/Jogar/games/memory/hide.png'

export default function MemoryCard({}){
    return (
        <section id="MemoryCard">
            {/* <div className="showingCard animate__animated animate__flipInY">
                <img src={Dog} alt="" />
                <h1>Cachorro</h1>
            </div> */}

            <div className="hideCard animate__animated animate__flipInY">
                <img src={HideCard} alt="" />
            </div>
        </section>
    )
}