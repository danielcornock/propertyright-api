import { Schema, model, Model, Document, models } from 'mongoose';
import { TenantQueryMiddleware } from './tenantQueryMiddleware';
import Property from '../Property/propertyModel';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
const tenantSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to add a tenant']
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'You must add a tenant to a property']
    },
    name: String,
    email: String,
    phone: String,
    leadTenant: {
      type: Boolean,
      default: false
    },
    notes: [
      {
        title: String,
        body: String
      }
    ],
    avatar: {
      bgColor: String,
      textColor: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//*---------------------------------------------
//* Virtuals
//*---------------------------------------------
tenantSchema.virtual('avatar.initials').get(function getInitials(this: any) {
  const splitName = this.name.split(' ');
  return (splitName.length === 1
    ? splitName.join('')[0]
    : splitName.reduce((total: string, x: string, index: number) =>
        index === 1 ? total[0] + x[0] : total + x[0]
      )
  ).toUpperCase();
});

tenantSchema.pre('find' as any, function(this: any, next) {
  this.populate({
    path: 'property',
    select: 'name'
  });

  next();
});

new TenantQueryMiddleware(tenantSchema);

export default models.Tenant || model('Tenant', tenantSchema);
