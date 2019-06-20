import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import * as React from 'react';
import AceEditor from 'react-ace';
console.log({ brace });

export function Editor(props: { level: object }) {
    const { level } = props;

    return (
        <>
            <AceEditor
                placeholder={`function ${level.name}`}
                mode="javascript"
                theme="monokai"
                name="editor"
                onLoad={() => console.log('onLoad')}
                onChange={() => console.log('onChange')}
                fontSize={18}
                width="60%"
                height="100%"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                value={`function ${level.name}(i) {
    // ${level.description}
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
        </>
    );
}
