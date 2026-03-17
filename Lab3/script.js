(function () {
  var names = [
    "Bill",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Steven",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("Перевірка імен за останньою літерою:");

  for (var i = 0; i < names.length; i++) {
    var lastLetter = names[i].charAt(names[i].length - 1).toLowerCase();

    if (lastLetter === "a") {
      helloSpeaker.speak(names[i]);
    } else {
      byeSpeaker.speak(names[i]);
    }
  }
})();
