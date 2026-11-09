const listPage = "index.html";
const addPage = "index2.html";
 
let countBadge = null;
 

function getUsers() {
  let users = JSON.parse(localStorage.getItem("myUsers"));
  if (users === null) {
    users = [
      { id: 1, name: "Esraa Sulayman", role: "Administrator", email: "esraa.sulayman@example.com", salary: 120000 },
      { id: 2, name: "Manar Camil", role: "Senior Developer", email: "manar.camil@example.com", salary: 95000 },
      { id: 3, name: "Sarah Jad", role: "UI/UX Designer", email: "sarah.jad@example.com", salary: 85000 },
      { id: 4, name: "Dalia Wael", role: "Project Manager", email: "dalia.wael@example.com", salary: 105000 },
      { id: 5, name: "Omnia Rushdy", role: "Data Analyst", email: "omnia.rushdy@example.com", salary: 88000 },
    ];
    localStorage.setItem("myUsers", JSON.stringify(users));
  }
  return users;
}
 
document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector(".user-card");
  if (form) {
    setupForm(form);
  }
 
  const body = document.querySelector(".Body");
  if (body) {
    setupList();
  }
});
 

function setupList() {
 
  countBadge = document.querySelector(".top-userstable .count");
  if (countBadge === null) {
    const countImg = document.querySelector(".top-userstable img");
    if (countImg) {
      countImg.remove();
    }
    countBadge = document.createElement("span");
    countBadge.className = "count";
    document.querySelector(".top-userstable").appendChild(countBadge);
  }
 
 
  document.querySelector(".users-mgmt button").addEventListener("click", () => {
    localStorage.removeItem("editUserId");
    window.location.href = addPage;
  });
 
  showUsers();
}
 
function showUsers() {
  const body = document.querySelector(".Body");
  const users = getUsers();
 
  body.innerHTML = "";
  countBadge.textContent = users.length;
 
  if (users.length === 0) {
    body.innerHTML = `<p class="empty">No users found. Click "Add User" to create one.</p>`;
    return;
  }
 
  users.forEach((user, index) => {
    const row = document.createElement("div");
 
    
    if (index === users.length - 1) {
      row.className = "Row-User5";
    } else {
      row.className = "Row-User1";
    }
 
    row.innerHTML = `
      <div class="username">
        <div class="avatar">${user.name[0]}</div>
        <span>${user.name}</span>
      </div>
      <div class="userrole1"><span class="role-badge">${user.role}</span></div>
      <div class="useremail">${user.email}</div>
      <div class="usersalary">$${Number(user.salary).toLocaleString()} / yr</div>
      <div class="useractions">
        <button class="update-btn" onclick="editUser(${user.id})">
          <img src="./Images/SVG(1).svg" alt="update"> <span class="updatespan">Update</span>
        </button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">
          <img src="./Images/SVG(2).svg" alt="delete"> <span class="deletespan">Delete</span>
        </button>
      </div>
    `;
    body.appendChild(row);
  });
}
 
function editUser(id) {
  localStorage.setItem("editUserId", id);
  window.location.href = addPage;
}
 
function deleteUser(id) {
  let users = getUsers();
  users = users.filter((user) => user.id !== id);
  localStorage.setItem("myUsers", JSON.stringify(users));
  showUsers();
}
 

function setupForm(form) {
  const inputs = form.querySelectorAll("input");
  const nameInput = inputs[0];
  const salaryInput = inputs[1];
  const emailInput = inputs[2];
  const roleSelect = form.querySelector("select");
 
  const pageTitle = document.querySelector(".page-header h1");
  const saveText = form.querySelector(".save-btn span");
 
  const editId = localStorage.getItem("editUserId");
  let users = getUsers();
 
 
  if (editId) {
    const userToEdit = users.find((u) => u.id == editId);
    if (userToEdit) {
      nameInput.value = userToEdit.name;
      roleSelect.value = userToEdit.role;
      salaryInput.value = userToEdit.salary;
      emailInput.value = userToEdit.email;
 
      pageTitle.textContent = "Edit User";
      saveText.textContent = "Update User";
    }
  }
 
 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
 
    const name = nameInput.value;
    const role = roleSelect.value;
    const salary = salaryInput.value;
    const email = emailInput.value;
 
    if (name === "" || role === "" || salary === "" || email === "") {
      alert("Please fill all the fields");
      return;
    }
 
    if (editId) {
    
      users = users.map((user) => {
        if (user.id == editId) {
          return { ...user, name: name, role: role, salary: salary, email: email };
        }
        return user;
      });
      localStorage.removeItem("editUserId");
    } else {
      

      const newUser = {
        id: Date.now(),
        name: name,
        role: role,
        salary: salary,
        email: email,
      };
      users.push(newUser);
    }
 
    
    localStorage.setItem("myUsers", JSON.stringify(users));
    window.location.href = listPage;
  });
 
  
  document.querySelectorAll(".cancel-btn, .back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("editUserId");
    });
  });
}
 