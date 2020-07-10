const http = require('http')
const { resolve } = require('path')
const fs = require('fs')

const server = http.createServer((request, response) => {
  const slug = request.url

  if (slug === '/overview' || slug === '/') {
    response.writeHead(200, {
      'Content-type': 'text/html'
    })
    response.end('<h1>Overview Page</h1>')
  } else if (slug === '/product') {
    response.writeHead(200, {
      'Content-type': 'text/html'
    })
    response.end('<h1>Product details</h1>')
  } else if (slug === '/api') {
    fs.readFile(
      resolve(__dirname, 'data', 'data.json'),
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          response.writeHead(404)
          response.end('Error')
        }

        response.writeHead(200, {
          'Content-type': 'application/json'
        })
        response.end(data)
      }
    )
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html'
    })
    response.end('<h1>Page not found</h1>')
  }
})

server.listen(process.env.PORT || 3333, () => console.log('Server running...'))
