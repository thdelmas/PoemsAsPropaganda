var choices = [
	"a.html",
"ailleurs.html",
"a_m.html",
"antimoine.html",
"au_revoir.html",
"aventure.html",
"b.html",
"cloud_1.html",
"cloud_2.html",
"dam.html",
"de_l_atome_a_la_molecule.html",
"demon.html",
"distraction.html",
"echo.html",
"e_l_d_t.html",
"eve.html",
"flou.html",
"fous.html",
"haine.html",
"impassible.html",
"la_chute.html",
"la_course.html",
"la_femme.html",
"la_fleur.html",
"la_rame.html",
"la_recette.html",
"l_ascenceur.html",
"l_aube.html",
"l_eau.html",
"le_jour_d_un_attentat.html",
"le_premier_jour_bis.html",
"le_premier_jour.html",
"l_harmonie_de_la_demence.html",
"l_ile.html",
"l_oiseau.html",
"lupus.html",
"melodies.html",
"moustache.html",
"naissance.html",
"n_autre_monde.html",
"nuage_3.html",
"nuage_4.html",
"nuits_d_ete.html",
"o_paradis.html",
"osklau_saint_leger.html",
"osl_10.html",
"osl_11.html",
"osl_12.html",
"osl_2.html",
"osl_3.html",
"osl_4.html",
"osl_6.html",
"osl_7.html",
"osl_8.html",
"osl_9.html",
"osl_premiere.html",
"paris.html",
"petite_soeur.html",
"petit_papier_1.html",
"petit_papier_2.html",
"petit_papier_3.html",
"petit_papier_4.html",
"petit_papier_5.html",
"petit_papier_6.html",
"petit_papier_7.html",
"pourquoi_nommer_ce_qui_n_existe_pas.html",
"r_a_h_11.html",
"r_a_h_13.html",
"r_a_h_15.html",
"r_a_h_17.html",
"r_a_h_19.html",
"r_a_h_21.html",
"r_a_h_23.html",
"r_a_h_25.html",
"r_a_h_27.html",
"r_a_h_29.html",
"r_a_h_33.html",
"r_a_h_35.html",
"r_a_h_39.html",
"r_a_h_3.html",
"r_a_h_41.html",
"r_a_h_43.html",
"r_a_h_45.html",
"r_a_h_47.html",
"r_a_h_5.html",
"r_a_h_7.html",
"r_a_h_9.html",
"reflexion.html",
"sans_espoir.html",
"scars_11.html",
"scars_13.html",
"scars_15.html",
"scars_17.html",
"scars_19.html",
"scars_1.html",
"scars_23.html",
"scars_25.html",
"scars_27.html",
"scars_29.html",
"scars_31.html",
"scars_33.html",
"scars_35.html",
"scars_37.html",
"scars_39.html",
"scars_3.html",
"scars_41.html",
"scars_43.html",
"scars_45.html",
"scars_47.html",
"scars_51.html",
"scars_53.html",
"scars_55.html",
"scars_57.html",
"scars_59.html",
"scars_5.html",
"scars_61.html",
"scars_67.html",
"scars_69.html",
"scars_71.html",
"scars_73.html",
"scars_75.html",
"scars_77.html",
"scars_79.html",
"scars_81.html",
"scars_83.html",
"scars_85.html",
"scars_87.html",
"scars_91.html",
"scars_93.html",
"scars_95.html",
"scars_97.html",
"scars_9.html",
"temps.html",
"traversee.html",
"un.html",
"un_jour.html",
"un_poete_a_la_con.html",
"utopie.html",
"vivre_et_revivre.html"
]

var  palettes= new Array();
palettes[0] = new Array("rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(150, 0, 0)");
palettes[1] = new Array("rgb(0, 0, 0)", "rgb(120, 0, 0)", "rgb(150, 0, 0)");
palettes[2] = new Array("rgb(254, 246, 222)", "rgb(1, 42, 84)", "rgb(241, 47, 40)");
palettes[3] = new Array("rgb(212, 71, 67)", "rgb(19, 61, 85)", "rgb(219, 182, 151)");
palettes[4] = new Array("rgb(56, 36, 31)", "rgb(152, 31, 16)", "rgb(220, 156, 118)");
palettes[5] = new Array("rgb(33, 29, 26)", "rgb(140, 58, 49)", "rgb(150, 140, 116)");
palettes[6] = new Array("rgb(233, 46, 39)", "rgb(23, 16, 20)", "rgb(248, 229, 165)");
palettes[7] = new Array("rgb(25, 136, 36)", "rgb(236, 179, 64)", "rgb(190, 16, 51)");
palettes[8] = new Array("rgb(177, 30, 53)", "rgb(195, 41, 60)", "rgb(232, 209, 196)");
palettes[9] = new Array("rgb(194, 156, 112)", "rgb(69, 73, 78)", "rgb(198, 120, 27)");

