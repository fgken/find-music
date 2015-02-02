$(function(){
	$("input").keyup(function() {
		search();
	});
	
	$("input.spinner").spinner({
		min: -1,
		spin: function( event, ui ){ setTimeout("search()", 10); },
        start: function (event, ui) { return check_unset(this, event, ui); },
	});
	$("input.spinner").width(30);
	
	$("button#clear").click(function() {
		clear_search_form();
		$(this).addClass("hide");
	});

    load_all_songs();
	
//	$("table.instrumentation-table").tablesorter();
});

function load_all_songs() {
    $.ajax({
        type: "GET",
        url: "music.json",
        dataType: "text",
        success: function(text) {
            var obj = eval("(" + text + ")");

            create_table(obj);
        },
    });
}

function create_table(obj) {
    var song_table = $("table.instrumentation-table tbody");

    var artist_name;
    var song_name;

    for (var artist in obj) { // アーティストのるーぷ
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
                $("tr.artist_" + $(this).data("artist")).toggleClass("hide");
            });
            song_table.append(artist_bar);
        for (var _song in obj[artist]) { // 曲のループ
            var song = obj[artist][_song];

            song_table.append($("<tr></tr>")
                .addClass("artist_" + artist_name)
                .addClass("hide")
                    .append($("<td></td>")
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
                    )
                );

            // 曲ごとの<tr class="hide">でつくる

        }

    }
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

function search() {
    var artist_name;
    var song_name;
    var hit_count;

	var searchCondition = Array();

	$("input.instr").each(function(idx) {
		searchCondition[$(this).attr("id")] = $(this).val();
	});

/*    fl_num = $("input#fl").val();
    tb_num = $("input#tb").val();
	*/
	//console.log(searchCondition);


    // いったん全部けしてから，
    $("tbody tr").addClass("hide");
    $("button#clear").removeClass("hide");

    hit_count = 0;
    $("tbody tr").each(function(idx) {
		for (var key in searchCondition) {
			var value = searchCondition[key];

			//console.log(key+","+value);

			if (value == "") continue;
			
			// ここにくる = 検索条件の指定がある
			$("button#clear").removeClass("hide");

			if ((key == "artist") ||
			    (key == "name")   ||
			    (key == "others")) {
			    
			    if ($(this).data(key).indexOf(value) < 0)
			    	return;
			} else {
				if ($(this).data(key) != value){
//				   console.log(key + "," + value);
			   	   return;
				}
			}
		}

        hit_count++;
        $(this).removeClass("hide");
    });

    if (hit_count > 0)
        $("span#info").text(" 検索結果:" + hit_count + "件").addClass("hitcount").removeClass("error");
    else
        $("span#info").text("該当する楽曲がありません").addClass("error").removeClass("hitcount");
}
