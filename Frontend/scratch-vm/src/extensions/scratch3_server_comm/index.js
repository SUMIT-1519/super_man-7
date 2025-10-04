const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

class Scratch3ServerComm {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'servercomm', 
            name: 'Server Check', 
            blocks: [
                {
                    opcode: 'checkString', 
                    blockType: BlockType.BOOLEAN, 
                    text: 'Was string [INPUTSTRING] sent before?',
                    arguments: {
                        INPUTSTRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello'
                        }
                    }
                }
            ],
            menus: {}
        };
    }

    async checkString (args) {
        const inputString = String(args.INPUTSTRING);

        try {
            const response = await fetch('http://localhost:5001/api/check-string', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputString: inputString })
            });
            const data = await response.json();
            return data.wasSentBefore;
        } catch (e) {
            console.error('Server Communication Error:', e);
            return 'ERROR'; 
        }
    }
}

module.exports = Scratch3ServerComm;