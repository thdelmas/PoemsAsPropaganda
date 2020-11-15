function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delayInms);
	});
}



// My best friend the contingency

function randInRange(min, max) {
	rand = Math.floor(Math.random() * max)
	while (rand < min || rand >= max) {
		rand = Math.floor(Math.random() * max)
	}
	return rand
}

var first_loop = true

async function showMe() {
	const poemLines = Array.from(document.querySelectorAll('.line'))
	const poemLetters = Array.from(document.querySelectorAll('.letter:not(.silent)'))
	const poemLineInterval = poemDuration / poemLines.length
	const poemLetterInterval = poemDuration / poemLetters.length
	//	console.log("Poem Duration: ", poemDuration)
	//	console.log("Poem Interval: ", poemLineInterval)

	// For each line
	// Dice line speed


	let globalLetterPosition = 0
	let linePosition = 0
	let is_US = poemOrder.united
	let random_l = randInRange(0,2)
	const promise = poemLines.map(async (line) => {
		linePosition++
		let lineTimer = 0
		let lineNumber = poemLines.length
		// Print row
		lineTimer += linePosition * poemLineInterval * (poemOrder.start % 2)
		// Print reverse
		lineTimer += (lineNumber - linePosition + 1) * poemLineInterval * (poemOrder.end % 2) 
		// Print Random
		lineTimer += Math.random() * poemDuration * (poemOrder.random % 2)
		// XFactor
		xFactor = ((poemOrder.start % 2) + (poemOrder.end % 2) + (poemOrder.random % 2)) % 3
		if (xFactor > 0) {
			lineTimer /= xFactor
		}
		lineTimer *= 1000
		const inlineLettersAll = Array.from(line.querySelectorAll('.letter:not(.silent)'))
		const inlineLetters = Array.from(line.querySelectorAll('.letter'))
		const lineDuration = Math.abs(Math.random() * (poemDuration * (poemOrder.united % 2)) + (poemLineInterval * ((poemOrder.united + 1) % 2)) - Math.random())
		//		//		console.log("Line speed (seconds): ", lineDuration)
		const inlineLetterInterval = lineDuration / inlineLetters.length



		// Dice line order
		// This will be used for the appear/disappear thing
		// 4 binary values combined drive to 255 different way to show a poem

		if (poemOrder.united == 1 && poemOrder.random == 0)
			isnot_US = 0
		else
			isnot_US = 1
		let lineOrder = {
			start: (randInRange(0,100) >= 42) * isnot_US + poemOrder.start * ((isnot_US + 1) % 2),
			end: (randInRange(0,100) <= 42) * isnot_US + poemOrder.end * ((isnot_US + 1) % 2),
			random: (randInRange(0,100) <= 30) * isnot_US + poemOrder.random * ((isnot_US + 1) % 2),
			united: (randInRange(0, 100) <= 70) * isnot_US + ((isnot_US + 1) % 2) * poemOrder.united,
		}
		//		console.log("Line order", lineOrder)



		// Dice line color speed

		lineAnimationInterval = randInRange(0, 4200) / 100
		//		//	console.log("Line animation interval: ", lineAnimationInterval)


		if (inlineLetters.length > 1 && ! home) {
			line.style.minWidth = "100vw"
			line.style.Height = parseFloat((100 / poemLines.length)) + "vh"
			line.style.fontSize = parseFloat((100 / inlineLetters.length)) + "vw"
		}

		// MAGICS

		let inlineLetterPosition = 0
		const promise2 = inlineLetters.map(async (letter) => {
			globalLetterPosition++
			inlineLetterPosition++
			let letterPosition = globalLetterPosition * (lineOrder.united % 2) + inlineLetterPosition * ((lineOrder.united + 1) % 2)
			let letterInterval = poemLetterInterval * (lineOrder.united % 2) + inlineLetterInterval * ((lineOrder.united + 1) % 2) 
			let letterNumber = poemLetters.length * (lineOrder.united % 2) + inlineLetters.length * ((lineOrder.united + 1) % 2)
			let timer = 0
			// Print row
			timer += letterPosition * letterInterval * (lineOrder.start % 2)
			// Print reverse
			timer += (letterNumber - letterPosition + 1) * letterInterval * (lineOrder.end % 2) 
			// Print Random
			timer += Math.random() * lineDuration * (lineOrder.random % 2)
			//			console.log(lineDuration)
			// XFactor
			xFactor = ((lineOrder.start % 2) + (lineOrder.end % 2) + (lineOrder.random % 2)) % 3
			if (xFactor > 0) {
				timer /= xFactor
			}
			// Pass millisceonds
			timer *= 1000
			if (first_loop) {
				letter.onmouseover = async function () {
					let timer = 0
					// Print row
					timer += letterPosition * letterInterval * (lineOrder.start % 2)
					// Print reverse
					timer += (letterNumber - letterPosition + 1) * letterInterval * (lineOrder.end % 2) 
					// Print Random
					timer += Math.random() * lineDuration * (lineOrder.random % 2)
					//					console.log(lineDuration)
					// XFactor
					xFactor = ((lineOrder.start % 2) + (lineOrder.end % 2) + (lineOrder.random % 2)) % 3
					if (xFactor > 0) {
						timer /= xFactor
					}
					// Pass millisceonds
					timer *= 1000

					if (inlineLetters.length > 1 && ! home) {
						letter.style.maxWidth = parseFloat((100 / inlineLetters.length)) + "vw"
						letter.style.width = parseFloat((100 / inlineLetters.length)) + "vw"
					}
					letter.style.color = colorSet[randInRange(0, 6)]
					await delay(timer + lineTimer)
					if (letter.classList.contains('silent')){
						letter.style.color = colorSet[randInRange(0, 2)]
					}
					else {
						letter.style.color = colorSet[randInRange(1, 3)]
					}
				}
			}
			await delay(timer + lineTimer)

			if (inlineLetters.length > 1 && ! home) {
				letter.style.maxWidth = parseFloat((100 / inlineLetters.length)) + "vw"
				letter.style.width = parseFloat((100 / inlineLetters.length)) + "vw"
			}
			if (letter.classList.contains('silent')){
				letter.style.color = colorSet[randInRange(0, 1)]
			}
			else {
				letter.style.color = colorSet[randInRange(1, 3)]
			}
		})
		await promise2
	})
	first_loop = false
	await Promise.all(promise)
}





