const Habit = require('../models/habits');
const Habits=require('../models/habits');
const HabitStatus=require('../models/habitStatus');



module.exports.home=async function(req,res){
    try{
    let habits=await Habits.find({}).populate('days');
    return res.render('weekly_view',{
        habits:habits
    })
    }catch(err)
    {

    }
}

module.exports.update=async function(req,res)
{
    try{
       
            let habit=await Habit.findById(req.query.habit_id); 

            let day=await HabitStatus.findById(req.query.day_id);
            let bool=false;
            if(day.status==2)
            {
                bool=true;
                habit.no_of_days_done-=1;
            }
            day.status=(day.status+1)%3;
            if(day.status==2)
            {
                bool=true;
                habit.no_of_days_done+=1;
            }
            if(bool){
                habit.save();
            }
            day.save();
            if(req.xhr)
            {
                
               
               return res.status(200).json({
                    data:{
                        status:day.status,
                        id:req.query.day_id,
                        
                    },
                    message:"post deleted"
                });
            }           
            console.log(day.status);
    }catch(err)
    {
        console.log('ERROR',err);
        return;
    }
}