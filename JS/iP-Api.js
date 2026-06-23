const inputParams = $environment.params;
const nodeName = inputParams.nodeInfo.name;

$httpClient.get(
    { url: "http://ip-api.com/json/?lang=zh-CN", timeout: 5000, node: nodeName },
    function (err, res, data) {
        if (err) {
            $done({
                title: "查询超时",
                message: `节点「${nodeName}」连接超时请稍后再试`
            });
            return;
        }

        const ipwho = JSON.parse(data);

        if (ipwho.status !== "success") {
            $done({
                title: "查询失败",
                message: "接口返回异常或返回无内容"
            });
            return;
        }

        const html = `
<p style="text-align:center; font-family:-apple-system; line-height:1.8;">
    <br>

    <span style="font-size:17.2px; font-weight:600;color:#1599FF;">
        IP ${ipwho.query}
    </span>

    <span style="color:#AAA;">─────────────────────</span><br>

    <span style="font-size:15px; font-weight:500;">
        位置：${ipwho.country} ${ipwho.countryCode}
    </span><br>

    <span style="font-size:15px; font-weight:500;">
        城市：${ipwho.regionName}
    </span><br>

    <span style="font-size:15px; font-weight:500;">
        运营：${ipwho.isp}
    </span><br>

    <span style="color:#AAA;">─────────────────────</span><br>

    <span style="font-size:15px; font-weight:500;color:#7077FF;">
        节点${nodeName}
    </span>
</p>`;

        $done({
            title: "查询结果",
            htmlMessage: html
        });
    }
);
