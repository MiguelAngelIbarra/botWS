const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');

// Inicializa el cliente
const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot está listo.');
});

client.on('message', message => {
  console.log(`Received message: ${message.body}`);
  if (message.body.toLowerCase() === 'hola') {
    console.log('Sending buttons...');
    const buttons = new Buttons('Selecciona una opción:', [
      { body: 'Opción 1', id: 'customId1' },
      { body: 'Opción 2', id: 'customId2' },
      { body: 'Opción 3', id: 'customId3' }
    ]);
    client.sendMessageWithButtons(message.from, buttons);
  }
});

// Inicializa el cliente
client.initialize();