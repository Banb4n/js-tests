import * as React from 'react';
import styled from 'styled-components';
import Trash from '../../icons/trash.svg';
import { css } from '../styleguide';

const ConsoleWrapper = styled.div`
    flex: 1;
    background-color: ${css.colors.Y_BLUE};
    padding: ${css.spacing.S100}px;
    width: 100%;
    position: relative;
    margin-left: ${css.spacing.S200}px;
    padding-top: ${css.spacing.S600}px;
    color: ${css.colors.LIGHT};
    overflow: hidden;
`;

const ItemsWrapper = styled.div`
    overflow: scroll;
    height: 100%;
`;

const Header = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0 ${css.spacing.S100}px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: ${css.colors.LIGHT};
    box-shadow: 0px 0px 5px -1px rgba(94, 98, 96, 0.46);
    margin-bottom: ${css.spacing.S300}px;
    display: flex;
    justify-content: space-between;
`;

const TrashButton = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 55px;
    font-size: 10px;
    padding-right: ${css.spacing.S100}px;

    &:hover {
        color: ${css.colors.FLAME};
        cursor: pointer;
    }
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
                    <TrashButton onClick={() => setAllValues([])}>
                        <Trash />
                    </TrashButton>
                )}
            </Header>
            <ItemsWrapper>
                {allValues.map((test, i) => {
                    return (
                        <p key={`${i}-${test.expected}-test`}>
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
