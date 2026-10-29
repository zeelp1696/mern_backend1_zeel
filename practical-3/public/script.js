
const API = "/api/users";

const form = document.getElementById("userForm");
const userId = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const usersList = document.getElementById("usersList");
const message = document.getElementById("message");

// Show message
function showMessage(text, error = false) {
    message.textContent = text;
    message.className = error ? "error" : "";
}

// READ: Get all users
async function getUsers() {
    usersList.textContent = "Loading users...";

    try {
        const response = await fetch(API);
        const users = await response.json();

        if (!response.ok) {
            throw new Error(users.message || "Failed to load users");
        }

        usersList.innerHTML = "";

        if (users.length === 0) {
            usersList.textContent = "No users found.";
            return;
        }

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            const info = document.createElement("div");
            info.className = "user-info";

            const title = document.createElement("strong");
            title.textContent = `${user.id}. ${user.name}`;

            const email = document.createElement("p");
            email.textContent = user.email;

            info.append(title, email);

            const actions = document.createElement("div");
            actions.className = "actions";

            const editBtn = document.createElement("button");
            editBtn.className = "edit";
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editUser(user);

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteUser(user.id);

            actions.append(editBtn, deleteBtn);
            card.append(info, actions);
            usersList.appendChild(card);
        });
    } catch (error) {
        usersList.textContent = error.message;
    }
}

// CREATE and UPDATE
form.addEventListener("submit", async event => {
    event.preventDefault();

    const id = userId.value;

    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (!user.name || !user.email) {
        showMessage("Please enter name and email.", true);
        return;
    }

    try {
        const response = await fetch(
            id ? `${API}/${id}` : API,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Request failed");
        }

        showMessage(result.message);
        resetForm();
        await getUsers();
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Prepare form for editing
function editUser(user) {
    userId.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;

    submitBtn.textContent = "Update User";
    cancelBtn.hidden = false;

    nameInput.focus();
    showMessage("Edit the details and click Update User.");
}

// Reset form
function resetForm() {
    form.reset();
    userId.value = "";
    submitBtn.textContent = "Add User";
    cancelBtn.hidden = true;
}

// DELETE
async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Delete failed");
        }

        showMessage(result.message);
        await getUsers();
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Cancel editing
cancelBtn.addEventListener("click", () => {
    resetForm();
    showMessage("");
});

// Refresh users
document.getElementById("refreshBtn").addEventListener(
    "click",
    getUsers
);

// Load users when the page opens
getUsers();
