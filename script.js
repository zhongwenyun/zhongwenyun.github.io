var MIN = 1;
var MAX = 1;
var index = MIN;
var show_pinyin = false;

var NOT_PLAYABLE = [' ', '，', '。', '？',];

var DICT = {
    ' ': [' ', ' ', " ", ' '],
    '，': [',', '，', ",", '，'],
    '。': ['.', '。', " ", '。'],
    '？': ['?', '？', "?", '？'],
    '你': ['🫵', '你', "nǐ", '你'],
    '尔': ['🧵', '尔', "ěr", '爾'],
    '是': ['🟰', '是', "shì", '是'],
    '早': ['🌅', '早', "zǎo", '早'],
    '止': ['🦶', '止', "zhǐ", '止'],
    '人': ['🧍', '人', "rén", '人'],
    '他': ['👦', '他', "tā", '他'],
    '她': ['👧', '她', "tā", '她'],
    '也': ['✔️', '也', "yě", '也'],
    '匜': ['🫖', '匜', "yí", '匜'],
    '爱': ['❤️', '爱', "ài", '愛'],
    '旡': ['🧎', '旡', "jì", '旡'],
    '心': ['🫀', '心', "xīn", '心'],
    '㤅': ['❤️', '㤅', "ài", '㤅'],
    '肉': ['🍖', '肉', "ròu", '肉'],
    '不': ['🙅', '不', "bù", '不'],
    '柎': ['🌻', '柎', "fū", '柎'],
    '女': ['🚺', '女', "nǚ", '女'],
    '男': ['🚹', '男', "nán", '男'],
    '田': ['🌾', '田', "tián", '田'],
    '力': ['💪', '力', "lì", '力'],
    '一': ['1️⃣', '一', "yī", '一'],
    '吗': ['🤷', '吗', "ma", '嗎'],
    '口': ['👄', '口', "kǒu", '口'],
    '马': ['🐎', '马', "mǎ", '馬'],
    '和': ['➕', '和', "hé", '和'],
    '禾': ['🌾', '禾', "hé", '禾'],
    '二': ['2️⃣', '二', "èr", '二'],
    '三': ['3️⃣', '三', "san", '三'],
};

var OGG = {
	"nǐ": "https://upload.wikimedia.org/wikipedia/commons/7/73/Zh-n%C7%90.ogg",
	"shì": "https://upload.wikimedia.org/wikipedia/commons/6/60/Zh-sh%C3%AC.ogg",
	"zǎo": "https://upload.wikimedia.org/wikipedia/commons/8/83/Zh-z%C7%8Eo.ogg",
	"zhǐ": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zh-zh%C7%90.ogg",
	"rén": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Zh-r%C3%A9n.ogg",
	"tā": "https://upload.wikimedia.org/wikipedia/commons/0/09/Zh-t%C4%81.ogg",
	"yě": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Zh-y%C4%9B.ogg",
	"yí": "https://upload.wikimedia.org/wikipedia/commons/2/29/Zh-y%C3%AD.ogg",
	"ài": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Zh-%C3%A0i.ogg",
	"jì": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zh-j%C3%AC.ogg",
	"xīn": "https://upload.wikimedia.org/wikipedia/commons/6/64/Zh-x%C4%ABn.ogg",
	"ròu": "https://upload.wikimedia.org/wikipedia/commons/2/28/Zh-r%C3%B2u.ogg",
	"bù": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Zh-b%C3%B9.ogg",
	"nǚ": "https://upload.wikimedia.org/wikipedia/commons/7/73/Zh-n%C7%9A.ogg",
	"nán": "https://upload.wikimedia.org/wikipedia/commons/1/15/Zh-n%C3%A1n.ogg",
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
		span.innerHTML = DICT[ETYM[hanzi][1][i]][0];
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
		span.innerHTML = DICT[ETYM[hanzi][1][i]][2];
		span.setAttribute("class", "pinyin");
		if (!show_pinyin) {
			span.setAttribute("hidden", true);
		}
		td.appendChild(span);
	}
	return table;
}

