const createTestCafe = require('testcafe');

/* Run tests programmatically */
let testcafe = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            // .src(['tests/*']) // not needed - sourced from config
            // .browsers(['nightmare']) // not needed - sourced from config
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });
