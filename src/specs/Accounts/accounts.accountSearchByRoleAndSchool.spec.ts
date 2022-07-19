import AccountsFunctions from '../../pages/AccountsFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import { expect } from 'chai';


describe('Login to the Application as Support User and view Account', () => {
    before('Login to the application as Support User and Navigate to Accounts Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
    })

    it('#SMOKE View Account', async () => {
        await AccountsFunctions.searchAccount('Parent', '');
        await AccountsFunctions.viewAccount();
    })


})