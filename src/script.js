var MIN = 1;
var MAX = 1;
var index = MIN;
var scrollPos = 0;
var etym = "";
var last_pinyin_height = 0;
var difference = 0;
var show_pinyin = false;

var NOT_PLAYABLE = [' ', '，', '。', '？',];

var EMOJI_INDEX = 0;
var PINYIN_INDEX = 1;
var TRAD_INDEX = 2;
var DICT = {
    ' ': [' ', " "],
    '，': [',', " "],
    '。': ['.', " "],
    '？': ['?', " "],
	
	/*etymology*/
    '尔': ['🧵', "ěr", '爾'],
    '早': ['🌅', "zǎo"],
    '止': ['🦶', "zhǐ"],
    '匜': ['🫖', "yí"],
    '旡': ['🧎', "jì"],
    '心': ['🫀', "xīn"],
    '㤅': ['❤️', "ài"],
    '柎': ['🌻', "fū"],
    '田': ['🌾', "tián"],
    '力': ['💪', "lì"],
    '口': ['👄', "kǒu"],
    '马': ['🐎', "mǎ", '馬'],
    '禾': ['🌱', "hé"],
    '二': ['2️⃣', "èr"],
	'目': ['👁️', "mù"],
	'足': ['🦶', "zú"],
    '何': ['🤷', "hé"],
	
	/*lesson 1*/
    '你': ['🫵', "nǐ"],
    '是': ['🟰', "shì"],
    '人': ['🧍', "rén"],
    '他': ['👉👦', "tā"],
    '她': ['👉👧', "tā"],
    '也': ['✔️', "yě"],
    '爱': ['❤️', "ài", '愛'],
    '肉': ['🍖', "ròu"],
    '不': ['🙅', "bù"],
    '女人': ['🚺🧍', "nǚrén"],
    '女': ['🚺', "nǚ"],
	'呢': ['🤔', "ne"],
    '男人': ['🚹🧍', "nánrén"],
    '男': ['🚹', "nán"],
    '一个': ['1️⃣🧮', "yīge", '一個'],
    '一': ['1️⃣', "yī"],
    '个': ['🧮', "gè", '個'],
    '吗': ['🤷', "ma", '嗎'],
    '和': ['➕', "hé"],
    '两个': ['2️⃣🧮', "liǎngge", '兩個'],
    '两': ['2️⃣', "liǎng", '兩'],
    '三个': ['3️⃣🧮', "sānge", '三個'],
    '三': ['3️⃣', "sān"],
	
	/*lesson 2*/
	'有': ['✊', "yǒu"],
	'嘴巴': ['👄', "zuǐba"],
	'嘴': ['👄', "zuǐ"],
	'巴': ['👄', "ba"],
	'眼睛': ['👁️', "yǎnjing"],
	'眼': ['👁️', "yǎn"],
	'睛': ['👁️', "jīng"],
	'还有': ['➕✊', "háiyǒu", "還有"],
	'还': ['➕', "hái", '還'],
	'鼻子': ['👃', "bízi"],
	'鼻': ['👃', "bí"],
	'子': ['👶', "zǐ"],
	'手': ['🖐', "shǒu"],
	'脚': ['🦶', "jiǎo", '腳'],
	'耳朵': ['👂', "ěrduo"],
	'耳': ['👂', "ěr", '耳'],
	'朵': ['👂', "duǒ"],
	'没有': ['🙅✊', "méiyou", "沒有"],
	'没': ['🙅', "méi", "沒"],
    '走': ['🚶', "zǒu"],
    '在': ['📍', "zài"],//📍🌏
	'山上': ['🏔️⬆️', "shānshang"],
    '山': ['🏔️', "shān"],
    '上': ['⬆️', "shàng"],
	'树木': ['🌳', "shùmù", "樹木"],
	'树': ['🌳', "shù", "樹"],
    '木': ['🌳', "mù"],
    '石头': ['🪨', "shítou", "石頭"],
    '石': ['🪨', "shí"],
    '头': ['🪨', "tóu", "頭"],
    '水': ['💧', "shuǐ"],
    '一步': ['1️⃣👣', "yíbù"],
    '步': ['👣', "bù"],
    '跑': ['🏃', "pǎo"],
    '了': ['🔄', "le"],
    '为什么': ['🤌🤷', "wèishénme", '為什麼'],
	'为': ['🤌', "wèi", '為'],
	'什么': ['🤷', "shénme", '什麼'],
	'什': ['🤷', "shén"],
	'么': ['🤷', "me", '麼'],
    '因为': ['💁🤌', "yīnwèi", '因為'],
    '因': ['💁', "yīn"],
    '虫子': ['🪰', "chóngzi", '蟲子'],
    '虫': ['🪰', "chóng", '蟲'],
	
	'天上': ['🌤️⬆️', "tiānshang"],
    '天': ['🌤️', "tiān"],
	'日': ['☀️', "rì"],
};

