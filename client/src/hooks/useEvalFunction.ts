import * as React from 'react';

function useEvalFunction() {
    function createFunction(
        value: string,
        currentLevel: { name: string; description: string }
    ) {
        // Here we remove the function definition, the new line and tab
        const sanitizedFunction = value
            .replace(`function ${currentLevel.name}(i)`, '')
            .replace(/\r/g, '')
            .replace(/\n/g, '')
            .replace(/\t/g, '');
        // Here we remove the `{` and `}` of the function and the and the comments to only keep the body
        const parsedFunction = sanitizedFunction
            .slice(2, -1)
            .slice(
                currentLevel.description.length + 4,
                sanitizedFunction.length
            )
            .trim();
        // We defined the function
        const fun = Function('i', parsedFunction);

        return fun;
    }

    return { createFunction };
}

export default useEvalFunction;
