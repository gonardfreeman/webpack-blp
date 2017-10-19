export function hello() {
  const el = document.createElement("h1");
  el.innerHTML = "Hello dima";
  document.querySelector("body").appendChild(el);
  return el;
}
