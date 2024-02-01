import { ajvInstance } from '../../../utils/ajv-instance.js'

// Password must contain atleast one lowercase letter, one Uppercase letter , one digit and one special character min length is 8
ajvInstance.addFormat('password', /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)

const signupDTO = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: 'email must be a string only',
        format: 'email must match following format: i.e example@mail.com'
      }
    },
    name: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        type: 'name must be a string only',
        minLength: 'Minumum length of a name should be 3'
      }
    },
    password: {
      type: 'string',
      format: 'password',
      errorMessage: {
        type: 'password must be a string',
        format: 'password must contain atleast one lowercase letter,uppercase letter,special character,digit[0-9] and min length should be 8'
      }
    }
  },
  required: ['email', 'password', 'name'],
  errorMessage: {
    required: {
      email: 'email is required',
      password: 'password is required',
      name: 'name is required'
    }
  },
  additionalProperties: false
}

const loginDTO = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: 'email must be a string only',
        format: 'email must match following format: i.e example@mail.com'
      }
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'password must be a string only'
      }
    }
  },
  required: ['email', 'password'],
  errorMessage: {
    required: {
      email: 'email is required',
      password: 'password is required'
    }
  },
  additionalProperties: false
}

export const validateSignupData = ajvInstance.compile(signupDTO)
export const validateLoginData = ajvInstance.compile(loginDTO)
