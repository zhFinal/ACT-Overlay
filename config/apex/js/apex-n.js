// *credit*
// used xephero's js as a base for this project as it's what i've been using
// thanks!

$(function() {
  "use strict";

  var rows = 10;
  var rdps_max = 0;


  function JobOrName(combatant) {
    combatant.JobOrName = combatant.Job || combatant.name;
    var egiSearch = combatant.JobOrName.indexOf("-Egi (");
    if (egiSearch != -1) {
      combatant.JobOrName = combatant.JobOrName.substring(0, egiSearch);
    } else if (combatant.JobOrName.indexOf("朝日小仙女 (") == 0) {
      combatant.JobOrName = "Eos";
    } else if (combatant.JobOrName.indexOf("夕月小仙女 (") == 0) {
      combatant.JobOrName = "Selene";
    } else if (combatant.JobOrName.indexOf("迦楼罗之灵 (") != -1) {
      combatant.JobOrName = "Garuda";
    } else if (combatant.JobOrName.indexOf("伊弗利特之灵 (") != -1) {
      combatant.JobOrName = "Ifrit";
         } else if (combatant.JobOrName.indexOf("泰坦之灵 (") != -1) {
      combatant.JobOrName = "Titan";
         } else if (combatant.JobOrName.indexOf("绿宝石兽 (") != -1) {
      combatant.JobOrName = "Emerald";
         } else if (combatant.JobOrName.indexOf("车式浮空炮塔 (") != -1) {
      combatant.JobOrName = "Topaz";
         } else if (combatant.JobOrName.indexOf("Autoturret (") != -1) {
      combatant.JobOrName = "Rook";
         } else if (combatant.JobOrName.indexOf("象式浮空炮塔 (") != -1) {
      combatant.JobOrName = "Bishop";
      } else if (combatant.JobOrName.indexOf("Limit Break (") != -1) {
      combatant.JobOrName = "Limit Break";
    } else if (combatant.JobOrName.indexOf(" (") != -1) {
      combatant.JobOrName = "chocobo";
    }
    return combatant.JobOrName;
  };

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  };

  function update(e) {
    var encounter = e.detail.Encounter;
    var combatants = e.detail.Combatant;
    var htemplate = $('#header-source');
    var template = $('#combatant-source');
    var container = $('#overlay').clone();


    container.html('');

    var rdps = parseFloat(encounter.encdps);
    var names = Object.keys(combatants).slice(0, rows - 1);

    var mharray = [];
    var dmgarray = [];

    for (var i = 0; i < names.length; i++) {
      var combatant = combatants[names[i]];

	  // maxHitDmg might be null or empty, check before performing join
      var maxHitDmg = (combatant.maxhit).match(/\d/g);
	  if(maxHitDmg == null || maxHitDmg == "") {
		continue;
	  }
	  
	  maxHitDmg = maxHitDmg.join("");
	  
      var splitMaxHit = (combatant.maxhit).split("-");
      var maxHitName = splitMaxHit[0];

      if (combatant.name == "Limit Break") {
        continue;
      }
      mharray.splice([i], 0, (combatant.name + "-" + maxHitName + "-" + maxHitDmg));
      dmgarray.splice([i], 0, parseInt(maxHitDmg));

      var maxhitnolb = (mharray[indexOfMax(dmgarray)]);

    };

    // sanity check
    if (!isNaN(rdps) && rdps != Infinity) {
      rdps_max = Math.max(rdps_max, rdps);
    }

    var header = htemplate.clone();
    if (encounter.encdps.length <= 7) {
      header.find('.encounterdps').text(encounter.encdps);
    } else {
      header.find('.encounterdps').text(encounter.ENCDPS);
    }
    header.find('.encountername').text(encounter.title);
    if (ignoreLimitBreak == true) {
      header.find('.maxhit').text(maxhitnolb);
    } else {
      header.find('.maxhit').text(encounter.maxhit);
    };
    header.find('.encountertime').text('Time ' + encounter.duration);

    // set inactive
    if (!e.detail.isActive) {
      rdps_max = 0;
      $('body').addClass('inactive');
    } else {
      $('body').removeClass('inactive');
    }

    container.append(header);

    var limit = Math.max(combatants.length, rows);
    /*var names = Object.keys(combatants).slice(0, rows - 1);*/
    var maxdps = false;


    for (var i = 0; i < names.length; i++) {
      var combatant = combatants[names[i]];
      if (partyLimitBreak == false) {
        if (combatant.name == "Limit Break") {
          continue;
        }
      }
      var row = template.clone();
      var heal = (parseInt(combatant.healed) / parseInt(encounter.healed) * 100).toFixed();
      var healPct = (isNaN(heal) ? "-" : heal);
      var dpsr = parseInt(combatant.encdps).toFixed();
      var dpsn = (isNaN(dpsr) ? "0" : dpsr);
      var critPct = (parseInt(combatant.crithits) / parseInt(combatant.swings) * 100).toFixed();
      var hcritPct = (parseInt(combatant.critheals) / parseInt(combatant.swings) * 100).toFixed();

      if (!maxdps) {
        maxdps = parseFloat(combatant.encdps);
      }

      if (combatant.name == 'YOU') {
        combatant.name = yourname;
      }

      if (combatant.damage.length > 6) {
        combatant.damage = combatant.damage.substring(0, combatant.damage.length - 3) + 'K';
      }

      row.find('.dps').text(dpsn);
      row.find('.job-icon').html('<img src="config/apex/images/' + JobOrName(combatant) + '.png" onerror="$(this).attr(\'src\', \'config/apex/images/error.png\');">');
      row.find('.name').text(combatant.name);
      row.find('.statdgm').text("伤比: " +combatant['damage%']);
      row.find('.statone').text("伤暴: " + critPct + "%");
      row.find('.stattwo').text("直击: " + combatant.DirectHitPct);
      row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
      if (combatant.Job != "") row.addClass("job-" + combatant.Job);
      if ((combatant.Job == "Sch") || (combatant.Job == "Ast") || (combatant.Job == "Whm") || (combatant.Job == "Cnj")) {
        row.find('.dps').text(combatant.ENCHPS);
        row.find('.statdgm').text("疗比: " + healPct + "%");
        row.find('.statone').text("疗暴: " + hcritPct+ "%");
        row.find('.stattwo').text("过量: " + combatant.OverHealPct);
      };

      container.append(row);
    }

    $('#overlay').replaceWith(container);
  }

  $(document).on('onOverlayDataUpdate', function(e) {
    update(e.originalEvent);
  });
  window.addEventListener('message', function(e) {
    if (e.data.type === 'onOverlayDataUpdate') {
      update(e.data);
    }
  });
});
