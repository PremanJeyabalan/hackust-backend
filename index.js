const Express = require('express');
const BodyParser = require('body-parser');
const accounts = require('./routes/routes.accounts');
const employee = require('./routes/routes.employee');
const customer = require('./routes/routes.customer');
const feedback = require('./routes/routes.feedback');
let app = Express();

app.use(
    BodyParser.urlencoded({
        extended: true
    })
)

app.use('/accounts', accounts);
app.use('/employee', employee);
app.use('/customer', customer);
app.use('/feedback', feedback);

app.listen(5000, () => console.log('Listening on port 5000!'))