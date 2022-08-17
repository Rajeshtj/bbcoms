import CommonFunction from '../../pages/CommonFunctions';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Smore Template Email all', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.EmailMessageSubject.concat(`with Smore ${date}`);

    before('Login to the Application as Support User',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Emil and Select Existing Smore', async () => {
        await SmoreFunctions.GoToSmore('Email');
        await SmoreFunctions.loginToSmore();
        await SmoreFunctions.SelectExistingSmore('Email');

    })

    it('Edit Existing News Letter',async () => {
        await SmoreFunctions.editNewsLetter();
    })

    it('Preview Smore and send email',async () => {
        await SmoreFunctions.previewAndClose();
        await setValue("set",subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully',async () => {
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage([subject], false);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})
