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

    describe 'config'
        it 'should have a config'
            bot.config.should_not.be_null
        end

        it 'should have a configured host'
            bot.config.host.should.eql 'irc.meobets.com'
        end

        it 'should have a configured port'
            bot.config.port.should.eql 6667
        end

        it 'should have a configured channel'
            bot.config.chan.should.eql '#numbr7'
        end

        it 'should have a configured nick'
            bot.config.nick.should.eql 'numbr7'
        end
    end

    describe 'communication (for real)'
        it 'should open a socket to the server'
            bot.server.connect();
        end
    end
end