// Contingency is really important for me because it's what we face every day especially when we are trying to do something specific,
// In my case trying to write poems

// Why do you care don't you like poetry ? Do you like just this one ?

// Long and dirty list of my personnal productions

var poems = [
"1.html",
"a_dev_null.html",
"a.html",
"ailleurs.html",
"a_la_folie.html",
"a_l_amiable.html",
"a_la_seine.html",
"a_m.html",
"antimoine.html",
"a_plus_tard.html",
"au_revoir.html",
"au_temps.html",
"aventure.html",
"betty.html",
"b.html",
"charmante.html",
"cloud_1.html",
"cloud_2.html",
"dam.html",
"de_l_atome_a_la_molecule.html",
"demon.html",
"distraction.html",
"echo.html",
"e_l_d_t.html",
"epitres_2.html",
"epitres_3.html",
"epitres_4.html",
"epitres_5.html",
"epitres_6.html",
"eve.html",
"flou.html",
"fous.html",
"haine.html",
"homme.html",
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
"le_vide_et_vous.html",
"l_harmonie_de_la_demence.html",
"l_ile.html",
"l_oiseau.html",
"lune_rousse.html",
"lupus.html",
"madame.html",
"melodies.html",
"morphee.html",
"moustache.html",
"naissance.html",
"n_autre_monde.html",
"nuage_3.html",
"nuage_4.html",
"nuits_d_ete.html",
"o_nuit.html",
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
"pauline.html",
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
"tendre_et_chere.html",
"traversee.html",
"un.html",
"un_jour.html",
"un_poete_a_la_con.html",
"utopie.html",
"vivre_et_revivre.html"
]

