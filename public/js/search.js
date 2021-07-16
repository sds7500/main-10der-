$(document).ready(function(){
    let search = $("#livesearch");

    function showResults(str){
        if(str.length()==0){
        search.addClass(hide);
    }
        else{
           search.removeClass(hide);
        }
    }
})