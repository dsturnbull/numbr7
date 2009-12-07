Numbr7 = function() {
    // config
    var config = {};
    this.config = config;

    // comms
    var server = {};
    this.server = server;
    server.connect = function() {
    }

    // client
    var client = {}
    this.client = client;

    client.processed = new Array();

    client.identify_and_join = function() {
        server.send('NICK ' + config.nick);
        server.send('USER ' + config.nick + ' 0 * :Number 7');
        server.send('JOIN ' + config.chan);
    }

    client.pong = function() {
        server.send('PONG irc');
    }

    client.thank = function(user, who, reason) {
        server.send('PRIVMSG ' + user + ' :' + who + ' owes you a beer for "' + reason + '"');
    }

    client.process = function() {
        thank_re = new RegExp(':([^!]+).+ PRIVMSG ' + config.chan + ' :ACTION thanks (\\w+) (.+)');
        while (true) {
            var message = server.messages.pop();
            this.processed.push(message);
            if (message == undefined) break;
            switch (true) {
                case /No ident/.test(message):
                    this.identify_and_join();
                case /PING/.test(message):
                    this.pong();
                case thank_re.test(message):
                    r = message.match(thank_re);
                    if (r) {
                        user   = r[1];
                        who    = r[2];
                        reason = r[3];
                        this.thank(user, who, reason);
                    }
                case /quit/.test(message):
                    break;
            }
        }
    }

    client.test = function() {
        process.stdio.write(config + '\n');
    }
}
