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
	
//	$("table.instrumentation-table").tablesorter();
});

function check_unset(_input, event, ui) {
    var now_val = $(_input).val();
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
