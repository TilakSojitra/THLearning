import { ajvInstance } from '../../../utils/ajv-instance.js'

const postDTO = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        type: 'title must be a string',
        minLength: 'Min length of a title must be 3'
      }
    },
    desc: {
      type: 'string',
      minLength: 10,
      errorMessage: {
        type: 'desc must be a string',
        minLength: 'Min length of a desc must be 10'
      }
    }
  },
  required: ['title', 'desc'],
  errorMessage: {
    required: {
      title: 'title is required field',
      desc: 'desc is required field'
    }
  },
  additionalProperties: false
}

const postUpdateDTO = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        type: 'title must be a string',
        minLength: 'Min length of a title must be 3'
      }
    },
    desc: {
      type: 'string',
      minLength: 10,
      errorMessage: {
        type: 'desc must be a string',
        minLength: 'Min length of a desc must be 10'
      }
    }
  },
  additionalProperties: false
}

export const postData = ajvInstance.compile(postDTO)
export const postUpdateData = ajvInstance.compile(postUpdateDTO)
