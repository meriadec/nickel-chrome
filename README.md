# nickel-chrome

## Install

```bash
yarn global add nickel-chrome
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

This is the only required property. Here are some others:

```JSON
{
  "html": "<div>hello world</div>",
  "width": 350,
  "height": 120,
}
```

## License

BSD-2-Clause
