import { ajvInstance } from '../../../utils/ajv-instance.js'

const commentDTO = {
  type: 'object',
  properties: {
    comment: { type: 'string', minLength: 2 }
  },
  required: ['comment'],
  additionalProperties: false
}

export const commentData = ajvInstance.compile(commentDTO)