/*
🌅💯🟦
天很蓝。

☁️🙅‍♂️@🌅⬆️
云不在天上。

🚹@🌅⬇️
他在天下。

🚹@🌏⬆️
他在地上。
*/

var OGG = {
	/*etymology*/
	"zǎo": "https://upload.wikimedia.org/wikipedia/commons/8/83/Zh-z%C7%8Eo.ogg",
	"zhǐ": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zh-zh%C7%90.ogg",
	"yí": "https://upload.wikimedia.org/wikipedia/commons/2/29/Zh-y%C3%AD.ogg",
	"jì": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zh-j%C3%AC.ogg",
	"xīn": "https://upload.wikimedia.org/wikipedia/commons/6/64/Zh-x%C4%ABn.ogg",
	
	/*lesson 1*/
	"nǐ": "https://upload.wikimedia.org/wikipedia/commons/7/73/Zh-n%C7%90.ogg",
	"shì": "https://upload.wikimedia.org/wikipedia/commons/6/60/Zh-sh%C3%AC.ogg",
	"rén": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Zh-r%C3%A9n.ogg",
	"tā": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zh-t%C4%81.ogg",
	"yě": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Zh-y%C4%9B.ogg",
	"ài": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Zh-%C3%A0i.ogg",
	"ròu": "https://upload.wikimedia.org/wikipedia/commons/2/28/Zh-r%C3%B2u.ogg",
	"bù": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Zh-b%C3%B9.ogg",
	"nǚrén": "https://upload.wikimedia.org/wikipedia/commons/7/75/Zh-nur%C3%A9n.ogg",
	"nǚ": "https://upload.wikimedia.org/wikipedia/commons/7/73/Zh-n%C7%9A.ogg",
	"nánrén": "https://upload.wikimedia.org/wikipedia/commons/2/29/Zh-n%C3%A1nr%C3%A9n.ogg",
	"nán": "https://upload.wikimedia.org/wikipedia/commons/1/15/Zh-n%C3%A1n.ogg",
	
	/*lesson 2*/
	"tián": "https://upload.wikimedia.org/wikipedia/commons/5/50/Zh-ti%C3%A1n.ogg",
	"lì": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Zh-l%C3%AC.ogg",
	"yī": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Zh-y%C4%AB.ogg",
	"ma": "https://upload.wikimedia.org/wikipedia/commons/3/37/Zh-ma.ogg",
	"kǒu": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Zh-k%C7%92u.ogg",
	"mǎ": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Zh-m%C7%8E.ogg",
	"hé": "https://upload.wikimedia.org/wikipedia/commons/7/78/Zh-h%C3%A9.ogg",
	"èr": "https://upload.wikimedia.org/wikipedia/commons/5/51/Zh-%C3%A8r.ogg",
};

var ETYM = {
	'你': ["phono-semantic compound", "人和尔是你", "Alternatively, ideogrammic compound: 人 (person) + 尔 (you)."],
	'是': ["phono-semantic compound", "早和止是是", "As early as in late bronze inscriptions, the lower part of 早 split off and combined with 止 to give 昰, which carried over to the small seal script. Shuowen considers this a compound of 日 + 正 (i.e. as the upright sun)."],
	'人': ["pictogram", "人是人", "Side view of a standing man, highlighting the arms and legs."],
	'他': ["phono-semantic compound", "人和也是他", "Corrupted form of 佗."],
	'她': ["phono-semantic compound", "女和也是她", "Originally a variant of 姐. Later repurposed as a feminine third-person pronoun influenced by European languages, with the glyph being the result of replacing the 人 radical in 他 with 女 radical."],
	'也': ["phonetic loan", "也是匜", "The traditional glyph origin given in Shuowen explains the character to be a pictogram of female genitalia.<br>It is possibly a pictogram of an ancient funnel or wash basin. It may be an early form of 匜.<br>It was once interchangeable with 它 and may have originated as a simplification."],
	'爱': ["phono-semantic compound", "心和旡是㤅", "As early as the Qin dynasty, a meaningless component 夊 was added to the bottom of the character.<br>Further corruption turned the original phonetic 旡 into ⿱爫冖."],
	'肉': ["pictogram", "肉是肉", "Ribs of an animal’s torso or simply a physical representation of a slice of meat."],
	'不': ["phonetic loan", "不是柎", "The calyx of a flower. 不 was then composed into a phono-semantic character with the pictograph for mouth (口), to form 否, representing “no” (negation). This composed meaning then spread back to the original character 不, making it a synonym of 否. A new character of 柎 was eventually created to represent the original meaning of calyx."],
	'女': ["pictogram", "女是女", "A woman with breasts kneeling or standing. In modern form turned on left side: enclosed area is remnant of left breast (character's left, depicted woman's right), while right breast has disappeared."],
	'男': ["ideogrammic compound", "田和力是男", "A man providing the strength for agricultural and/or other kinds of (physical) labour on a field."],
	'一': ["ideogram", "一是一", "A horizontal stroke, indicating the number “one”."],
	'吗': ["phono-semantic compound", "口和马是吗"],
	'和': ["phono-semantic compound", "口和禾是和"],
	'二': ["ideogram", "二是二", "Two parallel strokes, indicating the number “two”."],
};

