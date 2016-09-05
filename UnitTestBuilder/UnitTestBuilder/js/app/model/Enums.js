define(function () {
    var Enums = Object.create({
        TestCaseType: [
            { Name: 'test', Description: 'Add a test to run.' },
            { Name: 'only', Description: 'Adds a test to exclusively run, preventing all other tests from running.' },
            { Name: 'skip', Description: 'Adds a test like object to be skipped.' }
        ],
        ProjectLevelCallback: [
            { Name: 'begin', Description: 'Runs whenever the test suite begins.' },
            { Name: 'done', Description: 'Runs whenever the test suite ends.' },
            { Name: 'log', Description: 'Runs whenever an assertion completes.' },
            { Name: 'moduleDone', Description: 'Runs whenever a module ends.' },
            { Name: 'moduleStart', Description: 'Runs whenever a module begins.' },
            { Name: 'testDone', Description: 'Runs whenever a test ends.' },
            { Name: 'testStart', Description: 'Runs whenever a test begins.' }
        ],
        ModuleLevelCallback: [
            { Name: 'before', Description: 'Runs before the first test in the current module.' },
            { Name: 'after', Description: 'Runs after the last test in the current module.' },
            { Name: 'beforeEach', Description: 'Runs before the each test in the current module.' },
            { Name: 'afterEach', Description: 'Runs after the each test in the current module.' }
        ]
    });

    return Enums;
});