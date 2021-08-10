/* eslint-disable */
/// <reference types="cypress" />

context("Verify endpoints", () => {
  beforeEach(() => {
    //cy.visit('https://api.spacexdata.com/v3')
  });

  it("Verify GET all capsul", () => {
    cy.request("https://api.spacexdata.com/v3/capsules").then((response) => {
      expect(response).to.have.property("status", 200);
      expect(response.body.length).to.equal(19);
      expect(response.body.capsule_serial).to.not.be.null;
      console.log(response.body);
      // Cypress._.each(response.body, (list) => {
      //   expect(list.missions.name).to.not.be.null;
      // });
    });
  });

  it("Verify GET one capsul", () => {
    cy.fixture("c112_details").then(function (c112_details) {
      cy.request("https://api.spacexdata.com/v3/capsules/C112").then(
        (response) => {
          expect(response).to.have.property("status", 200);
          expect(response.body.capsule_serial).to.not.be.null;
          //console.log(response.body);
          expect(response.body).has.property("capsule_id", "dragon1");
          expect(response.body).has.property("capsule_serial", "C112");

          response.body.missions.forEach((missions, index) => {
            expect(response.body.missions[index]).has.property(
              "name",
              c112_details.missions[index].name
            );
          });
        }
      );
    });
  });

  it("Verify GET upcoming capsule ", () => {
    cy.request("https://api.spacexdata.com/v3/capsules/upcoming").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.eq(3);
      expect(response.body[0].status).to.be.equal('active');
    });
  });

  it("Verify GET past capsule", () => {
    cy.request("https://api.spacexdata.com/v3/capsules/past?limit=5").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.eq(5);
      expect(response.body[0].status).to.be.equal('retired');
      expect(response.body[0]).has.property("status", "retired");
  });
  });
});