var STROKE = {
	'你': "https://upload.wikimedia.org/wikipedia/commons/e/ee/%E4%BD%A0-order.gif",
	'是': "https://upload.wikimedia.org/wikipedia/commons/4/4f/%E6%98%AF-order.gif",
	'人': "https://upload.wikimedia.org/wikipedia/commons/f/fd/%E4%BA%BA-order.gif",
	'他': "https://upload.wikimedia.org/wikipedia/commons/a/ae/%E4%BB%96-order.gif",
	'她': "https://upload.wikimedia.org/wikipedia/commons/2/2c/%E5%A5%B9-order.gif",
	'也': "https://upload.wikimedia.org/wikipedia/commons/9/9c/%E4%B9%9F-order.gif",
	'爱': "https://upload.wikimedia.org/wikipedia/commons/d/d8/%E7%88%B1-order.gif",
	'肉': "https://upload.wikimedia.org/wikipedia/commons/0/0e/%E8%82%89-order.gif",
	'不': "https://upload.wikimedia.org/wikipedia/commons/5/55/%E4%B8%8D-order.gif",
	'女': "https://upload.wikimedia.org/wikipedia/commons/8/85/%E5%A5%B3-order.gif",
	'男': "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
	'一': "https://upload.wikimedia.org/wikipedia/commons/7/7c/%E4%B8%80-order.gif",
	'吗': "https://upload.wikimedia.org/wikipedia/commons/e/e3/%E5%90%97-order.gif",
	'和': "https://upload.wikimedia.org/wikipedia/commons/3/3b/%E5%92%8C-order.gif",
	'二': "https://upload.wikimedia.org/wikipedia/commons/8/8e/%E4%BA%8C-order.gif",
};

var BACK = {
	'🌤️': "blue",
};

String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
}

var PS_COMP = ['ℹ️', ' ', '🗣️', ' ', '✍️'];
var PS_COMP_INFO = ["semantic component", "", "phonetic component", "", "written result"];

var P_COMP = ['🖼️', ' ', '✍️'];
var P_COMP_INFO = ["pictographic component", "", "written result"];

var PL_COMP = ['🖼️', ' ', '🆕'];
var PL_COMP_INFO = ["original pictographic component", "", "new glyph for the original meaning"];

var IC_COMP = ['💭', ' ', '💭', ' ', '💡'];
var IC_COMP_INFO = ["semantic component", "", "semantic component", "", "abstract idea"];

var I_COMP = ['💭', ' ', '✍️'];
var I_COMP_INFO = ["semantic component", "", "written result"];

