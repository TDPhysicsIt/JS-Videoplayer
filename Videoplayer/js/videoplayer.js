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
    "muted": false
  		}, options);
    
  var video = $("<video/>");
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
  
  var timeTools = $("<table class='timerBox'><tr><td class='time1' id='searchtime'><p id='progtime' class='progtime'></td><td class='time2' id='playtime'>0:00 / 0:00</td></tr></table>");
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
   
    $("#playtime").html(vHour + ":" + vMin + ":" + vSec + " / " + rHour + ":" + rMin + ":" + rSec);
  }
  
  function setProgress() {
    var total = video.prop("duration");
  	var timeStamp = video.prop("currentTime");
    var progress = timeStamp/total*100;
    
    $("#progtime").css("width",progress+"%");
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
    
    video.prop("currentTime",videoPos);
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
    
    $("#progtime").css("height","12px");
    miniPlayer.animate({left: minPlPos+"px", top: minVertPos+"px"},10).prop("currentTime",videoPos).show();
    prevTime.animate({left: prevPos+"px", top: prevVertPos+"px"},10).html(forwPrevHour + ":" + forwPrevMin + ":" + forwPrevSec + " / " + rePrevHour + ":" + rePrevMin + ":" + rePrevSec).show();
  }
  
  $("#searchtime").on("click",moveProgress);
  $("#searchtime").on("mouseenter", showItems);
  $("#searchtime").on("mousemove", showItems);
  
  $("#searchtime").on("mouseleave", function() {
    $("#progtime").css("height","6px");
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
    "height": "100px",
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
      vidWidth.val(1.32);
      vidHeight.val(1);
    } else if (radSel === "2") {
      vidWidth.val(1.32);
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
  
  return this;
	};
  
}(jQuery));