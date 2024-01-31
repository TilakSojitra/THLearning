import { ajvInstance } from '../../../utils/ajv-instance.js'

// Password must contain atleast one lowercase letter, one Uppercase letter , one digit and one special character min length is 8
ajvInstance.addFormat('password', /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)

const signupDTO = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 3 },
    password: { type: 'string', format: 'password' }
  },
  required: ['email', 'password', 'name'],
  additionalProperties: false
}

const loginDTO = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

export const validateSignupData = ajvInstance.compile(signupDTO)
export const validateLoginData = ajvInstance.compile(loginDTO)
