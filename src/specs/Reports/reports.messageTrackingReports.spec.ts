import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import ReportsFunctions from '../../pages/ReportsFunctions';
const ReportsPageObjects = require('../../pageobjects/ReportsPageObjects.json');

describe('All Report Generate, Email and Download as a support user', () => {
    before('Login to the Application as Support user', async () => {
        await LoginToBBcoms.openBBCommsURL(data.qa.url);
        await browser.maximizeWindow()
        await LoginToBBcoms.login(data.qa.supportUserName,data.qa.supportPassword);
        await browser.pause(5000);
        await browser.refresh();
    });


    it('#SMOKE Generate, Email and Download MessageTracking Report', async() => {
        ReportsFunctions.GEDReport(ReportsPageObjects.MessageTrackingReportButton, 'MessageTracking', 'true');
    });

    after('Logout from the application and close the browser', () => {
    //         CommonFunction.logOutFromApplication();
            browser.closeWindow();
    })
});