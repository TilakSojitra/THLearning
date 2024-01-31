import { ajvInstance } from '../../../utils/ajv-instance.js'

const postDTO = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    desc: { type: 'string', minLength: 10 }
  },
  required: ['title', 'desc'],
  additionalProperties: false
}

const postUpdateDTO = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    desc: { type: 'string', minLength: 10 }
  },
  additionalProperties: false
}

export const postData = ajvInstance.compile(postDTO)
export const postUpdateData = ajvInstance.compile(postUpdateDTO)
