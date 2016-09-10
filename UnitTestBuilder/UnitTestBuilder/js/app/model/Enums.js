define(function () {
    var Enums = Object.create({
        TestCaseType: [
            { Name: 'test', DisplayName: 'Test', Description: 'Add a test to run.' },
            { Name: 'only', DisplayName: 'Only', Description: 'Adds a test to exclusively run, preventing all other tests from running.' },
            { Name: 'skip', DisplayName: 'Skip', Description: 'Adds a test like object to be skipped.' }
        ],
        ProjectLevelCallback: [
            { Name: 'begin', DisplayName: 'Begin', Description: 'Runs whenever the test suite begins.' },
            { Name: 'done', DisplayName: 'Done', Description: 'Runs whenever the test suite ends.' },
            { Name: 'log', DisplayName: 'Log', Description: 'Runs whenever an assertion completes.' },
            { Name: 'moduleDone', DisplayName: 'Module Done', Description: 'Runs whenever a module ends.' },
            { Name: 'moduleStart', DisplayName: 'Module Start', Description: 'Runs whenever a module begins.' },
            { Name: 'testDone', DisplayName: 'Test Done', Description: 'Runs whenever a test ends.' },
            { Name: 'testStart', DisplayName: 'Test Start', Description: 'Runs whenever a test begins.' }
        ],
        ModuleLevelCallback: [
            { Name: 'before', DisplayName: 'Before', Description: 'Runs before the first test in the current module.' },
            { Name: 'after', DisplayName: 'After', Description: 'Runs after the last test in the current module.' },
            { Name: 'beforeEach', DisplayName: 'Before Each', Description: 'Runs before the each test in the current module.' },
            { Name: 'afterEach', DisplayName: 'After Each', Description: 'Runs after the each test in the current module.' }
        ]
    });

    return Enums;
});