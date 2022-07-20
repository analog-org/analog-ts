import { CommandInteraction, Interaction, InteractionType } from "discord.js";

//This logs all interactions
module.exports = {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      switch (interaction.channel?.type) {
        case 'GUILD_TEXT'
      }
    }
  },
};