poem = poems[randInRange(0, poems.length)]
////console.log("Poem: ", poem)

home = document.getElementById('home')
if (home) {
	home.onclick = function () {
		window.location.href = "poems/" + poem
	}
}
else 
{
	document.body.onclick = function () {
		window.location.href = poem
	}
}


// First step of the random road
// Which poem will be displayed ? 


// Second step, don't choose a theme 
// Because blood and dark are cool and all but we need to get out of here

// List of sets of 3 colors inspired mostly by terror and propagand
// Just because some words needs to hit your mind really hard

var  colorThemes = new Array();
colorThemes[0] = new Array("rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(150, 0, 0)");
colorThemes[1] = new Array("rgb(0, 0, 0)", "rgb(120, 0, 0)", "rgb(150, 0, 0)");
colorThemes[2] = new Array("rgb(254, 246, 222)", "rgb(1, 42, 84)", "rgb(241, 47, 40)");
colorThemes[3] = new Array("rgb(212, 71, 67)", "rgb(19, 61, 85)", "rgb(219, 182, 151)");
colorThemes[4] = new Array("rgb(56, 36, 31)", "rgb(152, 31, 16)", "rgb(220, 156, 118)");
colorThemes[5] = new Array("rgb(33, 29, 26)", "rgb(140, 58, 49)", "rgb(150, 140, 116)");
colorThemes[6] = new Array("rgb(233, 46, 39)", "rgb(23, 16, 20)", "rgb(248, 229, 165)");
colorThemes[7] = new Array("rgb(25, 136, 36)", "rgb(236, 179, 64)", "rgb(190, 16, 51)");
colorThemes[8] = new Array("rgb(177, 30, 53)", "rgb(195, 41, 60)", "rgb(232, 209, 196)");
colorThemes[9] = new Array("rgb(194, 156, 112)", "rgb(69, 73, 78)", "rgb(198, 120, 27)");

colorSet = colorThemes[randInRange(0, colorThemes.length)]
////console.log("Color Theme: ", colorSet)



// Third step, get a colorful podium
// Which color will be background, foreground, highlight ?
// What a privilege

let tmp1 = ""
let tmp2 = ""
let tmp3 = ""
while (tmp1 === tmp2 || tmp1 === tmp3 || tmp3 === tmp2) {
	tmp1 = colorSet[randInRange(0, 3)]
	tmp2 = colorSet[randInRange(0, 3)]
	tmp3 = colorSet[randInRange(0, 3)]
}

colorSet[0] = tmp1
colorSet[1] = tmp2
colorSet[2] = tmp3
colorSet[3] = colorSet[1]
colorSet[4] = colorSet[0]
colorSet[5] = colorSet[0]
document.body.style.backgroundColor = colorSet[0];
document.body.style.color = colorSet[1];
////console.log("Color Set: ", colorSet)



// Dice poem speed in seconds

if (home) {
	poemDuration = randInRange(42, 420 / 2) / 100
} else {
	poemDuration = randInRange(42, 4200 / 4) / 100
}
////console.log("Poem speed (seconds): ", poemDuration)



// Dice poem order
// This will be used for the appear/disappear thing
// 4 binary values combined drive to 255 different way to show a poem

let poemOrder = {
	start: (randInRange(0,100) >= 42),
	end: (randInRange(0,100) <= 42),
	random: (randInRange(0,100) <= 30),
	united: (randInRange(0,100) <= 70)
}
////console.log("Poem order: ", poemOrder)



// Dice poem color speed

poemAnimationInterval = randInRange(0, 4200) / 100
////console.log("Poem Shadow speed: ", poemAnimationInterval)

Array.from(document.querySelectorAll('.letter')).map((letter) => {
	letter.style.color = colorSet[0]
})

async function looper() {
	while (true) {
		showMe()
		await delay(randInRange(21000, 42000))
	}
}
//setInterval(showMe, poemAnimationInterval * 1000)
// Welcome every one hope you don't get to much frustration, however it's inavoidable if you can't control it
////console.log(window.location.href)
//
looper()
