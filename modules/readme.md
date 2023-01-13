# Modules
Flexible, single-purpose and time-saving. I'd hope that at least one of those words could be used to describe any module in this directory.

These modules *must* include a `index.js` file as a child of the parent directory. This ensures that the module can be included as the directory, instead of a direct path to a particular file.
 
### Including a module, an example
```javascript
const route = require( `${ process.cwd() }/modules/route` ); 
```


