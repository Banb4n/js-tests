import * as React from 'react';
import styled from 'styled-components';
import { css } from '../styleguide';

const ConsoleWrapper = styled.div`
    flex: 1;
    background-color: ${css.colors.GRAY};
    padding: ${css.spacing.S100}px;
    width: 100%;
    position: relative;
    margin-left: ${css.spacing.S200}px;
    padding-top: ${css.spacing.S700}px;
    color: ${css.colors.LIGHT_BLUE};
    overflow: hidden;
`;

const ItemsWrapper = styled.div`
    overflow: scroll;
    height: 100%;
`;

const Header = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: ${css.spacing.S100 / 2}px ${css.spacing.S100}px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: ${css.colors.WHITE};
    border-bottom: 1px solid ${css.colors.BLUE};
    margin-bottom: ${css.spacing.S300}px;
    display: flex;
    justify-content: space-between;
`;

export function Console(props: { values: [] }) {
    const { values } = props;
    const [allValues, setAllValues] = React.useState([]);

    React.useEffect(() => {
        if (values.length > 0) {
            const prevValues = allValues;
            setAllValues([...values, ...prevValues]);
        }
    }, [values]);

    return (
        <ConsoleWrapper>
            <Header>
                <p>Output</p>
                {allValues.length > 0 && (
                    <button onClick={() => setAllValues([])}>drop</button>
                )}
            </Header>
            <ItemsWrapper>
                {allValues.map(test => {
                    return (
                        <p
                            style={{
                                color:
                                    test.result === test.expected
                                        ? 'green'
                                        : 'red'
                            }}
                        >
                            <span
                                style={{ color: 'white' }}
                            >{`i = ${test.value} : `}</span>
                            {`${
                                test.result === test.expected
                                    ? `✅ result ${test.result}`
                                    : `❌ expected ${test.expected} but got ${test.result}`
                            }`}
                        </p>
                    );
                })}
            </ItemsWrapper>
        </ConsoleWrapper>
    );
}
