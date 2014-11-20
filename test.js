var casper = require('casper').create({
    clientScripts: [
        'libs/jquery-1.11.1.min.js'
    ]
});

var BASE_URL = "http://socken.staging.wpengine.com";
var CART_URL = BASE_URL+"/cart";
var CHECKOUT_URL = BASE_URL+"/checkout";

//ALP+
casper.start(BASE_URL + "/product/alp-plus/", function() {
	this.echo("Alp+ Page Loaded");
});

//ALP+
casper.then(function() {
	casper.wait(1000, function() {
    	this.click('span[data-value="grey"]');
    	this.click('span[data-value="36-38-en-3"]');
    	this.click('span[data-value="41-43-en-3"]');
    	this.click('.single_add_to_cart_button');
    });
});

casper.then(function() {
	casper.wait(3000, function() {
		this.echo("Added to Cart");
		this.click(".wc-forward");
	});
});

casper.then(function() {
	casper.wait(4000, function() {
		this.echo("Show Cart");
		this.click(".checkout-button");
	});
});

casper.then(function() {
	casper.wait(3000, function() {
		this.echo(this.getTitle());
		this.echo("Checkout Page");
	});
});

casper.then(function($) {
	casper.wait(3000, function() {
		casper.fill('form[name="checkout"]', {
		    'billing_first_name': 'Lukas',
		    'billing_last_name': 'Mairl',
		    'billing_address_1': 'Ahrntalerstr. 41',
		    'billing_postcode': '39032',
		    'billing_city': 'Sand in Taufers',
		    'billing_email': 'lumotion@gmail.com',
		    'billing_phone': '3472371145',
		    'billing_country': 'IT',
		    'billing_state': 'AG',
		});

		var shippingAddressCheckbox = this.evaluate(function() {
        	return __utils__.findOne('#ship-to-different-address-checkbox').getAttribute('checked');
    	});

    	if( shippingAddressCheckbox == "checked" ) {
    		this.click("#ship-to-different-address-checkbox");
    	}

		this.click("#place_order");

	});
});

casper.then(function() {
	casper.wait(3000, function() {
		this.echo(this.getTitle());
		this.capture('confirmation.png');
	});
});

casper.run();