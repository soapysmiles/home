# ! WARN !
# Outdated
# ! WARN !

#Config

Files here determine the configuration for the whole service.
Configurations in the files use module.exports = {}

These config variables are stored in JS global. The filename determines where the variable is stored.
For example, let's make a simple file: `config.test.js`. Let's say the contents of this file are:
```javascript
module.exports = {
   //Also include an explaination of the variable's uses
   //Just a test variable, used only for testing 
   test_variable: 'Hello World!'
};
```

Now, to reference this variable, in another file in the codebase it might access it as:
```javascript
console.log( global.test.test_variable );  
//-> Hello World!
```

## Secrets
Sometimes we want to keep configurations from being shown on github & want them to either be secret or set up separately for individual servers
In this case we'd name the file `config.secret_test.local.js`.
This `.local.` means git ignores the file. However, doing this, we lost an advantage - the ability to see how a config should be 
set up. Therefore, for every `.local.` configuration, there should be a `.sample.` 
also set up. For the above example of `config.secret_test.local.js`, we'd have a sample file of: `secret_test.sample.js`. Note it omits `config.` in the name.

This file would describe the variables which are needed in the `.local` file, but would have dummy-example values set. Example:
```javascript
module.exports = {
    //Also include an explaination of the variable's uses
    secret: '123'
}
```
