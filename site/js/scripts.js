function getMedium() {
	let medium = 0;
	let i = 0;
	Array.from(document.querySelectorAll('.line')).map((line) => {
		medium += Array.from(line.querySelectorAll('.letter')).length
		i++
	})
	medium /= i
	return medium
}

function getMaxLen() {
	let max = 0;
	Array.from(document.querySelectorAll('.line')).map((line) => {
		let tmp = Array.from(line.querySelectorAll('.letter')).length
		if (tmp > max)
			max = tmp
	})
	return max
}


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
	const poemLettersFull = Array.from(document.querySelectorAll('.letter'))
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
	if (poemOrder.readable)
		document.getElementById("poem").style.overflow = 'scroll';
	else
		document.getElementById("poem").style.overflow = 'hidden';
	const promise = poemLines.map(async (line) => {
		linePosition++
		let lineTimer = 0
		let lineNumber = poemLines.length
		// Print row
		lineTimer += linePosition * poemLineInterval * (poemOrder.start % 2)
		// Print reverse
		lineTimer += (lineNumber - linePosition + 1) * poemLineInterval * (poemOrder.end % 2) 
		// Print Random
		lineTimer += Math.random() * poemDuration * (poemOrder.random % 2) / linePosition
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

		lineAnimationInterval = randInRange(0, lineDuration)
		//		//	console.log("Line animation interval: ", lineAnimationInterval)


		if (inlineLetters.length > 1 && ! home) {
			line.style.minWidth = "100vw"
			line.style.width = "100vw"
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
			timer += Math.random() * lineDuration * (lineOrder.random % 2) / letterPosition
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
					timer += Math.random() * lineDuration * (lineOrder.random % 2) / letterNumber
					//					console.log(lineDuration)
					// XFactor
					xFactor = ((lineOrder.start % 2) + (lineOrder.end % 2) + (lineOrder.random % 2)) % 3
					if (xFactor > 0) {
						timer /= xFactor
					}
					// Pass millisceonds
					timer *= 1000

					if (inlineLetters.length > 1 && ! home) {
						if (poemOrder.readable)
						{
							letterSize = 100 /  ((getMedium() + inlineLetters.length) / 2)
							letter.style.maxWidth = letterSize + "vw"
							letter.style.fontSize = letterSize + "vw"
						}
					else
					{
						letterSize = 100 / (poemLettersFull.length / (getMaxLen() - inlineLetters.length + 1))
						letter.style.maxWidth = letterSize + "vmin"
						letter.style.fontSize = letterSize + "vmin"
					}
						letter.style.opacity = 1
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
				if (poemOrder.readable)
						{
							letterSize = 100 /  ((getMedium() + inlineLetters.length) / 2)
							letter.style.maxWidth = letterSize + "vw"
							letter.style.fontSize = letterSize + "vw"
						}
					else
					{
						letterSize = 100 / (poemLettersFull.length / (getMaxLen() - inlineLetters.length + 1))
						letter.style.maxWidth = letterSize + "vmin"
						letter.style.fontSize = letterSize + "vmin"
					}
						letter.style.opacity = 1
					}
			if (letter.classList.contains('silent')){
				letter.style.color = colorSet[randInRange(0, 1)]
			}
			else {
				letter.style.color = colorSet[randInRange(1, 3)]
			}
		})
		await promise2
		line.style.opacity = 1
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



colorThemes[0] = new Array("rgb(20, 20, 20)", "rgb(161, 51, 36)", "rgb(113, 30, 29)");
colorThemes[1] = new Array("rgb(27, 137, 38)", "rgb(123, 2, 46)", "rgb(233, 180, 68)");
colorThemes[2] = new Array("rgb(69, 169, 122)", "rgb(206, 233, 219)", "rgb(1, 38, 12)");
colorThemes[3] = new Array("rgb(110, 145, 203)", "rgb(21, 52, 102)", "rgb(0, 0, 0)");
colorThemes[4] = new Array("rgb(36, 25, 42)", "rgb(122, 139, 143)", "rgb(45, 109, 59)");
colorThemes[5] = new Array("rgb(201, 177, 129)", "rgb(129, 135, 125)", "rgb(41, 26, 32)");
colorThemes[6] = new Array("rgb(43, 40, 47)", "rgb(169, 57, 31)", "rgb(224, 201, 160)");
colorThemes[7] = new Array("rgb(208, 180, 153)", "rgb(55, 59, 70)", "rgb(143, 53, 52)");
colorThemes[8] = new Array("rgb(215, 179, 29)", "rgb(84, 126, 135)", "rgb(47, 65, 100)");
colorThemes[9] = new Array("rgb(228, 204, 178)", "rgb(182, 48, 34)", "rgb(33, 55, 98)");
colorThemes[10] = new Array("rgb(248, 157, 24)", "rgb(255, 255, 255)", "rgb(0, 0, 0)");
colorThemes[11] = new Array("rgb(185, 167, 117)", "rgb(51, 37, 34)", "rgb(145, 39, 32)");

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
	poemDuration = randInRange(0, 420) / 200
} else {
	poemDuration = randInRange(0, 4200) / 200
}
////console.log("Poem speed (seconds): ", poemDuration)



// Dice poem order
// This will be used for the appear/disappear thing
// 4 binary values combined drive to 255 different way to show a poem

let poemOrder = {
	start: (randInRange(0,100) >= 42),
	end: (randInRange(0,100) <= 42),
	random: (randInRange(0,100) <= 70),
	united: (randInRange(0,100) <= 30),
	readable: (randInRange(0,100) <= 50)
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
		await delay(randInRange(poemDuration * 4200, poemDuration * 2 * 4200))
		clearInterval()
	}
}
//setInterval(showMe, poemAnimationInterval * 1000)
// Welcome every one hope you don't get to much frustration, however it's inavoidable if you can't control it
////console.log(window.location.href)
//
looper()
