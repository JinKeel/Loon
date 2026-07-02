var mode = $resourceType;
var keep = "";
var wipe = "";
var drop = "";
var name = "";
var ua = false;

(function parse() {
    var args = $argument;
    if (args && typeof args === "object") {
        keep = args.keep != null ? String(args.keep) : keep;
        wipe = args.wipe != null ? String(args.wipe) : wipe;
        drop = args.drop != null ? String(args.drop) : drop;
        name = args.name != null ? String(args.name) : name;
        ua = args.ua === true;
    }
})();

(function main() {
    var input = $resource || "";

    if (ua && mode === 1 && $httpClient && $resourceUrl) {
        $httpClient.get(
            {
                url: String($resourceUrl),
                headers: { "User-Agent": "Shadowrocket/2.2.70" }
            },
            function (fault, state, reply) {
                $done(mode === 1 ? sift(reply || input) : String(reply || ""));
            }
        );
    } else {
        $done(mode === 1 ? sift(input) : String(input));
    }
})();

function note(array) {
    if (typeof $notification !== "undefined") {
        $notification.post("资源解析器", "正则错误", array.join("\n"));
    }
}

function sift(input) {
    var stage = String(input || "");
    if (stage.charCodeAt(0) === 0xFEFF) stage = stage.slice(1);

    var block = stage.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
    if (!block) return "";

    var match = null;
    var clear = null;
    var loose = null;
    var wrong = [];

    if (keep) {
        try { match = new RegExp(keep); } catch (e) { wrong.push(keep); }
    }
    if (wipe) {
        try { clear = new RegExp(wipe, "g"); } catch (e) { wrong.push(wipe); }
    }
    if (drop) {
        try { loose = new RegExp(drop); } catch (e) { wrong.push(drop); }
    }

    var alter = [];
    if (name) {
        var items = name.split("+");
        for (var i = 0; i < items.length; i++) {
            var split = items[i].indexOf(":");
            if (split > -1) {
                var key = items[i].slice(0, split).trim();
                if (key) {
                    try {
                        var reg = new RegExp(key, "g");
                        alter.push([reg, items[i].slice(split + 1).trim()]);
                    } catch (e) {
                        wrong.push(key);
                    }
                }
            }
        }
    }

    if (wrong.length > 0) {
        note(wrong);
        return block;
    }

    var base = block.replace(/\s+/g, "");
    if (base && base.length >= 16 && base.length % 4 === 0 && /^[A-Za-z0-9+/=_-]+$/.test(base)) {
        try {
            var pad = base.length % 4;
            if (pad === 2) base += "==";
            else if (pad === 3) base += "=";
            var bin = atob(base.replace(/_/g, "/").replace(/-/g, "+")), out = [];
            for (var i = 0; i < bin.length; i++) {
                out.push("%" + ("00" + bin.charCodeAt(i).toString(16)).slice(-2));
            }
            var plain = decodeURIComponent(out.join(""));
            
            if (plain) {
                if (plain.charCodeAt(0) === 0xFEFF) plain = plain.slice(1);
                var lines = plain.split("\n"), output = [];

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i].trim();
                    if (!line) continue;

                    var hash = line.lastIndexOf("#"), title = "", coded = false;
                    if (hash > -1 && hash < line.length - 1) {
                        try { title = decodeURIComponent(line.slice(hash + 1)); } catch (e) { title = line.slice(hash + 1); }
                        coded = true;
                    } else {
                        var m = line.match(/[?&]remark=([^&#]*)/);
                        if (m) {
                            try { title = decodeURIComponent(m[1]); } catch (e) { title = m[1]; }
                        }
                    }

                    if (!title) {
                        output.push(line);
                        continue;
                    }

                    if (loose && loose.test(title)) continue;
                    if (match && !match.test(title)) continue;
                    if (clear) title = title.replace(clear, "");

                    for (var j = 0; j < alter.length; j++) {
                        title = title.replace(alter[j][0], alter[j][1]);
                    }

                    output.push(
                        coded
                            ? line.slice(0, hash + 1) + encodeURIComponent(title)
                            : line + "#" + encodeURIComponent(title)
                    );
                }
                block = output.join("\n");
            }
        } catch (e) {
            block = tweak(block, match, clear, loose, alter);
        }
    } else {
        block = tweak(block, match, clear, loose, alter);
    }

    return block;
}

function tweak(block, match, clear, loose, alter) {
    var lines = block.split("\n");
    var final = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        if (!line || line[0] === "#") {
            final.push(line);
            continue;
        }

        var sign = line.indexOf("=");
        if (sign > 0) {
            var label = line.slice(0, sign).trim();
            
            if (loose && loose.test(label)) continue;
            if (match && !match.test(label)) continue;
            if (clear) label = label.replace(clear, "").trim();

            for (var j = 0; j < alter.length; j++) {
                label = label.replace(alter[j][0], alter[j][1]);
            }

            final.push(label + "=" + line.slice(sign + 1).trim());
        } else {
            final.push(line);
        }
    }

    return final.join("\n");
}
