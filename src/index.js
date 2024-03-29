const permKraiParser = require('./parsers/permKrai.js');
const svobodaPermParser = require('./parsers/svobodaPerm.js');
const teatrTeatrParser = require('./parsers/teatr_teatr.js');

const start = async () => {
    let perm = await permKraiParser(1);

    console.log(perm);
}

start();