/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)


    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
            toggle.classList.toggle('bx-x')
            bodypd.classList.toggle('body-pd')
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))


$(document).ready(function()
{
$("#popover").hide();

$("body").fadeIn("100");

$("#create").click(function()
{
	$("#s1").show();
	$("#desc1").show();
	$("#step1").show();
	$("#popover").css("opacity","1");
	$("#popover").fadeIn("slow");
});

$("#s1").click(function()
{
	$("#step1").fadeOut("slow");
	$("#desc1").fadeOut("slow");
	$("#s1").fadeOut("slow");
	$("#popover").fadeOut("slow");
	
});

$("#close").click(function()
{
	$("#popover").fadeOut("slow");
});

});
