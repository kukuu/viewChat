# Image Cycler

Image Cycler written in native JavaScript.

The script is capable to display images and HTML5 videos.

## Prepare
Install packages

```
npm install -g gulp
npm install
```

## Usage

Place the following HTML structure.

```html
<img id="largeImg" src="" />
<div class="video"></div>
<div class="thumbs"></div>
```

Place an <code>items.json</code> file in the docroot (see <code>src/items.json</code>).

Start a mini-webserver and load URL.

```
gulp connect
-> open http://localhost:8080/
```


## Online Demo

http://pbakondy.github.io/image-cycler/src/index.html


## License

image-cycler is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
