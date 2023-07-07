let editor = ace.edit("editor");
editor.setTheme("ace/theme/nord_dark");
editor.session.setMode("ace/mode/javascript");

let gameHTML = "";
let fakeJS = "";

await fetch("game.html").then(response => {
	return response.text();
}).then(data => {
	gameHTML = data;
});

await fetch("fake.js").then(response => {
	return response.text();
}).then(data => {
	fakeJS = data;
});

editor.setValue(fakeJS, -1);

document.querySelector("#bar").addEventListener("click", async () => {
	let tempHTML = gameHTML;

	tempHTML = tempHTML.replace("{% fake.js %}", editor.getValue());

	document.querySelector("#game").srcdoc = tempHTML;
});