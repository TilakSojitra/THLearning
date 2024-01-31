const validateDto = (ajvValidate) => {
  return (req, res, next) => {
    const valid = ajvValidate(req.body)
    if (!valid) {
      const errors = []
      ajvValidate.errors.forEach(error => {
        errors.push({ instance: error.instancePath, message: error.message })
      })
      return res.status(400).json(errors)
    }
    next()
  }
}

export default validateDto
