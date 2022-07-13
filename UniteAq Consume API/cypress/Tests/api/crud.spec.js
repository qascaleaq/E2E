/// <reference types="cypress" />

describe("Crud api tests", () => {
    before(() => {
      cy.postToken();
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.fixture("app_settings").then((app_settings) => {});
    });
  
    it("POST /crud/get", () => {
      cy.api({
        method: "POST",
        url: `/crud/get/`,
        headers: {
          authorization: "Bearer " + localStorage.getItem("identity_token"),
        },
        body: {
          dataType: "FeedAmount",
          deviceId: "db903f78-a8e6-4b5b-9bbb-055bc5e4d760",
          pageSize: 1,
          siteId: "3586",
          unitId: "58879",
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        //expect(res.body[0].siteId).to.eq("142");
      });
    });

    it("POST /crud/count", () => {
        cy.api({
          method: "POST",
          url: `/crud/count/`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("identity_token"),
          },
          body: {
              "deviceIds":["db903f78-a8e6-4b5b-9bbb-055bc5e4d760"],
              "dataTypes":["FeedAmount"],
              "siteIds":["3586"],
              "unitIds":["58879"]},
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.total).to.eq(21);
        });
      });

      it("POST /crud/mark set to false", () => {
        cy.api({
          method: "POST",
          url: `/crud/mark/`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("identity_token"),
          },
          body: {
              "status":false,
              "ids":["zlBY-oAB0xlMnNjABy0_"]},
        }).then((res) => {
          expect(res.status).to.eq(200);
          //expect(res.body.total).to.eq(21);
        });
      });  

      it.only("POST /crud/mark set to true", () => {
        cy.api({
          method: "POST",
          url: `/crud/mark/`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("identity_token"),
          },
          body: {
              "status":true,
              "ids":["zlBY-oAB0xlMnNjABy0_"]},
        }).then((res) => {
          expect(res.status).to.eq(200);
          //expect(res.body.total).to.eq(21);
        });

        cy.api({
            method: "POST",
            url: `/crud/get/`,
            headers: {
              authorization: "Bearer " + localStorage.getItem("identity_token"),
            },
            body: {
              dataType: "FeedAmount",
              deviceId: "db903f78-a8e6-4b5b-9bbb-055bc5e4d760",
              pageSize: 1,
              siteId: "3586",
              unitId: "58879",
            },
          }).then((res) => {
            expect(res.status).to.eq(200);
            //expect(res.body[0].siteId).to.eq("142");
          });
      });


  });
  