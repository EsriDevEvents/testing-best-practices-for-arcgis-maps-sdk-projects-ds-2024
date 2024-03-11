const {Builder, Browser, By, Key, until} = require("selenium-webdriver");

(async function test() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({implicit: 5000});
    try {
        await driver.get("http://localhost:3000");
        let message = await driver.findElement(By.id("clickMessage"));
        await driver.wait(until.elementIsVisible(message));
        await driver.actions().pause(5000).perform();
        await driver.actions().clear();

        await driver.findElement(By.tagName("canvas")).click();
        
        let textBox = await driver.findElement(By.id("textInput"));
        await driver.wait(until.elementIsVisible(textBox));
        await textBox.click();
        await textBox.sendKeys("Selenium Test");
        await driver.findElement(By.tagName("canvas")).click();
        await driver.actions().pause(1000).perform();

        let submitButton = await driver.findElement(By.id("submitText"));
        await driver.wait(until.elementIsVisible(submitButton));
        await submitButton.click();

        await driver.actions().pause(1000).perform();

        await driver.findElement(By.tagName("canvas")).click();
        await driver.actions().pause(5000).perform();

        let heading = await driver.findElement(By.className("esri-features__heading"));
        await driver.wait(until.elementIsVisible(heading));
        
    } finally {
        await driver.quit();
    }
})();