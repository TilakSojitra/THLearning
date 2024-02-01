import Response from '../utils/response.js'

const validateDto = (ajvValidate) => {
  return (req, res, next) => {
    const valid = ajvValidate(req.body)
    if (!valid) {
      const errors = []
      ajvValidate.errors.forEach(error => {
        // errors.push({ instance: error.instancePath, message: error.message })
        errors.push(error.message)
      })
      return res.status(400).json(Response(400, [], errors))
    }
    next()
  }
}

export default validateDto
