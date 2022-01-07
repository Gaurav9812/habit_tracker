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
                  }else{
                    $(`#favourite-${data.data.habit_id}`).css({
                      color:"blue"
                    });
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
      console.log(deleteLink);
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data)
            {
              console.log(data.data);
                $(`#card-${data.data.habit_id}`).remove();
                  
                    
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
              if(data.data.status==0)
              { 
                  $(`#update-${data.data.id}`).text("none");
                  $(`#detail-${data.data.id}`).css({
                      background:"coral"
                  })
              }
              else if(data.data.status==1)
              {   
                   $(`#update-${data.data.id}`).text("not done");
                   $(`#detail-${data.data.id}`).css({
                    background:"aliceblue"
                })
              }else{
                    $(`#update-${data.data.id}`).text("done");
                    $(`#detail-${data.data.id}`).css({
                        background:"lightgreen"
                    })
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

$('td').each(function(index,element){
    // console.log(element.innerText)
    let str=element.innerText;
    if(str=="Not done")
    {
        element.style.background="aliceblue";
    }else if(str=="None")
    {
        element.style.background="coral";
    }else if(str=="done")
    {
        element.style.background="lightgreen";
    }else{
        element.style.background="#E8CBC0";
    }
})

function sortRows()
{
    var   txtValue;
  
    let filter = ""+document.getElementById("search-bar").value.toUpperCase();
    let table = document.getElementsByTagName("table")[0];
     let tr = table.getElementsByTagName("tr");
      
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 1; i <tr.length; i++) {
      
      let td = tr[i].getElementsByTagName("td")[0];
      
      
        txtValue = td.innerText;
        
        let index=txtValue.toUpperCase().indexOf(filter);
        
        if (index==0){
            
          tr[i].style.display = "";
          
        } else {
          tr[i].style.display = "none";
        }
      
      
    }
}
