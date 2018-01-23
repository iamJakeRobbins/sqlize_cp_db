var Sequelize = require('sequelize');
var Faker = require('faker');
var _ = require('lodash');


// db Sequelize Schema
const Conn = new Sequelize(
	'capstone2',
	'postgres',
	'postgres',
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
		type: sequlize.STRING,
		allowNull: false
	},
	featured: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	beenFeatured: {
		type: Sequlize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	}
});

const Interpretation = Conn.define('interpretation', {
	body: {
		type: Sequelize.STRING,
		author: Sequelize.STRING,
		allowNull : false
	}
});

const Critique = Conn.define('critique', {
	body: {
		type: Sequelize.STRING,
		author: Sequelize.STRING
		allowNull: false
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
    }).then(user => {
      return User.createInterpretation({
        body: 'I find this quote to be very quotable'
				author: `${user.login}`
      });
    }).then(interpretation => {
			return Quote.create({
				body:  Faker.lorgem.sentence()
				author: Faker.name.findName()
			})
		})
  });
});


export default Conn;
