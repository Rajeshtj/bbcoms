const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';


describe('Login to the Application as Support User and send App Message without Recipients', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Navigate to App Delivery Method and send message without recipients', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.AppMessageSubject, testData.AppMessageContent);
        await SendMessageFunctions.selectDeliveryMode('App');
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async() => {
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    after('Logout from the application and close the browser',async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})