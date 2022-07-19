const GroupsPageObjects = require('../../pageobjects/GroupsPageObjects.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import GroupsFunctions from '../../pages/GroupsFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import clickElement from '../../helpers/action/clickElement';
import { GroupsTestData } from '../../../data/GroupsTestCaseData';

describe('Login to the Application as Support User and Create Person Group', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
    })

    it('Navigate to Groups and create Person Group', async () => {
        await GroupsFunctions.SetGroupsDetails('Public', 'PERSON')
        await GroupsFunctions.selectPerson();
        await clickElement("click", "selector",GroupsPageObjects.SaveButton);
        subjectAndTextValue = await GroupsFunctions.SendGroupMessages(GroupsTestData.personGroupName)
    })
    it('Verify the Public Groups batch created successfully', async () => {
        await LoginToBBcoms.WaitForBackendPost('sms');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyAllDeliveryMethodMessages(['phone', 'sms', 'email']);
    });

    after('Logout from the application and close the browser', () => {
//         CommonFunction.logOutFromApplication();
        browser.closeWindow();
    });
})