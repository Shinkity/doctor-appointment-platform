// Run once: npm run seed
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./User");

(async () => {
  const email = process.env.ADMIN_EMAIL;
  if (await User.findByEmail(email)) {
    console.log("Admin already exists");
    process.exit(0);
  }
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await User.createUser("Platform Admin", email, hash, "admin", true);
  console.log("Admin created:", email);
  process.exit(0);
})();
