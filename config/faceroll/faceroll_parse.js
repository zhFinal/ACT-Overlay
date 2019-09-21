/*=============================
　　　　　　　各種定義
=============================*/
var tankRole = ["Gla", "Pld", "Mrd", "War", "Drk"];
var dpsRole = ["Pgl", "Mnk", "Lnc", "Drg", "Arc", "Brd", "Rog", "Nin", "Mch", "Acn", "Smn", "Thm", "Blm","Sam","Rdm"];
var healerRole = ["Cnj", "Whm", "Sch", "Eos", "Sle", "Ast"];
var petRole = ["Cho", "Gar", "Ifr", "Tit", "Eos", "Sle", "Eme", "Tpz", "Atr", "Atb"];

var farce = [];
var ownerPlus = [];
var ownerPlusL60 = [];
var ownerDmg = [];
var ownerSort = [];
var dpsMax = 0;
var hpsMax = 0;
var xseedList = [];

var opModeFlg = 0;
var dpsModeFlg = 0;
var nameModeFlg = 0;
var farceModeFlg = 0;
var roleModeFlg = 0;
var timeModeFlg = 0;
var dmgModeFlg = 0;

/*=============================
　　　　　　显示脚本
=============================*/
// onOverlayStateUpdate 订阅活动
document.addEventListener("onOverlayStateUpdate", function (e) {
	if (!e.detail.isLocked) {
		displayResizeHandle();
	} else {
		hideResizeHandle();
	}
});

// 窗口宽度调节旋钮显示隐藏
function displayResizeHandle() {
	document.documentElement.classList.add("resizeHandle");
}

function hideResizeHandle() {
	document.documentElement.classList.remove("resizeHandle");
}

// ACT从主体发送信息时开始更新
document.addEventListener("onOverlayDataUpdate", function (e) {
	update(e.detail);
});

// 更新显示元素
function update(data) {
	if (timeModeFlg === 0){
		getData(data);
		updateData(data);
	} else if (timeModeFlg == 1 && data.isActive === false){
		timeModeFlg = 0;
		getData(data);
		updateData(data);
	}
}

// 获取信息
function getData(data) {
	// 各种初始化
	var L60D = 0;
	var dpsBar = [0];
	var hpsBar = [0];
	var dpsList = [];
	ownerPlus = [];
	ownerSort = [];
	dpsMax = 0;
	
	// 初始化个体随机数种子
	if (data.Encounter.DURATION === 0) {
		xseedList = [];
	}
	
	// 更新PC信息
	for (var combatantName in data.Combatant) {
		// 获取JobOrName和Ownername
		var combatant = createJobAndName(data.Combatant[combatantName]);
		
		// 创建exname（省略egg的名字）
		if (combatant.ownerName == "YOU") {
			combatant.exName = "'" + omit[combatant.exJob] + omit["break"] + combatant.ownerName;
		} else if (combatant.ownerName !== "") {
			combatant.exName = omit[combatant.exJob] + omit["break"] + combatant.ownerName;
		} else {
			combatant.exName = combatant.name;
		}

		// 未知的encdps被视为0
		if (combatant.encdps === undefined || combatant.encdps == "+∞" ||
			combatant.encdps == "---" || combatant.encdps === "") {
			combatant.encdps = 0;
		}

		// 极限突破和未知最后60 D被视为0
		if (combatant.Last60DPS === undefined || combatant.Last60DPS == "+∞" ||
			combatant.Last60DPS == "---" || combatant.Last60DPS === "" || combatant.name == "Limit Break") {
			combatant.Last60DPS = 0;
		}
		
		// 宠物合并
		var reg = new RegExp(omit["break"] + "(.+)");
		var owner = combatant.exName.match(reg);
		if (owner !== null && combatant.exJob != "Cho") {
			if (ownerPlus[owner[1]] === undefined) {
				ownerPlus[owner[1]] = 0;
				ownerPlusL60[owner[1]] = 0;
				ownerDmg[owner[1]] = 0;
			}
			ownerPlus[owner[1]] -= -combatant.encdps;
			ownerPlusL60[owner[1]] -= -combatant.Last60DPS;
			ownerDmg[owner[1]] -= -combatant.damage;
		}
		
		// 名称显示模式
		if (nameMode == 2 && combatant.name.indexOf("YOU") == -1) {
			// 名前をfirstnameだけにする
			var firstname = combatant.exName.match(/(.+)\s(.+)/);
			if (firstname !== null) {
				combatant.exName = firstname[1];
			}
		}
		
		// 创建闹剧名称（种子只需一次）
		if (xseedList[combatant.name] === undefined) {
			xseedList[combatant.name] = to_seed_num(combatant.name + "Yej6Dx", data.Encounter.CurrentZoneName);
		}
		xors.seed(xseedList[combatant.name]);
		if (farce[combatant.exJob] === undefined) {
			combatant.exNameFarce = "NEET";
		} else if (combatant.exName.indexOf("YOU") > -1) {
			combatant.exNameFarce = "'" + farce[combatant.exJob][parseInt(xors.rand()*(farce[combatant.exJob].length))];
		} else {
			combatant.exNameFarce = farce[combatant.exJob][parseInt(xors.rand()*(farce[combatant.exJob].length))];
		}
	}
	
	// 再次合并宠物数据
	for (var combatantNameSub in data.Combatant) {
		var combatantSub;
		
		if (plusPet == 2) {
			combatantSub = data.Combatant[combatantNameSub];
			
			// 宠物DPS总和
			if (ownerPlus[combatantSub.name] > 0) {
				combatantSub.encdps -= -ownerPlus[combatantSub.name];
				combatantSub.encdps = Math.floor(combatantSub.encdps * 100) / 100;
				ownerPlus[combatantSub.name] = "flag";
			}
			
			if (ownerPlusL60[combatantSub.name] > 0) {
				combatantSub.Last60DPS -= -ownerPlusL60[combatantSub.name];
				combatantSub.Last60DPS = Math.floor(combatantSub.Last60DPS * 100) / 100;
				ownerPlusL60[combatantSub.name] = "flag";
			}

			if (ownerDmg[combatantSub.name] > 0) {
				combatantSub.damage -= -ownerDmg[combatantSub.name];
				ownerDmg[combatantSub.name] = "flag";
			}
			
		} else {
			combatantSub = createJobAndName(data.Combatant[combatantNameSub]);
		}
		
		//获取显示顺序
		ownerSort.push([combatantNameSub, parseFloat(combatantSub.encdps)]);
		
		// 平均DPSロールDPS取得
		if (dpsRole.indexOf(combatantSub.Job) > -1) {
			dpsList.push(parseFloat(combatantSub.encdps));
		} else if (plusPet != 2 && petRole.indexOf(combatantSub.exJob) > -1 && combatantSub.exJob != "Cho" && dpsList.length > 0) {
			dpsList[0] -= -combatantSub.encdps;
		}

		if (combatantSub.encdps > 0) {
			// DPSバー用encdps
			dpsBar.push(combatantSub.encdps);
		}

		if (combatantSub.enchps > 0) {
			// DPSバー用enchps
			hpsBar.push(combatantSub.enchps);
		}

		if (combatantSub.Last60DPS > 0) {
			// 手動Last60DPS生成
			L60D -= -combatantSub.Last60DPS;

			if (data.isActive) {
				// DPSバー用Last60DPS
				dpsBar.push(combatantSub.Last60DPS);
			}
		}
	}
	
	// DPSロールの平均ダメージ
	if (dpsList.length > 1) {
		data.Encounter.dpsav = dpsList.reduce(function(i, j) {
			if (j === dpsList[dpsList.length-1]) return Math.floor(100*((i + j)/dpsList.length))/100;
			return i + j;
		});
	} else {
		data.Encounter.dpsav = 0;
	}
	data.Encounter.dpsav.toFixed(2);
	
	// 全体のLast60DPSが取得出来ない際は手動計算を入れる
	if (data.Encounter.Last60DPS === undefined || data.Encounter.Last60DPS == "+∞" ||
		data.Encounter.Last60DPS == "---" || data.Encounter.Last60DPS === "") {
		data.Encounter.Last60DPS = L60D;
	}
	
	// DPSバー用の最大値を代入
	dpsMax = Math.max.apply(null, dpsBar);
	
	// HPSバー用の最大値を代入
	hpsMax = Math.max.apply(null, hpsBar);
}

