const express = require("express");
const router = express.Router();
const {body, validationResult } = require("express-validator"); 

router.get("/register", (req, res) => {
    res.render("register.views.ejs");
});

router.post("/register",
    body("username").trim().isLength({min: 3}),
    body("email").trim().isEmail().isLength({min: 3}),
    body("password").trim().isLength({min: 3}),
    (req, res) => {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).json({
                errors: errors.array(),
                message: "Invalid Datails!"
            })
        }
        res.send(errors);
});

module.exports = router;