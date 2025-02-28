// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })










Cypress.Commands.add("loginUsingApi", () => {

      // Without Session
      // const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...';
      // cy.window().then((win) => {
      //       win.localStorage.clear();
      //       win.localStorage.setItem("Token", accessToken);
      // });



      // With Session
      // وضعیتی را ذخیره کنید و از آن در چندین تست استفاده کنید
      // cy.session("session", () => {
      //       const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDIzNDk0MjMsImp0aSI6ImY1OGE2NGZlLTQ1NGQtNGEyMi1hZmIwLWEwYzU4OTM4MTAyZSIsImlhdCI6MTc0MDI5NzQyMywic3ViIjoiNTc1IiwiaXNfYWRtaW4iOmZhbHNlLCJ1c2VyX2lkIjo1NzUsInByb3ZpZGVyIjoiSU5URVJOQUwiLCJtb2JpbGUiOiI5MTU1MzA3NDMwIiwiY29tcGFueV9pZHMiOlsiZTI2MDUxNWItZTY5YS00YjMyLTlkMWMtMDI5ZmJhOTEwMTgzIl0sIm5hbWUiOiI5MTU1MzA3NDMwIn0.tz6TsSgZYnN0BtHmxTmQ4M6Q6EnTR_dY02sScM3LrkMdXxEOMmhdfTdEJ8ERIgZx7DI-bljb_vgQwW4uJb1XRc-JtS9Obs6hAaz8s02_G6K-LCjYqcr7HQ1UxA42EJhPLtvvP-dQffCVJ6oJcCkihSintAw3Ab6rx-P6RIEc4_dZRYXYHHY0oy0LK7-w9g2MOILxwpyon2I7UECXKOp2gJPnH2-EFjObzO56GaOsnuPska_HfT1LnCGg_1p-q9BH5l4qppfDtsmSB8FRWNQhiSHtwGeyh4jiKKurGUw8mNhsCEb6zrJW6YhYysC1KYBkTItuJfwgmQSr5wz0piA93Xguv3bQyrVi9fonScDTZyNSj9zgTJB1LBXA-OX5udJqWplY21nk_1kHS5cyQhwSNvmA4NfmlfZMPSE32Dtk-zt7BHN5xrsPRuRsiaVQ82aifaHmC3pik5hYCxCA6-9aGDirz0cdhwf3koq5dRsPmmGM-fcc3OX_xuNIzTREN_p41wL-NBJ7RR7vv_OQOlaNypWFlSzlbEfoxs2Uu_cXxgUAVczwcSeo_hxIbhRvlhc7eVwRijBI9rA_Ue6p0JTDADCKRNSgljORGtk-_SNdIo25sVeeXjIAiAQA5P9b6vebpC_TU3aSpkBDe2Bkpx1LMFuOLOCnToNA98nYUXYIGN4';
      //       window.localStorage.clear()
      //       window.localStorage.setItem("Token", accessToken)
      // }, {
      //       cacheAcrossSpecs: true //اگر در یک فایل session ما create شد در فایل های دیگر هم create شده باشد
      // })
      cy.session("session", () => {
            cy.fixture("cypress.env.json").then((env) => {
                  const accessToken = env.accessToken;
                  window.localStorage.clear();
                  window.localStorage.setItem("Token", accessToken);
            });
      }, {
            cacheAcrossSpecs: true
      });


})

Cypress.Commands.add("logOut", () => {

      window.localStorage.clear()

})

Cypress.Commands.add("CreateProduct", () => {

      let productId;
      let product_variant_id;
      let variant_id;


      let myToken = window.localStorage.getItem("Token")

      cy.request({
                  method: 'POST',
                  url: 'https://stage-api.podro.shop/back4front/scms/products',
                  headers: {
                        Authorization: `Bearer ${myToken}`
                  },
                  body: {
                        "vitrine_id": variant_id,
                        "description": "",
                        "name": "order",
                        "is_active": true,
                        "price": 10000,
                        "price_after_discount": 0,
                        "total_cost": 0,
                        "media": [],
                        "variant_list": {},
                        "weight": 0,
                        "kind": "PHYSICAL"
                  }
            })

            .then((response) => {
                  expect(response.status).to.eq(201);

                  productId = response.body.product_variants[0].product_id;
                  product_variant_id = response.body.product_variants[0].id;
                  variant_id = response.body.product_variants[0].shop_id;


            });

})


Cypress.Commands.add("storefrontAddPro", (Name) => {

      Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
      });

      cy.get('.ProductCard_productName__7rR42').each(($el, index, list) => {
            if ($el.text().includes(Name)) {
                  cy.get('.ProductCard_productImage__qSj9t').eq(index).click();
                  cy.get('[data-test-id="addToCartButton"]').click()
            }
      })


})