# djs-logger
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falexislours%2Fdjs-logger.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Falexislours%2Fdjs-logger?ref=badge_shield)


djs-logger is a simple bot created with [discord.js](https://discord.js.org). It is used to store messages and attachments locally.


# Usage

**Don't use this software as is. It is against Discord's ToS and could result in your account getting terminated as it breaks EUD policy (End User Data). Learn more [here](https://discordapp.com/developers/docs/legal).**

To start the bot, simply type `node index.js` in a terminal while in the project folder.
Don't forget to add your token in config.json before starting it.

## Folder Structure

User messages are logged under :

    ./data/Server/Channel/UserTag/Snowflake.txt

Channel log is under :

    ./data/Server/Channel/Channel.txt

Attachments are saved under :

    ./data/Server/Channel/UserTag/media/timestamp.extension

UserTag is replaced by the snowflake of the user if it contains a forbidden character.



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falexislours%2Fdjs-logger.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Falexislours%2Fdjs-logger?ref=badge_large)