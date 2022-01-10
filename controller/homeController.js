const mongoose=require('mongoose');
const habits=require('../models/habits');
const habitStatus=require('../models/habitStatus');



//to render all the Habits added
module.exports.home=async function(req,res)
{
    try{

    let habit=await habits.find({}).populate('days');
        //Iterating over all the habits and adding days to it which are left till present
    habit.forEach(async (hab)=>{
            let len=hab.days.length;
            let date=hab.days[len-1];
            let today_date=new Date();
            today_date.setDate(today_date.getDate());
            date=new Date(date.date);
            date.setDate(date.getDate()+1);
            let bool=false;
            //checking if last date of habit is equual to or smaller than today date
            if(date.toDateString().substring(4)<=today_date.toDateString().substring(4))
            {
            bool=true;
            //if small adding it to habit         
            while(date.toDateString().substring(4)<=today_date.toDateString().substring(4))
            {
                let day=   await habitStatus.create({
                date:date.toString().substring(0,15),
                status:0
                });
                hab.days.push(day);
    
                date.setDate(date.getDate()+1);
            }
            }
            let len1=hab.days.length;
            let bestStreak=0,streak=0;
            //to find Best streak
            for(let i=0;i<len1;i++)
            {
                if(hab.days[i].status==2)
                {
                    ++streak;
                    if(streak>bestStreak)
                    {
                        bestStreak=streak;
                    }
                }
                else if(hab.days[i].status<2 )
                {
                    streak=0;
                }
            }
            let currentStreak=0;
            //to find current streak if days are not added
            if(!bool){
                for(let i=len1-1;i>=0;i--)
                {
                    if(hab.days[i].status==2)
                    {
                        currentStreak++;
                    }else{
                        break;
                    }
                }
                
            }
            //saving habit
            hab.current_streak=currentStreak;
            hab.longest_streak=bestStreak;
            hab.save();

         })

        return  res.render('home.ejs',{
            habits:habit
        });
        }catch(err)
        {
        console.log(`error ${err}`);
        res.redirect('back');
        }
}


// To create new Habit
module.exports.create=async function(req,res)
{
    console.log(req.body);
        try{
            //ADiing Habit
                let habit= await habits.create({
                name:req.body.habit,
                aim:req.body.goal,
                time:req.body.start_time
            });
                    
            let date=new Date();
            //ADding previous 7 days including current day
            date.setDate(date.getDate()-6);
            for(let i=1;i<=7;i++)
            {
                let day= await habitStatus.create({
                    date:date.toString().substring(0,15),
                    status:0
                });
                habit.days.push(day);
                
                    
                date.setDate(date.getDate()+1);
                    
            }
            habit.save();
            req.flash('success','Habit created successful') ;     
            res.redirect('/');
                

            }catch(err)
            {
                    console.log(`error ${err}`);
                    
                    return res.redirect('back');  
            }
}

//TO add favourite
module.exports.favourite=async function(req,res)
    {
    try{
        let fav=await habits.find({_id:req.params.id});
        let habit=await habits.updateOne({_id:req.params.id},{$set:{favourite:!fav[0].favourite}});
        if(req.xhr)
            {
                // Giving response  with id if successfuly added
            return res.json(200,{
                message:"Request sent succesfull",
                data:{
                    red:!fav[0].favourite,
                    habit_id:fav[0]._id
                }
            });
            }
        return res.redirect('back');
        }
    catch(err)
        {
            console.log('err',err);
            return res.redirect('back');
        }
}

    // TO Delete Habit
module.exports.delete=async function(req,res)
{
try{    
    let habit=await habits.findById(req.params.id);
    // Deleing All the days inside habit
    await habitStatus.deleteMany({_id:{$in:habit.days}});
    // Removeing Habit 
    habit.remove();

        if(req.xhr)
        {
        return res.status(200).json({
                data:{
                    habit_id:req.params.id
                },
                message:"post deleted"
            });
        }
    }
    catch(err)
    {
    console.log('ERROR',err);
    return;
    }

}

//Update days
module.exports.update=async function(req,res)
{
try{
    let habit=await habits.findById(req.params.id).populate('days');
    let len=habit.days.length;
    
    let id=habit.days[len-1];
    let day=await habitStatus.findById(id);
    //if status before updation is 2 means it is in done staging we are then reducing no. of days done by one
    if(day.status==2)
    {
        habit.no_of_days_done-=1;
        let len1=habit.days.length;
        let bestStreak=0,streak=0;
        for(let i=0;i<len1-1;i++)
        {
        if(habit.days[i].status==2)
        {
            ++streak;
            if(streak>bestStreak)
            {
                bestStreak=streak;
            }
        }
        else if(habit.days[i].status<2 )
        {
            streak=0;
        }
        }
        habit.current_streak=0;
        habit.longest_streak=bestStreak;
    
    }
    day.status=(day.status+1)%3;
    
    // if its done then updating no. of days by one
    if(day.status==2)
    {
           habit.no_of_days_done+=1;
        let currentStreak=1;
        let len1=habit.days.length;
        for(let i=len1-2;i>=0;i--)
        {
            if(habit.days[i].status==2)
            {
                currentStreak++;
            }else{
                break;
            }
        }
        habit.current_streak=currentStreak;
        if(habit.longest_streak<currentStreak)
        {
        habit.longest_streak=currentStreak;
        }
    
    }
    day.save();

    habit.save();

    if(req.xhr)
    {
        
    
        return res.status(200).json({
            data:{
                status:day.status,
                id:req.params.id,
                days_done:habit.no_of_days_done,
                total_days:len,
                current_streak:habit.current_streak,
                longest_streak:habit.longest_streak

            },
            message:"post deleted"
        });
    }           
 
    }
    catch(err)
    {
    console.log('ERROR',err);
    return;
    }
}