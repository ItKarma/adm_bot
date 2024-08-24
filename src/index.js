import { Bot } from "grammy";
import { exec } from "child_process";

const bot = new Bot(process.env.TOKEN_BOT);


function executarComando(comando, ctx) {
    exec(comando, (error, stdout, stderr) => {
        if (error) {
            ctx.reply(`Erro ao executar o comando: ${error.message}`);
            return;
        }
        if (stderr) {
            ctx.reply(`Erro: ${stderr}`);
            return;
        }
        ctx.reply(`Resultado:\n${stdout}`);
    });
}

bot.command("start", (ctx) => {
    ctx.reply("<b>Olá seja bem-vindo, aqui estão meus comandos!.</b>\n /restart : <b>Reinicia este bot</b>\n /startt : <b>Inicia o outro bot no PM2</b>\n /stop : <b>Para o outro bot no PM2</b>\n /update : <b>Atualiza o outro bot e reinicia no PM2</b>", 
        { parse_mode: "HTML" }
    );
});

bot.command("restart", (ctx) => {
    ctx.reply("Reiniciando o bot atual...");

    setTimeout(() => {
        process.exit(0); 
    }, 1000); 
});

bot.command("startt", (ctx) => {
    executarComando("pm2 start bot_logs", ctx);
});

bot.command("stop", (ctx) => {
    executarComando("pm2 stop bot_logs", ctx);
});

bot.command("update", (ctx) => {
    executarComando("cd ../kyo-company && git pull && npm install && pm2 restart bot_logs", ctx);
});

bot.start();
