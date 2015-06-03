# service-error-handling

```javascript
var errorHandling = require('service-error-handling');

express.use(errorHandling({
  mongo: false // convert (some) mongo errors to HTTP codes -- defaults to true
  development: process.env.NODE_ENV !== 'production' // use development errorHandler -- defaults to false
  title: 'My Title!' // custom title for the development-only error page
});
```

errors are rendered with basic content negotiation support (json and html)

in production errors messages are only exposed if err.expose is set to true and a status code and message are provided.
otherwise it defaults to a 500 Internal Server Error.

