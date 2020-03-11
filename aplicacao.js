function pesquisa(){
    var radio = document.getElementsByName("tipo");
    var crea;
    var nome = $("#nome").val();
    if(!nome || typeof nome == undefined || nome == null){
        alert("Campo vazio")
    }else{
        for(var i = 0; i < radio.length; i++){
            if (radio[i].checked) {
                crea = radio[i].value
            }
        }
        if(crea == "movies"){
            $(document).ready(function(){
                $("#poster").attr("src", "");
                $("#titulo").html("Buscando...");
                $("#letra").html("");
                var id;
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://www.omdbapi.com/?s="+nome+"&apikey=e99cfa01",
                    "method": "GET"
                }
                
                $.ajax(settings).done(function (response) {
                    if(response.Error == "Movie not found!")
                    {
                        $("#titulo").html("Não foi possível encontrar nenhum filme.");
                        return;
                    }
                    id = response.Search[0].imdbID;
                    console.log(id)
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "http://www.omdbapi.com/?i="+id+"&plot=full&apikey=e99cfa01",
                        "method": "GET"
                    }
                    
                    $.ajax(settings).done(function (response) {
                        var title = response.Title;
                        var plot = response.Plot;
                        var poster = response.Poster;
                        $("#titulo").html(title+"<br><hr>");
                        $("#letra").html(plot);
                        $("#poster").attr("src", poster);
                    });
                });
            })
        }else if(crea == "lyrics"){
            $(document).ready(function(){
                var id;
                $("#poster").attr("src", "");
                $("#titulo").html("Buscando...");
                $("#letra").html("");
                nome = nome.replace(" ", "%20");
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://genius.p.rapidapi.com/search?q=" + nome,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "genius.p.rapidapi.com",
                        "x-rapidapi-key": "19e6559762msh56fd0497a9e3dd0p16aff4jsnb527e720048d"
                    }
                }
                
                $.ajax(settings).done(function (responsive) {
                    console.log(responsive)
                    id = responsive.response.hits[0].result.id;
                    settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://genius.p.rapidapi.com/songs/" + id,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "genius.p.rapidapi.com",
                            "x-rapidapi-key": "19e6559762msh56fd0497a9e3dd0p16aff4jsnb527e720048d"
                        }
                    }
                    
                    $.ajax(settings).done(function (responsive) {
                        console.log(responsive)
                        var artist = responsive.response.song.primary_artist.name;
                        artist = artist.replace(" ", "%20");
                        var title = responsive.response.song.title;
                        settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "http://lyric-api.herokuapp.com/api/find/"+artist+"/"+title,
                            "method": "GET"
                        }
                        
                        $.ajax(settings).done(function (responsive) {
                            var letra = responsive.lyric.replace(/(?:\r\n|\r|\n)/g, '<br>');
                            artist = artist.replace("%20", " ");
                            $("#titulo").html(title+" - "+artist+"<br><hr>");
                            if(responsive.err == "not found")
                                $("#letra").html("Não há uma letra para essa música.");
                            else
                                $("#letra").html(letra);
                        }); 
                    }); 
                });

            })
        }else{
            alert("Selecione filme ou música")
        }
    }
}