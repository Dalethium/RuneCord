/* REQUIRED DEPENDENCIES */
var reload = require('require-reload');

/* REQUIRED FILES */
var _Logger = reload('../utils/Logger.js');

/* LOCAL VARIABLES */
var logger;

module.exports = function(bot, _settingsManager, config, guild) {
	if (logger === undefined) {
		logger = new _Logger(config.logTimestamp);
	}
	logger.logWithHeader('JOINED GUILD', 'bgGreen', 'black', `${guild.name} owned by ${guild.members.get(guild.ownerID).user.username}`);
	if (config.mixpanelToken) {
		mixpanel.track('guildCreate', {
			distinct_id: `${guild.id}`,
			name: `${guild.name}`,
			channels: `${guild.channels.size}`,
			members: `${guild.memberCount}`,
			ownerID: `${guild.ownerID}`,
			ownerUsername: `${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`
		});
	}
	if (config.bannedGuildIds.includes(guild.id)) {
		logger.logWithHeader('LEFT BANNED GUILD', 'bgRed', 'black', guild.name);
		guild.leave();
	} else {
		guild.defaultChannel.createMessage(':wave: Hello!\nYou can find my commands at https://unlucky4ever.github.io/RuneCord/commands.html or by doing `~help` and `)help`\nYou can get more information about me by doing ~about');
	}
}