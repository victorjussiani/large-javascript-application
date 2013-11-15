(function(app){

	app.core = (function(){
		var modules = {};

		return {
			define : function(moduleId, constructor){
				if(typeof moduleId == "string" && typeof constructor == "function"){
					var module = constructor(app.f.define(this, moduleId));

					if(module.init && typeof module.init == "function" && module.destroy && typeof module.destroy == "function"){
						modules[moduleId] = {
							define : constructor,
							instance : null
						};
					} else {
						app.core.throwError(1, 	"Module " + id + "registration failed. Instance cannot be initialized");
					}
				} else {
					app.core.throwError(1, 	"Module " + id + "registration failed. Instance cannot be initialized");
				}
			},

			start : function(moduleId){
				var module = modules[moduleId];
				module.instance = module.define(app.f.define(this, moduleId));
				module.instance.init();
			},

			startAll : function(){
				for(var moduleId in modules){
					if(modules.hasOwnProperty(moduleId)){
						this.start(moduleId);
					}
				}
			},

			stop : function(moduleId){
				var module = modules[moduleId];
				if(module && module.instance){
					module.instance.destroy();
					module.instance = null;
				}
			},

			stopAll:function(){
				for(var moduleId in modules){
					if(modules.hasOwnProperty(moduleId)){
						this.stop(moduleId);
					}
				}
			},

			throwError : function(type, message){
				throw message;
			},

			events : {

				register : function(events, moduleId){
					if(!app.core.dom.isObject(events) || !moduleId || typeof moduleId != "string"){
						app.core.throwError(1, "Events registration failed. Invalid arguments");
					} else {
						if(modules[moduleId]){
							modules[moduleId].events = events;
						} else {
							app.core.throwError(1, "Events registration failed. Module " + moduleId + " is not initialized");
						}
					}
				}, 

				trigger : function(events){
					if(!app.core.dom.isObject(events)) app.core.throwError(1, "Events trigger failed. Invalid arguments");
					else {
						for(var module in modules){
							if(modules.hasOwnProperty(module)){
								module = modules[module];
								if(module.events && module.events[events.type]){
									module.events[events.type](events.data);
								}
							}
						}
					}
				},

				remove : function(ev, moduleId){
					if(app.core.dom.isObject(ev) && module && (module = data[module]) && module.events){
						delete module.events;
					}
				}
			},

			dom : {

				query : function(selector, context){
					var elements, that = this;

					if(context && context.find){
						elements = context.find(selector);
					} else {
						elements = app.core.dom.$(selector);
					}

					return elements;
				}, 

				bind : function(element, event, fn){
					if(element && event && fn){
						app.core.dom.$(element).bind(event, fn);
					}
				},

				unbind : function(element, event, fn){
					if(element && event && fn) {
						app.core.dom.$(element).unbind(event, fn);
					} else if (element, event){
						app.core.dom.$(element).unbind(event);
					} else {
						app.core.dom.$(element).unbind();
					}
				},

				attr : function(element, attr){
					if(element && attr){
						app.core.dom.$(element).attr(attr);
					}
				},

				css : function(element, properties){
					if(element && properties){
						app.core.dom.$(element).css(properties);
					}
					return element;
				}, 

				ajax : function(options){
					return jQuery.ajax(options);
				},

				create : function(tag, attrs, referenceNode){
					if(tag){
						var element = jQuery("<" + tag + ">");

						if(attrs){
							element.attr(attrs);
						}
						if(referenceNode){
							element.appendTo(referenceNode);
						}
						return element;
					}
					return null;
				},

				setValue : function(element, value){
					app.core.dom.$(element).val(value);
				},

				getValue : function(element){
					return app.core.dom.$(element).val();
				},

				setHTML : function(element, html){
					app.core.dom.$(element).html(html);	
				},

				getHTML : function(element){
					return app.core.dom.$(element).html();
				},

				addClass : function(element, clazz){
					var element = app.core.dom.$(element);
					return element.addClass(clazz);
				},

				removeClass : function(element, clazz){
					var element = app.core.dom.$(element);
					return element.removeClass(clazz);
				},

				append : function(reference, element){
					app.core.dom.$(reference).append(element);
				},

				$ : function(args){
					return jQuery(args);
				},

				isArray:function(arr){
					return jQuery.isArray(arr);
				},

				isObject:function(obj){
					return jQuery.isPlainObject(obj);
				}
			},

			getModules : function(){
				return modules;
			}
		};

	})();

})(app);
