import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: 'originalName is required',
  },
  path: {
    type: String,
    required: 'path is required',
  },
  type: {
    type: Number,
    required: 'type is required',
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
});

const Files = mongoose.model('files', fileSchema);
export default Files;
