var path = require("path");

/**
 * POST /KullaniciService.svc/sorgulaKullaniciGiris/1234567
 *
 * sifre: 11111111111111111111111111111111
 * accept: * / *
 * secim: musteriID
 * accept-language: tr-tr
 * user-agent: Kablo/2.0.5 CFNetwork/889.9 Darwin/17.2.0
 * host: m.turksatkablo.com.tr
 * accept-encoding: gzip, deflate
 * content-length: 0
 * connection: close
 */

module.exports = function (req, res) {

  res.statusCode = 200;
  const mocString = JSON.stringify(require('../fixtures/login'));

  res.setHeader("cache-control", "private");
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("server", "Microsoft-IIS/7.5");
  res.setHeader("x-aspnet-version", "4.0.30319");
  res.setHeader("x-powered-by", "ASP.NET");
  res.setHeader("date", "Fri, 23 Feb 2018 18:56:34 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));
  res.write(mocString);
  res.end();
  return __filename;

};
