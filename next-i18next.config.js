const path = require('path')

module.exports = {
  i18n: {
    locales: ["ro","en"],
    defaultLocale: "ro",
    localeDetection: false, // asta lasa defaultLocale sa fie ro
    localePath: path.resolve('./public/locales')
  },
  node:{
    fs:'empty'
  }
}