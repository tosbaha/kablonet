var path = require("path");

/**
 * POST /KullaniciService.svc/sorgKampanyaBilgileri
 *
 * key: b2b9aae1-baee-4981-a078-6434358bfd25
 * accept: * / *
 * accept-language: tr-tr
 * user-agent: Kablo/2.0.5 CFNetwork/889.9 Darwin/17.2.0
 * host: m.turksatkablo.com.tr
 * accept-encoding: gzip, deflate
 * content-type: application/json
 * content-length: 2
 * connection: close
 */

module.exports = function (req, res) {

  res.statusCode = 200;
  const mocString = JSON.stringify(require('../fixtures/kampanyalar'));

  res.setHeader("cache-control", "private");
  res.setHeader("content-type", "text/html");
  res.setHeader("server", "Microsoft-IIS/7.5");
  res.setHeader("x-aspnet-version", "4.0.30319");
  res.setHeader("x-powered-by", "ASP.NET");
  res.setHeader("date", "Fri, 23 Feb 2018 19:04:55 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(mocString);
  res.end();

  return __filename;

};