// 更新显示
function updateData(data) {
	// エンカウント情報を更新
	var header = document.getElementById('encounter');
	header.classList.add('cellHeader');
	header.innerText = "";

	header.appendChild(writeHeaderCell(data.Encounter, data.isActive));
	
	// キャラテーブル要素取得＆作成
	var table = document.getElementById('combatantTable');
	var oldTableBody = table.tBodies.namedItem('combatantTableBody');
	var newTableBody = document.createElement("tbody");
	newTableBody.id = "combatantTableBody";
	
	// 表示順の変更
	if (sortList == 2){
		ownerSort.sort(function(a,b){
			var c = a[1];
			var d = b[1];
			if(c < d){return 1;}
			if(c > d){return -1;}
			return 0;
		});
	}
	
	// tbody の内容を作成
	var combatantIndex = 0;
	for (var i = 0; i < ownerSort.length; i++){
		var combatantName = ownerSort[i][0];
		var combatant = data.Combatant[combatantName];
		
		var tableRow = newTableBody.insertRow(newTableBody.rows.length);
		if (tankRole.indexOf(combatant.exJob) > -1){
			tableRow.classList.add('tankBlock');
		} else if (healerRole.indexOf(combatant.exJob) > -1){
			tableRow.classList.add('healerBlock');
		} else {
			tableRow.classList.add('dpsBlock');
		}
		
		if (combatantName == "YOU"){
			tableRow.id = "youTag";
		}
		
		var jobCell = tableRow.insertCell();
		var nameCell = tableRow.insertCell();
		var opCell = tableRow.insertCell();
		
		if (combatantIndex === 0) {
			jobCell.style.width = "25px";
			nameCell.style.width = "100%";
			opCell.style.width = "50px";
		}
		
		// セルを埋めていく
		jobCell.appendChild(writeJobCell(combatant));
		nameCell.appendChild(writeNameCell(combatant, data.isActive, combatantIndex, data.Encounter.dpsav, data.Encounter.DURATION));
		opCell.appendChild(writeOpCell(combatant));
		
		combatantIndex++;
	}
	
	// tbody が既に存在していたら置換、そうでないならテーブルに追加
	if (oldTableBody != void(0)) {
		table.replaceChild(newTableBody, oldTableBody);
	}
	else {
		table.appendChild(newTableBody);
	}
	
	// スイッチ状況を反映
	if (opModeFlg == 1) {
		opModeFlg = 0;
		toggleOp();
	}
	if (dpsModeFlg == 1) {
		dpsModeFlg = 0;
		toggleDps();
	}
	if (nameModeFlg == 1) {
		nameModeFlg = 0;
		toggleName();
	}
	if (farceModeFlg == 1) {
		farceModeFlg = 0;
		toggleFarce();
	}
	if (roleModeFlg == 1) {
		roleModeFlg = 0;
		toggleRole();
	}
	if (dmgModeFlg == 1) {
		dmgModeFlg = 0;
		toggleDmg();
	}
}

