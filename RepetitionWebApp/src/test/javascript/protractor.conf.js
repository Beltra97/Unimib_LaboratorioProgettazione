exports.config = {
    allScriptsTimeout: 20000,
    chromeOnly: true,
    chromeDriver:'/usr/local/bin/chromedriver',
    directConnect: true,

    specs: [
        './e2e/admin/**/*.spec.ts',
        './e2e/account/**/*.spec.ts',
        './e2e/entities/my-repetition/*.spec.ts',
        './e2e/entities/repetition/*.spec.ts',
        './e2e/entities/repetition-student/*.spec.ts',
        './e2e/entities/subject/*.spec.ts',
        './e2e/entities/topic/*.spec.ts',
        './e2e/entities/tutor/*.spec.ts',
        /* jhipster-needle-add-protractor-tests - JHipster will add protractors tests here */
    ],

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: process.env.JHI_E2E_HEADLESS
                ? [ "--headless", "--disable-gpu", "--window-size=800,600" ]
                : [ "--disable-gpu", "--window-size=800,600" ]
        }
    },

    directConnect: true,

    baseUrl: 'http://localhost:8080/',

    framework: 'mocha',

    SELENIUM_PROMISE_MANAGER: false,

    mochaOpts: {
        reporter: 'spec',
        slow: 3000,
        ui: 'bdd',
        timeout: 720000
    },

    beforeLaunch: function() {
        require('ts-node').register({
            project: 'tsconfig.e2e.json'
        });
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 1024);
        // Disable animations
        // @ts-ignore
        browser.executeScript('document.body.className += " notransition";');
        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        const chaiString = require('chai-string');
        chai.use(chaiString);
        // @ts-ignore
        global.chai = chai;
    },

    useAllAngular2AppRoots: true
};
