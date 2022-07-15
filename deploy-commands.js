//Discordjs dependancy 
const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guildId, clientId} = require('./config.json');

//dotenv dependancy
const dotenv = require('dotenv');
dotenv.config();
//Gets slash commands
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);

for (const file of commandFiles){
	const command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

//This actually registers the slash commands into the guild
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
