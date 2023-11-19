export const STATUS = {
  WIN: "You Win!",
  LOSE: "Sorry!",
};

export function checkGuess(guess, solution) {
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
    result[i] = "normal";
    if (count[letter]) {
      result[i] = "yellow";
      if (solution[i] === letter) {
        result[i] = "green";
      }
      count[letter]--;
    }
  });
  return result;
}
