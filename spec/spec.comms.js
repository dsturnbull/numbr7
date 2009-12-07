describe 'Numbr7'
    before
        Client = new Numbr7();
        Client.config = {
            host: 'irc.meobets.com',
            port: 6667,
            chan: '#numbr7',
            nick: 'numbr7'
        }
    end

    describe 'config'
        it 'should have a config'
            Client.config.should_not.be_null
        end

        it 'should have a configured host'
            Client.config.host.should.eql 'irc.meobets.com'
        end

        it 'should have a configured port'
            Client.config.port.should.eql 6667
        end

        it 'should have a configured channel'
            Client.config.chan.should.eql '#numbr7'
        end

        it 'should have a configured nick'
            Client.config.nick.should.eql 'numbr7'
        end
    end

    describe 'communication'
        it 'should open a socket to the server'
            Client.server.connect()
        end
    end
end
