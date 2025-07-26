import { ajvInstance } from '../../../utils/ajv-instance.js'

const commentDTO = {
  type: 'object',
  properties: {
    comment: {
      type: 'string',
      minLength: 2,
      errorMessage: {
        type: 'comment must be a string',
        minLength: 'Minimum length of a comment should be 2'
      }
    }
  },
  required: ['comment'],
  errorMessage: {
    required: {
      comment: 'comment is required field'
    }
  },
  additionalProperties: false
}

export const commentData = ajvInstance.compile(commentDTO)
