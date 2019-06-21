import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import * as React from 'react';
import AceEditor from 'react-ace';
console.log({ brace });

export function Editor(props: {
    level: object;
    setValue: (value: string) => void;
    value: string;
}) {
    const { level, setValue, value } = props;

    React.useEffect(() => {
        setValue(`function ${level.name}(i) {
    // ${level.description}
    return i;
}`);
    }, [level]);

    const onChange = (currentValue: string) => {
        console.log('onChange', {
            value: currentValue.replace(/\n|\r/g, '').replace(` `, '')
        });
        setValue(currentValue);
    };

    return (
        <>
            <AceEditor
                placeholder={`function ${level.name}`}
                mode="javascript"
                theme="monokai"
                name="editor"
                onChange={value => onChange(value)}
                fontSize={18}
                width="60%"
                height="100%"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                value={value}
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
