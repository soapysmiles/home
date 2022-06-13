# Shared includes (inc_shr)
The files and services defined here are designed to be shared among
the frontend & backend services. It has a similar use-case to `include/`

#Directory Extensions
Directory extensions are used to define what a directory holds

## `.mod`
If a directory has the `.mod` extension, the directory is a module. These modules must be self-sufficient.
### Rules of a `.mod`
- they must not use global variables (config files) directly.
  - They, can of course have variables passed in and saved by the module itself. For example, I may have a setter function in the module to assign a value to a module-specific value. 
- _todo_...

These modules *must* include a `index.js` file as a child of the parent directory. This ensures that the module can be included as the directory, instead of a direct path to a particular file. 
### Including a module, an example
```javascript
const route = require( `${ process.cwd() }/inc_shr/route.mod` ); 
```


