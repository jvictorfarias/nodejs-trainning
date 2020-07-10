const fs = require('fs')
const { resolve } = require('path')

const textIn = fs.readFileSync(resolve(__dirname, 'txt', 'input.txt'), {
  encoding: 'utf-8'
})

console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`

fs.writeFileSync(resolve(__dirname, 'txt', 'output.txt'), textOut)

const output = fs.readFileSync(resolve(__dirname, 'txt', 'output.txt'), {
  encoding: 'utf-8'
})

console.log(output)
