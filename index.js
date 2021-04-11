const Express = require('express')
const BodyParser = require('body-parser');

let app = Express();

app.use(
    BodyParser.urlencoded({
        extended: true
    })
)

app.listen(5000, () => console.log('Listening on port 5000!'))