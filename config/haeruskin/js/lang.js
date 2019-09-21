lang = {
    DPS: '',
    HPS: '',
    BM: '',
    edit: '',    
    data: {
        kr: 'HAERUSKIN 2 - KR Moogle/해루',
        en: 'HAERUSKIN 2 - KR Moogle/해루'
    },
    size: {
        1: '55.5%',
        2: '62.5%',
        3: '75%',
        4: '100%',
        5: '125%',
        6: '150%',
        7: '175%',
        8: '200%',
    },
    opacity: {
        1: '20% / 0%',
        2: '40% / 25%',
        3: '60% / 50%',
        4: '80% / 75%',
        5: '100% / 100%'
    },
    lang: {
        0: 'English',
        1: '中文'
    },
    thema: {
        1: {
            kr: '灵魂水晶',
            en: 'Soul Crystal',
            color: '#4FC3F7'
        },
        2: {
            kr: '粉彩',
            en: 'Pastel',
            color: '#FFAB91'
        },
        3: {
            kr: '角色',
            en: 'Role',            
            color: '#CDDC39'
        },
        4: {
            kr: '薄荷巧克力',
            en: 'Mint & Chocolate',            
            color: '#F4CE7B'
        },
        5: {
            kr: '皇帝的ACT',
            en: 'The Emperor\'s ACT',            
            color: '#B39DDB'
        }
    },
    graph: {
        1: {
            kr: '计量条',
            en: 'Bar'
        },
        2: {
            kr: '渐变',
            en: 'Gradient'
        },
        3: {
            kr: '下划线',
            en: 'Underline'
        }
    },
    number: {
        0: {
            kr: '整数',
            en: 'Integer'
        },
        1: {
            kr: '小数',
            en: 'Decimal'
        }
    },
    pets: {
        0: {
            kr: '分离',
            en: 'Separate'
        },
        1: {
            kr: '合并',
            en: 'Combine'
        }
    },
    name: {
        0: {
            kr: '隐藏',
            en: 'Hide'
        },
        1: {
            kr: '显示',
            en: 'Show'
        }
    },
    elements:{
        Job:{
            title:"Job",
            ex:{
                kr:'职业图标。',
                en:'Player\'s class or job icon.'
            },
            DPS:true,
            HPS:true,
            BM:true
        },
        Name:{
            title:"Name",
            ex:{
                kr:'玩家名字。',
                en:'The combatant\'s name.'
            },
            DPS:true,
            HPS:true,
            BM:true            
        },
        PTime:{
            title:"P.Time",
            ex:{
                kr:'战斗持续时间(以我的第一次攻击为准)。',
                en:'The duration of the combatant.'
            },
            DPS:false,
            HPS:'block',
            BM:false            
        },
        PDPS:{
            title:"P.DPS",
            ex:{
                kr:'以个人计算为标准的每秒伤害。',
                en:'The damage total of the combatant divided by their personal duration.'
            },
            DPS:false,
            HPS:'block',
            BM:false            
        },
        Time:{
            title:"Time",
            ex:{
                kr:'战斗持续时间(以小队或团队的第一次攻击为准)。',
                en:'The duration of the encounter.'
            },
            DPS:false,
            HPS:'block',
            BM:false            
        },
        DPS:{
            title:"DPS",
            ex:{
                kr:'以小队或团队计算为标准计算的每秒伤害，',
                en:'The damage total of the combatant divided by the duration of the encounter.<br>This is more commonly used than P.DPS'
            },
            DPS:true,
            HPS:'block',
            BM:true           
        },
        Last10:{
            title:"Last10",
            ex:{
                kr:'最近10秒的平均秒伤。',
                en:'Average DPS for last 10 seconds.'
            },
            DPS:false,
            HPS:'block',
            BM:false          
        },
        Last30:{
            title:"Last30",
            ex:{
                kr:'最近30秒的平均秒伤。',
                en:'Average DPS for last 30 seconds.'
            },
            DPS:false,
            HPS:'block',
            BM:false          
        },
        Last60:{
            title:"Last60",
            ex:{
                kr:'最近60秒的平均秒伤。',
                en:'Average DPS for last 60 seconds.'
            },
            DPS:false,
            HPS:'block',
            BM:false          
        },
        Last180:{
            title:"Last180",
            ex:{
                kr:'最近180秒的平均秒伤。',
                en:'Average DPS for last 180 seconds.'
            },
            DPS:false,
            HPS:'block',
            BM:false          
        },
        Dper:{
            title:"D%",
            ex:{
                kr:'伤害量在整个队伍中的占比。',
                en:'This value represents the percent share of all damage done by allies in this encounter.'
            },
            DPS:true,
            HPS:'block',
            BM:false  
        },
        Damage:{
            title:"Damage",
            ex:{
                kr:'造成的伤害总量。',
                en:'The amount of damage.'
            },
            DPS:true,
            HPS:'block',
            BM:true  
        },
        ACC:{
            title:"ACC",
            ex:{
                kr:'命中率%。',
                en:'The percentage of hits to swings.'
            },
            DPS:false,
            HPS:'block',
            BM:false  
        },
        Swing:{
            title:"Swing",
            ex:{
                kr:'攻击次数。(包括自动攻击与伤害技能，也包括攻击无敌目标或其他而未造成伤害的次数。)',
                en:'The number of attack attempts.<br>This includes any auto-attacks or abilities, also including resisted abilities that do no damage.'
            },
            DPS:true,
            HPS:'block',
            BM:true 
        },
        Hit:{
            title:"Hit",
            ex:{
                kr:'只包含造成伤害的攻击次数。',
                en:'The number of attack attempts that produced damage.'
            },
            DPS:false,
            HPS:'block',
            BM:false  
        },
        DHit:{
            title:"D.Hit",
            ex:{
                kr:'造成直击伤害的次数。',
                en:'The number of hits that were direct hit.'
            },
            DPS:false,
            HPS:'block',
            BM:false  
        },
        DHIT:{
            title:"D.HIT",
            ex:{
                kr:'造成直击伤害的百分比。',
                en:'The percentage of hits that were direct hits.'
            },
            DPS:false,
            HPS:'block',
            BM:true  
        },
        CHit:{
            title:"C.Hit",
            ex:{
                kr:'造成暴击伤害的攻击次数。',
                en:'The number of damaging attacks that were critical.'
            },
            DPS:false,
            HPS:'block',
            BM:false  
        },
        CHIT:{
            title:"C.HIT",
            ex:{
                kr:'暴击伤害攻击百分比。',
                en:'The percentage of damaging attacks that were critical.'
            },
            DPS:true,
            HPS:'block',
            BM:true  
        },
        CDHit:{
            title:"C.D.Hit",
            ex:{
                kr:'直击造成暴击伤害的次数。',
                en:'The number of hits that were critical as well as direct hit.'
            },
            DPS:false,
            HPS:'block',
            BM:false 
        },
        CDHIT:{
            title:"C.D.HIT",
            ex:{
                kr:'直击造成暴击伤害的百分比。',
                en:'The percentage of hits that were direct hits as well as critical hits.'
            },
            DPS:false,
            HPS:'block',
            BM:true 
        },
        Miss:{
            title:"Miss",
            ex:{
                kr:'未命中次数。',
                en:'The number of auto-attacks of CAs that produced a miss message.'
            },
            DPS:true,
            HPS:'block',
            BM:false 
        },        
        Avoid:{
            title:"Avoid",
            ex:{
                kr:'命中但是失效的攻击次数。(包括攻击被抵抗、反射、阻挡、躲闪等)',
                en:'Any type of failed attack that was not a miss.<br>This includes resists, reflects, blocks, dodging, etc.'
            },
            DPS:false,
            HPS:'block',
            BM:false
        },        
        MaxHit:{
            title:"MaxHit",
            ex:{
                kr:'造成最高伤害量的一次攻击。',
                en:'The highest single damaging hit.'
            },
            DPS:true,
            HPS:'block',
            BM:true
        },       
        DTaken:{
            title:"D.Taken",
            ex:{
                kr:'受到的伤害总量。',
                en:'The amount of damage this combatant received.'
            },
            DPS:false,
            HPS:'block',
            BM:false
        },       
        HTaken:{
            title:"H.Taken",
            ex:{
                kr:'受到的治疗总量。',
                en:'The amount of healing this combatant received.'
            },
            DPS:false,
            HPS:'block',
            BM:false
        },
        PARRY:{
            title:"PARRY",
            ex:{
                kr:'招架百分比。',
                en:'The percentage of hits that were parried.'
            },
            DPS:false,
            HPS:'block',
            BM:false
        },
        BLOCK:{
            title:"BLOCK",
            ex:{
                kr:'格挡百分比。',
                en:'The percentage of hits that were blocked.'
            },
            DPS:false,
            HPS:'block',
            BM:false
        },
        HPS:{
            title:"HPS",
            ex:{
                kr:'治疗量除以整场战斗的持续时间，每秒治疗。',
                en:'The healing total of the combatant divided by the duration of the encounter.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        Hper:{
            title:"H%",
            ex:{
                kr:'治疗量在整个队伍中的占比。',
                en:'The value represents the percent share of all healing done by allies in this encounter.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        Healed:{
            title:"Healed",
            ex:{
                kr:'造成的治疗总量。',
                en:'The amount of healing.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        EffHeal:{
            title:"Eff.Heal",
            ex:{
                kr:'有效治疗，即不包括过量治疗与伤害吸收盾的数据。',
                en:'The amount of healing except for Overheal and D.Shield value.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        DShield:{
            title:"D.Shield",
            ex:{
                kr:'被伤害吸收盾吸收的伤害量。(鼓舞, 什么什么之策, 什么什么的。)',
                en:'The amount of damage blocked by shield abilities of healer.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        OverHeal:{
            title:"OverHeal",
            ex:{
                kr:'已满血时受到的治疗即为过量治疗。',
                en:'The amount of healing that made flood over 100% of health.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        OHEAL:{
            title:"O.HEAL",
            ex:{
                kr:'治疗超过目标最大血量的百分比（数据为叠加）。',
                en:'The percentage of heals above target\'s Max HP.'
            },
            DPS:'block',
            HPS:true,
            BM:false
        },
        Heal:{
            title:"Heal",
            ex:{
                kr:'治疗的次数。',
                en:'The number of heals from this combatant.'
            },
            DPS:'block',
            HPS:false,
            BM:false
        },
        CHeal:{
            title:"C.Heal",
            ex:{
                kr:'治疗暴击的次数。',
                en:'The number of heals that were critical.'
            },
            DPS:'block',
            HPS:false,
            BM:false
        },
        CHEAL:{
            title:"C.HEAL",
            ex:{
                kr:'治疗暴击百分比。',
                en:'The percentage of heals that were critical.'
            },
            DPS:'block',
            HPS:false,
            BM:false
        },
        MaxHeal:{
            title:"MaxHeal",
            ex:{
                kr:'造成最高一次治疗量的治疗。',
                en:'The highest single healing amount.'
            },
            DPS:'block',
            HPS:false,
            BM:false
        },
        Dispel:{
            title:"Dispel",
            ex:{
                kr:'消除减益状态的次数。（驱散）',
                en:'The number of times the combatant dispelled.'
            },
            DPS:'block',
            HPS:false,
            BM:false
        },
        Absorb:{
            title:"Absorb",
            ex:{
                kr:'从其他目标吸收的血量。(例如. 浴血、其它。)',
                en:'The amount of power this combatant drained from others.<br>(ex. Mercy Stroke etc)'
            },
            DPS:false,
            HPS:false,
            BM:false
        },
        Replenish:{
            title:"Replenish",
            ex:{
                kr:'回复魔法值。(例如. 以太之流、其它。)',
                en:'The amount of power this combatant replenished to others.<br>(ex. Aetherflow etc)'
            },
            DPS:false,
            HPS:false,
            BM:false
        },
        Death:{
            title:"Death",
            ex:{
                kr:'玩家死亡次数。',
                en:'The number of times this character was killed by another.'
            },
            DPS:true,
            HPS:false,
            BM:true
        }   
    }
}
