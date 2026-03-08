// loadDetailsCart loadDetailsCart 
async function loadDetailsCart() {
  const res = await fetch ('')
}
// Button Click color show 
const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(element => {
      element.classList.remove("btn-primary")
      btn.classList.add('btn-primary')
    });
  })
});

// top badge high medium low priyority
const priyorityColors = {
  high: "bg-red-100 text-red-500",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-gray-200 text-gray-500"
};
const createPriority = (priority) => {
  const color = priyorityColors[priority] || "bg-gray-200 text-gray-500";
  return `<div class="text-center w-18 py-1 rounded-full text-xs font-semibold ${color}">
  ${priority.toUpperCase()}
  </div>`;
};

// Bug and Help wanted Badge 
const labelColors = {
  bug: "badge-error",
  "help wanted": "badge-warning",
  enhancement: "badge-info",
  documentation: "badge-success",
  "good first issue": "badge-accent",
};

const createlement = (arr) => {
  const htmlElement = arr.map((el) => {
    const color = labelColors[el] || "badge-outline";
    return `<div class="badge badge-soft border-gray-200 ${color}">${el}</div>`;
  });

  return htmlElement.join("");
};


// all Issue push in container all Issue push in container all Issue push in container 
async function loadAllIssueContaier() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayAllIssueContaier(data.data);
}
loadAllIssueContaier();
// display issue all
function displayAllIssueContaier(data) {
  const allIssueCardContainer = document.getElementById(
    "allIssueCardContainer",
  );
  allIssueCardContainer.innerHTML = "";
  data.forEach((card) => {
    let cart = document.createElement("div");
    const date = new Date(card.createdAt);
    const formattedDate = date.toLocaleDateString("en-US");
    cart.innerHTML = `
        <div class="onclick = "loadDetailsCart()" flex flex-col text-left p-7 col-span-1 bg-white shadow-md rounded-md space-y-3 h-80 ${card.priority === "low" ? "border-t-4 border-purple-400" : "border-t-4 border-green-600"}">
              <div class="flex justify-between">
                <img src="/assets/Open-Status.png" alt="" />
                <div>
                 ${createPriority(card.priority)}
                </div>
              </div>
              <p class="font-semibold text-lg">
                ${card.title}
              </p>
              <p class="text-sm line-clamp-2 text-">
                ${card.description}
              </p>
              <div class="flex gap-4">
                ${createlement(card.labels)}
              </div>
              <div class="border-gray-300 border-t -mx-7"></div>
              <p class="text-sm">#1by ${card.author}</p>
              <p class="text-sm">${formattedDate}</p>
            </div> 
        `;
    allIssueCardContainer.append(cart);
  });
}
