if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const createTestCafe = require('testcafe');
const config = require('./config');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
// ─── HELPERS ───────────────────────────────────────────────────────────────────
//
const runTests = () => {
    /* Run tests programmatically */
    let testcafe = null;

    createTestCafe()
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
};

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
app.get('/run-sonar-tests', (req, res) => {
    const apiSecretParam = req.query.apiSecret;
    const testEnvParam = req.query.testEnv || 'ALPHA';
    const testEnv = testEnvParam.toUpperCase();

    if (apiSecretParam === process.env.API_SECRET) {
        if (testEnv === 'ALPHA' || testEnv === 'BETA' || testEnv == 'PROD') {
            config.set({testEnv});
            runTests();
            res.status(200).send('Starting Test Run!');
        } else {
            res.status(401).send('Error! 400: Invalid Test Environment Argument!');
        }
    } else {
        res.status(401).send('Error! 401: Invalid API Secret!');
    }
});

//
// ─── RUN SERVER ─────────────────────────────────────────────────────────────────
//
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
