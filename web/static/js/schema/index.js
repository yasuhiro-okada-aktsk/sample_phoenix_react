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
    title: {
      type: GraphQLString,
    },
    subtitle: {
      type: GraphQLString,
      description: 'subtitle',
    },
    summary: {
      type: GraphQLString,
      description: 'summary',
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
        const entries = feed.entries.map(id => root.Entry[id]);
        return params.count ? entries.slice(0, params.count) : entries;
      },
    },
  }),
});

const feedListType = new GraphQLObjectType({
  name: 'RssFeedList',
  description: 'RssFeedList type',
  fields: () => ({
    sample: {
      type: GraphQLString,
    },
    feeds: {
      type: new GraphQLList(feedType),
      args: {
        count: {
          name: 'count',
          type: GraphQLInt,
        },
      },
      resolve: (root, { count }) => {
        return Object.keys(root.RssFeed).map(key => {
            return root.RssFeed[key]
          }
        )
      },
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      feedList: {
        type: feedListType,
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      addFeed: {
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

export default Schema;
