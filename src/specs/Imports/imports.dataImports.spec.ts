import ImportsCommonFunctions from '../../pages/ImportsFunctions';
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
const ImportsPageObjects = require('../../pageobjects/ImportsPageObjects.json');
import { ImportsTestData } from '../../../data/ImportsTestCaseData';
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

    it('DataSource Creation', async () => {
        await WaitForExist(ImportsPageObjects.DataSourceForm);
        await ImportsCommonFunctions.CreateDataSource(ImportsTestData.SmokeDataSourceType);
    })

    it('Data Imports Creation and Running the Data Import', async () => {
        await WaitForExist(ImportsPageObjects.ImportsForm);
        await ImportsCommonFunctions.CreateDataImports(ImportsTestData.SmokeDataSourceType)
        await ImportsCommonFunctions.RunImports(ImportsTestData.SmokeDataSourceType, 'Imports');
    })

})

