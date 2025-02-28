/// < reference types = 'cypress'/>


describe("PRODUCT", () => {

    beforeEach(() => {
        cy.loginUsingApi()
    })

    let productId
    let variantId
    let product_variant_id
    let variantId_v
    let product_variant_id_v


    it('create product', () => {
        let myToken = window.localStorage.getItem("Token")

        cy.request({
                method: 'POST',
                url: 'https://stage-api.podro.shop/back4front/v3/merchant/products',
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
                body: {
                    "name": "p.1",
                    "description": "<p>توضیحات تستی</p>",
                    "is_active": true,
                    "label_ids": [
                        "2cfe2607-d113-439d-98f6-ef49dac358a4"
                    ],
                    "medias": [{
                            "path": "/podro-staging/companies/1f0f3c7d-cd55-4eeb-987f-33e88cdcb7d1.png",
                            "mime": "image/jpeg",
                            "is_hidden": false
                        },
                        {
                            "path": "/podro-staging/companies/90a5ba01-6913-4848-aaed-7d5c1159e030.png",
                            "mime": "image/jpeg",
                            "is_hidden": false
                        }
                    ],
                    "product_variants": [{
                            "variant_definition_indexes": [
                                0,
                                2
                            ],
                            "is_active": true,
                            "price": 20000,
                            "price_after_discount": 10000,
                            "quantity": -1,
                            "weight": 5,
                            "unLimitedQuantity": true
                        },
                        {
                            "variant_definition_indexes": [
                                0,
                                3
                            ],
                            "is_active": true,
                            "price": 30000,
                            "price_after_discount": 0,
                            "quantity": 2,
                            "weight": 4,
                            "unLimitedQuantity": false
                        },
                        {
                            "variant_definition_indexes": [
                                1,
                                2
                            ],
                            "is_active": true,
                            "price": 35000,
                            "price_after_discount": 30000,
                            "quantity": 4,
                            "weight": 0,
                            "unLimitedQuantity": false
                        },
                        {
                            "variant_definition_indexes": [
                                1,
                                3
                            ],
                            "is_active": false,
                            "price": 40000,
                            "price_after_discount": 0,
                            "quantity": -1,
                            "weight": 0,
                            "unLimitedQuantity": true
                        }
                    ],
                    "variant_definitions": [{
                            "key": "رنگ",
                            "value": "red",
                            "index": 0
                        },
                        {
                            "key": "رنگ",
                            "value": "blue",
                            "index": 0
                        },
                        {
                            "key": "سایز",
                            "value": "m",
                            "index": 1
                        },
                        {
                            "key": "سایز",
                            "value": "s",
                            "index": 1
                        }
                    ]
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                debugger
            });


        cy.request({
                method: 'GET',
                url: 'https://stage-api.podro.shop/back4front/v2/merchant/products/list?page_size=50&page=1&unavailable=false&available=false',
                headers: {
                    Authorization: `Bearer ${myToken}`
                },

            })
            .then((response) => {
                expect(response.status).to.eq(200);

                productId = response.body.products.items[0].id
                // debugger
            });
    });


    it('read product', () => {
        let myToken = window.localStorage.getItem("Token")

        cy.request({
                method: 'GET',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                debugger
            });

    });


    it('update product', () => {
        let myToken = window.localStorage.getItem("Token")

        cy.request({
                method: 'PATCH',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
                body: {
                    "name": "p.update.1",
                    "description": "<p>توضیحات تستی</p>",
                    "is_active": true,
                    "media_items": [{
                            "path": "/podro-staging/companies/90a5ba01-6913-4848-aaed-7d5c1159e030.png",
                            "mime": "image/jpeg"
                        },
                        {
                            "path": "/podro-staging/companies/7cbb92b9-83ed-4e54-b30d-b34efeff677e.png",
                            "mime": "image/jpeg"
                        }
                    ],
                    "label_ids": []
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                debugger
            });

        cy.request({
                method: 'GET',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                variantId = response.body.data.variants_group_by_key[0].variants
                // debugger
            });
    });


    it('update variants(T)', () => {
        let myToken = window.localStorage.getItem("Token")

        cy.request({
                method: 'DELETE',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants?ids=${variantId[0].id}`, //,${variantId[1].id}
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                // debugger
            });

        cy.request({
                method: 'POST',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
                body: {
                    "variants": [{
                        "key": "رنگ",
                        "value": "yellow"
                    }]
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                // debugger
            });

        cy.request({
                method: 'GET',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);

                product_variant_id = response.body.data.product_variants
                // debugger
            });


        cy.then(() => {

            cy.request({
                    method: 'PUT',
                    url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants`,
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    },
                    body: {
                        "variants": [{
                                "product_variant_id": product_variant_id[0].id,
                                "price": 35000,
                                "price_after_discount": 30000,
                                "quantity": 4,
                                "weight": 0,
                                "is_active": true
                            },
                            {
                                "product_variant_id": product_variant_id[1].id,
                                "price": 40000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": false
                            },
                            {
                                "product_variant_id": product_variant_id[2].id,
                                "price": 27000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            },
                            {
                                "product_variant_id": product_variant_id[3].id,
                                "price": 62000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            }
                        ]
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    debugger
                });

        });
    });


    it('update variants(v)', () => {
        let myToken = window.localStorage.getItem("Token")

        cy.request({
                method: 'GET',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);

                variantId_v = response.body.data.variants_group_by_key
                // debugger
            });


        cy.then(() => {

            cy.request({
                    method: 'DELETE',
                    url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants?ids=${variantId_v[1].variants[0].id},${variantId_v[1].variants[1].id}`,
                    headers: {
                        Authorization: `Bearer ${myToken}`,
                    },
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    debugger
                });

        });


        cy.request({
                method: 'POST',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
                body: {
                    "variants": [{
                            "key": "رنگ",
                            "value": "blue"
                        },
                        {
                            "key": "رنگ",
                            "value": "yellow"
                        },
                        {
                            "key": "جنس",
                            "value": "نخی"
                        },
                        {
                            "key": "جنس",
                            "value": "کتان"
                        }
                    ]
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                debugger
            });


        cy.request({
                method: 'GET',
                url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200);

                product_variant_id_v = response.body.data.product_variants
                debugger
            });


        cy.then(() => {

            cy.request({
                    method: 'PUT',
                    url: `https://stage-api.podro.shop/back4front/v3/merchant/products/${productId}/variants`,
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    },
                    body: {
                        "variants": [{
                                "product_variant_id": product_variant_id_v[0].id,
                                "price": 10000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            },
                            {
                                "product_variant_id": product_variant_id_v[1].id,
                                "price": 20000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            },
                            {
                                "product_variant_id": product_variant_id_v[2].id,
                                "price": 30000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            },
                            {
                                "product_variant_id": product_variant_id_v[3].id,
                                "price": 40000,
                                "price_after_discount": 0,
                                "quantity": -1,
                                "weight": 0,
                                "is_active": true
                            }
                        ]
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    debugger
                });

        });
    });


    it('delete product', () => {
        let myToken = window.localStorage.getItem("Token")


        cy.request({
                method: 'DELETE',
                url: `https://stage-api.podro.shop/back4front/scms/products/${productId}`,
                headers: {
                    Authorization: `Bearer ${myToken}`
                },
            })

            .then((response) => {
                expect(response.status).to.eq(204);
            });

    });


});