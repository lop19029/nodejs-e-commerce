const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const cors = require('cors')
const PORT = process.env.PORT || 5000

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI ='mongodb+srv://iClient:QJvwxay3Wo3hNSog@cluster0.8buii.mongodb.net/shop'


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views'); //This is the default

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret:'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user) {
        return next();
      }
        req.user = user;
        next();
    })
    .catch(err => {
      next(new Error(err));
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500)
    .render('500', 
    {
        pageTitle: 'Error!', 
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
});

const corsOptions = {
    origin: "https://nodejs-ecommerce-cse341.herokuapp.com/",
    optionsSuccessStatus: 200
};

// // For local environment only
// mongoose
//   .connect(MONGODB_URI)
//   .then(result => {
//     app.listen(PORT);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(cors(corsOptions));

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://<username>:<username>@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL)
.then(result => {
    app.listen(PORT);
}).catch(err => {
    console.log(err);
});