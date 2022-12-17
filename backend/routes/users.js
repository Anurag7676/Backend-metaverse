const express= require('express')
const router= express.Router()
const {homepage,register,login}= require('../controllers/users') 

router.route('/').get(homepage);
router.route('/signup').post(register);
router.route('/login').post(login);

module.exports= router;
