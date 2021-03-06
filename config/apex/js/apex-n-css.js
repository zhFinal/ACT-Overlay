$("#overlay") > $("#header-source").css({
  "background": "rgba(28, 32, 35, " + headerOpacity + ")"
});
$("#overlay") > $("#combatant-source").css({
  "background": "rgba(255, 255, 255, " + partyOpacity + ")"
});

if (classColors == true && dpsGradient == true) {
  var gradientTank = "background: linear-gradient(to right, " + classTankOne + ", " + classTankTwo + ")";
  var gradientHealer = "background: linear-gradient(to right, " + classHealerOne + ", " + classHealerTwo + ")";
  var gradientDps = "background: linear-gradient(to right, " + classDpsOne + ", " + classDpsTwo + ")";
  var gradientText = "-webkit-background-clip: text!important; -webkit-text-fill-color: transparent";
  document.getElementById('classColors').innerHTML =
 "#overlay .bar { background: linear-gradient(to right, " + classOne + "," + classTwo + " );}\
  #overlay .dps { background: linear-gradient(to right, " + classOne + "," + classTwo + " );" + gradientText + ";}\
  .job-Pld  .bar, .job-War  .bar, .job-Drk  .bar, .job-Gla  .bar, .job-Mrd  .bar {" + gradientTank + "!important;}\
  .job-Sch  .bar, .job-Ast  .bar, .job-Whm  .bar, .job-Cnj  .bar {" + gradientHealer + "!important;}\
  .job-Drg  .bar, .job-Mnk  .bar, .job-Nin  .bar, .job-Blm  .bar, .job-Brd  .bar, .job-Smn  .bar,\
  .job-Rog  .bar, .job-Thm  .bar, .job-Arc  .bar, .job-Acn  .bar, .job-Pgl  .bar, .job-Lnc  .bar, .job-Mch  .bar, .job-Rdm  .bar, .job-Sam  .bar {" + gradientDps + "!important;}\
  .job-Pld  .dps, .job-War  .dps, .job-Drk  .dps, .job-Gla  .dps, .job-Mrd  .dps {" + gradientTank + "!important; " + gradientText + ";}\
  .job-Sch  .dps, .job-Ast  .dps, .job-Whm  .dps, .job-Cnj  .dps {" + gradientHealer + "!important; " + gradientText + ";}\
  .job-Drg  .dps, .job-Mnk  .dps, .job-Nin  .dps, .job-Blm  .dps, .job-Brd  .dps, .job-Smn  .dps,\
  .job-Rog  .dps, .job-Thm  .dps, .job-Arc  .dps, .job-Acn  .dps, .job-Pgl  .dps, .job-Lnc  .dps, .job-Mch  .dps, .job-Rdm  .dps, .job-Sam  .dps {" + gradientDps + "!important; " + gradientText + ";}\
  .job-Pld  .statdmg, .job-War  .statdmg, .job-Drk  .statdmg, .job-Gla  .statdmg, .job-Mrd  .statdmg { color: " + classTankOne + "!important;}\
  .job-Pld  .statone, .job-War  .statone, .job-Drk  .statone, .job-Gla  .statone, .job-Mrd  .statone { color: " + classTankOne + "!important;}\
  .job-Pld  .stattwo, .job-War  .stattwo, .job-Drk  .stattwo, .job-Gla  .stattwo, .job-Mrd  .stattwo { color: " + classTankTwo + "!important;}\
  .job-Sch  .statdmg, .job-Ast  .statdmg, .job-Whm  .statdmg, .job-Cnj  .statdmg { color: " + classHealerOne + "!important;}\
  .job-Sch  .statone, .job-Ast  .statone, .job-Whm  .statone, .job-Cnj  .statone { color: " + classHealerOne + "!important;}\
  .job-Sch  .stattwo, .job-Ast  .stattwo, .job-Whm  .stattwo, .job-Cnj  .stattwo { color: " + classHealerTwo + "!important;}\
  .job-Drg  .statdmg, .job-Mnk  .statdmg, .job-Nin  .statdmg, .job-Blm  .statdmg, .job-Brd  .statdmg, .job-Smn  .statdmg,\
  .job-Rog  .statdmg, .job-Thm  .statdmg, .job-Arc  .statdmg, .job-Acn  .statdmg, .job-Pgl  .statdmg, .job-Lnc  .statdmg, .job-Mch  .statdmg, .job-Rdm  .statdmg, .job-Sam  .statdmg { color: " + classDpsOne + "!important;}\
  .job-Drg  .statone, .job-Mnk  .statone, .job-Nin  .statone, .job-Blm  .statone, .job-Brd  .statone, .job-Smn  .statone,\
  .job-Rog  .statone, .job-Thm  .statone, .job-Arc  .statone, .job-Acn  .statone, .job-Pgl  .statone, .job-Lnc  .statone, .job-Mch  .statone, .job-Rdm  .statone, .job-Sam  .statone { color: " + classDpsOne + "!important;}\
  .job-Drg  .stattwo, .job-Mnk  .stattwo, .job-Nin  .stattwo, .job-Blm  .stattwo, .job-Brd  .stattwo, .job-Smn  .stattwo,\
  .job-Rog  .stattwo, .job-Thm  .stattwo, .job-Arc  .stattwo, .job-Acn  .stattwo, .job-Pgl  .stattwo, .job-Lnc  .stattwo, .job-Mch  .stattwo, .job-Rdm  .stattwo, .job-Sam  .stattwo { color: " + classDpsTwo + "!important;}\
  .statdmg { color: " + classOne + "!important;} .statone { color: " + classOne + "!important;} .stattwo { color: " + classTwo + "!important;}\
  .encountertime { color: " + classColorOne + "!important;} .maxhit { color: " + classColorTwo + "!important;}";
  
   
} if (classColors == true && dpsGradient == false) {
  var gradientTank = "background: linear-gradient(to right, " + classTankOne + ", " + classTankTwo + ")";
  var gradientHealer = "background: linear-gradient(to right, " + classHealerOne + ", " + classHealerTwo + ")";
  var gradientDps = "background: linear-gradient(to right, " + classDpsOne + ", " + classDpsTwo + ")";
  document.getElementById('classColors').innerHTML =
    "#overlay .bar { background: linear-gradient(to right, " + classOne + "," + classTwo + " );}\
  #overlay .dps { color: " + classDps + "; background: none!important; -webkit-text-fill-color: initial!important;}\
  .job-Pld  .bar, .job-War  .bar, .job-Drk  .bar, .job-Gla  .bar, .job-Mrd  .bar {" + gradientTank + "!important;}\
  .job-Sch  .bar, .job-Ast  .bar, .job-Whm  .bar, .job-Cnj  .bar {" + gradientHealer + "!important;}\
  .job-Drg  .bar, .job-Mnk  .bar, .job-Nin  .bar, .job-Blm  .bar, .job-Brd  .bar, .job-Smn  .bar,\
  .job-Rog  .bar, .job-Thm  .bar, .job-Arc  .bar, .job-Acn  .bar, .job-Pgl  .bar, .job-Lnc  .bar, .job-Mch  .bar, .job-Rdm  .bar, .job-Sam  .bar {" + gradientDps + "!important;}\
  .job-Pld  .dps, .job-War  .dps, .job-Drk  .dps, .job-Gla  .dps, .job-Mrd  .dps { color: " + classTankDps + "!important;}\
  .job-Sch  .dps, .job-Ast  .dps, .job-Whm  .dps, .job-Cnj  .dps { color: " + classHealerDps + "!important;}\
  .job-Drg  .dps, .job-Mnk  .dps, .job-Nin  .dps, .job-Blm  .dps, .job-Brd  .dps, .job-Smn  .dps,\
  .job-Rog  .dps, .job-Thm  .dps, .job-Arc  .dps, .job-Acn  .dps, .job-Pgl  .dps, .job-Lnc  .dps, .job-Mch  .dps, .job-Rdm  .dps, .job-Sam  .dps { color: " + classDpsDps + "!important;}\
  .job-Pld  .statone, .job-War  .statone, .job-Drk  .statone, .job-Gla  .statone, .job-Mrd  .statone { color: " + classTankOne + "!important;}\
  .job-Pld  .stattwo, .job-War  .stattwo, .job-Drk  .stattwo, .job-Gla  .stattwo, .job-Mrd  .stattwo { color: " + classTankTwo + "!important;}\
  .job-Sch  .statone, .job-Ast  .statone, .job-Whm  .statone, .job-Cnj  .statone { color: " + classHealerOne + "!important;}\
  .job-Sch  .stattwo, .job-Ast  .stattwo, .job-Whm  .stattwo, .job-Cnj  .stattwo { color: " + classHealerTwo + "!important;}\
  .job-Drg  .statone, .job-Mnk  .statone, .job-Nin  .statone, .job-Blm  .statone, .job-Brd  .statone, .job-Smn  .statone,\
  .job-Rog  .statone, .job-Thm  .statone, .job-Arc  .statone, .job-Acn  .statone, .job-Pgl  .statone, .job-Lnc  .statone, .job-Mch  .statone, .job-Rdm  .statone, .job-Sam  .statone { color: " + classDpsOne + "!important;}\
  .job-Drg  .stattwo, .job-Mnk  .stattwo, .job-Nin  .stattwo, .job-Blm  .stattwo, .job-Brd  .stattwo, .job-Smn  .stattwo,\
  .job-Rog  .stattwo, .job-Thm  .stattwo, .job-Arc  .stattwo, .job-Acn  .stattwo, .job-Pgl  .stattwo, .job-Lnc  .stattwo, .job-Mch  .stattwo, .job-Rdm  .stattwo, .job-Sam  .stattwo { color: " + classDpsTwo + "!important;}\
  .statone { color: " + classOne + "!important;} .stattwo { color: " + classTwo + "!important;}\
  .encountertime { color: " + classColorOne + "!important;} .maxhit { color: " + classColorTwo + "!important;}";
}if (classColors == false && dpsGradient == false) {
  $("#overlay") > $(".dps").css("color", colorDps);
}if (classColors == false && dpsGradient == true) {
  var gradientText = {
    "background": "linear-gradient(to right, " + colorOne + "," + colorTwo + ")",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  };
  var gradientBar = {
    "background": "linear-gradient(to right, " + colorOne + ", " + colorTwo + ")"
  };
  $("#overlay") > $(".dps").css(gradientText);
  $("#overlay") > $(".heal").css("color", colorOne);
  $("#overlay") > $(".overheal").css("color", colorTwo);
  $("#overlay") > $(".encountertime").css("color", colorOne);
  $("#overlay") > $(".maxhit").css("color", colorTwo);
  $("#overlay") > $(".bar").css({
    gradientBar,
    "background-size": "335px"
  });
};
if (overrideStats == true) {
  $(".statdmg").addClass("override");
  $(".statone").addClass("override");
  $(".stattwo").addClass("override");
  document.getElementById('classColors').innerHTML +=
    ".statdmg.override, .statone.override, .stattwo.override { color: " + overrideColor + "!important;}";
};
