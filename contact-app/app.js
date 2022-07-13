// local module
const yargs = require('yargs');
const contact = require('./contact');

// conf yargs command
yargs.command({
    command: 'add',
    describe: 'Adding new contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email address',
            demandOption: false,
            type: 'string'
        },
        phone: {
            describe: 'Phone number',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contact.saveContact(argv.name, argv.email, argv.phone);
    }
}).demandCommand();

yargs.command({
    command: 'list',
    describe: 'Show contacts list',
    handler() {
        contact.listContact();
    }
});

yargs.command({
    command: 'detail',
    describe: 'Show contact details',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contact.detailContact(argv.name);
    }
});

// parse yargs
yargs.parse();





// const main = async () => {
//     const name = await contact.showQuestion('Fullname : ');
//     const email = await contact.showQuestion('Email Address : ');
//     const phone = await contact.showQuestion('Phone Number : ');

//     contact.saveContact(name, email, phone);
// }

// main();