import {Selector} from 'testcafe';
import config from '../config';

fixture(config.testEnv)
    .page(config.envUrls[config.testEnv])

test('Has Sign In Header', async t => {
    await t
        .expect(Selector('.sign-in-container h2').innerText).eql('Sign in');
});
