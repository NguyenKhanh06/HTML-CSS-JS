$(document).ready(
   function(){
   
       $('.about-section').waypoint(
           function(directions){
               if(directions == "down"){
                   $('nav').addClass('sticky')
               }else{
                   $('nav').removeClass('sticky')
               }
           },
           {
               offset: '600px'
           }
       )

       
   }
)

