import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Student } from '../model';
import StudentType from '../type/StudentType';

export default mutationWithClientMutationId({
  name: 'RegisterStudent',
  inputFields: {
    _id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ _id, name, description }) => {
    try {
      let student = await Student.findOne({ _id });

      if (student) {
        student.name = name;
        student.description = description;
      } else {
        student = new Student({
          name,
          description,
        });
      }
      const newStudent = await student.save();
      return {
        newStudent,
        error: null,
      };
    } catch (err) {
      return {
        newStudent: null,
        error: err,
      };
    }
  },
  outputFields: {
    newStudent: {
      type: StudentType,
      resolve: ({ newStudent }) => newStudent,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});