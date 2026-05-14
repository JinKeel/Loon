/*
Loon 节点解析器 更新时间2026.05.13

功能：
1. 节点名称重命名
2. 删除节点名称字符
3. 保留指定节点
4. 删除指定节点
5. 自动添加/删除国旗

完全使用正则方式匹配!!!

完整示例：name=香港>HK+日本>JP&del=倍率|专线&keep=香港|日本&drop=官网|到期&emoji=1
━━━━━━━━━━━━━━━━━━
参数说明：

name 节点批量改名

示例:
name=香港>HK+日本>JP
━━━━━━━━━━━━━━━━━━
del 删除节点名称中的字符

示例:
del=倍率|专线
━━━━━━━━━━━━━━━━━━
keep 仅保留包含指定关键词的节点

示例:
keep=香港|日本
━━━━━━━━━━━━━━━━━━
drop 删除包含指定关键词的节点

示例:
drop=官网|到期
━━━━━━━━━━━━━━━━━━
emoji 控制国旗

示例:
emoji=1 自动添加国旗
emoji=0 删除所有国旗
━━━━━━━━━━━━━━━━━━
清除指定参数持久化：

示例:
name=$
━━━━━━━━━━━━━━━━━━
*/

const Loon_Type=$resourceType;
const Loon_Key="loon_parser_lite_"+encodeURIComponent(typeof $resourceUrl!="undefined"&&$resourceUrl?String($resourceUrl):"default_parser");

let Loon={name:"",del:"",keep:"",drop:"",emoji:""};

const Loon_Saved=$persistentStore.read(Loon_Key);

if(Loon_Saved){
    const c=JSON.parse(Loon_Saved);
    Loon.name=c.name||"";
    Loon.del=c.del||"";
    Loon.keep=c.keep||"";
    Loon.drop=c.drop||"";
    Loon.emoji=c.emoji||"";
}

const Loon_Argument=typeof $argument!="undefined"?$argument.toString():"";

if(Loon_Argument&&!Loon_Argument.startsWith("http")){
    let update=false;

    Loon_Argument.split("&").forEach(i=>{
        let [k,...v]=i.split("=");
        let key=k.trim().toLowerCase();
        let val=decodeURIComponent(v.join("=")).trim();

        if(!["name","del","keep","drop","emoji"].includes(key)){
            return;
        }

        if(key=="name"){
            Loon.name=val=="$"?"":val;
            update=true;
        }

        if(key=="del"){
            Loon.del=val=="$"?"":val;
            update=true;
        }

        if(key=="keep"){
            Loon.keep=val=="$"?"":val;
            update=true;
        }

        if(key=="drop"){
            Loon.drop=val=="$"?"":val;
            update=true;
        }

        if(key=="emoji"){
            if(val=="$"){
                Loon.emoji="";
            }else if(val==="0"||val==="1"){
                Loon.emoji=val;
            }
            update=true;
        }
    });

    if(update){
        $persistentStore.write(JSON.stringify(Loon),Loon_Key);
    }
}

let Loon_Error_Cache={};

const Loon_Notify={
    send:function(type,err){

        let key=type+":"+err;

        if(Loon_Error_Cache[key]){
            return;
        }

        Loon_Error_Cache[key]=1;

        if(typeof $notification!="undefined"){
            $notification.post(
                "Loon 资源解析器",
                "订阅",
                key
            );
        }
    }
};

function Loon_RegExp_Error(e){
    let m=String(e.message||e);

    if(/Unterminated group/i.test(m)){
        return "正则分组未闭合";
    }

    if(/Unterminated character class/i.test(m)){
        return "字符集 [] 未闭合";
    }

    if(/Nothing to repeat/i.test(m)){
        return "重复符号使用错误";
    }

    if(/Invalid regular expression/i.test(m)){
        return "正则表达式非法";
    }

    return m;
}

function Loon_SafeRegExp(p,f,t){
    try{
        return new RegExp(p,f);
    }catch(e){
        Loon_Notify.send(t,Loon_RegExp_Error(e));
        return null;
    }
}

