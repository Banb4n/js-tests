import * as React from 'react';
import styled from 'styled-components';
import '../styles/CTAButton.css';
import Game from './Game';
import { css } from './styleguide';

const Main = styled.section`
    padding: ${css.spacing.S300}px ${css.spacing.S700}px;
    margin: 0;
    background: #304352; /* fallback for old browsers */
    background: #485563; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to left,
        #29323c,
        #485563
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to left,
        #29323c,
        #485563
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.div`
    width: 80%;
    font-size: 2em;
    color: ${css.colors.LIGHT};
    text-align: center;
    margin-bottom: ${css.spacing.S200};
`;

export function App() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [gameIsFinish, setGameFinish] = React.useState(false);
    const [stats, setStats] = React.useState([]);

    const onClick = () => {
        setIsPlaying(!isPlaying);
    };

    const addNewStats = (value: object) => {
        setStats([...stats, value]);
    };

    if (gameIsFinish) {
        console.log({ stats });
    }

    return (
        <Main>
            <Header>
                <h1>
                    You {gameIsFinish ? 'can' : "can't"} Javascript under
                    pressure
                </h1>
            </Header>
            {!gameIsFinish ? (
                !isPlaying ? (
                    <button onClick={onClick} className="btn">
                        Let's go!
                    </button>
                ) : (
                    <Game onFinishGame={setGameFinish} setStats={addNewStats} />
                )
            ) : (
                <div>
                    Congratulation, you can Javascript under pressure 👏🚀
                    {functions.map(fun => (
                        <p>{fun}</p>
                    ))}
                </div>
            )}
        </Main>
    );
}
