// @flow

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';
import RegisterStudent from '../mutation/RegisterStudentMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
		// auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,
    RegisterStudent,
  }),
});
