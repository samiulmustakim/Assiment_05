// loadDetailsCart loadDetailsCart
async function loadDetailsCart(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const details = await res.json();
  displayDetailsCart(details.data);
}
function displayDetailsCart(data) {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
   <div  class="flex flex-col gap-5">
          <h1 class="text-2xl font-bold">${data.title}</h1>
          <div class="flex gap-2 text-sm items-center">
            <div class="badge badge-success rounded-full">${data.status}</div>
            <p class="rounded-full h-1 w-1 bg-[#888]"></p>
            <p>Opened by ${data.assignee}</p>
            <p class="rounded-full h-1 w-1 bg-[#888]"></p>
            <p>${formatDate(data.createdAt)}</p>
          </div>
          <div class="flex">
            <div class="flex gap-4">${createlement(data.labels)}</div>
          </div>
          <p>${data.description}</p>
          <div class="flex justify-between bg-gray-100 p-5 rounded-md">
          <div class="w-100">
            <p>Assignee:</p>
            <p class="font-bold">${data.author}</p>
          </div>
          <div class="w-100">
            <p>Priority:</p>
            <div>${createPriority(data.priority)}</div>
          </div>
        </div>
        </div>
        
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
  `;
  document.getElementById("my_modal_5").showModal();
}
// Count Count
function updateCount(data) {
  const count = document.getElementById("issue-count");
  count.innerText = `${data.length} Issue`;
}

// manage spin
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("allIssueCardContainer").classList.add("hidden");
  } else if (status == false) {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("allIssueCardContainer").classList.remove("hidden");
  }
};

// Button Click color show
const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((element) => {
      element.classList.remove("btn-primary");
    });
    btn.classList.add("btn-primary");
  });
});

// top badge high medium low priyority
const priyorityColors = {
  high: "bg-red-100 text-red-500",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-gray-200 text-gray-500",
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

// FOrmate Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

// all Issue push in container all Issue push in container all Issue push in container
async function loadAllIssueContaier() {
  manageSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssue = data.data;
  updateCount(allIssue);
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
    cart.innerHTML = `
        <div onclick = "loadDetailsCart(${card.id})" class="flex flex-col text-left p-7 col-span-1 bg-white shadow-md rounded-md space-y-3 h-80 ${card.status === "open" ? "border-t-4 border-green-600" : "border-t-4 border-purple-400"}">
              <div class="flex justify-between">
                <img src="${card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="" />
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
              <p class="text-sm">${formatDate(card.createdAt)}</p>
            </div> 
        `;
    allIssueCardContainer.append(cart);
  });
  manageSpinner(false);
}

// swictched button form all to open ,open to close again close to open
let allIssue = [];

document.getElementById("all-btn").addEventListener("click", () => {
  displayAllIssueContaier(allIssue);
  updateCount(allIssue);
});
document.getElementById("open-btn").addEventListener("click", () => {
  const openIssue = allIssue.filter((issue) => issue.status === "open");
  manageSpinner(true);
  setTimeout(() => {
    displayAllIssueContaier(openIssue);
    updateCount(openIssue);
    manageSpinner(false);
  }, 100);
});
document.getElementById("closed-btn").addEventListener("click", () => {
  const closeIssue = allIssue.filter((issue) => issue.status === "closed");
  manageSpinner(true);
  setTimeout(() => {
    displayAllIssueContaier(closeIssue);
    updateCount(closeIssue);
    manageSpinner(false);
  }, 100);
});

// Search Input Search Input
document.getElementById("btn-search").addEventListener("click", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const allData = data.data;
      const result = allData.filter((word) =>
        word.title.toLowerCase().includes(searchValue),
      );
      displayAllIssueContaier(result);
      updateCount(result);
    });
});