function writeHeaderCell(encounter, isActive) {
	// 大枠
	var cell = document.createElement('div');
	
	// 切り替えメニュー
	var cellTop = document.createElement('div');
	cellTop.classList.add('symbol');
	cellTop.classList.add('colorYellow');
	cellTop.classList.add('cellHeaderTop');
	var cellTopItem1 = document.createElement('span');
	var cellTopItem2 = document.createElement('span');
	var cellTopItem3 = document.createElement('span');
	var cellTopItem4 = document.createElement('span');
	var cellTopItem5 = document.createElement('span');
	var cellTopItem7 = document.createElement('span');
	cellTopItem1.innerText = "2";
	cellTopItem2.innerText = "q";
	cellTopItem3.innerText = "®";
	cellTopItem4.innerText = "®";
	cellTopItem5.innerText = "i";
	cellTopItem7.innerText = "~";
	cellTopItem1.id = "toggle1";
	cellTopItem2.id = "toggle2";
	cellTopItem3.id = "toggle3";
	cellTopItem4.id = "toggle4";
	cellTopItem5.id = "toggle5";
	cellTopItem7.id = "toggle7";
	
	var onMouse;
	if (toggleMode == 1) {
		onMouse = "onClick";
	} else {
		onMouse = "onMouseOver";
	}
	cellTopItem1.setAttribute(onMouse, 'toggleOp()');
	cellTopItem2.setAttribute(onMouse, 'toggleDps()');
	cellTopItem3.setAttribute(onMouse, 'toggleName()');
	cellTopItem4.setAttribute(onMouse, 'toggleFarce()');
	cellTopItem5.setAttribute(onMouse, 'toggleRole()');
	cellTopItem7.setAttribute(onMouse, 'toggleDmg()');
	
	if (maskMode == 1) {
		cellTopItem4.style.display = "none";
	} else if (maskMode == 2) {
		cellTopItem3.style.display = "none";
	} else {
		cellTopItem3.style.display = "none";
		cellTopItem4.style.display = "none";
	}
	if (filterkMode == 1){
		cellTopItem5.style.display = "none";
	}
	if (dpsMode == 1){
		cellTopItem2.style.display = "none";
	}
	if (opMode == 1){
		cellTopItem1.style.display = "none";
	}
	if (dmgMode == 1){
		cellTopItem7.style.display = "none";
	}

	cellTop.appendChild(cellTopItem7);
	cellTop.appendChild(cellTopItem5);
	cellTop.appendChild(cellTopItem4);
	cellTop.appendChild(cellTopItem3);
	cellTop.appendChild(cellTopItem2);
	cellTop.appendChild(cellTopItem1);

	// 時間と敵情報
	var cellMiddle = document.createElement('div');
	cellMiddle.classList.add('cellHeaderMiddle');
	var cellMiddleItem = document.createElement('span');
	cellMiddleItem.setAttribute(onMouse, 'toggleTime()');
	cellMiddleItem.id = "toggle6";
	cellMiddleItem.classList.add('symbol');
	var cellMiddleValue = document.createElement('span');
	cellMiddleValue.innerText = encounter.duration;
	cellMiddleValue.classList.add('num');
	cellMiddleValue.classList.add('timeHeader');
	if (isActive) {
		cellMiddleItem.innerText = "U";
		cellMiddleItem.classList.add('colorGreen');
		cellMiddleValue.classList.add('colorBlue');
	} else {
		cellMiddleItem.innerText = "V";
		cellMiddleItem.classList.add('colorYellow');
		cellMiddleValue.classList.add('colorYellow');
	}
	
	var cellMiddleEnemy = document.createElement('span');
	if (encounter.title == "Encounter") {
		cellMiddleEnemy.innerText = encounter.CurrentZoneName;
	} else {
		cellMiddleEnemy.innerText = encounter.title;
	}
	cellMiddleEnemy.classList.add('enemyHeader');
	cellMiddleEnemy.classList.add('colorRed');

	cellMiddle.appendChild(cellMiddleItem);
	cellMiddle.appendChild(cellMiddleValue);
	cellMiddle.appendChild(cellMiddleEnemy);

	// DPS情報
	var cellBottom = document.createElement('div');
	cellBottom.id = "headerDps";
	cellBottom.classList.add('cellHeaderBottom');
	cellBottom.classList.add('colorYellow');
	var cellBottomItem1 = document.createElement('span');
	cellBottomItem1.innerText = "DPS:";
	cellBottomItem1.classList.add('titleHeader');
	var cellBottomItem2 = document.createElement('span');
	//cellBottomItem2.innerText = "L60D:";
	cellBottomItem2.classList.add('titleHeader');
	cellBottomItem2.classList.add('floatRight');
	//cellBottomItem2.classList.add('marginLeft');
	if (isActive) {
		if (parseInt(encounter.encdps) < parseInt(encounter.Last60DPS) + 1) {
			cellBottomItem2.innerText = "↑";
			cellBottomItem2.classList.add('colorGreen');
		} else {
			cellBottomItem2.innerText = "↓";
			cellBottomItem2.classList.add('colorRed');
		}
	}

	var cellBottomValue1 = document.createElement('span');
	cellBottomValue1.innerText = encounter.encdps;
	cellBottomValue1.classList.add('dpsHeader');
	cellBottomValue1.classList.add('floatRight');
	cellBottomValue1.classList.add('num');
	if (isActive) {
		cellBottomValue1.classList.add('colorGold');
	}
	//var cellBottomValue2 = document.createElement('span');
	//cellBottomValue2.innerText = encounter.Last60DPS;
	//cellBottomValue2.classList.add('dpsHeader');
	//cellBottomValue2.classList.add('floatRight');
	//cellBottomValue2.classList.add('num');
	
	cellBottom.appendChild(cellBottomItem1);
	//cellBottom.appendChild(cellBottomValue2);
	cellBottom.appendChild(cellBottomItem2);
	cellBottom.appendChild(cellBottomValue1);

	// DPS情報サブ
	var cellBottomSub = document.createElement('div');
	cellBottomSub.id = "headerDpsSub";
	cellBottomSub.classList.add('cellHeaderBottomSub');
	cellBottomSub.classList.add('colorYellow');
	cellBottomSub.classList.add('tggoleVisible');
	
	var cellBottomSubItem1 = document.createElement('span');
	cellBottomSubItem1.innerText = "DRA:";
	cellBottomSubItem1.classList.add('titleHeader');
	var cellBottomSubValue1 = document.createElement('span');
	cellBottomSubValue1.innerText = encounter.dpsav.toFixed(0);
	cellBottomSubValue1.classList.add('num');
	var cellBottomSubItem2 = document.createElement('span');
	cellBottomSubItem2.innerText = "T:";
	cellBottomSubItem2.classList.add('titleHeader');
	cellBottomSubItem2.classList.add('marginLeft');
	var cellBottomSubValue2 = document.createElement('span');
	cellBottomSubValue2.innerText = (encounter.dpsav * dpsAveTank / 100).toFixed(0) + "↑";
	cellBottomSubValue2.classList.add('num');
	var cellBottomSubItem3 = document.createElement('span');
	cellBottomSubItem3.innerText = "H:";
	cellBottomSubItem3.classList.add('titleHeader');
	cellBottomSubItem3.classList.add('marginLeft');
	var cellBottomSubValue3 = document.createElement('span');
	cellBottomSubValue3.innerText = (encounter.dpsav * dpsAveHealer / 100).toFixed(0) + "↑";
	cellBottomSubValue3.classList.add('num');
	var cellBottomSubItem4 = document.createElement('span');
	cellBottomSubItem4.innerText = "D:";
	cellBottomSubItem4.classList.add('titleHeader');
	cellBottomSubItem4.classList.add('marginLeft');
	var cellBottomSubValue4 = document.createElement('span');
	cellBottomSubValue4.innerText = (encounter.dpsav * cDpsLower / 100).toFixed(0) + "↓";
	cellBottomSubValue4.classList.add('num');

	cellBottomSub.appendChild(cellBottomSubItem1);
	cellBottomSub.appendChild(cellBottomSubValue1);
	cellBottomSub.appendChild(cellBottomSubItem2);
	cellBottomSub.appendChild(cellBottomSubValue2);
	cellBottomSub.appendChild(cellBottomSubItem3);
	cellBottomSub.appendChild(cellBottomSubValue3);
	cellBottomSub.appendChild(cellBottomSubItem4);
	cellBottomSub.appendChild(cellBottomSubValue4);

	// 結合する
	cell.appendChild(cellTop);
	cell.appendChild(cellMiddle);
	cell.appendChild(cellBottom);
	cell.appendChild(cellBottomSub);

	return cell;
}

