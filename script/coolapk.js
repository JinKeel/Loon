let body = $response.body;
let obj = JSON.parse(body);

if (!obj?.data || !Array.isArray(obj.data)) {
    $done({ body });
}

obj.data = obj.data.filter(item => item.entityId !== 24455);

obj.data.forEach(item => {

    if (item.extraDataArr) {
        for (let k in item.extraDataArr) {

            if (/Ad|Splash|GROWTH|redPacket/i.test(k)) {
                item.extraDataArr[k] = "0";
            }

            if (/HttpDns|HttpDnsServer|reportExpose|reportProgress|PushHost|PostHost|Api\.Host|MediaPlayer/i.test(k)) {
                item.extraDataArr[k] = "";
            }

            if (/APP_ID|APP_KEY|useDDI|DDIEvent|SessionId/i.test(k)) {
                item.extraDataArr[k] = "0";
            }

            if (Array.isArray(item.extraDataArr[k])) {
                item.extraDataArr[k] = [];
            }
        }
    }

    let ID = [];

    if (item.entityId === 6390) {
        ID = [420, 417, 415, 1710, 2759];
    }

    else if (item.entityId === 20305) {
        ID = [790, 813, 2258, 2894, 2191];
    }

    else if (item.entityId === 20131) {
        ID = [2953, 1175, 2892, 2893, 2018];
    }

    if (ID.length > 0 && item.entities) {

        let arr = [];

        ID.forEach(id => {
            item.entities.forEach(e => {
                if (e.entityId === id) {
                    arr.push(e);
                }
            });
        });

        item.entities = arr;
    }
});

body = JSON.stringify(obj);

$done({ body });
