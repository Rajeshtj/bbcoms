// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import setValue from '../../helpers/action/setInputField';
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
const AccountsPageObjects = require('../../pageobjects/AccountsPageObjects.json');
import AccountsFunctions from '../../pages/AccountsFunctions';
import fs = require('fs');
import log from '@wdio/logger';
const logger = log('@automation');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Smore Template Email all', () => {
    const date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    const subject = testData.EmailMessageSubject.concat(`with Existing Smore ${date}`);

    before('Login to the Application as Support User', async() => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Emil and Select Existing Smore', async() => {
        await SmoreFunctions.SelectExistingSmore('Email');
    })

    it('Use Existing News Letter', async() => {
        await clickElement("click", "selector",SendPageObjects.SmoreUseButton);
    })

    it('Preview Smore and send email',async () => {
        await SmoreFunctions.previewAndClose();
        await setValue("set",subject, SendPageObjects.subjectField);
       // await  SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage([subject], false);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
        await browser.pause(1500000);
    });

    it('Verification of scenario related to PEB-6062', async() => {
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
        await AccountsFunctions.searchAccount('Student', 'name', 'Automation');
        await WaitForExist(AccountsPageObjects.SearchResultDiv);
        await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
        await browser.pause(1000);
        await clickElement("click", "selector",AccountsPageObjects.SelectContactsTab);
        await browser.pause(1000);
        await clickElement("click", "selector",(AccountsPageObjects.generatePDFForSmore.replace('{subject}',subject)));
        await browser.pause(10000);

    });

    it('Read the PDF file and display its content', async () => {
        const fileName = await `Student, Automation_${subject}.pdf`;
        const { PdfReader } = await require('pdfreader');
        new PdfReader().parseFileItems(`C:/Users/psridharan/Downloads/${fileName}`, (err, item) => {
            if (err) console.error('error:', err);
            else if (!item) console.warn('end of file');
            else if (item.text) console.log(item.text);
        });
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
