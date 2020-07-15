const http = require('http')
const { resolve } = require('path')
const fs = require('fs')

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName)
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from)
  output = output.replace(/{%PRODUCT_ID%}/g, product.id)
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description)
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

  return output
}

const server = http.createServer((request, response) => {
  const slug = request.url

  // Overview

  if (slug === '/overview' || slug === '/') {
    fs.readFile(
      resolve(__dirname, 'templates', 'overview.html'),
      { encoding: 'utf-8' },
      (err, overviewTemplate) => {
        if (err) return response.end('error')

        fs.readFile(
          resolve(__dirname, 'data', 'data.json'),
          { encoding: 'utf-8' },
          (err, data) => {
            if (err) return response.end('error')

            fs.readFile(
              resolve(__dirname, 'templates', 'card.html'),
              { encoding: 'utf-8' },
              (err, cardTemplate) => {
                if (err) return response.end('error')

                const dataFormatted = JSON.parse(data)
                const cardsHtml = dataFormatted.map(el =>
                  replaceTemplate(cardTemplate, el)
                )

                overviewTemplate = overviewTemplate.replace(
                  /{%PRODUCT_CARD%}/g,
                  cardsHtml
                )

                response.writeHead(200, {
                  'Content-type': 'text/html'
                })
                response.end(overviewTemplate)
              }
            )
          }
        )
      }
    )

    // Product page
  } else if (slug === '/product') {
    response.writeHead(200, {
      'Content-type': 'text/html'
    })
    response.end('<h1>Product details</h1>')

    // API
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

    // Not found
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html'
    })
    response.end('<h1>Page not found</h1>')
  }
})

server.listen(process.env.PORT || 3333, () => console.log('Server running...'))
