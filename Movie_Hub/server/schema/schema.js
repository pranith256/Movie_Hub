const graphql = require('graphql');
const _=require('lodash');
const { ObjectId } = require('mongodb');

const Book = require("../models/book")
const Author = require("../models/author")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,GraphQLNonNull} = graphql;
// var books =[
//     {name:'Mahabharatam', genre:"Holy", id:"1", authorId:"1"},
//     {name:'Bhagavat Geetha', genre:"Science and Life", id:"2", authorId:"2"},
//     {name:"Design and Algos", genre:"Software Eng", id:"3", authorId:"3"},
//     {name:'Pushpaleka', genre:"Holy", id:"4", authorId:"1"},
//     {name:'SportsFun', genre:"Science and Life", id:"5", authorId:"2"},
//     {name:"Fashion Designing", genre:"Software Eng", id:"6", authorId:"3"}
// ]

// var authors =[
//     {name:'Patrick', age:"40", id:"1"},
//     {name:'Bonzou', age:"45", id:"2"},
//     {name:"Somferti", age:"55", id:"3"}
// ]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                 return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLID},
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent, solve){
                 return Book.find({authorId:parent.id});
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(graphql.GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)},

            },
            resolve(parent, args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId : args.authorId
                });
                return book.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                 return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}, age:{type:GraphQLString}},
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors:{
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})