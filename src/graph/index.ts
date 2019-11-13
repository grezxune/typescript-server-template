import { ApolloServer, gql } from 'apollo-server-express';
import Context from './context';

const typeDefs = gql`
    type Book {
        title: String!
        author: String!
    }

    type Query {
        books: [Book!]!
    }
`;
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];
const resolvers = {
    Query: {
        books: () => books,
    },
};

export default new ApolloServer({ typeDefs, resolvers, context: req => new Context(req) });
