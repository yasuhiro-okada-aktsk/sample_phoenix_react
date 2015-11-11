/* @flow */

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

const entryType = new GraphQLObjectType({
  name: 'RssEntry',
  description: 'RssEntry type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'id',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'title',
    },
  }),
});

const feedType = new GraphQLObjectType({
  name: 'RssFeed',
  description: 'RssFeed type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    entries: {
      type: new GraphQLList(entryType),
      args: {
        count: {
          name: 'count',
          type: GraphQLInt,
        },
      },
      resolve: (feed, params, { rootValue: root }) => {
        if (__CLIENT__) {
          const entries = feed.entries.map(id => root.Entry[id]);
          return params.count ? entries.slice(0, params.count) : entries;
        }
        return root.findTodo(params);
      },
    },
  }),
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      viewer: {
        type: feedType,
        resolve: (root) => {
          if (__CLIENT__) {
            return root.Feed['u-1'];
          }
          return root.findFeed();
        },
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createTodo: {
        type: feedType,
        args: {
          url: {
            name: 'url',
            type: GraphQLString,
          },
        },
        resolve: (root, params) => {
          return root.createFeed(params);
        },
      },
    }),
  }),
});
