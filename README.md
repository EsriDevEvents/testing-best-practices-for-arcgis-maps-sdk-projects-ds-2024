# Testing Best Practices for ArcGIS Maps SDK Projects

An example project that demonstrates JavaScript testing principles and practices described in the **Automating CI/CD and Testing Best Practices for ArcGIS Maps SDK Projects** talk at the [2024 Esri DevSummit](https://devsummit2024.esri.com/).

This project makes use of the following:

* [Create React App](https://create-react-app.dev/) to setup a general framework for the application.
* [Jest](https://jestjs.io/) for the unit testing framework.
* [Testing Library](https://testing-library.com/) provides some helper functions for testing.
* [Selenium](https://www.selenium.dev/) to script an end-to-end test.
* [ExpressJS](https://expressjs.com/) for a simple backend to simulate server interaction.

## Slides and Recording

A recording and slides of the presentation will be available at a later date. It *should* be uploaded to the [Esri Mediaspace](https://mediaspace.esri.com) after the summit.

## Setup

[NodeJS](https://nodejs.org/) version 20 is required to run this project. It *might* work on other versions.

After cloning the repository, install the dependencies by running the following in a command prompt
in the base directory.

```bash
npm install
```

## Running The Project

Start up the project by running the following in a command prompt:

```bash
npm run start
```

It will take several seconds to start up the web and backend server. The script should also open a
browser window to the site, but you can view the site at http://localhost:3000.

## Unit Testing

Run the project's unit testing by entering the following in a command prompt:

```bash
npm run test
```

This runs the unit tests in interactive watch mode. Enter `a` at the command prompt to re-run the
tests. Enter `q` to exit the test runner. 

## End-To-End Testing

You will need to install the [Chrome webdriver](https://chromedriver.chromium.org/) for Selenium. This allows Selenium to control a
Google Chrome browser for testing. 

After installing the webdriver, enter the following in a command prompt:

```bash
node .\src\selenium_test.js
```

Selenium will open an instance of Chrome for testing. 
