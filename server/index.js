const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sql, poolPromise } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let Uid; // Store logged-in user ID

// 🔹 Login Endpoint
app.post("/login", async (req, res) => {
    const { phone, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("phone", sql.VarChar, phone)
            .input("password", sql.VarChar, password)
            .query("SELECT * FROM SignupTbl WHERE phone = @phone AND password = @password");

        if (result.recordset.length > 0) {
            Uid = result.recordset[0].id;
            console.log("✅ Match found:", Uid);
            res.json({ success: true, userId: Uid });
        } else {
            console.log("❌ No match found");
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Register Donor Endpoint
app.post("/RegisterDonor", async (req, res) => {
    if (!Uid) return res.status(401).json({ error: "Unauthorized" });

    const { age, location, bloodtype, lastDonated } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("age", sql.Int, age)
            .input("location", sql.VarChar, location)
            .input("bloodtype", sql.VarChar, bloodtype)
            .input("lastDonated", sql.Date, lastDonated)
            .input("userId", sql.Int, Uid)
            .query("INSERT INTO DonarTbl (Age, Location, BloodType, LastDonated, UserId) VALUES (@age, @location, @bloodtype, @lastDonated, @userId)");

        console.log("✅ Registered as a Donor");
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Register Donor error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Signup Endpoint
app.post("/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("password", sql.VarChar, password)
            .query("INSERT INTO SignupTbl (name, email, phone, password) VALUES (@name, @email, @phone, @password)");

        console.log("✅ User registered");
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Signup error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Create Notification Endpoint
app.post("/CreateNotification", async (req, res) => {
    if (!Uid) return res.status(401).json({ error: "Unauthorized" });

    const { desc, bloodtype, location, phone, email, mydate } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("desc", sql.VarChar, desc)
            .input("bloodtype", sql.VarChar, bloodtype)
            .input("location", sql.VarChar, location)
            .input("phone", sql.VarChar, phone)
            .input("email", sql.VarChar, email)
            .input("mydate", sql.Date, mydate)
            .input("uid", sql.Int, Uid)
            .query("INSERT INTO NotificationTbl (description, bloodType, location, phone, email, date, uid) VALUES (@desc, @bloodtype, @location, @phone, @email, @mydate, @uid)");

        console.log("✅ Notification Created");
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Notification creation error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Get Profile Endpoint
app.get("/Myprofile", async (req, res) => {
    if (!Uid) return res.status(401).json({ error: "Unauthorized" });

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, Uid)
            .query("SELECT name, email, phone, password FROM SignupTbl WHERE id = @id");

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ error: "Profile not found" });
        }
    } catch (err) {
        console.error("❌ Profile error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Update Profile Endpoint
app.post("/UpdateMyprofile", async (req, res) => {
    if (!Uid) return res.status(401).json({ error: "Unauthorized" });

    const { name, email, phone, password } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("password", sql.VarChar, password)
            .input("id", sql.Int, Uid)
            .query("UPDATE SignupTbl SET name = @name, email = @email, phone = @phone, password = @password WHERE id = @id");

        console.log("✅ Profile Updated");
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Profile update error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Get Notifications Endpoint
app.get("/Notification", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM NotificationTbl");

        res.json(result.recordset);
    } catch (err) {
        console.error("❌ Notifications error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Start Server
app.listen(8000, () => {
    console.log("🚀 Server is running on port 8000");
});
