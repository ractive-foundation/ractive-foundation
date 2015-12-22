# NAME

ractiveParse - parse individual templates/object files to create concatenated files of ractive objects.

# SYNOPSIS

```javascript
gulp.task('ractive-parse-template', function() {
  return gulp.src('src/**/*.hbs')
    .pipe(ractiveParse({
      // is parsing for a template or not
      template: true,
      // the object that the parasing is updating
      prefix: 'Ractive.partials',
      // A function to determine the name of the object
      objectName: function(file) {
        // return from file.history[0] the template name
        return ...
      }
    })
    .pipe(gule.dest('somewhere.js'));
});
```

# DESCRIPTION

The ractiveParse gulp plugin allows the construction of combined Ractive
elements: components, templates and plugins

## ractiveParse

The ```ractiveParse``` function takes an object parameter with the following options:

* template - flags if the file to be passed is a template or not
* prefix - This is the string describing where the object is to be added.
Note: plugins don't need to specify a prefix as they are detected via their manifest.json file.
Some examples:
  * Ractive.defaults.templates - Add template to default tempalates
  * Ractive.components - Add to global components
  * Ractive.partials - Add template to partials
* objectName - supply a function to determine the name of the object (a default function determines
the name of the object ../some/file/*name*/file.js)

