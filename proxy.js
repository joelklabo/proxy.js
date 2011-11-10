var http  = require('http')
  , proxiedRequest
  , client;

// Proxy the request
function proxy (host, port, req, res) {
  var client = http.createClient(port, host);
  proxiedRequest = client.request(req.method, req.url, req.headers)
}

// Check the headers to see if request is for on of the sites in the
// sites array. If they match proxy the request
exports.route = function (req, res, sites) {
  var host = req.headers.host;
  sites.forEach(function(site){
    if (host == site.host || host == 'www.' + site.host) {
      proxy(site.host, site.port, req, res)
      addListeners(proxiedRequest, req, res)
    }
  })
}

// Add the listeners to the proxied request
function addListeners (proxiedRequest, req, res) {
  proxiedRequest.addListener('response', function (response) {
    response.addListener('data', function (chunk) { res.write(chunk, 'binary') })
    response.addListener('end', function () { res.end() })
    res.writeHead(response.statusCode, response.headers)
  })
  req.addListener('data', function (chunk) { proxiedRequest.write(chunk, 'binary') })
  req.addListener('end', function (end) { proxiedRequest.end() })
}  
