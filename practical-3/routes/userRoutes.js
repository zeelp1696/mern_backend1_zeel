
const express = require("express");
const router = express.Router();

// Temporary user data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

let nextId = 3;

// CREATE: Add a user
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// READ: Get all users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// READ: Get user by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
});

// UPDATE: Update a user
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  user.name = name;
  user.email = email;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});

// DELETE: Delete a user
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser
  });
});

// Export router
module.exports = router;
