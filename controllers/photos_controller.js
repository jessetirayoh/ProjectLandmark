// In direct mode, the image is uploaded to Cloudinary by the browser,
// and upload metadata is available in JavaScript.
function upload(b, c) {
    r = "http://" + b.headers.host + "/cloudinary_cors.html", u = new Photo, Photo.count().then(() => {
    }).finally(() => {
        c.render("upload", {
            photo: u,
            cloudinary_cors: r
        })
    })
} // variables
cloudinary = require("cloudinary").v2, schema = require("../config/schema"), crypto = require("crypto"), Photo = schema.models.Photo, mysql = require("mysql"), multipart = require("connect-multiparty"), multipartMiddleware = multipart(), upload = require("../routes/upload"), connection = mysql.createConnection({
    // MySQL connection
    host: "127.0.0.1",
    user: "fa17g03",
    password: "itsnotdefault037",
    database: "fa17g03"
}), module.exports.wire = b => {
    // direct upload
    b.use("/upload", upload), b.post("/upload", (c, f) => {
        app.locals.myData.push({
            Address: c.body.title,
            City: c.body.city,
            Zip: c.body.zip,
            img: cloudinary.image(c.body.title.replace(/ /g, "_") + '.jpg', {width: 30, height: 30, crop: "scale"})
        }), post = {
            Address: c.body.title,
            City: c.body.city,
            Zip: c.body.zip,
            Price: c.body.price,
            Bathrooms: c.body.bathrooms,
            Bedrooms: c.body.bedrooms,
            Email: c.body.email
        }, connection.query("INSERT INTO Estates SET ?", post, g => {
            if (g) throw g;
            f.render("upload", {
                msg: "Image has been successfully uploaded!"
            })
        })
    })
};
