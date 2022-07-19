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
import CommonFunction from '../../pages/CommonFunctions';

describe('Login to the Application as Support User and send App Message with existing Templates', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.AppMessageSubject.concat(`with Template ${date}`);

    before('Login to the Application as Support user and Navigate to Message Menu', async() => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send App Message with Templates', async () => {
        await SendMessageFunctions.selectDeliveryMode('App');
        await clickElement("click", "selector",SendPageObjects.insertAppTemplate);
        // let rint = CommonFunction.getRandomInt(1, 11);
        // await clickElement("click", "selector",SendPageObjects.selectTemplate.concat(`[${rint}]`));
        await WaitForExist(SendPageObjects.clickUseButton);
        await clickElement("click", "selector",SendPageObjects.clickUseButton);
        await WaitForExist(SendPageObjects.subjectField);
        await setValue("set", subject, SendPageObjects.subjectField);
       // await SendMessageFunctions.ChooseRecipient();
       // await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async () => {
        await OutBoxFunctions.selectMessage([subject], false);
    });

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})
