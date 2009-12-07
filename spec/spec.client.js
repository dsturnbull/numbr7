describe 'Numbr7'
    before
        client = new Numbr7();
        client.server.messages = new Array();
        client.server.received = new Array();
        client.server.send     = function(m) { this.received.push(m); };
        client.config.host     = 'irc.meobets.com';
        client.config.port     = 6667;
        client.config.chan     = '#numbr7';
        client.config.nick     = 'numbr7';
    end

    describe 'when ircing'
        it 'processes messages read from the server'
            client.server.messages.push('hi')
            client.client.process()
            client.client.processed.should.include 'hi'
        end

        it 'should continually process'
            client.server.messages.push('hi')
            client.server.messages.push('hi2u2')
            client.server.messages.push('bye')
            client.server.messages.push('quit')
            client.client.process()
            client.client.processed.should.include 'hi', 'hi2u2', 'bye'
        end

        it 'identifies itself and joins the channel in CONFIG after connecting'
            client.server.messages.push('NOTICE AUTH :*** No identd (auth) response')
            client.client.process()
            client.server.received.should.include 'NICK numbr7', 'USER numbr7 0 * :Number 7', 'JOIN #numbr7'
        end

        it 'responds to PING requests from the server'
            client.server.messages.push('PING :irc.meobets.com')
            client.server.messages.push('quit')
            client.client.process()
            client.server.received.should.include 'PONG irc'
        end

        it 'can recognize when someone thanks someone'
            client.server.messages.push(':julio!n=julio@ppp245-110.static.internode.on.net PRIVMSG #numbr7 :ACTION thanks dave for bar')
            client.server.messages.push('quit')
            client.client.process()
            client.server.received.should.include 'PRIVMSG julio :dave owes you a beer for "for bar"'
        end
    end
end
