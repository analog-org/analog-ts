//This module logs the client name and tag that logs in 
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`The bot is up! Logged in as ${client.user.tag} at ${client.readyAt}`);
	},
};
