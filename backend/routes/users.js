const express= require('express')
const router= express.Router()
const {homepage,registered,login}= require('../controllers/users') 

router.route('/').get(homepage);
router.route('/signup').post(registered);
router.route('/login').post(login);

module.exports= router;
