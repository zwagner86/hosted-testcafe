import {Selector} from 'testcafe';

fixture('Alpha')
    .page('https://alpha.rippleshot.com')

test('Has Sign In Header', async t => {
    await t
        .expect(Selector('.sign-in-container h2').innerText).eql('Sign in');
});
