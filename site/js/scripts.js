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
	if (min == max) {
		return min
	} else if (min > max) {
		let tmp4 = min
		min = max
		max = tmp4
	}
	rand = Math.floor(Math.random() * max)
	while (rand < min || rand >= max) {
		rand = Math.floor(Math.random() * max)
	}
	return rand
}

var first_loop = true
var poemLines = Array.from(document.querySelectorAll('.line'))

async function showMe() {

	const poemLetters = Array.from(document.querySelectorAll('.letter:not(.silent)'))
	const poemLettersFull = Array.from(document.querySelectorAll('.letter'))
	const poemLineInterval = (poemDuration + 1) / poemLines.length
	const poemLetterInterval = (poemDuration + 1) / poemLetters.length
	//	console.log("Poem Duration: ", poemDuration)
	//	console.log("Poem Interval: ", poemLineInterval)

	// For each line
	// Dice line speed


	let globalLetterPosition = 0
	let linePosition = 0
	let is_US = poemOrder.united
	let random_l = randInRange(0,2)
	poemHTML = document.getElementById('poem')
	const promise = poemLines.map(async (line) => {
		linePosition++
		let lineTimer = 0
		let lineNumber = poemLines.length
		// Print row
		lineTimer += linePosition * poemLineInterval * (poemOrder.start % 2)
		// Print reverse
		lineTimer += (lineNumber - linePosition + 1) * poemLineInterval * (poemOrder.end % 2) 
		// Print Random
		lineTimer += Math.random() * (poemDuration + 1) * (poemOrder.random % 2) / linePosition
		// XFactor
		xFactor = ((poemOrder.start % 2) + (poemOrder.end % 2) + (poemOrder.random % 2)) % 3
		if (xFactor > 0) {
			lineTimer /= xFactor
		}
		lineTimer *= 1000
		const inlineLettersAll = Array.from(line.querySelectorAll('.letter:not(.silent)'))
		const inlineLetters = Array.from(line.querySelectorAll('.letter'))
		const lineDuration = Math.abs(Math.random() * ((poemDuration + 1) * (poemOrder.united % 2)) + (poemLineInterval * ((poemOrder.united + 1) % 2)) - Math.random())
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


		line.style.minWidth = "100vw"
		line.style.width = "100vw"
		if (inlineLettersAll.length <= 1)
		{
			line.style.maxHeight = 100 / (poemLines.length * 1.25) + "vh"
		} else {
			line.style.maxHeight = (inlineLetters.length / poemLettersFull.length) * 100
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
					letter.style.opacity = 1
					letter.style.maxWidth = (100 * 100) / (poemLines.length * inlineLetters.length) + sizeRef
					if (inlineLettersAll.length < 1) {
						letter.style.fontSize = 100 / (poemLines.length * 1.25) + sizeRef
						letter.style.width = 100 / (poemLines.length * 1.25) + sizeRef
						letter.style.minWidth = 100 / (poemLines.length * 1.25) + sizeRef
						letter.style.maxHeight = 100 / (poemLines.length * 1.25) + sizeRef
					} else {
						letter.style.fontSize = 100 / inlineLetters.length + sizeRef
						letter.style.width = 100 / inlineLetters.length + sizeRef
						letter.style.minWidth = 100 / inlineLetters.length + sizeRef
						letter.style.maxWidth = 100 / inlineLetters.length + sizeRef
						letter.style.maxHeight = 100 / inlineLetters.length + sizeRef
					}
					letter.style.color = colorSet[randInRange(0, 6)]
					await delay(timer + lineTimer)
					if (letter.classList.contains('silent')){
						letter.style.color = colorSet[randInRange(0, 2)]
					}
					else {
						letter.style.color = colorSet[randInRange(1, 3)]
					}
					await delay(randInRange((poemDuration + 1) * 4200, (poemDuration + 1) * 21000))
					letter.style.color = colorSet[randInRange(0, 2)]
					await delay(randInRange((poemDuration + 1) * 4200, (poemDuration + 1) * 21000))
					letter.style.color = colorSet[randInRange(1, 3)]
				}
			}
			await delay(timer + lineTimer)
			letter.style.opacity = 1
			letter.style.maxWidth = (100 * 100) / (poemLines.length * inlineLetters.length) + sizeRef
			if (inlineLettersAll.length < 1) {
				letter.style.fontSize = 100 / (poemLines.length * 1.25) + sizeRef
				letter.style.width = 100 / (poemLines.length * 1.25) + sizeRef
				letter.style.minWidth = 100 / (poemLines.length * 1.25) + sizeRef
				letter.style.maxHeight = 100 / (poemLines.length * 1.25) + sizeRef
			
			} else {
				letter.style.fontSize = 100 / inlineLetters.length + sizeRef
				letter.style.width = 100 / inlineLetters.length + sizeRef
				letter.style.minWidth = 100 / inlineLetters.length + sizeRef
				letter.style.maxWidth = 100 / inlineLetters.length + sizeRef
				letter.style.maxHeight = 100 / inlineLetters.length + sizeRef
			}
			if (letter.classList.contains('silent')){
				letter.style.color = colorSet[randInRange(0, 1)]
			}
			else {
				letter.style.color = colorSet[randInRange(1, 3)]
			}
			await delay(randInRange((poemDuration + 1) * 4200, (poemDuration + 1) * 21000))
			letter.style.color = colorSet[randInRange(0, 6)]
			await delay(randInRange((poemDuration + 1) * 4200, (poemDuration + 1) * 21000))
			letter.style.color = colorSet[randInRange(1, 3)]
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
	"epitres/1.html",
	"epitres/a_dev_null.html",
	"epitres/a_la_folie.html",
	"epitres/a_l_amiable.html",
	"epitres/a_la_seine.html",
	"epitres/a_plus_tard.html",
	"epitres/au_temps.html",
	"epitres/aux_vents.html",
	"epitres/betty.html",
	"epitres/charmante.html",
	"epitres/epitres_2.html",
	"epitres/epitres_3.html",
	"epitres/epitres_4.html",
	"epitres/epitres_5.html",
	"epitres/epitres_6.html",
	"epitres/homme.html",
	"epitres/le_vide_et_vous.html",
	"epitres/lune_rousse.html",
	"epitres/madame.html",
	"epitres/morphee.html",
	"epitres/o_nuit.html",
	"epitres/pauline.html",
	"epitres/tendre_et_chere.html",
	"otso_parmi_les_hommes/alienation.html",
	"otso_parmi_les_hommes/asynchrone.html",
	"otso_parmi_les_hommes/austere.html",
	"otso_parmi_les_hommes/belle.html",
	"otso_parmi_les_hommes/centrifuge.html",
	"otso_parmi_les_hommes/ce_qu_il_me_reste.html",
	"otso_parmi_les_hommes/ce_soir.html",
	"otso_parmi_les_hommes/chronologisme.html",
	"otso_parmi_les_hommes/comme_un_fou.html",
	"otso_parmi_les_hommes/darkfly.html",
	"otso_parmi_les_hommes/defosse.html",
	"otso_parmi_les_hommes/de_la_peine.html",
	"otso_parmi_les_hommes/de_la_vie_a_l_amour.html",
	"otso_parmi_les_hommes/de_ma_rage.html",
	"otso_parmi_les_hommes/desintegration.html",
	"otso_parmi_les_hommes/doux_nemesis.html",
	"otso_parmi_les_hommes/en_vain.html",
	"otso_parmi_les_hommes/epaves.html",
	"otso_parmi_les_hommes/erudits.html",
	"otso_parmi_les_hommes/esthete.html",
	"otso_parmi_les_hommes/fantome.html",
	"otso_parmi_les_hommes/imaginez_moi.html",
	"otso_parmi_les_hommes/interminable.html",
	"otso_parmi_les_hommes/je_pars.html",
	"otso_parmi_les_hommes/jeune.html",
	"otso_parmi_les_hommes/la_folie.html",
	"otso_parmi_les_hommes/l_an_nuit.html",
	"otso_parmi_les_hommes/la_peine.html",
	"otso_parmi_les_hommes/la_vie_s_enfuit.html",
	"otso_parmi_les_hommes/la_zone.html",
	"otso_parmi_les_hommes/le_bruit_de_mes_maux.html",
	"otso_parmi_les_hommes/le_jour_d_hui.html",
	"otso_parmi_les_hommes/les_etangs.html",
	"otso_parmi_les_hommes/les_mots.html",
	"otso_parmi_les_hommes/les_plus_belles_proses.html",
	"otso_parmi_les_hommes/ma_fougue.html",
	"otso_parmi_les_hommes/ma_panse.html",
	"otso_parmi_les_hommes/mon_poete.html",
	"otso_parmi_les_hommes/nu_et_deprave.html",
	"otso_parmi_les_hommes/otso_10.html",
	"otso_parmi_les_hommes/otso_11.html",
	"otso_parmi_les_hommes/otso_12.html",
	"otso_parmi_les_hommes/otso_13.html",
	"otso_parmi_les_hommes/otso_1.html",
	"otso_parmi_les_hommes/otso_2.html",
	"otso_parmi_les_hommes/otso_3.html",
	"otso_parmi_les_hommes/otso_4.html",
	"otso_parmi_les_hommes/otso_5.html",
	"otso_parmi_les_hommes/otso_6.html",
	"otso_parmi_les_hommes/otso_7.html",
	"otso_parmi_les_hommes/otso_8.html",
	"otso_parmi_les_hommes/otso_9.html",
	"otso_parmi_les_hommes/otso.html",
	"otso_parmi_les_hommes/paris_2018.html",
	"otso_parmi_les_hommes/paris_sous_la_neige.html",
	"otso_parmi_les_hommes/pas_si_vils.html",
	"otso_parmi_les_hommes/perdre_ses_mots.html",
	"otso_parmi_les_hommes/poeme_poeme.html",
	"otso_parmi_les_hommes/quelques_mots.html",
	"otso_parmi_les_hommes/rions.html",
	"otso_parmi_les_hommes/rouge_vif.html",
	"otso_parmi_les_hommes/sans_toi.html",
	"otso_parmi_les_hommes/s_ennuyer.html",
	"otso_parmi_les_hommes/si.html",
	"otso_parmi_les_hommes/si_je_m_endors.html",
	"otso_parmi_les_hommes/si_j_etais_fou.html",
	"otso_parmi_les_hommes/spleen.html",
	"otso_parmi_les_hommes/stylo.html",
	"otso_parmi_les_hommes/sublime_univers.html",
	"otso_parmi_les_hommes/sur_l_echafaud.html",
	"otso_parmi_les_hommes/sur_ma_vie.html",
	"otso_parmi_les_hommes/tacot.html",
	"otso_parmi_les_hommes/tout_commence_ici.html",
	"otso_parmi_les_hommes/un_lambeau.html",
	"otso_parmi_les_hommes/un_poeme_c_est_la_vie.html",
	"otso_parmi_les_hommes/un_poeme_d_emoi.html",
	"otso_parmi_les_hommes/venise.html",
	"reves_ecrits/a.html",
	"reves_ecrits/ailleurs.html",
	"reves_ecrits/a_m.html",
	"reves_ecrits/antimoine.html",
	"reves_ecrits/au_revoir.html",
	"reves_ecrits/aventure.html",
	"reves_ecrits/b.html",
	"reves_ecrits/cloud_1.html",
	"reves_ecrits/cloud_2.html",
	"reves_ecrits/dam.html",
	"reves_ecrits/de_l_atome_a_la_molecule.html",
	"reves_ecrits/demon.html",
	"reves_ecrits/distraction.html",
	"reves_ecrits/echo.html",
	"reves_ecrits/e_l_d_t.html",
	"reves_ecrits/eve.html",
	"reves_ecrits/flou.html",
	"reves_ecrits/fous.html",
	"reves_ecrits/haine.html",
	"reves_ecrits/impassible.html",
	"reves_ecrits/la_chute.html",
	"reves_ecrits/la_course.html",
	"reves_ecrits/la_femme.html",
	"reves_ecrits/la_fleur.html",
	"reves_ecrits/la_rame.html",
	"reves_ecrits/la_recette.html",
	"reves_ecrits/l_ascenceur.html",
	"reves_ecrits/l_aube.html",
	"reves_ecrits/l_eau.html",
	"reves_ecrits/le_jour_d_un_attentat.html",
	"reves_ecrits/le_premier_jour_bis.html",
	"reves_ecrits/le_premier_jour.html",
	"reves_ecrits/l_harmonie_de_la_demence.html",
	"reves_ecrits/l_ile.html",
	"reves_ecrits/l_oiseau.html",
	"reves_ecrits/lupus.html",
	"reves_ecrits/melodies.html",
	"reves_ecrits/moustache.html",
	"reves_ecrits/naissance.html",
	"reves_ecrits/n_autre_monde.html",
	"reves_ecrits/nuage_3.html",
	"reves_ecrits/nuage_4.html",
	"reves_ecrits/nuits_d_ete.html",
	"reves_ecrits/o_paradis.html",
	"reves_ecrits/osklau_saint_leger.html",
	"reves_ecrits/osl_10.html",
	"reves_ecrits/osl_11.html",
	"reves_ecrits/osl_12.html",
	"reves_ecrits/osl_2.html",
	"reves_ecrits/osl_3.html",
	"reves_ecrits/osl_4.html",
	"reves_ecrits/osl_6.html",
	"reves_ecrits/osl_7.html",
	"reves_ecrits/osl_8.html",
	"reves_ecrits/osl_9.html",
	"reves_ecrits/osl_premiere.html",
	"reves_ecrits/paris.html",
	"reves_ecrits/petite_soeur.html",
	"reves_ecrits/petit_papier_1.html",
	"reves_ecrits/petit_papier_2.html",
	"reves_ecrits/petit_papier_3.html",
	"reves_ecrits/petit_papier_4.html",
	"reves_ecrits/petit_papier_5.html",
	"reves_ecrits/petit_papier_6.html",
	"reves_ecrits/petit_papier_7.html",
	"reves_ecrits/pourquoi_nommer_ce_qui_n_existe_pas.html",
	"reves_ecrits/r_a_h_11.html",
	"reves_ecrits/r_a_h_13.html",
	"reves_ecrits/r_a_h_15.html",
	"reves_ecrits/r_a_h_17.html",
	"reves_ecrits/r_a_h_19.html",
	"reves_ecrits/r_a_h_21.html",
	"reves_ecrits/r_a_h_23.html",
	"reves_ecrits/r_a_h_25.html",
	"reves_ecrits/r_a_h_27.html",
	"reves_ecrits/r_a_h_29.html",
	"reves_ecrits/r_a_h_33.html",
	"reves_ecrits/r_a_h_35.html",
	"reves_ecrits/r_a_h_39.html",
	"reves_ecrits/r_a_h_3.html",
	"reves_ecrits/r_a_h_41.html",
	"reves_ecrits/r_a_h_43.html",
	"reves_ecrits/r_a_h_45.html",
	"reves_ecrits/r_a_h_47.html",
	"reves_ecrits/r_a_h_5.html",
	"reves_ecrits/r_a_h_7.html",
	"reves_ecrits/r_a_h_9.html",
	"reves_ecrits/reflexion.html",
	"reves_ecrits/sans_espoir.html",
	"reves_ecrits/scars_11.html",
	"reves_ecrits/scars_13.html",
	"reves_ecrits/scars_15.html",
	"reves_ecrits/scars_17.html",
	"reves_ecrits/scars_19.html",
	"reves_ecrits/scars_1.html",
	"reves_ecrits/scars_23.html",
	"reves_ecrits/scars_25.html",
	"reves_ecrits/scars_27.html",
	"reves_ecrits/scars_29.html",
	"reves_ecrits/scars_31.html",
	"reves_ecrits/scars_33.html",
	"reves_ecrits/scars_35.html",
	"reves_ecrits/scars_37.html",
	"reves_ecrits/scars_39.html",
	"reves_ecrits/scars_3.html",
	"reves_ecrits/scars_41.html",
	"reves_ecrits/scars_43.html",
	"reves_ecrits/scars_45.html",
	"reves_ecrits/scars_47.html",
	"reves_ecrits/scars_51.html",
	"reves_ecrits/scars_53.html",
	"reves_ecrits/scars_55.html",
	"reves_ecrits/scars_57.html",
	"reves_ecrits/scars_59.html",
	"reves_ecrits/scars_5.html",
	"reves_ecrits/scars_61.html",
	"reves_ecrits/scars_67.html",
	"reves_ecrits/scars_69.html",
	"reves_ecrits/scars_71.html",
	"reves_ecrits/scars_73.html",
	"reves_ecrits/scars_75.html",
	"reves_ecrits/scars_77.html",
	"reves_ecrits/scars_79.html",
	"reves_ecrits/scars_81.html",
	"reves_ecrits/scars_83.html",
	"reves_ecrits/scars_85.html",
	"reves_ecrits/scars_87.html",
	"reves_ecrits/scars_91.html",
	"reves_ecrits/scars_93.html",
	"reves_ecrits/scars_95.html",
	"reves_ecrits/scars_97.html",
	"reves_ecrits/scars_9.html",
	"reves_ecrits/temps.html",
	"reves_ecrits/traversee.html",
	"reves_ecrits/un.html",
	"reves_ecrits/un_jour.html",
	"reves_ecrits/un_poete_a_la_con.html",
	"reves_ecrits/utopie.html",
	"reves_ecrits/vivre_et_revivre.html"
]

poem = poems[randInRange(0, poems.length)]
////console.log("Poem: ", poem)
var home = document.getElementById('home')
if (home) {
	nextLink = "poems/" + poem	
	canvas = home
	var sizeRef = 'vw'
}
else 
{
	canvas = document.getElementById('poem')
	nextLink = "../" + poem
	var sizeRef = 'vw'
}
var kiosk = window.location.href.split('?')[1] === "kiosk"
if (kiosk) {
	setInterval(scrollSmooth, 84)
	document.getElementById('poem').style.overflowY = 'hidden'
	nextLink += '?kiosk'
	var sizeRef = 'vmin'
}
canvas.onclick = function () {
	window.location.href = nextLink
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
	poemDuration = randInRange(1, 420) / 200
} else {
	poemDuration = randInRange(1, 4200) / 200
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

function swapLines() {
	/**/let tmp = ''
	for (i = 0; i < poemLines.length - 1;) {
		if (i == 0) {
			tmp = poemLines[i].innerHTML
		}
		poemLines[i].innerHTML = poemLines[i + 1].innerHTML
		poemLines[i].style.opacity = 0
		i++;
	}
	poemLines[i].innerHTML = tmp
	poemLines[i].style.opacity = 1
	
	/*looper()*/
}

async function looper() {
	ij = 0
	/*while (ij < poemLines.length * 4.2)
	{*/
	await showMe()
		await delay(randInRange((poemDuration + 1) * 4200 , (poemDuration + 1) * 2 * 4200))
	ij++
	/*}*/
}
//setInterval(showMe, poemAnimationInterval * 1000)
// Welcome every one hope you don't get to much frustration, however it's inavoidable if you can't control it
////console.log(window.location.href)

var upsidedown = 1
function scrollSmooth() {
	document.getElementById('poem').scrollBy(0, upsidedown)
}

var lastScrollPosition = ''
setInterval(function () {
	if (parseFloat(poemLines[0].getBoundingClientRect().y) == parseFloat(lastScrollPosition))
	{
		upsidedown *= -1
	}
	lastScrollPosition = poemLines[0].getBoundingClientRect().y
}, 4200)
looper()
clearInterval()
setTimeout(() => { document.body.click()}, randInRange(42000, poemDuration * 1000 + 42000))