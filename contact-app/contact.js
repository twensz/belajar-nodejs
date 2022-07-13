// core module
const chalk = require('chalk');
const fs = require('fs');
const {
    exit
} = require('process');
const validator = require('validator');

// check folder existance
const dirFolder = 'data';
if (!fs.existsSync(dirFolder)) {
    fs.mkdirSync(dirFolder);
}

// check file existance
const dirFile = 'data/contacts.json';
if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile, '[]', 'utf8');
}

const getContacts = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    return contacts;
}

// save contact
const saveContact = (name, email, phone) => {
    const data = {
        name,
        email,
        phone
    };

    const contacts = getContacts();

    // duplicate
    const duplicate = contacts.find((contact) => contact.name === name);

    if (duplicate) {
        console.log(chalk.red.inverse.bold('Contact name is already exist'));
        return false;
    }

    // validation
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email is not valid'));
            return false;
        }
    }

    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Phone is not valid'));
        return false;
    }

    // push data
    contacts.push(data);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log(chalk.green.inverse.bold('Contact has been saved'));
};

// list contact
const listContact = () => {
    const contacts = getContacts();

    console.log(chalk.hex('#b0bed9').inverse('Contact list :'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name}, ${contact.phone}`);
    });
}

// detail contact
const detailContact = (name) => {
    const contacts = getContacts();
    const contact = contacts.find((contact) =>
        contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!contact) {
        console.log(chalk.red.inverse.bold('Contact not found'));
        return false;
    }

    console.log(`Name : ${contact.name}`);
    console.log(`Phone : ${contact.phone}`);
    contact.email ? console.log(`Email : ${contact.email}`) : '';
}

// exports module
module.exports = {
    saveContact,
    listContact,
    detailContact
};