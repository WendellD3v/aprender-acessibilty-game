// Library
import { useState } from "react";
import { getGeralRanking, getPlayer } from "../../../hooks/points";

// Components
import Navbar from "../../Util/Jogar/Nav/Navbar"

// CSS
import './Ranking.css'

//Images
import trofeu from '../../../assets/images/Jogar/games/progress.png'


export default function Ranking({playerData, changeScreen}){
    const [ranking, setRanking] = useState(getGeralRanking())

    return (
        <section id="ranking-section">
            <Navbar playerData={playerData} changeScreen = {(screen) => {
                changeScreen(screen)
            }}/>
            <div className="content">
                <div className="title">
                    <h1>Ranking</h1>
                </div>
                <div className="ranking-container">
                    {(ranking.slice(0, 10)).map((user, index) => (
                        <div key={user.id} className="ranking">
                            <div className="user">
                                <div className="icon">
                                    <img src={user.avatar} alt="" />
                                </div>
                                <div className="user-info">
                                    <h1>{user.name}</h1>
                                    <p>Pontuação: <span>{user.points}</span> Pontos</p>
                                </div>
                            </div>

                            <div className="position">
                                <h1>{index + 1}º</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="your-rank">
                    {ranking.find((user) => user.id === "current-user") && (
                        <>
                            <div className="icon">
                                <img src={trofeu} alt="" />
                            </div>

                            <div className="user-info">
                                <h1>Você está em <span>{ranking.findIndex((user) => user.id === 'current-user') + 1}º</span></h1>
                                <p>
                                    Pontuação: <span>{
                                        ranking.find((user) => user.id === "current-user").points
                                    }</span> pontos
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}