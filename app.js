// Initialize
init = () => {
    e = [], connection.query("SELECT * FROM Estates", (a, b) => {
        for (i = 0; i < b.length; i++) cl = b[i].Address.replace(/ /g, "_"), e.push({
            Address: b[i].Address,
            City: b[i].City,
            Zip: b[i].Zip,
            img: cloudinary.image(cl + ".jpg", {
                width: 30,
                height: 30,
                crop: "scale"
            })
        });
        app.locals.myData = e
    })

// Wire request 'pre' actions
}, wirePreRequest = a => {
    // Wire request 'pre' actions
    a.use((b, c, d) => {
        // Wire request controllers
        if (c.locals.req = b, c.locals.res = c, void 0 === process.env.CLOUDINARY_URL) throw new Error("");
        // Expose cloudinary package to view
        c.locals.cloudinary = cloudinary, d()
    })
// Wire request 'post' actions
}, wirePostRequest = a => {
    a.use((b, c, d, f) => {
        if (b.message && (~b.message.indexOf("not found") || ~b.message.indexOf("Cast to ObjectId failed"))) return f()
    })
// application
}, express = require("express"), path = require("path"), favicon = require("serve-favicon"), logger = require("morgan"), cookieParser = require("cookie-parser"), bodyParser = require("body-parser"), mysql = require("mysql"), cloudinary = require("cloudinary").v2, bcrypt = require("bcrypt"), dotenv = require("dotenv"), methodOverride = require("method-override"), multer = require("multer"), session = require("express-session"), models = require("./models"), doQuery = require("./controllers/query.js"), Sequelize = require("sequelize"), nodemailer = require('nodemailer'), index = require("./routes/index"), about = require("./routes/about"), agents = require('./routes/agents'), login = require("./routes/login"), search = require("./routes/search"), property = require("./routes/property"), dashboard = require("./routes/dashboard"), upload = require("./routes/upload"), success = require('./routes/success'), David = require("./routes/David"), Jesse = require("./routes/Jesse"), Avneesh = require("./routes/Avneesh"), Matthew = require("./routes/Matthew"), Jenny = require("./routes/Jenny"), Huiliang = require("./routes/Huiliang"), Yingjing = require("./routes/Yingjing"), app = express(), urlencodedParser = bodyParser.urlencoded({
    extended: !1
}), Users = [], saltRounds = 10, app.set("views", path.join(__dirname, "views")), app.set("view engine", "pug"), app.use(favicon(path.join(__dirname, "public", "favicon.ico"))), app.use(logger("dev")), app.use(bodyParser.json()), app.use(bodyParser.urlencoded({
    extended: !0
// view engine setup
})), app.use(cookieParser()), app.use(express.static(path.join(__dirname, "public"))), app.use(methodOverride()), app.use(session({
    secret: "key",
    resave: !1,
    saveUninitialized: !1
})), app.use((a, b, c) => {
    b.locals.session = a.session, c()
}), app.use("/", index), app.use("/about", about), app.use('/success', success), app.use("/David", David), app.use("/Jesse", Jesse), app.use("/Avneesh", Avneesh), app.use("/Matthew", Matthew), app.use("/Jenny", Jenny), app.use("/Huiliang", Huiliang), app.use("/Yingjing", Yingjing), connection = mysql.createConnection({
// MySQL connection
    host: "127.0.0.1",
    user: "fa17g03",
    password: "itsnotdefault037",
    database: "fa17g03"
// Cloudinary config
}), cloudinary.config({
    cloud_name: "ds4czpq2x",
    api_key: "756625512327681",
    api_secret: "BBMMejB6Omwbr1uVNESJiZmSNrw"
}),
// Load environment variables
    dotenv.load(), connection.query("SELECT * FROM RegisteredUsers", (a, b) => {
    if (a) throw a;
    for (i = 0; i < b.length; i++) Users.push({
        email: b[i].email,
        password: b[i].password,
        fname: b[i].fname,
        lname: b[i].lname,
        type: b[i].type
    })
// search
}), init(), app.get("/search", (a, b) => {
    a.query.q || b.render("search"), o = a.query.q, doQuery(o, connection, (d, f, g, h) => {
        b.render("search", {
            query: a.query,
            response: d,
            count: g,
            img: f,
            matches: h
        })
    })
// property
}), app.get("/property", (a, b) => {
    a.query.id ? (o = "SELECT * FROM Estates WHERE Address =" + connection.escape(a.query.id), connection.query(o, (d, f) => {
        d || (i = cloudinary.image(f[0].Address.replace(/ /g, "_") + ".jpg"), i = i.match(/'([^']+)'/)[1], b.render("property", {
            result: f[0],
            img: i
        }))
    })) : b.render("search")
}), app.get('/agents', (a, b) => {
    connection.query('SELECT * FROM Agents', function (d, e) {
        if (d) throw d;
        b.render('agents', {
            results: e
        })
    })
// message
}), app.post('/send', (a, b) => {
    c = `
    <p>You can reply directly to this message.</p>
    <h3>Contact Details</h3>
     <li>Email: ${a.body.reply}</li>
    <h3>Message</h3>
    <p>${a.body.body}</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // true for 465, false for other ports
        service: 'Gmail', port: 587, secure: !1, auth: {
            // generated ethereal user and password
            user: 'projectlandmark2017@gmail.com', pass: 'itsnotdefault037'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: !1
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'projectlandmark2017@gmail.com', // sender address
        to: `${a.body.email}`, // list of receivers
        replyTo: `${a.body.reply}`,
        subject: `${a.body.subject}`, // Subject line
        text: 'Hello world?', // plain text body
        html: c // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, f => {
        if (f) return console.log(f)
    });
    b.render('success', {msg: 'Success! Email has been sent'})
}),
// delete listings
    app.post('/listings', (a, b) => {
        connection.query('DELETE FROM Estates WHERE Address =' + connection.escape(a.body.val), c => {
            if (c) throw c;
            cloudinary.uploader.destroy(a.body.val.replace(/ /g, "_"), function (e, f) {
                console.log(f)
            }),
                init(), b.redirect('/fa17g03/dashboard')
        })
    }),
// login
    app.get('/login', (a, b) => {
        a.session.user ? b.redirect('/fa17g03/dashboard') : b.render('login')
    }), app.post('/login', (a, b) => {
    Users.filter((c) => {
        c.email.toUpperCase() === a.body.email.toUpperCase() ? b.render('login', {
            exists: 'Email already exists. Login!'
        }) : (o = a.body.password, bcrypt.hash(o, saltRounds).then((d) => {
            if ('agent' === a.body.type) {
                g = {
                    email: a.body.email,
                    fname: a.body.fname,
                    lname: a.body.lname
                }
                connection.query('INSERT INTO Agents SET ?', g, (h) => {
                    if (h) throw h
                })
            }
            ;e = {
                email: a.body.email,
                fname: a.body.fname,
                lname: a.body.lname,
                password: d,
                type: a.body.type,
                agree: a.body.agree
            }, models.RegisteredUsers.create(e).then(() => {
                console.log('success')
            }).catch((f) => {
                console.log(f)
            }), Users.push(e), a.session.user = e, b.render('dashboard')
        }))
    })
});
//If session exists, proceed to page
checkSignIn = (a, b, c) => {
    //Error, trying to access unauthorized page!
    a.session.user ? c() : c(new Error("Not logged in!"))
// dashboard
}, app.get('/dashboard', checkSignIn, (a, b) => {
    connection.query('SELECT * FROM Estates WHERE Email = ?', [a.session.user.email], function (c, d) {
        if (c) throw c;
        for (var f = [], g = 0;
             g < d.length;
             g++) f.push({
            img: cloudinary.image(d[g].Address.replace(/ /g, '_') + '.jpg', {
                width: 70, height: 70, crop: 'scale'
            }),
            Address: d[g].Address,
            City: d[g].City,
            Zip: d[g].Zip,
            Price: d[g].Price,
            Bedrooms: d[g].Bedrooms,
            Bathrooms: d[g].Bathrooms
        });
        b.render('dashboard', {
            email: a.session.user, results: f
        })
    })
// dashboard
}), app.post("/dashboard", (a, b) => {
    s = Users.filter(c => {
        return c.email.toUpperCase() === a.body.email.toUpperCase()
    }), 0 === s.length && b.render("login", {
        message: "No email found. Please sign up!"
    }), o = a.body.password, i = s[0].password, bcrypt.compare(o, i, (c, d) => {
        d ? (a.session.user = s[0], b.redirect("/fa17g03/dashboard")) : b.render("login", {
            message: "Invalid credentials!"
        })
    })
// dashboard
}), app.use('/dashboard', (a, b, c) => {
    c.redirect('/fa17g03/login')
// logout
}), app.get('/logout', (a, b) => {
    a.session.destroy(() => {
    }), b.redirect("/fa17g03/login")
// Wire request 'post' actions
}), wirePreRequest(app), photosController = require("./controllers/photos_controller"), photosController.wire(app), wirePostRequest(app), app.use((a, b, c) => {
    // catch 404 and forward to error handler
    o = new Error("Not Found"), o.status = 404, c(o)
// error handler
}), app.use((a, b, c) => {
    // set locals, only providing error in development and render the error page
    c.locals.message = a.message, c.locals.error = "development" === b.app.get("env") ? a : {}, c.status(a.status || 500), c.render("error")
}), module.exports = app;
