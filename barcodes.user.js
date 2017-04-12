// ==UserScript==
// @id             iitc-plugin-barcodes@RoC
// @name           IITC plugin: Replace barcode player names with friendly names on click
// @category       Portal Info
// @version        0.1.0.20170411.0847
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/ResistanceOfColorado/iitc/raw/master/barcodes.user.js
// @downloadURL    https://github.com/ResistanceOfColorado/iitc/raw/master/barcodes.user.js
// @description    Replace player names with more easily remembered names
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.barcodes = function() {};
window.plugin.barcodes.nameMap = {
    "IIllIlIlIIlIIll": "SmurfStalkin",
    "lIIlIllIIIIllIl": "GotMystogan",
    "IlllIIIIIllIlII": "CatWoman25",
    "IllIIIllIIIIlII": "banned-Kratos01",
    "IIlllIllIlIIllI": "banned-play333",
    "lIIllIIllIlIIlI": "soulreaper6mm",
    "IlIIIlIIlIIllll": "m1dnight994",
    "lIIIIIlIIlIIIIl": "akio",
    "llIlIlIIlllIIll": "nothingtheir",
    "IlIIlIllIIIllII": "FiverOhFive",
    "IllIIIIllIlIIll": "LIFS0410",
    "IIIllIllIllIllI": "227ths",
    "lIIllIlllIIIllI": "coldpizzarolls",
    "IlllIIllllIllII": "BK2OI",
    "lIIlllIllIIIIIl": "hammer2709",
    "IlIlIIllIlIllll": "tvvsdad",
    "lIlIIlIllIlIIll": "tvvsmom",
    "IlllIlIIllIlIlI": "ab5543",
    "IIIlIIIlllIIlII": "Heisentoad",
    "IIIllIIIlIIlII":  "coyahooo",
    "0IIIIIII0":       "trulydread",
    "lIllIIllIlIlIII": "banned-tedly",
    "lIllIIIlIlIlIll": "GoingUp",
    "IIlIIIllllIIIll": "DocSarcophagus",
    "lIllIIIlIlllIII": "itbebeth",
    "llIlIIIIIllIIlI": "RarestPepeCzar",
    "IllIlIIIlIlIIlI": "mmhmbeer",
    "IIIllIlIllIIIlI": "queenfire",
    "IIIIlIIllIlIlII": "BriaT",
    "IIlllIIIIlIlIll": "Gakby",
    "llllIIlllIllIII": "Trihga",
    "IllllllIlIllIIl": "OzymandiasOne",
    "IIIIllIIlllIIll": "P3terPan",
    "IIlIlIllIlIlIII": "shadyglen"
};
window.plugin.barcodes.barPatt = new RegExp("^[Il]{15}$");

window.plugin.barcodes.replaceNames = function(data) {
  var barPatt = window.plugin.barcodes.barPatt;
  console.log(this);
  $(".nickname, .pl_nudge_player").each(function(index, value){
    value = $(value);
    var nickname = value.text();
    if (barPatt.test(nickname)) nickname = window.plugin.barcodes.decode(nickname);
    value.text(nickname);
  });
  $(".pl_nudge_player").each(function(index, value){
    value = $(value);
    var nickname = value.text();
    nickname = nickname.substring(1,nickname.length);
    if (barPatt.test(nickname)) nickname = window.plugin.barcodes.decode(nickname);
    value.text("@" + nickname);
  });
};
window.plugin.barcodes.decode = function(barcode) {
  if (barcode in window.plugin.barcodes.nameMap){
    return window.plugin.barcodes.nameMap[barcode];
  }
  else {
    var s = "";
    for (i=0;i<3;i++){
      var b = barcode.slice((5*(i+1))-5,5*(i+1)).replace(/\I/g,'0').replace(/\l/g,'1');
      var d = parseInt(b, 2);
      s += String.fromCharCode(64 + d);
    }
    if (s.length === 3) return s;
    else return barcode;
  }
};

var setup =  function() {
  window.addHook('nicknameClicked', window.plugin.barcodes.replaceNames);
};

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
