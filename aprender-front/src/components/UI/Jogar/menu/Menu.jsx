// CSS
import './Menu.css';
import 'animate.css';

export default function Menu({changeScreen}) {
    return (
        <section id='menu-jogar'>
            <div className="nav-menu">
                <div className="header animate__animated animate__bounceInDown">    
                    <h1>Aprender<br />é <span>para todos</span></h1>
                    <h2>Um jogo educativo e inclusivo para estimular o aprendizado de forma divertida</h2>
                </div>
                <button className='jogar animate__animated animate__bounceIn'>
                    <div className="icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.1374 28.1583C40.6196 27.7851 41.01 27.3064 41.2786 26.7589C41.5471 26.2114 41.6868 25.6098 41.6868 25C41.6868 24.3902 41.5471 23.7885 41.2786 23.241C41.01 22.6935 40.6196 22.2148 40.1374 21.8416C33.892 17.0107 26.919 13.2022 19.4791 10.5583L18.1187 10.075C15.5187 9.15204 12.7707 10.9104 12.4187 13.5958C11.4353 21.1668 11.4353 28.8331 12.4187 36.4041C12.7728 39.0895 15.5187 40.8479 18.1187 39.925L19.4791 39.4416C26.919 36.7977 33.892 32.9892 40.1374 28.1583Z" fill="white"/>
                        </svg>
                    </div>
                    <h1>Jogar</h1>
                </button>
            </div>
        </section>
    )
}