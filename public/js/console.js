document.addEventListener("DOMContentLoaded", function(event) { 
    var writer = document.querySelector('[data-console]');

    var formattedDate = function() {
        var date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    var format = function(level, content) {
        return `${formattedDate()} ${level} ${content}`
    }

    console.log = function(message) {
        writer.innerHTML = `${format(">", message)}\n` + writer.innerHTML;
    };
    
    console.error = function(error) {
        writer.innerHTML = `<span class="text-danger">${format("!", error)}</span>\n` + writer.innerHTML;
    };
});