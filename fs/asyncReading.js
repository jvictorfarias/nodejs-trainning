const fs = require('fs')
const { resolve } = require('path')

async function run () {
  // Callbacks
  fs.readFile(
    resolve(__dirname, 'txt', 'start.txt'),
    { encoding: 'utf-8' },
    (err, firstData) => {
      if (err) return console.log(err)
      fs.readFile(
        resolve(__dirname, 'txt', `${firstData}.txt`),
        { encoding: 'utf-8' },
        (err, secondData) => {
          if (err) return console.log(err)
          fs.readFile(
            resolve(__dirname, 'txt', 'append.txt'),
            { encoding: 'utf-8' },
            (err, thirdData) => {
              if (err) return console.log(err)
              fs.writeFile(
                resolve(__dirname, 'txt', 'final.txt'),
                `${secondData}\n${thirdData}`,
                { encoding: 'utf-8' },
                err => {
                  if (err) return console.log(err)
                  fs.readFile(
                    resolve(__dirname, 'txt', 'final.txt'),
                    { encoding: 'utf-8' },
                    (err, finalFile) => {
                      if (err) return console.log(err)
                      console.log(finalFile)
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )

  // Then/Catch
  fs.promises
    .readFile(resolve(__dirname, 'txt', 'start.txt'), {
      encoding: 'utf-8'
    })
    .then(firstData => {
      fs.promises
        .readFile(resolve(__dirname, 'txt', `${firstData}.txt`), {
          encoding: 'utf-8'
        })
        .then(secondData => {
          fs.promises
            .readFile(resolve(__dirname, 'txt', 'append.txt'), {
              encoding: 'utf-8'
            })
            .then(thirdData => {
              fs.promises
                .writeFile(
                  resolve(__dirname, 'txt', 'final.txt'),
                  `${secondData}\n${thirdData}`
                )
                .then(() =>
                  fs.promises
                    .readFile(resolve(__dirname, 'txt', 'final.txt'), {
                      encoding: 'utf-8'
                    })
                    .then(finalFile => console.log(finalFile))
                    .catch(err => console.log(err))
                )
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  // Async/Await
  try {
    const firstData = await fs.promises.readFile(
      resolve(__dirname, 'txt', 'start.txt'),
      { encoding: 'utf-8' }
    )

    const secondData = await fs.promises.readFile(
      resolve(__dirname, 'txt', `${firstData}.txt`),
      { encoding: 'utf-8' }
    )

    const thirdData = await fs.promises.readFile(
      resolve(__dirname, 'txt', 'append.txt'),
      { encoding: 'utf-8' }
    )

    await fs.promises.writeFile(
      resolve(__dirname, 'txt', 'final.txt'),
      `${secondData}\n${thirdData}`
    )

    const finalFile = await fs.promises.readFile(
      resolve(__dirname, 'txt', 'final.txt'),
      { encoding: 'utf-8' }
    )

    console.log(finalFile)
  } catch (err) {
    console.log(err)
  }
}

run()
