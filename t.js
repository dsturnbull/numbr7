Numbr7 = function() {
    this.config = {}
    this.client = {
        test: function() {
            return config.chan
        }
    }
}

n = new Numbr7();
n.config.chan = 'hi';
process.stdio.write(n.config.chan + '\n');
process.stdio.write(n.client.test() + '\n');