function writeJobCell(combatant) {
	var cell = document.createElement('div');
	cell.classList.add('cellJob');
	
	// ジョブ表示モード
	if (jobMode == 2) {
		cell.innerHTML = "<img src='./icons/" + combatant.exJob + ".png' width='25' height='25'>";
	} else {
		if (tanJob[combatant.exJob] !== null) {
			cell.innerText = tanJob[combatant.exJob];
		} else {
			cell.innerText = "-";
		}
		cell.classList.add('tankan');
		cell.classList.add('colorYellow');
	}
	
	// ジョブ表示領域の背景色
	if (dpsRole.indexOf(combatant.exJob) > -1){
		cell.classList.add('cellJobDps');
	} else if (tankRole.indexOf(combatant.exJob) > -1){
		cell.classList.add('cellJobTank');
	} else if (healerRole.indexOf(combatant.exJob) > -1){
		cell.classList.add('cellJobHealer');
	} else {
		cell.classList.add('cellJobPet');
	}
	
	return cell;
}

function writeNameCell(combatant, isActive, index, dpsav, duration) {
	var cell = document.createElement('div');
	cell.classList.add('cell');
	
	/* 名前 */
	var name = document.createElement('div');
	name.id = combatant.name;
	name.innerHTML = combatant.exName;
	name.classList.add('name');
	name.classList.add('colorBlue');
	name.setAttribute('onClick', 'nameCopy(this)');
	var nameSub = document.createElement('div');
	nameSub.innerText = combatant.exNameFarce;
	nameSub.classList.add('nameSub');
	nameSub.classList.add('colorBlue');
	nameSub.classList.add('tggoleVisible');
	
	// YOUの色を変更
	if (combatant.exName == "YOU") {
		name.classList.add('you');
	} else if (combatant.exName.charAt(0) == "'") {
		name.innerText = combatant.exName.slice(1);
		name.classList.add('you');
	}
	
	if (combatant.exNameFarce.charAt(0) == "'") {
		nameSub.innerText = combatant.exNameFarce.slice(1);
		nameSub.classList.add('you');
	}
	
	/* DPS */
	var dps =  document.createElement('span');
	dps.innerText = combatant.encdps;
	dps.classList.add('dps');
	dps.classList.add('floatRight');
	dps.classList.add('num');
	dps.classList.add('colorBlue');
	var dpsSub =  document.createElement('span');
	dpsSub.innerText = combatant.damage;
	dpsSub.classList.add('dpsSub');
	dpsSub.classList.add('floatRight');
	dpsSub.classList.add('num');
	dpsSub.classList.add('colorBlue');
	dpsSub.classList.add('tggoleVisible');
	
	// ペット合算表示
	if (ownerPlus[combatant.name] == "flag" || ownerPlusL60[combatant.name] == "flag"){
		var dpsPlus =  document.createElement('span');
		dpsPlus.innerText = "+";
		dpsPlus.classList.add('plus');
		dpsPlus.classList.add('floatLeft');
		dps.appendChild(dpsPlus);
		var dpsPlusSub =  document.createElement('span');
		dpsPlusSub.innerText = "+";
		dpsPlusSub.classList.add('plus');
		dpsPlusSub.classList.add('floatLeft');
		dpsSub.appendChild(dpsPlusSub);
		
		ownerPlus[combatant.name] = 0;
		ownerPlusL60[combatant.name] = 0;
		ownerDmg[combatant.name] = 0;
	}
	
	// 平均値を元に指定した条件でDPS色変化
	if (dpsav > 0) {
		/* DRAの指定値％以下で色変化 */
		
		// DPS用
		if ((duration >= cDuration && combatant.encdps < dpsav * 0.75) && dpsRole.indexOf(combatant.exJob) > -1) {
			dps.classList.add('colorRed');
		}
		
		// タンク＆ヒーラー用
		if (duration >= cDuration &&
			((combatant.encdps >= dpsav * dpsAveTank / 100 && tankRole.indexOf(combatant.Job) > -1) ||
			(combatant.encdps >= dpsav * dpsAveHealer / 100 && healerRole.indexOf(combatant.Job) > -1))) {
			dps.classList.add('colorPurple');
		}
		
		// 共通
		if (duration >= cDuration && combatant.encdps >= dpsav * cDpsUpper / 100 ) {
			dps.classList.add('colorGold');
		}
	}
	
	/* バー内の値 */
	var ex =  document.createElement('span');
	var exNum =  document.createElement('span');
	ex.classList.add('ex');
	ex.classList.add('colorYellow');
	exNum.classList.add('num');
	exNum.classList.add('colorBlue');
	exNum.classList.add('floatRight');
	
	var cdhpPercent = document.createElement('span');
	cdhpPercent.classList.add('percent');
	cdhpPercent.classList.add('colorYellow');
	cdhpPercent.classList.add('floatRight');
	cdhpPercent.innerText = "%";
	
	/* DPSバー */
	var bar =  document.createElement('span');
	bar.classList.add('bar');
	
	var barMax = 0;
	var barMin = 0;
	var barMinValue = 0;
	var leftColor = "";
	var rightColor = "";
	var barSize = 100;
	if (healerRole.indexOf(combatant.exJob) > -1 && healerBar == 2) {
		// HPSバー
		barMax = combatant.enchps;
		if (combatant.OverHealPct === undefined) {
			ex.innerText = "未知";
			barMinValue = 0;
			exNum.innerText = "";
		} else {
			ex.innerText = "有效治疗：";
			barMinValue = parseInt(barMax) - (parseInt(barMax) * (parseInt(combatant.OverHealPct.slice(0, -1)) / 100));
			exNum.innerText = barMinValue.toFixed(0);
		}
		leftColor = "rgba(50,205,50,0.5)";
		rightColor = "rgba(173,255,47,0.25)";
		barMin = (parseInt(barMinValue) / parseInt(barMax));
		barSize = (parseInt(barMax) * 100 / parseInt(hpsMax));
	} else {
		// DPSバー
		if (parseInt(combatant.encdps) > parseInt(combatant.Last60DPS)) {
			// DPSが下降線の時にLast60DPS範囲の色を変える
			barMax = combatant.encdps;
			barMinValue = combatant.Last60DPS;
			if (tankRole.indexOf(combatant.exJob) > -1) {
				// タンクロールのバー色
				leftColor = "rgba(65,105,225,0.5)";
				rightColor = "rgba(65,105,225,0.5)";
			} else if (healerRole.indexOf(combatant.exJob) > -1) {
				// ヒーラーロールのバー色
				leftColor = "rgba(50,205,50,0.5)";
				rightColor = "rgba(50,205,50,0.5)";
			} else {
				// DPSロールのバー色
				leftColor = "rgba(220,20,60,0.5)";
				rightColor = "rgba(220,20,60,0.5)";
			}
		} else {
			barMax = combatant.Last60DPS;
			barMinValue = combatant.encdps;
			if (tankRole.indexOf(combatant.exJob) > -1) {
				// タンクロールのバー色
				leftColor = "rgba(65,105,225,0.5)";
				rightColor = "rgba(255,215,0,0.25)";
			} else if (healerRole.indexOf(combatant.exJob) > -1) {
				// ヒーラーロールのバー色
				leftColor = "rgba(50,205,50,0.5)";
				rightColor = "rgba(255,215,0,0.25)";
			} else {
				// DPSロールのバー色
				leftColor = "rgba(220,20,60,0.5)";
				rightColor = "rgba(255,215,0,0.25)";
			}
		}
		barMin = (parseInt(barMinValue) / parseInt(barMax));
		
		if (combatant.exJob == "LtB") {
			ex.innerText = "Special Move";
			exNum.innerText = "";
		} else {
			ex.innerText = "直暴：";
			exNum.innerText = combatant.CritDirectHitPct.slice(0, -1);
			exNum.appendChild(cdhpPercent);
		}
		
		// 非アクティブ時は境界線を作らない
		if (!isActive) {
			barMax = combatant.encdps;
			if (tankRole.indexOf(combatant.exJob) > -1) {
				leftColor = "rgba(65,105,225,0.5)";
				rightColor = "rgba(65,105,225,0.5)";
			} else if (healerRole.indexOf(combatant.exJob) > -1) {
				leftColor = "rgba(50,205,50,0.5)";
				rightColor = "rgba(50,205,50,0.5)";
			} else {
				leftColor = "rgba(220,20,60,0.5)";
				rightColor = "rgba(220,20,60,0.5)";
			}
			ex.innerText = "";
			exNum.innerText = "";
			if (parseInt(combatant.Last60DPS) > parseInt(combatant.encdps)) {
				barMin = 1;
			}
		}
		
		barSize = (parseInt(barMax) * 100 / parseInt(dpsMax));
	}
	
	bar.style.background = "-webkit-gradient(linear, left top,right top, color-stop(" + barMin + "," + leftColor + "), color-stop(" + barMin + "," + rightColor + "))";
	bar.style.width = barSize + "%";
	
	// L60Dや実HPSの位置を調整
	var positionLeft = 100 * (barSize / 100 * barMin);
	if (barSize <= 30 && combatant.exJob == "LtB") {
		ex.style.left = barSize + "%";
	} else if (healerRole.indexOf(combatant.exJob) == -1 && barSize > exPosition && positionLeft <= exPosition){
		ex.style.left = "0%";
	} else if (positionLeft >= exPosition) {
		ex.style.left = positionLeft - exPosition + "%";
	} else if ((barSize - positionLeft) > exPosition) {
		ex.style.left = positionLeft + "%";
	} else {
		ex.style.left = barSize + "%";
	}
	
	/* DPS表示横のミス＆デス表示 */
	var opTop =  document.createElement('div');
	var opUnder =  document.createElement('div');
	opTop.classList.add('nameOpTop');
	opUnder.classList.add('nameOpUnder');
	opTop.classList.add('opClasses');
	opUnder.classList.add('opClasses');
	var opItem1 =  document.createElement('span');
	var opValue1 =  document.createElement('span');
	var opItem2 =  document.createElement('span');
	var opValue2 =  document.createElement('span');
	opItem1.classList.add('colorYellow');
	opValue1.classList.add('num');
	opValue1.classList.add('colorRed');
	opItem2.classList.add('colorYellow');
	opValue2.classList.add('num');
	opValue2.classList.add('colorRed');

	var ohPercent = document.createElement('span');
	ohPercent.classList.add('percent');
	ohPercent.classList.add('colorYellow');
	ohPercent.classList.add('floatRight');
	ohPercent.innerText = "%";
	
	if (combatant.OverHealPct !== "0%" && combatant.OverHealPct !== undefined) {
		opItem1.innerHTML = "过量:";
		opValue1.innerHTML = parseInt(combatant.OverHealPct.slice(0, -1));
		opTop.appendChild(ohPercent);
		
	}
	if (combatant.deaths > 0) {
		opItem2.innerHTML = "死:";
		opValue2.innerHTML = combatant.deaths;
	}

	opTop.appendChild(opItem1);
	opTop.appendChild(opValue1);
	opUnder.appendChild(opItem2);
	opUnder.appendChild(opValue2);
	
	if (opItem == 1) {
		opTop.classList.add('tggoleVisible');
		opUnder.classList.add('tggoleVisible');
	}
	
	// 結合
	ex.appendChild(exNum);
	cell.appendChild(name);
	cell.appendChild(nameSub);
	cell.appendChild(dps);
	cell.appendChild(dpsSub);
	cell.appendChild(bar);
	cell.appendChild(ex);
	cell.appendChild(opTop);
	cell.appendChild(opUnder);
	return cell;
}

