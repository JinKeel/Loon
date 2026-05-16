let body = $response.body;
let obj = JSON.parse(body);

if (!obj?.data) {
    $done({ body });
}

let d = obj.data;

const setAllZero = o => {
    for (let k in o) {
        o[k] = "0";
    }
};

const setKeys = (o, keys, val = "0") => {
    keys.forEach(k => {
        o[k] = val;
    });
};

if (d.TMEAB0ad0type?.mapParams) {
    setAllZero(d.TMEAB0ad0type.mapParams);
}

if (d.TMEAB0FreemiumExposureFix0type?.mapParams) {
    setAllZero(d.TMEAB0FreemiumExposureFix0type.mapParams);
}

if (d.TMEAB0FreemiumExposureFix0typeV2?.mapParams) {
    setAllZero(d.TMEAB0FreemiumExposureFix0typeV2.mapParams);
}

if (d.TMEAB0vipplay0type?.mapParams) {
    d.TMEAB0vipplay0type.mapParams.ad_seconds = "0";
}

if (d.TMEAB0vipcenter0type?.mapParams) {
    d.TMEAB0vipcenter0type.mapParams.vipcenter_exposure = "0";
}

if (d.TMEAB0yinzhivip0type?.mapParams) {
    d.TMEAB0yinzhivip0type.mapParams.yinzhivip_up = "0";
}

if (d.TMEAB0mianmo0type?.mapParams) {
    setKeys(d.TMEAB0mianmo0type.mapParams, [
        "vip_over",
        "pay_up"
    ]);
}

if (d.viphide?.mapParams) {
    setKeys(d.viphide.mapParams, [
        "video_play_hide",
        "song_mode_unvipsong",
        "video_mode_hide",
        "song_mode_hide"
    ]);
}

if (d.TMEAB0sharefree0type?.mapParams) {
    setKeys(d.TMEAB0sharefree0type.mapParams, [
        "share_free",
        "player"
    ]);
}

if (d.TMEAB0Pulltorefresh0type?.mapParams) {
    d.TMEAB0Pulltorefresh0type.mapParams.interaction = "0";
}

if (d.collect?.mapParams) {
    setKeys(d.collect.mapParams, [
        "queue",
        "songlist"
    ]);
}

if (d.TMEAB0favtoast?.mapParams) {
    setKeys(d.TMEAB0favtoast.mapParams, [
        "type",
        "textType"
    ]);
}

if (d.playtiming?.mapParams) {
    d.playtiming.mapParams.timing = "none";
}

if (d.TMEAB0audition0type?.mapParams) {
    setKeys(d.TMEAB0audition0type.mapParams, [
        "way",
        "secs"
    ]);
}

if (d.ringtone?.mapParams) {
    setAllZero(d.ringtone.mapParams);
}

if (d.TMEAB0deviceup0type?.mapParams) {
    setAllZero(d.TMEAB0deviceup0type.mapParams);
}

if (d.cube?.mapParams) {
    setKeys(d.cube.mapParams, [
        "home_mode",
        "play_page_mode",
        "dig_mode"
    ]);
}

if (d.changtingdaily?.mapParams) {
    setKeys(d.changtingdaily.mapParams, [
        "newuser",
        "daily"
    ]);
}

if (d.timecomment?.mapParams) {
    d.timecomment.mapParams.timecomment = "0";
}

if (d.TMEAB0bofangballchudian0Type?.mapParams) {
    setKeys(d.TMEAB0bofangballchudian0Type.mapParams, [
        "is_show",
        "bar_time"
    ]);
}

if (d.landscapemode?.mapParams) {
    d.landscapemode.mapParams.playpage_landscape = "0";
}

if (d.emptyqueue?.mapParams) {
    d.emptyqueue.mapParams.position = "none";
    d.emptyqueue.mapParams.recomend = "none";
}

if (d.SearchListV2?.mapParams) {
    setKeys(d.SearchListV2.mapParams, [
        "topic",
        "Search_tab",
        "Collect",
        "Channel_blocking"
    ]);
}

