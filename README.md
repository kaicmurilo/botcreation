# Telegram Bot com Interações Simples

Este é um código em Node.js que implementa um bot do Telegram com interações simples. O bot recebe mensagens dos usuários e responde com base nas opções selecionadas.

## Pré-requisitos

Node.js instalado
Conta no Twilio para envio de mensagens SMS (Opcional)
Conta no Telegram para criar um bot e obter um token de acesso

## Configuração

Clone o repositório ou crie um novo arquivo para o código.
Execute o comando npm install para instalar as dependências necessárias: dotenv, twilio e node-telegram-bot-api.
Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis de ambiente:

```bash
TWILIO_ACCOUNT_SID=SEU_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=SEU_TWILIO_AUTH_TOKEN
WHATSAPP_PHONE_NUMBER=SEU_NUMERO_DE_TELEFONE_DO_WHATSAPP
YOUR_PHONE_NUMBER=SEU_NUMERO_DE_TELEFONE_PARA_RECEBER_SMS
TELEGRAM_TOKEN=SEU_TELEGRAM_TOKEN
```

Certifique-se de substituir os valores SEU_TWILIO_ACCOUNT_SID, SEU_TWILIO_AUTH_TOKEN, SEU_NUMERO_DE_TELEFONE_DO_WHATSAPP, SEU_NUMERO_DE_TELEFONE_PARA_RECEBER_SMS e SEU_TELEGRAM_TOKEN pelas suas próprias informações.

## Uso

Faça o download do código ou o clone:

```bash
git clone https://github.com/kaicmurilo/botcreation
```

Instale as depêndencias:

```bash
npm install
```

Execute o código usando o comando:

```bash
node bot.js
```

O bot enviará uma mensagem SMS para o número configurado informando que está ativo.

No Telegram, inicie uma conversa com o bot e envie mensagens de texto para interagir com ele. O bot responderá com base nas opções selecionadas ou saudará o usuário com base no horário atual.

## Funcionalidades

O bot envia uma mensagem SMS para informar que está ativo.
O bot responde às mensagens do Telegram com saudações apropriadas com base no horário atual.
O bot oferece opções para o usuário selecionar e responde com base nas opções escolhidas.
O bot lida com mensagens de áudio informando que ainda não há processamento para esse tipo de mensagem.
Fique à vontade para modificar e expandir o código para adicionar mais recursos e interações ao bot do Telegram.

## Observações

Certifique-se de ter configurado corretamente as credenciais do Twilio e do Telegram.
Lembre-se de tratar adequadamente os erros e exceções para garantir o bom funcionamento do bot.
Esse é apenas um exemplo básico de interação com um bot do Telegram. Sinta-se à vontade para adaptar o código e adicionar novas funcionalidades de acordo com suas necessidades.

## Requisições Externas

- twilioClient
- telegramBot
- Coingecko

Aplicação necessita de conexão com a internet.
