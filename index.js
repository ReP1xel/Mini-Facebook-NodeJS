const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const path = require('path');
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;
const credentials = require('./credentials');
const User = require("./models/User");

mongoose.Promise = global.Promise;
mongoose.connect(credentials.connection_string, {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
User.findOne({ role: 'admin' })
    .then(user => {
        if (!user) {
            let password_hashed = bcrypt.hashSync('123456', 10);
            let u = new User({ username: "admin", password: password_hashed, role: "admin", name: "Admin system" })
            u.save()
                .then(() => {
                    console.log('Admin account was created successfully')
                })
                .catch(e => {
                    console.log(e)
                })
        }
    })
    .catch(e => {
        console.log(e);
    })


const helpers = require('./helpers');
const hbs = handlebars.create({ extname: '.hbs', helpers: helpers });
app.use(cookieParser((credentials.secret_key)))
app.use(expressSession({ resave: false, saveUninitialized: false, secret: credentials.secret_key, }))
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const AuthRouter = require("./router/AuthRouter");
const AccountRouter = require("./router/AccountRouter");
const NotiRouter = require("./router/NotiRouter");
const PostRouter = require("./router/PostRouter");
const AdminRouter = require("./router/AdminRouter");
const DepartmentRouter = require("./router/DepartmentRouter");
const StudentRouter = require("./router/StudentRouter");
app.use("/account", AccountRouter);
app.use("/noti", NotiRouter);
app.use("/post", PostRouter);
app.use("/admin", AdminRouter);
app.use("/department", DepartmentRouter);
app.use("/student", StudentRouter);
app.use("/", AuthRouter);

server.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})
io.on("connection", function (socket) {
    console.log(`User id: ->  ${socket.id}  -> Connected`)
    socket.on("department-post", data => {
        socket.broadcast.emit('department-post-new', data);
        console.log(data)
    })
})