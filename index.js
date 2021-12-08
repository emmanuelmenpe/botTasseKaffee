require('dotenv').config();
const { Telegraf } = require('telegraf');

//crear bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async(ctx) => {
    await bienvenida(ctx);
    await menuPrincipal(ctx);
});

//actions
bot.action('menu', async(ctx) => {
    await mostrarMenu(ctx);
});

bot.action('ubicacion', async(ctx) => {
    await mostrarUbicacion(ctx);
    await menuPrincipal(ctx);
});

bot.action('horario', async(ctx) => {
    await mostrarHorario(ctx);
    await menuPrincipal(ctx);
});

bot.action('redes', (ctx) => {
    mostrarRedes(ctx);
});

bot.action('creditos', async(ctx) => {
    await mostrarCreditos(ctx);
    await menuPrincipal(ctx);
});

bot.action('comida',async(ctx) => {
    await mostrarMenuComida(ctx);
    await menuPrincipal(ctx);
});

bot.action('bebida',(ctx) => {
    mostrarMenuBebida(ctx);
    menuPrincipal(ctx);
});

//extras pero no inportantes
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('video', (ctx) => ctx.reply('👍'));
bot.on('voice', (ctx) => ctx.reply('👍'));
bot.on('animation', (ctx) => ctx.reply('👍'));
bot.on('audio', (ctx) => ctx.reply('👍'));
bot.on('document', (ctx) => ctx.reply('👍'));
bot.on('message', (ctx) => ctx.reply('👍'))

//inicializar bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

//functions

async function bienvenida(ctx) {
    const bienvenida = `*¡Bienvenido ${ctx.from.first_name}! Este es un bot creado para mostrarle la información principal de la cafetería.*`;
    await bot.telegram.sendMessage(ctx.chat.id,bienvenida,{
        disable_notification:true,
        parse_mode: 'Markdown'
    });
}

async function menuPrincipal(ctx) {
    const mensaje = `Esta son las opciones que puedes hacer:`;
    await bot.telegram.sendMessage(ctx.chat.id, mensaje,{
        reply_markup:{
            inline_keyboard: [
                [
                    {text: "Ver menú", callback_data:'menu'}
                ],
                [
                    {text: "Ubicación", callback_data:'ubicacion'}
                ],
                [
                    {text: "Horario", callback_data:'horario'}
                ],
                [
                    {text: "Redes sociales", callback_data:'redes'}
                ],
                [
                    {text: "Creditos", callback_data:'creditos'}
                ]
            ]
        },
        disable_notification:true,
    });
}

async function mostrarMenu(ctx) {
    ctx.answerCbQuery('Mostrar el menú de la cafetería');
    const Mensaje = "estas son las opciones del menu"
    await bot.telegram.sendMessage(ctx.chat.id, Mensaje, {
        reply_markup:{
            inline_keyboard: [
                [
                    {text: "Comida", callback_data:'comida'},
                    {text: "Bebida", callback_data:'bebida'},
                ],
            ]
        },
        disable_notification:true,
    });
}

async function mostrarUbicacion(ctx) {
    ctx.answerCbQuery('Mostrar ubicación de la cafetería');
    const direction = process.env.direccion;
    await bot.telegram.sendMessage(ctx.chat.id,`*${direction}*`,{parse_mode: 'Markdown'});
    await bot.telegram.sendLocation(ctx.chat.id,process.env.Latitude,process.env.Longitude);
}

async function mostrarHorario(ctx) {
    ctx.answerCbQuery('mostrar horario de la cafetería');
    const horario='*Tasse Kaffee tiene un horario de lunes a viernes de 16 a 21 horas*';
    await bot.telegram.sendMessage(ctx.chat.id,horario,{
        disable_notification:true,
        parse_mode: 'Markdown'
    });
}

async function mostrarRedes(ctx) {
    ctx.answerCbQuery('Mostrar redes sociales de tasse kaffee');
    const Mensaje = "Redes sociales de tasse kaffee";
    await bot.telegram.sendMessage(ctx.chat.id, Mensaje, {
        reply_markup:{
            inline_keyboard: [
                [
                    {text: "Facebook", url:process.env.facebook},
                    {text: "Tik Tok", url:process.env.tikTok},
                ]
                
            ]
        },
        disable_notification:true,
    });
}

async function mostrarCreditos(ctx) {
    ctx.answerCbQuery('Mostrar Créditos');
    const creditosBot='*creditos del autor*';
    await bot.telegram.sendMessage(ctx.chat.id,creditosBot,{
        disable_notification:true,
        parse_mode: 'Markdown'
    });
}

async function mostrarMenuComida(ctx) {
    ctx.answerCbQuery('Mostrar menú de comida');
    const comidaMenu='Este es el menu de comida';
    await bot.telegram.sendMessage(ctx.chat.id,comidaMenu,{
        disable_notification:true,
        parse_mode: 'Markdown'
    });
}

async function mostrarMenuBebida(ctx) {
    ctx.answerCbQuery('Mostrar menú de bebida');
    const bebidaMenu='Este es el menu de bebidas';
    await bot.telegram.sendMessage(ctx.chat.id,bebidaMenu,{
        disable_notification:true,
    });
}