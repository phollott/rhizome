/**
 * Add partial currying to the prototype for Function.
 * Arguments which are "undefined" can be added to the curried
 * function after the fact; hence partial currying
 */
Function.prototype.partial = function() {
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function(){
	  var arg = 0;
	  for ( var i = 0; i < args.length && arg < arguments.length; i++ )
		if ( args[i] === undefined )
		  args[i] = arguments[arg++];
	  return fn.apply(this, args);
	};
};

/**
 * Add very simple subclassing to the prototype for Function.
 */
Function.prototype.subclass= function(base) {
    var c= Function.prototype.subclass.nonconstructor;
    c.prototype= base.prototype;
    this.prototype= new c();
};
Function.prototype.subclass.nonconstructor= function() {};