import stripComments from 'strip-comments';

function createFunction(value: string, name: string) {
    const sanitizedFunction = stripComments(value)
        .replace(`function ${name}(i)`, '')
        .replace(/\r/g, '')
        .replace(/\n/g, '')
        .replace(/\t/g, '');

    const parsedFunction = sanitizedFunction.slice(2, -1).trim();

    // We defined the function
    const fun = Function('i', parsedFunction);

    return fun;
}

export default createFunction;
