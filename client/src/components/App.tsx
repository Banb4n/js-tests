import * as React from 'react';
import styled from 'styled-components';
import '../styles/CTAButton.css';
import Game from './Game';
import { css } from './styleguide';

const Main = styled.section`
    padding: ${css.spacing.S300}px ${css.spacing.S700}px;
    margin: 0;
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
    color: ${css.colors.FLAME};
    text-shadow: 1px 1px 2px black;
    text-align: center;
    margin-bottom: ${css.spacing.S200}px;
    letter-spacing: 8px;
    font-family: 'Bangers', 'Roboto', sans-serif;
`;

const FinalView = styled.div`
    width: 100%;
    height: 100%;
    padding: ${css.spacing.S100}px;
`;

const LevelResume = styled.div`
    margin: ${css.spacing.S200}px;
    color: ${css.colors.LIGHT};
`;

const LevelResumeTitle = styled.h2`
    color: ${css.colors.FLAME};
    letter-spacing: 8px;
    font-family: 'Roboto', sans-serif;
    text-shadow: 1px 1px 2px black;
`;

const LevelResumeDetails = styled.div`
    padding-left: ${css.spacing.S200}px;
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
            <Header
                style={
                    isPlaying
                        ? { width: '80%', fontSize: '2em' }
                        : { width: '70%', fontSize: '2.5em' }
                }
            >
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
                <FinalView>
                    👏👏👏 Congratulations 🚀
                    {stats.map(stat => (
                        <LevelResume>
                            <LevelResumeTitle>{stat.level}</LevelResumeTitle>
                            <LevelResumeDetails>
                                <p>{stat.time}</p>
                                <div>{stat.function}</div>
                            </LevelResumeDetails>
                        </LevelResume>
                    ))}
                </FinalView>
            )}
        </Main>
    );
}
