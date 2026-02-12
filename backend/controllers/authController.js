const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "30d",
    });
};

// --- REGISTER ---
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(`[REGISTER] Attempt for: ${username} (${email})`);

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user exists
        const userExists = await User.findByIdentifier(email);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Auto-Admin for specific domain
        const isAdmin = email.endsWith("@lorezone.admin");

        // CHECK IF IT IS A BRAND REGISTRATION
        // Check both the flag from frontend OR the prefix (backward compatibility)
        const isBrand = req.body.isBrandRegistration || username.startsWith("[BRAND]");

        const defaultPlan = isBrand ? "PROFESSIONAL" : "STARTER"; // Brands start as Professional
        const isVerified = isBrand ? 1 : 0; // Auto-verify brands for now (or make them pending)

        // Create user
        const userId = await User.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin, // Pass this to the model
            subscription_plan: defaultPlan,
            is_verified: isVerified
        });

        // SIMULATE EMAIL VERIFICATION
        console.log(`\n📧 [EMAIL SIMULATION] Sending Verification Email to: ${email}`);
        console.log(`   Subject: Welcome to LoreZone!`);
        console.log(`   Body: Hi ${username}, thanks for joining! Please click here to verify.\n`);

        res.status(201).json({
            _id: userId,
            username,
            email,
            token: generateToken(userId),
            isAdmin: isAdmin,
            subscription_plan: defaultPlan,
            is_verified: isVerified
        });
    } catch (error) {
        console.error("[REGISTER ERROR]", error);
        res.status(500).json({ message: "Server Error during registration" });
    }
};

// --- LOGIN ---
const loginUser = async (req, res) => {
    const { email, password } = req.body; // 'email' field contains identifier
    console.log(`[LOGIN] Attempt for identifier: ${email}`);

    try {
        const user = await User.findByIdentifier(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log(`[LOGIN SUCCESS] User: ${user.username}`);
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
                isAdmin: user.isAdmin, // Use the value from the database
                subscription_plan: user.subscription_plan,
                is_verified: user.is_verified,
                is_private: user.is_private
            });
        } else {
            console.log(`[LOGIN FAILED] Invalid credentials for: ${email}`);
            res.status(401).json({ message: "Invalid email/username or password" });
        }
    } catch (error) {
        console.error("[LOGIN ERROR]", error);
        res.status(500).json({ message: "Server Error during login" });
    }
};

// --- FORGOT PASSWORD (SIMULATION) ---
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(`[FORGOT PASSWORD] Requested for: ${email}`);

    // In a real app, we check if user exists.
    // For privacy, we usually don't reveal existence, but for debug:
    const user = await User.findByIdentifier(email);

    if (user) {
        const resetCode = Math.floor(100000 + Math.random() * 900000); // 6 digit code

        console.log(`\n📧 [EMAIL SIMULATION] Password Reset Request`);
        console.log(`   To: ${user.email}`);
        console.log(`   Code: ${resetCode}`);
        console.log(`   Action: Use this code to reset your password.\n`);

        res.json({ message: "Password reset link sent to email (Check Server Console)" });
    } else {
        // Fake success to prevent user enumeration
        res.json({ message: "If that email exists, we sent a link." });
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword
};
