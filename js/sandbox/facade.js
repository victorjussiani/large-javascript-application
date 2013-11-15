(function(app){

	app.f = {
		define : function(core, moduleId){

			var core = app.core,
			dom = core.dom,
			mediator = core.mediator,
			moduleElement = dom.query(moduleId);

			return {
				publish : function(e){
					mediator.trigger(e);
				},

				subscribe : function(e){
					mediator.register(e, moduleId);
				},

				unsubscribe : function(e){
					mediator.remove(e, moduleId);
				},

				find : function(selector){
					return dom.query(selector);
				},

				bind : function(element, eventType, fn){
					dom.bind(element, eventType, fn);
				}, 

				unbind : function(element, eventType, fn){
					dom.unbind(element, eventType, fn);
				},

				setHTML : function(element, html){
					dom.setHTML(element, html);
				},

				getHTML : function(element){
					return dom.getHTML(element);
				},

				setVal : function(element, value){
					dom.setValue(element, value);
				},

				getVal : function(element){
					return dom.getValue(element);
				},

				createElement : function(tag, attrs, referenceNode){
					return dom.create(tag, attrs, referenceNode);
				},

				addClass : function(element, clazz){
					return dom.addClass(element, clazz);
				},

				removeClass : function(element, clazz){
					return dom.removeClass(element, clazz);
				},

				append : function(reference, element){
					dom.append(reference, element);
				}
			};
		}
	};


})(app);