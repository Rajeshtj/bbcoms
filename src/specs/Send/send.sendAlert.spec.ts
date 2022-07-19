// Files to import
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';

// Actual test scenarios
describe('Verify User is able to post an alert', () => {

    let subjectAndTextValue: string[];

    before('Login to bbcomms applications with valid credentials', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it('Verify user is able to post alert by selecting a school', async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.AlertMessageSubject, testData.AlertMessageContent);
        await SendMessageFunctions.selectAlertRecipient('High Schools','Bayside High School');
        await SendMessageFunctions.SendMessage();
    });

    it('Verify the alert sent got posted successfully',async () => {
        await console.log( "subjectAndTextValue[1]"+ subjectAndTextValue[1]);
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
});