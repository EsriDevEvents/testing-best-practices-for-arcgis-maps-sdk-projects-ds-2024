const {Builder, Browser, By, Key, until} = require("selenium-webdriver");

/**
 * A simple script to test the application with Selenium.
 * 
 * Run with "node .\src\selenium_test.js". Requires the Chrome WebDriver.
 */

(async function test() {
    // Initialize the selenium tool
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    // Set a timeout limit for the commands
    await driver.manage().setTimeouts({implicit: 5000});
    try {
        // Open the browser
        await driver.get("http://localhost:3000");

        // Find an element in the application so we can tell if the app has loaded
        let message = await driver.findElement(By.id("clickMessage"));
        await driver.wait(until.elementIsVisible(message));

        // Wait for other elements to come in.
        await driver.actions().pause(5000).perform();
        await driver.actions().clear();

        // Find the map, and click on the center of it
        await driver.findElement(By.tagName("canvas")).click();
        
        // Find the observation text box and enter some text
        let textBox = await driver.findElement(By.id("textInput"));
        await driver.wait(until.elementIsVisible(textBox));
        await textBox.click();
        await textBox.sendKeys("Selenium Test");
        // Click outside the text box so events can fully run
        await driver.findElement(By.tagName("canvas")).click();
        await driver.actions().pause(1000).perform();

        // Click submit
        let submitButton = await driver.findElement(By.id("submitText"));
        await driver.wait(until.elementIsVisible(submitButton));
        await submitButton.click();

        // Wait for sumbition to complete
        await driver.actions().pause(1000).perform();

        // Click the point on the map again to show the popup
        await driver.findElement(By.tagName("canvas")).click();
        await driver.actions().pause(5000).perform();

        // Check that the popup showed up
        let heading = await driver.findElement(By.className("esri-features__heading"));
        await driver.wait(until.elementIsVisible(heading));
        
    } finally {

        // Close the browser
        await driver.quit();
    }
})();