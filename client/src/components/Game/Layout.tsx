import * as React from 'react';
import Timer from 'react-compound-timer';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import { css } from '../styleguide';

import { Console } from './Console';
import { Editor } from './Editor';

const GameWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

const Main = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: ${css.spacing.S200};
    /* background-color: #272822; */
    padding: ${css.spacing.S200};
    margin-bottom: ${css.spacing.S300};
    border-radius: 2px;
    border: 1px solid ${css.colors.WHITE};
`;

const TimerWrapper = styled.div`
    color: ${css.colors.BLUE};
    font-size: 2.5em;
    padding: 10px;
    width: 200px;
    display: flex;
    align-items: center;
    height: 100%;
`;

const CountWrapper = styled.div`
    color: ${css.colors.WHITE};
    font-size: 2em;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 100%;
`;

const RunButton = styled.button`
    border-radius: 2px;
    background-color: ${css.colors.BLUE};
    border-color: ${css.colors.BLUE};
    padding: ${css.spacing.S200} ${css.spacing.S400};
    font-size: 1em;
    color: ${css.colors.WHITE};
    height: 50px;
`;

export function Layout() {
    const values = ['test', 'test', 'test'];
    const [levels, setLevels] = React.useState(null);
    const [currentLevel, setCurrentLevel] = React.useState(null);
    const [currentTests, setCurrentTests] = React.useState(null);
    const [countLevel, setCountLevel] = React.useState(0);
    const fetchData = useAPI();

    React.useEffect(() => {
        async function fetchLevels() {
            const data = await fetchData('levels');
            setLevels(data);
        }
        fetchLevels();
    }, []);

    React.useEffect(() => {
        async function fetchTests() {
            const data = await fetchData(`levels/${currentLevel.id}/tests`);
            setCurrentTests(data);
        }
        if (currentLevel) {
            fetchTests();
        }
    }, [currentLevel]);

    React.useEffect(() => {
        if (!currentLevel && levels) {
            setCurrentLevel(levels[countLevel]);
        }
    }, [levels]);

    if (!currentLevel || !currentTests) {
        return <p>Wait for fetching</p>;
    }

    return (
        <Main>
            <ActionsWrapper>
                <RunButton onClick={() => console.log('run')}>
                    Run (Cmd + e)
                </RunButton>
                <CountWrapper>{countLevel + 1} / 5</CountWrapper>
                <TimerWrapper>
                    <Timer>
                        <Timer.Hours />
                        <Timer.Minutes formatValue={value => `${value} : `} />
                        <Timer.Seconds
                            formatValue={value =>
                                value < 10 ? `0${value}` : `${value}`
                            }
                        />
                    </Timer>
                </TimerWrapper>
            </ActionsWrapper>
            <GameWrapper>
                <Editor level={currentLevel} />
                <Console values={currentTests.tests} />
            </GameWrapper>
        </Main>
    );
}
