const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs-extra');
const https = require('https');
const path = require('path');

//Forbidden characters for file/folder name.
const forbiddenChars = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*"];


client.once('ready', () => {
  console.log('\x1b[32m%s\x1b[0m', 'Ready! Logged in as ' + client.user.tag + '\n');
  client.user.setPresence({ status: 'online' })
});

client.on('error', console.error);

client.on('message', message => {
  var userName;

  //Use snowflake if user.tag contains a forbidden character.
  if (forbiddenChars.some(value => message.author.tag.includes(value))) {
    userName = message.author.id;
  } else {
    userName = message.author.tag;
  }

  //Logs messages.
  if (message.content && message.guild) {
    console.log(message.author.tag + ' on ' + message.guild.name + ' ' + message.channel.name + ':\n' + message.content + '\n')
    const destUser = __dirname + '/data/' + message.guild.name + '/' + message.channel.name + '/' + userName + '/' + message.author.id + '.txt'
    const destChannel = __dirname + '/data/' + message.guild.name + '/' + message.channel.name + '/' + message.channel.name + '.txt'
    fs.ensureFile(destUser)
      .then(() => {
        fs.appendFile(destUser, message.createdAt + '\n' + message.content + '\n\r', function (err) {
          if (err) {
            return console.log(err);
          }
        });
      })
      .catch(err => {
        console.log(err)
      });
    fs.ensureFile(destChannel)
      .then(() => {
        fs.appendFile(destChannel, message.author.tag + ' (' + message.author.id + ') ' + message.createdAt + '\r' + message.content + '\n\r', function (err) {
          if (err) {
            return console.log(err);
          }
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  //const to check if message contains an attachment.
  const attachment = message.attachments.first();


  //Saves attachments.
  if (attachment != undefined && message.guild) {
    const destFile = __dirname + '/data/' + message.guild.name + '/' + message.channel.name + '/' + userName + '/media/' + message.createdTimestamp + path.extname(attachment.url);
    console.log('\x1b[32m%s\x1b[0m', `Saving file: ${message.createdTimestamp + path.extname(attachment.url)} (${(attachment.filesize / 1048576).toFixed(6)} Mo) from ${message.author.tag} on ${message.guild.name} ${message.channel.name}\n`);
    const url = attachment.url;
    fs.ensureFile(destFile)
      .then(() => {
        const file = fs.createWriteStream(destFile);
        const request = https.get(url, function (response) {
          response.pipe(file);
        });
      })
      .catch(err => {
        console.log(err)
      })
  }
});

client.login(token);