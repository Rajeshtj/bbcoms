const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import CommonFunction from '../../pages/CommonFunctions';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import WaitForExist from '../../helpers/action/waitForExist';
import { testData } from '../../../data/SendTestCaseData';

//login

describe('Login to the Application as Support User and send App Message with Merge Tag', () => {
let subjectAndTextValue: string[];
    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Set subject and move to App Delivery method',async () => {
        subjectAndTextValue =await  SendMessageFunctions.enterContentInTextAndSubject(testData.AppMessageSubject.concat('with MergeTag'), testData.AppMessageContent.concat('with mergeTag'));
        await SendMessageFunctions.selectDeliveryMode('App');
    })

    it('Insert Merge tags', async () => {
        await WaitForExist(SendPageObjects.selectAppMore);
        await clickElement("click", "selector",SendPageObjects.selectAppMore);
        await WaitForExist(SendPageObjects.clickAppInsertMergeTag);
        await clickElement("click", "selector",SendPageObjects.clickAppInsertMergeTag);
        let rind = await CommonFunction.getRandomInt(1, 5).toString();
        await WaitForExist(SendPageObjects.insertMergeTag.concat(`[${rind}]`));
        await CommonFunction.MoveAndClick(SendPageObjects.insertMergeTag.concat(`[${rind}]`));
    })

    it('Choose Recipient and Send Message', async () => {
        await SendMessageFunctions.ChooseRecipient();
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async () => {
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    after('Logout from the application and close the browser', async() => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})
