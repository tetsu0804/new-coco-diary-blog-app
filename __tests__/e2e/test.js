module.exports = {
  // 'Signin' : function(browser) {
  //   browser
  //     .url('http://localhost:5000/#/signup')
  //     .pause(3000)
  //     .setValue('#signup-input-1', '吉田')
  //     .setValue('#signup-input-2', 'ここ')
  //     .pause(3000)
  //     .setValue('#signup-input-3', 'coco@test.com')
  //     .setValue('#signup-input-4', 'password')
  //     .setValue('#signup-input-5', 'password')
  //     .pause(3000)
  //     .click('.on-signup-btn')
  //     .pause(3000)
  //     .assert.containsText('.header-user-name', '吉田ここさん')
  //     .pause(3000)
  //     .end()
  // },

  'Login' : function(browser) {
    browser
    .url('http://localhost:5000/#/login')
    .pause(3000)
    .setValue('#login-input-1', 'test@test.com')
    .pause(3000)
    .setValue('#login-input-2', 'password')
    .pause(3000)
    .click('.on-login-btn')
    .pause(3000)
    .assert.containsText('.header-user-name', '吉田哲朗さん')
    .pause(3000)
    .end()
  }
}
