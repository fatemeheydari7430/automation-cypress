/// < reference types = 'cypress'/>


describe('authorizetion', () => {
  it('auth', () => {

    // مرحله ۱: شبیه‌سازی درخواست ارسال پیامک
    cy.intercept('POST', 'https://stage-api.podro.shop/back4front/v3/auth/register?', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          "success": true,
          "data": {
            "life_time": 119680
          }
        },
      });
    }).as('sendCode');

    // مرحله ۲: شبیه‌سازی اعتبارسنجی کد تأیید
    cy.intercept('POST', 'https://stage-api.podro.shop/back4front/v3/auth/register/verify', (req) => {
      expect(req.body.password_token).to.equal('12345'); // کد ثابت برای تست
      req.reply({
        statusCode: 200,
        body: {
          "success": true,
          "data": {
            "refresh_token": "c101e82c-2fd1-4922-bbd3-a125481b9901",
            "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk4NjQyOTMsImp0aSI6IjdkNzFlMWIxLTE1YmUtNGE3OC04NjJhLTRlNmRiNmMzMTM2MSIsImlhdCI6MTczNzgxMjI5Mywic3ViIjoiNDk5IiwiaXNfYWRtaW4iOmZhbHNlLCJ1c2VyX2lkIjo0OTksInByb3ZpZGVyIjoiSU5URVJOQUwiLCJtb2JpbGUiOiI5MTU1MzA3NDMwIiwiY29tcGFueV9pZHMiOlsiZDg2MDY0NGUtNTMzZS00NDZhLTg1NjItYWNiZTUzY2FjZjRkIl0sIm5hbWUiOiI5MTU1MzA3NDMwIn0.ay4nYL7d47G94CZmhmKHpaUsiir4suQePde_HtblqI5S7lT4E5holn5uKbxsrj_30_MjGr4JRrMXPG3z7GtNvym--BiNqMyZZdWR-RRHGFSCYDiFvi20LfDPS8C9x9t2BWPdben5eDMEesGhpFEucJtVYLefA71652vj3EfBMOxqkRUzcaMlqzY7to8_8KahqrZ9_iVvGGr3mSCMGlC4UuYftfinKexiyF-1EHx-_PTVMmwjxSPygJmlPn4fmXPRNn0PEERYrfrUrd028ZIYpZoW2nhfQfRFfp0sIui5ZH00pwcMWIrdI1gNEQvkgbMAuEnbbb_16sAkesw5666OjkzOshmm9rCYV3s9nnaoIJbTp2g9r1RBZvi7KcGt18_nEeSJIeJ6AqoR30xBkF2HzrXzkV3AEOvrBnvVy4Zp9D83-NFEQxMaw0a8c4XRn08IulX_uvtoBG3E8T2zal1r1zGgkuOFtGNAAU9o-i2hKNhv_g41azfVYcwpYEZ0S1Ud__jif5Xl_WbAtqRuKlf0ph0Wn7pChRbPGUOBue-I6t6DI6kFtjbA5N-RSK-uU8P-tYmPKT7uzTdSPy8Ma6-HAFC2ktzLTvgQQbPEEfA-gLMrnQfRmS9ibeGoRhYwgA7auRSJfhainoYW8BGSZrlSLHqwFWQnDy1KsgkWn6N9yHI",
            "expires_at": 1739864293,
            "new_user": false
          }
        },
      });
    }).as('verifyCode');

    // مرحله ۳: انجام فرآیند ورود
    cy.visit('https://stage-panel.podro.shop/auth/register'); // آدرس صفحه ورود

    // وارد کردن شماره موبایل
    cy.get('.MuiInputBase-root').type('9155307430');
    cy.get('.sushi-merchant-cyh12z > .MuiButtonBase-root').click();

    // انتظار برای پاسخ درخواست ارسال کد
    cy.wait('@sendCode');

    // وارد کردن کد تایید
    cy.get('[aria-label="Please enter OTP character 1"]').type('1');
    cy.get('[aria-label="Please enter OTP character 2"]').type('2');
    cy.get('[aria-label="Please enter OTP character 3"]').type('3');
    cy.get('[aria-label="Please enter OTP character 4"]').type('4');
    cy.get('[aria-label="Please enter OTP character 5"]').type('5');

    cy.get('.sushi-merchant-hvwk7f > .MuiButtonBase-root').click();

    // انتظار برای پاسخ اعتبارسنجی کد
    cy.wait('@verifyCode');

    // بررسی ورود موفق
    // cy.wait(20000)
    cy.url().should('include', '/home'); // فرض اینکه کاربر وارد داشبورد می‌شود
    // cy.contains('خوش آمدید!');
  });
});