function show_etymology(hanzi) {
	var order = document.getElementById("order");
	order.src = STROKE[hanzi];
	var space = document.getElementById("space");
	space.removeAttribute("hidden");
	var etymology = document.getElementById("etymology");
	etymology.removeAttribute("hidden");
	var category = document.getElementById("category");
	category.innerHTML = ETYM[hanzi][0];
	var composition = document.getElementById("composition");
	composition.innerHTML = "";
	composition.appendChild(make_table(hanzi));
	var note = document.getElementById("note");
	if (ETYM[hanzi].length >= 3) {
		note.innerHTML = ETYM[hanzi][2];
	} else {
		note.innerHTML = "";
	}
}

function toggle_pinyin() {
	show_pinyin = !show_pinyin;
}

function update_pinyin() {
	var pinyins = document.querySelectorAll(".pinyin");
    for (i = 0; i < pinyins.length; ++i) {
		if (show_pinyin) {
			pinyins[i].removeAttribute("hidden");
		} else {
			pinyins[i].setAttribute("hidden", true);
		}
    }
}

function get_path() {
    return location.protocol + '//' + location.host + location.pathname;
}

function update_path() {
    var new_loc = get_path() + "?index=" + String(index);
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

function play(sentence) {
    var player = document.getElementById("player");
    for (var i = 0; i < sentence.length; ++i) {
		player.src = OGG[DICT[sentence[i]][2]];
        player.play();
		if (sentence.length > 1) {
			wait(1000);
		}
    }
}

function explain(hanzi) {
	play(hanzi);
	show_etymology(hanzi);
}

function page_init() {
	MAX = document.querySelectorAll(".segment").length;
	
    const url = window.location.toLocaleString();
    const params = new URL(url).searchParams;
    if (params.has("index")) {
        if (index_out_of_range()) {
            normalize_index();
            update_path();
        }
        var curr_p = document.getElementById(String(index));
        curr_p.setAttribute("hidden", true);
        index = Number(params.get("index"));
        var next_p = document.getElementById(String(index));
        next_p.removeAttribute("hidden");
    }

    var next_btn = document.getElementById("next");
    next_btn.onclick = function() {
        if (increment()) {
            update_path();
        }
    };
	
	var pinyin_btn = document.getElementById("pinyin");
    pinyin_btn.onclick = function() {
        toggle_pinyin();
		update_pinyin();
    };

    var prev_btn = document.getElementById("prev");
    prev_btn.onclick = function() {
        if (decrement()) {
            update_path();
        }
    };

	var lines = document.querySelectorAll(".segment");
    for (var i = 0; i < lines.length; ++i) {
		var data = lines[i].innerHTML;
		lines[i].innerHTML = "";
		var table = document.createElement("table");
		for (var j = 0; j < 3; ++j) {
			var tr = table.insertRow();
			for (var k = 0; k < data.length; ++k) {
				if (k == 0) {
					var empty = tr.insertCell();
					var space = document.createElement("span");
					space.innerHTML = ' ';
					if (j == 2) {
						space.setAttribute("class", "pinyin");
						if (!show_pinyin) {
							space.setAttribute("hidden", true);
						}
					}
					empty.appendChild(space);
				}
				var td = tr.insertCell();
				var span = document.createElement("span");
				span.innerHTML = DICT[data[k]][j];
				if (j == 1) {
					if (!NOT_PLAYABLE.includes(span.innerHTML)) {
						span.setAttribute("class", "explainable");
						span.setAttribute("onclick", "explain('" + span.innerHTML + "')");
					}
				} else if (j == 2) {
					span.setAttribute("class", "pinyin");
					if (!show_pinyin) {
						span.setAttribute("hidden", true);
					}
				}
				td.appendChild(span);
			}
		}
		lines[i].appendChild(table);
	}
}

page_init();
