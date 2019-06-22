import * as React from 'react';
import Timer from 'react-compound-timer';
import HotKeys from 'react-hot-keys';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';
import { css } from '../styleguide';
import { Console } from './Console';
import createFunction from './createFunction';
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
    padding: ${css.spacing.S200}px;
    padding: ${css.spacing.S200}px;
    margin-bottom: ${css.spacing.S300}px;
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
    padding: ${css.spacing.S200}px ${css.spacing.S400}px;
    font-size: 1em;
    color: ${css.colors.WHITE};
    height: 50px;
`;

export function Layout(props: {
    onFinishGame: (value: boolean) => void;
    setFunction: (value: string) => void;
}) {
    const { onFinishGame, setFunction } = props;
    const [value, setValue] = React.useState('');
    const [levels, setLevels] = React.useState(null);
    const [currentLevel, setCurrentLevel] = React.useState(null);
    const [currentTests, setCurrentTests] = React.useState(null);
    const [countLevel, setCountLevel] = React.useState(0);
    const [currentResults, setCurrentResults] = React.useState([]);
    const [isWinLevel, setIsWinLevel] = React.useState(false);
    const fetchData = useAPI();

    React.useEffect(() => {
        async function fetchLevels() {
            const data = await fetchData('levels');
            setLevels(data);
        }
        if (!levels) {
            fetchLevels();
        }
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
        if (levels && countLevel + 1 > levels.length) {
            onFinishGame(true);
        }
    }, [countLevel]);

    React.useEffect(() => {
        if (levels) {
            setCurrentLevel(levels[countLevel]);
            setIsWinLevel(false);
            setFunction(value);
        }
    }, [levels, countLevel]);

    const onRunTests = () => {
        if (currentResults) {
            setCurrentResults([]);
        }

        if (currentTests) {
            /**
             * DEV_HACK
             */
            if (value === 'rendpasfou') {
                setIsWinLevel(true);
                return;
            }

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

    const onKeyDown = (keyName, e, handle) => {
        console.log('test:onKeyDown', { keyName, e, handle });
        onRunTests();
    };

    if (!currentLevel || !currentTests) {
        return <p>Wait for fetching</p>;
    }

    return (
        <HotKeys keyName="cmd+e,ctrl+e" onKeyDown={onKeyDown}>
            <Main>
                <ActionsWrapper>
                    <RunButton onClick={onRunTests}>Run (Cmd + e)</RunButton>
                    {isWinLevel && (
                        <RunButton
                            onClick={() => setCountLevel(countLevel + 1)}
                        >
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
        </HotKeys>
    );
}
