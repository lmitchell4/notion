
// If this file loads, hide the warning message and show the select grid menu.
$('#warningMsg').remove();


var Game = new (function() {

  var limbo_index = null;
  var current_category = "";
  
  function tileListener(e) {
    // If no tile is selected, select this one. 
    // If a tile is already selected and it is this one, deselect this one.
    // If a tile is already selected and it is not this one, deselect that one and 
    // select this new one.
    
    if(limbo_index == null) {
      $(this).removeClass("active");  // for when applicable
      $(this).addClass("limbo");
      limbo_index = this.id;
    } else if(limbo_index == this.id) {
      $(this).removeClass("limbo");
      limbo_index = null;
    } else {
      tiles[limbo_index].removeClass("limbo");
      $(this).addClass("limbo");
      limbo_index = this.id;     
    }

    if(limbo_index != null) {
      $("div.space:not(.active)").addClass("hand");
    } else {
      $("div.space").removeClass("hand");
    }

  }

  function createTile(id, x, category, name) {
    var img = $("<img />", {
      id: id,
      src: "img/" + category + "/" + name + ".png",
      alt: "Tile representing " + name
    });
    img.on("click", tileListener);
    
    img.addClass("tile");
    img.addClass(category);
    img.id = id,
    img.x = x;

    return(img);
  }


  var anatomy = ["head","torso","ear","eye","arm","leg","nose","mouth"];
  var nature = ["rain","night","heat","wind","lightning","sun","liquid","dirt"];
  var materials = ["rock","metal","plastic","wood","cloth","paper"];
  var components = ["opposite","cut","pieces","puzzle","inside","grid","zero","one"];
  var shapes = ["line","plus","spiral","border","triangle","rectangle",
                "curve","wave","wiggle","circle","star","sheet",
                "cube","pyramid","cone","sphere","cylinder","hole"];
  var actions = ["grow","widen","up","left","round",
                 "shrink","narrow","down","right","activate"];
  var colors = ["red","orange","yellow","green","blue","purple","pink","brown",
                "black","gray","white","transparent"];
  var tiles = [];

  for(var i=0; i < colors.length; i++) {
    tiles[i] = createTile(i, i, "colors", colors[i]);
  }
  var n = tiles.length;
  for(var i=0; i < components.length; i++) {
    tiles[n + i] = createTile(n + i, i, "components", components[i]);
  }  
  var n = tiles.length;
  for(var i=0; i < shapes.length; i++) {
    tiles[n + i] = createTile(n + i, i, "shapes", shapes[i]);
  }
  var n = tiles.length;
  for(var i=0; i < actions.length; i++) {
    tiles[n + i] = createTile(n + i, i, "actions", actions[i]);
  }
  var n = tiles.length;
  for(var i=0; i < nature.length; i++) {
    tiles[n + i] = createTile(n + i, i, "nature", nature[i]);
  }
  var n = tiles.length;
  for(var i=0; i < materials.length; i++) {
    tiles[n + i] = createTile(n + i, i, "materials", materials[i]);
  } 
  var n = tiles.length;
  for(var i=0; i < anatomy.length; i++) {
    tiles[n + i] = createTile(n + i, i, "anatomy", anatomy[i]);
  }  
  
  function getTiles(category) {
    var x = [];
    for(var i=0; i < tiles.length; i++) {
      if(tiles[i][0].classList.contains(category)) {
        x.push(tiles[i]);
      }
    }
    return(x);
  }

  $(".category").on("click", function(e) {
    current_category = this.id;
    var use_tiles = getTiles(current_category);
    
    $("div.uspace").children().detach();
    for(var i=0; i < use_tiles.length; i++) {
      if(!use_tiles[i][0].classList.contains("active")) {
        $("div#us-" + use_tiles[i].x).addClass("active").append(use_tiles[i]);
      }
    }
  });


  function spaceListener(e) {
    // If no tile is selected, do nothing.
    // If a tile is selected and this space is free, put the tile here, update the 
    // classes on the uspace, the space, and the tile, and reset limbo_index.
    if(limbo_index != null & !this.classList.contains("active")) {
      var $tile = tiles[limbo_index];
      var $parent = $tile.parent();
      $parent.removeClass("active");
      $tile.removeClass("limbo");
      $tile.addClass("active");
      $(this).append($tile);
      $(this).addClass("active");
      limbo_index = null;

      $("div.space").removeClass("hand");
    }
  }
  $("div.space").on("click", spaceListener);

  function storageListener(e) {
    // If a tile on the board is selected, put it back in storage (making it visible 
    // if its category is currently displayed), and free up the space.
    // If the tile isn't on the board, do nothing.
    if(limbo_index != null) {
      var $this_tile = tiles[limbo_index];
      var $this_parent = $this_tile.parent();
      var board_check = $this_parent.hasClass("space");
      if(board_check) {
        $this_tile.removeClass("limbo");
        
        if($this_tile.hasClass(current_category)) {
          var x = $this_tile.x;
          $("div#us-" + x).addClass("active");
          $("div#us-" + x).append($this_tile);
        } else {
          $this_tile.remove();
        }
        // free up where it was .... 
        $this_parent.removeClass("active");
        limbo_index = null;
        
        $("div.space").removeClass("hand");
      }
    }    
  }
  $("div#storage").on("click", storageListener);




  





  

  // for(var i=0; i < colors.length; i++) {
    // colors[i].img.on("click", function(e) {
      // console.log(this);
      
      // if(global_limbo) {
        // // If this tile is already selected, deselect it:
        // if(colors[i].status == "limbo") {
          // this.classList.remove("limbo");
          
          // global_limbo = false;
          // limbo_tile = null;
          // $("div.space").removeClass("hand");
        // }
      // } else {
        // // Else, select this tile:
        // this.classList.add("limbo");
        // colors[i].status = "limbo";
        
        // global_limbo = true;
        // limbo_tile = colors[i];
        
        // // Get id of parent div
        // // if(limbo_tile.
        // // console.log(limbo_tile.img.parent().hasClass("space"));
        // if(limbo_tile.img.parent().hasClass("space")) {
          // limbo_tile.snum = limbo_tile.img.parent().attr("id");       
        // }
      // }
    // });
  // }



  // colors.forEach(function(color_obj) {
    // console.log(color_obj.img);
    // // color_obj.img.on("click", function(e) {
    // color_obj.img.click(function(e) {
      // console.log(this);
      
      // if(global_limbo) {
        // // If this tile is already selected, deselect it:
        // if(color_obj.status == "limbo") {
          // this.classList.remove("limbo");
          
          // global_limbo = false;
          // limbo_tile = null;
          // $("div.space").removeClass("hand");
        // }
      // } else {
        // // Else, select this tile:
        // this.classList.add("limbo");
        // color_obj.status = "limbo";
        
        // global_limbo = true;
        // limbo_tile = color_obj;
        
        // // Get id of parent div
        // // if(limbo_tile.
        // // console.log(limbo_tile.img.parent().hasClass("space"));
        // if(limbo_tile.img.parent().hasClass("space")) {
          // limbo_tile.snum = limbo_tile.img.parent().attr("id");       
        // }
      // }
      
    // });
    
  // });
  

  // $("div.space.free").on("mouseover", function(e) {
    // if(global_limbo) {
      // this.classList.add("hand");
    // }
  // });

  // $("div.space.free").on("click", function(e) {
    // if(global_limbo) {
      // var x = limbo_tile.img.detach();
      // x.status = "active";
      // x.removeClass("limbo");
      // x.appendTo(this);
      
      // // The file that it was coming from needs to be freed up.
      // if(limbo_tile.snum != null) {
        // $("div#" + limbo_tile.snum).addClass("free");
        // limbo_tile.snum = null;
      // }
      
      // global_limbo = false;
      // limbo_tile = null;
      
      
      // this.classList.remove("free");
      // $("div.space").removeClass("hand");
      
    // }
  // });





  // On clicking a tile, highlight it somehow, set its status to limbo.
  // $("img.tile").on("click", function(e) {
    // if(!global_limbo) {
      // this.classList.add("limbo");
      // colors[Number(this.id)].status = "limbo";
      // global_limbo = true;
      // limbo_tile = colors[Number(this.id)];
    // }
  // });
  
  
  // $("img.tile").on("click", function(e) {
    // if(!global_limbo) {
      // this.classList.add("limbo");
      // colors[Number(this.id)].status = "limbo";
      // global_limbo = true;
      // limbo_tile = colors[Number(this.id)];
    // }
  // });
  
  
  
  // $("div.space").on("mouseover", function(e) {
    // if(global_limbo & this.classList.contains("free")) {
      // this.classList.add("hand");
    // }
  // });



  // $("div.space").on("click", function(e) {
    // var sNum = this.id;
    // if(global_limbo & this.classList.contains("free")) {
      // var x = limbo_tile.img.detach();
      // console.log(x);
      // x.status = "active";
      // x.sNum = sNum;
      // x.removeClass("limbo");
      // x.appendTo($("div#s-" + limbo_tile.id));
      // global_limbo = false;
      // limbo_tile = null;
      
      // this.classList.remove("free");
      // $("div.space").removeClass("hand");
      // // this.classList.remove("hand");
      
      // // $("div#s-" + limbo_tile.unit_num).append(limbo_tile.img);
      // // $("div#s-" + limbo_tile.unit_num).append(limbo_tile.img);
      
      
      
      
      // // limbo_tile.status = "active";
      // // limbo_tile.img.removeClass("limbo");
      // // // limbo_tile.img.classList.remove("limbo");
      // // global_limbo = false;
      // // limbo_tile = null;
    // }
  // });

  // $("div.uspace").on("click", function(e) {
    // if(global_limbo) {
      // var x = limbo_tile.img.detach();
      // x.status = "nonactive";
      // x.loc = "us";
      // x.removeClass("limbo");
      // x.appendTo($("div#us-" + limbo_tile.id));
      
      // $("div#" + limbo_tile.sNum).addClass("free");
      // $("div.space").removeClass("hand");
      
      // global_limbo = false;
      // limbo_tile = null;
    // }
  // });
  
  
  
  // $("div.uspace").on("click", function(e) {
    // // if it has a child img tile, put the tile in limbo
    // // console.log(this);
    
    // var my_tile = this.childNodes[0];
    // if(my_tile != null & my_tilethis.childNodes.length == 1) {
      // // console.log(this.childNodes);
      // console.log(my_tile);
      
      
      // my_tile.classList.add("limbo");
      // colors[Number(my_tile.id)].status = "limbo";
      // global_limbo = true;
      // limbo_tile = colors[Number(my_tile.id)];
    // }
  // });
  
  
  
  // var categories = ["shapes","colors"];
  
	// var color_names = ["red","orange","yellow","green","blue","purple","pink","brown",
                     // "black","gray","white","transparent"];
  // var colors = [];
  // var tmp;
  // for(var i=0; i < color_names.length; i++) {
    // tmp = {
      // category: "colors",
      // src:"img/colors/" + color_names[i] + ".png",
      // unit_num: i,
      // active: false
    // };
   // colors[i] = tmp; 
  // }
  

  // var erase_mode = false;
  // var selected_tiles = [];
  // var current_category = "";
  
  // var $colorCat = $("#colors");
  // var $units = $("img.unit");
  // var $tiles = $("img.tile");
  
  // $colorCat.on("click", function(e) {
    // current_category = this.id;
    
    // for(var i=0; i < colors.length; i++) {
      // if(!colors[i].active) {
        // $("img#unit-" + colors[i].unit_num).attr("src",colors[i].src);
      // }
    // }
  // });
  
  // $("img.unit").on("click", function(e) {
    // // console.log(this);
    // var x = Number(this.id.split("-")[1]);
    
    // if(!colors[x].active) {
      // console.log(x);

      // this.src = "";
      // colors[x].active = true;
      // selected_tiles.push(colors[x]);
      // var y = selected_tiles.length - 1;
      // $("img#tile-" + y).attr("src",colors[x].src);
    // }
  // });



  // $("button#erase").on("click", function(e) {
    // // Change pointer type ...
    
    // if(erase_mode) {
      // this.classList.remove("erase");
      // erase_mode = false;
    // } else {
      // this.classList.add("erase");
      // erase_mode = true;
    // }
    
  // });


  // $("img.tile").on("click", function(e) {
    // var x = Number(this.id.split("-")[1]);
    
    // if(erase_mode & selected_tiles[x] != null) {
      // // selected_tiles.delete(x);
      // this.src = "";
      // selected_tiles[x] = null;
      
      // colors[x].active = false;
      
      // // console.log(current_category);
      // // console.log(colors[x].category);
      // if(current_category == colors[x].category) {
        // $("img#unit-" + colors[x].unit_num).attr("src",colors[x].src);
      // }
      
    // }
    
    // // // console.log(this);
    // // var x = Number(this.id.split("-")[1]);
    // // console.log(x);

    // // this.src = "";
    // // colors[x].active = true;
    // // selected_tiles.push(colors[x]);
    // // var y = selected_tiles.length - 1;
    // // $("img#tile-" + y).attr("src",colors[x].src);
    
  // });









  
	// var self = this,
		// uniqTileNames = ['a','b','c','one','two','three','four','bunny','cat',
						 // 'circle','triangle','pentagon','hexagon',
						 // 'hash','percent','star1','star2','tree'],
		// size,
		// flipSpeed = 1000,
		// gridImages,			// Array holding the image name for each tile.
		// matchArray;			// Indicates the index of each tile's match.
	
	// var activeOneID = -1,			// Controls active (face up) tiles.
		// activeOneImage = "",		// Controls active (face up) tiles.
		// activeTwoID = -1,			// Controls active (face up) tiles.
		// activeTwoImage = "",		// Controls active (face up) tiles.
		// numUp = 0,					// Number of active (face up) tiles.
		// numOfMatches = 0,			// Total number of matched tiles.
		// numOfClicks = 0,			// Number of successful tile clicks;
									// // 	used to trigger a new message.
		// gameOver = false,
		// isWorking = false;			// Indicates if tileListener() method is executing. 
	
	// var $boardcontainer = $('#board-container'),
		// $msgboard = $('p#msgboard'),	// Hold message board jQuery object.
		// $gridMenu = $('#gridMenu'),
		// board,
		// $imgs;


	// // Pick out and shuffle the correct number of tiles.	
	// function shuffleTiles(n) {
		// var keep = [],
			// halfN = n/2;
		
		// // Randomly reorder the uniqTileNames array.
		// // Reorder a copy of the array to leave the original intact.
		// var shuffledAll = uniqTileNames;
		// shuffledAll.sort(function () {
			// return 0.5 - Math.random();
		// });
		
		// // Select the first n/2 of the shuffled images.
		// for(var i = 0; i < halfN; i++) {			
			// keep[i] = shuffledAll[i];
		// }
		
		// // Need each image twice.
		// keep = keep.concat(keep);
		
		// // Now randomly reorder the 2*(n/2) images randomly.
		// keep.sort(function() {
			// return 0.5 - Math.random();
		// });
		
		// return keep;
	// }

	// // Figure out where each tile's match is.
	// function returnMatchArray(gridImages) {
		// ret = [];
		
		// for(var i = 0; i < gridImages.length; i++) {
			// for(var j = 0; j < gridImages.length; j++) {
				// if(gridImages[j] === gridImages[i] && i !== j) {
					// ret[i] = j;
				// }
			// }
		// }
		
		// return ret;
	// }
	
			
	// // Change the time before mismatches get returned to gray.
	// function changeSpeed(speed) {
		// if(speed === "slow") {
			// flipSpeed = 2000;
		// } else if(speed === "medium") {
			// flipSpeed = 1000;
		// } else if(speed === "fast") {
			// flipSpeed = 200;
		// }
	// };	
	
	// // Show one tile at a time.
	// function showOneTile(id) {
		// $imgs.eq(id).attr('src','img/' + gridImages[id] + '.png');
		// // $('img#tile' + id).attr('src','img/' + gridImages[id] + '.png');
	// };
	
	
	// // Reset variables for either a new game or a restart.
	// function reset() {
		// gameOver = false;
		// numOfClicks = 0;
		// isWorking = false;				
		// startNewTurn();					// start a new turn
		// numOfMatches = 0;				// reset the number of matches
	// }
	
	// // Restart the current game.
	// function restart() {
		// // Clear the message board.
		// $msgboard.stop(true, true);
		// $msgboard.hide().text("");
		
		// // Reset variables.
		// reset();
		
		// if($imgs) {
			// $imgs.removeClass('matched');	// remove the 'matched' class from any/all tiles
			// $imgs.attr('inplay');			// reset tile class to 'inplay'
			
			// // Change all tiles back to gray without reshuffling.
			// $imgs.attr('src','img/graysquare.png');		
		// }

		// // Fade in a message on the message board.
		// $msgboard.hide().delay(700).fadeTo(700,1).text("Start Matching!");		
	// };

	// // Start a new game.
	// function newgame() {
		// // Clear the message board.
		// $msgboard.stop(true, true);
		// $msgboard.hide().text("");
			
		// // If a game already exists, run the code.  		
		// // Otherwise, do nothing. Wait for the user to finally pick a grid size.
		// if($board) {		
			// // Reset variables.
			// reset();

			// // Remove the current board.
			// $board.remove();
			
			// // Kill the board selector.
			// // This will ensure this function does nothing if it is run multiple 
			// // times in a row.
			// $board = undefined;
			
			// // Show the grid selection menu.
			// $boardcontainer.append($gridMenu);

			// // Generate the new game.
			// runGame();
		// }
		
	// };
	
	// // Solve the current game.
	// function solve() {
		// gameOver = true;
		
		// // Show all tiles.
		// for(var i = 0; i < size; i++) {
			// showOneTile(i);
		// }
	
		// numOfMatches = 2*size;
		// $('img:not(.matched)').attr('matched');		// set every tile class to 'matched'
		
		// // If the message is still fading out after a match, this message can 
		// // accidentally fade, too, so first stop any current animations, then 
		// // undo the fade, then display the new message.
		// $msgboard.stop(true, true);
		// $msgboard.fadeTo(0,1).text('Solved!');
	// };
	
	// // Give a hint.
	// function hint() {		
		// // If no tiles are currently selected, do nothing.			
		
		// // If 1 tile is currently selected, find the other matching tile.
		// // if(activeOneID !== -1 && activeTwoID === -1) {
		// if(numUp === 1) {
			// var matchingID = matchArray[activeOneID];
			
			// var $tile = $('img').eq(matchingID);
			// $tile.attr('src','img/hintsquare.png');
			
			// var timeout = setTimeout(function() {
				// $tile.attr('src','img/graysquare.png');
			// }, 500);
		// }
			
		// // If 2 tiles are currently selected and hint is clicked before 
		// // the second tile finishes executing, do nothing.
	// };
	
	// // After a mismatch, reset these.
	// function startNewTurn() {
		// activeOneID = -1;
		// activeOneImage = "";

		// activeTwoID = -1;			
		// activeTwoImage = "";
		
		// numUp = 0;
	// };

	
	// // This method "flips" tiles and determines whether or not a match has
	// //  occurred. 
	// // The method ignores new tile clicks until the first method call is finished.
	// function tileListener(e) {
	
		// // Ignore new clicks until the first click is finished.
		// if(isWorking || gameOver) {
			// return;
		// }
		
		// isWorking = true;
					
		// var selectedTile = e.target;
		// var tileClass = selectedTile.getAttribute('class');
		// var tileIDString = selectedTile.getAttribute('id');
		// var id = Number( tileIDString.substring(4,tileIDString.length) );
		// var image = gridImages[id];
	
		// // If a matched tile is clicked, ignore the event.
		// if(tileClass === "matched")  {
			// isWorking = false;
			// return;
		// }
		
		// if(numUp === 0) {
			// // Show the tile.
			// activeOneID = id;
			// activeOneImage = image;
			// showOneTile(id);
			// numUp = 1;

			// isWorking=false;
			// numOfClicks += 1;
			
		// } else if(numUp === 1) {
			// // Show the tile.
			// activeTwoID = id;
			// activeTwoImage = image;
			// showOneTile(id);
	
			// // If an active tile is reclicked, ignore the reclick.
			// if(activeTwoID === activeOneID) {
				// isWorking = false;
				// return;
			// }
	
			// // Two tiles successfully matched. 
			// // Keep both tiles face up and update their classes.
			// // Increase numOfMatches.
			// if(activeOneImage === activeTwoImage) {
				// $('img#tile' + activeOneID).attr('class','matched');
				// $('img#tile' + activeTwoID).attr('class','matched');					
				// numOfMatches += 2;
				// if(numOfMatches === size) {
					// gameOver = true;
					
					// // Update the message board when the user wins.
					// $msgboard.stop(true, true);
					// $msgboard.fadeTo(0,1).text("Well Done!");
	
					// return;
				// }
				
				// // If a match message is still fading out, interrupt it, don't wait
				// //  for it to finish.
				// // fade to 1 because other parts of the code may have faded to 0
				// //  before this runs.					
				// $msgboard.stop(true, true);
				// $msgboard.fadeTo(0,1).text('Match!').delay(2000).fadeTo(1000,0);				
				
				// // Begin a new turn.
				// startNewTurn();
				// isWorking = false;
				
			// } else {			
				// var tileListenerThis = this;
				// var tileListenerThis_id1 = activeOneID;
				// var tileListenerThis_id2 = activeTwoID;
				
				// var timeout = setTimeout(function() {
					// $('img#tile' + tileListenerThis_id1).attr('src','img/graysquare.png');
					// $('img#tile' + tileListenerThis_id2).attr('src','img/graysquare.png');
					
					// // Begin a new turn.
					// startNewTurn();
					// isWorking = false;
					// //tileListenerThis.startNewTurn();
					// //tileListenerThis.isWorking = false;
				// }, flipSpeed);
				
			// }
			
			// numOfClicks += 1;
		// }
	
		// // Clear the message board on the 9th successful click.
		// if(numOfClicks === 9) {
			// $msgboard.stop(true, true);
			// $msgboard.fadeTo(700,0);		// second argument is opacity
		// }

		// // Show a new message on the 19th successful click.
		// if(numOfClicks === 19) {
			// $msgboard.stop(true, true);
			// $msgboard.hide().delay(700).fadeTo(700,1).text("Keep Going!");			
		
		// }
		
	// } // end tileListener()
	

	// // Create the grid of tiles.
	// function createGrid() {
		// var tileID, str;
		
		// if(size === 16) {
			// $board = $('<div id="board-4x4" class="column2of3"></div>');
		// } else if(size === 36) {
			// $board = $('<div id="board-6x6" class="column2of3"></div>');
		// }
		// $boardcontainer.append($board);
		
		// for(var i = 0; i < size; i++) {
			// tileID = '"tile' + i + '"';
			// str = '<div class="floated_img">';
			// str += '<img id=' + tileID + ' class="tile inplay" src="img/graysquare.png" ';
			// str += 'alt="' + tileID + '">';
			// str += '</div>';
			
			// $board.append(str);	
		// }

		// $imgs = $('img');
		// $imgs.on('click', function(e) {
			// tileListener(e);
		// });
		
		// // Fade in a message on the message board.
		// $msgboard.stop(true, true);
		// $msgboard.hide().delay(700).fadeTo(700,1).text("Start Matching!");
			
	// };
	
	// function loadGame() {	
		// // Array of image name strings for all of the tiles.
		// gridImages = shuffleTiles(size);
		
		// // matchArray[i] gives the index of the other tile that has the 
		// // same image as tile i.
		// matchArray = returnMatchArray(gridImages);

		// // Number of milliseconds to wait before mismatched tiles are reset to gray.
// //		flipSpeed = 1000;		// medium
// //		$('input.speed').removeClass('selected');	// remove selected class from any/all
// //		$('input#medium').addClass('selected');		// add selected class to medium button
	
		// // Create board.
		// createGrid();
	// }

	// function runGame() {	
		// size = 0;
					
		// $('.size').on('click', function(e) {
			// e.preventDefault();
			// var selectedBttn = e.target;
			// var buttonID = selectedBttn.getAttribute('id');
			
			// if(buttonID === "4x4") {
				// size = 16;			
			// } else if(buttonID === "6x6") {
				// size = 36;
			// }
			
			// $gridMenu.remove();				
			// loadGame();
		// });
	// }
	

	// function setUp() {
		// // This function is designed to only run once when this file first loads.
	
		// // Set up game control buttons.
		// $('input.control').on('click', function(e) {
			// e.preventDefault();
			// var selectedBttn = e.target;
			// var buttonID = selectedBttn.getAttribute('id');
			
			// switch(buttonID) {
				// case 'newGame':
					// newgame();
					// break;
				// case 'restartGame':
					// restart();
					// break;
				// case 'hint':
					// hint();
					// break;
				// case 'solve':
					// solve();
					// break;
				// default: 	// Do nothing
					// break;
			// }
		// });	
		
		
		// // Set up flip speed control buttons.
		// $('input[class~="speed"]').on('click', function(e) {
			// e.preventDefault();
			// var clickedBttn = e.target;
			// var buttonID = clickedBttn.getAttribute('id');
			// var buttonClass = clickedBttn.getAttribute('class'); 
			
			// if(buttonClass.indexOf("selected") != -1) {
				// // If the button clicked is already selected, do nothing.
			// } else {
				// // Remove 'selected' class from any/all tiles.
				// $('input.speed').removeClass("selected");
				
				// // Add 'selected' class to the correct button.
				// $('input#' + buttonID).addClass("selected");
				
				// switch(buttonID) {
					// case 'slow':
						// changeSpeed("slow");	
						// break;
					// case 'medium':
						// changeSpeed("medium");
						// break;
					// case 'fast':
						// changeSpeed("fast");
						// break;
					// default:
						// // Do nothing
						// break;
				// }
			// }
		// });		
				
	// }

	// this.setUp = setUp;
	// this.runGame = runGame;
	
})();


// Game.setUp();
// Game.runGame();



	