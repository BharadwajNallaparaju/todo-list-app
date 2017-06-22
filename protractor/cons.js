exports.config = {
  //seleniumAddress: 'http://localhost:4200/wd/hub',
  // Setting the parameters to use chromedriver.exe for running the script
  directConnect: true,
  chromedriver: '/Users/307953/node_modules/chromedriver/lib/chromedriver/chromedriver',



  // Capabilities to be passed to the webdriver instance.

  multiCapabilities: [{
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['start-maximized', 'disable-infobars'],
      },
    },
    /* {
         'browserName':'firefox'
    },*!/*/
  ],

  onPrepare: function() {
    var specReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new specReporter({
      displayStacktrace: 'all'
    }));

    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
    jasmine.getEnv().addReporter(new function() {
      this.specDone = function(result) {
        if (result.failedExpectations.length > 1) {
          var list = result.failedExpectations
            .reduce(function(acc, expectation) {
              return acc + expectation.message + '\n';
            }, '');

          allure.createAttachment('Failed Expectations', function() {
            return list
          }, 'text/plain')();
        }
      };
    });
    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment('Screenshot', function() {
          return new Buffer(png, 'base64');
        }, 'image/png')();
        done();
      });
    });

    console.log('Deleting old allure reports and files.');
    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
      console.log(stdout);
    }

  },

  allScriptsTimeout: 3000000,

  // Spec patterns are relative to the current working directory when
  // Protractor is called.

  suites: {

    todo: './todo.spec.js'

  },

  baseUrl: 'http://localhost:4200/',

  rootElement: 'body',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 2400000
  },




  onComplete: function() {
    generate_report();
  }
};

function generate_report() {
  console.log('Generating allure reports from xml using maven plugin');
  var exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("mvn site -Dallure.results_pattern=allure-results", puts);
  var startTimes = Date.now();
  while (Date.now() - startTimes < 60000) {}
}