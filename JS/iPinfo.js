const inputParams = $environment.params;
const nodeName = inputParams.nodeInfo.name;

$httpClient.get(
    { url: "http://ipwho.is/?lang=zh-CN", timeout: 5000, node: nodeName },
  function (err, res, data) {
        if (err) {
            $done({
                title: "查询超时",
                message: `节点「${nodeName}」连接超时请稍后再试`
            });
            return;
        }

        const ipwho = JSON.parse(data);

        const html = `
<p  style="text-align:center; font-family:-apple-system; line-height:1.8;">
    <br>
		
		<span style="font-size:17.2px; font-weight:600;color:#1599FF;">
        IP ${ipwho.ip}
    </span>
		
		<span style="color:#AAA;">─────────────────────</span><br>

    <span style="font-size:15px; font-weight:500;">
        落地：${ipwho.country_code} ${ipwho.country}
    </span><br>

    <span style="font-size:15px; font-weight:500;">
        运营：${ipwho.connection.isp}
    </span><br>
		
		<span style="font-size:15px; font-weight:500;">
        策略：${nodeName}
    </span>
    </p>`;

        $done({
            title: "查询结果",
            htmlMessage: html
        });
    }
);
