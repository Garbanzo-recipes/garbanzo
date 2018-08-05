import * as app from 'atrus';

app.use(app.middlewares.security.default());
app.use(app.middlewares.timeout());
app.use(app.middlewares.compression());
app.use(app.middlewares.cookieParser());
app.use(app.middlewares.bodyParser());
app.use(app.middlewares.staticFiles('client'));

app.addRoute({ route: '/', module: 'src' });
