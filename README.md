# nickel-chrome

## Install

```bash
yarn global add nickel-chrome
```

if you are patient, you can also install it with npm:

```
npm i -g nickel-chrome
```

## Usage

### Launch the nickel-chrome server

```bash
nickel-chrome
```

You can specify number of workers (*default: 5*):

```bash
nickel-chrome 3
```

You can change the default port (*default: 3010*):

```bash
NICKEL_CHROME_PORT=4242 nickel-chrome
```

You can also do nothing and nothing will happen.

### Create screenshots

The server will handle `POST` requests on `/`, with a payload looking like this:

```JSON
{
  "html": "<div>hello world</div>",
}
```

This is the only required property. Let's see what other options you have.

### Options

```js
{
  // the HTML to screenshot
  html: '',

  // specify page size
  viewportSize: {
    width: 650,
    height: 650,
    // the screenshot will be taken full page height
    fullPage: false,
  },

  // resize final image
  resize: {
    width: 300,
    // if not given, will resize conserving ratio
    height: 150,
  }

  // inject custom styles in page. the keys are querySelectors. the values
  // will be merged to CSSStyleDeclaration of the found node
  styles: {
    body: {
      marginTop: 40,
    },
    '.my-class': {
      backgroundColor: 'red',
    }
  },
}
```

the response format will be a base64-encoded image.

## License

BSD-2-Clause