const Loon_Utils={

    MAX_LEN:200,

    match:function(t,p,type){
        if(!t||!p)return false;

        p=String(p);

        if(p.length>this.MAX_LEN){
            return false;
        }

        let r=Loon_SafeRegExp(p,"i",type);

        if(!r){
            return false;
        }

        return r.test(t);
    },

    replace:function(t,p,s,type){
        if(!p||t===undefined)return t;

        p=String(p);

        if(p.length>this.MAX_LEN){
            return t;
        }

        let r=Loon_SafeRegExp(p,"gi",type);

        if(!r){
            return t;
        }

        return t.replace(r,s);
    },

    stripEmoji:function(t){
        return t.replace(/[\uD83C-\uD83E][\uDC00-\uDFFF]/g,"").replace(/[\u200D\uFE0F]/g,"").trim();
    },

    getFlag:function(t){

        const m={
            香港:"HK",台湾:"TW",日本:"JP",韩国:"KR",澳门:"MO",
            新加坡:"SG",马来西亚:"MY",泰国:"TH",越南:"VN",印度尼西亚:"ID",
            菲律宾:"PH",柬埔寨:"KH",老挝:"LA",缅甸:"MM",文莱:"BN",
            印度:"IN",巴基斯坦:"PK",孟加拉国:"BD",斯里兰卡:"LK",尼泊尔:"NP",
            美国:"US",加拿大:"CA",墨西哥:"MX",
            巴西:"BR",阿根廷:"AR",智利:"CL",秘鲁:"PE",哥伦比亚:"CO",
            英国:"GB",法国:"FR",德国:"DE",意大利:"IT",西班牙:"ES",
            葡萄牙:"PT",荷兰:"NL",比利时:"BE",瑞士:"CH",瑞典:"SE",
            挪威:"NO",丹麦:"DK",芬兰:"FI",冰岛:"IS",
            波兰:"PL",捷克:"CZ",匈牙利:"HU",乌克兰:"UA",俄罗斯:"RU",
            阿联酋:"AE",沙特阿拉伯:"SA",卡塔尔:"QA",以色列:"IL",
            伊朗:"IR",伊拉克:"IQ",
            南非:"ZA",埃及:"EG",摩洛哥:"MA",尼日利亚:"NG",肯尼亚:"KE",
            澳大利亚:"AU",新西兰:"NZ"
        };

        let u=t.toUpperCase(),c="";

        for(let k in m){
            if(u.includes(k)){
                c=m[k];
                break;
            }
        }

        if(!c){
            let r=u.match(/\b(HK|TW|JP|SG|KR|US|DE|GB|FR|MO|CA|AU|IN|RU|NL|IT|ES|CH|SE|NO|DK|FI|TR|TH|VN|MY|ID|PH|BR|ZA|AE|NZ|MX)\b/);

            if(r){
                c=r[1];
            }
        }

        return c?String.fromCodePoint(...[...c].map(e=>e.charCodeAt(0)+127397)):"";
    }
};

function Loon_Main(){

    const res=typeof $resource!="undefined"?$resource:"";

    if(Loon_Type!==1||!res){
        return res;
    }

    const rules=Loon.name?Loon.name.split("+").filter(Boolean):[];
    const dels=Loon.del?[Loon.del]:[];
    const keeps=Loon.keep?[Loon.keep]:[];
    const drops=Loon.drop?[Loon.drop]:[];

    const set=["udp=true","block-quic=true","fast-open=true"];

    return res.replace(/\r\n/g,"\n").split("\n").map(function(line){

        const c=line.trim();

        if(!c||c.startsWith("#")||!c.includes("=")){
            return c;
        }

        let i=c.indexOf("=");

        let n=c.slice(0,i).trim();
        let v=c.slice(i+1).trim();

        if(keeps.length>0&&!keeps.some(p=>Loon_Utils.match(n,p,"keep"))){
            return null;
        }

        if(drops.length>0&&drops.some(p=>Loon_Utils.match(n,p,"drop"))){
            return null;
        }

        dels.forEach(function(p){
            n=Loon_Utils.replace(n,p,"","del");
        });

        rules.forEach(function(p){

            let a=p.split(">");

            let o=a[0]?a[0].trim():"";
            let nv=a[1]?a[1].trim():"";

            if(!o){
                return;
            }

            n=Loon_Utils.replace(n,o,nv,"name");
        });

        if(Loon.emoji==="1"){

            let clean=Loon_Utils.stripEmoji(n);
            let flag=Loon_Utils.getFlag(clean);

            n=flag?flag+clean:clean;

        }else if(Loon.emoji==="0"){

            n=Loon_Utils.stripEmoji(n);
        }

        n=n.replace(/\s+/g," ").trim();

        set.forEach(function(kv){

            let key=kv.split("=")[0];

            let arr=v.split(",").map(function(s){
                return s.trim();
            });

            let idx=arr.findIndex(function(s){
                return s.startsWith(key+"=");
            });

            if(idx>-1){
                arr[idx]=kv;
            }else{
                arr.push(kv);
            }

            v=arr.join(", ");
        });

        return n+"="+v;

    }).filter(function(i){
        return i!==null;
    }).join("\n");
}

$done(Loon_Main());
