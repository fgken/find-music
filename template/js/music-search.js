
var music_database = {};
var is_expanded = {};

// --------------------------------------
// --- event: ready ---
// --------------------------------------
$(document).ready(function() {
	// download music database
    $.ajax({
		type: "GET",
		url: "music.json",
		success: function(data) {
			music_database = data;
			init_is_expanded(music_database);
           	update_table(music_database);
		}
	});
});

function init_is_expanded(database) {
	is_expanded = {};
	for (var artist in database) {
		is_expanded[artist] = false;
	}

	console.log(is_expanded);
}




// --------------------------------------
// --- search results table ---
// --------------------------------------

function update_table(obj) {
    var song_table = $("table.instrumentation-table tbody");

    var artist_name;
    var song_name;

	song_table.empty();

	// Each artist
    for (var artist in obj) {
        artist_name = artist;

        // 作曲者名のかかれた<tr>つくる
        var artist_bar = $("<tr></tr>")
            .addClass("artist_bar")
            .data("artist", artist_name)
            .append($("<td></td>")
                .addClass("artist")
                .text(artist_name)
            ).append($("<td></td>")
                .addClass("name")
            ).append($("<td></td>")
                .addClass("fl")
            ).append($("<td></td>")
                .addClass("ob")
            ).append($("<td></td>")
                .addClass("cl")
            ).append($("<td></td>")
                .addClass("fg")
            ).append($("<td></td>")
                .addClass("tp")
            ).append($("<td></td>")
                .addClass("tb")
            ).append($("<td></td>")
                .addClass("hr")
            ).append($("<td></td>")
                .addClass("tuba")
            ).append($("<td></td>")
                .addClass("timp")
            ).append($("<td></td>")
                .addClass("others")
            ).click(function() {
                toggle_artist($(this).data("artist"));
//                $("tr.artist_" + $(this).data("artist")).toggleClass("hide");
            });
            song_table.append(artist_bar);

        var song_count = 0;
        for (var _song in obj[artist]) { // 曲のループ
            var song = obj[artist][_song];

			var new_row = $("<tr></tr>")
                .addClass("artist_" + artist_name)
                .addClass("song_" + song_count);

			if(is_expanded[artist] == false){
				new_row.addClass("hide");
			}

			new_row.append($("<td></td>")
                    .addClass("artist")
                    .text(artist_name)
                ).append($("<td></td>")
                    .addClass("name")
                    .text(song.name)
                ).append($("<td></td>")
                    .addClass("fl")
                    .text(song.fl)
                ).append($("<td></td>")
                    .addClass("ob")
                    .text(song.ob)
                ).append($("<td></td>")
                    .addClass("cl")
                    .text(song.cl)
                ).append($("<td></td>")
                    .addClass("fg")
                    .text(song.fg)
                ).append($("<td></td>")
                    .addClass("tp")
                    .text(song.tp)
                ).append($("<td></td>")
                    .addClass("tb")
                    .text(song.tb)
                ).append($("<td></td>")
                    .addClass("hr")
                    .text(song.hr)
                ).append($("<td></td>")
                    .addClass("tuba")
                    .text(song.tuba)
                ).append($("<td></td>")
                    .addClass("timp")
                    .text(song.timp)
                ).append($("<td></td>")
                    .addClass("others")
                    .text(song.others)
                );
            
			song_table.append(new_row);

            song_count++;
            // 曲ごとの<tr class="hide">でつくる
        }

        $("tr.artist_" + artist_name).data("songcount", song_count);
    }
}

function search() {
	var searchCondition = Array();

	$("input.instr").each(function(idx) {
		var val = $(this).val();
		if(val != ""){
			searchCondition[$(this).attr("id")] = val;
		}
	});

	var filtered_data = {}

	// Each artist
    for (var artist in music_database) {
		filtered_data[artist] = [];

		// Each music
        for (var music in music_database[artist]) {
			var isMached = true;
			// Filter
			for (var condition in searchCondition) {
				if (music_database[artist][music][condition] != searchCondition[condition]) {
					isMached = false;
					break;
				}
			}

			if( isMached ){
				filtered_data[artist].push(music_database[artist][music]);
			}
		}
	}

	var delete_key = [];
	for (var artist in filtered_data) {
		if(filtered_data[artist].length == 0) {
			delete_key.push(artist);
		}
	}
	for (var key in delete_key) {
		delete filtered_data[delete_key[key]];
	}

	update_table(filtered_data);
}




// --------------------------------------
// --- search boxes ---
// --------------------------------------
$(function(){
	$("input").keyup(function() {
		search();
	});
	
	$("input.spinner").spinner({
		min: -1,
		spin: function( event, ui ){ setTimeout("search()", 10); },
        //start: function (event, ui) { return check_unset(this, event, ui); },
	});
	$("input.spinner").width(30);
	
	$("button#clear").click(function() {
		clear_search_form();
		$(this).addClass("hide");
	});

//	$("table.instrumentation-table").tablesorter();
});

function toggle_each(artist_name, song_count) {

    $("tr.artist_" + artist_name + ".song_" + song_count).toggleClass("hide");

    var max_song = $("tr.artist_" + artist_name).data("songcount");
    if (song_count < max_song)
        setTimeout("toggle_each(\"" + artist_name + "\", " + parseInt(song_count + 1) + ")", 5);
}

function toggle_artist(artist_name) {
	is_expanded[artist_name] = !is_expanded[artist_name];
    setTimeout("toggle_each(\"" + artist_name + "\", 0)", 20);
}


function check_unset(_input, event, ui) {
    var now_val = $(_input).val();
    if (now_val.length == 0) {
        now_val = 0;
    }
    var direction = event.toElement.innerText=="▲"?1:-1;
    var new_val = parseInt(now_val) + parseInt(direction);

    if (new_val == -1) {
        $(_input).val("");
        $(_input).addClass("unset");
        return false;
    } else {
        $(_input).removeClass("unset");
        return true;
    }
}

function clear_search_form() {
	$("input").val("");
	search();
}

