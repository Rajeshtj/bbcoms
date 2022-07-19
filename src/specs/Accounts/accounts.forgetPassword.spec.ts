import AccountsFunctions from '../../pages/AccountsFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');

// Actual test scenarios
describe('Click Forget password and send Email', () => {

    before('Go to HomePage ', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        
    });

    it('#SMOKE Click forget Password and Send Forget password link mail to Student', async () => {
      await AccountsFunctions.forgetPassword(data.qa.supportUserName);
    });

    after('Logout from the application and close the browser', async () => {
        await  browser.closeWindow();
    });

})