const Response = (status, data, errors) => {
  if (status >= 200 && status <= 300) { return { data, errors: [] } } else {
    return { data: [], errors }
  }
}

export default Response
