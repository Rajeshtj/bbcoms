/* *************************** FileName : sendEmailWithSmore.ts ***************************************

Description
    Test case file for sending email with smore template to particular recipient.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added pausingMs for UhuraJobVerification.

Notes

*****************************************************************************************************/
// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
//login

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Smore Template Email all', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.EmailMessageSubject.concat(`with Smore ${date}`);

    before('Login to the Application as Support User', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
    })

    it('Navigate to Smore Page from Email', async () => {
        await SmoreFunctions.GoToSmore('Email');
    })

    it('Login to the Smore Application', async () => {
        await SmoreFunctions.loginToSmore();
        await SmoreFunctions.GoToSmore('Email');
        await clickElement("click", "selector",SendPageObjects.selectSmoreContinue);
    })

    it('Create New News Letter', async () => {
        await WaitForExist(SendPageObjects.selectStartNewsletter, '10000');
        await SmoreFunctions.createNewsLetter();
    })

    it('Preview Smore and send email', async () => {
        await SmoreFunctions.previewAndClose();
        await setValue("set", subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage([subject], false);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