function make_table(hanzi) {
	var table = document.createElement("table");
	var symbol_row = table.insertRow();
	for (var i = 0; i < ETYM[hanzi][1].length; ++i) {
		var td = symbol_row.insertCell();
		var span = document.createElement("span");
		span.innerHTML = DICT[ETYM[hanzi][1][i]][EMOJI_INDEX];
		td.appendChild(span);
	}
	var hanzi_row = table.insertRow();
	for (i = 0; i < ETYM[hanzi][1].length; ++i) {
		var td = hanzi_row.insertCell();
		var span = document.createElement("span");
		span.innerHTML = ETYM[hanzi][1][i];
		span.setAttribute("class", "playable");
		span.setAttribute("onclick", "play('" + span.innerHTML + "')");
		td.appendChild(span);
	}
	if (ETYM[hanzi][0] == "phono-semantic compound") {
		var info_row = table.insertRow();
		for (var i = 0; i < PS_COMP.length; ++i) {
			var td = info_row.insertCell();
			var span = document.createElement("span");
			span.innerHTML = PS_COMP[i];
			if (PS_COMP_INFO[i] != "") { 
				span.setAttribute("title", PS_COMP_INFO[i]);
				span.setAttribute("class", "info");
			}
			td.appendChild(span);
		}
	} else if (ETYM[hanzi][0] == "pictogram") {
		var info_row = table.insertRow();
		for (var i = 0; i < P_COMP.length; ++i) {
			var td = info_row.insertCell();
			var span = document.createElement("span");
			span.innerHTML = P_COMP[i];
			if (P_COMP_INFO[i] != "") { 
				span.setAttribute("title", P_COMP_INFO[i]);
				span.setAttribute("class", "info");
			}
			td.appendChild(span);
		}
	} else if (ETYM[hanzi][0] == "phonetic loan") {
		var info_row = table.insertRow();
		for (var i = 0; i < PL_COMP.length; ++i) {
			var td = info_row.insertCell();
			var span = document.createElement("span");
			span.innerHTML = PL_COMP[i];
			if (PL_COMP_INFO[i] != "") { 
				span.setAttribute("title", PL_COMP_INFO[i]);
				span.setAttribute("class", "info");
			}
			td.appendChild(span);
		}
	} else if (ETYM[hanzi][0] == "ideogrammic compound") {
		var info_row = table.insertRow();
		for (var i = 0; i < IG_COMP.length; ++i) {
			var td = info_row.insertCell();
			var span = document.createElement("span");
			span.innerHTML = IG_COMP[i];
			if (IG_COMP_INFO[i] != "") { 
				span.setAttribute("title", IG_COMP_INFO[i]);
				span.setAttribute("class", "info");
			}
			td.appendChild(span);
		}
	} else if (ETYM[hanzi][0] == "ideogram") {
		var info_row = table.insertRow();
		for (var i = 0; i < I_COMP.length; ++i) {
			var td = info_row.insertCell();
			var span = document.createElement("span");
			span.innerHTML = I_COMP[i];
			if (I_COMP_INFO[i] != "") { 
				span.setAttribute("title", I_COMP_INFO[i]);
				span.setAttribute("class", "info");
			}
			td.appendChild(span);
		}
	}
	var pinyin_row = table.insertRow();
	for (i = 0; i < ETYM[hanzi][1].length; ++i) {
		var td = pinyin_row.insertCell();
		var span = document.createElement("span");
		span.innerHTML = DICT[ETYM[hanzi][1][i]][PINYIN_INDEX];
		span.setAttribute("class", "pinyin");
		if (!show_pinyin) {
			span.setAttribute("hidden", true);
		}
		td.appendChild(span);
	}
	return table;
}

function explain(hanzi) {
	if (ETYM[hanzi] == null) {
		etym = "";
	} else {
		etym = hanzi;
	}
	var order = document.getElementById("order");
	if (STROKE[hanzi] == null) {
		order.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
	} else {
		order.src = STROKE[hanzi];
	}
	var space = document.getElementById("space");
	space.removeAttribute("hidden");
	var etymology = document.getElementById("etymology");
	etymology.removeAttribute("hidden");
	var category = document.getElementById("category");
	if (ETYM[hanzi] == null) {
		category.innerHTML = "coming soon"
	} else {
		category.innerHTML = ETYM[hanzi][0];
	}
	var composition = document.getElementById("composition");
	if (ETYM[hanzi] == null) {
		composition.innerHTML = "coming soon";
	} else {
		composition.innerHTML = "";
		composition.appendChild(make_table(hanzi));
	}
	var note = document.getElementById("note");
	if (ETYM[hanzi] == null) {
		note.innerHTML = "coming soon";
	} else {
		if (ETYM[hanzi].length >= 3) {
			note.innerHTML = ETYM[hanzi][2];
		} else {
			note.innerHTML = "";
		}
	}
}

function toggle_pinyin() {
	show_pinyin = !show_pinyin;
}

