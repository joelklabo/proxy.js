# Simple node.js proxy 

## Use

<pre>
var proxy = require('./proxy.js');
  , sites = [{
    host: 'example.com'
    , port: 8001
  },{
    host: 'anothersite.com'
    , port: 8002
  },{
    host: 'anothernothersite.com'
    , port: 8003
  }];
  
  http.createServer(function(req, res){
    proxy.route(req, res, sites)
  }).listen(80, '127.0.0.1')
</pre>
