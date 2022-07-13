/// <reference types="cypress" />

describe("Aggregate api tests", () => {
  before(() => {
    cy.postToken();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.fixture("app_settings").then((app_settings) => {});
  });

  it("POST /Aggregate/get", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        deviceIds: ["af01b2b5-9f05-4d36-a6d0-7cdf05a61430"],
        fromTime: "2022-04-06T13:38Z",
        toTime: "2022-05-06T13:38Z",
        dataType: "pellet_count",
        bucketSize: "01:00:00:00",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0].siteId).to.eq("142");
    });
  });

  it.skip("GET /Aggregate/get", () => {
    cy.request({
      method: "GET",
      url: Cypress.env("apiUrl") + `/aggregate/get/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      qs: {
        fromTime: "2022-04-06T13:38Z",
        toTime: "2022-05-06T13:38Z",
        dataType: "pellet_count",
        bucketSize: "01:00:00:00",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0].siteId).to.eq("142");
    });
  });

  it("POST /Aggregate/get-available-data-types", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get-available-data-types/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        deviceIds: ["af01b2b5-9f05-4d36-a6d0-7cdf05a61430"],
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0]).to.eq("oxy_o2_percent");
      expect(res.body[1]).to.eq("oxy_temp");
      expect(res.body[2]).to.eq("pellet_count");
    });
  });

  it("POST /Aggregate/get/unit", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get/unit`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        fromTime: "2022-04-06T13:38Z",
        toTime: "2022-05-06T13:38Z",
        dataTypes: ["oxy_temp"],
        siteIds: ["142"],
        bucketSize: "01:00:00:00",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0].siteId).to.eq("142");
      expect(res.body[0].items[0].items[0].items[0].averageValue).to.eq(10.604950055493894);
    });
  });

  it("POST /Aggregate/get/multi-type", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get/multi-type`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        fromTime: "2022-04-06T13:38Z",
        toTime: "2022-05-06T13:38Z",
        dataTypes: ["oxy_temp"],
        siteIds: ["148"],
        depth: null,
        depthVariance: 0.5,
        bucketSize: null, //"0.01:00:00",
        unitIds: [],
        feedTypeId: null,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
 
  it.skip("POST /Aggregate/get/get-available-data-types", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get/get-available-data-types`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        fromTime: "2022-04-06T13:38Z",
        toTime: "2022-05-06T13:38Z",
        dataTypes: ["oxy_temp"],
        siteIds: ["148"],
        UnitIds: ["58894"],
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  }); 

  it("POST /Aggregate/get/historical-data", () => {
    cy.api({
      method: "POST",
      url: `/aggregate/get/historical-data`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("identity_token"),
      },
      body: {
        fromTime: "2021-12-01T00:00:00Z",
        toTime: "2022-06-01T00:00:00Z",
        siteId: "148",
        UnitId: "58894",
        DataType: "FeedAmount"
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('companyId');
      expect(res.body).to.have.property('siteId',"148");
      expect(res.body).to.have.property('unitId', "58894");
      expect(res.body).to.have.property('dataType',"FeedAmount");
      expect(res.body).to.have.property('items');
    });
  });

});
