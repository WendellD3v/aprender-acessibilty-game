// Components
import Navbar from "../../Util/Jogar/Nav/Navbar";
import MemoryCard from "./MemoryCard";

// CSS
import './MemoryGame.css';

export default function MemoryGame({changeScreen}){
    return (
        <section id="MemoryGame">
            <div className="background">
                <Navbar changeScreen = {(screen) => {
                    changeScreen(screen)
                }}/>

                <div className="content">
                    <div className="cards-grid">
                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>

                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>

                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>

                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>
                        <MemoryCard/>

                    </div>
                </div>
            </div>
        </section>
    )
}