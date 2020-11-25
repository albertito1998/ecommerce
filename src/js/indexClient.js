$(document).ready(function () {
$("#contactForm").on("submit", function(e){
  $('.toast').toast('show');
    e.preventDefault(); // no me manda a ningun sitio
    var formData = {
     name: window.document.contactForm.name.value,
     email: window.document.contactForm.email.value,
     phone: window.document.contactForm.phone.value,
     message: window.document.contactForm.message.value
    };

    console.log(formData);
    
   $.post({
        url: "/formulario",
        type: "POST",
        data: JSON.stringify(formData),
        cache: false,
        contentType:"application/json; charset=utf-8",
   processData: false,
   success: function(res){
       console.log(res)
    }
    , error: function(jqXHR, textStatus, err){
      console.log('text status '+textStatus+', err '+err)
    }
});  

$(document).ajaxStart(function(){
  $("#spinner").css("display", "block")
  document.getElementById('spinner').style.display = 'block'; 
})
$(document).ajaxComplete(function(){
  $("#spinner").css("display", "none");
  document.getElementById('spinner').style.display = 'none'; 
 
})  

});
});