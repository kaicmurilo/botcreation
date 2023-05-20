const twilio = require("twilio");
const TelegramBot = require("node-telegram-bot-api");
const moment = require("moment");
const axios = require("axios");
require("dotenv").config();

// Função para obter as cotações das moedas
async function obterCotacoes() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl"
    );

    return response.data;
  } catch (error) {
    return "Erro ao obter as cotações:", error.message;
  }
}

// Configuração das credenciais
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

// Evento para enviar SMS com Twilio (descomente se quiser utilizar)
/*
twilioClient.messages
  .create({
    from: process.env.WHATSAPP_PHONE_NUMBER,
    body: "Bot ativo!",
    to: process.env.YOUR_PHONE_NUMBER,
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.error(err));
*/

// Evento para receber mensagens do Telegram
telegramBot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const messageAudio = msg.voice;
  const nomeMensageiro = msg.chat.first_name + " " + msg.chat.last_name;

  if (messageAudio) {
    telegramBot.sendMessage(
      chatId,
      `Ainda não temos processamento para áudio!`
    );
    return;
  }

  if (!["1", "2", "3", "4"].includes(messageText)) {
    const currentTime = moment();
    const morningTime = moment("06:00", "HH:mm");
    const afternoonTime = moment("12:00", "HH:mm");
    const eveningTime = moment("18:00", "HH:mm");
    let greetingMessage = "";

    if (currentTime.isBetween(morningTime, afternoonTime)) {
      greetingMessage = "Bom dia!";
    } else if (currentTime.isBetween(afternoonTime, eveningTime)) {
      greetingMessage = "Boa tarde!";
    } else {
      greetingMessage = "Boa noite!";
    }

    telegramBot.sendMessage(
      chatId,
      `${greetingMessage} ${nomeMensageiro} \nDigite a opção desejada: \n1 - Valor do Dólar \n2 - Nome do Desenvolvedor do Bot \n3 - Linguagem de Desenvolvimento \n4 - Cotação Bitcoin e Ethereum`
    );
    return;
  }

  const options = {
    1: "Valor do dólar: A implementar.",
    2: "Desenvolvedor Responsável: Kaic Murilo Nunes.",
    3: "Linguagem de Desenvolvimento: Node.js / JavaScript.",
    4: "Aguarde enquanto as cotações são obtidas...",
  };

  if (messageText === "4") {
    const cotacoes = await obterCotacoes();

    if (cotacoes) {
      options[4] = `Bitcoin: R$ ${cotacoes.bitcoin.brl} \nEthereum: R$ ${cotacoes.ethereum.brl} \nValores obtidos em tempo real do Coingecko.`;
    }
  }

  if (options[messageText]) {
    telegramBot.sendMessage(chatId, `Você Digitou: ${messageText}`);
    telegramBot.sendMessage(chatId, options[messageText]);
  }
});
