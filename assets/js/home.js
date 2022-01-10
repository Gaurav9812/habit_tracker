
$('#add-habit').click(function(){
  $('#create-habit').css({
      display:'flex'
  })  
})

let favouriteEvent=function(favouriteLink)
{
    
    $(favouriteLink).click(function(e)
    { console.log(favouriteLink);
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(favouriteLink).prop('href'),
            success:function(data)
            {
              console.log(data.data);
              if(data.data.red){
                    $(`#favourite-${data.data.habit_id}`).css({
                      color:"red"
                    });
                    new Noty({
                      theme: 'sunset',
                      text: "Favourite Added",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();
                  }else{
                    $(`#favourite-${data.data.habit_id}`).css({
                      color:"blue"
                    });
                    new Noty({
                      theme: 'sunset',
                      text: "removed From favorite",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();
                  }
                    
            },error:function(err){
                console.log('error',err);
            }
        });
    });
    
}
function traversingFavourites()
{
  
     $( ".favourites" ).each( function( index, element ){
        
          favouriteEvent(element);        
    });

}
traversingFavourites();

let deleteEvent=function(deleteLink)
{
    
    $(deleteLink).click(function(e)
    { 
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
                $(`#card-${data.data.habit_id}`).remove();
                new Noty({
                  theme: 'mint',
                  text: "habit deleted",
                  type: 'success',
                  layout: 'topRight',
                  timeout: 1500
                  
              }).show();
                  
                    
            },error:function(err){
                console.log('error',err);
            }
        });
    });
    
}
function traversingDelete()
{
  
     $( ".delete-button" ).each( function( index, element ){
        
          deleteEvent(element);        
    });

}
traversingDelete();
let updateEvent=function(updateLink)
{
    
    $(updateLink).click(function(e)
    { 
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(updateLink).prop('href'),
            success:function(data)
            {
              $(`#days-${data.data.id}`).text(`No of days done:${data.data.days_done}/${data.data.total_days}`);
              $(`#currentStreak-${data.data.id}`).text(`Current Streak:${data.data.current_streak}`);
              $(`#bestStreak-${data.data.id}`).text(`Longest Streak:${data.data.longest_streak}`);
              
              if(data.data.status==0)
              { 
                  $(`#update-${data.data.id}`).text("none");
              }
              else if(data.data.status==1)
              {
                    $(`#update-${data.data.id}`).text("not done");
              }else{
                    $(`#update-${data.data.id}`).text("done");
              }
                  
                    
            },error:function(err){
                console.log('error',err);
            }
        });
    });
    
}

function traversingUpdate()
{
  
     $( ".update" ).each( function( index, element ){
        
          updateEvent(element);        
    });

}
traversingUpdate();

//logic for search 
function sortRows()
{
    let cards=document.getElementsByClassName('card');
    let filter = ""+document.getElementById("search-bar").value.toUpperCase();
    
    for(let i=0;i<cards.length;i++)
    {
     let text= cards[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerText;
     let index=text.toUpperCase().indexOf(filter);
     
     if (index==0){
          
      cards[i].style.display = "";
      
    } else {
      cards[i].style.display = "none";
    }
    }
}

