// @flow
import DataLoader from 'dataloader';
import { Student as StudentModel } from '../model';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { ConnectionArguments } from 'graphql-relay';
import type { GraphQLContext } from '../TypeDefinition';

type StudentType = {
  id: string,
  _id: string,
  name: string,
  description: string
};

export default class Student {
  id: string;
  _id: string;
  name: string;
  description: string;

  constructor(data: StudentType, { student }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(StudentModel, ids));

const viewerCanSee = (viewer, data) =>
  // Anyone can see another student
  true;
export const load = async (context: GraphQLContext, id: string): Promise<?Student> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.StudentLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Student(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) =>
  dataloaders.StudentLoader.clear(id.toString());

export const loadStudents = async (context: GraphQLContext, args: ConnectionArguments) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const students = StudentModel.find(where, { _id: 1 });

  return connectionFromMongoCursor({
    cursor: students,
    context,
    args,
    loader: load,
  });
};