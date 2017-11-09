var app = {
	user:'sa',
	password:'123456',
	server:'localhost',
	database:'NodeWeb',
	options: {
		encrypt:true
	},
	pool:{
		min:0,
		max:10,
		idleTimeoutMillis:3000
	}
};

module.exports = app;