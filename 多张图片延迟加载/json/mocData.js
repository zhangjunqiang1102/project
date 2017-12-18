var ary = [
    {
        "id": 1,
        "title": "勤政日历·省委书记|6地书记学习中央统一领导的规定",
        "figure": "img/1.jpg",
        "comment": 100,
        "link": "http://news.sina.cn/mrdx/swsj.d.html?cre=tianyi&mod=wnews&loc=0&r=-1&doct=0&rfunc=67&tj=none&tr=73&vt=4&pos=3"
    },
    {
        "id": 2,
        "title": "章莹颖家人计划明日回国 案件是否延期审判未定",
        "figure": "img/2.jpg",
        "comment": 97,
        "link": "http://news.sina.cn/sh/2017-11-11/detail-ifynshev5246310.d.html?cre=tianyi&mod=wnews&loc=1&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 3,
        "title": "上海浦东一家超市发生坍塌多人被埋 致1人遇难",
        "figure": "img/3.jpg",
        "comment": 70,
        "link": "http://news.sina.cn/gn/2017-11-11/detail-ifynshev5276174.d.html?cre=tianyi&mod=wnews&loc=2&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 4,
        "title": "山西官方回应幼童校园被袭事件：施暴者已被刑拘",
        "figure": "img/4.jpg",
        "comment": 591,
        "link": "http://news.sina.cn/2017-11-11/detail-ifynsait7262878.d.html?cre=tianyi&mod=wnews&loc=3&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 5,
        "title": "中国留学生加拿大失联 警方:或接恐吓电话躲起来",
        "figure": "img/5.jpg",
        "comment": 83,
        "link": "http://news.sina.cn/2017-11-11/detail-ifynsait7271765.d.html?cre=tianyi&mod=wnews&loc=4&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 6,
        "title": "复旦版“中国医院排行榜”公布 这些医院排名靠前",
        "figure": "img/6.jpg",
        "comment": 380,
        "link": "http://news.sina.cn/2017-11-11/detail-ifynrsrf3816830.d.html?cre=tianyi&mod=wnews&loc=5&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 7,
        "title": "赵薇股神人设崩塌 是演技太好还是我们入戏太深？",
        "figure": "img/7.jpg",
        "comment": 546,
        "link": "http://news.sina.cn/2017-11-11/detail-ifynsait7310451.d.html?cre=tianyi&mod=wnews&loc=6&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 8,
        "title": "特朗普和普京批准联合声明:将共同打击IS直至消灭",
        "figure": "img/8.jpg",
        "comment": 100,
        "link": "http://news.sina.cn/gj/2017-11-11/detail-ifynshev5289601.d.html?cre=tianyi&mod=wnews&loc=7&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    },
    {
        "id": 9,
        "title": "法国男子撞伤3名中国留学生 检方按谋杀案调查",
        "figure": "img/9.jpg",
        "comment": 100,
        "link": "http://news.sina.cn/gj/2017-11-11/detail-ifynrsrf3768828.d.html?cre=tianyi&mod=wnews&loc=8&r=25&doct=0&rfunc=67&tj=none&tr=25&vt=4&pos=3"
    }
];
var data = [];
for (var i = 1; i <= 1000; i++) {
    var ran = Math.round(Math.random() * 8),
        res = ary[ran];
    data.push({
        id: i,
        title: res.title,
        figure: res.figure,
        comment: res.comment,
        link: res.link
    });
}
var fs = require('fs');
fs.writeFileSync('./news.json', JSON.stringify(data), 'utf-8');