/*
Оставил съм коментари, за ориентир.
Този сайт -> https://developer.mozilla.org/en-US/ е нещо като библия за JS. И този е другата -> https://www.w3schools.com/
*/
function fillTheTable() {
  const table = document.querySelector("table"); // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
  const arrayOfTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  for (let row of arrayOfTwelve) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    let elRow = document.createElement("tr"); // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    for (let col of arrayOfTwelve) {
      let elCol = document.createElement("td");
      elCol.innerText = `${row * col}`; //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
      elRow.append(elCol); //https://developer.mozilla.org/en-US/docs/Web/API/Element/append
    }
    table.append(elRow);
  }
}

window.addEventListener("load", fillTheTable); //https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event , https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