function writeOpCell(combatant) {
	var displayMode = 0;
	var toggleIcon = document.getElementById('toggle1');
	if (toggleIcon.classList.contains('colorGreen')) {
		displayMode = 1;
		toggleIcon.classList.add('colorGreen');
	}
	
	var cell = document.createElement('div');
	cell.classList.add('cell');
	cell.classList.add('cellOp');
	cell.classList.add('colorYellow');
	
	// 項目
	var top = document.createElement('div');
	var under = document.createElement('div');
	top.innerText = "Miss";
	under.innerText = "死亡";
	top.classList.add('cellOpTop');
	under.classList.add('cellOpUnder');
	top.classList.add('opClasses');
	under.classList.add('opClasses');
	
	// 値
	var topValue = document.createElement('span');
	var underValue = document.createElement('span');
	topValue.innerText = combatant.misses;
	underValue.innerText = combatant.deaths;
	topValue.classList.add('floatRight');
	underValue.classList.add('floatRight');
	topValue.classList.add('numMissDeath');
	underValue.classList.add('numMissDeath');

	if (combatant.misses === '0') {
		topValue.classList.add('num');
		topValue.classList.add('colorBlue');
	} else {
		topValue.classList.add('num');
		topValue.classList.add('colorRed');
	}

	if (combatant.deaths === '0') {
		underValue.classList.add('num');
		underValue.classList.add('colorBlue');
	} else {
		underValue.classList.add('num');
		underValue.classList.add('colorRed');
	}

	// 子项
	var topSub = document.createElement('div');
	var underSub = document.createElement('div');
	topSub.innerText = "直击";
	underSub.innerText = "暴击";
	topSub.classList.add('cellOpTopSub');
	underSub.classList.add('cellOpUnderSub');
	topSub.classList.add('opClasses');
	underSub.classList.add('opClasses');
	
	// 子值
	var topValueSub = document.createElement('span');
	var underValueSub = document.createElement('span');
	var temptopValueSub = combatant.DirectHitPct + "";
	topValueSub.innerText = temptopValueSub.slice(0, -1);
	underValueSub.innerText = combatant["crithit%"].slice(0, -1);
	topValueSub.classList.add('num');
	underValueSub.classList.add('num');
	topValueSub.classList.add('colorBlue');
	underValueSub.classList.add('colorBlue');
	topValueSub.classList.add('floatRight');
	underValueSub.classList.add('floatRight');

	// クリティカルの％
	var criPercent = document.createElement('span');
	criPercent.classList.add('percent');
	criPercent.classList.add('colorYellow');
	criPercent.classList.add('floatRight');
	criPercent.innerText = "%";
	underValueSub.appendChild(criPercent);
	
	var driPercent = document.createElement('span');
	driPercent.classList.add('percent');
	driPercent.classList.add('colorYellow');
	driPercent.classList.add('floatRight');
	driPercent.innerText = "%";
	topValueSub.appendChild(driPercent);
	
	if (opItem == 1) {
		topSub.classList.add('tggoleVisible');
		underSub.classList.add('tggoleVisible');
	} else {
		top.classList.add('tggoleVisible');
		under.classList.add('tggoleVisible');
	}
	
	// 結合
	top.appendChild(topValue);
	under.appendChild(underValue);
	topSub.appendChild(topValueSub);
	underSub.appendChild(underValueSub);
	cell.appendChild(top);
	cell.appendChild(under);
	cell.appendChild(topSub);
	cell.appendChild(underSub);
	return cell;
}

