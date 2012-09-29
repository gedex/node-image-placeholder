Image-Placeholder
================

A ready web app to serve images for your image placeholder.
Image placeholder can be requested with following ways
(assuming the app deployed to example.com):

* A 300x300 image:
````html
<img src="http://example.com/300">
````
  or
````html
<img src="http://example.com/300x300">;
````
* A 400x320 image with text color #fff and background color #ff0000:
````html
<img src="http://example.com/400x320/fff/ff0000">
````

## Running locally

Before install dependencies, make sure you have cairographics installed. canvas
depends on cairo. Install dependencies:
````bash
npm install
````

Run image-placeholder:
````bash
node app.js
````

## Deploy to heroku

Later on this.

## License - "MIT License"

Copyright (c) 2012 Akeda Bagus <admin@gedex.web.id>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
