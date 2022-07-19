import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import ActivityCommonFunctions from '../../pages/ActivityFunctions';


describe('Login to the Application as Support User and Perform Facebook Activity', () => {

    before('Login to the Application as Support user and Navigate to Social > Activity Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Social');

    });

    it('Replay and delete Facebook comments in Social Activity', async () => {
        await ActivityCommonFunctions.PerformSocialActivity('Facebook');
    });

    after('Verify the Accounts has been added', async () => {
        await browser.closeWindow();
    });
})