// JobOrNameとペットの省略表示を作成
function createJobAndName(combatant) {
	if (combatant.Job === "") {
		var owner = combatant.name.match(/[(](.+)[)]/);
		if (owner !== null) {
			for (var i=0; i<youNameList.length; i++) {
				if (youNameList[i] == owner[1]) {
					combatant.ownerName = "YOU";
					break;
				}
			}
			if (combatant.ownerName != "YOU") {
				combatant.ownerName = owner[1];
			}
		} else {
			combatant.ownerName = "";
		}
		
		if (combatant.name.indexOf("ガルーダ・エギ") === 0 || combatant.name.indexOf("Garuda-Egi") === 0) {
			combatant.exJob = "Gar";
		} else if (combatant.name.indexOf("イフリート・エギ") === 0 || combatant.name.indexOf("Ifrit-Egi") === 0) {
			combatant.exJob = "Ifr";
		} else if (combatant.name.indexOf("タイタン・エギ") === 0 || combatant.name.indexOf("Titan-Egi") === 0) {
			combatant.exJob = "Tit";
		} else if (combatant.name.indexOf("フェアリー・エオス") === 0 || combatant.name.indexOf("Eos") === 0) {
			combatant.exJob = "Eos";
		} else if (combatant.name.indexOf("フェアリー・セレネ") === 0 || combatant.name.indexOf("Selene") === 0) {
			combatant.exJob = "Sle";
		} else if (combatant.name.indexOf("カーバンクル・エメラルド") === 0 || combatant.name.indexOf("Emerald Carbuncle") === 0) {
			combatant.exJob = "Eme";
		} else if (combatant.name.indexOf("カーバンクル・トパーズ") === 0 || combatant.name.indexOf("Topaz Carbuncle") === 0) {
			combatant.exJob = "Tpz";
		} else if (combatant.name.indexOf("カーバンクル・ルビー") === 0 || combatant.name.indexOf("Ruby Carbuncle") === 0) {
			combatant.exJob = "Rby";
		} else if (combatant.name.indexOf("オートタレット・ルーク") === 0 || combatant.name.indexOf("Rook Autoturret") === 0) {
			combatant.exJob = "Atr";
		} else if (combatant.name.indexOf("オートタレット・ビショップ") === 0 || combatant.name.indexOf("Bishop Autoturret") === 0) {
			combatant.exJob = "Atb";
		} else if (combatant.name.indexOf("Limit Break") === 0) {
			combatant.exJob = "LtB";
		} else if (owner !== null && !combatant.name.match(/\u4e00-\u9fa5/)) {
			combatant.exJob = "Cho";
		} else {
			combatant.exJob = "Err";
		}
	} else {
		combatant.exJob = combatant.Job;
		combatant.ownerName = "";
	}
	
	return combatant;
}

