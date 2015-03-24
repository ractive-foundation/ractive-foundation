var through = require('through2'),
	gulputil = require('gulp-util'),
	Ractive = require('ractive'),
	marked = require('marked'),
	fs = require('fs'),
	find = require('find'),
	_ = require('lodash'),
	path = require('path'),
	makeHTML = require('json2htmljson2css').makeHTML;

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-concat-documentation';


function renderAttributes(title, options) {
    
      var html = makeHTML([
        {
            tag: 'hr'
        },
        {
            tag: 'h3',
            content: title
        }
        ]);
 
        _.forEach(_.zipObject(_.keys(options), _.values(options)),function(value, key) {
            html += makeHTML([
            {
                tag: 'h4',
                content: key
            },
            {
                tag: 'p',
                content: value
            }
            ]);
        });

        return html;
}

function renderDocumentation() {
	var stream = through.obj(function (file, enc, callback) {

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {

			var pathComponents = file.history[0].split(path.sep),
				componentName = pathComponents.slice(-2)[0];

            var doco = makeHTML([
                {
                    tag: 'h1',
                    content: componentName
                }, {
                    tag: 'br'
                }
            ]);

            doco += marked(String(file.contents));

            var directory = pathComponents.slice(0, -1);

            var interfaceDefinitionFilename = directory.slice(0);
            interfaceDefinitionFilename.push("interface.json");
            interfaceDefinitionFilename = interfaceDefinitionFilename.join(path.sep);

            // load the interface specification
            var interfaceSpecJson = JSON.parse(fs.readFileSync(interfaceDefinitionFilename));

            // document the permitted model fields
            doco += renderAttributes('Semantic Data Model', interfaceSpecJson.data);

  
            // document the events handled
            doco += renderAttributes('Semantic Event Mapping', interfaceSpecJson.events);


            doco += makeHTML([
            {
                tag: 'hr'
            }]);
 
			directory.push('use_cases');
			directory = directory.join(path.sep);

			// iterate over all use cases for the component
            var i = 0;
			doco += _.map(find.fileSync(/.*\.json/, directory), function (usecase) {

				var json = JSON.parse(fs.readFileSync(usecase));

				var componentObj = {
					// rendering component props. key="value"
					tag: componentName,
					attr: _.zipObject(_.keys(json.data), _.values(json.data)),
					content: ''
				};

                // render use case doco
                var component = makeHTML([
                    {
                        tag: 'h2',
                        content: 'Use case: ' + json.title
                    },
                    componentObj,
                    {
                        tag: 'pre',
                        content: [{
                            tag: 'code',
                            content:  _.escape(makeHTML([componentObj]))
                        }]
                    }
                ]).replace(/(\r\n|\n|\r)/gm,'');

                // generate a unique identifier for this use case
                var uniqueid = componentName + i;
                i += 1;
				var html = "<div class=\"panel\" id=\"" + uniqueid + "\"></div>" 
                html += "<script>var " + uniqueid;
                html += " = new Ractive({el: '" + uniqueid + "', data: { eventName: []}, components: RactiveF.components, template: '";
                html += component;
                html += "{{#each eventName}}<div data-alert class=\"alert-box alert round\">{{this}}<a href=\"#\" class=\"close\">&times;</a></div>{{/each}}";
                html += "'});\n";
                html += uniqueid + ".on('*.*', function() { console.log(\"EVENT \" + this.event.component + \".\" + this.event.name ); this.get('eventName').push(this.event.name)});";
                html += "</script>";

                return html;
			}).join('');

			file.contents = new Buffer(doco);

			this.push(file);
		}

		catch (e) {
			console.warn('Error caught: ' + e);
			this.push(file);
			return callback();
		}

		callback();
	});

	return stream;
}


module.exports = renderDocumentation;