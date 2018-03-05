import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the student',
  },
  description: {
    type: String,
    required: 'Enter the description of the student',
  },
}, { collection: 'Students' });

export default mongoose.model('Student', StudentSchema);