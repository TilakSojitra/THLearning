import { ajvInstance } from '../../../utils/ajv-instance.js'

const postDTO = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    desc: { type: 'string', minLength: 10 }
  },
  required: ['title', 'desc'],
  additionalProperties: false
}

export const postData = ajvInstance.compile(postDTO)
