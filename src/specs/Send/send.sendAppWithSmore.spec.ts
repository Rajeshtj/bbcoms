const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import WaitForExist from '../../helpers/action/waitForExist';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send App Message with Smore Templates', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.AppMessageSubject.concat(`with Smore ${date}`);

    before('Login to the Application as Support User',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Smore Page from App',async () => {
        await SmoreFunctions.GoToSmore('App');
    })

    it('Login to the Smore Application',async () => {
        await SmoreFunctions.loginToSmore();
        await  SmoreFunctions.GoToSmore('App');
        await clickElement("click", "selector",SendPageObjects.selectSmoreContinue);
    })

    it('Create New News Letter', async() => {
        await WaitForExist(SendPageObjects.selectStartNewsletter, '10000');
        await SmoreFunctions.createNewsLetter();
    })

    it('Preview Smore and send App Message', async () => {
        await SmoreFunctions.previewAndClose();
        await setValue("set", subject, SendPageObjects.subjectField);
        //await SendMessageFunctions.ChooseRecipient();
       // await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async() => {
        await OutBoxFunctions.selectMessage([subject], false);
    });

    after('Logout from the application and close the browser', async() => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})
