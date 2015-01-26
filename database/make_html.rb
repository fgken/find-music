# encoding: utf-8
require "csv"

table = CSV.table('music-database.csv')

html = <<"EOS"
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>オーケストラの楽曲検索</title>
  <meta name="description" content="">
  <meta name="keywords" content="">

  <!-- Bootstrap. Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="./css/custom.css">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and mesia queries -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body>
  <div class="container">
    <h1>オーケストラの楽曲検索</h1>
  </div>

  <div class="container">
    <div class="form-inline form-group">
      <div class="form-group">
          <label for="artist">アーティスト名</label>
          <input id="artist" type="text" name="artist" class="form-control" />
          <label for="artist">曲名</label>
          <input id="name" type="text" name="name" class="form-control" />
      </div>
  
      <div class="form-group">
          <label for="fl">フルート</label>
          <input id="fl" type="text" name="fl" class="form-control" />
          <label for="tb">トロンボーン</label>
          <input id="tb" type="text" name="tb" class="form-control" />
      </div>
    </div>
  </div>

  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
	  <div class="navbar-header">
	    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		  <span class="sr-only">Toggle navication</span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="#">オーケストラの楽曲検索</a>
	  </div>
	  <div id="navbar" class="collapse navbar-collapse">
	    <ul class="nav navbar-nav">
		  <li class="active"><a href="#">Home</a></li>
		  <li><a href="#about">About</a></li>
		  <li><a href="#contact">Contact</a></li>
		</ul>
	  </div>
	</div>
  </nav>

  <div class="container" id="infobar">
    <span id="info"></span>
  </div>

  <div class="container">
    <table class="instrumentation-table table table-striped">
      <thead>
        <tr>
          <th>作曲者</th>
          <th>曲名</th>
          <th>Fl</th>
          <th>Ob</th>
          <th>Cl</th> <!-- Bb or A -->
          <th>Fg</th>
          <th>Tp</th>
          <th>Tb</th>
          <th>Hr</th>
          <th>Tuba</th>
          <th>Timp</th>
          <th>Others</th>
          <!-- Picc, E.Hr, Bs.Cl, C.Fg, Harp, Celesta, Perc -->
        </tr>
      </thead>
      <tbody>
EOS

table.each_with_index do |row, count|
	html += <<-"EOS"
	        <tr id="piece#{count}" data-artist="#{row[:artist]}" data-name="#{row[:name]}" data-fl="#{row[:fl]}" data-ob="#{row[:ob]}" data-cl="#{row[:cl]}" data-fg="#{row[:fg]}" data-tp="#{row[:tp]}" data-tb="#{row[:tb]}" data-hr="#{row[:hr]}" data-tuba="#{row[:tuba]}" data-timp="#{row[:timp]}">
	          <td class="artist">#{row[:artist]}</td>
			  <td class="name">#{row[:name]}</td>
	          <td class="fl">#{row[:fl]}</td>
	          <td class="ob">#{row[:ob]}</td>
	          <td class="cl">#{row[:cl]}</td>
	          <td class="fg">#{row[:fg]}</td>
	          <td class="tp">#{row[:tp]}</td>
	          <td class="tb">#{row[:tb]}</td>
	          <td class="hr">#{row[:hr]}</td>
	          <td class="tuba">#{row[:tuba]}</td>
	          <td class="timp">#{row[:timp]}</td>
	          <td class="others">#{row[:others]}</td>
	          <td></td>
	        </tr>
	EOS
end

html += <<"EOS"
      </tbody>
    </table>
  </div>

  <a href="javascript:change_artist()" >aaaaaaaa</a>

  <!-- JQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

  <!-- Find music script -->
  <script src="js/music-search.js"></script>
</body>

</html>
EOS

puts html
