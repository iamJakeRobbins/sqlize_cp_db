var Sequelize = require('sequelize');
var Faker = require('faker');
var _ = require('lodash');


// db Sequelize Schema
const Conn = new Sequelize(
 'capstone2',
 null,
 null,
		{
			dialect: 'postgres',
			host: 'localhost'
		}
);

const User = Conn.define('user', {
	login : {
		type: Sequelize.STRING,
		allowNull: false
	},
	password : {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Quote = Conn.define('quote', {
	body: {
		type: Sequelize.STRING,
		allowNull : false
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false
	},
	featured: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	beenFeatured: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	}
});

const Interpretation = Conn.define('interpretation', {
	body: {
		type: Sequelize.STRING,
		allowNull : false
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const Critique = Conn.define('critique', {
	body: {
		type: Sequelize.STRING,
		allowNull: false
	},
	author: {
		type : Sequelize.STRING,
		allowNull : false
	}
});

//relationships
User.hasMany(Interpretation);
Interpretation.belongsTo(User);

User.hasMany(Critique);
Critique.belongsTo(User);

Quote.hasMany(Interpretation);
Interpretation.belongsTo(Quote);

Interpretation.hasMany(Critique);
Critique.belongsTo(Interpretation);

//spoof some data
Conn.sync({ force: true }).then(()=> {
  _.times(15, ()=> {
    return User.create({
      login: Faker.name.findName(),
      password: Faker.lorem.word(),
    })
		.then(user => {
				return Quote.create({
					body:  Faker.lorem.sentence(),
					author: Faker.name.findName(),
				})
		.then(quote => {
    	return Interpretation.create({
      	body: Faker.lorem.sentence(),
				author: `${user.login}`,
				userId: `${user.id}`,
				quoteId: `${quote.id}`
      });
    })
	})
  });
});


module.exports = Conn