if (d.TMEAB0notpay0splashinterval?.mapParams) {
    d.TMEAB0notpay0splashinterval.mapParams.up_control = "0_0";
    d.TMEAB0notpay0splashinterval.mapParams.is_show_up = "0";
}

if (d.TMEAB0WelcomePage0type?.mapParams) {
    d.TMEAB0WelcomePage0type.mapParams.show = "0";
}

if (d.tzpost?.mapParams) {
    d.tzpost.mapParams.newtzpost = "0";
}

if (d.TMEAB0svipnewguoqiup0Type?.mapParams) {
    let m = d.TMEAB0svipnewguoqiup0Type.mapParams;

    m.up_style = "0";
    m.after_time = "0_0_0";
    m.long_after_time = "0_0_0";
    m.before_time = "0_0_0";
    m.youth_up_style = "0";
}

if (d.TMEAB0vipshellwindow0type?.mapParams) {
    let m = d.TMEAB0vipshellwindow0type.mapParams;

    m.before_overdue = "0";
    m.before_overdue_control = "0_0_0_0_0";
    m.after_overdue = "0";
    m.overdue_control = "0_0_0_0_0";
    m.after_overdue_control = "0_0_0_0_0";
}

if (d.TMEAB0signin0type?.mapParams) {
    let m = d.TMEAB0signin0type.mapParams;

    m.signin_daily = "0_0_0_0_0";
    m.enter = "0";
    m.back_up = "0_0_0_0_0";
}

if (d.TMEAB0FreemiumModelTouchpoint0type?.mapParams) {
    setAllZero(d.TMEAB0FreemiumModelTouchpoint0type.mapParams);
}

if (d.aiwritesong?.mapParams) {
    d.aiwritesong.mapParams.aiwritesong = "0";
}

if (d.TMEAB0fmBidding?.mapParams) {
    let m = d.TMEAB0fmBidding.mapParams;

    m.allowRepeatRequest = "0";
    m.cacheCount = "0";
    m.rewardReqNewBeforeShow = "0";
    m.rewardLocalCache = "0";
    m.rewardReqInterval = "0";
    m.rewardReqNewTimeout = "0";
    m.disallowPreloadNext = "1";
    m.expires_interval = "0";
    m.rewardRealTimeReqInterval = "0";
    m.rewardAdLocalCache = "0";
}

if (d.TMEAB0wvipguoqiup0Type?.mapParams) {
    let m = d.TMEAB0wvipguoqiup0Type.mapParams;

    m.is_show = "0";
    m.svip_expire_day = "0";
    m.after_time = "0_0_0";
    m.long_after_time = "0_0_0";
    m.before_time = "0_0_0";
}

if (d.TMEAB0GNBad0splashexpcontrol?.mapParams) {
    d.TMEAB0GNBad0splashexpcontrol.mapParams.front_5s = "0";
}

if (d.TMEAB0freesignin0type?.mapParams) {
    let m = d.TMEAB0freesignin0type.mapParams;

    m.enter = "0";
    m.free_signin_daily = "0_0_0_0_0";
    m.free_type = "0";
}

if (d.TMEAB0RECsources0type?.mapParams) {
    d.TMEAB0RECsources0type.mapParams.is_show = "0";
}

if (d.TMEAB0TaskCenterEnter0type?.mapParams) {
    let m = d.TMEAB0TaskCenterEnter0type.mapParams;

    m.TFC = "0_0";
    m.style = "0";
    m.ad = "0";
    m.mypage = "0_0_0_0_0";
    m.TaskDone = "0_0_0_0_0";
}

if (d.TMEAB0EarningTab0type?.mapParams) {
    let m = d.TMEAB0EarningTab0type.mapParams;

    m.Animation = "0_0_0_0";
    m.Earning_Tab = "0";
}

if (d.TMEAB0OfflineH5) {
    d.TMEAB0OfflineH5 = [];
}

body = JSON.stringify(obj);

$done({ body });
