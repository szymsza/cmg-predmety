if (location.href == "http://predmety.cmgpv.cz/")
	location.href = "http://predmety.cmgpv.cz/?vice";

if (location.href == "http://predmety.cmgpv.cz/?vice") {
	chrome.storage.sync.get("className", result => {
		var className = result.className || "Prima"
			elements = document.querySelectorAll("li.radkovani18, .radek1_pozadi");

		document.querySelector(".objekt_na_stred h2").innerHTML = "Poslední změny pro třídu "+className;

		for (var e in elements) {
			var el = elements[e];
			if (typeof el == "object") // is element
				if (el.innerHTML.indexOf(className) === -1) // contains class name
					el.parentElement.removeChild(el); // remove element
		}

		var results = document.querySelector(".obdelnik>.stred2>table>tbody");
		if (results.innerHTML.trim() == "")
			results.innerHTML = "<td style='text-align: center'>Pro vaši třídu žádné nové soubory nejsou :)</td>";

		document.querySelector(".objekt_na_stred>tbody>tr:nth-child(2)>td:first-child>\
		table>tbody>tr>td:nth-child(2)>div:last-of-type").innerHTML = ""; // remove link "Zobrazit méně"
	});
}
