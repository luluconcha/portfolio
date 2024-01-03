const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')



// var authRouter = require("./routes/auth");
// const charactersRouter = require('./routes/characters');
// const abilitiesRouter = require('./routes/abilities');
// const challengeRouter = require('./routes/challenge');
// const itemsRouter = require('./routes/items');
// const picturesRouter = require('./routes/pictures');
// const storypointsRouter = require('./routes/storypoints');
// const profileRouter = require('./routes/profile');
// const optionRouter = require('./routes/options');
// const avatarRouter = require('./routes/avatar');



const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/characters', charactersRouter);
// app.use('/api/storypoints', storypointsRouter);
// app.use('/api/abilities', abilitiesRouter);
// app.use('/api/challenge', challengeRouter);
// app.use('/api/items', itemsRouter);
// app.use('/api/pictures', picturesRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/profile", profileRouter);
// app.use("/api/options", optionRouter);
// app.use('/api/avatar', avatarRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });



module.exports = app;
