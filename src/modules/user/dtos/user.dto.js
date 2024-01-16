import { ajvInstance } from '../../../utils/ajv-instance.js'

const signupDTO = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 3 },
    password: { type: 'string', minLength: 8 }
  },
  required: ['email', 'password', 'name'],
  additionalProperties: false
}

const loginDTO = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

export const validateSignupData = ajvInstance.compile(signupDTO)
export const validateLoginData = ajvInstance.compile(loginDTO)
