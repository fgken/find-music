$(function(){
	$("input").keyup(function() {
		search();
	});
	
	$("table.instrumentation-table").tablesorter();
});

function search() {
    var tb_num;
    var artist_name;
    var song_name;
    var hit_count;


    fl_num = $("input#fl").val();
    tb_num = $("input#tb").val();

    artist_name = $("input#artist").val();
    song_name = $("input#name").val();

    // いったん全部けしてから，
    $("tbody tr").addClass("hide");

    hit_count = 0;
    $("tbody tr").each(function(idx) {
            if (fl_num != "") {
                if ($(this).data("fl") != fl_num)
                    return;
            }

            if (tb_num != "") {
                if ($(this).data("tb") != tb_num)
                    return;
            }

            if (song_name != "") {
                if ($(this).data("name").indexOf(song_name) < 0)
                    return;
            }

            if (artist_name != "") {
                if ($(this).data("artist").indexOf(artist_name) < 0)
                    return;
            }

            hit_count++;
            $(this).removeClass("hide");
    });

    if (hit_count > 0)
        $("span#info").text(" 検索結果:" + hit_count + "件").addClass("hitcount").removeClass("error");
    else
        $("span#info").text("該当する楽曲がありません").addClass("error").removeClass("hitcount");
}
