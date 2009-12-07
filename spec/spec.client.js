describe 'Numbr7'
    before
        bot = new Numbr7();
        bot.server.messages = new Array();
        bot.server.received = new Array();
        bot.server.send     = function(m) { this.received.push(m); };
        bot.config.host     = 'irc.meobets.com';
        bot.config.port     = 6667;
        bot.config.chan     = '#numbr7';
        bot.config.nick     = 'numbr7';
    end

    describe 'when ircing'
        it 'should process messages read from the server'
            bot.server.messages.push('hi')
            bot.client.process()
            bot.client.processed.should.include 'hi'
        end

        it 'identifies itself and joins the channel in CONFIG after connecting'
            bot.server.messages.push('NOTICE AUTH :*** No Identd (auth) response')
            bot.client.process()
            bot.server.received.should.include 'NICK numbr7', 'USER numbr7 0 * :Number 7', 'JOIN #numbr7'
        end

        it 'responds to PING requests from the server'
            bot.server.messages.push('PING :irc.meobets.com')
            bot.client.process()
            bot.server.received.should.include 'PONG irc'
        end

        it 'can recognize when someone thanks someone'
            bot.server.messages.push(':julio!n=julio@ppp245-110.static.internode.on.net PRIVMSG #numbr7 :ACTION thanks dave for bar')
            bot.client.process()
            bot.server.received.should.include 'PRIVMSG julio :dave owes you a beer for "for bar"'
        end
    end
end
