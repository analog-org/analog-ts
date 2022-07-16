// Discordjs dependancy

// const fs = require("fs");
import fs from "fs";
import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { guildId, clientId } from "./config.json"

// dotenv dependancy

const dotenv = require("dotenv");
dotenv.config();
//Gets slash commands
const commands = [];
const cmdFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

for (const file of cmdFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// This actually registers the slash commands into the guild
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
