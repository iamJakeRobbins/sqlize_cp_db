var Db = require('./db');

import {
	GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
	GraphQLBoolean,
	GraphQLSchema,
	GraphQLList,
	buildSchema,


} from 'graphql';

const User = new GraphQLObjectType({
	name: 'User',
	description: 'User info',
	fields: () => {
		return {
			id : {
				type: GraphQLInt,
				resolve (user) {
					return user.id
				}
			},
			login : {
				type: GraphQLString,
				resolve (user) {
					return user.login
				}
			},
			password : {
				type: GraphQLString,
				resolve (user){
					return user.password
				}
			},
			interpretation : {
				type: Interpretation,
				resolve(user){
					return user.getInterpretation();
				}
			},
			critique : {
				type: Critique,
				resolve(user){
					return user.getCritique();
				}
			}
		};
	}
});

const Quote = new GraphQLObjectType({
	name: 'Quote',
	description: 'this represents a quote',
	fields:() => {
		return {
			id : {
				type: GraphQLInt,
				resolve (quote) {
					return quote.id
				}
			},
			body : {
				type: GraphQLString,
				resolve (quote) {
					return quote.body
				}
			},
			author : {
				type: GraphQLString,
				resolve (quote) {
					return quote.author
				}
			},
			featured : {
				type: GraphQLBoolean,
				resolve (quote) {
					return quote.featured
				}
			},
			beenFeatured : {
				type: GraphQLBoolean,
				resolve ( quote) {
					return quote.beenFeatured
				}
			}
		};
	}
});

const Interpretation = new GraphQLObjectType({
	name : 'interpretation',
	description : 'this represents an interpretation',
	fields: () => {
		return {
			id : {
				type: GraphQLInt,
				resolve (interpretation) {
					return interpretation.id
				}
			},
			body : {
				type: GraphQLString,
				resolve (interpretation) {
					return interpretation.body
				}
			},
			author : {
				type: GraphQLString,
				resolve (interpretation) {
					return interpretation.author
				}
			}
		};
	}
});

const Critique = new GraphQLObjectType({
	name : 'critique',
	description : 'this represents a critique',
	fields: () =>  {
		return {
			id : {
				type: GraphQLInt,
				resolve (critique) {
					return critique.id
				}
			},
			body : {
				type: GraphQLString,
				resolve (critique) {
					return critique.body
				}
			},
			author : {
				type: GraphQLString,
				resolve (critique) {
					return critique.author
				}
			}
		};
	}
})

const Query = new GraphQLObjectType({
	name : 'Query',
	description : 'Root query object',
	fields: () => {
		return {
			users : {
				type: new GraphQLList(User),
				args: {
				},
				resolve(root, args) {
					return Db.models.user.findAll({where: args});
				}
			}
		}
	}
})

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// const Schema = new GraphQLSchema({
// 	name : 'Query',
// 	description : 'Root query object',
// 	fields: () => {
// 		return {
// 			users : {
// 				type: new GraphQLList(User),
// 				args: {
// 				},
// 				resolve(root, args) {
// 					return Db.models.user.findAll({where: args});
// 				}
// 			}
// 		}
// 	}
// });
export default schema;
