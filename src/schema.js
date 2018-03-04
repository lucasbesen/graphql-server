import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import mongoose from 'mongoose';
import Student from './models/Student';

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
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
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allStudents: {
      type: new GraphQLList(StudentType),
      resolve: async () => {
        const student = await Student.find({});
        return student;
      },
    },
    getStudent: {
      type: StudentType,
      args: {
        _id: {
          type: GraphQLNonNull(GraphQLString),
        }
      },
      resolve: async(obj, args, context) => {
        const student = await Student.findById(args._id);
        return student;
      },
    }
  })
});

export const schema = new GraphQLSchema({
  query: QueryType
});