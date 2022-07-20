import { Interaction, MessageEmbed, CommandInteractionOptionResolver, Message, CommandInteraction, ApplicationCommand } from "discord.js";

import {SlashCommandBuilder, SlashCommandStringOption} from '@discordjs/builders';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows a list of commands for the bot'),
    
    async execute(interaction: Interaction) {

        
    try {
        let commandsList: string | undefined
        const client = interaction.client
        const cmd = await client.application?.commands.fetch()
            
        commandsList = cmd?.map((cmd: ApplicationCommand) => `**/${cmd.name}** - ${cmd.description}`).join('\n')

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`${client.user.username}'s commands`)
                  .setDescription(`${commandsList}`)
                  .setThumbnail(client.user.avatarURL({dynamic:true}))
        
        await interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} did /help in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 commands', ephemeral: true })
            console.error(error)
        }
    }
}
