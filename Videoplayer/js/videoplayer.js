/*
this feature is a HTML5-Videoplayer-Plugin
©2024 Thomas Dittmar
*/

(function($) {
  $.fn.videoPlayer = function(options) {
  var settings = $.extend({
    "source": "Die Lümmel von der ersten Bank - Betragen ungenügend",
    "path": "file://localhost/c:/Users/sonvt/Videos/",
    "extension":".mp4",
    "volume": 1,
    "pitch": false,
    "playbackRate": 1,
    "controls": false,
    "muted": false,
    "movies": [],
    "fxSounds": ["vbge1.ogg", "vbge2.ogg", "vbge3.ogg", "vbge4.ogg", "vbge5.ogg", "vbge6.ogg", "vbge7.ogg", "vbge8.ogg", "vbge9.ogg", "vbge10.ogg"]
  		}, options);
    
  var video = $("<video/>");
    video.css({
      "background": "#151515"
    });
    
  video.prop("preservesPitch", settings.pitch);
  video.attr("src",settings.path +""+ settings.source + "" + settings.extension);
  video.css("width","100%");
  video.css("height","100%");
  video.prop("playbackRate",settings.playbackRate);
  video.prop("muted",settings.muted);
  video.attr("controls",settings.controls);
  
  this.html(video);
  
  var toolbar = $("<div/>");
  
  var tbPos = this.offset();
  var tbY = tbPos.top + this.height();
  
  toolbar.css({
    "width": this.width(),
    "height": "45px",
    "background": "rgba(21,21,21,0.5)",
    "position": "absolute",
    "z-index": "100",
    "left": tbPos.left,
    "top": tbY - 57,
    "display": "flex",
    "vertical-direction": "row",
    "padding-top": "12px"
  });
  
  toolbar.appendTo(this);
  
  var showTool;
  
  video.on("mousemove", function() {
    clearTimeout(showTool);
    toolbar.show();
    showTool = setTimeout(function() {
      toolbar.hide();
    },6000);
  });
  
  var toolsBtns1 = $("<button id='playBtn' class='toolbuttons'>&#9654;</button>&nbsp;<button id='pauseBtn' class='toolbuttons'>&#9632;</button>");
  toolsBtns1.appendTo(toolbar);
  
  var rewBtn = $("<button class='toolbuttons'>&laquo;</button>");
  rewBtn.appendTo(toolbar);
  
  var forwBtn = $("<button class='toolbuttons'>&raquo;</button>");
  forwBtn.appendTo(toolbar);
    
  var skiprewBtn = $("<button class='toolbuttons'>|&laquo;</button>");
  skiprewBtn.css({
    "background": "#202100",
    "border-color": "#202100",
    "display": "none"
  });
  skiprewBtn.appendTo(toolbar);
  
  var skipforwBtn = $("<button class='toolbuttons'>&raquo;|</button>");
  skipforwBtn.css({
    "background": "#202100",
    "border-color": "#202100",
    "display": "none"
  });
  skipforwBtn.appendTo(toolbar);
  
  var timeTools = $("<div class='timerBox'><div class='time1' id='searchtime'><div id='progtime' class='progtime'></div></div><div class='time2' id='playtime'>0:00 / 0:00</div></table>");
  timeTools.appendTo(toolbar);
  
  $("#playBtn").on("click", function() {
    var btnStyle = $(this).attr("style");
    
    if (!btnStyle) {
       video.trigger("play");
    	$(this).css({
      	"background":"linear-gradient(to right, navy, skyblue, navy)",
      	"border-style":"inset",
      	"border-color":"skyblue"
    }).html("||");
    } else {
      video.trigger("pause");
      $(this).removeAttr("style").html("&#9654;");
    }
  });
  
  video.on("pause", function() {
    $("#playBtn").removeAttr("style").html("&#9654;");
  });
  
  $("#pauseBtn").on("click", function() {
    video.trigger("pause");
    video.prop("currentTime",0);
    $("#playBtn").html("&#9654;");
  });
  
  rewBtn.on("click", function() {
    var timeStamp = video.prop("currentTime");
    video.prop("currentTime", timeStamp - 10);
  });
  
  forwBtn.on("click", function() {
    var timeStamp = video.prop("currentTime");
    video.prop("currentTime", timeStamp + 10);
  });
      
  var miniPlayer = $("<video/>");
  miniPlayer.attr("src",settings.path +""+ settings.source + "" + settings.extension);
  miniPlayer.css({
    "width": "240px",
    "height": "135px",
    "background": "rgba(15, 15, 15, 0.8)",
    "position": "absolute",
    "z-index": "1000",
    "left": "100",
    "top": "10",
    "display": "none"
  });
    
  miniPlayer.appendTo(this);
  
  var prevTime = $("<div/>");
  prevTime.css({
    "width": "150px",
    "height": "20px",
    "background": "rgba(15, 15, 15, 0.9)",
    "font-size": "15px",
    "font-weight": "bold",
    "color": "white",
    "border-radius": "10px",
    "border": "4px solid white",
    "text-align": "center",
    "position": "absolute",
    "z-index": "1000",
    "left": "100",
    "top": "10",
    "display": "none"
  });
    
  prevTime.text("0:00/0:00");
  prevTime.appendTo(this);
  
  var infoBox = $("<div/>");
  infoBox.css({
    "width": "150px",
    "height": "25px",
    "background": "rgba(15, 15, 15, 0.9)",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "border-radius": "6px",
    "border": "1px solid white",
    "position": "absolute",
    "z-index": "1001",
    "padding-top": "6px",
    "left": "100",
    "top": "20",
    "display": "none"
  });
  
  infoBox.text("Tool-Title");
  infoBox.appendTo(this);
  
  function showTitle(info) {
    infoBox.text(info);
  }
  
  $("#playBtn").on("mouseenter", function() {
    showTitle("Play/Pause");
  });
  
  $("#playBtn").on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  $("#pauseBtn").on("mouseenter", function() {
    showTitle("Stop");
  });
  
  $("#pauseBtn").on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  $("#playBtn, #pauseBtn").on("mouseleave", function() {
    infoBox.hide(100);
  });
  
  rewBtn.on("mouseenter", function() {
    showTitle("Rewind - 10 Sec");
  });
  
  forwBtn.on("mouseenter", function() {
    showTitle("Forward - 10 Sec");
  });
  
  rewBtn.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  forwBtn.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  rewBtn.on("mouseleave", function() {
    infoBox.hide(100);
  });
  
  forwBtn.on("mouseleave", function() {
    infoBox.hide(100);
  });
  
  function setTime() {
    var total = video.prop("duration");
  	var timeStamp = video.prop("currentTime");
  	var deltaTime = total - timeStamp;
    
    var vHour = parseInt(timeStamp/3600);
    var vMin = parseInt(timeStamp/60 % 60);
    var vSec = parseInt(timeStamp % 60);
    var rHour = parseInt(deltaTime/3600);
    var rMin = parseInt(deltaTime/60 % 60);
    var rSec = parseInt(deltaTime % 60);
    vMin = (vMin < 10 ? "0"+vMin : vMin);
    vSec = (vSec < 10 ? "0"+vSec : vSec);
    rMin = (rMin < 10 ? "0"+rMin : rMin);
    rSec = (rSec < 10 ? "0"+rSec : rSec);
   
    if (total > 0) {
      $("#playtime").html(vHour + ":" + vMin + ":" + vSec + " / " + rHour + ":" + rMin + ":" + rSec);
    }
  }
  
  function setProgress() {
    var total = video.prop("duration");
  	var timeStamp = video.prop("currentTime");
    var progress = timeStamp/total*100;
    
    if (total > 0) {
      $("#progtime").css("width",progress+"%");
    }
  }
  
  video.on("timeupdate", function() {
    setTime();
    setProgress();
  });
  
  video.on("durationchange", function() {
    setTime();
  });
  
  function moveProgress(e) {
    var barSize = $("#searchtime").width();
    var total = video.prop("duration");
    var barPos = e.offsetX;
    var videoPos = barPos/barSize*total;
    
    if (total > 0) {
      video.prop("currentTime",videoPos);
    }
  }
  
  function showItems(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var minPlSize = miniPlayer.width();
    var prevSize = prevTime.width();
    var barSize = $("#searchtime").width();
    var total = video.prop("duration");
    var barPos = e.offsetX;
    var videoPos = barPos/barSize*total;
    var vidDelta = total - videoPos;
    
    var minPlPos = xPos - minPlSize/2;
    var prevPos = xPos - prevSize/2;
    var minVertPos = yPos - 200;
    var prevVertPos = yPos - 60;
    
    var forwPrevHour = parseInt(videoPos/3600);
    var forwPrevMin = parseInt(videoPos/60 %60);
    var forwPrevSec = parseInt(videoPos % 60);
    
    var rePrevHour = parseInt(vidDelta/3600);
    var rePrevMin = parseInt(vidDelta/60 %60);
    var rePrevSec = parseInt(vidDelta % 60);
    
    forwPrevMin = (forwPrevMin < 10 ? "0"+forwPrevMin : forwPrevMin);
    forwPrevSec = (forwPrevSec < 10 ? "0"+forwPrevSec : forwPrevSec);
    rePrevMin = (rePrevMin < 10 ? "0"+rePrevMin : rePrevMin);
    rePrevSec = (rePrevSec < 10 ? "0"+rePrevSec : rePrevSec);
    
    if (total > 0) {
      prevTime.html(forwPrevHour + ":" + forwPrevMin + ":" + forwPrevSec + " / " + rePrevHour + ":" + rePrevMin + ":" + rePrevSec);
      miniPlayer.prop("currentTime",videoPos);
    } else {
      prevTime.html("No Video Load!");
    }
    
    $("#progtime").css({"height":"12px", "margin-top":"4px"});
    miniPlayer.animate({left: minPlPos+"px", top: minVertPos+"px"},10).show();
    prevTime.animate({left: prevPos+"px", top: prevVertPos+"px"},10).show();
  }
  
  $("#searchtime").on("click",moveProgress);
  $("#searchtime").on("mouseenter", showItems);
  $("#searchtime").on("mousemove", showItems);
  
  $("#searchtime").on("mouseleave", function() {
    $("#progtime").css({"height":"6px", "margin-top":"6px"});
    miniPlayer.hide();
    prevTime.hide();
  });
  
  $("#searchtime").on("mousedown", function() {
    $(this).on("mousemove",moveProgress);
  });
  
  $("#searchtime").on("mouseup", function() {
    $(this).off("mousemove");
    $(this).on("mousemove", showItems);
  });
  
  var pitchers = $("<select/>");
  pitchers.css({
    "width": "60px",
    "height":"30px",
    "margin-left":"12px",
    "background": "#151515",
    "border": "2px outset #262626",
    "border-radius": "6px",
    "font-size": "15px",
    "font-weight": "bold",
    "color": "white"
  	});
  
  pitchers.appendTo(toolbar);
  
  var pitchVals = $("<option value='0.25'>0.25</option><option value='0.5'>0.50</option><option value='0.75'>0.75</option><option value='1' selected>1.00</option><option value='1.25'>1.25</option><option value='1.5'>1.50</option><option value='1.75'>1.75</option><option value='2'>2.00</option><option value='3'>3.00</option><option value='3.5'>3.50</option><option value='4'>4.00</option>");
  pitchVals.appendTo(pitchers);
  
  pitchers.on("change", function() {
    var pitchRate = $(this).val();
    video.prop("playbackRate", pitchRate);
  });
  
  var volumeBox = $("<div/>");
  volumeBox.css({
    "width": "120px",
    "height": "30px",
    "background": "#202020",
    "margin-left": "12px"
  	});
  
  volumeBox.appendTo(toolbar);
  var volumer = $("<input type='range'/>");
  volumer.css({
    "width": "100px",
    "margin-top": "6px"
  	}).attr({
    "max": "1",
    "min": "0",
    "step": "0.01"
  	});
  
  volumer.appendTo(volumeBox);
  
  volumer.on("change", function() {
    var volVal = $(this).val();
    video.prop("volume", volVal);
    infoBox.text("Volume: " + volVal*100 + "%");
  });

  volumer.on("mousedown", function() {
    $(this).on("mousemove", function() {
      $(this).trigger("change");
    });
  });
  
  volumer.on("mouseup", function() {
    $(this).off("mousemove");
  });
  
  var toggleVolume = $("<button class='toolbuttons' id='togglemute'><img src='Symbole/volume.png' style='filter:invert(100%)'></button>");
  toggleVolume.appendTo(toolbar);
  
  toggleVolume.on("click", function() {
    var symbol = $("#togglemute img").attr("src");
    
    if (symbol === "Symbole/volume.png") {
      volumer.val(0).trigger("change");
      $("#togglemute img").attr("src","Symbole/mute.png");
    } else {
      volumer.val(1).trigger("change");
      $("#togglemute img").attr("src","Symbole/volume.png");
    }
  });

  var fxBtn = $("<button class='toolbuttons'>FX</button>");
  fxBtn.css({
    "background": "#002900",
    "border-color": "#002900"
    });

  fxBtn.appendTo(toolbar);
  
  var settingBtn = $("<button class='toolbuttons' style='background:#2d0000; border-color:#2d0000;'><img src='Symbole/settings.png' style='width:16px; height: 16px; filter:invert(100%);'></button>");
  settingBtn.appendTo(toolbar);
      
  var fullScreen = $("<button class='toolbuttons' id='toggleFull'><img src='Symbole/fullscreen.png' style='width:16px; height: 16px;'></button>");
  fullScreen.appendTo(toolbar);
  
  pitchers.on("mouseenter", function() {
    showTitle("Pitchrate");
  });
  
  pitchers.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  });
  
  pitchers.on("mouseleave", function() {
    infoBox.hide(60);
  });
  
  volumeBox.on("mouseenter", function() {
    showTitle("Volume");
  });
  
  volumeBox.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  });
  
  volumeBox.on("mouseleave", function() {
    infoBox.hide(60);
  });
  
  toggleVolume.on("mouseenter", function() {
    showTitle("Volume on/off");
  });
  
  toggleVolume.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  });
  
  toggleVolume.on("mouseleave", function() {
    infoBox.hide(60);
  });
  
  var settingsMod = $("<div/>");
  settingsMod.css({
    "width": this.width(),
    "height": "530px",
    "background": "rgba(15, 15, 15, 0.8)",
    "position": "absolute",
    "left": tbPos.left,
    "top": tbPos.top,
    "display": "none",
    "z-index": "120"
  });
  
  settingsMod.appendTo(this);
  
  var settingsHead = $("<div/>");
  settingsHead.css({
    "width": "100%",
    "height": "40px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "left"
  }).text("Video-Settings");
  
  settingsHead.appendTo(settingsMod);
  
  var closeBtn = $("<button class='closeBtn'>X</button>");
  closeBtn.appendTo(settingsHead);
  
  settingBtn.on("click", function() {
    settingsMod.show();
  });
  
  closeBtn.on("click", function() {
    settingsMod.hide();
  });
  
  var settingsArea = $("<div/>");
  settingsArea.css({
    "width": "100%",
    "height": "60px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  });
  
  settingsArea.appendTo(settingsMod);
  
  var settTxt1 = $("<div/>");
  
  settTxt1.css({
    "width": "210px",
    "height": "60px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  }).text("Screen-Ratio:");
  
  settTxt1.appendTo(settingsArea);
  
  var ratioSelect = $("<select><option value='0'>Standard</option><option value='1'>4:3 (480p)</option><option value='2'>4:3 (360p)</option><option value='3'>3:2</option><option value='4'>WideScreen</option></select>");
  
  ratioSelect.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  });
  
  ratioSelect.appendTo(settingsArea);
  
  var settTxt2 = $("<div/>");
  
  settTxt2.css({
    "width": "210px",
    "height": "60px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  }).text("Video-Width:");
  
  settTxt2.appendTo(settingsArea);
  
  var vidWidth = $("<input type='number'/>");
  
  vidWidth.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  }).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  });
  
  vidWidth.appendTo(settingsArea);
  
  var settTxt3 = $("<div/>");
  
  settTxt3.css({
    "width": "210px",
    "height": "60px",
    "font-size": "20px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right"
  }).text("Video-Height:");
  
  settTxt3.appendTo(settingsArea);
  
  var vidHeight = $("<input type='number'/>");
  
  vidHeight.css({
    "background": "#151515",
    "width": "160px",
    "height": "25px",
    "font-size": "16px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "right",
    "margin-left": "12px",
    "border-radius": "6px"
  }).attr({
    "max": 2,
    "min": -2,
    "value": 1,
    "step": 0.01
  });
  
  vidHeight.appendTo(settingsArea);
  
  ratioSelect.on("change", function() {
    var radSel = $(this).val();
    var fscControl = fullScreen.attr("style");
    
    if (radSel === "0") {
      vidWidth.val(1);
      vidHeight.val(1);
    } else if (radSel === "1") {
      vidWidth.val(1.41);
      vidHeight.val(1);
    } else if (radSel === "2") {
      vidWidth.val(1.41);
      vidHeight.val(1.21);
    } else if (radSel === "3") {
      vidWidth.val(1.21);
      vidHeight.val(1);
    } else if (radSel === "4") {
      vidWidth.val(1);
      vidHeight.val(1.1);
    }
    
    if (fscControl) {
      vidWidth.trigger("change");
      vidHeight.trigger("change");
    }
  });
  
  vidWidth.on("change", function() {
    var scaleWidth = $(this).val();
    var scaleHeight = vidHeight.val();
    var fscControl = fullScreen.attr("style");
    
    if (fscControl) {
      video.css("transform", "scale("+scaleWidth+", "+scaleHeight+")");
    }
  });
  
  vidHeight.on("change", function() {
    var scaleWidth = vidWidth.val();
    var scaleHeight = $(this).val();
    var fscControl = fullScreen.attr("style");
    
    if (fscControl) {
      video.css("transform", "scale("+scaleWidth+", "+scaleHeight+")");
    }
  });
    
    var playlistHead = $("<div/>");
  	playlistHead.css({
    "width": "100%",
    "height": "30px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center"
  	}).text("Player-Mode");
    
    var playerMode = $("<div/>");
    playerMode.css({
    "width": "100%",
    "height": "80px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "flex",
    "vertical-direction": "row"
  });
    
    playlistHead.appendTo(settingsMod);
    playerMode.appendTo(settingsMod);
    
    var mode1 = $("<input type='radio' id='mode1' name='pMod' style='display:none;' checked/>");
    mode1.appendTo(playerMode);
    var label1 = $("<label for='mode1'>Standard-Mode</label>");
    label1.css({
      "background": "linear-gradient(to right, navy, skyblue, navy)",
      "border": "4px inset skyblue",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label1.appendTo(playerMode);
    
    var mode2 = $("<input type='radio' id='mode2' name='pMod' style='display:none;'/>");
    mode2.appendTo(playerMode);
    var label2 = $("<label for='mode2'>Playlist-Mode</label>");
    label2.css({
      "background": "#000029",
      "border": "4px outset #000029",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label2.appendTo(playerMode);
    
    var mode3 = $("<input type='radio' id='mode3' name='pMod' style='display:none;'/>");
    mode3.appendTo(playerMode);
    var label3 = $("<label for='mode3'>Loop-Mode</label>");
    label3.css({
      "background": "#000029",
      "border": "4px outset #000029",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label3.appendTo(playerMode);
    
    video.on("playing", function() {
      $("#playBtn").css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      }).html("||");
    });
        
    var currentVideo = 0;
        
    var playlistHead2 = $("<div/>");
  	playlistHead2.css({
    "width": "100%",
    "height": "30px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "display": "none"
  	}).text("Playlist-Mode");
    
    var playlistMode = $("<div/>");
    playlistMode.css({
    "width": "100%",
    "height": "80px",
    "font-size": "25px",
    "font-weight": "bold",
    "color": "white",
    "text-align": "center",
    "padding": "16px",
    "display": "none",
    "vertical-direction": "row"
  });
    
    playlistHead2.appendTo(settingsMod);
    playlistMode.appendTo(settingsMod);
    
    mode1.on("change", function() {
      var plMode1 = $(this);
      
      if (plMode1.is(":checked")) {
        label1.css({
          "background": "linear-gradient(to right, navy, skyblue, navy)",
          "border-style": "inset",
          "border-color": "skyblue"
        });
        
        label2.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        label3.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        playlistHead2.hide();
        playlistMode.hide();
		video.removeAttr("autoplay").removeAttr("loop");
        skiprewBtn.hide();
        skipforwBtn.hide();
        infoBox.css("width", "150px");
      }
    });
    
    mode2.on("change", function() {
      var plMode2 = $(this);
      
      if (plMode2.is(":checked")) {
        label2.css({
          "background": "linear-gradient(to right, navy, skyblue, navy)",
          "border-style": "inset",
          "border-color": "skyblue"
        });
        
        label1.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        label3.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        playlistHead2.show();
        playlistMode.show().css("display", "flex");
		video.removeAttr("loop");
        skiprewBtn.show();
        skipforwBtn.show();
      }
    });
    
    mode3.on("change", function() {
      var plMode3 = $(this);
      
      if (plMode3.is(":checked")) {
        label3.css({
          "background": "linear-gradient(to right, navy, skyblue, navy)",
          "border-style": "inset",
          "border-color": "skyblue"
        });
        
        label1.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        label2.css({
          "background": "#000029",
          "border-style": "outset",
          "border-color": "#000029"
        });
        
        playlistHead2.hide();
        playlistMode.hide();
        skiprewBtn.hide();
        skipforwBtn.hide();
        infoBox.css("width", "150px");
      }
    });
    
    var mode11 = $("<input type='radio' id='mode11' name='pMod2' style='display:none;' checked/>");
    mode11.appendTo(playlistMode);
    var label11 = $("<label for='mode11'>Forward</label>");
    label11.css({
      "background": "linear-gradient(to right, green, lime, green)",
      "border": "4px inset lime",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label11.appendTo(playlistMode);
    
    var mode12 = $("<input type='radio' id='mode12' name='pMod2' style='display:none;'/>");
    mode12.appendTo(playlistMode);
    var label12 = $("<label for='mode12'>Reverse</label>");
    label12.css({
      "background": "#002500",
      "border": "4px outset #002500",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label12.appendTo(playlistMode);
    
    var mode13 = $("<input type='radio' id='mode13' name='pMod2' style='display:none;'/>");
    mode13.appendTo(playlistMode);
    var label13 = $("<label for='mode13'>Random</label>");
    label13.css({
      "background": "#002500",
      "border": "4px outset #002500",
      "border-radius": "6px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "width": "350px",
      "height": "35px",
      "margin-left": "16px",
      "padding": "4px"
    });
    label13.appendTo(playlistMode);
    
    mode11.on("change", function() {
      var plMode11 = $(this);
      
      if (plMode11.is(":checked")) {
        label11.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        label12.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        label13.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    mode12.on("change", function() {
      var plMode12 = $(this);
      
      if (plMode12.is(":checked")) {
        label12.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        label11.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        label13.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    mode13.on("change", function() {
      var plMode13 = $(this);
      
      if (plMode13.is(":checked")) {
        label13.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
        
        label11.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
        
        label12.css({
          "background": "#002500",
          "border-style": "outset",
          "border-color": "#002500"
        });
      }
    });
    
    function vidForward() {
      var pitchRate = pitchers.val();
      currentVideo++;
      if (currentVideo == settings.movies.length) {
        currentVideo = 0;
      }
      
      video.attr("src", settings.path+settings.movies[currentVideo]+settings.extension);
      miniPlayer.attr("src", settings.path+settings.movies[currentVideo]+settings.extension);
      video.prop("playbackRate", pitchRate);
    }
    
    function vidReverse() {
      var pitchRate = pitchers.val();
      currentVideo--;
      if (currentVideo == -1) {
        currentVideo = settings.movies.length - 1;
      }
      
      video.attr("src", settings.path+settings.movies[currentVideo]+settings.extension);
      miniPlayer.attr("src", settings.path+settings.movies[currentVideo]+settings.extension);
      video.prop("playbackRate", pitchRate);
    }
    
    var random;
    
    function setRandom() {
      random = [];
      
      for (var i=0; i<settings.movies.length; i++) {
        random.push(settings.movies[i]);
      }
      
    }
    
    setRandom();
    
    function playRandom() {
      var pitchRate = pitchers.val();
      var randSize = random.length;
      var randNumber = Math.floor(Math.random()*randSize);
      video.attr("src", settings.path+random[randNumber]+settings.extension);
      miniPlayer.attr("src", settings.path+random[randNumber]+settings.extension);
      video.prop("playbackRate", pitchRate);
      currentVideo = randNumber;
      random.splice(randNumber,1);
      
      if (randSize < 2) {
        setRandom();
      }
    }
    
    video.on("ended", function() {
      if (mode2.is(":checked")) {
        video.attr({"autoplay":true, "loop":false});
        if (mode11.is(":checked")) {
          vidForward();
        } else if (mode12.is(":checked")) {
          vidReverse();
        } else if (mode13.is(":checked")) {
          playRandom();
        }
      } else if (mode3.is(":checked")) {
        video.attr({"autoplay":true, "loop":true});
      } else if (mode1.is(":checked")) {
        video.removeAttr("autoplay").removeAttr("loop");
      }
    });
    
  skiprewBtn.on("mouseenter", function() {
    if (mode13.is(":checked")) {
      infoBox.css("width", "250px");
      showTitle("Random-Mode Active!");
    } else {
      showTitle("Video Reverse");
      infoBox.css("width", "150px");
    }
  });
  
  skipforwBtn.on("mouseenter", function() {
    if (mode13.is(":checked")) {
      infoBox.css("width", "250px");
      showTitle("Random-Mode Active!");
    } else {
      showTitle("Video Forward");
      infoBox.css("width", "150px");
    }
  });
  
  skiprewBtn.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  skipforwBtn.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(100);
  });
  
  skiprewBtn.on("mouseleave", function() {
    infoBox.hide(50);
    infoBox.css("width", "150px");
  });
  
  skipforwBtn.on("mouseleave", function() {
    infoBox.hide(50);
    infoBox.css("width", "150px");
  });
    
  skiprewBtn.on("click", function() {
    if (mode13.is(":checked")) {
      playRandom();
    } else {
      vidReverse();
    }
  });
    
    skipforwBtn.on("click", function() {
    if (mode13.is(":checked")) {
      playRandom();
    } else {
      vidForward();
    }
  });
  
  function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
  
    fullScreen.on("click", function() {
      var scH = window.screen.availHeight;
      var scaleWidth = vidWidth.val();
      var scaleHeight = vidHeight.val();
      var fscControl = $(this).attr("style");
      toggleFullScreen();
      
      if (!fscControl) {
        video.addClass("fullScreen");
      	toolbar.css({"width":"100%", "left":0,}).animate({top: scH},10);
        timeTools.css("width","80%");
        $("body").css("overflow","hidden");
        video.css("transform", "scale("+scaleWidth+", "+scaleHeight+")");
        $(this).css({"background":"linear-gradient(to right, navy, skyblue, navy)", "border-style":"inset", "border-color":"skyblue"});
      } else {
        video.removeClass("fullScreen");
        toolbar.css({"width":video.width(), "top":tbY - 57, "left":tbPos.left});
        $("body").css("overflow","auto");
        timeTools.css("width","60%");
        video.css("transform", "scale(1,1)");
        $(this).removeAttr("style");
      }
    });
  
  fullScreen.on("mouseenter", function() {
    showTitle("Fullscreen");
  });
  
  fullScreen.on("mousemove", function(e) {
    var xPos = e.pageX;
    var yPos = e.pageY;
    var infoWidth = infoBox.width();
    var infoPos = infoWidth/2;
    
    infoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show(60);
  });
  
  fullScreen.on("mouseleave", function() {
    infoBox.hide(60);
  });
    
    var conMenu = $("<div id='menu'></div>");
    
    conMenu.css({
      "width": "300px",
      "background": "rgba(21, 21, 21, 0.8)",
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "z-index": 100,
      "border": "2px outset #303030",
      "display": "none"
    });
    
    conMenu.appendTo(this);
    
    var menuList = $("<ul/>");
    menuList.css({
      "margin": "1px",
      "padding": "1px",
      "list-style": "none",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
    });
    
    menuList.appendTo(conMenu);
    
    var listPoint1 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>&#9654;/|| Play/Pause</li>");
    listPoint1.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint1.appendTo(menuList);
    
    var listPoint2 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Toggle Mute</li>");
    listPoint2.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint2.appendTo(menuList);
    
    var listPoint3 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Standard-Mode</li>");
    listPoint3.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint3.appendTo(menuList);
    
    var listPoint4 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Playlist-Mode</li>");
    listPoint4.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint4.appendTo(menuList);
    
    var listPoint5 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Loop-Mode</li>");
    listPoint5.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint5.appendTo(menuList);
    
    var listPoint6 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>|&laquo; Video Reverse</li>");
    listPoint6.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer",
      "display": "none"
    });
    
    listPoint6.appendTo(menuList);
    
    var listPoint7 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>&raquo;| Video Forward</li>");
    listPoint7.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer",
      "display": "none"
    });
    
    listPoint7.appendTo(menuList);
    
    var listPoint8 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Settings...</li>");
    listPoint8.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint8.appendTo(menuList);
    
    var listPoint9 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Toggle Fullscreen</li>");
    listPoint9.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    listPoint9.appendTo(menuList);
    
    video.on("click", function() {
      $("#playBtn").click();
      conMenu.hide();
    });
    
    video.on("contextmenu", function(e) {
      var scW = window.screen.availWidth;
      var scH = window.screen.availHeight;
      var menuX = e.pageX;
      var menuY = e.pageY;
      var menSizeX = conMenu.width();
      var menSizeY = conMenu.height();
      var menuPoxX = menuX + menSizeX;
      var menuPosY = menuY + menSizeY;
      
      if (menuPoxX > scW && menuPosY < scH) {
        conMenu.animate({left: menuX - menSizeX, top: menuY},6).show();
      } else if (menuPosY > scH && menuPoxX < scW) {
        conMenu.animate({left: menuX, top: menuY - menSizeY},6).show();
      } else if (menuPosY > scH && menuPoxX > scW) {
        conMenu.animate({left: menuX - menSizeX, top: menuY - menSizeY},6).show();
      } else {
        conMenu.animate({left: menuX, top: menuY},6).show();
      }
      
      e.preventDefault();
    });
    
    listPoint1.on("click", function() {
      $("#playBtn").click();
      conMenu.hide();
    });
    
    listPoint2.on("click", function() {
      toggleVolume.click();
      conMenu.hide();
    });
    
    listPoint3.on("click", function() {
      listPoint6.hide();
      listPoint7.hide();
      mode1.trigger("click");
      listPoint4.show();
      conMenu.hide();
    });
    
    listPoint4.on("click", function() {
      listPoint6.show();
      listPoint7.show();
      mode2.trigger("click");
      listPoint4.hide();
      conMenu.hide();
    });
    
    listPoint5.on("click", function() {
      listPoint6.hide();
      listPoint7.hide();
      mode3.trigger("click");
      listPoint4.show();
      conMenu.hide();
    });
    
    listPoint6.on("click", function() {
      vidReverse();
      conMenu.hide();
    });
    
    listPoint7.on("click", function() {
      vidForward();
      conMenu.hide();
    });
    
    listPoint8.on("click", function() {
      settingBtn.click();
      conMenu.hide();
    });
    
    listPoint9.on("click", function() {
      fullScreen.click();
      conMenu.hide();
    });
    
    $("#pauseBtn").on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    $("#pauseBtn").on("mouseup", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    rewBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    rewBtn.on("mouseup", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    forwBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    forwBtn.on("mouseup", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    toggleVolume.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    toggleVolume.on("mouseup", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    settingBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "red"
      });
    });
    
    settingBtn.on("mouseup", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "#290000"
      });
    });
    
    skiprewBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, #5b5d00, yellow, #5b5d00)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    skiprewBtn.on("mouseup", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    skipforwBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, #5b5d00, yellow, #5b5d00)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    skipforwBtn.on("mouseup", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });

    var closeMenu;

    conMenu.on("mouseenter", function() {
	clearTimeout(closeMenu);
    });

    conMenu.on("mouseleave", function() {
	closeMenu = setTimeout(function() {
	   conMenu.hide();
	},2000);	
    });

    toolbar.on("mouseenter", function() {
	clearTimeout(showTool);
    });
    
    var movieMenu = $("<div/>");
    movieMenu.css({
      "width": "450px",
      "max-height": "350px",
      "background": "rgba(30, 30, 30, 0.6)",
      "position": "absolute",
      "display": "none",
      "overflow": "auto",
      "z-index": 1000
    });
    
    movieMenu.appendTo(this);
    
    var movieList = $("<ul id='movieItem'></ul>");
    movieList.css({
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "margin": "1px",
      "padding": "1px",
      "list-style": "none",
      "text-align": "left"
    });
    
    movieList.appendTo(movieMenu);
    
    var addMovies = [];
    for (var j=0; j<settings.movies.length; j++) {
      addMovies.push("<li style='border-bottom: 1px solid rgba(250, 250, 250, 0.6); padding-top:12px; padding-bottom:12px; cursor:pointer;'>"+settings.movies[j]+"</li>");
    }
    
    movieList.html(addMovies.join(""));
    
    skiprewBtn.on("contextmenu", function(e) {
      var moviePosX = e.pageX - movieMenu.width()/2;
      var moviePosY = e.pageY - movieMenu.height() - toolbar.height() - 12;
      
      movieMenu.animate({left: moviePosX, top: moviePosY},1).show();
      e.preventDefault();
    });
    
    skipforwBtn.on("contextmenu", function(e) {
      var moviePosX = e.pageX - movieMenu.width()/2;
      var moviePosY = e.pageY - movieMenu.height() - toolbar.height() - 12;
      
      movieMenu.animate({left: moviePosX, top: moviePosY},1).show();
      e.preventDefault();
    });
    
    $("#movieItem li").on("click", function() {
      var movieNumber = $(this).index();
      var movieCont = $(this).text();
      var pitchRate = pitchers.val();
      
      video.attr("src", settings.path+movieCont+settings.extension);
      miniPlayer.attr("src", settings.path+movieCont+settings.extension);
      video.prop("playbackRate", pitchRate);
      currentVideo = movieNumber;
      movieMenu.hide();
    });
    
    $("#movieItem li").on("mouseenter", function() {
      $(this).css("background", "#00baff");
    });
    
    $("#movieItem li").on("mouseleave", function() {
      $(this).css("background", "none");
    });
    
    $("#movieItem li").on("contextmenu", function(e) {
      $(this).click();
      e.preventDefault();
    });
    
    var closeMovieMenu;

    movieMenu.on("mouseenter", function() {
	clearTimeout(closeMovieMenu);
    });

    movieMenu.on("mouseleave", function() {
	closeMovieMenu = setTimeout(function() {
	   movieMenu.hide();
	},1000);	
    });

    var customPitch = $("<div/>");
    customPitch.css({
      "width": "200px",
      "height": "90px",
      "background": "rgba(30, 30, 30, 0.6)",
      "border": "4px outset rgba(250, 250, 250, 0.6)",
      "padding": "10px",
      "text-align": "center",
      "position": "absolute",
      "display": "none",
      "z-index": 1000
    });
    
    customPitch.appendTo(this);
    
    var pitchRangeArea = $("<div/>");
    pitchRangeArea.css({
      "width": "100%",
      "height": "30px",
      "padding": "12px",
      "text-align": "center"
    });
    
    pitchRangeArea.appendTo(customPitch);
    
    var pitchRange = $("<input type='range' style='width:80%;' min='0.25' max='4' step='0.01' value='1'/>");
    pitchRange.appendTo(pitchRangeArea);
    
    var pitchRangeVal = $("<div/>");
    pitchRangeVal.css({
      "width": "100%",
      "height": "40px",
      "padding": "6px",
      "text-align": "center",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white"
    }).text("Pitchrate: " + pitchRange.attr("value"));
    
    pitchRangeVal.appendTo(customPitch);
    
    pitchers.on("contextmenu", function(e) {
      var pitchX = e.pageX - customPitch.width()/2;
      var pitchY = e.pageY - toolbar.height() - customPitch.height() - 6;
      customPitch.animate({left: pitchX, top: pitchY},1).show();
      e.preventDefault();
    });
    
    pitchRange.on("change", function() {
      var rangeVal = $(this).val();
      video.prop("playbackRate", rangeVal);
      pitchRangeVal.text("Pitchrate: " + rangeVal);
    });
    
    pitchRange.on("mousemove", function() {
      $(this).trigger("change");
    });
    
    var closePitch;

    customPitch.on("mouseenter", function() {
	clearTimeout(closePitch);
    });

    customPitch.on("mouseleave", function() {
	closePitch = setTimeout(function() {
	   customPitch.hide();
	},1600);	
    });

    var fxHead = $("<div/>");
    fxHead.css({
      "width": "100%",
      "height": "40px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center"
    }).text("FX-Settings");
    
    fxHead.appendTo(settingsMod);
    
    var fxArea = $("<div/>");
    
    fxArea.css({
      "width": "100%",
      "height": "60px",
      "font-size": "25px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "16px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    fxArea.appendTo(settingsMod);
    
    var fxTxt1 = $("<div/>");
    fxTxt1.css({
      "width": "39%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "left",
      "margin-left": "6px",
      "margin-right": "6px",
      "padding-top": "12px"
    }).text("FX-Path: ");
    
    fxTxt1.appendTo(fxArea);
    
    var fxPath = $("<input type='text' value='file:///C:/Users/sonvt/Music/'/>");
    fxPath.css({
      "width": "300px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px"
    });
    
    fxPath.appendTo(fxTxt1);
    
    var fxTxt2 = $("<div/>");
    fxTxt2.css({
      "width": "30%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "left",
      "margin-left": "6px",
      "margin-right": "6px",
      "padding-top": "12px"
    }).text("FX-Volume: ");
    
    fxTxt2.appendTo(fxArea);
    
    var fxVolume = $("<input type='range' value=1 max=1 min=0 step=0.01>");
    fxVolume.css({
      "width": "150px",
      "margin-right": "12px"
    });
    
    fxVolume.appendTo(fxTxt2);
    
    var fxTxt3 = $("<div/>");
    fxTxt3.css({
      "width": "30%",
      "height": "28px",
      "font-size": "22px",
      "text-align": "left",
      "margin-left": "6px",
      "margin-right": "6px",
      "padding-top": "12px"
    }).text("FX-Pitch: ");
    
    fxTxt3.appendTo(fxArea);
    
    var fxPitch = $("<input type='range' value=1 max=4 min=0.25 step=0.01>");
    fxPitch.css({
      "width": "150px",
      "margin-right": "12px"
    });
    
    fxPitch.appendTo(fxTxt3);
    
    var fxPlayer = $("<audio/>");
    fxPlayer.css({
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "display": "none"
    }).prop("preservesPitch",false);
    
    fxPlayer.appendTo(this);

    var fxVolVal = $("<input type='text'/>");
    fxVolVal.css({
      "width": "60px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px",
      "margin-bottom": "12px"
    });
    
    fxVolVal.appendTo(fxTxt2);
    
    var fxPitchVal = $("<input type='text'/>");
    fxPitchVal.css({
      "width": "60px",
      "height": "20px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "background": "#151515",
      "border-radius": "6px",
      "margin-bottom": "12px"
    });
    
    fxPitchVal.appendTo(fxTxt3);

    var addFxFile = $("<input type='file' style='display: none;'>");
    addFxFile.appendTo(fxTxt1);
    
    var addFxBtn = $("<button class='toolbuttons'>+</button>");
    addFxBtn.appendTo(fxTxt1);

    var fxMenu = $("<div/>");
    fxMenu.css({
      "width": "180px",
      "max-height": "450px",
      "background": "rgba(30, 30, 30, 0.6)",
      "position": "absolute",
      "display": "none",
      "overflow": "auto",
      "z-index": 1000
    });
    
    fxMenu.appendTo(this);
    
    var fxList = $("<ul id='fxItem'></ul>");
    fxList.css({
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "margin": "1px",
      "padding": "1px",
      "list-style": "none",
      "text-align": "left"
    });
    
    fxList.appendTo(fxMenu);
    
    var addFxSounds = [];
    for (var k=0; k<settings.fxSounds.length; k++) {
      addFxSounds.push("<li style='border-bottom: 1px solid rgba(250, 250, 250, 0.6); padding-top:9px; padding-bottom:9px; cursor:pointer;'>"+settings.fxSounds[k]+"</li>");
    }
    
    fxList.html(addFxSounds.join(""));
    
    fxBtn.on("contextmenu", function(e) {
      var fxPosX = e.pageX - fxMenu.width()/2;
      var fxPosY = e.pageY - fxMenu.height() - toolbar.height() - 12;
      
      fxMenu.animate({left: fxPosX, top: fxPosY},1).show();
      e.preventDefault();
    });

    $("#fxItem li").on("mouseenter", function() {
      $(this).css("background", "#00baff");
    });
    
    $("#fxItem li").on("mouseleave", function() {
      $(this).css("background", "none");
    });
    
    $("#fxItem li").on("contextmenu", function(e) {
      $(this).click();
      e.preventDefault();
    });
    
    var closeFxMenu;

    fxMenu.on("mouseenter", function() {
	clearTimeout(closeFxMenu);
    });

    fxMenu.on("mouseleave", function() {
	closeFxMenu = setTimeout(function() {
	   fxMenu.hide();
	},1600);	
    });

    $("#fxItem li").on("click", function() {
      var fxCont = $(this).text();
      var fxLoc = fxPath.val();
      var fxpitchRate = fxPitch.val();
      
      fxPlayer.attr("src", fxLoc+fxCont);
      fxPlayer.prop("playbackRate", fxpitchRate);
      fxMenu.hide();
    });

    fxBtn.on("click", function() {
      var fxpitchRate = fxPitch.val();
      fxPlayer.prop("playbackRate", fxpitchRate);
      fxPlayer.trigger("play");
    });

    addFxBtn.on("click", function() {
      addFxFile.click();
    });
    
    addFxFile.on("change", function(evt) {
      var fxFile = evt.currentTarget.files[0];
      fxList.append("<li style='border-bottom: 1px solid rgba(250, 250, 250, 0.6); padding-top:9px; padding-bottom:9px; cursor:pointer;'>"+fxFile.name+"</li>");
      
      $("#fxItem li").on("click", function() {
      var fxCont = $(this).text();
      var fxLoc = fxPath.val();
      var fxpitchRate = fxPitch.val();
      
      fxPlayer.attr("src", fxLoc+fxCont);
      fxPlayer.prop("playbackRate", fxpitchRate);
      fxMenu.hide();
    	});

      $("#fxItem li").on("mouseenter", function() {
      $(this).css("background", "#00baff");
        });
    
      $("#fxItem li").on("mouseleave", function() {
      $(this).css("background", "none");
        });
    
      $("#fxItem li").on("contextmenu", function(e) {
      $(this).click();
      e.preventDefault();
        });
    });

    fxVolume.on("change", function() {
      var fxVolumeVal = $(this).val();
      fxVolVal.val(fxVolumeVal);
      fxPlayer.prop("volume", fxVolumeVal);
        });
    
    fxVolume.on("mousemove", function() {
      $(this).trigger("change");
        });
    
    fxPitch.on("change", function() {
      var fxpitchRate = fxPitch.val();
      fxPitchVal.val(fxpitchRate);
      fxPlayer.prop("playbackRate", fxpitchRate);
        });
    
    fxPitch.on("mousemove", function() {
      $(this).trigger("change");
        });

    pitchRange.on("contextmenu", function(e) {
      $(this).val(1);
      e.preventDefault();
      $(this).trigger("change");
    });
    
    fxPitch.on("contextmenu", function(e) {
      $(this).val(1);
      e.preventDefault();
      $(this).trigger("change");
    });

    fxBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    fxBtn.on("mouseup", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    addFxBtn.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    addFxBtn.on("mouseup", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });

    var vidInfoMod = $("<div/>");
    vidInfoMod.css({
      "width": "400px",
      "background": "rgba(30, 30, 30, 0.6)",
      "display": "none",
      "position": "absolute",
      "left": tbPos.left,
      "top": tbPos.top,
      "z-index": 1000
    });
    
    vidInfoMod.appendTo(this);
    
    var vidInfoHead = $("<div/>");
    vidInfoHead.css({
      "width": "400px",
      "height": "30px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "text-align": "left"
    }).html("Video-Info");
    
    vidInfoHead.appendTo(vidInfoMod);
    
    var closeInfoBtn = $("<button class='closeBtn'>X</button>");
  	closeInfoBtn.appendTo(vidInfoHead);
    
    var listPoint10 = $("<li>Show Video-Infos</li>");
    listPoint10.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    listPoint10.appendTo(menuList);
    
    var vidInfoMain1 = $("<div/>");
    vidInfoMain1.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain1.appendTo(vidInfoMod);
    
    var vidInfoTxt1 = $("<div/>");
    vidInfoTxt1.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videoname:");
    
    vidInfoTxt1.appendTo(vidInfoMain1);
    
    var vidInfoItem1 = $("<div/>");
    vidInfoItem1.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem1.appendTo(vidInfoMain1);
    
    var vidInfoMain2 = $("<div/>");
    vidInfoMain2.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain2.appendTo(vidInfoMod);
    
    var vidInfoTxt2 = $("<div/>");
    vidInfoTxt2.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videonumber:");
    
    vidInfoTxt2.appendTo(vidInfoMain2);
    
    var vidInfoItem2 = $("<div/>");
    vidInfoItem2.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem2.appendTo(vidInfoMain2);
    
    var vidInfoMain3 = $("<div/>");
    vidInfoMain3.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain3.appendTo(vidInfoMod);
    
    var vidInfoTxt3 = $("<div/>");
    vidInfoTxt3.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videoduration:");
    
    vidInfoTxt3.appendTo(vidInfoMain3);
    
    var vidInfoItem3 = $("<div/>");
    vidInfoItem3.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem3.appendTo(vidInfoMain3);
    
    var vidInfoMain4 = $("<div/>");
    vidInfoMain4.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain4.appendTo(vidInfoMod);
    
    var vidInfoTxt4 = $("<div/>");
    vidInfoTxt4.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videoresulotion:");
    
    vidInfoTxt4.appendTo(vidInfoMain4);
    
    var vidInfoItem4 = $("<div/>");
    vidInfoItem4.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem4.appendTo(vidInfoMain4);
    
    var vidInfoMain5 = $("<div/>");
    vidInfoMain5.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain5.appendTo(vidInfoMod);
    
    var vidInfoTxt5 = $("<div/>");
    vidInfoTxt5.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videovolume:");
    
    vidInfoTxt5.appendTo(vidInfoMain5);
    
    var vidInfoItem5 = $("<div/>");
    vidInfoItem5.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem5.appendTo(vidInfoMain5);
    
    var vidInfoMain6 = $("<div/>");
    vidInfoMain6.css({
      "width": "400px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    vidInfoMain6.appendTo(vidInfoMod);
    
    var vidInfoTxt6 = $("<div/>");
    vidInfoTxt6.css({
      "width": "140px",
      "text-align": "left"
    }).text("Videopitch:");
    
    vidInfoTxt6.appendTo(vidInfoMain6);
    
    var vidInfoItem6 = $("<div/>");
    vidInfoItem6.css({
      "width": "240px",
      "text-align": "left"
    });
    
    vidInfoItem6.appendTo(vidInfoMain6);

    function setVidInfos() {
      var vidSrc = video.attr("src");
      var vidVol = video.prop("volume");
      var vidPlayRate = video.prop("playbackRate");
      var resoluteX = video.prop("videoWidth");
      var resoluteY = video.prop("videoHeight");
      var total = video.prop("duration");
      
      var infoHour = parseInt(total/3600);
      var infoMin = parseInt(total/60 % 60);
      var infoSec = parseInt(total % 60);
      
      infoMin = (infoMin<10 ? "0"+infoMin : infoMin);
      infoSec = (infoSec<10 ? "0"+infoSec : infoSec);
      
      vidInfoItem1.text(vidSrc.substring(vidSrc.lastIndexOf("/") + 1, vidSrc.lastIndexOf(".")));
      
      if (mode2.is(":checked")) {
        vidInfoItem2.text(currentVideo);
      } else {
        vidInfoItem2.text("No Playlist-Mode!");
      }
      
      vidInfoItem3.text(infoHour + ":" + infoMin + ":" + infoSec);
      vidInfoItem4.text(resoluteX + " x " + resoluteY);
      vidInfoItem5.text(vidVol*100 + "%");
      vidInfoItem6.text(vidPlayRate);
    }
    
    listPoint10.on("click", function() {
      var fscControl = fullScreen.attr("style");
      
      if (!fscControl) {
        vidInfoMod.animate({left: video.offset().left, top: video.offset().top},1).show();
      } else {
        vidInfoMod.animate({left: "1px", top: "1px"},1).show();
      }
      
      setVidInfos();
      conMenu.hide();
    });

    $("#menu li").on("mouseenter", function() {
      $(this).css("background","#009aff");
    });
    
    $("#menu li").on("mouseleave", function() {
      $(this).css("background","none");
    });
    
    $("#menu li").on("contextmenu", function(e) {
      $(this).click();
      e.preventDefault();
    });

   closeInfoBtn.on("click", function() {
      vidInfoMod.hide();
    });
      
  return this;
	};
  
}(jQuery));
