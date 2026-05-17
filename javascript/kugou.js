let body = $response.body;
let obj = JSON.parse(body);

const setMap = (path, values) => {
    if (path?.mapParams) {
        Object.keys(values).forEach(key => {
            if (key in path.mapParams) {
                path.mapParams[key] = values[key];
            }
        });
    }
};

const clearArr = path => {
    if (Array.isArray(path)) {
        path.length = 0;
    }
};

setMap(obj.data.TMEAB0tgviptype0type, {
    songs_pop_ups_max: "0",
    singlesong_pop_ups_max: "0",
    Insert_ads_mode: "0",
    Insert_ads_timing: "0",
    Insert_ads_drag: "0",
    Insert_ads_point: "0:0",
    hide_tvbar: "1",
    vip_free_mode: "1",
    vip_free_times: "999999",
    vip_free_timeperiod: "999999"
});

setMap(obj.data.freeproject, {
    secondfloor: "0",
    freecard: "0"
});

setMap(obj.data.landscapemode, {
    playpage_landscape: "0"
});

setMap(obj.data.TMEAB0bofangballchudian0Type, {
    is_show: "0",
    bar_time: "0"
});

setMap(obj.data.TMEAB0WelcomePage0type, {
    show: "0"
});

setMap(obj.data.TMEAB0notpay0splashinterval, {
    up_control: "0",
    is_show_up: "0"
});

setMap(obj.data.TMEAB0barstyle0Type, {
    is_show: "0"
});

setMap(obj.data.TMEAB0svipnewguoqiup0Type, {
    up_style: "0",
    after_time: "0",
    long_after_time: "0",
    before_time: "0",
    youth_up_style: "0"
});

setMap(obj.data.TMEAB0vipshellwindow0type, {
    before_overdue: "0",
    before_overdue_control: "0",
    after_overdue: "0",
    overdue_control: "0",
    after_overdue_control: "0"
});

setMap(obj.data.TMEAB0signin0type, {
    signin_daily: "0",
    enter: "0",
    back_up: "0"
});

setMap(obj.data.TMEAB0FreemiumModelTouchpoint0type, {
    progress_bar_ad_autoshut: "1",
    hello_ad: "0",
    radio_down_ad_con: "0",
    progress_bar_ad: "0",
    player_top_ad: "0",
    radio_down_ad: "0",
    progress_bar_ad_con: "0",
    enter: "0",
    radio_down_noremind: "1",
    hello_ad_con: "0",
    today_act_min: "0",
    player_top_ad_con: "0"
});

setMap(obj.data.TMEAB0fmBidding, {
    allowRepeatRequest: "0",
    cacheCount: "0",
    rewardReqNewBeforeShow: "0",
    rewardLocalCacheSize: "0",
    rewardReqInterval: "999999",
    rewardReqNewTimeout: "0",
    disallowPreloadNext: "1",
    expires_interval: "0",
    rewardRealTimeReqInterval: "999999",
    rewardAdLocalCache: "0"
});

setMap(obj.data.TMEAB0wvipguoqiup0Type, {
    is_show: "0",
    svip_expire_day: "0",
    after_time: "0",
    long_after_time: "0",
    before_time: "0"
});

setMap(obj.data.TMEAB0GNBad0splashexpcontrol, {
    front_5s: "0"
});

setMap(obj.data.TMEAB0freesignin0type, {
    enter: "0",
    free_signin_daily: "0",
    free_type: "0"
});

setMap(obj.data.TMEAB0RECsources0type, {
    is_show: "0"
});

setMap(obj.data.newsongradio, {
    is_show: "0"
});

setMap(obj.data.TMEAB0TaskCenterEnter0type, {
    TFC: "0",
    style: "0",
    ad: "0",
    mypage: "0",
    TaskDone: "0"
});

setMap(obj.data.TMEAB0EarningTab0type, {
    Animation: "0",
    Earning_Tab: "0"
});

setMap(obj.data.cube, {
    home_mode: "0",
    play_page_mode: "0",
    dig_mode: "0"
});

setMap(obj.data.SearchListV2, {
    topic: "0",
    Search_tab: "0",
    Collect: "0",
    Channel_blocking: "0"
});

setMap(obj.data.TMEAB0sharefree0type, {
    player: "0",
    not_wxplay: "0",
    share_free: "0"
});

setMap(obj.data.tzpost, {
    newtzpost: "0"
});

setMap(obj.data.TMEAB0yinzhivip0type, {
    yinzhivip_up: "0"
});

setMap(obj.data.TMEAB0ad0type, {
    full_play: "0",
    notice: "0",
    fullplay_request: "0",
    syban: "0",
    round_play: "0",
    click: "0",
    comment: "0",
    syban_show: "0",
    syban_type: "0",
    diy_play: "0",
    act: "0",
    post: "0",
    syban_sort: "0"
});

setMap(obj.data.viphide, {
    video_play_hide: "1",
    song_mode_unvipsong: "1",
    video_mode_hide: "1",
    song_mode_hide: "1"
});

setMap(obj.data.ringtone, {
    playlist_qp: "0",
    player_qp: "0",
    ringtone_sq: "0",
    ringtone_qp: "0",
    ringtone_more: "0"
});

setMap(obj.data.TMEAB0mianmo0type, {
    pick_enter: "0",
    vip_over: "0",
    back_up: "0",
    low_threshold: "0",
    pay_up: "0"
});

setMap(obj.data.changtingdaily, {
    newuser: "0",
    daily: "0"
});

setMap(obj.data.TMEAB0songupfirst0Type, {
    play_track: "0",
    seek: "0",
    skip_track: "0"
});

setMap(obj.data.TMEAB0FreemiumExposureFix0typeV2, {
    popup_display: "0",
    hot_start: "0"
});

setMap(obj.data.TMEAB0Pulltorefresh0type, {
    interaction: "0"
});

setMap(obj.data.TMEAB0deviceup0type, {
    mjdevice_counttimes: "0",
    mjdevice_countstop: "0",
    mjdevice_noremind: "1",
    mjdevice_stop: "0",
    mjdevice_times: "0",
    mjdevice_day: "0",
    mjdevice_up: "0",
    mjdevice_noremindday: "0"
});

setMap(obj.data.TMEAB0vipcenter0type, {
    vipcenter_exposure: "0"
});

setMap(obj.data.TMEAB0FreemiumExposureFix0type, {
    hot_start: "0",
    api_resume_state: "0",
    api_init: "0",
    popup_display: "0",
    token_fix: "0",
    keep_front: "0"
});

setMap(obj.data.TMEAB0favtoast, {
    type: "0",
    textType: "0"
});

setMap(obj.data.TMEAB0vipplay0type, {
    vipplay_type: "0",
    ad_seconds: "0"
});

clearArr(obj.data.popupVIP);
clearArr(obj.data.promoteplay);
clearArr(obj.data.importlist);
clearArr(obj.data.popup);
clearArr(obj.data.Collects);
clearArr(obj.data.TMEAB0OfflineH5);
clearArr(obj.data.MusicHall);
clearArr(obj.data.SelfpageUI);
clearArr(obj.data.ExplorePageV5);
clearArr(obj.data.LongAudio);
clearArr(obj.data.TMEAB0landscapemode0type);

body = JSON.stringify(obj);

$done({ body });
