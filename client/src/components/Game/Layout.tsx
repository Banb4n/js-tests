import * as React from 'react';
import styled from 'styled-components';
import useAPI from '../../hooks/useAPI';

import { Console } from './Console';
import { Editor } from './Editor';

const Wrapper = styled.section`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

export function Layout() {
    const values = ['test', 'test', 'test'];
    const [levels, setLevels] = React.useState(null);
    const [currentLevel, setCurrentLevel] = React.useState(null);
    const [currentTests, setCurrentTests] = React.useState(null);
    const [countLevel, setCountLevel] = React.useState(1);
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
        <Wrapper>
            <Editor level={currentLevel} />
            <Console values={currentTests.tests} />
        </Wrapper>
    );
}
