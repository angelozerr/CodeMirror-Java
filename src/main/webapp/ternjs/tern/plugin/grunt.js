(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		return mod(require("../lib/infer"), require("../lib/tern"));
	if (typeof define == "function" && define.amd) // AMD
		return define([ "../lib/infer", "../lib/tern" ], mod);
	mod(tern, tern);
})
		(function(infer, tern) {
			"use strict";

			tern.registerPlugin("grunt", function(server, options) {

				return {
					defs : defs
				};
			});

			var defs = {
				"!name" : "grunt",
				"!define" : {
					Grunt : {
						config : {
							"!doc" : "Access project-specific configuration data defined in the Gruntfile.",
							"!url" : "http://gruntjs.com/api/grunt.config",
							init : {
								"!type" : "fn(configObject: ?)",
								"!doc" : "Initialize a configuration object for the current project.\nThe specified configObject is used by tasks and can be accessed using the grunt.config method.\nNearly every project's Gruntfile will call this method.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.init"
							},
							get : {
								"!type" : "fn(prop?: ?) -> ?",
								"!doc" : "Get a value from the project's Grunt configuration. If prop is specified, that property's value is returned, or null if that property is not defined. If prop isn't specified, a copy of the entire config object is returned. Templates strings will be recursively processed using the grunt.config.process method.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.get"
							},
							process : {
								"!type" : "fn(value?: ?) -> ?",
								"!doc" : "Process a value, recursively expanding <% %> templates (via the grunt.template.process method) in the context of the Grunt config, as they are encountered. this method is called automatically by grunt.config.get but not by grunt.config.getRaw.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.process"
							},
							getRaw : {
								"!type" : "fn(value?: ?) -> ?",
								"!doc" : "Get a raw value from the project's Grunt configuration, without processing <% %> template strings. If prop is specified, that property's value is returned, or null if that property is not defined. If prop isn't specified, a copy of the entire config object is returned.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.getRaw"
							},
							set : {
								"!type" : "fn(prop: ?, value: ?) -> ?",
								"!doc" : "Set a value into the project's Grunt configuration.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.set"
							},
							escape : {
								"!type" : "fn(propString: string) -> string",
								"!doc" : "Escape . dots in the given propString. This should be used for property names that contain dots.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.escape"
							},
							requires : {
								"!type" : "fn(prop: [string]) -> ?",
								"!doc" : "Fail the current task if one or more required config properties is missing, null or undefined. One or more string or array config properties may be specified.",
								"!url" : "http://gruntjs.com/api/grunt.config#grunt.config.requires"
							}
						},
						event : {
							"!doc" : "Even though only the most relevant methods are listed on this page, the full EventEmitter2 API is available on the grunt.event object. Event namespaces may be specified with the . (dot) separator, and namespace wildcards have been enabled.",
							"!url" : "http://gruntjs.com/api/grunt.event",
							on : {
								"!type" : "fn(event: Event, listener: ?)",
								"!doc" : "Adds a listener to the end of the listeners array for the specified event.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.on"
							},
							once : {
								"!type" : "fn(event: Event, listener: ?)",
								"!doc" : "Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.once"
							},
							many : {
								"!type" : "fn(event: Event, timesToListen: number, listener: ?)",
								"!doc" : "Adds a listener that will execute n times for the event before being removed.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.many"
							},
							off : {
								"!type" : "fn(event: Event, listener: ?)",
								"!doc" : "Remove a listener from the listener array for the specified event.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.off"
							},
							removeAllListeners : {
								"!type" : "fn(event: [Event])",
								"!doc" : "Removes all listeners, or those of the specified event.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.removealllisteners"
							},
							emit : {
								"!type" : "fn(event: Event, arg: [?])",
								"!doc" : "Execute each of the listeners that may be listening for the specified event name in order with the list of arguments.",
								"!url" : "http://gruntjs.com/api/grunt.event#grunt.event.emit"
							}
						},
						initConfig : {
							"!type" : "Grunt.config.init",
						},
						task : {
							"!doc" : "Register, run and load external tasks.",
							"!url" : "http://gruntjs.com/api/grunt.task",
							registerTask : {
								"!type" : "fn(taskName: string, taskList: [string])",
								"!doc" : "Register an 'alias task' or a task function. This method supports the following two signatures:",
								"!url" : "http://gruntjs.com/api/grunt.task.registerTask",
							}
						},
						fail : {
							"!doc" : "For when something goes horribly wrong.",
							"!url" : "http://gruntjs.com/api/grunt.fail",
							warn : {
								"!type" : "fn(error: Error, errorcode?: number)",
								"!doc" : "Display a warning and abort Grunt immediately.",
								"!url" : "http://gruntjs.com/api/grunt.fail#grunt.warn",

							},
							fatal : {
								"!type" : "fn(error: Error, errorcode?: number)",
								"!doc" : "Display a warning and abort Grunt immediately.",
								"!url" : "http://gruntjs.com/api/grunt.fail#grunt.fatal",

							}
						}
					}
				},
				grunt : "Grunt"
			}

		});