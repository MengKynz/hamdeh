const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')
join = '\`\`\`New Member\`\`\` \n \`\`\`Nama :\`\`\` \n \`\`\`Askot : \`\`\` \n \`\`\`Umur :\`\`\` \n \`\`\`Status :\`\`\` \n\n - [ Semoga betah ya:) ] -'
leave = '\`\`\`Sayonaraa\`\`\`'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (dashh, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await dashh.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await dashh.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(dashh.user.jid)) {
            dashh.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(dashh.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await dashh.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = dashh.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`https://api.lolhuman.xyz/api/base/welcome?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/8006757df18f6f075514c.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
        dashh.sendMessage(anu.jid, { contentText: '\`\`\`New Member\`\`\` \n \`\`\`Nama :\`\`\` \n \`\`\`Askot : \`\`\` \n \`\`\`Umur :\`\`\` \n \`\`\`Status :\`\`\` \n\n - [ Semoga betah ya:) ] -', footerText: '©Created by Kynz', buttons: [{ buttonId: `!selamatdatang`, buttonText: { displayText: 'WELCOME ðŸ‘‹' }, type: 1 }], headerType: 6, locationMessage: { degreesLatitude: 0, degreesLongitude: 0, jpegThumbnail: buff }}, 'buttonsMessage')
       } 

      if (anu.action == "remove" && !mem.includes(dashh.user.jid)) {

        mdata = await dashh.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = dashh.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff2 = await getBuffer(`https://api.lolhuman.xyz/api/base/leave?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/8006757df18f6f075514c.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
        dashh.sendMessage(anu.jid, { contentText: '\`\`\`Sayonaraa ðŸ‘‹\`\`\`', footerText: '©Created by Kynz', buttons: [{ buttonId: `!bay`, buttonText: { displayText: 'SAYONARA ðŸ‘‹' }, type: 1 }], headerType: 6, locationMessage: { degreesLatitude: 0, degreesLongitude: 0, jpegThumbnail: buff2 }}, 'buttonsMessage')    
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
