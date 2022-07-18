const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('this sends an embed in the channel you choose'),
    
    async execute(interaction) {
        const embed = new MessageEmbed()
                      .setColor('AQUA') 
                      .setTitle(interaction.options.getString('title')) 
                      .setDescription(interaction.options.getString('description'))
                      .thumbnail(client.user.avatarURL())
        
        const channel = interaction.options.getChannel('channel')

        channel.send('hiiii')
    }
}

