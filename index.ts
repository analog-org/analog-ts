//dependancy for discordjs
const { Client, Intents, Collection } = require('discord.js');
const { clientId, guildId} = require('./config.json');
const { checkVirus } = require('./utils/checkvirus')
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ],
        partials: [
            'CHANNEL', // Required to receive DMs
        ] });

client.commands = new Collection();

/* 
    The following code below takes all the events in the events folder and put it in an array and filters it by .js files
    The entire thing allows handling events to be as easy as adding it to the events folder and then restarting the bot
*/
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
// This retrieves the event files and runs them if they should be run once or constantly ↓ this actually runs the event files code
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//This gets the command modules from the command folders
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// This executes slash commands when a player does a slash command
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName);

    if(!command) return

    try {
        await command.execute(interaction)
    } catch (error){
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})



//This is what logs the bot in
client.login(process.env.TOKEN)