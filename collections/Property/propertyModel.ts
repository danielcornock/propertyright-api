import mongoose, { Schema, model, Model, Document, models, Mongoose } from 'mongoose';
import { PropertyQueryMiddleware } from './propertyQueryMiddleware';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
const propertySchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to post a property.']
    },
    name: String,
    town: String,
    country: String,
    url: String,
    monthlyRent: Number,
    image: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

propertySchema.index({ user: 1 });

new PropertyQueryMiddleware(propertySchema);

propertySchema.virtual('todoCount', {
  ref: 'Todo',
  foreignField: 'property',
  localField: '_id',
  options: { match: { completed: { $ne: true } } },
  count: true
});

propertySchema.virtual('tenants', {
  ref: 'Tenant',
  foreignField: 'property',
  localField: '_id'
});

export default models.Property || model('Property', propertySchema);
