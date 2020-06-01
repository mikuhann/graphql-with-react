const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movie = require('../models/Movie');
const Director = require('../models/Director');

/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5ed54a7e197f8f176496cfa4
  { "name": "Michael Radford", "age": 72 }, // 5ed54b87197f8f176496cfa5
  { "name": "James McTeigue", "age": 51 }, // 5ed54bcbfb5a365d1e5b2f4a
  { "name": "Guy Ritchie", "age": 50 }, // 5ed54becfb5a365d1e5b2f4b
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5ed54a7e197f8f176496cfa4" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5ed54b87197f8f176496cfa5" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5ed54bcbfb5a365d1e5b2f4a" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5ed54becfb5a365d1e5b2f4b" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5ed54a7e197f8f176496cfa4" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5ed54a7e197f8f176496cfa4" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5ed54a7e197f8f176496cfa4" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5ed54becfb5a365d1e5b2f4b" },
];
const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];
const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find((director) => director.id == parent.directorId);
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter((movie) => movie.directorId == parent.id)
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((movie) => movie.id == args.id);
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id);
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Director.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
})
