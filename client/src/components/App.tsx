import * as React from 'react';
import styled from 'styled-components';
import Game from './Game';
import { css } from './styleguide';

const Main = styled.section`
    padding: 2em;
    margin: 0;
    background: ${css.colors.DARK_BLUE};
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
    color: ${css.colors.LIGHT_BLUE};
    text-align: center;
`;

const StartButton = styled.button`
    border-radius: 2px;
    background-color: ${css.colors.BLUE};
    border-color: ${css.colors.BLUE};
    padding: ${css.spacing.S200} ${css.spacing.S400};
    font-size: 1.5em;
    color: ${css.colors.WHITE};
    margin-top: ${css.spacing.S200};
`;

export function App() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [gameIsFinish, setGameFinish] = React.useState(false);

    const onClick = () => {
        console.log({ isPlaying: !isPlaying });
        setIsPlaying(!isPlaying);
    };

    return (
        <Main>
            <Header>
                <h1>You can't Javascript under pressure</h1>
            </Header>
            {!gameIsFinish ? (
                !isPlaying ? (
                    <StartButton onClick={onClick}>Let's go!</StartButton>
                ) : (
                    <Game onFinishGame={setGameFinish} />
                )
            ) : (
                <div>
                    Congratulation, you can Javascript under pressure 👏🚀
                </div>
            )}
        </Main>
    );
}