var mode = Math.floor(Math.random() * 3);
var colors = palettes[Math.floor(Math.random() * palettes.length)]
let tmp1 = ""
let tmp2 = ""
let tmp3 = ""
while (tmp1 === tmp2 || tmp1 === tmp3 || tmp3 === tmp2) {
	palette = Math.floor(Math.random() * palettes.length)
	tmp1 = palettes[palette][Math.floor(Math.random() * 3)]
	tmp2 = palettes[palette][Math.floor(Math.random() * 3)]
	tmp3 = palettes[palette][Math.floor(Math.random() * 3)]
}

colors[0] = tmp1
colors[1] = tmp2
colors[2] = tmp3
colors[3] = colors[1]
colors[4] = colors[0]
colors[5] = colors[0]

document.body.style.backgroundColor = colors[0];
document.body.style.color = colors[1];
document.body.style.opacity = 1;

block = document.getElementById('home')
if (block) {
	block.onclick = function () {
		window.location.href = "poems/" + choices[Math.floor(Math.random() * choices.length)]
	}
}
else 
{
	document.body.onclick = function () {
		window.location.href = choices[Math.floor(Math.random() * choices.length)]
	}
}


function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delayInms);
	});
}

var color = 0;
async function fadein() {

	const mode2 = Math.floor(Math.random() * 3)
	const x = Array.from(document.querySelectorAll('.letter:not(.silent)'))
	var t = 0.42
	const promise = x.map(async (elem) => {
		elem.onmouseover = async function(){
			color = (color + 1) % 6
			elem.style.color = colors[color];
			await delay((Math.floor(Math.random() * 42 * 1000) / 2))
			elem.style.color = colors[1];
		}
		elem.style.color = colors[0]

		let getUrl = window.location;
		let baseUrl = getUrl.pathname.split('/');
		if (baseUrl[baseUrl.length - 1] === "index.html") {
			t += 0.21
		} else {
			t += 0.315
		}
		if (mode2 == 0)
		{
			await delay((Math.floor(Math.random() * 42000)))
			elem.style.color = colors[(color++ + 1) % 3 + 1]
			await delay((Math.floor(Math.random() * (t % 42) * 1000) / 2) + 42000)
		}
		else if (mode2 == 1) {
			await delay(Math.floor((0.315 * x.length - t) * 1000))
			elem.style.color = colors[(color++ + 1) % 3 + 1]
			await delay(Math.floor((((0.315 * x.length - t) * 1000)) / 2) + 42000)
		}
		else {
			await delay(Math.floor(t * 1000))
			elem.style.color = colors[(color++ + 1) % 3 + 1]
			await delay(Math.floor((t * 1000) / 2) + 42000)
		}
		elem.style.color = colors[(color++ + 1) % 6]
		await delay((Math.floor(Math.random() * (t % 42) * 1000) / 2))
		elem.style.color = colors[1];
		color += 7
	})
	await Promise.all(promise)
}

var y = document.querySelectorAll('.silent');
var j;

for (j = 0; j < y.length; j++) {
	y[j].style.color = colors[0];
	y[j].onmouseover = function(){
		if (this.style.color !== colors[0]) {
			this.style.color = colors[0];
		}
		else {
			this.style.color = colors[2];
		}
	}
}

const lines = Array.from(document.querySelectorAll('.line'))
lines.map((line) => {
	const chars = Array.from(line.querySelectorAll('.letter'))
	if (chars.length > 1 && ! block) {
		chars.map((c) => {
			c.style.fontSize = parseFloat((100 / (chars.length ))) + "vw"
		})
		line.style.fontSize = parseFloat((100 / (chars.length ))) + "vw"
	}
})

fadein();
