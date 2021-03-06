const Express = require('express');
const cors = require('cors');
const accounts = require('./routes/routes.accounts');
const employee = require('./routes/routes.employee');
const customer = require('./routes/routes.customer');
const feedback = require('./routes/routes.feedback');
let app = Express();

app.use(
    Express.urlencoded({
        extended: true
    })
)

app.use(
    cors()
)

app.use(Express.json());

app.use('/accounts', accounts);
app.use('/employee', employee);
app.use('/customer', customer);
app.use('/feedback', feedback);

app.listen(8000, () => console.log('Listening on port 5000!'))