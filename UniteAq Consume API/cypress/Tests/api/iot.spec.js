/// <reference types="cypress" />

describe("IOT api tests", () => {
    before(() => {
      cy.postToken();
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.fixture("app_settings").then((app_settings) => {});
    });
  
    it("POST /iot/get", () => {
      cy.api({
        method: "POST",
        url: `/iot/get/`,
        qs: {
            includeDevice: true,
          },
        headers: {
          authorization: "Bearer " + localStorage.getItem("identity_token"),
        },
        body: {
            "siteIds":["147","144","148","3190","143","137","138","142","145","140","141","146","150","3193","139","151"],
            "dataTypes":["depth","oxy_o2_percent","oxy_temp","sal_salinity","Intensity","pellet_count","FeedAmount"]
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        //expect(res.body[0].siteId).to.eq("142");
      });
    });

    it("POST /iot/get/feeding-status", () => {
        cy.api({
          method: "POST",
          url: `/iot/get/feeding-status`,
          qs: {
              includeDevice: true,
            },
          headers: {
            authorization: "Bearer " + localStorage.getItem("identity_token"),
          },
          body: {
            fromTime: "2021-12-01T00:00:00Z",
            toTime: "2022-06-01T00:00:00Z",
            siteIds: ["148"],
            UnitIds: ["58894"],
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          //expect(res.body[0].siteId).to.eq("142");
        });
      });
    
      it("POST /iot/get/by-datatype", () => {
        cy.api({
          method: "POST",
          url: `/iot/get/by-datatype`,
          qs: {
              includeDevice: true,
            },
          headers: {
            authorization: "Bearer " + localStorage.getItem("identity_token"),
          },
          body: {
            fromTime: "2021-12-01T00:00:00Z",
            toTime: "2022-06-01T00:00:00Z",
            siteIds: "148",
            dataTypes: ["oxy_temp"],
            UnitId: "58894",
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
        });
      });

  });
  