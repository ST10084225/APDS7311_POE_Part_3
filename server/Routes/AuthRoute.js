const { Signup, Login, Logout } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware");
const ExpressBrute  = require("express-brute");
const router = require("express").Router();

//setup express brute
var store = new ExpressBrute.MemoryStore(); 
var bruteforce = new ExpressBrute(store);

//User Auth Posts
router.post("/signup", bruteforce.prevent, Signup);
router.post('/login', bruteforce.prevent, Login);
router.get('/logout', bruteforce.prevent, Logout);
router.post('/', bruteforce.prevent, userVerification);

module.exports = router;