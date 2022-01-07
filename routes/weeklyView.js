const express=require('express');
const router=express.Router();
const weeklyController=require('../controller/weeklyControler');

router.get('/',weeklyController.home);

// router.get('/favourite/:id',homeController.favourite);


// router.get('/delete/:id',homeController.delete);

router.get('/update',weeklyController.update);
module.exports=router;