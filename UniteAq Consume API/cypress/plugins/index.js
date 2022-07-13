/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const fs = require("fs-extra");
const path = require("path");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const ReportGenerator = require("lighthouse/report/generator/report-generator");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    async lighthouse(allOptions) {
      let txt;
      // calling the function is important
      const lighthouseTask = lighthouse((lighthouseReport) => {
        let lighthouseScoreText = "";
        let lighthouseResult = lighthouseReport?.lhr?.categories;
        let lighthousePerformance = "Performance: " + lighthouseResult?.performance?.score + "\n";
        let lighthouseAccessibility = "Accessibility: " + lighthouseResult?.accessibility?.score + "\n";
        let lighthouseBestPractices = "Best Practices: " + lighthouseResult?.["best-practices"]?.score + "\n";
        let lighthouseSEO = "SEO: " + lighthouseResult?.seo?.score + "\n";
        lighthouseScoreText =
          lighthousePerformance + lighthouseAccessibility + lighthouseBestPractices + lighthouseSEO;

        fs.writeFileSync(
          "cypress/lhreport.html",
          ReportGenerator.generateReport(lighthouseReport.lhr, "html")
        );
        console.log(lighthouseScoreText);
        txt = lighthouseScoreText;
      });

      const report = await lighthouseTask(allOptions);
      // insert the text into the report returned the test
      report.txt = txt;
      return report;
    },
  });
  // accept a configFile value or use development by default
  //cypress run --env configFile=qa
  //cypress run --env configFile=staging
  //cypress run --env configFile=production
  const file = config.env.configFile || "development";
  return getConfigurationByFile(file);
};