function update_pinyin() {
	if (!show_pinyin && difference != 0) {
		window.scrollTo(window.scrollX, window.scrollY - difference);
	}
	var pinyins = document.querySelectorAll(".pinyin");
    for (i = 0; i < pinyins.length; ++i) {
		if (show_pinyin) {
			pinyins[i].removeAttribute("hidden");
		} else {
			pinyins[i].setAttribute("hidden", true);
		}
    }
	if (show_pinyin) {
		var new_pinyin_height = document.getElementById("pinyin_tr").clientHeight;
		difference = new_pinyin_height - last_pinyin_height;
		window.scrollTo(window.scrollX, window.scrollY + difference);
		last_pinyin_height = new_pinyin_height;
	} else {
		last_pinyin_height = document.getElementById("pinyin_tr").clientHeight;
	}
}

function get_base_path() {
	return location.protocol + '//' + location.host;
}

function get_path() {
    return get_base_path() + location.pathname;
}

function update_path(path) {
	path = path == null ? get_path() : path;
    var new_loc = path + "?index=" + String(index);
	if (scrollPos != 0) {
		new_loc += "&scroll=" + String(scrollPos);
	}
	if (etym != "") {
		new_loc += "&etym=" + etym;
	}
	if (show_pinyin) {
		new_loc += "&pinyin=1";
	}
    window.location.replace(new_loc);
}

function index_out_of_range() {
    return index < MIN || index > MAX;
}

function normalize_index() {
    index = Math.max(MIN, index);
    index = Math.min(MAX, index);
}

function increment() {
    var old = index;
    index = Math.min(MAX, index + 1);
    return old != index;
}

function decrement() {
    var old = index;
    index = Math.max(MIN, index - 1);
    return old != index;
}

function play(word) {
    var player = document.getElementById("player");
	player.src = OGG[DICT[word][PINYIN_INDEX]];
	player.play();
}

function play_and_explain(hanzi) {
	play(hanzi);
	explain(hanzi);
}

function hide(elem) {
	elem.setAttribute("hidden", true);
}

function unhide(elem) {
	elem.removeAttribute("hidden");
}

function hide_dummy() {
	var dummy = document.getElementById('0');
	hide(dummy);
}

function get_data_array(data) {
	var result = [];
	for (var i = 0; i < data.length; ++i) {
		var temp = data[i]
		if (i < data.length-1 && DICT[temp + data[i+1]] != null) {
			temp += data[i+1];
			++i;
		} else if (i < data.length-2 && DICT[temp + data[i+1] + data[i+2]] != null) {
			temp += data[i+1] + data[i+2];
			i += 2;
		}
		result.push(temp);
	}
	return result;
}

function make_char_span(hanzi) {
	var char_span = document.createElement("span");
	char_span.innerHTML = hanzi;
	if (!NOT_PLAYABLE.includes(hanzi)) {
		var isPlayable = (OGG[DICT[hanzi][PINYIN_INDEX]] != null);
		var isExplainable = (ETYM[hanzi] != null);
		if (isPlayable && isExplainable) {
			char_span.classList.add("playable");
			char_span.classList.add("explainable");
			char_span.setAttribute("onclick", "play_and_explain('" + hanzi + "')");
		} else if (isPlayable) {
			char_span.classList.add("playable");
			char_span.setAttribute("onclick", "play('" + hanzi + "')");
		} else if (isExplainable) {
			char_span.classList.add("explainable");
			char_span.setAttribute("onclick", "explain('" + hanzi + "')");
		}
	}
	return char_span;
}

function get_emoji_array(data) {
	var string = DICT[data][EMOJI_INDEX];
	var i = 0;
	var result = [];
	var temp = "";
	while (i < string.length) {
		temp += string[i];
		if (EMOJIS.includes(temp)) {
			result.push(temp);
			temp = "";
		}
		++i;
	}
	if (EMOJIS.includes(temp)) {
		result.push(temp);
		temp = "";
	}
	return result;
}

