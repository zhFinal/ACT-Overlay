/* If you have basic CSS knowledge, I strongly suggest marking
/* out the contents of this file and editing the "apex-n.css" file directly

/* I recommend https://uigradients.com/ for color combo inspiration

/* ----- GENERAL -----  */

/* 更改你美化中显示的名字，修改  "YOU"*/
var yourname = "YOU";
/* 修改顶部的背景透明度 / 默认 = 0.87 / 完全透明（只有数据）= 0 / 不透明= 0 */
var headerOpacity = "0.7";
/* 修改下方数据框背景透明度 / 默认 = 0.87 / 完全透明（只有数据）= 0 / 不透明= 0 */
var partyOpacity = "0.87";
/* 开启按职能来显示颜色. ("true" 为开启 / "false") 为关闭*/
var classColors = true;
/*让极限技显示在小队最强伤害中，("true" 为开启 / "false") */
var ignoreLimitBreak = true;
/* 让极限技显示在小队列表统计中，("true" 为开启 / "false") */
var partyLimitBreak = true;
/* 开启秒伤的颜色渐变，("true" 为开启 / "false")  */
var dpsGradient = true;

/* ----- 如果classColors设置为“false” -----  */

/* First color / Default = #2994f7 */
var colorOne = "#2994f7";
/* Second color / Default = #eb318c */
var colorTwo = "#eb318c";
/* Dps color if gradients set to false / Default = #2994f7 */
var colorDps = "#2994f7";

/* ----- 如果classColors设置为"true"  -----  */

/* First color - changes "time" - Default: #928DAB */
var classColorOne = "#2994f7";
/* Second color - changes "maxhit" - Default #928DAB */
var classColorTwo = "#eb318c";
/* By default the two displayed stats will have the same colors as your class gradients
/* You can override it here, and set them to a uniform color. true /false */
var overrideStats = false;
var overrideColor = "#2994f7";
/* Tank colors */
var classTankOne = "#396afc";
var classTankTwo = "#36D1DC";
var classTankDps = "#36D1DC";
/* Healer colors */
var classHealerOne = "#00b09b";
var classHealerTwo = "#96c93d";
var classHealerDps = "#96c93d";
/* Dps colors */
var classDpsOne = "#4b134f";
var classDpsTwo = "#c94b4b";
var classDpsDps = "#c94b4b";
/* Generic colors for pets and chocobos */
var classOne = "#222528";
var classTwo = "#928DAB";
var classDps = "#222528";
