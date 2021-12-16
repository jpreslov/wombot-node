const app = require('express')()
// const bot = require('./bot')

// app.use(bot)

app.get('/', (req, res) => {
	res.json({ message: 'pls' })
})

const port = process.env.PORT || 8001

app.listen(port, () => console.log(`listening on ${port}`))