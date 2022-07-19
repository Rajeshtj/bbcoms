/* *************************** FileName : sendSurveyMessage.ts ***************************************

Description
    Test case file for posting survey messages for all delivery methods.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Added School Info (Bayside High School) for Alert/WCM

Notes
    - Facebook Account - QA Page100 (Automation Org - Do not Delete)
    - Twitter Account - Karthick (Automation Org - Do not Delete)
    - Alerts/ Headlines & Announcements can be tested only for the following schools
        * High Schools          -> Bayside high School & Sunnydale High school
        * Middle/Junior schools -> Tom Landry middle school
        * Elementary Schools    -> Springfield Elementary

    - Now, the script is being tested for High Schools -> Bayside High School

*****************************************************************************************************/
// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import WaitForExist from '../../helpers/action/waitForExist';

// Actual test scenarios
describe('Login to the Application as Support User and send Survey message to All applicable delivery methods', () => {
    let selectedDeliverymethods: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send Survey Message in All applicable delivery methods', async () => {
        await SendMessageFunctions.selectSavedMessageCategory('Survey');
        // This timeout in the below steps is required for Survey Message to get loaded in Send module
        // page and to avoid timing issue
        await browser.pause(100);
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools','Bayside High School');
        await  browser.pause(100);
        await SendFacebookFunctions.searchSelectFbAccount();
        await  SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.selectDeliveryMode('App');
        await WaitForExist(SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        selectedDeliverymethods = await SendMessageFunctions.getSelectedDeliveryModes();
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify all delivery Methods', async () => {
        //await CommonFunction.WaitForBackendPost('all');
        await OutBoxFunctions.selectLatestMessage();
        //await OutBoxFunctions.verifyAllDeliveryMethodMessages(selectedDeliverymethods);
    })

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})