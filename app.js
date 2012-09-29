/**
 * App dependencies.
 */
var express = require("express"),
    app = express(),
    Canvas = require('canvas'),
    canvas, ctx;

var defaults = {
        format: 'png', // Currently only image/png is supported by node-canvas.
        bg_color: '999',
        fg_color: '666'
    },
    max_age = 31536000, // How long to cache, via max-age, in seconds.
    exp = new Date(0); // Expire date.

/**
 * App config
 */
app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    
    // Built-in middleware
    app.use(express.static(__dirname + "/assets"));
    app.use(express.favicon());
    app.use(app.router);
    
    // 404 page
    app.use(function(req, res, next) {
        res.status("404");
        res.render("404", {url: getUrl(req)});
    });

    // 500 page
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("500", {error: err});
    });
});

/**
 * App routing.
 */
app.get('/:dimension.:format?/:fg_color?/:bg_color?', function(req, res, next) {
    var dim = req.params.dimension.split('x'),
        w, h, // width and height
        tw, // text width
        fg, bg, // foreground and background colors
        ext, // image type
        font_size, // font-size
        stream; // png stream

    // Get dimensions
    if (dim.length === 1) {
        w = h = dim[0] * 1;
    } else {
        w = dim[0] * 1;
        h = dim[1] * 1;
    }
    if (isNaN(w) || isNaN(h)) return next();

    // Get foreground and background colors
    if (typeof req.params.fg_color !== 'undefined') {
        fg = req.params.fg_color;
    } else {
        fg = defaults.fg_color;
    }
    if (fg[0] !== '#') fg = '#' + fg;

    if (typeof req.params.bg_color !== 'undefined') {
        bg = req.params.bg_color;
    } else {
        bg = defaults.bg_color;
    }
    if (bg[0] !== '#') bg = '#' + bg;

    // Image type
    if (typeof req.params.format !== 'undefined') {
        ext = req.params.format;
    } else {
        ext = defaults.format;
    }
    ext = ext.toLowerCase();
    
    res.setHeader("Content-Type", 'image/' + ext);
    res.setHeader("Cache-Control", "public, max-age=" + max_age);
    res.setHeader("Expires", exp);

    canvas = new Canvas(w, h);
    ctx = canvas.getContext('2d');
    switch(ext) {
        // Currently only image/png is supported by node-canvas.
        // Once gif and jpeg are supported, this line must be updated.
        case 'jpg':
        case 'jpeg':
        case 'gif':
        default:
            ext = 'png'; // Override to png when it fallback to default.
            stream = canvas.createPNGStream();
    }
    
    
    stream.on('data', function(chunk) {
        res.write(chunk);
    });
    stream.on('end', function() {
        res.end();
    });

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    font_size = h/12;
    tw = ((w + '').length + (h + '').length  + 3) * font_size;
    while (tw > w) {
        font_size -= 2;
        tw = ((w + '').length + (h + '').length  + 3) * font_size;
    }

    ctx.font = "bold " + font_size + "px Lucida Console, Monaco, monospace, sans-serif";
    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(w + " x " + h, w/2, h/2);

    return 1;
});
app.get('/', function(req, res) {
    res.render('index', {
        url: getUrl(req)
    });
});
function getUrl(req) {
    var url = 'http://';

    if (req.headers['X-Forwarded-Protocol']) url = 'https://';
    url += req.headers['host'] + req.url;
    
    return url;
}

/**
 * Start app
 */
app.listen(3000, function() {
    console.log("Listening on port 3000");
});