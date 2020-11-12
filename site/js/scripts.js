var mode = Math.floor(Math.random() * 3);
var colors = ["", "", "rgb(255, 0, 0)", ""]
var color = 0
if (mode === 0) {
	colors[0] = "rgb(0, 0, 0)"
	colors[1] = "rgb(255, 255, 255)"
}
else if (mode === 1) {
	colors[0] = "rgb(255, 255, 255)"
	colors[1] = "rgb(0, 0, 0)"
}
else {
	colors[0] = "rgb(240, 0, 0)"
	colors[1] = "rgb(0, 0, 0)"
}
colors[3] = colors[0]

document.body.style.backgroundColor = colors[0];
document.body.style.color = colors[1];
document.body.style.opacity = 1;

function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, delayInms);
	});
}

async function fadein() {

	const mode2 = Math.floor(Math.random()*2)
	const x = Array.from(document.querySelectorAll('.letter:not(.silent)'))
	var t = 0.42
	const promise = x.map(async (elem) => {
		elem.onmouseover = async function(){
			color = (color + 1) % 4
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
			await delay((Math.floor(Math.random() * t * 1000)))
			elem.style.color = colors[(color++ + 1) % 4]
			await delay((Math.floor(Math.random() * t * 1000) / 2))
		}
		else {
			await delay(t * 500)
			elem.style.color = colors[(color++ + 1) % 2 + 1]
			await delay((Math.floor(Math.random() * t * 1000) / 2) + 4200)
		}
		elem.style.color = colors[(color++ + 1) % 4]
		await delay((Math.floor(Math.random() * t * 1000) / 2) + 4200)
		elem.style.color = colors[1];
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

fadein();
