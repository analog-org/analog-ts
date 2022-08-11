
import { ActionRow, ActionRowBuilder, ButtonInteraction, EmbedBuilder, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction, SelectMenuInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { client } from "../../../index";

module.exports = {
  data: {
    name: `currentMood`,
  },
  async execute(interaction: SelectMenuInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(`#6bde36`)
        .setTitle(`${client.user?.username}'s commands`)
        .setDescription(`${client.user.username}`)
        .setThumbnail(client.user?.avatarURL({ forceStatic: false })!);

      const modal = new ModalBuilder()
        .setTitle('Why do you feel that way?')
        .setCustomId('explainMood')
        .setComponents(
          new ActionRowBuilder<ModalActionRowComponentBuilder>()
            .addComponents( 
              new TextInputBuilder()
                .setLabel('Why do you feel that way?')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Explain why you feel this way')
                .setCustomId('explain_mood')
            )
        )
      
      await interaction.showModal(modal)
    } catch (error) {
      await interaction.reply({
        content: "This server has 0 commands",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
