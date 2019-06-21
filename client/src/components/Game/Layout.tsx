import * as React from 'react';
import Timer from 'react-compound-timer';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import useEvalFunction from '../../hooks/useEvalFunction';
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

export function Layout(props: { onFinishGame: (value: boolean) => void }) {
    const { onFinishGame } = props;
    const [levels, setLevels] = React.useState(null);
    const [currentLevel, setCurrentLevel] = React.useState(null);
    const [currentTests, setCurrentTests] = React.useState(null);
    const [countLevel, setCountLevel] = React.useState(0);
    const [currentResults, setCurrentResults] = React.useState([]);
    const [isWinLevel, setIsWinLevel] = React.useState(false);
    const fetchData = useAPI();
    const { createFunction } = useEvalFunction();

    const [value, setValue] = React.useState('');

    // Hook to fetch * levels
    React.useEffect(() => {
        async function fetchLevels() {
            const data = await fetchData('levels');
            setLevels(data);
        }
        if (!levels) {
            fetchLevels();
        }
    }, []);

    // Hook to fetch currents level's tests
    React.useEffect(() => {
        async function fetchTests() {
            const data = await fetchData(`levels/${currentLevel.id}/tests`);
            setCurrentTests(data);
        }
        if (currentLevel) {
            fetchTests();
        }
    }, [currentLevel]);

    // Hook trigger when the game is finished
    React.useEffect(() => {
        if (levels && countLevel + 1 > levels.length) {
            onFinishGame(true);
        }
    }, [countLevel]);

    // useEffect to set the current level
    React.useEffect(() => {
        if (levels) {
            setCurrentLevel(levels[countLevel]);
            setIsWinLevel(false);
        }
    }, [levels, countLevel]);

    const onRunTests = () => {
        if (currentTests) {
            const fun = createFunction(value, currentLevel);
            const results = [];

            currentTests.tests.forEach(test => {
                results.push({
                    value: test.value,
                    expected: test.expected,
                    result: fun(test.value)
                });
                setCurrentResults(results);
                return;
            });

            if (results.length > 0) {
                const isWin = results.every(
                    result => result.expected === result.result
                );

                if (isWin) {
                    setIsWinLevel(true);
                }
            }
        }
    };

    if (!currentLevel || !currentTests) {
        return <p>Wait for fetching</p>;
    }

    return (
        <Main>
            <ActionsWrapper>
                <RunButton onClick={onRunTests}>Run (Cmd + e)</RunButton>
                {isWinLevel && (
                    <RunButton onClick={() => setCountLevel(countLevel + 1)}>
                        Next
                    </RunButton>
                )}
                <CountWrapper>{countLevel + 1} / 5</CountWrapper>
                <TimerWrapper>
                    <Timer>
                        <Timer.Minutes formatValue={t => `${t} : `} />
                        <Timer.Seconds
                            formatValue={t => (t < 10 ? `0${t}` : `${t}`)}
                        />
                    </Timer>
                </TimerWrapper>
            </ActionsWrapper>
            <GameWrapper>
                <Editor
                    level={currentLevel}
                    setValue={setValue}
                    value={value}
                />
                <Console values={currentResults} />
            </GameWrapper>
        </Main>
    );
}
