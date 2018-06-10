const Eos = require('eosjs');
const Gpio = require('onoff').Gpio;

const conf = require('./config.js');

const device = new Gpio(conf.pins.device, 'in', 'both');
const led1 = new Gpio(conf.pins.led1, 'out');
const led2 = new Gpio(conf.pins.led2, 'out');


let eos = Eos({
    keyProvider: conf.eos.privateKey,
    chainId: conf.eos.chainId,
    httpEndpoint: conf.eos.httpEndpoint,
});

async function sendTrx() {
    try {
        let contract = await eos.contract(conf.eos.contract);

        let data = 10; //TODO normal
        await contract.devicesignal(conf.eos.accountName, data, {authorization: conf.eos.accountName});
        tickLed(led2);
    } catch (e) {
        console.log("EOS ERROR:", e);
    }
}

/*
function sendTrx() {
    setTimeout(() => {
        tickLed(led2);
    }, 500);
}
*/


function tickLed(led) {
    led.writeSync(led.readSync() ^ 1);
    setTimeout(() => {
        led.writeSync(led.readSync() ^ 1);
    }, 70);
}

let last = null;
device.watch(async function (err, value) {
    if (err)
        return console.log("Watch ERROR:", err);

    if (last && new Date().getTime() - last < 100)
        return;
    last = new Date().getTime();

    tickLed(led1);
    sendTrx();
});


process.on('SIGINT', function () {
    led1.unexport();
    led2.unexport();
    device.unexport();
});
