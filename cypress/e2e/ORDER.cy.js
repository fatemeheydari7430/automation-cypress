/// < reference types = 'cypress'/>


describe("ORDER", () => {

  beforeEach(() => {

    cy.loginUsingApi()
  })

  let productId;
  let product_variant_id;
  let variant_id;

  it('create product', () => {
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
  });


  // before(() => {

  //   cy.CreateProduct()
  // })



  it('Manual order', () => {


    let myToken = window.localStorage.getItem("Token")

    cy.request({
        method: 'POST',
        url: 'https://stage-api.podro.shop/back4front/scms/baskets',
        headers: {
          Authorization: `Bearer ${myToken}`
        },
        body: {
          "company_id": variant_id,
          "items": [{
            "count": 1,
            "id": productId,
            "name": "order",
            "title": "order",
            "note": "",
            "product_id": productId,
            "product_variant_id": product_variant_id,
            "selected_variant": {
              "id": product_variant_id,
              "price": 10000,
              "price_after_discount": 0,
              "quantity": 0,
              "unlimited_quantity": true,
              "remaining_quantity": null,
              "variants": null
            }
          }],
          "recipient": {
            "full_name": "فاطمه  حیدری",
            "first_name": "فاطمه ",
            "last_name": "حیدری",
            "province": "b2b718f7-8adb-4282-a409-a8afc9d6c9a3",
            "city_code": "2301",
            "address": "۱",
            "mobile": "09155307430",
            "postal_code": "4444444444",
            "location": null,
            "unit": "۳",
            "no": "2"
          }
        }
      })

      .then((response) => {
        expect(response.status).to.eq(201);
      });

  });

});