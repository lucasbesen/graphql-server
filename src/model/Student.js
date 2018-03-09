// @flow

import mongoose from 'mongoose';

const { Schema } = mongoose;

const Student = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
}, { collection: 'Students' });

export default mongoose.model('Student', Student);