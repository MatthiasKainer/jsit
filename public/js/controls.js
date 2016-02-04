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
        var endpoint = {
            "typescript" : "ts",
            "typescript-react": "tsx"
        };
        
        $.post(`/compile/${endpoint[language]}`, { src : editor.getValue() }, function(data) {
            $('[data-console]').text(""); 
            $('[data-console]').text("// transpiled ts\n" + data);
        });
    });
    $("[data-language-select]").on('click', 'li a', function(){
        language = this.innerText;
        var languageMapping = {
            "javascript" : "javascript",
            "typescript" : "typescript",
            "typescript-react" : "typescript"
        };
        
        var mappedLanguage = languageMapping[language];
        
        editor.getSession().setMode("ace/mode/" + mappedLanguage);
        $("[data-language-text]").text(language);
        $(`[data-language-available="${mappedLanguage}"]`).removeClass('hidden');
        $(`[data-language-available]`).not(`[data-language-available="${mappedLanguage}"]`).addClass('hidden');
   });
});