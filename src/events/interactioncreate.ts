
import { CommandInteraction, Interaction, InteractionType } from "discord.js";

//This logs all interactions
module.exports = {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      console.log(
      `At ${interaction.createdAt} ${interaction.user.tag} in #${interaction.channel.name} triggered ${interaction.type}.`
    );
    }
    
  },
};
