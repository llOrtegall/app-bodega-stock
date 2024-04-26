import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(9040, () => {
  console.log(`Server is running at http://localhost:${9040}`)
})
