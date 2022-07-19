import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import { testData } from '../../../data/SendTestCaseData';

// Actual test scenarios
describe('Login to the Application as Support User and send lengthy message using Twitter', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Entering content and selecting Twitter Delivery Method And Send Message',async () => {
         subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.TwitterLengthyMessageSubject, testData.TwitterLengthyMessageContent)
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.SendMessage(5000);
    })

    it('Verify the Twitter batch created successfully', async() => {
        //await CommonFunction.WaitForBackendPost('twitter');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Twitter');
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });

})