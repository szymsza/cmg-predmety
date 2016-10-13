var classes = [
	"Prima", "Sekunda", "Tercie", "Kvarta",
	"Kvinta", "Sexta", "Septima", "Oktáva",
	"Šestka", "Sedmička", "Osmička", "Devítka"
];

chrome.storage.sync.get("className", result => {
	var current = result.className || "Prima";

	for (var c in classes) { // loop through classes names
		var cl = classes[c],
			selected = "";

		if (current == cl)
			selected = " selected";

		document.querySelector("select").innerHTML += "<option data-cl='"+cl+"'"+selected+">"+cl+"</option>"; // render select
	}
});

document.querySelector("select").addEventListener("change", function() { // on select change
	set(document.querySelector("select option:checked").getAttribute("data-cl"));
});

function set(cl) {
	chrome.storage.sync.set({ // set class name to storage
		className: cl
	});

	chrome.tabs.query({}, tabs => { // loop through all tabs
		for (var index in tabs) {
			var tab = tabs[index];
			if (tab.url == "http://predmety.cmgpv.cz/?vice") // tab is Predmetove stranky
				chrome.tabs.reload(tab.id); // reload tab
		}
		window.close(); // close popup
	});
}
