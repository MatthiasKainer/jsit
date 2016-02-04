document.addEventListener("DOMContentLoaded", function (event) {

    var language = "javascript";

    var typescript = {
        options: function () {
            var options = { src: editor.getValue() };
            if ($('[name="tsx"]').is(":checked"))
                options["tsx"] = true;
            if ($('[name="es6"]').is(":checked"))
                options["es6"] = true;
            return options;
        },
        
        retrieve : function(onSuccess, onError) {
            $.post(`/compile/ts`, typescript.options())
                .done(onSuccess)
                .fail(function(error) {
                    console.error(error);
                });
        }
    }

    var run = function () {
        var ts = function () {
            typescript.retrieve(function (data) {
                eval(data);
            });
        };

        var js = function () {
            eval(document.getElementById('editor').innerText);
        };

        switch (language) {
            case 'typescript':
                return ts();
            case 'javascript':
                return js();
        }
    };

    $("[data-run]").on("click", function () {
        run();
    });
    $("[data-trash]").on("click", function () {
        $('[data-console]').text("");
    });
    $("[data-transpile]").on("click", function () {        
        typescript.retrieve(function (data) {
            $('[data-console]').text("// transpiled ts\n" + data);
        });
    });
    $("[data-language-select]").on('click', 'li a', function () {
        language = this.innerText;
        var languageMapping = {
            "javascript": "javascript",
            "typescript": "typescript"
        };

        var mappedLanguage = languageMapping[language];

        editor.getSession().setMode("ace/mode/" + mappedLanguage);
        $("[data-language-text]").text(language);
        $(`[data-language-available="${mappedLanguage}"]`).removeClass('hidden');
        $(`[data-language-available]`).not(`[data-language-available="${mappedLanguage}"]`).addClass('hidden');
    });
});