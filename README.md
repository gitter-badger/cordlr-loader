# cordlr-loader [![NPM version](https://badge.fury.io/js/cordlr-loader.svg)](https://npmjs.org/package/cordlr-loader)

> The default loader for cordlr.

## Installation

```sh
$ npm install --save cordlr-loader
```

## API

### `loader(client, [options])`

Apply the loader on any discord.js client, with your options.

 - `client` ([`Client`](https://hydrabolt.github.io/discord.js/#!/docs/tag/master/class/Client)): A discord client to load your options on.
 - `options` (`Object`): Options to supply for the loader (See below)

### Options

In addition to the standard `package.json` properties, you have:

 - `token` (`String`): A token to log your bot in with
 - `email` (`String`): An alternative to `token` when paired with `password`.
 - `password` (`String`): Password to go along with `email`.
 - `plugins` (`Array`): Plugins to load, an array of strings loaded as if `require`'ed

Here is an example configuration

```js
{
  "name": "my-bot",
  "description": "He does cool things."
  "token": "...",
  "plugins": [
    "cordlr-help",
    "cordlr-svg",
    "cordlr-color"
  ],
  "dependencies": {
    "cordlr-help": "v1",
    "cordlr-svg": "v0.1",
    "cordlr-color": "v0.1"
  }
}
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