// オプション表示切り替え
function toggleOp() {
	opModeFlg = 1 - opModeFlg;
	
	var value = document.getElementsByClassName('opClasses');
	for(var i = 0, j = value.length; i < j; i++) {
		value[i].classList.toggle('tggoleVisible');
	}
	
	var toggleIcon = document.getElementById('toggle1');
	toggleIcon.classList.toggle('colorGreen');
}

// DPS表示切り替え
function toggleDps() {
	dpsModeFlg = 1 - dpsModeFlg;
	
	var value = document.getElementById('headerDps');
	if (value !== null) {
		var valueSub = document.getElementById('headerDpsSub');
		value.classList.toggle('tggoleVisible');
		valueSub.classList.toggle('tggoleVisible');
	}
	
	var toggleIcon = document.getElementById('toggle2');
	toggleIcon.classList.toggle('colorGreen');
}

// ダメージ表示切り替え
function toggleDmg() {
	dmgModeFlg = 1 - dmgModeFlg;

	var valueDps = document.getElementsByClassName('Dps');
	var valueDpsSub = document.getElementsByClassName('DpsSub');
	for(var i = 0, j = valueDps.length; i < j; i++) {
		valueDps[i].classList.toggle('tggoleVisible');
		valueDpsSub[i].classList.toggle('tggoleVisible');
	}

	var toggleIcon = document.getElementById('toggle7');
	toggleIcon.classList.toggle('colorGreen');
}

