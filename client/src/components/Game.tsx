import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import * as React from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import { css } from './styleguide';

const Wrapper = styled.section`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

const Console = styled.div`
    flex: 1;
    background-color: ${css.colors.GRAY};
    padding: ${css.spacing.S200};
    width: 40%;
`;

export function Game() {
    console.log({ brace });
    const levels = [
        {
            name: 'level name',
            description: 'level description'
        }
    ];
    const currentLevel = 0;

    return (
        <Wrapper>
            <AceEditor
                placeholder={`function ${levels[currentLevel].name}`}
                mode="javascript"
                theme="monokai"
                name="editor"
                onLoad={() => console.log('onLoad')}
                onChange={() => console.log('onChange')}
                fontSize={18}
                width="60%"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                value={`function ${levels[currentLevel].name}(i) {
    // ${levels[currentLevel].description}
    return i;
}`}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4
                }}
            />
            <Console />
        </Wrapper>
    );
}
