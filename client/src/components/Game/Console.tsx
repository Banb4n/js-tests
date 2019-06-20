import * as React from 'react';
import styled from 'styled-components';
import { css } from '../styleguide';

const ConsoleWrapper = styled.div`
    flex: 1;
    background-color: ${css.colors.GRAY};
    padding: ${css.spacing.S200};
    width: 100%;
    position: relative;
    margin-left: ${css.spacing.S200};
    padding-top: ${css.spacing.S700};
    color: ${css.colors.LIGHT_BLUE};
`;

const Header = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: ${css.spacing.S100};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: ${css.colors.WHITE};
    border-bottom: 1px solid ${css.colors.BLUE};
    margin-bottom: ${css.spacing.S300};
`;

export function Console(props: { values: [] }) {
    const { values } = props;
    console.log({ values });
    return (
        <ConsoleWrapper>
            <Header>
                <p>Output</p>
            </Header>
            {values.map(test => (
                <p>
                    i: {test.value} | expected:{' '}
                    {test.expected
                        ? typeof test.expected === 'boolean'
                            ? '👍'
                            : test.expected
                        : '👎'}{' '}
                    | result: {test.value > 4 ? '✅' : '❌'}
                </p>
            ))}
        </ConsoleWrapper>
    );
}
