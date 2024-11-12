const qrcode = require('qrcode-terminal');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

// Initialize a dictionary to store chat statess
const chatStates = {};
let welcomeSent = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Corriendo bot Garces!');
});

client.on('message', message => {
    const chatId = message.from;

    if (chatStates[chatId] === undefined) {
        chatStates[chatId] = { menu: true, submenu: null };
    }

    if (!welcomeSent[chatId] && message.body.toLowerCase() !== '') {
        welcomeSent[chatId] = true;
        const response = '¡Hola👋, bienvenido a Barbería Garcés 💈, 📍Sucursal Peñaflor!\n' +
            '*🕛Nuestro horario de atención en las instalaciones es:*\n' +
            '- Lunes a viernes 10 am a 10 pm\n' +
            '- Sábado 9 am a 4 pm\n' +
            '- Domingo 11 am a 4 pm\n' +
            '*☎️Nuestro horario de atención telefónica es:*\n' +
            '- Lunes a viernes 11 am a 8 pm\n' +
            '- Sábado 9 am a 4 pm\n' +
            '- Domingo 11 am a 4 pm\n\n' +
            '*Por el momento nuestro personal no puede atenderte, pero soy Boot Garcés 🤖 y estoy para atenderte.*';
        setTimeout(() => {
            const response2 = '*⚠️Ingresa el número que corresponda a la opcion deseada⚠️* \n\n'+
                '*¿En que puedo ayudarte el día de hoy?🤔* \n' +
                '1. 💇🏻 Nuestros servicios\n' +
                '2. 📅 Agendar Cita\n' +
                '3. 📍 Ubicación en el mapa\n' +
                '4. 🌐 Conoce nuestro trabajo en redes sociales\n' +
                '5. ❌ Terminar conversacón';
            client.sendMessage(message.from, response2, { parse_mode: 'Markdown' });
        }, 4000);
        client.sendMessage(message.from, response, { parse_mode: 'Markdown' });
    } else if (chatStates[chatId] && chatStates[chatId].menu) {
        //Nuestros servicios
        switch (message.body.toLowerCase()) {
            case '1':
                chatStates[chatId].menu = false;
                chatStates[chatId].submenu = 'servicios';
                try {
                    const media = MessageMedia.fromFilePath('./servicios.jpg');
                    // Envía la imagen
                    message.reply(media);
                    // Espera 5 segundos antes de enviar el segundo mensaje
                    setTimeout(() => {
                        const citaOptions = '*¿Te gustaría agendar?🤔*\n' +
                            '1. Sí✅\n' +
                            '2. No❌';
                        client.sendMessage(message.from, citaOptions, { parse_mode: 'Markdown' });
                    }, 5000); // 5000 milisegundos = 5 segundos
                } catch (error) {
                    console.error('Error al procesar el medio:', error);
                }
                break;
            //agendar cita
            case '2':
                chatStates[chatId].menu = false;
                chatStates[chatId].submenu = 'agendar';
                const agendar = '*Entra al siguiente enlace y podrás agendar🥳:*\n' +
                    'https://book.weibook.co/barberia-garces';
                client.sendMessage(message.from, agendar, { parse_mode: 'Markdown' });
                setTimeout(() => {
                    const returnToMainMenu = '*¿En que más puedo ayudarte el día de hoy?🤔* \n' +
                        '1. 💇🏻 Nuestros servicios\n' +
                        '2. 📅 Agendar Cita\n' +
                        '3. 📍 Ubicación en el mapa\n' +
                        '4. 🌐 Conoce nuestro trabajo en redes sociales\n' +
                        '5. ❌ Terminar conversacón';
                    client.sendMessage(message.from, returnToMainMenu, { parse_mode: 'Markdown' });
                    chatStates[chatId].menu = true;
                    chatStates[chatId].submenu = null;
                }, 9000); // 5000 milisegundos = 5 segundos

                break;
            //cancelacion o reagendar
            case '3':
                chatStates[chatId].menu = false;
                chatStates[chatId].submenu = 'cancelar/reagendar';
                try {
                    const mustang = MessageMedia.fromFilePath('./mustang.jpg');
                    // Envía la imagen
                    message.reply(mustang);
                    // Espera 5 segundos antes de enviar el segundo mensaje
                    setTimeout(() => {
                        const Ubicacion = '*📍 https://maps.app.goo.gl/ZczWquvkqxzZbPyh8*';
                        client.sendMessage(message.from, Ubicacion, { parse_mode: 'Markdown' });
                    }, 3000); // 5000 milisegundos = 5 segundos
                    setTimeout(() => {
                        const returnToMainMenu = '*¿En que más puedo ayudarte el día de hoy?🤔* \n' +
                            '1. 💇🏻 Nuestros servicios\n' +
                            '2. 📅 Agendar Cita\n' +
                            '3. 📍 Ubicación en el mapa\n' +
                            '4. 🌐 Conoce nuestro trabajo en redes sociales\n' +
                            '5. ❌ Terminar conversacón';
                        client.sendMessage(message.from, returnToMainMenu, { parse_mode: 'Markdown' });
                        chatStates[chatId].menu = true;
                        chatStates[chatId].submenu = null;
                    }, 9000); // 9000 milisegundos = 5 segundos
                } catch (error) {
                    console.error('Error al procesar el medio:', error);
                }
                break;
            //redes sociales
            case '4':
                chatStates[chatId].menu = false;
                chatStates[chatId].submenu = 'redes';
                const redes = '*Síguenos en nuestras redes sociales🤙*\n' +
                    '*Instagram😎*: https://www.instagram.com/barberiagarcesqro?igsh=OGQ5ZDc2ODk2ZA==\n' +
                    '*Facebook😎*: https://www.facebook.com/profile.php?id=100040190483188&mibextid=LQQJ4d';
                client.sendMessage(message.from, redes, { parse_mode: 'Markdown' });
                setTimeout(() => {
                    const returnToMainMenu = '*¿En que más puedo ayudarte el día de hoy?🤔* \n' +
                        '1. 💇🏻 Nuestros servicios\n' +
                        '2. 📅 Agendar Cita\n' +
                        '3. 📍 Ubicación en el mapa\n' +
                        '4. 🌐 Conoce nuestro trabajo en redes sociales\n' +
                        '5. ❌ Terminar conversacón';
                    client.sendMessage(message.from, returnToMainMenu, { parse_mode: 'Markdown' });
                    chatStates[chatId].menu = true;
                    chatStates[chatId].submenu = null;
                }, 9000); // 5000 milisegundos = 5 segundos
                break;
            case '5':
                const endConversation = '*¡Espero nuestra atención haya sido de ayuda!*🤝\n' +
                    'Para mayor información te recordamos que el horario de atención  telefónica de nuestro personal es:\n' +
                    '- Lunes a viernes de 11 am a 8 pm\n' +
                    '- Sábado de 9 am a 4 pm\n' +
                    '- Domingo de 11 am a 4 pm\n' +
                    '*¡Gracias por tu preferencia!🙌*';
                client.sendMessage(message.from, endConversation, { parse_mode: 'Markdown' });
                chatStates[chatId] = { menu: false, submenu: null }; // Reinicializar chatStates[chatId]
                break;
        }
    } else if (chatStates[chatId] && chatStates[chatId].submenu === 'servicios') {
        switch (message.body.toLowerCase()) {
            case '1':
                const citaAgendar = '🤩*¡Perfecto!*🤩\n Entrando al siguiente enlace podrás angendar\n' +
                    'https://book.weibook.co/barberia-garces';
                client.sendMessage(message.from, citaAgendar, { parse_mode: 'Markdown' });
                setTimeout(() => {
                    const returnToMainMenu = '*¿En que más puedo ayudarte el día de hoy?🤔* \n' +
                        '1. 💇🏻 Nuestros servicios\n' +
                        '2. 📅 Agendar Cita\n' +
                        '3. 📍 Ubicación en el mapa\n' +
                        '4. 🌐Conoce nuestro trabajo en redes sociales\n' +
                        '5. ❌ Terminar conversacón';
                    client.sendMessage(message.from, returnToMainMenu, { parse_mode: 'Markdown' });
                    chatStates[chatId].menu = true;
                    chatStates[chatId].submenu = null;
                }, 9000);
                chatStates[chatId].menu = true;
                chatStates[chatId].submenu = null;
                break;
            case '2':
                const returnToMainMenu = '*¿En que más puedo ayudarte el día de hoy?🤔* \n' +
                    '1. 💇🏻 Nuestros servicios\n' +
                    '2. 📅 Agendar Cita\n' +
                    '3. 📍 Ubicación en el mapa\n' +
                    '4. 🌐 Conoce nuestro trabajo en redes sociales\n' +
                    '5. ❌ Terminar conversacón';
                client.sendMessage(message.from, returnToMainMenu, { parse_mode: 'Markdown' });
                chatStates[chatId].menu = true;
                chatStates[chatId].submenu = null;
                break;
        }
    }
});

client.initialize();