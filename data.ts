interface Level {
    id: string;
    name: string;
    description: string;
}

interface LevelTest {
    id: string; // Id of the level
    tests: Array<{
        value: any;
        expected: any;
    }>;
}

const LEVELS: Level[] = [
    {
        id: 'level1',
        name: 'doubleInteger',
        description: '// i will be an integer. Double it and return it.'
    },
    {
        id: 'level2',
        name: 'isNumberEven',
        description:
            "// i will be an integer. Return true if it's even, and false if it isn't"
    },
    {
        id: 'level3',
        name: 'getFileExtension',
        description:
            '// i will be a string, but it may not have a file extension. \r\n // return the file extension (with no period) if it has one, otherwise false.'
    }
];

const TESTS: LevelTest[] = [
    {
        id: LEVELS[0].id,
        tests: [
            {
                value: 2,
                expected: 4
            },
            {
                value: 8,
                expected: 16
            },
            {
                value: 9,
                expected: 18
            },
            {
                value: 4,
                expected: 8
            },
            {
                value: 1,
                expected: 2
            }
        ]
    },
    {
        id: LEVELS[1].id,
        tests: [
            {
                value: 2,
                expected: true
            },
            {
                value: 3,
                expected: false
            },
            {
                value: 4,
                expected: true
            },
            {
                value: 9,
                expected: false
            },
            {
                value: 7,
                expected: false
            }
        ]
    },
    {
        id: LEVELS[2].id,
        tests: [
            {
                value: 'test.png',
                expected: 'png'
            },
            {
                value: 'test.js',
                expected: 'js'
            },
            {
                value: 'test',
                expected: false
            },
            {
                value: 'test.gif',
                expected: 'gif'
            },
            {
                value: 'test.py',
                expected: 'py'
            }
        ]
    }
];

module.exports = { LEVELS, TESTS };
