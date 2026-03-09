const buttons = document.querySelectorAll(".filter-btn");
const boxContainer = document.getElementById("box-container");
let totalIssues = document.getElementById("total-issues");

let allPosts = [];


const loadData = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      allPosts = data.data;
      filterPosts("all");
      totalIssues.innerText = allPosts.length;
    })
    .catch(err => console.error("Error fetching data:", err));
};


const loadBoxDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  try {
    const res = await fetch(url);
    const details = await res.json();
    displayBoxDetails(details.data);
  } catch (err) {
    console.error("Error loading box details:", err);
  }
};

const displayBoxDetails = (box) => {
  const boxDetails = document.getElementById("box-details");
  boxDetails.innerHTML = `
      <div class="space-y-3">
        <h2 class="text-2xl font-bold">${box.title}</h2>
        <p class="text-[12px] text-gray-600">
          <span class="bg-green-700 rounded-full text-white text-[12px] px-2 py-1">${box.status}</span>
          <span class="inline-block w-1 h-1 bg-gray-600 rounded-full align-middle"></span>
          Opened by ${box.author}
          <span class="inline-block w-1 h-1 bg-gray-600 rounded-full align-middle"></span>
          ${new Date(box.createdAt).toLocaleDateString()}
        </p>
        <p class="text-[16px] text-gray-600">${box.description}</p>
      </div>
      <div class="flex gap-3 mt-3">
        ${box.labels.map(label => `<span class="bg-red-100 border-1 border-red-300 rounded-full text-[12px] px-2">${label}</span>`).join("")}
      </div>
      <div class="bg-gray-100 flex gap-40 items-center p-3 rounded-sm mt-5">
        <div>
          <p class="text-[14px] text-gray-600">Assignee:</p>
          <h1 class="text-[14px] text-black font-semibold">${box.assignee || "N/A"}</h1>
        </div>
        <div>
          <p class="text-[14px] text-gray-600">Priority:</p>
          <p class="bg-red-600 rounded-full text-white uppercase px-3 py-1 text-[12px]">${box.priority}</p>
        </div>
      </div>
  `;
  document.getElementById("box_modal").showModal();
};


const filterPosts = (status) => {
  boxContainer.innerHTML = "";

  const filteredPosts = status === "all"
    ? allPosts
    : allPosts.filter(post => post.status === status);

  filteredPosts.forEach(post => {
    totalIssues.innerText = filteredPosts.length;
    const cart = document.createElement("div");
    cart.classList.add("bg-white", "rounded-md", "issue-card");

    if (post.priority === "high" || post.priority === "medium") {
      cart.classList.add("border-t-3", "border-green-600");
    } else {
      cart.classList.add("border-t-3", "border-purple-600");
    }

    cart.innerHTML = `
      <div onclick="loadBoxDetails(${post.id})" class="rounded-md h-[250px] cursor-pointer">
        <div class="issues">
          <div class="p-4 space-y-2 h-[180px]">
            <div class="flex justify-between items-center">
              <div>
                <img src="./assets/Open-Status.png">
              </div>
              <div>
                <p class="rounded-full uppercase text-[11px] w-[60px] flex justify-center items-center ${post.priority === "high" ? "text-red-600 bg-red-100" : "text-orange-600 bg-orange-100"}">${post.priority}</p>
              </div>
            </div>
            <div class="h-[85px]">
              <h2 class="text-sm font-bold">${post.title}</h2>
              <p class="text-[12px] text-[#444] line-clamp-2">${post.description}</p>
            </div>
            <div class="flex gap-3">
              ${post.labels.map(label => `<span class="bg-red-100 border-1 border-red-300 rounded-full text-[12px] px-2">${label}</span>`).join("")}
            </div>
          </div>
          <div class="border-t-2 p-4 border-gray-100">
            <span>${post.author}</span>
          </div>
        </div>
      </div>
    `;
    boxContainer.appendChild(cart);
  });
};


buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("bg-blue-600", "text-white"));
    button.classList.add("bg-blue-600", "text-white");

    const status = button.getAttribute("data-status");
    filterPosts(status);
  });
});


loadData();

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.trim().toLowerCase();
  
});