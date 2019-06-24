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
    },
    {
        id: 'level4',
        name: 'reverseStr',
        description:
            '// i will be a string or not. Return the reversed string if i is a string, else false.'
    },
    {
        id: 'level5',
        name: 'getLastItem',
        description: '// i will be a string or an array. Return the last item.'
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
    },
    {
        id: LEVELS[3].id,
        tests: [
            {
                value: 'hello',
                expected: 'olleh'
            },
            {
                value: { a: true },
                expected: false
            },
            {
                value: 'Howdy',
                expected: 'ydwoH'
            },
            {
                value: 'Greetings from Earth',
                expected: 'htraE morf sgniteerG'
            },
            {
                value: 25,
                expected: false
            }
        ]
    },
    {
        id: LEVELS[4].id,
        tests: [
            {
                value: 'hello',
                expected: 'o'
            },
            {
                value: ['d', true, 23],
                expected: 23
            },
            {
                value: 'Howdy',
                expected: 'y'
            },
            {
                value: ['a', 'a', 'a', 'b'],
                expected: 'b'
            },
            {
                value: 'good',
                expected: 'd'
            }
        ]
    }
];

module.exports = { LEVELS, TESTS };
