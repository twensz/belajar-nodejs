// // panggil core module "File System"
// const fs = require('fs');

// // write data
// // fs.writeFile('data/test.txt', 'Hello word secara asyncronus', (e) => console.log(e));

// // read data
// const data = fs.readFile('data/test.txt', 'utf8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });

// console.log(data);


// Core Module
const fs = require('fs');
const {
    exit
} = require('process');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Apakah anda ingin membuat file? (y/n)', (jawaban) => {
//     if (jawaban === 'y') {
//         rl.question('Nama file? ', (namaFile) => {
//             rl.question('Isi file? ', (isiFile) => {
//                 fs.writeFileSync('data/' + namaFile, isiFile);
//                 rl.close();
//             });
//         });
//     } else {
//         rl.close();
//     }
// });

rl.question('Masukan nama anda? ', (nama) => {
    rl.question('Masukan no telefon? ', (telefon) => {
        const contact = {
            nama,
            telefon,
        };

        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
        rl.close();
    });
});