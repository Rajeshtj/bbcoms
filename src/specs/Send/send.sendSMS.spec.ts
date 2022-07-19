import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import { testData } from '../../../data/SendTestCaseData';

// Actual test scenarios
describe('Login to the Application as Support User and send Message using SMS', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support user and Navigate to Message Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send SMS', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.SMSMessageSubject, testData.SMSMessageContent);
        await SendMessageFunctions.selectDeliveryMode('Sms');
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the SMS batch created successfully', async() => {
        await CommonFunction.WaitForBackendPost('sms');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyUhuraJobCreation('sms', 0);
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})