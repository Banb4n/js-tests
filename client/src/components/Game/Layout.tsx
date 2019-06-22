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
    padding: ${css.spacing.S100}px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${css.spacing.S200}px;
    margin-bottom: ${css.spacing.S300}px;
`;

const TimerWrapper = styled.div`
    color: ${css.colors.FLAME};
    font-size: 2.5em;
    padding: 10px;
    width: 200px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
`;

export function Layout(props: {
    onFinishGame: (value: boolean) => void;
    setFunction: (value: string) => void;
    setStats: (value: object) => void;
}) {
    const { onFinishGame, setFunction, setStats } = props;
    const [value, setValue] = React.useState('');
    const [levels, setLevels] = React.useState(null);
    const [currentLevel, setCurrentLevel] = React.useState(null);
    const [currentTests, setCurrentTests] = React.useState(null);
    const [countLevel, setCountLevel] = React.useState(0);
    const [currentResults, setCurrentResults] = React.useState([]);
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
            setFunction(value);
        }
    }, [levels, countLevel]);

    const onRunTests = () => {
        if (currentTests) {
            /**
             * DEV_HACK
             */
            if (value === 'rr') {
                setCountLevel(countLevel + 1);
                return;
            }

            const fun = createFunction(value, currentLevel.name);
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
                    setStats({
                        level: currentLevel.name,
                        time: '00:00'
                    });
                    setCountLevel(countLevel + 1);
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
        <Main>
            <ActionsWrapper>
                <div>
                    <button
                        style={{ height: '45px' }}
                        className="btn"
                        onClick={onRunTests}
                    >
                        Run (Cmd + e)
                    </button>
                </div>
                <TimerWrapper>
                    <Timer>
                        <Timer.Minutes formatValue={t => `${t} : `} />
                        <Timer.Seconds
                            formatValue={t => (t < 10 ? `0${t}` : `${t}`)}
                        />
                    </Timer>
                </TimerWrapper>
            </ActionsWrapper>
            <HotKeys keyName="cmd+e,ctrl+e" onKeyDown={onKeyDown}>
                <GameWrapper>
                    <Editor
                        level={currentLevel}
                        setValue={setValue}
                        value={value}
                    />
                    <Console values={currentResults} />
                </GameWrapper>
            </HotKeys>
        </Main>
    );
}
