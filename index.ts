//dependancy for discordjs
import {
  Client,
  Intents,
  Collection,
  ClientApplication,
  InteractionType,
  Interaction,
  CommandInteraction,
} from "discord.js";
import fs from "fs";
import dotenv, { config } from "dotenv";
import regCMD from "./src/deploy-commands";
import registerCMD from "./devconfig.json";
import path from "node:path";

dotenv.config();
export const client: any = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  partials: [
    "CHANNEL", // Required to receive DMs
  ],
});



/* 
    The following code below takes all the events in the events folder and put it in an array and filters it by .js files
    The entire thing allows handling events to be as easy as adding it to the events folder and then restarting the bot
*/
const eventPath = path.join(__dirname, "src/events")
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));
// This retrieves the event files and runs them if they should be run once or constantly ↓ this actually runs the event files code
for (const file of eventFiles) {
  const filePath = path.join(eventPath, file)
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}

client.commands = new Collection();
// This gets the command modules from the command folders
const cmdPath = path.join(__dirname, "src/commands");
const commandFiles = fs
  .readdirSync(cmdPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(cmdPath, file)
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// This executes slash commands when a player does a slash command
client.on("interactionCreate", async (interaction: CommandInteraction) => {
  

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

//This is what logs the bot in
client.login(process.env.TOKEN);
client.on("ready", async () => {
  console.log(
    `The bot is up! Logged in as ${client.user?.tag} at ${client.readyAt}`
  );
  if ((registerCMD as unknown as boolean) === true) {
    regCMD(client.user.id);
  } 
});
