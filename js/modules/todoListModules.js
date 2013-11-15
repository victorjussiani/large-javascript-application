(function(app){
	
	app.core.define("#todoCounter", function(f){
		var counterElement, counter;

		return {
			init : function(){
				counterElement = f.find("#count");
				counter = 0;

				f.subscribe({"entry-validated" : this.updateCounter});
			},

			destroy : function(){
				counterElement = null;
				f.unsubscribe("update-counter");
			},

			updateCounter : function(){
				console.log(counterElement);
				counter++;
				f.setHTML(counterElement, counter);
			}
		};
	});

	app.core.define("#todoField", function(f){
		var input;

		return {
			init : function(){
				input = f.find("input");

				f.subscribe({"entry-validated" : this.clearField});
			},

			destroy : function(){
				input = null;
				f.unsubscribe("entry-validated");
			},

			clearField : function(){
				f.setVal(input, "");
			}
		}
	});

	app.core.define("#todoEntry", function(f){
		var input, button, lastEntry;

		return {
			init : function(){
				input = f.find("input");
				button = f.find("button");
				lastEntry = 0;

				f.bind(button, "click", this.entryButtonPressed);
				f.bind(input, "keydown", this.keydownPressed);
			},

			destroy : function(){
				f.unbind(button, "click", this.entryButtonPressed);
				f.unbind(input, "keydown", this.keydownPressed);	
				input = button = lastEntry = null;
			},

			entryButtonPressed : function(){
				lastEntry++;

				f.publish({
					type : "new-entry",
					data : {
						value : f.getVal(input),
						id : lastEntry
					}
				});
			},

			keydownPressed : function(event){
				if(event.which == 13){
					this.entryButtonPressed();
				}
			}

		};
	});


	app.core.define("#validate", function(f){

		return {
			init : function(){
				f.subscribe({"new-entry" : this.validateEntry});
			},

			destroy : function(){
				f.unsubscribe("new-entry");
			},

			validateEntry : function(todoItem){
				if(todoItem.value == ""){
					f.publish({
						type : "input-error",
						data : {
							value : "Valor invalido"
						}
					});
				} else {
					f.publish({
						type : "entry-validated",
						data : todoItem
					});
				}
			}
		};
	});

	app.core.define("#error", function(f){
		var errorElement;

		return {
			init : function(){
				errorElement = f.find("#errorMessage");

				f.subscribe({"input-error" : this.showError});
			},

			destroy : function(){
				errorElement = null;
				f.unsubscribe("input-error");
			},

			showError : function(message){
				f.setHTML(errorElement, message.value);
			}
		};
	});

	app.core.define("#todoList", function(f){
		var todoElements;

		return {
			init : function(){
				todoElements = f.find("ul");

				f.subscribe({"entry-validated" : this.addItem});
			},

			destroy : function(){
				todoElements = null;
				f.unsubscribe("entry-validated");
			},

			addItem : function(todoItem){

				var entry = f.createElement("li", {
					id : todoItem.id,
				});

				var span = f.createElement("span", {}, entry);

				f.addClass(span, "item_name");
				f.addClass(entry, "todo_entry");
				f.setHTML(span, todoItem.value);

				f.append(todoElements, entry);
			}
		};
	});

	app.core.startAll();
})(app);