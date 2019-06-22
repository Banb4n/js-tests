import stripComments from 'strip-comments';

function createFunction(
    value: string,
    currentLevel: { name: string; description: string }
) {
    const sanitizedFunction = stripComments(value)
        .replace(`function ${currentLevel.name}(i)`, '')
        .replace(/\r/g, '')
        .replace(/\n/g, '')
        .replace(/\t/g, '');

    const parsedFunction = sanitizedFunction.slice(2, -1).trim();

    // We defined the function
    const fun = Function('i', parsedFunction);

    return fun;
}

export default createFunction;
