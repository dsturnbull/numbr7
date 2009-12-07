require.paths.unshift('./lib');
process.mixin(GLOBAL, require('sys'))

require('numbr7')

bot = new Numbr7();

bot.config.host     = 'irc.meobets.com';
bot.config.port     = 6667;
bot.config.chan     = '#numbr7';
bot.config.nick     = 'numbr7';

bot.server.connect();
bot.client.process();
