document.addEventListener("DOMContentLoaded", function(event) {
    
    var language = "javascript";
        
    $("[data-run]").on("click", function() {
        
        if (language === "typescript") {
            $.post('/ts', { src : editor.getValue() }, function(data) {
                eval(data);
            });
        }
        else eval(document.getElementById('editor').innerText); 
    });
    $("[data-trash]").on("click", function() {
        $('[data-console]').text(""); 
    });
    $("[data-transpile]").on("click", function() {
        $.post('/ts', { src : editor.getValue() }, function(data) {
            $('[data-console]').text(""); 
            $('[data-console]').text("// transpiled ts\n" + data);
        });
    });
    $("[data-language-select]").on('click', 'li a', function(){
        language = this.innerText;
        editor.getSession().setMode("ace/mode/" + language);
        $("[data-language-text]").text(language);
        $(`[data-language-available="${language}"]`).removeClass('hidden');
        $(`[data-language-available]`).not(`[data-language-available="${language}"]`).addClass('hidden');
   });
});