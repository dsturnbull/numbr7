Numbr7 = function() {
    // config
    this.config = {}

    // comms
    this.server = {};
    this.server.connect = function() {
    }

    Client = function() {
        this.test = function() {
            return this.config;
        }
    }

    this.client = Client();

    // client
    this._client = {
        // this.identify_and_join = function() {
        //     this.server.send('NICK ' + this.config.nick);
        //     this.server.send('USER ' + this.config.nick + ' 0 * :Number 7');
        //     this.server.send('JOIN ' + this.config.chan);
        // }

        // this.pong = function() {
        //     this.server.send('PONG irc');
        // }

        // this.thank = function(user, who, reason) {
        //     this.server.send('PRIVMSG ' + user + ' :' + who + ' owes you a beer for "' + reason + '"');
        // }

        // this.process = function() {
        //     thank_re = new RegExp(':([^!]+).+ PRIVMSG ' + this.config.chan + ' :ACTION thanks (\\w+) (.+)');
        //     while (true) {
        //         var message = this.server.messages.pop();
        //         this.processed.push(message);
        //         if (message == undefined) break;
        //         switch (true) {
        //             case /No ident/.test(message):
        //                 this.identify_and_join();
        //             case /PING/.test(message):
        //                 this.pong();
        //             case thank_re.test(message):
        //                 r = message.match(thank_re);
        //                 if (r) {
        //                     user   = r[1];
        //                     who    = r[2];
        //                     reason = r[3];
        //                     this.thank(user, who, reason);
        //                 }
        //             case /quit/.test(message):
        //                 break;
        //         }
        //     }
        // }

        test: function() {
            process.stdio.write(this + '\n');
            process.stdio.write(this.config + '\n');
        }
    }
}

n = new Numbr7();
n.config.chan = 'hi';
process.stdio.write(n.config.chan + '\n');
process.stdio.write(n.client + '\n');
n.client.test()
