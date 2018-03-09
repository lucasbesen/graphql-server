// @flow

import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Student',
  description: 'Student data',
  fields: () => ({
    id: globalIdField('Student'),
    _id: {
      type: GraphQLString,
      resolve: student => student._id,
    },
    name: {
      type: GraphQLString,
      resolve: student => student.name,
    },
    description: {
      type: GraphQLString,
      resolve: student => student.description,
    },
  }),
});