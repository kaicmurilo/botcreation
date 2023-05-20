require("dotenv").config();
// Importação das bibliotecas
const twilio = require("twilio");
const TelegramBot = require("node-telegram-bot-api");
const moment = require("moment");

// Configuração das credenciais
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

// Evento para enviar sms com twilio
twilioClient.messages
  .create({
    from: process.env.WHATSAPP_PHONE_NUMBER,
    body: "Bot ativo!",
    to: process.env.YOUR_PHONE_NUMBER,
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.error(err));

// Evento para receber mensagens do Telegram
telegramBot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const messageAudio = msg.voice;
  const nomeMensageiro = msg.chat.first_name + " " + msg.chat.last_name;

  console.log(msg);
  if (messageAudio) {
    telegramBot.sendMessage(
      chatId,
      `Ainda não temos processamento para Audio!`
    );
  }

  if (!["1", "2", "3"].includes(msg.text)) {
    // Obter a hora atual
    const currentTime = moment();

    // Definir as faixas de horário para as saudações
    const morningTime = moment("06:00", "HH:mm");
    const afternoonTime = moment("12:00", "HH:mm");
    const eveningTime = moment("18:00", "HH:mm");
    let greetingMessage = "";
    // Comparar a hora atual com as faixas de horário
    if (currentTime.isBetween(morningTime, afternoonTime)) {
      greetingMessage = "Bom dia!";
    } else if (currentTime.isBetween(afternoonTime, eveningTime)) {
      greetingMessage = "Boa tarde!";
    } else {
      greetingMessage = "Boa noite!";
    }

    telegramBot.sendMessage(
      chatId,
      `${greetingMessage} ${nomeMensageiro} \n Digite a opção desejada: \n 1 - Valor do Dólar \n 2 - Nome do Desenvolvedor do Bot \n 3 - Linguagem de Desenvolvimento`
    );
  }

  const options = {
    1: "Valor do dólar: A implementar.",
    2: "Desenvolvedor Responsável: Kaic Murilo Nunes.",
    3: "Linguagem de Desenvolvimento: Node.js / JavaScript.",
  };
  if (options[msg.text]) {
    telegramBot.sendMessage(chatId, `Você Digitou: ${messageText}`);
    telegramBot.sendMessage(chatId, options[msg.text]);
  }
  console.log(msg.text);
});
