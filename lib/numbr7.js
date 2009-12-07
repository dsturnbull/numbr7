var tcp = require('tcp');

Numbr7 = function() {
    // config
    var config = {};
    this.config = config;

    // comms
    var server = {
        messages: new Array()
    };
    this.server = server;

    server.send = function(msg) {
        process.stdio.write('hi\n');
        process.stdio.write('-> ' + msg + '\n');
        server.socket.send(msg + '\n');
    }

    server.connect = function() {
        server.socket = tcp.createConnection(config.port, config.host);
        server.socket.addListener('receive', function(data) {
            server.messages.push(data);
            client.process();
        });
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
        thank_re = new RegExp(':([^!]+)!.+PRIVMSG ' + config.chan + ' :.* thanks ([^ ]+) (.*)');
        var message = server.messages.pop();
        this.processed.push(message);
        if (message == undefined) return;
        process.stdio.write('<- ' + message);
        switch (true) {
            case /No Ident/.test(message):
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
        }
    }
}
