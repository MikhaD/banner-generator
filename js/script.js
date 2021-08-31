WebFont.load({ google: {families: ["Press Start 2P"], urls: ["https://fonts.googleapis.com/css?family=Press+Start+2P"]}, active: setBannerFont});
const timeEl = document.querySelector(".time span");
const textInput = document.querySelector("#banner-text");
const banner = document.querySelector("#banner");
const bannerImage = new Image();
const mic = document.querySelector("#mic");
const headphones = document.querySelector("#headphones");
const offsetHelper = document.querySelector("#offset-helper");
const leftOffset = document.querySelector("#left-offset");
const rightOffset = document.querySelector("#right-offset");
const alignButtons = document.querySelectorAll(".alignment");
const download = document.querySelector("#download-button");
const modal = document.querySelector("#modal");
const bannerPreview = document.querySelector("#banner-preview");

function offsetUpdate(e) {
	if (document.forms.alignmentButtons.elements.alignment.value === e.target.getAttribute("name")) {
		drawCanvas(textInput.value);
		console.log("updated canvas");
	}
}

leftOffset.addEventListener("input", offsetUpdate);
rightOffset.addEventListener("input", offsetUpdate);

banner.addEventListener("click", (e) => {
	const url = banner.toDataURL("img/png")
	modal.classList.remove("hidden");
	bannerPreview.src = url;
});

modal.addEventListener("click", (e) => {
	modal.classList.add("hidden");
})

for (const btn of alignButtons) {
	btn.addEventListener("click", (e) => {
		for (const i of alignButtons) {
			i.querySelector("img").classList.remove("checked");
		}
		e.target.classList.add("checked");
		drawCanvas(textInput.value, e.target.parentElement.getAttribute("for"));
	});
}



const c = document.createElement("canvas");
banner.width = 400;
banner.height = 35;
const ctx = banner.getContext("2d");
ctx.fillStyle = "white";

bannerImage.onload = function() {
	ctx.drawImage(bannerImage, 0, 0, 400, 35);
};

bannerImage.src = "./img/banners/nfr.svg";

textInput.addEventListener("input", (e) => {
	drawCanvas(e.target.value);
	download.href = banner.toDataURL("img/png");
	download.download = e.target.value;
});

timeEl.textContent = timeNow();

function timeNow() {
	const date = new Date();
	return `${date.getHours() % 12}:${date.getMinutes() < 10 ? "0": ""}${date.getMinutes()} ${date.getHours >= 12 ? "P" : "A"}M`;
}

function setBannerFont() {
	ctx.font = "24px 'Press Start 2P'";
	console.log("font set");
}

function toggleButton(e) {
	if (!e.target.classList.contains("off")) {
		e.target.classList.add("off");
		e.target.src = `img/icons/disabled ${e.target.id}.svg`;
	} else {
		e.target.classList.remove("off");
		e.target.src = `img/icons/${e.target.id}.svg`;
	}
}

function drawCanvas(text, alignment) {
	let offset = 0;
	switch (alignment || document.forms.alignmentButtons.elements.alignment.value) {
		case "center":
			offsetHelper.textContent = text;
			offset = banner.width/2 - offsetHelper.getBoundingClientRect().width/2;
			break;

		case "right":
			offsetHelper.textContent = text;
			offset = banner.width - (offsetHelper.getBoundingClientRect().width + parseInt(rightOffset.value));
			break;

		default:
			offset = leftOffset.value;
			break;
	}
	ctx.clearRect(0, 0, 400, 35);
	ctx.drawImage(bannerImage, 0, 0, 400, 35);
	ctx.fillText(text, offset, 30);
}

mic.addEventListener("click", toggleButton);
headphones.addEventListener("click", toggleButton);