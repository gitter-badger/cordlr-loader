module.exports = loader
const resolve = require('resolve')
const minimist = require('minimist')
const spawnargs = require('spawn-args')

/**
 * The default loader for cordlr
 */

function loader (bot, config = {}) {
  // Get plugin path(s)
  let pluginPaths = config.plugins || []
  if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]

  // Where you run "cordlr"
  const resolveOpts = { basedir: process.cwd() }

  // Prefix
  const prefix = config.prefix || '$'

  // Get plugins from paths
  const plugins = pluginPaths.reduce((plugins, pluginPath) => {
    const plugin = require(resolve.sync(pluginPath, resolveOpts))

    if (!Array.isArray(plugin)) plugins.push(plugin)
    else for (const subplugin of plugin) plugins.push(subplugin)

    return plugins
  }, [])

  // Initialize all plugins.
  const commands = plugins.reduce((commands, plugin) => {
    // Initialize plugin
    const handler = plugin(bot, config)

    // Stash command handler
    if (handler) {
      const name = plugin.command || plugin.name
      commands[name] = handler
    }

    return commands
  }, {})

  // Command handler
  bot.on('message', message => {
    // Verify command prefix and message type.
    if (!message.content.indexOf(prefix) && message.channel.type !== 'dm') {
      // Parse the message into useful command info
      const input = spawnargs(message.content.slice(prefix.length))
      const flags = minimist(input)
      const args = flags._
      const name = args.shift()

      // Run it, if it is valid
      if (commands[name]) {
        commands[name](message, args, flags)
      }
    }
  })

  // Emit error if no plugins.
  if (!plugins.length) bot.emit('error', new Error('No plugins'))

  // Log in using token or email/pass
  bot.login(config.token || config.email, config.password)
  .then(() => bot.emit('loaded'), e => {})

  return bot
}
