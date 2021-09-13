const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./dash.js')
require('./message/group.js')

const starts = async (dashh = new WAConnection()) => {
	dashh.logger.level = 'warn'
	console.log(color(figlet.textSync('dashbot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[dashh]', 'cyan'), color('Owner is online now!', 'green'))
	console.log(color('[dashh]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'green'))
	dashh.browserDescription = ["Dash - BOT", "Firefox", "3.0.0"];

	// Menunggu QR
	dashh.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && dashh.loadAuthInfo(`./${setting.sessionName}.json`)
	dashh.on('connecting', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color(' ⏳ Connecting...'));
	})

	//connect
	dashh.on('open', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color('Bot is now online!'));
	})

	// session
	await dashh.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(dashh.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	dashh.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dashh.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	dashh.on('group-participants-update', async (anu) => {
		await welcome(dashh, anu)
	})

	dashh.on('chat-update', async (message) => {
		require('./dash.js')(dashh, message)
	})
}

starts()