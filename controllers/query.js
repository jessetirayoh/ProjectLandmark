function doQuery(a, b, c) {
    // query
    q = a, a = "%" + (a = a.replace(/\s\s+/g, "")) + "%", results = [], id = [], img = [], index = 0, list = [], sql = "SELECT * FROM Estates WHERE City LIKE" + b.escape(a) + "UNION SELECT * FROM Estates WHERE Zip LIKE" + b.escape(a) + "UNION SELECT * FROM Estates WHERE Address LIKE" + b.escape(a), b.query("SELECT * FROM Estates", (d, f) => {
        for (i = 0; i < f.length; i++) list.push(f[i].Address), list.push(f[i].City), list.push(f[i].Zip.toString())
    }), b.query(sql, (d, f) => {
        if (d) console.log("Error.");
        else {
            for (index; index < f.length; index++) results.push(f[index]), cl = f[index].Address.replace(/ /g, "_"), img.push(cloudinary.image(cl + ".jpg", {
                width: 500,
                height: 250,
                crop: "scale"
            }));
            // fuzzy filter
            t = fuzzy.filter(q, list).map(h => {
                return h.string
            }), t = t.filter((h, j, k) => {
                return k.indexOf(h) == j
                // callback
            }), c(results, img, index, t)
        }
    })
}

fuzzy = require("fuzzy"), mysql = require("mysql"), cloudinary = require("cloudinary"), module.exports = doQuery;
