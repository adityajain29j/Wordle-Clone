export const STATUS = {
  WIN: "You Win!",
  LOSE: "Sorry!",
};

export function checkGuess(
  guess,
  solution,
  keyboardKeyColors,
  setKeyboardKeyColors
) {
  var count = {};
  var result = {};
  for (var i in solution) {
    i = solution.charAt(i);
    if (count[i]) {
      count[i]++;
    } else {
      count[i] = 1;
    }
  }
  [...guess].forEach((letter, i) => {
    result[i] = "gray";
    if (count[letter]) {
      result[i] = "yellow";
      if (solution[i] === letter) {
        result[i] = "green";
      }
      count[letter]--;
    }
    if (
      !keyboardKeyColors[letter] ||
      keyboardKeyColors[letter] === "gray" ||
      (keyboardKeyColors[letter] === "yellow" && result[i] === "green")
    )
      setKeyboardKeyColors((prev) => ({
        ...prev,
        [letter]: result[i],
      }));
  });
  return result;
}
