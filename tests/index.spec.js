var app = require('../app'),
	expect = require('expect.js');

// test url - this has alot of OG info
var options1 = {
	'url': 'http://ogp.me/'
};

// test url formats
var	options2 = {
		'url': 'http://www.google.com/'
	},
	options3 = {
		'url': 'https://www.google.com/'
	},
	options4 = {
		'url': 'www.google.com/'
	},
	options5 = {
		'url': 'google.com/'
	},
	options6 = {
		'url': 'http://google.com/'
	};

// invaild url
var options7 = {
	'url': 'http://testtesttest4564568.com'
};

// empty value
var optionsNoUrl = {
	'url': ''
};

// no url
var optionsEmpty = { };

// test timeout
var options8 = {
		'url': 'http://www.google.com/',
		'timeout': 2000
	},
	options9 = {
		'url': 'http://www.google.com/',
		'timeout': ''
	},
	options10 = {
		'url': 'http://www.google.com/',
		'timeout': '2000'
	},
	options11 = {
		'url': 'http://www.google.com/',
		'timeout': 'sdsdds'
	};

// some bad urls
var options12 = {
		'url': 23233
	},
	options13 = {
		'url': '2323233'
	},
	options14 = {
		'url': 'this is a testt'
	};

describe('GET OG', function () {
	this.timeout(3000); // should wait at least three seconds before failing
	it('Valid Call - ogp.me should return open graph data', function (done) {
		app(options1, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data.ogTitle).to.be('Open Graph protocol');
			expect(result.data.ogType).to.be('website');
			expect(result.data.ogUrl).to.be('http://ogp.me/');
			expect(result.data.ogDescription).to.be('The Open Graph protocol enables any web page to become a rich object in a social graph.');
			expect(result.data.ogImage.url).to.be('http://ogp.me/logo.png');
			expect(result.data.ogImage.width).to.be('300');
			expect(result.data.ogImage.height).to.be('300');
			expect(result.data.ogImage.type).to.be('image/png');
			done();
		});
	});
	it('Valid Call - http', function (done) {
		app(options2, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - https', function (done) {
		app(options3, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - no protocol', function (done) {
		app(options4, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - no protocol and no wwww', function (done) {
		app(options5, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - protocol with no wwww', function (done) {
		app(options6, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Invalid Call - fake page', function (done) {
		app(options7, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - empty url', function (done) {
		app(optionsNoUrl, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Invalid URL');
			done();
		});
	});
	it('Invalid Call - empty options', function (done) {
		app(optionsEmpty, function (err, result) {
			expect(err).to.be(true);
			expect(result.err).to.be('Invalid URL');
			expect(result.success).to.be(false);
			done();
		});
	});
	it('Valid Call - timeout set to 2000', function (done) {
		app(options8, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - timeout set to empty string', function (done) {
		app(options9, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - timeout number is a string', function (done) {
		app(options10, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Valid Call - time is just a string of chars', function (done) {
		app(options11, function (err, result) {
			expect(err).to.be(false);
			expect(result.success).to.be(true);
			expect(result.data).to.be.empty();
			done();
		});
	});
	it('Invalid Call - url is just a number', function (done) {
		app(options12, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - url is a string of numbers', function (done) {
		app(options13, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
	it('Invalid Call - url is a string of words', function (done) {
		app(options14, function (err, result) {
			expect(err).to.be(true);
			expect(result.success).to.be(false);
			expect(result.err).to.be('Page Not Found');
			done();
		});
	});
});