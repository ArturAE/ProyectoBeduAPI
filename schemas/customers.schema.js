const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(40);
const lastName = Joi.string();
const phoneNumber = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  userId: userId.optional(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phoneNumber: phoneNumber,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
  deleteCustomerSchema
}
