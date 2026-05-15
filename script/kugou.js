let url = $request.url;
let body = $response.body;
let obj;

try {
    obj = JSON.parse(body);
} catch (e) {
    $done({body});
}

if (obj) {
    if (/youth\/v1\/ab\/tmeab\?ab_source=changtingdaily/.test(url)) {
        try {
            let d = obj.data;
            if (d) {
                if(d.TMEAB0ad0type?.mapParams) for(let k in d.TMEAB0ad0type.mapParams) d.TMEAB0ad0type.mapParams[k]="0";
                if(d.TMEAB0FreemiumExposureFix0type?.mapParams) for(let k in d.TMEAB0FreemiumExposureFix0type.mapParams) d.TMEAB0FreemiumExposureFix0type.mapParams[k]="0";
                if(d.TMEAB0FreemiumExposureFix0typeV2?.mapParams) for(let k in d.TMEAB0FreemiumExposureFix0typeV2.mapParams) d.TMEAB0FreemiumExposureFix0typeV2.mapParams[k]="0";
                if(d.TMEAB0vipplay0type?.mapParams) d.TMEAB0vipplay0type.mapParams.ad_seconds="0";
                if(d.TMEAB0vipcenter0type?.mapParams) d.TMEAB0vipcenter0type.mapParams.vipcenter_exposure="0";
                if(d.TMEAB0yinzhivip0type?.mapParams) d.TMEAB0yinzhivip0type.mapParams.yinzhivip_up="0";
                if(d.TMEAB0mianmo0type?.mapParams) { let m=d.TMEAB0mianmo0type.mapParams; m.vip_over="0"; m.pay_up="0"; }
                if(d.viphide?.mapParams) { let m=d.viphide.mapParams; m.video_play_hide="0"; m.song_mode_unvipsong="0"; m.video_mode_hide="0"; m.song_mode_hide="0"; }
                if(d.TMEAB0sharefree0type?.mapParams){ let m=d.TMEAB0sharefree0type.mapParams; m.share_free="0"; m.player="0"; }
                if(d.TMEAB0Pulltorefresh0type?.mapParams) d.TMEAB0Pulltorefresh0type.mapParams.interaction="0";
                if(d.collect?.mapParams){ let m=d.collect.mapParams; m.queue="0"; m.songlist="0"; }
                if(d.TMEAB0favtoast?.mapParams){ let m=d.TMEAB0favtoast.mapParams; m.type="0"; m.textType="0"; }
                if(d.playtiming?.mapParams) d.playtiming.mapParams.timing="none";
                if(d.TMEAB0audition0type?.mapParams){ let m=d.TMEAB0audition0type.mapParams; m.way="0"; m.secs="0"; }
                if(d.ringtone?.mapParams) for(let k in d.ringtone.mapParams) d.ringtone.mapParams[k]="0";
                if(d.TMEAB0deviceup0type?.mapParams) for(let k in d.TMEAB0deviceup0type.mapParams) d.TMEAB0deviceup0type.mapParams[k]="0";
                if(d.cube?.mapParams){ let m=d.cube.mapParams; m.home_mode="0"; m.play_page_mode="0"; m.dig_mode="0"; }
                if(d.changtingdaily?.mapParams){ let m=d.changtingdaily.mapParams; m.newuser="0"; m.daily="0"; }
                if(d.timecomment?.mapParams) d.timecomment.mapParams.timecomment="0";
            }
        } catch (e) {
            console.log("changtingdaily处理错误");
        }
    } 

    if (/youth\/v1\/ab\/tmeab\?ab_source=SearchListV2/.test(url)) {
        try {
            let d = obj.data;
            if(d){
                if(d.TMEAB0bofangballchudian0Type?.mapParams){ let m=d.TMEAB0bofangballchudian0Type.mapParams; m.is_show="0"; m.bar_time="0"; }
                if(d.landscapemode?.mapParams) d.landscapemode.mapParams.playpage_landscape="0";
                if(d.emptyqueue?.mapParams){ let m=d.emptyqueue.mapParams; m.position="none"; m.recomend="none"; }
                if(d.SearchListV2?.mapParams){ let m=d.SearchListV2.mapParams; m.topic="0"; m.Search_tab="0"; m.Collect="0"; m.Channel_blocking="0"; }
                if(d.TMEAB0notpay0splashinterval?.mapParams){ let m=d.TMEAB0notpay0splashinterval.mapParams; m.up_control="0_0"; m.is_show_up="0"; }
                if(d.TMEAB0WelcomePage0type?.mapParams) d.TMEAB0WelcomePage0type.mapParams.show="0";
                if(d.tzpost?.mapParams) d.tzpost.mapParams.newtzpost="0";
                if(d.TMEAB0svipnewguoqiup0Type?.mapParams){ let m=d.TMEAB0svipnewguoqiup0Type.mapParams; m.up_style="0"; m.after_time="0_0_0"; m.long_after_time="0_0_0"; m.before_time="0_0_0"; m.youth_up_style="0"; }
                if(d.TMEAB0vipshellwindow0type?.mapParams){ let m=d.TMEAB0vipshellwindow0type.mapParams; m.before_overdue="0"; m.before_overdue_control="0_0_0_0_0"; m.after_overdue="0"; m.overdue_control="0_0_0_0_0"; m.after_overdue_control="0_0_0_0_0"; }
                if(d.TMEAB0signin0type?.mapParams){ let m=d.TMEAB0signin0type.mapParams; m.signin_daily="0_0_0_0_0"; m.enter="0"; m.back_up="0_0_0_0_0"; }
                if(d.TMEAB0FreemiumModelTouchpoint0type?.mapParams) for(let k in d.TMEAB0FreemiumModelTouchpoint0type.mapParams) d.TMEAB0FreemiumModelTouchpoint0type.mapParams[k]="0";
                if(d.aiwritesong?.mapParams) d.aiwritesong.mapParams.aiwritesong="0";
                if(d.TMEAB0fmBidding?.mapParams){ let m=d.TMEAB0fmBidding.mapParams; m.allowRepeatRequest="0"; m.cacheCount="0"; m.rewardReqNewBeforeShow="0"; m.rewardLocalCache="0"; m.rewardReqInterval="0"; m.rewardReqNewTimeout="0"; m.disallowPreloadNext="1"; m.expires_interval="0"; m.rewardRealTimeReqInterval="0"; m.rewardAdLocalCache="0"; }
                if(d.TMEAB0wvipguoqiup0Type?.mapParams){ let m=d.TMEAB0wvipguoqiup0Type.mapParams; m.is_show="0"; m.svip_expire_day="0"; m.after_time="0_0_0"; m.long_after_time="0_0_0"; m.before_time="0_0_0"; }
                if(d.TMEAB0GNBad0splashexpcontrol?.mapParams) d.TMEAB0GNBad0splashexpcontrol.mapParams.front_5s="0";
                if(d.TMEAB0freesignin0type?.mapParams){ let m=d.TMEAB0freesignin0type.mapParams; m.enter="0"; m.free_signin_daily="0_0_0_0_0"; m.free_type="0"; }
                if(d.TMEAB0RECsources0type?.mapParams) d.TMEAB0RECsources0type.mapParams.is_show="0";
                if(d.TMEAB0TaskCenterEnter0type?.mapParams){ let m=d.TMEAB0TaskCenterEnter0type.mapParams; m.TFC="0_0"; m.style="0"; m.ad="0"; m.mypage="0_0_0_0_0"; m.TaskDone="0_0_0_0_0"; }
                if(d.TMEAB0EarningTab0type?.mapParams){ let m=d.TMEAB0EarningTab0type.mapParams; m.Animation="0_0_0_0"; m.Earning_Tab="0"; }
                if(d.TMEAB0OfflineH5) d.TMEAB0OfflineH5=[];
            }
        } catch (e) {
            console.log("SearchListV2处理错误");
        }
    }

    $done({body: JSON.stringify(obj)});
} else {
    $done({body});
}
