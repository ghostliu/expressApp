var app = {
	user:'sa',
	password:'123456',
	//server:'192.168.31.24',
	server:'127.0.0.1',
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