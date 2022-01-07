const mongoose=require('mongoose');


const habitStatus=mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0
    }    
});
const HabitS=mongoose.model('habitStatus',habitStatus);
module.exports=HabitS;