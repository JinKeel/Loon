const inputParams = $environment.params;
const nodeName = inputParams.nodeInfo.name;

$httpClient.get(
    { url: "http://ipwho.is/?lang=zh-CN", timeout: 5000, node: nodeName },
  function (err, res, data) {
        if (err) {
            $done({
                title: "查询超时",
                message: `节点「${nodeName}」连接检测超时请稍后再试`
            });
            return;
        }

        const ipwho = JSON.parse(data);

        const html = `
<p  style="text-align:center; font-family:-apple-system; line-height:1.9;">
    <br>

    <span style="font-size:19px; font-weight:600; color:#1599FF; font-family:Menlo;">
        ${ipwho.type}:${ipwho.ip}
    </span><br><br>

    <span style="font-size:15px; font-weight:400;">
        落地 ➤ ${ipwho.country_code} ${ipwho.country}
    </span><br>

    <span style="font-size:15px; font-weight:400;">
        运营 ➤ ${ipwho.connection.isp}
    </span>
</p>`;

        $done({
            title: "查询结果",
            htmlMessage: html
        });
    }
);