function make_curr_table() {
	var curr_p = document.getElementById(String(index)).querySelector(".segment");

	var data = get_data_array(curr_p.innerHTML);
	curr_p.innerHTML = "";
	
	var table = document.createElement("table");
	
	var colgroup = "<colgroup>"
	for (var i = 0; i < data.length; ++i) {
		if (i == 0) {
			colgroup += "<col>";
		} else {
			colgroup += "<col class=\"bordered\">";
		}
	}
	colgroup += "</colgroup>";
	table.innerHTML = colgroup;
	
	var emoji_row = table.insertRow();
	for (i = 0; i < data.length; ++i) {
		if (i == 0) {
			var empty = emoji_row.insertCell();
			var space = document.createElement("span");
			space.innerHTML = String(index) + ':';
			space.setAttribute("class", "sentence");
			empty.setAttribute("rowspan", 3);
			empty.appendChild(space);
		}
		var td = emoji_row.insertCell();
		var span = document.createElement("span");
		span.innerHTML = DICT[data[i]][EMOJI_INDEX];
		td.appendChild(span);
	}
	
	var hanzi_row = table.insertRow();
	for (i = 0; i < data.length; ++i) {
		var td = hanzi_row.insertCell();
		if (data[i].length == 1) {
			var char_span = make_char_span(data[i]);
			td.appendChild(char_span);
		} else if (data[i].length > 1) {
			// entire word playable
			if (OGG[DICT[data[i]][PINYIN_INDEX]] != null) {
				var span = document.createElement("span");
				if (!NOT_PLAYABLE.includes(data[i])) {
					span.classList.add("playable");
					span.setAttribute("onclick", "play('" + data[i] + "')");
				}
				for (var j = 0; j < data[i].length; ++j) {
					var char_span = document.createElement("span");
					char_span.innerHTML = data[i][j];
					if (!NOT_PLAYABLE.includes(data[i][j]) && ETYM[data[i][j]] != null) {
						char_span.classList.add("explainable");
						char_span.setAttribute("onclick", "explain('" + data[i][j] + "')");
					}
				}
				td.appendChild(span);
			} else {
				// play only single chars
				for (var j = 0; j < data[i].length; ++j) {
					var char_span = make_char_span(data[i][j])
					td.appendChild(char_span);
				}
			}
		}
	}
	
	var pinyin_row = table.insertRow();
	pinyin_row.setAttribute("id", "pinyin_tr");
	for (i = 0; i < data.length; ++i) {
		var td = pinyin_row.insertCell();
		var span = document.createElement("span");
		span.innerHTML = DICT[data[i]][PINYIN_INDEX];
		span.setAttribute("class", "pinyin");
		if (!show_pinyin) {
			span.setAttribute("hidden", true);
		}
		td.appendChild(span);
	}
	
	curr_p.appendChild(table);
}

function page_init() {
	var actual_length = document.querySelectorAll(".segment").length;
	MAX = actual_length == 0 ? actual_length+1 : actual_length;
	
    const url = window.location.toLocaleString();
    const params = new URL(url).searchParams;
    if (params.has("scroll")) {
        scrollPos = Number(params.get("scroll"));
    }
    if (params.has("etym")) {
        etym = params.get("etym");
    }
    if (params.has("pinyin")) {
        show_pinyin = Number(params.get("pinyin")) == 1;
    }
    if (params.has("index")) {
        index = Number(params.get("index"));
        if (index_out_of_range()) {
            normalize_index();
            update_path();
        }
    }
	make_curr_table();
	var curr_section = document.getElementById(String(index));
	hide_dummy();
	unhide(curr_section);
	if (show_pinyin && actual_length > 0) {
		update_pinyin();
	}
	if (etym != "") {
		explain(etym);
	}
	if (scrollPos != 0) {
		window.scrollTo(0, scrollPos);
	}
	var pinyin_tr = document.getElementById("pinyin_tr");
	last_pinyin_height = pinyin_tr == null ? 0 : pinyin_tr.clientHeight;

    var next_btn = document.getElementById("next");
	if (next_btn != null) {
		next_btn.onclick = function() {
			scrollPos = Math.round(window.scrollY);
			if (increment()) {
				update_path();
			} else {
				var array = location.pathname.rsplit("/", 1);
				var temp = Number(array[1].split(".html")[0]);
				temp = array[0] + "/0" + String(temp+1) + ".html";
				index = 1;
				update_path(temp);
			}
		};
	}
	
	var pinyin_btn = document.getElementById("pinyin");
	if (pinyin_btn != null) {
		pinyin_btn.onclick = function() {
			toggle_pinyin();
			update_pinyin();
		};
	}

    var prev_btn = document.getElementById("prev");
	if (prev_btn != null) {
		prev_btn.onclick = function() {
			if (decrement()) {
				scrollPos = Math.round(window.scrollY);
				update_path();
			} else {
				var array = location.pathname.rsplit("/", 1);
				var temp = Number(array[1].split(".html")[0]);
				if (temp > 1) {
					temp = array[0] + "/0" + String(temp-1) + ".html";
					index = 999;
					scrollPos = Math.round(window.scrollY);
					update_path(temp);
				}
			}
		};
	}
}

page_init();
