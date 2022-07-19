import LoginToBBcoms from '../../pages/LoginToBBcoms';
import AccountsFunctions from '../../pages/AccountsFunctions';
const data = require('../../../data/env.json');
import { AccountTestData } from '../../../data/AccountsTestCaseData';
import commonFunction from '../../pages/CommonFunctions';
import lighthouse from '../../helpers/action/lighthouse';

describe('Login to the Application as Support User and Create an Account', () => {
    const lastNameWithApostrophe = `Parent's`;
    before('Login to the application as Support User and Navigate to Accounts Menu',async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        const str1 = await Promise.resolve(driver.getUrl());
        const str = await Promise.resolve(driver.getTitle());
        await lighthouse(str1,str);
        //commonFunction.lighthouse();
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
    });
   it ('#SMOKE Create Account without the required fields (Staff ID, First Name, Last Name, School) updated', async () => {     //Alert
        await browser.pause(2000)
        await AccountsFunctions.withoutRequiredFields(AccountTestData.password,AccountTestData.password);
    });

    it('#TEST #SMOKE Create New Account', async () => {
        
        const str1 = await Promise.resolve(driver.getUrl());
        const str = await Promise.resolve(driver.getTitle());
        await lighthouse(str1,str);
        //commonFunction.lighthouse();
        await browser.pause(2000)
        await AccountsFunctions.createAccount(AccountTestData.staffID,AccountTestData.password,AccountTestData.password,AccountTestData.firstName,AccountTestData.lastName,data.qa.orgID.toString());
        await browser.pause(2000)
        await AccountsFunctions.saveCloseAccountwindow();
        
    });
   
    it('#SMOKE Search account by Name', async () => {
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
      
    });
    it('#SMOKE Edit LastName of the created account and Add Phone/SMS/Mail/Email Addresses + Profile Picture', async() => {
        await AccountsFunctions.editAccount();
        await AccountsFunctions.saveCloseAccountwindow();
    });
    it('#SMOKE Download PDF file for the account', async() => {
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.downloadPDFFile();
        await AccountsFunctions.saveCloseAccountwindow();
   });
    it('#SMOKE Remove Phone,SMS,Mail and Email Delivery Addresses', async () => {     //alert 
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.removeAccount();
    });
    it('#SMOKE Again Add Phone, SMS, Mail and Email Delivery Addresses in the created account and Remove it with "Select All" option', async () => { //alert 
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.addAccount();
    });
    it('#SMOKE Edit LastName of the created account with apostrophe', async () => {
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.editLatNameWithApostrophe(lastNameWithApostrophe);
        await AccountsFunctions.saveCloseAccountwindow();

    });
    it('#SMOKE Search account by Name and delete it', async () => {   
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.searchAccountByName();
    });



    

    



   
});