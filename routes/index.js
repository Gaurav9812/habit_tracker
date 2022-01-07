const express=require('express');
const router=express.Router();
const homeController=require('../controller/homeController');

const weeklyController=require('../controller/weeklyControler');

router.get('/',homeController.home);
router.use('/weeklyView',require('./weeklyView'));

router.post('/create',homeController.create);

router.get('/favourite/:id',homeController.favourite);


router.get('/delete/:id',homeController.delete);

router.get('/update/:id',homeController.update);
console.log("here");

module.exports=router;