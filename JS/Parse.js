// 2026.6.30

var Type = $resourceType;

var include = "",
    exclude = "",
    del = "",
    rename = "",
    ua = false;

function safeReg(pattern, flags, label, errList) {
    try {
        if (!pattern) return null;
        return new RegExp(pattern, flags);
    } catch (e) {
        errList.push({
            title: label,
            pattern: pattern,
            reason: String(e && e.message || e)
        });
        return null;
    }
}

function base64Decode(str) {
    try {
        var pad = str.length % 4;
        if (pad === 2) str += "==";
        else if (pad === 3) str += "=";

        var bin = atob(str.replace(/_/g, "/").replace(/-/g, "+")),
            result = [];

        for (var i = 0; i < bin.length; i++) {
            result.push("%" + ("00" + bin.charCodeAt(i).toString(16)).slice(-2));
        }

        return decodeURIComponent(result.join(""));
    } catch (e) {
        return "";
    }
}

(function () {
    var arg = typeof $argument !== "undefined" ? $argument : null;

    if (arg && typeof arg === "object") {
        include = arg.include != null ? String(arg.include) : include;
        exclude = arg.exclude != null ? String(arg.exclude) : exclude;
        del = arg.del != null ? String(arg.del) : del;
        rename = arg.rename != null ? String(arg.rename) : rename;
        ua = arg.ua === true;
    }

    var source = $resource || "";

    if (ua && Type === 1 && $httpClient && $resourceUrl) {
        $httpClient.get(
            {
                url: String($resourceUrl),
                headers: {
                    "User-Agent": "Shadowrocket/2.2.70"
                }
            },
            function (err, resp, data) {
                $done(Type === 1 ? process(data || source) : String(data || ""));
            }
        );
    } else {
        $done(Type === 1 ? process(source) : String(source));
    }
})();

function process(content) {
    var errors = [];

    var str = String(content || "");
    if (str.charCodeAt(0) === 0xFEFF) str = str.slice(1);

    var text = str.replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim();

    if (!text) return "";

    var regExclude = exclude ? safeReg(exclude, "", "正则过滤", errors) : null,
        regInclude = include ? safeReg(include, "", "正则保留", errors) : null,
        regDelete = del ? safeReg(del, "g", "删除名称", errors) : null;

    var renameRules = [];

    if (rename) {
        var arr = rename.split(",");
        for (var i = 0; i < arr.length; i++) {
            var pos = arr[i].indexOf("+");
            if (pos > -1) {
                var key = arr[i].slice(0, pos).trim();
                if (key) {
                    var reg = safeReg(key, "g", "重新命名", errors);
                    if (reg) renameRules.push([reg, arr[i].slice(pos + 1).trim()]);
                }
            }
        }
    }

    var raw = text.replace(/\s+/g, "");
    if (raw && raw.length >= 16 && raw.length % 4 === 0 && /^[A-Za-z0-9+/=_-]+$/.test(raw)) {
        var decoded = base64Decode(raw);

        if (decoded) {
            if (decoded.charCodeAt(0) === 0xFEFF) decoded = decoded.slice(1);

            var lines = decoded.split("\n"),
                output = [];

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (!line) continue;

                var hash = line.lastIndexOf("#"),
                    name = "",
                    marked = false;

                if (hash > -1 && hash < line.length - 1) {
                    try {
                        name = decodeURIComponent(line.slice(hash + 1));
                    } catch (e) {
                        name = line.slice(hash + 1);
                    }
                    marked = true;
                } else {
                    var m = line.match(/[?&]remark=([^&#]*)/);
                    if (m) {
                        try {
                            name = decodeURIComponent(m[1]);
                        } catch (e) {
                            name = m[1];
                        }
                    }
                }

                if (!name) {
                    output.push(line);
                    continue;
                }

                if (regExclude && regExclude.test(name)) continue;
                if (regInclude && !regInclude.test(name)) continue;
                if (regDelete) name = name.replace(regDelete, "");

                for (var j = 0; j < renameRules.length; j++) {
                    name = name.replace(renameRules[j][0], renameRules[j][1]);
                }

                output.push(
                    marked
                        ? line.slice(0, hash + 1) + encodeURIComponent(name)
                        : line + "#" + encodeURIComponent(name)
                );
            }

            text = output.join("\n");
        } else {
            text = plain(text, regExclude, regInclude, regDelete, renameRules, errors);
        }
    } else {
        text = plain(text, regExclude, regInclude, regDelete, renameRules, errors);
    }

    if (errors.length) {
        var msg = errors.map(function (x) {
            return x.title + "错误\n" + x.pattern;
        }).join("\n\n");

        $notification.post("资源解析器", "", msg);
    }

    return text;
}

function plain(text, regExclude, regInclude, regDelete, renameRules, errors) {
    var lines = text.split("\n"),
        output = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        if (!line || line[0] === "#") {
            output.push(line);
            continue;
        }

        var eq = line.indexOf("=");

        if (eq > 0) {
            var name = line.slice(0, eq).trim();

            if (regExclude && regExclude.test(name)) continue;
            if (regInclude && !regInclude.test(name)) continue;
            if (regDelete) name = name.replace(regDelete, "");

            for (var j = 0; j < renameRules.length; j++) {
                name = name.replace(renameRules[j][0], renameRules[j][1]);
            }

            output.push(name + "=" + line.slice(eq + 1).trim());
        } else {
            output.push(line);
        }
    }

    return output.join("\n");
}