// 名前表示切り替え
function toggleName() {
	nameModeFlg = 1 - nameModeFlg;
	
	var valueName = document.getElementsByClassName('name');
	var valueNameSub = document.getElementsByClassName('nameSub');
	var valueNameYou = document.getElementsByClassName('name you');
	for(var i = 0, j = valueName.length; i < j; i++) {
		valueName[i].classList.toggle('tggoleVisible');
	}
	valueNameYou[0].classList.remove('tggoleVisible');
	
	var toggleIcon = document.getElementById('toggle3');
	toggleIcon.classList.toggle('colorGreen');
}

// 茶番表示切り替え
function toggleFarce() {
	farceModeFlg = 1 - farceModeFlg;
	
	var valueName = document.getElementsByClassName('name');
	var valueNameSub = document.getElementsByClassName('nameSub');
	for(var i = 0, j = valueName.length; i < j; i++) {
		valueName[i].classList.toggle('tggoleVisible');
		valueNameSub[i].classList.toggle('tggoleVisible');
	}
	
	var toggleIcon = document.getElementById('toggle4');
	toggleIcon.classList.toggle('colorGreen');
}

// ロール表示切り替え
function toggleRole() {
	roleModeFlg = 1 - roleModeFlg;
	
	var valueRole = document.getElementsByClassName('dpsBlock');
	if (valueRole[1] !== undefined) {
		for(var i = 1, j = valueRole.length; i < j; i++) {
			valueRole[i].classList.toggle('tggoleDisplay');
		}
	}
	var valueYou = document.getElementById('youTag');
	if(valueYou !== null){
		valueYou.classList.remove('tggoleDisplay');
	}
	
	var toggleIcon = document.getElementById('toggle5');
	toggleIcon.classList.toggle('colorGreen');
}

// 時間停止切り替え表示切り替え
function toggleTime() {
	var toggleIcon = document.getElementById('toggle6');
	if (toggleIcon.classList.contains('colorGreen')) {
		toggleIcon.classList.add('colorRed');
		toggleIcon.classList.remove('colorGreen');
		timeModeFlg = 1;
	} else if (toggleIcon.classList.contains('colorRed')) {
		toggleIcon.classList.add('colorGreen');
		toggleIcon.classList.remove('colorRed');
		timeModeFlg = 0;
	} else {
		timeModeFlg = 0;
	}
}

// 名前を元にロドストの検索ページをコピーする
function nameCopy(name) {
	var fullName = name.id.match(/(.+)\s(.+)/);
	var byOwner = name.id.match(/\(.+\)$/);
	if (fullName && !byOwner){
		var url = "http://jp.finalfantasyxiv.com/lodestone/character/?q=" + fullName[1] + "+" + fullName[2] + "&worldname=&classjob=&race_tribe=&order=";
		var tableBox = document.getElementById('table_box');
		var nameBox = document.getElementById(name.id);
		var copyArea = document.createElement('textarea');
		copyArea.innerText = url;
		tableBox.appendChild(copyArea);
		copyArea.select();
		document.execCommand("copy");
		tableBox.removeChild(copyArea);

		nameBox.classList.add('copy');
		setTimeout( function() {
			nameBox.classList.remove('copy');
		}, 1000 );
	}
}

// 省略Xorshift(一応xyzも定義)
xors = {
	x: 123456789,
	y: 362436069,
	z: 521288629,
	w: 88675123
};
xors.seed = function(s) {
	xors.w = s;
};
xors.rand = function() {
	var w;
	for (var i=0; i<5; i++) {
		var v = xors.x ^ (xors.x << 11);
		w = (xors.w ^ (xors.w >> 19)) ^ (v ^ (v >> 8));
	}
	return w % 0x1000 / 0x1000;
};

// 名前と場所を適当な数字へ変換
function to_seed_num(name, zone) {
	var n = 1;
	var z = 1;
	var m = [];
	var o = "";
	var DD = new Date();
	for (var i=0, len=name.length ; i<len; i++) {
		m[i] = name.charCodeAt(i);
		n *= m[i];
	}
	for (var j=0; j<5; j++) {
		o = n.toString();
		o = Number( o.substr(2, 10));
		n = Math.round(Math.pow(o,3) / m[j]*2);
	}
	
	n = n.toString();
	return Number( n.substr(2, 8) * (z + DD.getFullYear() + DD.getMonth() + DD.getDate() + DD.getDay()));
}