const fetch = require("node-fetch")

const handler = async (event) => {
  const params = new URLSearchParams(Object.entries(event.queryStringParameters));
  params.append('api_key', process.env.API_KEY);
  try {
    const body = await request(
      `https://api.nasa.gov/planetary/apod?${params.toString()}`,
      {
        method: "GET"
      }
    )
    return { statusCode: 200, body }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

async function request(path, options = {}) {
  const response = await fetch(path, options)
  const contentType = response.headers.get("Content-Type")

  if (contentType && /json/.test(contentType)) {
    return parseJsonResponse(response)
  }

  if (!response.ok) {
    const data = await response.text()
    const error = `Data: ${data}. Status: ${response.status}`
    throw new Error(error)
  }

  return await response.text()
}

async function parseJsonResponse(response) {
  const json = await response.json()
  if (!response.ok) {
    const error = `JSON: ${JSON.stringify(json)}. Status: ${response.status}`
    throw new Error(error)
  }
  return JSON.stringify(json)
}

module.exports = { handler }