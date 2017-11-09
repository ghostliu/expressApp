var app = {
	user:'sa',
	password:'123456',
	server:'192.168.31.24',
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