import ImportsCommonFunctions from '../../pages/ImportsFunctions';
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';

describe('Login to the Application as Support User and Add Data Source', () => {
    before('Login to the application as Support User and Navigate to Import Menu', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await browser.pause(5000);
        await browser.refresh();
        if (!$(HomePageObjects.Menus.ImportsMenu.xpath).isClickable()) {
            await WaitForExist(HomePageObjects.WarningHeader);
            await ImportsCommonFunctions.MoveAndClick(HomePageObjects.warningClose);
        }
        await LoginToBBcoms.navigateToPages('Imports');
    })

    it('Demographic Imports Creation and Running the Demographic Import', async () => {
        await ImportsCommonFunctions.CreateDataSourceForDemographic();
        await ImportsCommonFunctions.CreateDataImports('Demographic')
        await ImportsCommonFunctions.RunImports('Demographic', 'Imports');
        await browser.closeWindow();
    })
})

