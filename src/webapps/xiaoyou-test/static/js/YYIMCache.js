/**
 * 自定义数据结构，用于存储对象结构数据
 */
function BaseList() {
    this.list = {};
    this.array = [];
}

BaseList.prototype.set = function(key, val, sortFun) {
    if (key && val) {
        var item = this.get(key),
            index;
        if (item) {
            index = this.array.indexOf(item);
        }

        if (index > -1 && item) {
            this.array.splice(index, 1, val);
        } else {
            this.array.push(val);
        }

        this.list[key] = val;

        if (typeof sortFun == 'function') {
            this.array.sort.call(this.array, sortFun);
        }
        return val;
    }
};

BaseList.prototype.get = function(key) {
    if (key) {
        return this.list[key];
    }
};

BaseList.prototype.getAll = function() {
    return this.array;
};

BaseList.prototype.getFirst = function() {
    return this.array.slice(0, 1)[0];
};

BaseList.prototype.getLast = function() {
    return this.array.slice(-1)[0];
};

BaseList.prototype.getPrev = function(key) {
    if (this.get(key)) {
        var index = this.array.indexOf(this.get(key));
        if (index > 0) {
            return this.array[index - 1];
        }
    }
};

BaseList.prototype.getNext = function(key) {
    if (this.get(key)) {
        var index = this.array.indexOf(this.get(key));
        if (index > -1) {
            return this.array[index + 1];
        }
    }
};

BaseList.prototype.remove = function(key) {
    if (key) {
        var item = this.get(key),
            index;
        this.list[key] = null;
        delete this.list[key];
        if (item) {
            index = this.array.indexOf(item);
            if (index > -1) {
                return this.array.splice(index, 1)[0];
            }
        }
        return [];
    }
};

BaseList.prototype.update = function(key, val) {
    return this.set.apply(this, arguments);
};

BaseList.prototype.length = function() {
    return this.array.length;
};

BaseList.prototype.clear = function() {
    for (var x in this.list) {
        if (this.list.hasOwnProperty(x)) {
            this.list[x] = null;
            delete this.list[x];
        }
    }
    this.array.splice(0, this.array.length);
    this.array.length = 0;
};

BaseList.prototype.indexOf = function() {
    return this.array.indexOf.apply(this.array, arguments);
};

BaseList.prototype.includes = function() {
    return this.array.includes.apply(this.array, arguments);
};

BaseList.prototype.lastIndexOf = function() {
    return this.array.lastIndexOf.apply(this.array, arguments);
};

BaseList.prototype.sort = function() {
    return this.array.sort.apply(this.array, arguments);
};

BaseList.prototype.some = function() {
    return this.array.some.apply(this.array, arguments);
};

BaseList.prototype.every = function() {
    return this.array.every.apply(this.array, arguments);
};

BaseList.prototype.map = function() {
    return this.array.map.apply(this.array, arguments);
};

BaseList.prototype.filter = function() {
    return this.array.filter.apply(this.array, arguments);
};

BaseList.prototype.forEach = function() {
    return this.array.forEach.apply(this.array, arguments);
};

BaseList.prototype.keys = function() {
    if (Object.keys) {
        return Object.keys(this.list);
    } else {
        var keys = [];
        for (var x in this.list) {
            if (this.list.hasOwnProperty(x)) {
                keys.push(x);
            }
        }
        return keys;
    }
};
var YYIMCache = (function(YYIMChat) {
    var ColorUtil = (function() {

        function getColor(str) {
            if (str) {
                var str_md5 = hex_md5(str);
                var str_md5_initial = str_md5.substr(0, 1);
                switch (str_md5_initial) {
                    case 'a':
                        return '#fa4f52';
                    case 'b':
                        return '#29b6f6';
                    case 'c':
                        return '#81c684';
                    case 'd':
                        return '#f39801';
                    case 'e':
                        return '#b587fa';

                    case 'f':
                        return '#fa4f52';
                    case 'g':
                        return '#29b6f6';
                    case 'h':
                        return '#81c684';
                    case 'i':
                        return '#f39801';
                    case 'j':
                        return '#b587fa';

                    case 'k':
                        return '#fa4f52';
                    case 'l':
                        return '#29b6f6';
                    case 'm':
                        return '#81c684';
                    case 'n':
                        return '#f39801';
                    case 'o':
                        return '#b587fa';

                    case 'p':
                        return '#fa4f52';
                    case 'q':
                        return '#29b6f6';
                    case 'r':
                        return '#81c684';
                    case 's':
                        return '#f39801';
                    case 't':
                        return '#b587fa';

                    case 'u':
                        return '#fa4f52';
                    case 'v':
                        return '#29b6f6';
                    case 'w':
                        return '#81c684';
                    case 'x':
                        return '#f39801';
                    case 'y':
                        return '#b587fa';
                    case 'z':
                        return '#fa4f52';

                    case '0':
                        return '#29b6f6';
                    case '1':
                        return '#81c684';
                    case '2':
                        return '#f39801';
                    case '3':
                        return '#b587fa';
                    case '4':
                        return '#fa4f52';
                    case '5':
                        return '#29b6f6';
                    case '6':
                        return '#81c684';
                    case '7':
                        return '#f39801';
                    case '8':
                        return '#b587fa';
                    case '9':
                        return '#fa4f52';

                    case '#':
                    default:
                        return '#29b6f6';
                }
            }
        }
        return {
            getColor: getColor
        };
    })();

    /**
     * 汉字转拼音工具
     * @author rongqb 20170224
     * 功能一，首字母拼写：getInitial 
     * 功能二，全拼：getIntegrated 
     */
    var SpellUtil = (function() {
        var mapping = [
            ['A', '阿吖嗄腌锕'],
            ['Ai', '埃挨哎唉哀皑癌蔼矮艾碍爱隘捱嗳嗌嫒瑷暧砹锿霭'],
            ['An', '鞍氨安俺按暗岸胺案谙埯揞庵桉铵鹌黯'],
            ['Ang', '肮昂盎'],
            ['Ao', '凹敖熬翱袄傲奥懊澳坳嗷岙廒遨媪骜獒聱螯鏊鳌鏖'],
            ['Ba', '芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸茇菝岜灞钯粑鲅魃'],
            ['Bai', '白柏百摆佰败拜稗捭掰'],
            ['Ban', '斑班搬扳般颁板版扮拌伴瓣半办绊阪坂钣瘢癍舨'],
            ['Bang', '邦帮梆榜膀绑棒磅镑傍谤蒡浜'],
            ['Beng', '蚌崩绷甭泵蹦迸嘣甏'],
            ['Bao', '苞胞包褒薄雹保堡饱宝抱报暴豹鲍爆曝勹葆孢煲鸨褓趵龅'],
            ['Bo', '剥玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳亳啵饽檗擘礴钹鹁簸跛踣'],
            ['Bei', '杯碑悲卑北辈背贝钡倍狈备惫焙被孛陂邶蓓呗悖碚鹎褙鐾鞴'],
            ['Ben', '奔苯本笨畚坌锛'],
            ['Bi', '逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必壁臂避陛匕俾荜荸萆薜吡哔狴庳愎滗濞弼妣婢嬖璧贲睥畀铋秕裨筚箅篦舭襞跸髀'],
            ['Pi', '辟坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬丕仳陴邳郫圮埤鼙芘擗噼庀淠媲纰枇甓罴铍癖疋蚍蜱貔'],
            ['Bian', '鞭边编贬扁便变卞辨辩辫遍匾弁苄忭汴缏煸砭碥窆褊蝙笾鳊'],
            ['Biao', '标彪膘表婊骠飑飙飚镖镳瘭裱鳔'],
            ['Bie', '鳖憋别瘪蹩'],
            ['Bin', '彬斌濒滨宾摈傧豳缤玢槟殡膑镔髌鬓'],
            ['Bing', '兵冰柄丙秉饼炳病并禀邴摒'],
            ['Bu', '捕卜哺补埠不布步簿部怖卟逋瓿晡钚钸醭'],
            ['Ca', '擦嚓礤'],
            ['Cai', '猜裁材才财睬踩采彩菜蔡'],
            ['Can', '餐参蚕残惭惨灿骖璨粲黪'],
            ['Cang', '苍舱仓沧藏伧'],
            ['Cao', '操糙槽曹草嘈漕螬艚'],
            ['Ce', '厕策侧册测恻'],
            ['Ceng', '层蹭曾噌'],
            ['Cha', '插叉茬茶查碴搽察岔诧猹馇汊姹杈槎檫锸镲衩'],
            ['Chai', '差拆柴豺侪钗瘥虿'],
            ['Chan', '搀掺蝉馋谗缠铲产阐颤冁谄蒇廛忏潺澶孱羼婵骣觇禅蟾躔'],
            ['Chang', '昌猖场尝常长偿肠厂敞畅唱倡伥鬯苌菖徜怅惝阊娼嫦昶氅鲳'],
            ['Chao', '超抄钞朝嘲潮巢吵炒怊晁焯耖'],
            ['Che', '车扯撤掣彻澈坼砗'],
            ['Chen', '郴臣辰尘晨忱沉陈趁衬谌谶抻嗔宸琛榇碜龀'],
            ['Cheng', '撑称城橙成呈乘程惩澄诚承逞骋秤丞埕枨柽塍瞠铖铛裎蛏酲'],
            ['Chi', '吃痴持池迟弛驰耻齿侈尺赤翅斥炽傺墀茌叱哧啻嗤彳饬媸敕眵鸱瘛褫蚩螭笞篪豉踟魑'],
            ['Shi', '匙师失狮施湿诗尸虱十石拾时食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试谥埘莳蓍弑轼贳炻礻铈舐筮豕鲥鲺'],
            ['Chong', '充冲虫崇宠重茺忡憧铳舂艟'],
            ['Chou', '抽酬畴踌稠愁筹仇绸瞅丑臭俦帱惆瘳雠'],
            ['Chu', '初出橱厨躇锄雏滁除楚础储矗搐触处亍刍怵憷绌杵楮樗褚蜍蹰黜'],
            ['Chuai', '揣搋嘬膪踹'],
            ['Chuan', '川穿椽传船喘串舛遄氚钏舡'],
            ['Chuang', '疮窗床闯创怆'],
            ['Zhuang', '幢桩庄装妆撞壮状僮'],
            ['Chui', '吹炊捶锤垂陲棰槌'],
            ['Chun', '春椿醇唇淳纯蠢莼鹑蝽'],
            ['Chuo', '戳绰啜辍踔龊'],
            ['Ci', '疵茨磁雌辞慈瓷词此刺赐次茈祠鹚糍'],
            ['Cong', '聪葱囱匆从丛苁淙骢琮璁枞'],
            ['Cou', '凑楱辏腠'],
            ['Cu', '粗醋簇促卒蔟徂猝殂酢蹙蹴'],
            ['Cuan', '蹿篡窜汆撺爨镩'],
            ['Cui', '摧崔催脆瘁粹淬翠萃啐悴璀榱毳'],
            ['Cun', '村存寸忖皴'],
            ['Cuo', '磋撮搓措挫错厝嵯脞锉矬痤鹾蹉'],
            ['Da', '搭达答瘩打大耷哒怛妲褡笪靼鞑'],
            ['Dai', '呆歹傣戴带殆代贷袋待逮怠埭甙呔岱迨绐玳黛'],
            ['Dan', '耽担丹单郸掸胆旦氮但惮淡诞蛋儋凼萏菪啖澹宕殚赕眈疸瘅聃箪'],
            ['Tan', '弹坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭郯昙忐钽锬覃'],
            ['Dang', '当挡党荡档谠砀裆'],
            ['Dao', '刀捣蹈倒岛祷导到稻悼道盗叨氘焘纛'],
            ['De', '德得的锝'],
            ['Deng', '蹬灯登等瞪凳邓噔嶝戥磴镫簦'],
            ['Di', '堤低滴迪敌笛狄涤嫡抵底地蒂第帝弟递缔氐籴诋谛邸坻荻嘀娣柢棣觌祗砥碲睇镝羝骶締'],
            ['Zhai', '翟摘斋宅窄债寨砦瘵'],
            ['Dian', '颠掂滇碘点典靛垫电佃甸店惦奠淀殿丶阽坫巅玷钿癜癫簟踮'],
            ['Diao', '碉叼雕凋刁掉吊钓铞貂鲷'],
            ['Tiao', '调挑条迢眺跳佻苕祧窕蜩笤粜龆鲦髫'],
            ['Die', '跌爹碟蝶迭谍叠垤堞喋牒瓞耋鲽'],
            ['Ding', '丁盯叮钉顶鼎锭定订仃啶玎腚碇町疔耵酊'],
            ['Diu', '丢铥'],
            ['Dong', '东冬董懂动栋侗恫冻洞垌咚岽峒氡胨胴硐鸫'],
            ['Dou', '兜抖斗陡豆逗痘蔸钭窦蚪篼'],
            ['Du', '都督毒犊独读堵睹赌杜镀肚度渡妒芏嘟渎椟牍蠹笃髑黩'],
            ['Duan', '端短锻段断缎椴煅簖'],
            ['Dui', '堆兑队对怼憝碓镦'],
            ['Dun', '墩吨蹲敦顿钝盾遁沌炖砘礅盹趸'],
            ['Tun', '囤吞屯臀氽饨暾豚'],
            ['Duo', '掇哆多夺垛躲朵跺舵剁惰堕咄哚沲缍铎裰踱'],
            ['E', '蛾峨鹅俄额讹娥恶厄扼遏鄂饿噩谔垩苊莪萼呃愕屙婀轭腭锇锷鹗颚鳄'],
            ['En', '恩蒽摁嗯'],
            ['Er', '而儿耳尔饵洱二贰迩珥铒鸸鲕'],
            ['Fa', '发罚筏伐乏阀法珐垡砝'],
            ['Fan', '藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛蕃蘩幡夂梵燔畈蹯'],
            ['Fang', '坊芳方肪房防妨仿访纺放邡枋钫舫鲂'],
            ['Fei', '菲非啡飞肥匪诽吠肺废沸费狒悱淝妃绯榧腓斐扉砩镄痱蜚篚翡霏鲱'],
            ['Fen', '芬酚吩氛分纷坟焚汾粉奋份忿愤粪偾瀵棼鲼鼢'],
            ['Feng', '丰封枫蜂峰锋风疯烽逢冯缝讽奉凤俸酆葑唪沣砜豐'],
            ['Fo', '佛'],
            ['Fou', '否缶'],
            ['Fu', '夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐匐凫郛芙芾苻茯莩菔拊呋呒幞怫滏艴孚驸绂绋桴赙祓黻黼罘稃馥蚨蜉蝠蝮麸趺跗鲋鳆'],
            ['Ga', '噶嘎垓尬尕尜旮钆'],
            ['Gai', '该改概钙盖溉丐陔戤赅'],
            ['Gan', '干甘杆柑竿肝赶感秆敢赣坩苷尴擀泔淦澉绀橄旰矸疳酐'],
            ['Gang', '冈刚钢缸肛纲岗港杠戆罡筻'],
            ['Gao', '篙皋高膏羔糕搞镐稿告睾诰郜藁缟槔槁杲锆'],
            ['Ge', '哥歌搁戈鸽胳疙割革葛格阁隔铬个各鬲仡哿圪塥嗝纥搿膈硌镉袼虼舸骼'],
            ['Ha', '蛤哈铪'],
            ['Gei', '给'],
            ['Gen', '根跟亘茛哏艮'],
            ['Geng', '耕更庚羹埂耿梗哽赓绠鲠'],
            ['Gong', '工攻功恭龚供躬公宫弓巩汞拱贡共珙肱蚣觥'],
            ['Gou', '钩勾沟苟狗垢构购够佝诟岣遘媾缑枸觏彀笱篝鞲'],
            ['Gu', '辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇嘏诂菰崮汩梏轱牯牿臌毂瞽罟钴锢鸪痼蛄酤觚鲴'],
            ['Gua', '刮瓜剐寡挂褂卦诖呱栝胍鸹'],
            ['Guai', '乖拐怪掴'],
            ['Guan', '棺关官冠观管馆罐惯灌贯倌莞掼涫盥鹳鳏'],
            ['Guang', '光广逛咣犷桄胱'],
            ['Gui', '瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽匦刿庋宄妫桧炅晷皈簋鲑鳜'],
            ['Gun', '辊滚棍衮绲磙鲧'],
            ['Guo', '锅郭国果裹过馘埚呙帼崞猓椁虢聒蜾蝈'],
            ['Hai', '骸孩海氦亥害骇嗨胲醢'],
            ['Han', '酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉邗菡撖犴瀚晗焓顸颔蚶鼾'],
            ['Hang', '夯杭航行沆绗颃'],
            ['Hao', '壕嚎豪毫郝好耗号浩貉蒿薅嗥嚆濠灏昊皓颢蚝'],
            ['He', '呵喝荷菏核禾和何合盒阂河涸赫褐鹤贺诃劾壑嗬阖曷盍颌蚵翮'],
            ['Hei', '嘿黑'],
            ['Hen', '痕很狠恨'],
            ['Heng', '哼亨横衡恒蘅珩桁'],
            ['Hong', '轰哄烘虹鸿洪宏弘红黉訇讧荭蕻薨闳泓'],
            ['Hou', '喉侯猴吼厚候后堠後逅瘊篌糇鲎骺'],
            ['Hu', '呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户冱唿囫岵猢怙惚浒滹琥槲轷觳烀煳戽扈祜瓠鹄鹕鹱笏醐斛鹘'],
            ['Hua', '花哗华猾滑画划化话骅桦砉铧'],
            ['Huai', '槐徊怀淮坏踝'],
            ['Huan', '欢环桓还缓换患唤痪豢焕涣宦幻奂擐圜獾洹浣漶寰逭缳锾鲩鬟'],
            ['Huang', '荒慌黄磺蝗簧皇凰惶煌晃幌恍谎隍徨湟潢遑璜肓癀蟥篁鳇'],
            ['Hui', '灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘诙茴荟蕙咴喙隳洄彗缋珲晖恚虺蟪麾'],
            ['Hun', '荤昏婚魂浑混诨馄阍溷'],
            ['Huo', '豁活伙火获或惑霍货祸劐藿攉嚯夥钬锪镬耠蠖'],
            ['Ji', '計機击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪藉亟乩剞佶偈墼芨芰荠蒺蕺掎叽咭哜唧岌嵴洎屐骥畿玑楫殛戟戢赍觊犄齑矶羁嵇稷瘠虮笈笄暨跻跽霁鲚鲫髻'],
            ['Jia', '嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁伽郏葭岬浃迦珈戛胛恝铗镓痂瘕蛱笳袈跏'],
            ['Jian', '歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僭谏谫菅蒹搛湔蹇謇缣枧楗戋戬牮犍毽腱睑锏鹣裥笕翦踺鲣鞯'],
            ['Jiang', '僵姜将浆江疆蒋桨奖讲匠酱降茳洚绛缰犟礓耩糨豇'],
            ['Jiao', '蕉椒礁焦胶交郊浇骄娇搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖佼僬艽茭挢噍峤徼姣敫皎鹪蛟醮跤鲛'],
            ['Jue', '嚼撅攫抉掘倔爵觉决诀绝厥劂谲矍蕨噘崛獗孓珏桷橛爝镢蹶觖'],
            ['Jie', '揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒芥界借介疥诫届讦诘拮喈嗟婕孑桀碣疖颉蚧羯鲒骱'],
            ['Jin', '巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲卺荩堇噤馑廑妗缙瑾槿赆觐衿矜'],
            ['Jing', '荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净刭儆阱菁獍憬泾迳弪婧肼胫腈旌箐'],
            ['Jiong', '炯窘迥扃'],
            ['Jiu', '揪究纠玖韭久灸九酒厩救旧臼舅咎就疚僦啾阄柩桕鸠鹫赳鬏'],
            ['Ju', '鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧倨讵苣苴莒掬遽屦琚椐榘榉橘犋飓钜锔窭裾醵踽龃雎鞫'],
            ['Juan', '捐鹃娟倦眷卷绢鄄狷涓桊蠲锩镌隽'],
            ['Jun', '均菌钧军君峻俊竣浚郡骏捃皲筠麇'],
            ['Ka', '喀咖卡佧咔胩'],
            ['Luo', '咯萝螺罗逻锣箩骡裸落洛骆络倮蠃荦摞猡泺漯珞椤脶镙瘰雒'],
            ['Kai', '开揩楷凯慨剀垲蒈忾恺铠锎锴'],
            ['Kan', '刊堪勘坎砍看侃莰阚戡龛瞰'],
            ['Kang', '康慷糠扛抗亢炕伉闶钪'],
            ['Kao', '考拷烤靠尻栲犒铐'],
            ['Ke', '坷苛柯棵磕颗科壳咳可渴克刻客课嗑岢恪溘骒缂珂轲氪瞌钶锞稞疴窠颏蝌髁'],
            ['Ken', '肯啃垦恳裉'],
            ['Keng', '坑吭铿'],
            ['Kong', '空恐孔控倥崆箜'],
            ['Kou', '抠口扣寇芤蔻叩囗眍筘'],
            ['Ku', '枯哭窟苦酷库裤刳堀喾绔骷'],
            ['Kua', '夸垮挎跨胯侉'],
            ['Kuai', '块筷侩快蒯郐哙狯浍脍'],
            ['Kuan', '宽款髋'],
            ['Kuang', '匡筐狂框矿眶旷况诓诳邝圹夼哐纩贶'],
            ['Kui', '亏盔岿窥葵奎魁傀馈愧溃馗匮夔隗蒉揆喹喟悝愦逵暌睽聩蝰篑跬'],
            ['Kun', '坤昆捆困悃阃琨锟醌鲲髡'],
            ['Kuo', '括扩廓阔蛞'],
            ['La', '垃拉喇蜡腊辣啦剌邋旯砬瘌'],
            ['Lai', '莱来赖崃徕涞濑赉睐铼癞籁'],
            ['Lan', '蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥岚漤榄斓罱镧褴'],
            ['Lang', '琅榔狼廊郎朗浪蒗啷阆稂螂'],
            ['Lao', '捞劳牢老佬姥酪烙涝唠崂忉栳铑铹痨耢醪'],
            ['Le', '勒了仂叻泐鳓'],
            ['Yue', '乐曰约越跃岳粤月悦阅龠哕瀹樾刖钺'],
            ['Lei', '雷镭蕾磊累儡垒擂肋类泪羸诔嘞嫘缧檑耒酹'],
            ['Leng', '棱楞冷塄愣'],
            ['Li', '厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俪俚郦坜苈莅蓠藜呖唳喱猁溧澧逦娌嫠骊缡枥栎轹膦戾砺詈罹锂鹂疠疬蛎蜊蠡笠篥粝醴跞雳鲡鳢黧'],
            ['Lia', '俩'],
            ['Lian', '联莲连镰廉怜涟帘敛脸链恋炼练蔹奁潋濂琏楝殓臁裢裣蠊鲢'],
            ['Liang', '粮凉梁粱良两辆量晾亮谅墚莨椋锒踉靓魉'],
            ['Liao', '撩聊僚疗燎寥辽潦撂镣廖料蓼尥嘹獠寮缭钌鹩'],
            ['Lie', '列裂烈劣猎冽埒捩咧洌趔躐鬣'],
            ['Lin', '琳林磷霖临邻鳞淋凛赁吝拎蔺啉嶙廪懔遴檩辚瞵粼躏麟'],
            ['Ling', '玲菱零龄铃伶羚凌灵陵岭领另令酃苓呤囹泠绫柃棂瓴聆蛉翎鲮'],
            ['Liu', '溜琉榴硫馏留刘瘤流柳六浏遛骝绺旒熘锍镏鹨鎏'],
            ['Long', '龙聋咙笼窿隆垄拢陇垅茏珑栊胧砻癃'],
            ['Lou', '楼娄搂篓漏陋偻蒌喽嵝镂瘘耧蝼髅'],
            ['Lu', '芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮垆撸噜泸渌漉逯璐栌橹轳辂辘氇胪镥鸬鹭簏舻鲈'],
            ['Lv', '驴吕铝侣旅履屡缕虑氯律率滤绿捋闾榈膂稆褛'],
            ['Luan', '峦挛孪滦卵乱脔娈栾鸾銮'],
            ['Lue', '掠略锊'],
            ['Lun', '抡轮伦仑沦纶论囵'],
            ['Ma', '妈麻玛码蚂马骂嘛吗唛犸杩蟆'],
            ['Mai', '埋买麦卖迈脉劢荬霾'],
            ['Man', '瞒馒蛮满蔓曼慢漫谩墁幔缦熳镘颟螨鳗鞔'],
            ['Mang', '芒茫盲氓忙莽邙漭硭蟒'],
            ['Mao', '猫茅锚毛矛铆卯茂冒帽貌贸袤茆峁泖瑁昴牦耄旄懋瞀蝥蟊髦'],
            ['Me', '么麽'],
            ['Mei', '玫枚梅酶霉煤眉媒镁每美昧寐妹媚莓嵋猸浼湄楣镅鹛袂魅'],
            ['Mo', '没摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谟茉蓦馍嫫嬷殁镆秣瘼耱貊貘'],
            ['Men', '门闷们扪焖懑钔'],
            ['Meng', '萌蒙檬盟锰猛梦孟勐甍瞢懵朦礞虻蜢蠓艋艨'],
            ['Mi', '眯醚靡糜迷谜弥米秘觅泌蜜密幂芈谧咪嘧猕汨宓弭脒祢敉縻麋'],
            ['Mian', '棉眠绵冕免勉娩缅面沔渑湎腼眄'],
            ['Miao', '苗描瞄藐秒渺庙妙喵邈缈杪淼眇鹋'],
            ['Mie', '蔑灭乜咩蠛篾'],
            ['Min', '民抿皿敏悯闽苠岷闵泯缗玟珉愍黾鳘'],
            ['Ming', '明螟鸣铭名命冥茗溟暝瞑酩'],
            ['Miu', '谬缪'],
            ['Mou', '谋牟某侔哞眸蛑鍪'],
            ['Mu', '拇牡亩姆母墓暮幕募慕木目睦牧穆仫坶苜沐毪钼'],
            ['Na', '拿哪呐钠那娜纳讷捺肭镎衲'],
            ['Nai', '氖乃奶耐奈鼐佴艿萘柰'],
            ['Nan', '南男难喃囝囡楠腩蝻赧'],
            ['Nang', '囊攮囔馕曩'],
            ['Nao', '挠脑恼闹淖孬垴呶猱瑙硇铙蛲'],
            ['Ne', '呢'],
            ['Nei', '馁内'],
            ['Nen', '嫩恁'],
            ['Neng', '能'],
            ['Ni', '妮霓倪泥尼拟你匿腻逆溺伲坭蘼猊怩昵旎睨铌鲵'],
            ['Nian', '蔫拈年碾撵捻念廿埝辇黏鲇鲶'],
            ['Niang', '娘酿'],
            ['Niao', '鸟尿茑嬲脲袅'],
            ['Nie', '捏聂孽啮镊镍涅陧蘖嗫颞臬蹑'],
            ['Nin', '您'],
            ['Ning', '柠狞凝宁拧泞佞咛甯聍'],
            ['Niu', '牛扭钮纽拗狃忸妞'],
            ['Nong', '脓浓农弄侬哝'],
            ['Nu', '奴努怒弩胬孥驽'],
            ['Nv', '女恧钕衄'],
            ['Nuan', '暖'],
            ['Nue', '虐疟挪'],
            ['Nuo', '懦糯诺傩搦喏锘'],
            ['O', '哦噢'],
            ['Ou', '欧鸥殴藕呕偶沤讴怄瓯耦'],
            ['Pa', '啪趴爬帕怕琶葩杷筢'],
            ['Pai', '拍排牌徘湃派俳蒎哌'],
            ['Pan', '攀潘盘磐盼畔判叛拚爿泮袢襻蟠蹒'],
            ['Pang', '乓庞旁耪胖彷滂逄螃'],
            ['Pao', '抛咆刨炮袍跑泡匏狍庖脬疱'],
            ['Pei', '呸胚培裴赔陪配佩沛辔帔旆锫醅霈'],
            ['Pen', '喷盆湓'],
            ['Peng', '砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰堋嘭怦蟛'],
            ['Pian', '篇偏片骗谝骈犏胼翩蹁'],
            ['Piao', '飘漂瓢票剽嘌嫖缥殍瞟螵'],
            ['Pie', '撇瞥丿苤氕'],
            ['Pin', '拼频贫品聘姘嫔榀牝颦'],
            ['Ping', '乒坪苹萍平凭瓶评屏俜娉枰鲆'],
            ['Po', '坡泼颇婆破魄迫粕叵鄱珀钋钷皤笸'],
            ['Pou', '剖裒掊'],
            ['Pu', '扑铺仆莆葡菩蒲埔朴圃普浦谱瀑匍噗溥濮璞氆镤镨蹼'],
            ['Qi', '期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫亓圻芑芪萁萋葺蕲嘁屺岐汔淇骐绮琪琦杞桤槭耆祺憩碛颀蛴蜞綦鳍麒'],
            ['Qia', '掐恰洽葜袷髂'],
            ['Qian', '牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉倩佥阡芊芡茜掮岍悭慊骞搴褰缱椠肷愆钤虔箝'],
            ['Qiang', '枪呛腔羌墙蔷强抢戕嫱樯戗炝锖锵镪襁蜣羟跄'],
            ['Qiao', '橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍劁诮谯荞愀憔缲樵硗跷鞒'],
            ['Qie', '切茄且怯窃郄惬妾挈锲箧趄'],
            ['Qin', '钦侵亲秦琴勤芹擒禽寝沁芩揿吣嗪噙溱檎锓螓衾'],
            ['Qing', '青轻氢倾卿清擎晴氰情顷请庆苘圊檠磬蜻罄綮謦鲭黥'],
            ['Qiong', '琼穷邛茕穹蛩筇跫銎'],
            ['Qiu', '秋丘邱球求囚酋泅俅巯犰湫逑遒楸赇虬蚯蝤裘糗鳅鼽'],
            ['Qu', '趋区蛆曲躯屈驱渠取娶龋趣去诎劬蕖蘧岖衢阒璩觑氍朐祛磲鸲癯蛐蠼麴瞿黢'],
            ['Quan', '圈颧权醛泉全痊拳犬券劝诠荃犭悛绻辁畎铨蜷筌鬈'],
            ['Que', '缺炔瘸却鹊榷确雀阕阙悫'],
            ['Qun', '裙群逡'],
            ['Ran', '然燃冉染苒蚺髯'],
            ['Rang', '瓤壤攘嚷让禳穰'],
            ['Rao', '饶扰绕荛娆桡'],
            ['Re', '惹热'],
            ['Ren', '壬仁人忍韧任认刃妊纫仞荏饪轫稔衽'],
            ['Reng', '扔仍'],
            ['Ri', '日'],
            ['Rong', '戎茸蓉荣融熔溶容绒冗嵘狨榕肜蝾'],
            ['Rou', '揉柔肉糅蹂鞣'],
            ['Ru', '茹蠕儒孺如辱乳汝入褥蓐薷嚅洳溽濡缛铷襦颥'],
            ['Ruan', '软阮朊'],
            ['Rui', '蕊瑞锐芮蕤枘睿蚋'],
            ['Run', '闰润'],
            ['Ruo', '若弱偌箬'],
            ['Sa', '撒洒萨卅脎飒'],
            ['Sai', '腮鳃塞赛噻'],
            ['San', '三叁伞散仨彡馓毵'],
            ['Sang', '桑嗓丧搡磉颡'],
            ['Sao', '搔骚扫嫂埽缫臊瘙鳋'],
            ['Se', '瑟色涩啬铯穑'],
            ['Sen', '森'],
            ['Seng', '僧'],
            ['Sha', '莎砂杀刹沙纱傻啥煞唼歃铩痧裟霎鲨'],
            ['Shai', '筛晒酾'],
            ['Shan', '珊苫杉山删煽衫闪陕擅赡膳善汕扇缮讪鄯芟潸姗嬗骟膻钐疝蟮舢跚鳝'],
            ['Shang', '墒伤商赏晌上尚裳垧泷绱殇熵觞'],
            ['Shao', '梢捎稍烧芍勺韶少哨邵绍劭潲杓筲艄'],
            ['She', '奢赊蛇舌舍赦摄射慑涉社设厍佘揲猞滠麝'],
            ['Shen', '砷申呻伸身深娠绅神沈审婶甚肾慎渗什诜谂莘葚哂渖椹胂矧蜃糁'],
            ['Sheng', '声生甥牲升绳省盛剩胜圣嵊晟眚笙'],
            ['Shou', '收手首守寿授售受瘦兽狩绶艏'],
            ['Shu', '蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕丨倏塾菽摅沭澍姝纾毹腧殳秫'],
            ['Shua', '刷耍唰'],
            ['Shuai', '摔衰甩帅蟀'],
            ['Shuan', '栓拴闩涮'],
            ['Shuang', '霜双爽孀'],
            ['Shui', '谁水睡税'],
            ['Shun', '吮瞬顺舜'],
            ['Shuo', '说硕朔烁蒴搠妁槊铄'],
            ['Si', '斯撕嘶思私司丝死肆寺嗣四伺似饲巳厮俟兕厶咝汜泗澌姒驷缌祀锶鸶耜蛳笥'],
            ['Song', '松耸怂颂送宋讼诵凇菘崧嵩忪悚淞竦'],
            ['Sou', '搜艘擞嗽叟薮嗖嗾馊溲飕瞍锼螋'],
            ['Su', '苏酥俗素速粟僳塑溯宿诉肃夙谡蔌嗉愫涑簌觫稣術'],
            ['Suan', '酸蒜算狻'],
            ['Sui', '虽隋随绥髓碎岁穗遂隧祟谇荽濉邃燧眭睢'],
            ['Sun', '孙损笋荪狲飧榫隼'],
            ['Suo', '蓑梭唆缩琐索锁所唢嗦嗍娑桫挲睃羧'],
            ['Ta', '塌他它她塔獭挞蹋踏嗒闼溻遢榻沓铊趿鳎'],
            ['Tai', '胎苔抬台泰酞太态汰邰薹骀肽炱钛跆鲐'],
            ['Tang', '汤塘搪堂棠膛唐糖倘躺淌趟烫傥帑溏瑭樘铴镗耥螗螳羰醣'],
            ['Tao', '掏涛滔绦萄桃逃淘陶讨套鼗啕洮韬饕'],
            ['Te', '特忑慝铽'],
            ['Teng', '藤腾疼誊滕'],
            ['Ti', '梯剔踢锑提题蹄啼体替嚏惕涕剃屉倜悌逖绨缇鹈裼醍'],
            ['Tian', '天添填田甜恬舔腆掭忝阗殄畋'],
            ['Tie', '贴铁帖萜餮'],
            ['Ting', '厅听烃汀廷停亭庭挺艇莛葶婷梃铤蜓霆'],
            ['Tong', '通桐酮瞳同铜彤童桶捅筒统痛佟仝茼嗵恸潼砼'],
            ['Tou', '偷投头透骰'],
            ['Tu', '凸秃突图徒途涂屠土吐兔堍荼菟钍酴塗'],
            ['Tuan', '湍团抟彖疃'],
            ['Tui', '推颓腿蜕褪退忒煺'],
            ['Tuo', '拖托脱鸵陀驮驼椭妥拓唾佗坨庹沱柝柁橐砣箨酡跎鼍'],
            ['Wa', '挖哇蛙洼娃瓦袜佤娲腽'],
            ['Wai', '歪外崴'],
            ['Wan', '豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕剜芄菀纨绾琬脘畹蜿'],
            ['Wang', '汪王亡枉网往旺望忘妄罔惘辋魍'],
            ['Wei', '威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫偎诿隈葳薇帏帷嵬猥猬闱沩洧涠逶娓玮韪軎炜煨痿艉鲔為'],
            ['Wen', '瘟温蚊文闻纹吻稳紊问刎阌汶璺攵雯'],
            ['Weng', '嗡翁瓮蓊蕹'],
            ['Wo', '挝蜗涡窝我斡卧握沃倭莴喔幄渥肟硪龌'],
            ['Wu', '巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误兀仵阢邬圬芴唔庑怃忤寤迕妩婺骛杌牾焐鹉鹜痦蜈鋈鼯'],
            ['Xi', '昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细僖兮隰郗菥葸蓰奚唏徙饩阋浠淅屣嬉玺樨曦觋欷歙熹禊禧皙穸蜥螅蟋舄舾羲粞翕醯蹊鼷'],
            ['Xia', '瞎虾匣霞辖暇峡侠狭下厦夏吓呷狎遐瑕柙硖罅黠'],
            ['Xian', '掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线冼苋莶藓岘猃暹娴氙燹祆鹇痫蚬筅籼酰跣跹霰縣'],
            ['Xiang', '相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象芗葙饷庠骧缃蟓鲞飨'],
            ['Xiao', '萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效哓崤潇逍骁绡枭枵蛸筱箫魈'],
            ['Xie', '楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑偕亵勰燮薤撷獬廨渫瀣邂绁缬榭榍蹀躞'],
            ['Xin', '薪芯锌欣辛新忻心信衅囟馨昕歆镡鑫'],
            ['Xing', '星腥猩惺兴刑型形邢醒幸杏性姓陉荇荥擤饧悻硎'],
            ['Xiong', '兄凶胸匈汹雄熊芎'],
            ['Xiu', '休修羞朽嗅锈秀袖绣咻岫馐庥溴鸺貅髹'],
            ['Xu', '墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续诩勖圩蓿洫溆顼栩煦盱胥糈醑'],
            ['Xuan', '轩喧宣悬旋玄选癣眩绚儇谖萱揎泫渲漩璇楦暄炫煊碹铉镟痃'],
            ['Xue', '靴薛学穴雪血谑噱泶踅鳕'],
            ['Xun', '勋熏循旬询寻驯巡殉汛训讯逊迅巽郇埙荀荨蕈薰峋徇獯恂洵浔曛醺鲟'],
            ['Ya', '压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶伢垭揠岈迓娅琊桠氩砑睚痖'],
            ['Yan', '焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验厣赝剡俨偃兖谳郾鄢埏菸崦恹闫阏湮滟妍嫣琰檐晏胭焱罨筵酽趼魇餍鼹'],
            ['Yang', '殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾徉怏泱炀烊恙蛘鞅'],
            ['Yao', '邀腰妖瑶摇尧遥窑谣姚咬舀药要耀钥夭爻吆崾徭幺珧杳轺曜肴铫鹞窈鳐'],
            ['Ye', '椰噎耶爷野冶也页掖业叶曳腋夜液靥谒邺揶晔烨铘'],
            ['Yi', '一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎刈劓佚佾诒圯埸懿苡荑薏弈奕挹弋呓咦咿噫峄嶷猗饴怿怡悒漪迤驿缢殪轶贻欹旖熠眙钇镒镱痍瘗癔翊蜴舣羿'],
            ['Yin', '茵荫因殷音阴姻吟银淫寅饮尹引隐印胤鄞垠堙茚吲喑狺夤洇氤铟瘾窨蚓霪龈'],
            ['Ying', '英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映嬴郢茔莺萦蓥撄嘤膺滢潆瀛瑛璎楹媵鹦瘿颍罂'],
            ['Yo', '哟唷'],
            ['Yong', '拥佣臃痈庸雍踊蛹咏泳涌永恿勇用俑壅墉喁慵邕镛甬鳙饔'],
            ['You', '幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼卣攸侑莠莜莸尢呦囿宥柚猷牖铕疣蚰蚴蝣繇鱿黝鼬'],
            ['Yu', '迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭禺毓伛俣谀谕萸蓣揄圄圉嵛狳饫馀庾阈鬻妪妤纡瑜昱觎腴欤於煜燠聿畲钰鹆鹬瘐瘀窬窳蜮蝓竽臾舁雩龉'],
            ['Yuan', '鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院垸塬芫掾沅媛瑗橼爰眢鸢螈箢鼋'],
            ['Yun', '耘云郧匀陨允运蕴酝晕韵孕郓芸狁恽愠纭韫殒昀氲熨'],
            ['Za', '匝砸杂咋拶咂'],
            ['Zai', '栽哉灾宰载再在崽甾'],
            ['Zan', '咱攒暂赞瓒昝簪糌趱錾'],
            ['Zang', '赃脏葬奘驵臧'],
            ['Zao', '遭糟凿藻枣早澡蚤躁噪造皂灶燥唣'],
            ['Ze', '责择则泽仄赜啧帻迮昃箦舴'],
            ['Zei', '贼'],
            ['Zen', '怎谮'],
            ['Zeng', '增憎赠缯甑罾锃'],
            ['Zha', '扎喳渣札轧铡闸眨栅榨乍炸诈柞揸吒咤哳楂砟痄蚱齄'],
            ['Zhan', '瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽谵搌旃'],
            ['Zhang', '樟章彰漳张掌涨杖丈帐账仗胀瘴障仉鄣幛嶂獐嫜璋蟑'],
            ['Zhao', '招昭找沼赵照罩兆肇召着诏棹钊笊'],
            ['Zhe', '遮折哲蛰辙者锗蔗这浙乇谪摺柘辄磔鹧褶蜇螫赭'],
            ['Zhen', '珍斟真甄砧臻贞针侦枕疹诊震振镇阵帧圳蓁浈缜桢榛轸赈胗朕祯畛稹鸩箴'],
            ['Zheng', '蒸挣睁征狰争怔整拯正政症郑证诤峥徵钲铮筝'],
            ['Zhi', '芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒卮陟郅埴芷摭帙忮彘咫骘栉枳栀桎轵轾贽胝膣祉黹雉鸷痣蛭絷酯跖踬踯豸觯'],
            ['Zhong', '中盅忠钟衷终种肿仲众冢锺螽舯踵'],
            ['Zhou', '舟周州洲诌粥轴肘帚咒皱宙昼骤荮啁妯纣绉胄碡籀酎'],
            ['Zhu', '珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻伫侏邾苎茱洙渚潴杼槠橥炷铢疰瘃竺箸舳翥躅麈'],
            ['Zhua', '抓爪'],
            ['Zhuai', '拽'],
            ['Zhuan', '专砖转撰赚篆啭馔颛'],
            ['Zhui', '椎锥追赘坠缀萑惴骓缒隹'],
            ['Zhun', '谆准肫窀'],
            ['Zhuo', '捉拙卓桌琢茁酌啄灼浊倬诼擢浞涿濯禚斫镯'],
            ['Zi', '兹咨资姿滋淄孜紫仔籽滓子自渍字谘呲嵫姊孳缁梓辎赀恣眦锱秭耔笫粢趑訾龇鲻髭'],
            ['Zong', '鬃棕踪宗综总纵偬腙粽'],
            ['Zou', '邹走奏揍诹陬鄹驺鲰'],
            ['Zu', '租足族祖诅阻组俎菹镞'],
            ['Zuan', '钻纂攥缵躜'],
            ['Zui', '嘴醉最罪蕞觜'],
            ['Zun', '尊遵撙樽鳟'],
            ['Zuo', '昨左佐做作坐座阼唑怍胙祚笮'],
            ['Ei', '诶'],
            ['Dia', '嗲'],
            ['Cen', '岑涔'],
            ['Nou', '耨']
        ];

        var BlankCharacter = '_';

        function getSpell(str) {
            str = str.toString();
            str = str.replace(/(^\s*)|(\s*$)/g, '');
            var e = '';
            var c, l1, l2;
            for (var i = 0; i < str.length; i++) {
                l1 = str.charAt(i);
                c = l1.charCodeAt();
                if (c > 1 && c < 128) { //数字、字母
                    if (/^[A-Za-z0-9]+$/.test(l1)) {
                        e += l1;
                    } else {
                        e += ' ';
                    }
                } else { //汉字
                    var ii = 0;
                    while (ii < mapping.length) {
                        if (mapping[ii][1].indexOf(l1) > -1) {
                            e += mapping[ii][0] + BlankCharacter;
                            break;
                        }
                        ii++;
                    }
                }
            }
            e = e.replace(/\s/g, '_');
            while (e.indexOf('__') > -1) {
                e = e.replace(/__/g, '_');
            }
            return e;
        }

        return {
            getInitial: function(str, isToUpperCase) {
                if (str) {
                    var target = getSpell(str).split(BlankCharacter);
                    var initial = '';
                    for (var i = 0; i < target.length; i++) {
                        initial += target[i].slice(0, 1);
                    }
                    return !!isToUpperCase ? initial.toUpperCase() : initial.toLowerCase();
                }
            },
            getIntegrated: function(str, isToUpperCase) {
                if (str) {
                    var target = getSpell(str).split(BlankCharacter).join('');
                    return !!isToUpperCase ? target.toUpperCase() : target.toLowerCase();
                }
            }
        };
    })();

    var config = {
        BASE_URL: './static/',
        MESSAGE_MININTERVAL: 5 * 60 * 1000, //时间显示的最小时间间隔
        ROSTER_INFO_MAXTIME: 60 * 60 * 1000, //联系人信息的最长保存时间间隔
        LOCAL_SHOWPIC_SIZE: '246*185', //位置信息封面大小
        LOCAL_CACHE_VERSION: '1497511738756',
        LOCAL_CACHE_MAXSIZE: 2, //客户端保留缓存的最大账号个数
        INIT_LOAD_MODULE: { //按需初始化加载模块
            ROSTERS: false, //联系人好友关系
            FAVORITES: false, //联系人收藏关系
            GROUPS: true, //群组信息
            PUBACCOUNTS: true, //公共号信息
            DIGESTS: true, //摘要信息
            AUTO_PRESENCES: false, //是否自动拉去在线状态
            PROFILE: true //是否拉取 （置顶、静音）状态
        },
        REVOKE: {
            INTERVAL: 60 * 60 * 1000 //最大可撤销时间 
        },
        AUTO_PRESENCES: {
            START: 1 * 1000, //登陆之后第一次拉取
            INTERVAL: 10 * 1000 //拉取在线状态间隔时间
        },
        HISTORY: {
            MIN_PRE_LENGTH: 10,
            MAX_PRE_LENGTH: 50
        },
        DIGEST_STATE: {
            EXISTS: 'exists',
            REMOVE: 'remove'
        },
        SEND_STATE: {
            NONE: 'none',
            UPLOADSTART: 'uploadStart',
            UPLOADERROR: 'uploadError',
            UPLOADDONE: 'uploadDone',
            SENDSTART: 'sendStart',
            SENDERROR: 'sendError',
            UNREADED: 'unreaded',
            READED: 'readed'
        },
        ROSTER_SUBSCRIPTION_TYPE: {
            BOTH: 'both',
            NONE: 'none'
        },
        FAVORITE_TYPE: {
            FAVORITE: 'favorite',
            REMOVE: 'remove',
            NONE: 'none'
        },
        TRAMSPARENT_TYPE: {
            ATTACHMENTCONVERTED: 'attachmentConverted', //附件缩略图通知
            REVOKE: 'revoke',
            SETMUTE: 'setMute',
            CANCELMUTE: 'cancelMute',
            SETSTICK: 'setStick',
            CANCELSTICK: 'cancelStick',
            REMOVECONTACTS: 'removeContacts',
            ASSIGNADMIN: 'assignAdmin'
        },
        ROSTER_TYPE: {
            MYSELF: 'myself',
            FRIEND: 'friend',
            ASK: 'ask',
            RECV: 'recv',
            NONE: 'none'
        },
        RESET_BASE_URL: function(url) {
            this.BASE_URL = url || this.BASE_URL;

            this.DEVICE = {
                WEB: {
                    name: 'WEB',
                    photo: this.BASE_URL + '/images/assistant/file_assistant.png',
                },
                MOBILE: {
                    name: 'MOBILE',
                    photo: this.BASE_URL + '/images/assistant/assistant_mobile.png',
                }
            };

            this.FILE_ASSISTANT = {
                photo: this.BASE_URL + '/images/assistant/file_assistant.png',
                name: '文件传输助手'
            };

            this.DEFAULT_PHOTO = {
                ROSTER: this.BASE_URL + '/images/photo/default.png',
                GROUP: this.BASE_URL + '/images/photo/default.png',
                SPACEASSISTANT: this.BASE_URL + '/images/subscription/assistant.png',
                PUBACCOUNT: this.BASE_URL + '/images/subscription/pubaccount_default.png'
            };

            this.FILE = {
                ICO_URL: this.BASE_URL + '/images/filetype/',
                ICO_SUFFIX: '.png',
                DEFAULT_ICO: this.BASE_URL + '/images/filetype/default.png'
            };

            this.PUB_TYPE = {
                pubaccount: {
                    name: 'pubaccount',
                    type: {
                        app: {
                            name: '应用通知',
                            photo: this.BASE_URL + '/images/notification/application.png'
                        },
                        feed: {
                            name: '动态通知',
                            photo: this.BASE_URL + '/images/notification/dynamic.png'
                        },
                        groupnew: {
                            name: '团队通知',
                            photo: this.BASE_URL + '/images/notification/team.png'
                        },
                        system: {
                            name: '系统通知',
                            photo: this.BASE_URL + '/images/notification/system.png'
                        },
                        qz: {
                            name: '空间通知',
                            photo: this.BASE_URL + '/images/notification/interspace.png'
                        },
                        vmail: {
                            name: '微邮通知',
                            photo: this.BASE_URL + '/images/notification/vmail.png'
                        }
                    }
                },
                msgaccount: {
                    name: 'msgaccount'
                },
                appaccount: {
                    name: 'appaccount'
                }
            };

            this.GROUP_TYPE = {
                group: {
                    name: 'group',
                    photo: this.BASE_URL + '/images/team/default.png'
                },
                app: {
                    name: 'app'
                },
                jgroup: {
                    name: 'jgroup'
                },
                dgroup: {
                    name: 'dgroup'
                },
                sgroup: {
                    project: {
                        name: 'project'
                    }
                }
            };

            this.BUSINESS = {
                'default': {
                    icon: this.BASE_URL + '/images/business/default30.png'
                },
                '180': {
                    icon: this.BASE_URL + '/images/business/project.png', //项目
                    packetUrl: function(from_id, qz_id) {
                        return '/project/project/info/pid/' + from_id + '/VISITID/' + qz_id + '?YYW=1';
                    }
                },
                '25': {
                    icon: this.BASE_URL + '/images/business/schedule.png', //日程
                    packetUrl: function(from_id, qz_id) {
                        return '/schedule/detail/index/sid/' + from_id + '/VISITID/' + qz_id + '?YYW=1';
                    }
                },
                '55': {
                    icon: this.BASE_URL + '/images/business/email.png', //微邮
                    packetUrl: function(from_id, qz_id) {
                        return '/message/wmail/index/VISITID/' + qz_id + '?mailid=' + from_id + '&YYW=1';
                    }
                },
                '185': {
                    icon: this.BASE_URL + '/images/business/dudu.png', //嘟嘟
                    packetUrl: function(from_id, qz_id) {
                        return '';
                    }
                }
            };

        },
        isCommonPlatform: function(resource) {
            if (resource) {
                var platform = {
                    'web': ['web', 'pc'],
                    'mobile': ['android', 'ios']
                };
                var target = resource.replace(/\-.*$/, '');
                var local = YYIMChat.getResource().replace(/\-.*$/, '');
                for (var x in platform) {
                    if (platform.hasOwnProperty(x)) {
                        if (platform[x].indexOf(target) != -1 &&
                            platform[x].indexOf(local) != -1) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    };

    config.RESET_BASE_URL();

    function AssistantManager() {
        BaseList.apply(this);
    }

    AssistantManager.prototype = new BaseList();

    AssistantManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new AssistantManager();
        }
        return this._instance;
    };

    AssistantManager.prototype.initCache = function(arg) {
        this.updateCache({
            id: YYIMChat.getUserID()
        });
    };

    AssistantManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new FileAssistant(arg);
                this.set(item.id, item);
            }
            return item;
        }
    };

    AssistantManager.prototype.queryAssistants = function(keyword) {
        var that = this;
        if (keyword) {
            return this.filter(function(item, index) {
                if (item.name && item.name.indexOf(keyword) != -1 ||
                    item.initial && item.initial.indexOf(keyword) != -1 ||
                    item.integrated && item.integrated.indexOf(keyword) != -1) {
                    return true;
                }
                return false;
            });
        }
    };

    AssistantManager.prototype.destory = function() {
        this.clear();
    };

    function FileAssistant(arg) {
        this.name = config.FILE_ASSISTANT.name;
        this.photo = config.FILE_ASSISTANT.photo;

        this.initial = SpellUtil.getInitial(this.name);
        this.integrated = SpellUtil.getIntegrated(this.name);
        this.build(arg);
    }

    FileAssistant.prototype.build = function(arg) {
        this.id = arg.id || this.id;
    };

    FileAssistant.prototype.getPhotoUrl = function() {
        return this.photo;
    };

    function Devicer(arg) {
        this.build(arg);
    }

    Devicer.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.sysInfo(arg);
    };

    Devicer.prototype.sysInfo = function(arg) {
        if (this.id &&
            config.DEVICE[this.id.toUpperCase()]) {
            this.name = this.name || config.DEVICE[this.id.toUpperCase()].name;
            this.photo = this.photo || config.DEVICE[this.id.toUpperCase()].photo;
        }
    };



    function DevicerManager() {
        BaseList.apply(this);
    }

    DevicerManager.prototype = new BaseList();

    DevicerManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new DevicerManager();
        }
        return this._instance;
    };

    DevicerManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new Devicer(arg);
                this.set(item.id, item);
            }
            return item;
        }
    };

    function Digest(arg) {
        this.history = new BaseList();
        this.build(arg);
    }

    Digest.prototype.build = function(arg) {
        arg = arg || {};

        this.id = arg.id || this.id;
        this.type = arg.type || this.type || YYIMChat.getConstants().CHAT_TYPE.CHAT;
        this.state = arg.state || this.state;

        this.digest = arg.digest || this.digest;
        this.dateline = Math.max(arg.dateline || 0, this.dateline || 0);

        this.revokedCount = Math.max(arg.revokedCount || 0, this.revokedCount || 0);
        this.contactReadedVersion = Math.max(arg.contactReadedVersion || 0, this.contactReadedVersion || 0);
        this.readedVersion = Math.max(arg.readedVersion || 0, this.readedVersion || 0);
        this.sessionVersion = Math.max(arg.sessionVersion || 0, this.sessionVersion || 0);
        this.atVersion = Math.max(arg.atVersion || 0, this.atVersion || 0);

        this.minVersion = YYIMUtil['isWhateType'](arg.minVersion, 'Number') ? Math.min(arg.minVersion, this.minVersion || arg.minVersion) : (this.minVersion || 0);
        this.maxVersion = Math.max(arg.maxVersion || 0, this.maxVersion || 0) || 0;

        this.id += '';
        this.syncInfo(arg);
    };

    Digest.prototype.resetVersion = function(arg) {
        this.minVersion = 0;
        this.maxVersion = 0;
        this.syncInfo({});
    };

    Digest.prototype.syncInfo = function(arg) {
        if (!this.from && this.id) {
            switch (this.type) {
                case YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT:
                    this.from = GroupManager.getInstance().updateCache({
                        id: this.id,
                        loadedInfo: arg.loadedInfo
                    });
                    break;
                case YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT:
                    this.from = PubAccountManager.getInstance().updateCache({
                        id: this.id,
                        loadedInfo: arg.loadedInfo
                    });
                    break;
                default:
                    this.from = RosterManager.getInstance().updateCache({ id: this.id });
            }
        }

        if (arg.lastMessage) {
            arg.message = new Message(arg.lastMessage);
        }

        if (arg &&
            arg.message &&
            (!this.sessionVersion || arg.message.sessionVersion >= this.sessionVersion)) {
            if (!this.message || this.message.id != arg.message.id) {
                this.message = arg.message;
            }
        }

        if (this.message) {
            this.sessionVersion = Math.max(this.message.sessionVersion, this.sessionVersion);
            this.dateline = Math.max(this.message.dateline, this.dateline);
            if (this.message.sessionVersion < this.sessionVersion) {
                this.message = null;
            }

            if (this.message &&
                this.message.data &&
                this.message.data.atuser &&
                (this.message.data.atuser.indexOf(YYIMChat.getUserID()) > -1 ||
                    this.message.data.atuser.indexOf('im_atall') > -1)) {
                this.atVersion = this.message.sessionVersion;
            }
        }

        if (arg.revoker &&
            arg.revoker.id &&
            arg.revoker.sessionVersion) {
            this.revoker = {
                id: arg.revoker.id,
                sessionVersion: arg.revoker.sessionVersion,
                roster: RosterManager.getInstance().updateCache({ id: arg.revoker.id })
            }
        }

        if (this.revoker &&
            this.revoker.sessionVersion != this.sessionVersion) {
            delete this.revoker;
        }

        if (this.message &&
            this.revoker) {
            this.message.revoker = this.revoker.roster;
            this.message.data = {
                contentType: YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.REVOCATION
            };
        }

        if (arg.talker &&
            arg.talker.id &&
            arg.talker.sessionVersion) {
            this.talker = {
                id: arg.talker.id,
                sessionVersion: arg.talker.sessionVersion,
                roster: RosterManager.getInstance().updateCache({ id: arg.talker.id })
            }
        }

        if (this.message &&
            this.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT &&
            this.message.fromRoster &&
            this.message.fromRoster.id != YYIMChat.getUserID()) {
            this.talker = {
                id: this.message.fromRoster.id,
                sessionVersion: this.message.sessionVersion,
                roster: this.message.fromRoster
            };
        }

        if (this.talker &&
            this.talker.sessionVersion != this.sessionVersion) {
            delete this.talker;
        }

        if (this.id == YYIMChat.getUserID()) {
            this.isAssistant = true;
            this.from = AssistantManager.getInstance().updateCache({
                id: YYIMChat.getUserID()
            });
        }

        if (this.from && this.from.spaceId && !this.spaceId) {
            this.spaceId = this.from.spaceId;
        }

        this.maxVersion = Math.min(this.sessionVersion, this.maxVersion);
        this.readedVersion = Math.min(this.readedVersion, this.sessionVersion);
        this.contactReadedVersion = Math.min(this.contactReadedVersion, this.sessionVersion);

        this.offlineNum = this.sessionVersion - (this.maxVersion || this.readedVersion);
        this.msgNum = this.maxVersion - this.minVersion + 1;

        if (arg && arg.revokeVersion &&
            arg.revokeVersion <= this.sessionVersion &&
            arg.revokeVersion > this.readedVersion) {
            this.revokedCount++;
        }

        this.revokedCount = Math.min(this.sessionVersion - this.readedVersion, this.revokedCount);
        this.unreadNum = Math.max(this.sessionVersion - this.readedVersion - this.revokedCount, 0);

        if (this.atVersion &&
            this.atVersion <= this.readedVersion) {
            this.atVersion = 0;
        }

        if (!Math.max(this.minVersion, this.maxVersion)) {
            this.msgNum = 0;
        }

        if (this.message) {
            var CONTENT_TYPE = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;
            switch (this.message.data.contentType) {
                case CONTENT_TYPE.TEXT:
                    this.digest = this.message.data.content;
                    break;
                case CONTENT_TYPE.FILE:
                    this.digest = '[文件]';
                    break;
                case CONTENT_TYPE.IMAGE:
                    this.digest = '[图片]';
                    break;
                case CONTENT_TYPE.REDPACKET:
                    this.digest = '[红包]';
                    break;
                case CONTENT_TYPE.SMALLVIDEO:
                    this.digest = '[小视频]';
                    break;
                case CONTENT_TYPE.REVOCATION:
                    if (this.message) {
                        if (!this.message.received) {
                            this.digest = '您撤回了一条消息';
                        } else {
                            if (this.message.revoker && !this.revoker) {
                                this.revoker = {
                                    id: this.message.revoker.id,
                                    sessionVersion: this.message.sessionVersion,
                                    roster: this.message.revoker
                                };
                            }
                            this.digest = '撤回了一条消息';
                        }
                    }
                    break;
                case CONTENT_TYPE.SINGLEGRAPHIC:
                    this.digest = '[单图文]';
                    if (this.message.data.content &&
                        this.message.data.content.title) {
                        this.digest = this.message.data.content.title;
                    }
                    break;
                case CONTENT_TYPE.MOREGRAPHIC:
                    this.digest = '[多图文]';
                    if (this.message.data.content &&
                        this.message.data.content[0] &&
                        this.message.data.content[0].title) {
                        this.digest = this.message.data.content[0].title;
                    }
                    break;
                case CONTENT_TYPE.AUDO:
                    this.digest = '[音频]';
                    break;
                case CONTENT_TYPE.LOCATION:
                    this.digest = '[位置共享]';
                    break;
                case CONTENT_TYPE.SHARE:
                    this.digest = '[分享]';
                    break;
                default:
                    this.digest = '[新消息]';
            }
        }

        if (!arg.notSave) {
            this.save();
        }
    };

    Digest.prototype.clearHistory = function(arg) {
        this.history.clear();
    };

    Digest.prototype.save = function() {
        var that = this;

        DigestManager.getInstance().getStoraged(function(options) {
            var temp = options.storaged[that.id] || {};

            options.updated[that.id] = {
                id: that.id,
                name: that.name || temp.name,
                type: that.type,
                state: that.state,
                contactReadedVersion: Math.max(that.contactReadedVersion, temp.contactReadedVersion || 0),
                readedVersion: Math.max(that.readedVersion, temp.readedVersion || 0),
                sessionVersion: Math.max(that.sessionVersion, temp.sessionVersion || 0),
                atVersion: that.atVersion,
                revokedCount: that.revokedCount,
                digest: that.digest || temp.digest,
                dateline: Math.max(that.dateline, temp.dateline || 0)
            };

            if (that.revoker) {
                options.updated[that.id].revoker = {
                    id: that.revoker.id,
                    sessionVersion: that.revoker.sessionVersion
                }
            }

            if (that.talker) {
                options.updated[that.id].talker = {
                    id: that.talker.id,
                    sessionVersion: that.talker.sessionVersion
                }
            }

            options.storaged[that.id] = options.updated[that.id];
        });
    };

    function DigestManager() {
        BaseList.apply(this);

        this.unreadTotalNum = 0;
        this.isInitSpaceCache = false;
        this.stickList = new BaseList();
        this.normalList = new BaseList();
        this.spaceList = new BaseList();
        this.digestList = [];
    }

    DigestManager.prototype = new BaseList();

    DigestManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new DigestManager();
        }
        return this._instance;
    };

    DigestManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new Digest(arg);
            }
            this.set(item.id, item);
            if (!this.isInitSpaceCache) {
                this.isInitSpaceCache = true;
                this.updateSpaceCache();
            }
            this.updateFoldCache(item.id);
            this.updateStickCache(item.id);
            this.getUnreadNum();
            return item;
        }
    };

    DigestManager.prototype.updateListCache = function() {
        this.digestList.splice(0, this.digestList.length);
        this.digestList = null;
        this.digestList = this.stickList.array.concat(this.normalList.array);
    };

    DigestManager.prototype.getFoldCache = function(id) {
        if (id) {
            var digest = this.get(id);
            if (digest &&
                digest.type == 'fold') {
                return digest.getAll();
            }
        }
    };

    DigestManager.prototype.updateFoldCache = function(id) {
        if (id) {
            var digest = this.get(id);
            if (digest.type != 'fold' &&
                digest.from &&
                digest.from.group) {

                var foldId = encodeURIComponent(digest.from.group);
                var fold = this.get(foldId);
                if (!fold) {
                    fold = new FoldDigest({
                        id: foldId,
                        name: digest.from.group,
                        digest: digest
                    });
                } else {
                    fold.build({
                        id: foldId,
                        name: digest.from.group,
                        digest: digest
                    });
                }
                digest.parent = fold;
                this.set(fold.id, fold);
                this.normalList.set(fold.id, fold, function(obj1, obj2) {
                    return obj2['dateline'] - obj1['dateline'];
                });
                this.updateListCache();
            }
        }
    };

    DigestManager.prototype.getSpace = function(id) {
        return this.spaceList.get(id);
    };

    DigestManager.prototype.updateSpaceCache = function(list) {
        var that = this;
        var updateFun = function(list) {
            if (YYIMUtil['isWhateType'](list, 'Array')) {
                that.spaceList.clear();
                list.forEach(function(item, index) {
                    that.spaceList.set((item.id || item.qz_id), that.spaceList.get(item.id || item.qz_id) || {
                        id: item.id || item.qz_id,
                        name: item.name || item.qz_name
                    });
                });
                that.getUnreadNum(0);
            }
        };

        if (YYIMUtil['isWhateType'](list, 'Array')) {
            updateFun(list);
        } else {
            YYIMCacheManager.getInstance().getSpaceList(function(list) {
                updateFun(list);
            });
        }
    };

    DigestManager.prototype.getUnreadNum = function(delay) {
        var that = this;
        clearTimeout(this.getUnreadNumTimer);

        if (!YYIMUtil['isWhateType'](delay, 'Number')) {
            delay = 500;
        }

        this.getUnreadNumTimer = setTimeout(function() {
            that.spaceList.forEach(function(item, index, list) {
                item.unreadTotalNum = 0;
                item.unreadSpaceNum = 0;
            });

            that.unreadTotalNum = 0;
            var unreadOtherSpaceNum = 0;
            that.digestList.filter(function(item, index, list) {
                if ((item.type != 'fold') &&
                    item.from &&
                    !item.parent &&
                    !item.from.group) {

                    if (!item.from.mute && item.unreadNum > 0) {
                        that.spaceList.forEach(function(space, index, list) {
                            if (!item.spaceId) {
                                space.unreadTotalNum += item.unreadNum;
                            } else if (item.spaceId == space.id) {
                                space.unreadSpaceNum += item.unreadNum;
                                space.unreadTotalNum += item.unreadNum;
                            }
                        });

                        if (item.spaceId &&
                            that.spaceList.get(item.spaceId)) {
                            unreadOtherSpaceNum += item.unreadNum;
                        }

                        if (!item.spaceId ||
                            that.spaceList.get(item.spaceId)) {
                            that.unreadTotalNum += item.unreadNum;
                        }

                    }
                }
            });

            that.spaceList.forEach(function(space) {
                space.unreadOtherSpaceNum = Math.max((unreadOtherSpaceNum - space.unreadSpaceNum), 0);
            });

            YYIMCacheManager.getInstance().onUnReadedNumChanged({
                unreadTotalNum: that.unreadTotalNum,
                current: that.spaceList.get(that.getSpaceId()),
                list: that.spaceList.list
            });
        }, delay);
    };

    DigestManager.prototype.updateStickCache = function(id, stick) {
        if (id) {
            var digest = this.get(id);
            if (digest) {
                if (digest.type == 'flod') {
                    this.normalList.set(digest.id, digest, function(obj1, obj2) {
                        return obj2['dateline'] - obj1['dateline'];
                    });
                    this.updateListCache();
                } else if (digest.from) {
                    if (YYIMUtil['isWhateType'](stick, 'Boolean')) {
                        digest.from.build({
                            stick: stick
                        });
                    }
                    if (digest.from.stick) {
                        this.stickList.set(digest.id, digest, function(obj1, obj2) {
                            return obj2['dateline'] - obj1['dateline'];
                        });
                        this.normalList.remove(id);
                    } else {
                        this.normalList.set(digest.id, digest, function(obj1, obj2) {
                            return obj2['dateline'] - obj1['dateline'];
                        });
                        this.stickList.remove(id);
                    }
                    this.updateListCache();
                    if (digest.parent) {
                        digest.parent.updateStickCache(id, stick);
                    }
                }
            }
        }
    };

    DigestManager.prototype.getSpaceId = function() {
        var getSpaceId = YYIMCacheManager.getInstance().getSpaceId;
        if (getSpaceId) {
            return getSpaceId();
        }
    };

    DigestManager.prototype.queryDigests = function(keyword) {
        var that = this;
        if (keyword) {
            return this.filter(function(item, index) {
                if ((!item.spaceId || item.spaceId == that.getSpaceId()) && item.from) {
                    if (item.from.name && item.from.name.indexOf(keyword) != -1 ||
                        item.from.initial && item.from.initial.indexOf(keyword) != -1 ||
                        item.from.integrated && item.from.integrated.indexOf(keyword) != -1) {
                        return true;
                    }
                }
                return false;
            });
        }
    };

    DigestManager.prototype.getPrev = function(id) {
        if (id) {
            var digest = this.get(id),
                list;
            if (digest && digest.parent) {
                list = this.getFoldCache(digest.parent.id);
            } else {
                list = this.getAll();
            }
            var index = list.indexOf(digest);
            if (index > 0) {
                return list[index - 1];
            }
        }
    };

    DigestManager.prototype.getNext = function(id) {
        if (id) {
            var digest = this.get(id),
                list;
            if (digest && digest.parent) {
                list = this.getFoldCache(digest.parent.id);
            } else {
                list = this.getAll();
            }
            var index = list.indexOf(digest);
            if (index > -1) {
                return list[index + 1];
            }
        }
    };

    DigestManager.prototype.getAll = function() {
        var spaceId = this.getSpaceId();
        var that = this;

        this.forEach(function(item, index, list) {
            if (item.type == 'fold' &&
                item.spaceId != spaceId) {
                item.getSpaceAttributes();

                that.normalList.sort(function(obj1, obj2) {
                    return obj2['dateline'] - obj1['dateline'];
                });

                that.updateListCache();
            }
        });

        return this.digestList.filter(function(item, index, list) {
            return ((item.type != 'fold') &&
                    item.from &&
                    !item.parent &&
                    !item.from.group &&
                    (!item.spaceId || item.spaceId == spaceId)) ||
                ((item.type == 'fold') && (item.spaceId == spaceId));
        });
    };

    DigestManager.prototype.removeCache = function(id, isAtOnce) {
        if (id) {
            var digest = this.get(id);
            if (digest && digest.type != 'fold') {
                if (digest.parent &&
                    digest.parent.type == 'fold') {
                    digest.parent.removeCache(id);
                }
                this.stickList.remove(id);
                this.normalList.remove(id);
                this.remove(id);
                this.save([id], isAtOnce);
                this.updateListCache();
                this.getUnreadNum();
                return digest;
            }
        }
    };

    DigestManager.prototype.resetVersionCache = function(id) {
        if (id) {
            var digest = this.get(id);
            if (digest && digest.type != 'fold') {
                digest.resetVersion();
            }
        }
    };

    DigestManager.prototype.initCache = function(arg) {
        arg = arg || {};
        var that = this;
        this.getLocal(function(timeStamp) {
            arg.localLoaded && arg.localLoaded();
            that.getRemote({
                timeStamp: timeStamp,
                success: arg.remoteLoaded,
                error: arg.error
            });
        });
    };

    DigestManager.prototype.getStoraged = function(callback) {
        clearTimeout(this.storagedTimer || 0);
        var that = this;
        var timeStamp = Number(YYIMUtil['localstorage']['getItem']('YKJ_DIGEST_TIME_' + YYIMChat.getUserNode())) || 0;
        if (!this.storaged) {
            this.storaged = YYIMUtil['localstorage']['getItem']('YKJ_DIGEST_' + YYIMChat.getUserNode()) || '';
            try {
                this.storaged = JSON.parse(this.storaged);
            } catch (e) {
                this.storaged = {};
                timeStamp = 0;
                YYIMUtil['localstorage']['setItem']('YKJ_DIGEST_TIME_' + YYIMChat.getUserNode(), timeStamp);
            }
        }

        this.storaged = this.storaged || {};
        this.removed = this.removed || [];
        this.updated = this.updated || {};

        var save = function() {
            if (that.updated ||
                that.removed) {

                var storaged = YYIMUtil['localstorage']['getItem']('YKJ_DIGEST_' + YYIMChat.getUserNode()) || '';
                try {
                    storaged = JSON.parse(storaged);
                } catch (e) {
                    storaged = {};
                }

                var changed = false;

                if (that.updated) {
                    for (var x in that.updated) {
                        if (that.updated.hasOwnProperty(x)) {
                            storaged[x] = that.updated[x];
                            changed = true;
                        }
                    }
                }

                if (that.removed) {
                    for (var x in that.removed) {
                        if (that.removed.hasOwnProperty(x)) {
                            delete storaged[that.removed[x]];
                            changed = true;
                        }
                    }
                }

                if (changed) {
                    YYIMUtil['localstorage']['setItem']('YKJ_DIGEST_' + YYIMChat.getUserNode(), JSON.stringify(storaged));
                }

                storaged = null;
                that.storaged = null;
                that.updated = null;
                that.removed = null;
            }
        };

        callback && callback({
            storaged: this.storaged,
            updated: this.updated,
            removed: this.removed,
            timeStamp: timeStamp,
            save: save
        });

        this.storagedTimer = setTimeout(save, 1000);
    };

    DigestManager.prototype.getLocal = function(callback) {
        var that = this;
        var timeStamp = 0;
        this.getStoraged(function(options) {
            for (var x in options.storaged) {
                if (options.storaged.hasOwnProperty(x)) {
                    var item = options.storaged[x];
                    if (item.state == config.DIGEST_STATE.EXISTS) {
                        item.notSave = true;
                        item.loadedInfo = true;
                        that.updateCache(item);
                    } else if (item.state == config.DIGEST_STATE.REMOVE) {
                        that.removeCache(item.id);
                        if (item.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
                            GroupManager.getInstance().removeCache(item.id, true);
                        }
                    }
                }
            }
            timeStamp = options.timeStamp;
            options.save && options.save();
        });
        callback && callback(timeStamp);
    };

    /**
     * removeRecentDigest
     * @param {Object} arg {
     * 	id: String,
     *  type: String,
     *  success: function
     * }
     */
    DigestManager.prototype.removeRecentDigest = function(arg) {
        if (arg && arg.id) {
            var that = this;
            var digest = this.get(arg.id);
            YYIMChat.removeRecentDigest({
                id: arg.id,
                type: arg.type,
                success: function(result) {
                    if (result) {
                        var target = that.getNext(arg.id);
                        if (!target) {
                            target = that.getPrev(arg.id);
                        }
                        var removed = that.removeCache(arg.id);
                        MessageManager.getInstance().removeMessageList(arg.id);
                        arg.success && arg.success({
                            id: arg.id,
                            type: arg.type,
                            removed: removed,
                            target: target
                        });
                        arg = null;
                    }
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    DigestManager.prototype.getRemote = function(arg) {
        var that = this;
        if (arg) {
            YYIMChat.getRecentDigset({
                startDate: arg.timeStamp || 0,
                success: function(data) {

                    that.getStoraged(function(options) {
                        for (var y in data.list) {
                            if (data.list.hasOwnProperty(y)) {
                                var item = data.list[y];
                                if (item.state == config.DIGEST_STATE.EXISTS) {
                                    item.loadedInfo = true;
                                    that.updateCache(item);
                                } else if (item.state == config.DIGEST_STATE.REMOVE) {
                                    that.removeCache(item.id);
                                    if (item.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
                                        GroupManager.getInstance().removeCache(item.id, true);
                                    }
                                }
                            }
                        }
                        options.save && options.save();
                    });

                    YYIMUtil['localstorage']['setItem']('YKJ_DIGEST_TIME_' + YYIMChat.getUserNode(), data.ts);

                    var pubaccountIds = [];
                    that.forEach(function(item, index, list) {
                        if (item.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
                            pubaccountIds.push(item.id);
                        }
                    });

                    arg.success && arg.success({
                        pubaccountIds: pubaccountIds
                    });
                    arg = null;
                },
                error: arg.error
            });
        }
    };

    DigestManager.prototype.save = function(exclude, isAtOnce) {
        if (YYIMUtil['isWhateType'](exclude, 'Array')) {
            this.getStoraged(function(options) {
                for (var y in exclude) {
                    if (exclude.hasOwnProperty(y)) {
                        options.removed.push(exclude[y]);
                    }
                }
                if (isAtOnce === true) {
                    options.save && options.save();
                }
                exclude = null;
                isAtOnce = null;
            });
        }
    };

    DigestManager.prototype.destory = function() {
        this.unreadTotalNum = 0;
        this.isInitSpaceCache = false;
        this.clear();
        this.stickList.clear();
        this.normalList.clear();
        this.spaceList.clear();
        this.digestList.length = 0;
    };

    function FoldDigest(arg) {
        BaseList.apply(this);
        this.type = 'fold';
        this.stickList = new BaseList();
        this.normalList = new BaseList();
        this.spaceList = new BaseList();
        this.digestList = [];
        this.build(arg);
    }

    FoldDigest.prototype = new BaseList();

    FoldDigest.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.name = arg.name || this.name;

        this.updateCache(arg);
    };

    FoldDigest.prototype.updateCache = function(arg) {
        if (arg && arg.digest) {
            var digest = arg.digest;
            this.set(digest.id, digest);
            this.updateStickCache(digest.id);
            this.updateSpaceCache(digest.id);
            this.getUnreadNum();
            this.getSpaceAttributes();
        }
    };

    FoldDigest.prototype.updateListCache = function() {
        this.digestList.splice(0, this.digestList.length);
        this.digestList = null;
        this.digestList = this.stickList.array.concat(this.normalList.array);
    };

    FoldDigest.prototype.getUnreadNum = function() {
        var that = this;
        clearTimeout(this.getUnreadNumTimer);

        that.spaceList.forEach(function(space, index, list) {
            space.unreadNum = 0;
        });

        that.digestList.filter(function(item, index, list) {
            if (item.from &&
                item.parent) {

                if (!item.from.mute &&
                    item.unreadNum > 0) {

                    that.spaceList.forEach(function(space, index, list) {
                        if (!item.spaceId || item.spaceId == space.id) {
                            space.unreadNum += item.unreadNum;
                        }
                    });
                }
            }
        });
    };

    FoldDigest.prototype.updateSpaceCache = function(id) {
        if (id) {
            var digest = this.get(id);
            if (digest && digest.type != 'fold') {
                if (digest.from) {
                    var spaceId = digest.spaceId;
                    if (spaceId) {
                        this.spaceList.set(spaceId, this.spaceList.get(spaceId) || {
                            id: spaceId,
                            dateline: 0
                        });

                        var space = this.spaceList.get(spaceId);
                        space.dateline = Math.max(space.dateline, digest.dateline);
                    }
                }
            }
        }
    };

    FoldDigest.prototype.updateStickCache = function(id, stick) {
        if (id) {
            var digest = this.get(id);
            if (digest) {
                if (YYIMUtil['isWhateType'](stick, 'Boolean')) {
                    digest.from.build({
                        stick: stick
                    });
                }
                if (digest.from.stick) {
                    this.stickList.set(digest.id, digest, function(obj1, obj2) {
                        return obj2['dateline'] - obj1['dateline'];
                    });
                    this.normalList.remove(id);
                } else {
                    this.normalList.set(digest.id, digest, function(obj1, obj2) {
                        return obj2['dateline'] - obj1['dateline'];
                    });
                    this.stickList.remove(id);
                }
                this.updateListCache();
            }
        }
    };

    FoldDigest.prototype.getSpaceId = function() {
        var getSpaceId = YYIMCacheManager.getInstance().getSpaceId;
        if (getSpaceId) {
            return getSpaceId();
        }
    };

    FoldDigest.prototype.removeCache = function(id) {
        if (id) {
            var digest = this.get(id);
            if (digest) {
                var spaceId = digest.spaceId;

                if (!digest.from &&
                    !digest.from.mute) {
                    this.spaceList.forEach(function(space, index, list) {
                        if (!spaceId || space.id == spaceId) {
                            space.unreadNum -= digest.unreadNum;
                        }
                    });
                }
                this.normalList.remove(id);
                this.stickList.remove(id);
                this.remove(id);
                this.getSpaceAttributes();
                this.updateListCache();
                return digest;
            }
        }
    };

    FoldDigest.prototype.getAll = function() {
        var spaceId = this.getSpaceId();
        return this.digestList.filter(function(item, index, list) {
            return !item.spaceId || (item.spaceId == spaceId);
        });
    };

    FoldDigest.prototype.getSpaceAttributes = function() {
        var spaceId = this.getSpaceId();
        var space = this.spaceList.get(spaceId);
        if (space) {
            this.spaceId = space.id;
            this.dateline = space.dateline;
            this.unreadNum = space.unreadNum;
        } else {
            this.spaceId = null;
            this.dateline = 0;
            this.unreadNum = 0;
        }
    };


    function File(arg) {
        this.build(arg);
    }

    File.prototype.build = function(arg) {
        this.id = arg.id || arg.packetId || this.id;
        this.name = arg.name || arg.fileName || this.name || this.id;
        this.size = arg.size || arg.fileSize || this.size || 0;
        this.type = arg.type || arg.suffix || this.type;
        this.from = arg.from || this.from || 0;
        this.dateline = arg.dateline || arg.ts || this.dateline || 0;
        this.path = arg.path || arg.attachId || this.path;

        this.location = arg.location || this.location;

        this.sysInfo(arg);
    };

    File.prototype.sysInfo = function(arg) {
        var that = this;

        if (arg) {

            if (arg.creater) {
                this.creater = RosterManager.getInstance().updateCache({ id: arg.creater });
            }

            if (arg.owner &&
                YYIMUtil['isWhateType'](arg.owner, 'Array')) {
                for (var x in arg.owner) {
                    if (arg.owner.hasOwnProperty(x)) {
                        var owner = arg.owner[x];
                        if (owner.id != YYIMChat.getUserID()) {
                            switch (owner.type) {
                                case YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT:
                                    this.opposite = GroupManager.getInstance().updateCache({ id: owner.id });
                                    break;
                                case YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT:
                                    this.opposite = PubAccountManager.getInstance().updateCache({ id: owner.id });
                                    break;
                                default:
                                    this.opposite = RosterManager.getInstance().updateCache({ id: owner.id });
                            }
                        }
                    }
                }
            }
        }

        if (!this.location) {
            MessageManager.getInstance().getStoraged(function(options) {
                var storaged = options.storaged[that.id];
                if (storaged) {
                    that.location = storaged.location;
                }
            });
        }

        this.path = YYIMChat.getFileUrl(this.path);

        if (this.name &&
            !this.type) { //获取文件后缀名
            this.name = this.name.trim();
            var pattern = /.+\.(\w+)$/;
            var matches = pattern.exec(this.name);
            if (matches && matches[1]) {
                this.type = matches[1];
            }
        }
    };



    function FileManager() {
        this.fileList = new BaseList();
        BaseList.apply(this);
    }

    FileManager.prototype = new BaseList();

    FileManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new FileManager();
        }
        return this._instance;
    };

    FileManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new File(arg);
                this.set(item.id, item);
            }

            if (item.opposite) {
                var target = item.opposite.id;
                this.fileList = this.fileList || new BaseList();
                this.fileList.set(target, this.fileList.get(target) || new BaseList());
                this.fileList.get(target).set(item.id, item, function(obj1, obj2) {
                    return obj2['dateline'] - obj1['dateline'];
                });
            }
            return item;
        }
    };

    /**
     * 获取群组共享文件 rongqb 20170607 
     * arg {
     *  id: String,
     *  fileType: String, //'file','image','microvideo'
     *  type: String,//'chat','groupchat'
     *  start: number,
     *  size: number
     * }
     */
    FileManager.prototype.getSharedFiles = function(arg) {
        if (arg && arg.id && arg.type) {
            var that = this;
            var start = 0;

            this.fileList = this.fileList || new BaseList();
            var list = this.fileList.get(arg.id);
            if (list) {
                start = list.length();
            }

            YYIMChat.getSharedFiles({
                id: arg.id,
                fileType: arg.fileType, //'file','image','microvideo'
                type: arg.type, //'chat','groupchat'
                start: arg.start || start,
                size: arg.size,
                success: function(result) {
                    var isEnd = false;
                    var data = [];

                    if (result) {
                        if (result.list) {
                            for (var x in result.list) {
                                if (result.list.hasOwnProperty(x)) {
                                    that.updateCache(result.list[x]);
                                }
                            }
                        }

                        list = that.fileList.get(arg.id);
                        if (list) {
                            data = list.getAll();
                            if (result.total <= list.length()) {
                                isEnd = true;
                            }
                        }
                    }

                    arg.success && arg.success({
                        isEnd: isEnd,
                        list: data
                    });
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    FileManager.prototype.getFileList = function(target) {
        if (target) {
            this.fileList = this.fileList || new BaseList();
            var list = this.fileList.get(target);
            if (list) {
                return list.getAll();
            }
        }
    };

    FileManager.prototype.removeFileList = function(target) {
        if (target) {
            var that = this;
            this.fileList = this.fileList || new BaseList();
            var list = this.fileList.get(target);
            if (list) {
                list.forEach(function(item, index) {
                    that.remove(item.id);
                });
                list.clear();
            }
        }
    };

    FileManager.prototype.removeCache = function(id) {
        var file = this.get(id);
        if (file &&
            file.opposite) {
            this.remove(id);
            this.fileList = this.fileList || new BaseList();
            var list = this.fileList.get(file.opposite.id);
            if (list) {
                list.remove(id);
            }
        }
    };

    FileManager.prototype.removeLocalFile = function(id) {
        var file = this.get(id);
        if (file) {
            file.location = null;

            var message = MessageManager.getInstance().get(id);
            if (message) {
                MessageManager.getInstance().removeLocalFile(id);
            } else {
                MessageManager.getInstance().getStoraged(function(options) {
                    options.removed.push(id);
                    options.save && options.save();
                });
            }
        }
    };

    FileManager.prototype.setLocalFile = function(id, location) {
        var file = this.get(id);
        if (file &&
            (location)) {
            if (location) {
                file.location = location;
            }

            var message = MessageManager.getInstance().get(id);
            if (message) {
                MessageManager.getInstance().setLocalFile(id, location);
            } else {
                MessageManager.getInstance().getStoraged(function(options) {
                    options.updated[id] = {
                        location: file.location
                    };
                    options.storaged[id] = options.updated[id];
                    file = null;
                    options.save && options.save();
                });
            }
        }
    };

    FileManager.prototype.destory = function() {
        this.fileList.clear();
        this.fileList = null;
        this.clear();
    };



    function Group(arg) {
        BaseList.apply(this);
        this.build(arg);
    }

    Group.prototype = new BaseList();

    Group.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.getAttributes();

        if (!this.loadedInfo || arg.strong) {
            this.name = arg.name || this.name;
            this.spellName = arg.spellName || this.spellName;
            this.initial = arg.initial || this.initial;
            this.integrated = arg.integrated || this.integrated;
            this.numberOfMembers = arg.numberOfMembers || this.numberOfMembers;
            this.creater = arg.creater || this.creater;
            this.photo = arg.photo || this.photo;
            this.dateline = arg.ts || arg.dateline || this.dateline || 0;
            this.loadMemberTime = Math.max(Number(arg.loadMemberTime) || 0, this.loadMemberTime) || 0;

            this.loadedInfo = YYIMUtil['isWhateType'](arg.loadedInfo, 'Boolean') ? arg.loadedInfo : !!this.loadedInfo;
            this.safeModel = YYIMUtil['isWhateType'](arg.safeModel, 'Boolean') ? arg.safeModel : !!this.safeModel;
            this.collected = (YYIMUtil['isWhateType'](arg.collected, 'Boolean') || YYIMUtil['isWhateType'](arg.collected, 'Number')) ? !!arg.collected : !!this.collected;
            this.updateMemberList(arg.members);
        }
        this.id += '';
        this.mute = YYIMUtil['isWhateType'](arg.mute, 'Boolean') ? arg.mute : !!this.mute;
        this.isMemberName = YYIMUtil['isWhateType'](arg.isMemberName, 'Boolean') ? arg.isMemberName : (YYIMUtil['isWhateType'](this.isMemberName, 'Boolean') ? this.isMemberName : true);
        this.stick = YYIMUtil['isWhateType'](arg.stick, 'Boolean') ? arg.stick : !!this.stick;

        this.syncInfo(arg);
        this.initInfo(arg);
    };

    Group.prototype.isExpires = function() {
        if (!this.loadMemberTime ||
            ((new Date().getTime() - this.loadMemberTime) > (config.ROSTER_INFO_MAXTIME / 2))) {
            return true;
        }
        return false;
    };

    Group.prototype.initInfo = function(arg) {
        var that = this;
        if (!this.loadedInfo ||
            arg.force === true) {

            if (arg &&
                YYIMUtil['isWhateType'](arg.infoLoaded, 'Function')) {
                this.infoLoadedList = this.infoLoadedList || [];
                this.infoLoadedList.push(arg.infoLoaded);
            }

            if (!this.querying) {
                var info;
                GroupManager.getInstance().getStoraged(function(options) {
                    info = options.storaged[that.id];
                });

                if (!info ||
                    arg.force === true) {
                    this.querying = true;
                    YYIMChat.getChatGroupInfo({
                        id: this.id,
                        success: function(data) {
                            data.strong = true;
                            if (data.name) {
                                data.isMemberName = false;
                            }
                            that.loadedInfo = true;
                            that.build(data);

                            that.querying = false;

                            if (that.infoLoadedList &&
                                that.infoLoadedList.length) {
                                while (that.infoLoadedList.length) {
                                    that.infoLoadedList.shift()(that);
                                }
                            }
                        }
                    });
                } else {
                    info.strong = true;
                    that.loadedInfo = true;
                    that.build(info);

                    if (that.infoLoadedList &&
                        that.infoLoadedList.length) {
                        while (that.infoLoadedList.length) {
                            that.infoLoadedList.shift()(that);
                        }
                    }
                }
            };
        } else {
            arg && arg.infoLoaded && arg.infoLoaded(that);
        }
    };

    Group.prototype.setAdmins = function(adminIds) {
        if (YYIMChat.getUtil()['isWhateType'](adminIds, 'Array')) {
            for (var x in adminIds) {
                if (adminIds.hasOwnProperty(x)) {
                    var member = this.get(adminIds[x]);
                    if (member &&
                        (member.affiliation != 'owner' || member.affiliation != 'admin')) {
                        member.affiliation = 'admin';
                        this.administrator = this.administrator || new BaseList();
                        this.administrator.set(member.id, member);
                    }
                }
            }
        }
    };

    Group.prototype.updateMemberList = function(members) {
        if (!!members && members.length) {
            for (var x in members) {
                if (members.hasOwnProperty(x)) {
                    var item = members[x];

                    if (item.id == YYIMChat.getUserID() &&
                        item.messageVersionWhenJoin) {
                        this.messageVersionWhenJoin = item.messageVersionWhenJoin;
                    }

                    var member = this.get(item.id);
                    if (member) {
                        member.build(item);
                    } else {
                        member = new Member(item);
                    }
                    this.set(member.id, member, function(member1, member2) {
                        return member1['joinDate'] - member2['joinDate'];
                    });

                    if (member.affiliation === 'owner') {
                        this.owner = member;
                    } else if (member.affiliation === 'admin') {
                        this.administrator = this.administrator || new BaseList();
                        this.administrator.set(member.id, member);
                    }

                }
            }
        }
    };

    Group.prototype.syncInfo = function(arg) {
        if (this.photo) {
            this.photo = YYIMChat.getFileUrl(this.photo);
            if (!(/\.thumb\.jpg$/.test(this.photo))) {
                this.photo += '.thumb.jpg';
            }
        }

        this.getProfileInfo(arg);

        if (this.isMemberName) {
            var i = this.length();
            if (i <= 1) {
                this.name == '群组';
            } else {
                var names = [];
                var all = this.getAll();
                while (i--) {
                    if (all.hasOwnProperty(i)) {
                        if (all[i].id != YYIMChat.getUserID() &&
                            all[i].roster) {
                            names.push(all[i].roster.name);
                        }
                        if (names.length == 5) {
                            break;
                        }
                    }
                }
                this.name = names.join(',');
            }
        }

        if (this.name) {
            if (this.name != this.spellName) {
                this.initial = SpellUtil.getInitial(this.name);
                this.integrated = SpellUtil.getIntegrated(this.name);
                this.spellName = this.name;
            }
        } else {
            this.initial = '';
            this.integrated = '';
            this.nameColor = '';
        }

        if (arg && arg.strong) {
            this.save();
        }
    };

    Group.prototype.getProfileInfo = function(arg) {
        if (!arg || typeof arg.mute != 'boolean') {
            var isMute = ProfileManager.isMute(this.id);
            if (this.mute !== isMute) {
                this.mute = isMute;
            }
        }

        if (!arg || typeof arg.stick != 'boolean') {
            var isStick = ProfileManager.isStick(this.id);
            if (this.stick !== isStick) {
                this.stick = isStick;
            }
        }
    };

    Group.prototype.getPhotoUrl = function() {
        return this.photo;
    };

    Group.prototype.getAttributes = function() {
        if (this.id && !this.spaceId) {
            var splits = this.id.split(/_/);
            if (splits.length > 2) {
                if (config.GROUP_TYPE[splits[0]]) {
                    this.groupType = splits[0];

                    if (splits[2] &&
                        config.GROUP_TYPE[splits[0]][splits[2]]) {
                        this.spaceId = splits[1];
                        this.groupType = splits[2];
                    }

                    if (this.groupType == config.GROUP_TYPE['group'].name &&
                        splits[2]) {
                        this.spaceId = splits[1];
                        this.teamId = splits[2];
                        this.defaultPhoto = config.GROUP_TYPE['group'].photo;
                    }

                    if (this.groupType == config.GROUP_TYPE['jgroup'].name &&
                        splits[1]) {
                        this.spaceId = splits[1];
                    }
                }
            }
        }
    };

    Group.prototype.removeMember = function(id) {
        this.remove(id);
        if (this.administrator) {
            this.administrator.remove(id);
        }
        this.save();
    };

    Group.prototype.clearMemberCache = function() {
        this.clear();
        if (this.administrator) {
            this.administrator.clear();
        }
    };

    Group.prototype.save = function() {
        var that = this;

        GroupManager.getInstance().getStoraged(function(options) {
            var members = [];

            var adminIds = [];
            if (that.owner) {
                members.push({
                    id: that.owner.id,
                    affiliation: 'owner',
                    joinDate: 0,
                    messageVersionWhenJoin: that.owner.messageVersionWhenJoin
                });
                adminIds.push(that.owner.id);
            }

            if (that.administrator) {
                that.administrator.forEach(function(item, index) {
                    members.push({
                        id: item.id,
                        affiliation: 'admin',
                        joinDate: item.joinDate,
                        messageVersionWhenJoin: item.messageVersionWhenJoin
                    });
                    adminIds.push(item.id);
                });
            }

            var all = that.getAll();
            for (var x in all) {
                if (all.hasOwnProperty(x)) {
                    if (adminIds.indexOf(all[x].id) == -1) {
                        members.push({
                            id: all[x].id,
                            affiliation: 'memeber',
                            joinDate: all[x].joinDate,
                            messageVersionWhenJoin: all[x].messageVersionWhenJoin
                        });
                        if ((members.length - adminIds.length) >= 5) {
                            break;
                        }
                    }
                }
            }

            options.updated[that.id] = {
                id: that.id,
                name: that.name,
                safeModel: that.safeModel,
                spellName: that.spellName,
                initial: that.initial,
                integrated: that.integrated,
                photo: that.photo,
                dateline: that.dateline,
                members: members,
                numberOfMembers: that.numberOfMembers,
                isMemberName: that.isMemberName
            };

            options.storaged[that.id] = options.updated[that.id];
        });
    };

    function GroupManager() {
        this.leftRooms = [];
        BaseList.apply(this);
    }

    GroupManager.prototype = new BaseList();

    GroupManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new GroupManager();
        }
        return this._instance;
    };

    GroupManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new Group(arg);
                this.set(item.id, item);
            }
            return item;
        }
    };

    GroupManager.prototype.getSpaceId = function() {
        var getSpaceId = YYIMCacheManager.getInstance().getSpaceId;
        if (getSpaceId) {
            return getSpaceId();
        }
    };

    GroupManager.prototype.getGroups = function() {
        var that = this;
        return this.filter(function(item, index) {
            if (!item.spaceId ||
                item.spaceId == that.getSpaceId()) {

                if (!item.groupType ||
                    item.groupType != config.GROUP_TYPE['group'].name) {
                    return true;
                }
            }
            return false;
        });
    };

    GroupManager.prototype.queryGroups = function(keyword) {
        var that = this;
        if (keyword) {
            return this.filter(function(item, index) {
                if (!item.spaceId ||
                    item.spaceId == that.getSpaceId()) {

                    if (!item.groupType ||
                        item.groupType != config.GROUP_TYPE['group'].name) {

                        if (item.name && item.name.indexOf(keyword) != -1 ||
                            item.initial && item.initial.indexOf(keyword) != -1 ||
                            item.integrated && item.integrated.indexOf(keyword) != -1) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
    };

    GroupManager.prototype.getTeams = function() {
        var that = this;
        return this.filter(function(item, index) {
            if (item.spaceId == that.getSpaceId()) {
                if (item.groupType == config.GROUP_TYPE['group'].name) {
                    return true;
                }
            }
            return false;
        });
    };

    GroupManager.prototype.queryTeams = function(keyword) {
        var that = this;
        if (keyword) {
            return this.filter(function(item, index) {
                if (item.spaceId == that.getSpaceId()) {
                    if (item.groupType == config.GROUP_TYPE['group'].name) {
                        if (item.name && item.name.indexOf(keyword) != -1 ||
                            item.initial && item.initial.indexOf(keyword) != -1 ||
                            item.integrated && item.integrated.indexOf(keyword) != -1) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
    };

    /**
     * 创建群组
     * @param arg {
     * 	name: String,
     *  members: Array,
     *  success: function,
     *  error: function
     * }
     */
    GroupManager.prototype.createChatGroup = function(arg) {
        var that = this;
        if (arg && arg.members) {
            YYIMChat.createChatGroup({
                name: arg.name,
                members: arg.members || [],
                success: function(data) {
                    data.strong = true;
                    data.loadedInfo = true;
                    if (data.name) {
                        data.isMemberName = false;
                    }
                    var group = that.updateCache(data);
                    arg.success && arg.success(group);
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 加入群组
     * @param {Object} arg{
     * 	id: String,
     *  success: function,
     *  error: function
     * }
     */
    GroupManager.prototype.joinChatGroup = function(arg) {
        if (arg && arg.id) {
            var that = this;
            var group = this.get(arg.id);
            if (!group) {
                YYIMChat.joinChatGroup({
                    id: arg.id,
                    success: function(result) {
                        var group = that.updateCache({ id: result.id });
                        arg.success && arg.success(group);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg.success && arg.success(group);
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 转让群主
     * @param {Object} arg 
     * {to:String,
     * 	newOwner:string,
     * 	success:function,
     * 	error:function
     * }
     */
    GroupManager.prototype.transferChatGroup = function(arg) {
        var group = this.get(arg.to);
        if (group &&
            group.owner &&
            group.owner.id == YYIMChat.getUserID()) {
            var newOwner = group.get(arg.newOwner);
            if (newOwner) {
                var that = this;
                YYIMChat.transferChatGroup({
                    to: arg.to || arg.id,
                    newOwner: arg.newOwner,
                    success: function(data) {
                        data.strong = true;
                        var group = that.updateCache(data);
                        arg.success && arg.success(group);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg && arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 群主解散群
     * @param {Object} arg {
     * 	to: String,
     *  success:funciton
     * }
     */
    GroupManager.prototype.dismissChatGroup = function(arg) {
        var group = this.get(arg.to);
        var that = this;
        if (group &&
            group.owner &&
            group.owner.id == YYIMChat.getUserID()) {
            YYIMChat.dismissChatGroup({
                to: arg.to,
                success: function(data) {
                    that.removeCache(data.from);
                    DigestManager.getInstance().removeCache(data.from);
                    arg.success && arg.success(data.from);
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 邀请群成员
     * @param {Object} arg 
     * {to: String,
     * 	members: Array,
     * 	success: function,
     * 	error: function
     * }
     */
    GroupManager.prototype.inviteGroupMember = function(arg) {
        var that = this;
        YYIMChat.inviteGroupMember({
            to: arg.to || arg.id,
            members: arg.members || [],
            success: function(data) {
                data.strong = true;
                var group = that.updateCache(data);
                arg.success && arg.success(group);
                arg = null;
            },
            error: arg.error
        });
    };

    /**
     * 更改群名称
     * @param {Object} arg 
     * {to: String,
     * 	name:string, 
     *  success: function,
     *  error: function
     * }
     */
    GroupManager.prototype.modifyChatGroupInfo = function(arg) {
        var group = this.get(arg.to || arg.id);
        if (group &&
            group.owner &&
            group.owner.id === YYIMChat.getUserID()) {
            var that = this;
            YYIMChat.modifyChatGroupInfo({
                to: group.id,
                name: arg.name,
                success: function(data) {
                    data.strong = true;
                    data.loadedInfo = true;
                    if (data.name) {
                        data.isMemberName = false;
                    }
                    var group = that.updateCache(data);
                    arg.success && arg.success(group);
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 群主踢人
     * @param {Object} arg {
     * 	to: String,  //groupId
     *  member: String, //memberId
     *  success: function,
     *  error: function
     * }
     */
    GroupManager.prototype.kickGroupMember = function(arg) {
        var group = this.get(arg.to || arg.id);
        if (group &&
            group.owner &&
            group.owner.id === YYIMChat.getUserID()) {
            var that = this;
            YYIMChat.kickGroupMember({
                to: group.id,
                member: arg.member,
                success: function(data) {
                    data.strong = true;
                    group.clear();
                    group = that.updateCache(data);
                    arg.success && arg.success(group);
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 被群组踢出
     * @param {Object} arg
     */
    GroupManager.prototype.KickedOutByGroup = function(arg) {
        var group = this.get(arg.from);
        if (!!group) {
            if (!arg.to || arg.to === YYIMChat.getUserID()) {
                this.removeCache(arg.from);
                var index = this.leftRooms.indexOf(arg.from);
                if (index == -1) {
                    this.leftRooms.push(arg.from);
                }
            } else {
                group.removeMember(arg.to);
            }
            return group;
        }
    };

    /**
     * 退出群组
     * {to: String,
     * 	success: function,
     *  complete: function
     * }
     */
    GroupManager.prototype.exitChatGroup = function(arg) {
        var group = this.get(arg.to || arg.id);
        if (group) {
            var that = this;
            YYIMChat.exitChatGroup({
                to: group.id,
                success: function(data) {
                    that.removeCache(data.from);
                    DigestManager.getInstance().removeCache(data.from);
                    arg.success && arg.success(data.from);
                    arg = null;
                },
                complete: arg.complete
            });
        }
    };

    /**
     * setAdmins
     * @param {Object} arg {
     * 	id: String,
     *  adminIds: Array,
     *  success: function,
     *  error: function 
     * }
     */
    GroupManager.prototype.setAdmins = function(arg) {
        if (arg && (arg.to || arg.id) &&
            YYIMChat.getUtil()['isWhateType'](arg.adminIds, 'Array')) {
            var group = this.get(arg.to || arg.id);
            if (group) {
                this.getGroupMembers({
                    id: group.id,
                    success: function(group) {
                        group.setAdmins(arg.adminIds);
                        arg.success && arg.success(group);
                    },
                    error: arg.error
                });
            } else {
                arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };
    /**
     * getGroupMembers
     * @param {Object} arg {
     * 	id: String,
     *  strong: Boolean,
     *  success: function,
     *  error: function
     * }
     */
    GroupManager.prototype.getGroupMembers = function(arg) {
        if (arg && (arg.to || arg.id)) {
            var group = this.get(arg.to || arg.id);
            if (group) {
                if (group.isExpires() ||
                    arg.strong === true) {
                    YYIMChat.getGroupMembers({
                        id: group.id,
                        success: function(data) {
                            group.build({
                                loadMemberTime: Date.now(),
                                strong: true,
                                members: data
                            });
                            arg.success && arg.success(group);
                            arg = null;
                        },
                        error: arg.error
                    });
                } else {
                    arg.success && arg.success(group);
                }
            } else {
                arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    GroupManager.prototype.removeCache = function(id, isAtOnce) {
        if (id) {
            var group = this.get(id);
            if (group) {
                this.remove(id);
                this.save([id], isAtOnce);
            }
        }
    };

    GroupManager.prototype.getStoraged = function(callback) {
        clearTimeout(this.storagedTimer || 0);
        var that = this;
        var timeStamp = Number(YYIMUtil['localstorage']['getItem']('YKJ_GROUP_TIME_' + YYIMChat.getUserNode())) || 0;
        if (!this.storaged) {
            this.storaged = YYIMUtil['localstorage']['getItem']('YKJ_GROUP_' + YYIMChat.getUserNode()) || '';
            try {
                this.storaged = JSON.parse(this.storaged);
            } catch (e) {
                this.storaged = {};
                timeStamp = 0;
                YYIMUtil['localstorage']['setItem']('YKJ_GROUP_TIME_' + YYIMChat.getUserNode(), timeStamp);
            }
        }

        this.storaged = this.storaged || {};
        this.removed = this.removed || [];
        this.updated = this.updated || {};

        var save = function() {
            if (that.updated ||
                that.removed) {

                var storaged = YYIMUtil['localstorage']['getItem']('YKJ_GROUP_' + YYIMChat.getUserNode()) || '';
                try {
                    storaged = JSON.parse(storaged);
                } catch (e) {
                    storaged = {};
                }

                var changed = false;

                if (that.updated) {
                    for (var x in that.updated) {
                        if (that.updated.hasOwnProperty(x)) {
                            storaged[x] = that.updated[x];
                            changed = true;
                        }
                    }
                }

                if (that.removed) {
                    for (var x in that.removed) {
                        if (that.removed.hasOwnProperty(x)) {
                            delete storaged[that.removed[x]];
                            changed = true;
                        }
                    }
                }

                if (changed) {
                    YYIMUtil['localstorage']['setItem']('YKJ_GROUP_' + YYIMChat.getUserNode(), JSON.stringify(storaged));
                }

                storaged = null;
                that.storaged = null;
                that.updated = null;
                that.removed = null;
            }
        };

        callback && callback({
            storaged: this.storaged,
            updated: this.updated,
            removed: this.removed,
            timeStamp: timeStamp,
            save: save
        });

        this.storagedTimer = setTimeout(save, 1000);
    };

    GroupManager.prototype.save = function(exclude, isAtOnce) {
        if (YYIMUtil['isWhateType'](exclude, 'Array')) {
            this.getStoraged(function(options) {
                for (var y in exclude) {
                    if (exclude.hasOwnProperty(y)) {
                        options.removed.push(exclude[y]);
                    }
                }

                if (isAtOnce === true) {
                    options.save && options.save();
                }
                exclude = null;
                isAtOnce = null;
            });
        }
    };

    GroupManager.prototype.initCache = function(arg) {
        arg = arg || {};
        var that = this;
        this.getLocal(function(timeStamp) {
            arg.localLoaded && arg.localLoaded();
            that.getRemote({
                timeStamp: timeStamp,
                success: function() {
                    arg.remoteLoaded && arg.remoteLoaded();
                },
                error: arg.error
            });
        });
    };

    GroupManager.prototype.getLocal = function(callback) {
        var that = this;
        var timeStamp = 0;
        this.getStoraged(function(options) {
            for (var x in options.storaged) {
                if (options.storaged.hasOwnProperty(x)) {
                    var item = options.storaged[x];
                    item.loadedInfo = true;
                    item.strong = true;
                    that.updateCache(item);
                }
            }
            timeStamp = options.timeStamp;
            options.save && options.save();
        });
        callback && callback(timeStamp);
    };

    GroupManager.prototype.getRemote = function(arg) {
        var that = this;
        if (arg) {
            YYIMChat.getChatGroups({
                startDate: arg.timeStamp || 0,
                membersLimit: 5,
                success: function(data) {
                    that.leftRooms = data.leftRooms || that.leftRooms;
                    if (that.leftRooms &&
                        that.leftRooms.length) {
                        that.leftRooms.forEach(function(index, item, list) {
                            that.removeCache(item, true);
                        });
                    }

                    that.getStoraged(function(options) {
                        for (var x in data.roomItems) {
                            if (data.roomItems.hasOwnProperty(x)) {
                                var item = data.roomItems[x];
                                item.loadedInfo = true;
                                item.strong = true;
                                if (item.name) {
                                    item.isMemberName = false;
                                }
                                that.updateCache(item);
                            }
                        }
                        options.save && options.save();
                    });

                    YYIMUtil['localstorage']['setItem']('YKJ_GROUP_TIME_' + YYIMChat.getUserNode(), Math.max(arg.timeStamp || 0, data.ts));

                    arg.success && arg.success();
                    arg = null;
                },
                error: arg.error
            });
        }
    };


    GroupManager.prototype.destory = function() {
        this.leftRooms.length = 0;
        this.clear();
    };

    function Member(arg) {
        this.build(arg);
    }

    Member.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.affiliation = arg.affiliation || this.affiliation;
        this.hidden = YYIMUtil['isWhateType'](arg.hidden, 'Boolean') ? arg.hidden : !!this.hidden;
        this.messageVersionWhenJoin = arg.messageVersionWhenJoin || this.messageVersionWhenJoin || 0;
        this.role = arg.role || this.role;
        this.joinDate = arg.joinDate || this.joinDate || 0;

        this.syncInfo(arg);
    };

    Member.prototype.syncInfo = function(arg) {
        if (arg &&
            arg.id &&
            ((arg.name && (arg.name != arg.id)) || arg.photo)) {

            arg.loadedInfo = true;
            arg.strong = true;
            arg.dateline = Date.now();
            this.roster = RosterManager.getInstance().updateCache(arg);
        } else if (this.id) {
            this.roster = RosterManager.getInstance().updateCache({ id: this.id });
        }
    };

    function Message(arg) {
        this.received = false;
        this.build(arg);
    }

    Message.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.revoker = arg.revoker || this.revoker;
        this.type = arg.type || this.type || YYIMChat.getConstants().CHAT_TYPE.CHAT;
        this.data = arg.data || this.data || {};
        this.dateline = arg.dateline || this.data.dateline || this.dateline;

        this.temped = YYIMUtil['isWhateType'](arg.temped, 'Boolean') ? arg.temped : !!this.temped;
        this.sessionVersion = YYIMUtil['isWhateType'](arg.sessionVersion, 'Number') ? arg.sessionVersion : this.sessionVersion;
        this.readed = YYIMUtil['isWhateType'](arg.readed, 'Boolean') ? arg.readed : !!this.readed; //本人是否已读
        this.showInterval = YYIMUtil['isWhateType'](arg.showInterval, 'Boolean') ? arg.showInterval : !!this.showInterval; //显示时间

        this.sysInfo(arg);
    };

    Message.prototype.sysInfo = function(arg) {
        var that = this;
        if (this.data &&
            this.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE) {
            this.data.content.defaultIco = config.FILE.DEFAULT_ICO;
            if (this.data.content.type) {
                this.data.content.fileIco = config.FILE.ICO_URL + this.data.content.type + config.FILE.ICO_SUFFIX;
            }
            this.data.content.fileIco = this.data.content.fileIco || this.data.content.defaultIco;

            MessageManager.getInstance().getStoraged(function(options) {
                var storaged = options.storaged[that.id];
                if (storaged) {
                    if (that.data.content.location) {
                        if (that.data.content.location != storaged.location) {
                            options.updated[that.id] = {
                                location: that.data.content.location
                            };
                            options.storaged[that.id] = options.updated[that.id];
                        }
                    } else {
                        that.data.content.location = storaged.location;
                    }
                } else {
                    if (that.data.content.location) {
                        options.updated[that.id] = {
                            location: that.data.content.location
                        };
                        options.storaged[that.id] = options.updated[that.id];
                    }
                }
            });
        }

        if (this.dateline) {
            this.data.dateline = this.dateline;
        }

        if (!this.to && arg.to) {
            this.to = RosterManager.getInstance().updateCache({ id: arg.to });

            if (this.to.id == YYIMChat.getUserID()) {
                this.received = true;
            }
        }

        if (!this.from && arg.from) {
            switch (this.type) {
                case YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT:
                    this.from = GroupManager.getInstance().updateCache({ id: arg.from.room });
                    if (arg.from.roster) {
                        this.fromRoster = RosterManager.getInstance().updateCache({ id: arg.from.roster });
                        if (this.fromRoster.id == YYIMChat.getUserID()) {
                            this.received = false;
                        }
                    }
                    this.opposite = this.from;
                    break;
                case YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT:
                    this.from = PubAccountManager.getInstance().updateCache({ id: arg.from.room });
                    if (arg.from.roster) {
                        this.fromRoster = RosterManager.getInstance().updateCache({ id: arg.from.roster });
                        if (this.fromRoster.id == YYIMChat.getUserID()) {
                            this.received = false;
                        }
                    }
                    this.opposite = this.from;
                    break;
                default:
                    this.type = YYIMChat.getConstants().CHAT_TYPE.CHAT;
                    this.from = RosterManager.getInstance().updateCache({ id: arg.from });
                    if (this.received) {
                        this.opposite = this.from;
                    } else {
                        this.opposite = this.to;
                    }
            }
        }

        if (this.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.REVOCATION) {
            this.revoker = this.fromRoster || this.from;
        }

        if (arg.resource) {
            this.resource = arg.resource || this.resource;
        }

        if (this.from &&
            this.from.id == YYIMChat.getUserID() &&
            this.to &&
            this.to.id == YYIMChat.getUserID()) {
            this.received = false;
            this.isAssistant = true;

            if (this.resource &&
                !config.isCommonPlatform(this.resource)) {
                this.received = true;
                this.from = DevicerManager.getInstance().updateCache({
                    id: 'mobile'
                });
            }
        }

        if (!this.received) {
            this.readed = true;
        }

        if (!this.received) {
            this.sendState = arg.sendState || this.sendState || config.SEND_STATE.NONE;
        }

        this.analysisExtend();
        this.analysisLocation();
    };

    Message.prototype.getSpaceId = function() {
        var getSpaceId = YYIMCacheManager.getInstance().getSpaceId;
        if (getSpaceId) {
            return getSpaceId();
        }
    };

    Message.prototype.analysisLocation = function() {
        if (this.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.LOCATION) {
            this.data.content.path = 'http://restapi.amap.com/v3/staticmap?location=' + this.data.content.longitude + ',' + this.data.content.latitude + '&zoom=10&size=' + config.LOCAL_SHOWPIC_SIZE + '&markers=mid,,A:' + this.data.content.longitude + ',' + this.data.content.latitude + '&key=ee95e52bf08006f63fd29bcfbcf21df0';
        }
    };

    Message.prototype.analysisExtend = function() {
        if (this.data && this.data.extend) {
            try {
                this.data.extend = JSON.parse(this.data.extend);
            } catch (e) {
                this.data.extend = this.data.extend || {};
            }

            try {
                if (this.data.extend.esndata && !this.noticy) {
                    this.data.extend.esndata = JSON.parse(this.data.extend.esndata);
                    if (this.from &&
                        this.from.noticyType) {
                        this.data.extend.esndata.noticyType = this.from.noticyType;
                    }
                    this.noticy = new Noticy(this.data.extend.esndata);
                }

                if (this.data.extend.extend_type == 'businessMessage') {
                    if (config.BUSINESS[this.data.extend.from_type]) {
                        this.data.extend.icon = this.data.extend.icon || config.BUSINESS[this.data.extend.from_type].icon;
                        this.data.extend.url = this.data.extend.url || config.BUSINESS[this.data.extend.from_type].packetUrl(this.data.extend.from_id, this.data.extend.qz_id);
                    } else {
                        this.data.extend.icon = this.data.extend.icon || config.BUSINESS['default'].icon;
                    }

                    if (this.from &&
                        this.from.groupType == 'project') { //项目融合群
                        this.data.extend.icon = null;
                    }
                }

                if (this.data.extend.url) {
                    this.data.extend.url = this.data.extend.url.replace('${memberid}', YYIMChat.getUserID());
                    this.data.extend.url = this.data.extend.url.replace('${qzid}', this.data.extend.qz_id || this.getSpaceId());
                }
            } catch (e) {
                YYIMChat.log(e.message, 0, this);
            }
        }
    };

    function MessageManager() {
        this.sendingList = {};
        this.revokingList = new BaseList();
        BaseList.apply(this);
    }

    MessageManager.prototype = new BaseList();

    MessageManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new MessageManager();
        }
        return this._instance;
    };

    MessageManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var message = this.get(arg.id);
            if (!!message) {
                message.build(arg);
            } else {
                message = new Message(arg);
                this.set(message.id, message, function(obj1, obj2) {
                    return obj1['dateline'] - obj2['dateline'];
                });
            }

            if (message.opposite) {
                var target = message.opposite.id;
                this.messageList = this.messageList || new BaseList();
                this.messageList.set(target, this.messageList.get(target) || new BaseList());
                this.messageList.get(target).set(message.id, message, function(obj1, obj2) {
                    return obj1['dateline'] - obj2['dateline'];
                });
            }

            if (arg.sendState == config.SEND_STATE.READED ||
                message.received) {
                this.clearSendState(message.id);
            }

            this.getShowInterval(message.id);

            this.updateDigest(message.id);

            this.updateImageCache(message.id);

            this.updateSendState(message.id);

            this.updateRevokeState(message.id);

            this.updateFileCache(message.id);

            return message;
        }
    };

    MessageManager.prototype.updateFileCache = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                !message.temped &&
                message.data &&
                message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE) {
                var file = message.data.content;
                return FileManager.getInstance().updateCache({
                    id: message.id,
                    path: file.path,
                    owner: [{
                        id: message.opposite.id,
                        type: message.type
                    }],
                    name: file.name,
                    size: file.size,
                    from: file.from,
                    dateline: message.dateline
                });
            }
        }
    };

    MessageManager.prototype.updateSendState = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                !message.received &&
                message.data &&
                message.data.content) {
                var that = this;
                if (message.sendState == config.SEND_STATE.SENDSTART) {
                    if (!this.sendingList[id]) {
                        this.sendingList[id] = setTimeout(function() {
                            if (message.sendState == config.SEND_STATE.SENDSTART) {
                                message.sendState = config.SEND_STATE.SENDERROR;
                            }
                            delete that.sendingList[id];
                        }, 10000);
                    }
                } else {
                    delete this.sendingList[id];
                }
            }
        }
    };

    MessageManager.prototype.updateRevokingTask = function() {
        var that = this;
        clearTimeout(this.revokingListTimer);
        var first = this.revokingList.getFirst();
        if (first) {
            if (this.get(first.id)) {
                this.revokingListTimer = setTimeout(function() {
                    var message = that.get(first.id);
                    if (message && message.isRevoke) {
                        message.isRevoke = false;
                        YYIMCacheManager.getInstance().onRevokeStatedChanged(message);
                    }
                    that.revokingList.remove(first.id);
                    that.updateRevokingTask();
                    that = null;
                    message = null;
                    first = null;
                }, Math.max((first.expiration - first.now) - (Date.now() - first.now), 0));
            } else {
                that.revokingList.remove(first.id);
                this.updateRevokingTask();
            }
        }
    };

    MessageManager.prototype.updateRevokeState = function(id) {
        var that = this;
        if (id) {
            var message = this.get(id);
            if (message &&
                !message.temped &&
                !message.received &&
                message.type != YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
                if (!message.revoker) {
                    var expiration = message.dateline + config.REVOKE.INTERVAL - YYIMChat.getServerNow();
                    if (expiration > 0) {
                        if (!message.isRevoke) {
                            message.isRevoke = true;
                            YYIMCacheManager.getInstance().onRevokeStatedChanged(message);
                        }
                        var now = Date.now();
                        this.revokingList.set(id, {
                            id: id,
                            now: now,
                            expiration: now + expiration
                        }, function(val1, val2) {
                            return val1['expiration'] - val2['expiration'];
                        });
                        this.updateRevokingTask();
                    } else {
                        if (message.isRevoke) {
                            message.isRevoke = false;
                            YYIMCacheManager.getInstance().onRevokeStatedChanged(message);
                        }
                        if (this.revokingList.get(id)) {
                            this.revokingList.remove(id);
                            this.updateRevokingTask();
                        }
                    }
                } else {
                    if (message.isRevoke) {
                        message.isRevoke = false;
                        YYIMCacheManager.getInstance().onRevokeStatedChanged(message);
                    }
                    if (this.revokingList.get(id)) {
                        this.revokingList.remove(id);
                        this.updateRevokingTask();
                    }
                }
            }
        }
    };

    /**
     * 撤销消息 
     * arg {
     * 	id: String, //消息id
     *  to: String, //消息的另一方,待定
     *  type: 'chat/groupchat/pubaccount',
     *  success: function,
     *  error: function
     * }
     */
    MessageManager.prototype.revokeMessage = function(arg) {
        var that = this;
        if (arg && arg.id) {
            var message = this.get(arg.id);
            if (message) {
                YYIMChat.revokeMessage({
                    id: message.id,
                    to: message.opposite.id,
                    type: message.type,
                    success: function(arg) {
                        var message = that.updateRevokeMessage(arg.id);
                        arg.success && arg.success(message);
                        arg = null;
                    },
                    error: function() {
                        message.isRevoke = false;
                        YYIMCacheManager.getInstance().onRevokeStatedChanged(message);
                        if (that.revokingList.get(message.id)) {
                            that.revokingList.remove(message.id);
                            that.updateRevokingTask();
                        }
                        arg.error && arg.error(message);
                    }
                });
            } else {
                arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    MessageManager.prototype.updateRevokeMessage = function(id, revoker) {
        if (id) {
            var message = this.get(id);
            if (message) {
                FileManager.getInstance().removeCache(id);

                var data = message.data || {};
                data.contentType = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.REVOCATION;
                return this.updateCache({
                    id: id,
                    revoker: RosterManager.getInstance().updateCache({
                        id: revoker || YYIMChat.getUserID()
                    }),
                    data: data
                });
            }
        }
    };

    MessageManager.prototype.updateImageCache = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                message.data &&
                message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE &&
                message.opposite &&
                message.opposite.id) {

                var target = message.opposite.id;
                this.imagesList = this.imagesList || new BaseList();
                this.imagesList.set(target, this.imagesList.get(target) || new BaseList());
                this.imagesList.get(target).set(message.id, message, function(obj1, obj2) {
                    return obj1['dateline'] - obj2['dateline'];
                });
            }
        }
    };

    MessageManager.prototype.getPrevImageCache = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite && message.opposite.id) {
                var list = this.imagesList.get(message.opposite.id);
                if (list) {
                    return list.getPrev(id);
                }
            }
        }
    };

    MessageManager.prototype.getNextImageCache = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite && message.opposite.id) {
                var list = this.imagesList.get(message.opposite.id);
                if (list) {
                    return list.getNext(id);
                }
            }
        }
    };

    MessageManager.prototype.removeCache = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite && message.opposite.id) {
                var target = message.opposite.id;
                this.messageList = this.messageList || new BaseList();
                this.messageList.set(target, this.messageList.get(target) || new BaseList());
                var list = this.messageList.get(target);
                list.remove(id);
            }
            this.remove(id);
        }
    };

    MessageManager.prototype.updateDigest = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite) {
                var digest = DigestManager.getInstance().get(message.opposite.id);
                var readedVersion = 0;
                if (!digest) {
                    readedVersion = message.sessionVersion - 1;
                }

                DigestManager.getInstance().updateCache({
                    id: message.opposite.id,
                    type: message.type,
                    message: message,
                    sessionVersion: message.sessionVersion,
                    readedVersion: (message.readed || !message.received) ? message.sessionVersion : (readedVersion || 0),
                    minVersion: message.sessionVersion,
                    maxVersion: message.sessionVersion,
                    contactReadedVersion: (message.received && !message.temped) ? message.sessionVersion : 0
                });

                if (!message.received && !message.temped) {
                    if (message.type == 'chat') {
                        if (digest && digest.contactReadedVersion >= message.sessionVersion) {
                            message.sendState = config.SEND_STATE.READED;
                        } else {
                            message.sendState = config.SEND_STATE.UNREADED;
                        }
                    } else {
                        if (message.sendState == config.SEND_STATE.UNREADED) {
                            message.sendState = config.SEND_STATE.NONE;
                        }
                    }

                    if (message.opposite.id == YYIMChat.getUserID()) {
                        if (message.sendState == config.SEND_STATE.UNREADED ||
                            message.sendState == config.SEND_STATE.READED) {
                            message.sendState = config.SEND_STATE.NONE;
                        }
                    }
                }
            }
        }
    };

    MessageManager.prototype.clearSendState = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite) {
                var list = this.messageList.get(message.opposite.id);
                if (list) {
                    var digest = DigestManager.getInstance().get(message.opposite.id);

                    list.forEach(function(item, index) {
                        if (item.sendState == config.SEND_STATE.UNREADED &&
                            item.sessionVersion <= message.sessionVersion) {

                            item.sendState = config.SEND_STATE.READED;

                            if (!digest ||
                                digest.contactReadedVersion < item.sessionVersion) {
                                digest = DigestManager.getInstance().updateCache({
                                    id: item.opposite.id,
                                    type: item.type,
                                    contactReadedVersion: item.sessionVersion
                                });
                            }
                        }
                    });
                }
            }
        }
    };

    MessageManager.prototype.getShowInterval = function(id) {
        if (id) {
            var message = this.get(id);
            if (message && message.opposite) {
                var list = this.messageList.get(message.opposite.id);
                if (list) {
                    var prev = list.getPrev(id);
                    if (!prev || (prev && (message.dateline - prev.dateline) >= config.MESSAGE_MININTERVAL)) {
                        message.build({
                            showInterval: true
                        });
                    }
                }
            }
        }
    };

    MessageManager.prototype.removeMessageList = function(target) {
        var that = this;
        if (target) {
            FileManager.getInstance().removeFileList(target);
            this.messageList = this.messageList || new BaseList();
            var list = this.messageList.get(target);
            if (list) {
                var temps;
                temps = list.filter(function(item, index, list) {
                    return !item.temped;
                });
                temps.forEach(function(item, index) {
                    that.remove(item.id);
                    list.remove(item.id);
                });
                DigestManager.getInstance().resetVersionCache(target);
            }

            //清除图片缓存列表
            if (this.imagesList) {
                list = this.imagesList.get(target);
                if (list) {
                    this.imagesList.remove(target);
                    list.clear();
                    list = null;
                }
            }
        }
    };

    MessageManager.prototype.getMessageList = function(target) {
        if (target) {
            this.messageList = this.messageList || new BaseList();
            this.messageList.set(target, this.messageList.get(target) || new BaseList());
            var list = this.messageList.get(target);
            return list.getAll();
        }
    };

    MessageManager.prototype.getLastReceivedValid = function(target) {
        this.messageList = this.messageList || new BaseList();
        this.messageList.set(target, this.messageList.get(target) || new BaseList());
        var list = this.messageList.get(target);
        var index = list.length();
        var array = list.array;
        while (index--) {
            if (array[index] &&
                array[index].id &&
                array[index].received &&
                array[index].sessionVersion &&
                array[index].data.receipt) {
                return array[index];
            }
        }
    };

    MessageManager.prototype.renderMessageList = function(target) {
        if (target) {
            this.messageList = this.messageList || new BaseList();
            this.messageList.set(target, this.messageList.get(target) || new BaseList());
            var list = this.messageList.get(target);
            if (list.length()) {
                var last = this.getLastReceivedValid(target);
                if (!!last) {
                    var digest = DigestManager.getInstance().get(target);
                    var version = last.sessionVersion;

                    if (digest) {
                        version = Math.max(version, digest.sessionVersion);
                    }

                    if (last.data &&
                        last.data.receipt) {
                        YYIMChat.sendReadedReceiptsPacket(last.data.receipt);
                    }

                    list.forEach(function(item, index) {
                        if (item.sessionVersion <= version &&
                            !item.readed) {
                            item.readed = true;
                        }
                    });

                    DigestManager.getInstance().updateCache({
                        id: last.opposite.id,
                        message: last,
                        sessionVersion: version,
                        readedVersion: version
                    });
                }
            }
            return list.getAll();
        }
    };

    /**
     * 获取历史记录
     * @param arg{
     * id：String, 
     * type: String,
     * size: Number, //拉取消息条数(最少)
     * success:function,
     * error: function
     * }
     */
    MessageManager.prototype.getHistoryMessage = function(arg) {
        if (arg && arg.id) {

            var min_pre_length = config.HISTORY.MIN_PRE_LENGTH;
            var max_pre_length = config.HISTORY.MAX_PRE_LENGTH;
            if (arg.size) {
                try {
                    arg.size = Number(arg.size);
                    arg.size = Math.max(arg.size, 0);
                } catch (e) {}
            }
            min_pre_length = arg.size || min_pre_length;

            var digest = DigestManager.getInstance().get(arg.id);
            if (digest && digest.sessionVersion) {
                if (digest.querying &&
                    !digest.recursion) {
                    return arg.error && arg.error({
                        querying: true
                    });
                }
                digest.querying = true;
                digest.recursion = false;
                var startVersion, endVersion, offline = true;
                if (digest.offlineNum) {
                    if (digest.offlineNum > max_pre_length) {
                        if (digest.msgNum) {
                            startVersion = digest.maxVersion || digest.readedVersion;
                            endVersion = startVersion + max_pre_length;
                            digest.recursion = true;
                        } else {
                            endVersion = digest.sessionVersion;
                            startVersion = endVersion - min_pre_length;
                        }
                    } else if (digest.offlineNum > min_pre_length) {
                        if (digest.msgNum) {
                            startVersion = digest.maxVersion || digest.readedVersion;
                            endVersion = digest.sessionVersion;
                        } else {
                            endVersion = digest.sessionVersion;
                            startVersion = endVersion - min_pre_length;
                        }
                    } else {
                        endVersion = digest.sessionVersion;
                        startVersion = endVersion - (digest.msgNum ? digest.offlineNum : min_pre_length);
                        startVersion = Math.max(startVersion, 0);
                    }
                } else {
                    offline = false;
                    endVersion = Math.min(Math.max((digest.minVersion - 1), 0) || digest.readedVersion, digest.readedVersion);
                    startVersion = endVersion - min_pre_length;
                    startVersion = Math.max(startVersion, 0);

                    if (digest.minVersion == 1) {
                        digest.querying = false;
                        return arg.error && arg.error({
                            isEnd: true
                        });
                    }
                }

                if (startVersion == endVersion) {
                    digest.querying = false;
                    return arg.error && arg.error();
                }

                var that = this;
                YYIMChat.getHistoryMessage({
                    id: arg.id,
                    type: arg.type,
                    startVersion: startVersion,
                    endVersion: endVersion,
                    start: 0,
                    size: endVersion - startVersion,
                    success: function(data) {
                        var before = digest.minVersion;
                        if (data && data.result && data.result.length) {
                            data.result.sort(function(obj1, obj2) {
                                return obj1['dateline'] - obj2['dateline'];
                            });
                            for (var x in data.result) {
                                if (data.result.hasOwnProperty(x)) {
                                    var item = data.result[x];
                                    if (item && item.sessionVersion) {
                                        if (item.sessionVersion <= digest.readedVersion) {
                                            item.readed = true;
                                        } else {
                                            item.readed = false;
                                        }
                                    }
                                    var message = that.updateCache(item);
                                    digest.history.set(message.id, message);
                                }
                            }
                        }

                        digest.build({ // rongqb 20170427 防止数据断裂，无法继续拉取信息
                            minVersion: (startVersion + 1),
                            maxVersion: endVersion
                        });

                        if (!digest.recursion) {
                            var history = digest.history;
                            digest.clearHistory();
                            digest.querying = false;
                            digest = null;
                            arg.success && arg.success({
                                offline: offline,
                                history: history
                            });
                            arg && (arg = null);
                        } else {
                            that.getHistoryMessage(arg);
                        }
                    },
                    error: function(msg) {
                        digest.querying = false;
                        digest = null;
                        arg.error && arg.error(msg);
                        arg && (arg = null);
                    }
                });
            } else {
                var that = this;
                YYIMChat.getHistoryMessage({
                    id: arg.id,
                    type: arg.type,
                    startVersion: 0,
                    endVersion: -1,
                    start: 0,
                    size: min_pre_length,
                    success: function(data) {
                        var list = new BaseList();

                        if (data &&
                            data.result &&
                            data.result.length) {
                            data.result.sort(function(obj1, obj2) {
                                return obj1['dateline'] - obj2['dateline'];
                            });

                            for (var x in data.result) {
                                if (data.result.hasOwnProperty(x)) {
                                    data.result[x].readed = true;
                                    var message = that.updateCache(data.result[x]);
                                    list.set(message.id, message);
                                }
                            }

                            arg.success && arg.success({
                                offline: false,
                                history: list
                            });
                            arg && (arg = null);
                        } else {
                            arg.error && arg.error({
                                isEnd: true
                            });
                            arg && (arg = null);
                        }
                    },
                    error: arg.error
                });
            }
        } else {
            arg && arg.error && arg.error('ID cannot be Null.');
        }
    };

    /**
     * 发送文本消息[文本,表情]
     * @param arg {
     * to: id,  //对话人id
     * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
     * content:text, //消息文本
     * extend: string,  //扩展字段 
     * success:function //成功回调函数
     * }
     */
    MessageManager.prototype.sendTextMessage = function(arg) {
        if (arg) {
            var that = this;
            YYIMChat.sendTextMessage({
                to: arg.to || arg.id,
                type: arg.type || YYIMChat.getConstants().CHAT_TYPE.CHAT,
                content: arg.content,
                atuser: arg.atuser,
                extend: arg.extend,
                spaceId: arg.spaceId,
                success: function(data) {
                    data.sendState = config.SEND_STATE.SENDSTART;
                    data.temped = true;
                    var message = that.updateCache(data);
                    arg.success && arg.success(message);
                    arg = null;
                }
            });
        }
    };

    /**
     * 异步发送form表单
     * arg {
     * 	  to: String,
     *    file:{
     * 		 id: String,	
     *       name: String,
     *       size: Number,
     * 		 path: String
     *    },
     *    data: FormData,
     *    base64Code: String,
     *    mediaType:, //1:图片，2：附件
     *    type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
     *    progress: function,
     *    beforeUpload:function,
     *    success:function,
     *    error:function,
     *    complete:function
     * }
     */
    MessageManager.prototype.sendFormMessage = function(arg) {
        var that = this;
        if (arg && arg.to && arg.data && arg.file) {
            var mediaType = (arg.mediaType === 1) ? arg.mediaType : 2;
            var CONTENT_TYPE = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;

            if (arg.base64Code) {
                try {
                    arg.data = YYIMUtil['transcoding']['base64ToFormData'](arg.base64Code);
                } catch (e) {
                    //TODO handle the exception
                }

                try {
                    arg.file.path = YYIMUtil['transcoding']['base64ToDataUrl'](arg.base64Code);
                } catch (e) {
                    //TODO handle the exception
                }
            }

            var file = arg.file;

            var temp = {
                id: Math.uuid(),
                type: arg.type,
                to: arg.to,
                from: YYIMChat.getUserID(),
                sendState: config.SEND_STATE.UPLOADSTART,
                data: {
                    content: new IMFile({
                        id: file.id,
                        name: file.name,
                        path: file.attachId || file.path,
                        size: file.size
                    }),
                    contentType: (mediaType === 1) ? CONTENT_TYPE.IMAGE : CONTENT_TYPE.FILE,
                    dateline: new Date().getTime()
                },
                temped: true
            };

            if (temp.type != 'chat') {
                temp.from = {
                    room: arg.to,
                    roster: YYIMChat.getUserID()
                };
                temp.to = YYIMChat.getUserID();
            }

            var message = that.updateCache(temp);

            arg.beforeUpload && arg.beforeUpload(message);

            YYIMChat.sendFormMessage({
                id: temp.id,
                to: arg.to,
                type: temp.type,
                file: file,
                data: arg.data,
                spaceId: arg.spaceId,
                mediaType: mediaType,
                success: function(data) {
                    data.sendState = config.SEND_STATE.SENDSTART;
                    data.temped = true;
                    var message = that.updateCache(data);
                    arg.success && arg.success(message);
                    arg = null;
                },
                error: function() {
                    that.updateCache({
                        id: temp.id,
                        sendState: config.SEND_STATE.UPLOADERROR
                    });
                },
                fileUploaded: arg.fileUploaded,
                progress: function(result) {
                    YYIMChat.log('uploadProgress', 3, result.percent);
                    arg.progress && arg.progress(result);
                }
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 发送图片消息
     * @param arg{
     * fileInputId：DomID, //文件域id 
     * drop_element: [dropID], //拖拽上传元素id，或者数组
     * chatInfo: function(){ //用户发送消息时获取对话人信息
     * 	  return {
     * 		to: String //对话人id
     *      type: 'chat/groupchat/pubaccount',
     *      extend: 扩展字段
     * 	  };
     * },
     * fileFiltered: function, //文件被添加到上传队列
     * beforeUpload: function, //文件上传之前触发
     * fileUploaded: function, //文件上传完成触发
     * success:function,  //成功回调函数
     * error: function,
     * progress: function
     * }
     */
    MessageManager.prototype.sendPicMessage = function(arg) {
        if (arg) {
            var that = this;
            YYIMChat.sendPic({
                fileInputId: arg.fileInputId,
                drop_element: arg.drop_element,
                chatInfo: arg.chatInfo,
                fileFiltered: function(result) {
                    if (result && result.chatInfo) {
                        YYIMChat.previewLocalImage({
                            file: result.file,
                            success: function(src) {
                                var temp = {
                                    id: result.chatInfo.messageId,
                                    type: result.chatInfo.type,
                                    to: result.chatInfo.to,
                                    from: YYIMChat.getUserID(),
                                    sendState: config.SEND_STATE.UPLOADSTART,
                                    data: {
                                        content: new IMFile({
                                            id: result.file.id,
                                            name: result.file.name,
                                            path: src,
                                            location: result.file.getNative().path,
                                            size: result.file.size
                                        }),
                                        contentType: YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE,
                                        dateline: new Date().getTime()
                                    },
                                    temped: true
                                };

                                if (temp.type == 'groupchat') {
                                    temp.from = {
                                        room: result.chatInfo.to,
                                        roster: YYIMChat.getUserID()
                                    };
                                    temp.to = YYIMChat.getUserID();
                                }
                                that.updateCache(temp);

                                arg.fileFiltered && arg.fileFiltered(result);
                            },
                            error: function() {
                                arg.fileFiltered && arg.fileFiltered(result);
                            }
                        });
                    }
                },
                beforeUpload: arg.beforeUpload,
                fileUploaded: function(result) {
                    if (result &&
                        result.chatInfo &&
                        result.chatInfo.messageId) {
                        that.updateCache({
                            id: result.chatInfo.messageId,
                            sendState: config.SEND_STATE.UPLOADDONE
                        });
                    }
                    arg.beforeUpload && arg.beforeUpload(result);
                },
                progress: function(result) {
                    YYIMChat.log('imageUploadProgress', 3, result.percent, YYIMUtil['bytesToSize'](result.bytesPerSec));
                    arg.progress && arg.progress(result);
                },
                success: function(data) {
                    data.sendState = config.SEND_STATE.SENDSTART;
                    var message = that.updateCache(data);
                    arg.success && arg.success(message);
                },
                error: function(result) {
                    if (result &&
                        result.chatInfo &&
                        result.chatInfo.messageId) {
                        that.updateCache({
                            id: result.chatInfo.messageId,
                            sendState: config.SEND_STATE.UPLOADERROR
                        });
                    }
                    arg.error && arg.error(result);
                }
            });
        }
    };

    /**
     * 发送文件消息
     * @param arg{
     * fileInputId：DomID, //文件域id 
     * drop_element: [dropID], //拖拽上传元素id，或者数组
     * chatInfo: function(){ //用户发送消息时获取对话人信息
     * 	  return {
     * 		to: String //对话人id
     *      type: 'chat/groupchat/pubaccount',
     *      extend: 扩展字段
     * 	  };
     * },
     * fileFiltered: function, //文件被添加到上传队列
     * beforeUpload: function, //文件上传之前触发
     * success:function, //成功回调函数
     * error: function,
     * progress: function
     * }
     */
    MessageManager.prototype.sendFileMessage = function(arg) {
        if (arg) {
            var that = this;
            YYIMChat.sendFile({
                fileInputId: arg.fileInputId,
                drop_element: arg.drop_element,
                chatInfo: arg.chatInfo,
                fileFiltered: function(result) {
                    if (result && result.chatInfo) {
                        if (YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(result.file.name)) {
                            YYIMChat.previewLocalImage({
                                file: result.file,
                                success: function(src) {
                                    var temp = {
                                        id: result.chatInfo.messageId,
                                        type: result.chatInfo.type,
                                        to: result.chatInfo.to,
                                        from: YYIMChat.getUserID(),
                                        sendState: config.SEND_STATE.UPLOADSTART,
                                        data: {
                                            content: new IMFile({
                                                id: result.file.id,
                                                name: result.file.name,
                                                path: src,
                                                location: result.file.getNative().path,
                                                size: result.file.size
                                            }),
                                            contentType: YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE,
                                            dateline: new Date().getTime()
                                        },
                                        temped: true
                                    };

                                    if (temp.type == 'groupchat') {
                                        temp.from = {
                                            room: result.chatInfo.to,
                                            roster: YYIMChat.getUserID()
                                        };
                                        temp.to = YYIMChat.getUserID();
                                    }
                                    that.updateCache(temp);

                                    arg.fileFiltered && arg.fileFiltered(result);
                                },
                                error: function() {
                                    arg.fileFiltered && arg.fileFiltered(result);
                                }
                            });
                        } else {
                            var temp = {
                                id: result.chatInfo.messageId,
                                type: result.chatInfo.type,
                                to: result.chatInfo.to,
                                from: YYIMChat.getUserID(),
                                sendState: config.SEND_STATE.UPLOADSTART,
                                data: {
                                    content: new IMFile({
                                        id: result.file.id,
                                        name: result.file.name,
                                        path: result.file.path,
                                        location: result.file.getNative().path,
                                        size: result.file.size
                                    }),
                                    contentType: YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE,
                                    dateline: new Date().getTime()
                                },
                                temped: true
                            };

                            if (temp.type == 'groupchat') {
                                temp.from = {
                                    room: result.chatInfo.to,
                                    roster: YYIMChat.getUserID()
                                };
                                temp.to = YYIMChat.getUserID();
                            }
                            that.updateCache(temp);
                        }
                    }
                    arg.fileFiltered && arg.fileFiltered(result);
                },
                beforeUpload: arg.beforeUpload,
                fileUploaded: function(result) {
                    if (result &&
                        result.chatInfo &&
                        result.chatInfo.messageId) {
                        that.updateCache({
                            id: result.chatInfo.messageId,
                            sendState: config.SEND_STATE.UPLOADDONE
                        });
                    }
                    arg.beforeUpload && arg.beforeUpload(result);
                },
                progress: function(result) {
                    YYIMChat.log('fileUploadProgress', 3, result.percent, YYIMUtil['bytesToSize'](result.bytesPerSec));
                    arg.progress && arg.progress(result);
                },
                success: function(data) {
                    data.sendState = config.SEND_STATE.SENDSTART;
                    var message = that.updateCache(data);
                    arg.success && arg.success(message);
                },
                error: function(result) {
                    if (result &&
                        result.chatInfo &&
                        result.chatInfo.messageId) {
                        that.updateCache({
                            id: result.chatInfo.messageId,
                            sendState: config.SEND_STATE.UPLOADERROR
                        });
                    }
                    arg.error && arg.error(result);
                }
            });
        }
    };

    MessageManager.prototype.onTransparentMessage = function(arg) {

    };

    MessageManager.prototype.startUpload = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                message.data &&
                message.data.content &&
                message.sendState == config.SEND_STATE.UPLOADERROR) {
                var fileId = message.data.content.id;
                if (fileId) {
                    message.sendState = config.SEND_STATE.UPLOADSTART;
                    YYIMChat.startUpload(fileId);
                }
            }
        }
    };

    MessageManager.prototype.cancelUpload = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                message.data &&
                message.data.content &&
                (message.sendState == config.SEND_STATE.UPLOADSTART ||
                    message.sendState == config.SEND_STATE.UPLOADERROR)) {
                var fileId = message.data.content.id;
                if (fileId) {
                    YYIMChat.cancelUpload(fileId);
                    this.removeCache(id);
                }
            }
        }
    };

    /**
     * 消息重发
     * @param {Object} arg {
     * 	id: String,
     *  success: function,
     *  error: function
     * }
     */
    MessageManager.prototype.reSendMessage = function(arg) {
        var that = this;
        if (arg && arg.id) {
            var message = this.get(arg.id);
            if (message) {
                this.sendMessage({
                    id: message.id,
                    to: message.opposite.id,
                    type: message.type,
                    dateline: message.dateline,
                    extend: message.data.extend,
                    atuser: message.data.atuser,
                    content: message.data.content,
                    contentType: message.data.contentType,
                    success: arg.success
                });
            } else {
                arg && arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 消息转发
     * @param {Object} arg {
     * 	id: String,
     *  to: String,
     *  type: String,
     *  success: function,
     *  error: function
     * }
     */
    MessageManager.prototype.forwardMessage = function(arg) {
        var that = this;
        if (arg && arg.id && arg.to) {
            var message = this.get(arg.id);
            if (message) {
                this.sendMessage({
                    to: arg.to,
                    type: arg.type,
                    dateline: message.dateline,
                    extend: message.data.extend,
                    atuser: message.data.atuser,
                    content: message.data.content,
                    contentType: message.data.contentType,
                    success: arg.success
                });
            } else {
                arg && arg.error && arg.error();
            }
        } else {
            arg && arg.error && arg.error();
        }
    };

    /**
     * 发送消息接口整合
     * @param arg {
     * to: id,  //对话人id
     * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
     * extend: string,  //扩展字段
     * atuser: array,  //at 成员
     * content:
     * success:function //成功回调函数
     * },
     * contentType
     */
    MessageManager.prototype.sendMessage = function(arg) {
        var that = this;
        if (arg && arg.to) {
            YYIMChat.sendMessage({
                id: arg.id,
                to: arg.to,
                type: arg.type,
                dateline: arg.dateline,
                extend: arg.extend,
                atuser: arg.atuser,
                content: arg.content,
                contentType: arg.contentType,
                success: function(data) {
                    data.sendState = config.SEND_STATE.SENDSTART;
                    data.temped = true;
                    var message = that.updateCache(data);
                    arg.success && arg.success(message);
                    arg = null;
                }
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    MessageManager.prototype.operateMessage = function(id) {
        if (id) {
            var message = this.get(id);
            if (message &&
                message.data &&
                message.data.content) {
                if (message.sendState == config.SEND_STATE.UPLOADERROR) {
                    this.startUpload(id);
                } else if (message.sendState == config.SEND_STATE.SENDERROR) {
                    this.reSendMessage({
                        id: id
                    });
                }
            }
        }
    };

    MessageManager.prototype.removeLocalFile = function(id) {
        var message = this.get(id);
        if (message &&
            message.data &&
            message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE) {
            if (message.data.content &&
                message.data.content.location) {
                message.data.content.location = null;

                var file = FileManager.getInstance().get(message.id);
                if (file) {
                    file.location = null;
                }

                this.getStoraged(function(options) {
                    options.removed.push(id);
                    options.save && options.save();
                });
            }
        }
    };

    MessageManager.prototype.setLocalFile = function(id, location) {
        var message = this.get(id);
        if (message &&
            location &&
            message.data &&
            message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE) {
            if (message.data.content) {
                var file = FileManager.getInstance().get(message.id);

                if (location) {
                    message.data.content.location = location;
                    if (file) {
                        file.location = location;
                    }
                }

                this.getStoraged(function(options) {
                    options.updated[message.id] = {
                        location: message.data.content.location
                    };
                    options.storaged[message.id] = options.updated[message.id];
                    message = null;
                    options.save && options.save();
                });
            }
        }
    };

    MessageManager.prototype.getStoraged = function(callback) {
        clearTimeout(this.storagedTimer || 0);
        var that = this;
        if (!this.storaged) {
            this.storaged = YYIMUtil['localstorage']['getItem']('YKJ_MESSAGE_LOCAl_' + YYIMChat.getUserNode()) || '';
            try {
                this.storaged = JSON.parse(this.storaged);
            } catch (e) {
                this.storaged = {};
            }
        }

        this.storaged = this.storaged || {};
        this.removed = this.removed || [];
        this.updated = this.updated || {};

        var save = function() {
            if (that.updated ||
                that.removed) {

                var storaged = YYIMUtil['localstorage']['getItem']('YKJ_MESSAGE_LOCAl_' + YYIMChat.getUserNode()) || '';
                try {
                    storaged = JSON.parse(storaged);
                } catch (e) {
                    storaged = {};
                }

                var changed = false;

                if (that.updated) {
                    for (var x in that.updated) {
                        if (that.updated.hasOwnProperty(x)) {
                            storaged[x] = that.updated[x];
                            changed = true;
                        }
                    }
                }

                if (that.removed) {
                    for (var x in that.removed) {
                        if (that.removed.hasOwnProperty(x)) {
                            delete storaged[that.removed[x]];
                            changed = true;
                        }
                    }
                }

                if (changed) {
                    YYIMUtil['localstorage']['setItem']('YKJ_MESSAGE_LOCAl_' + YYIMChat.getUserNode(), JSON.stringify(storaged));
                }

                storaged = null;
                that.storaged = null;
                that.updated = null;
                that.removed = null;
            }
        };

        callback && callback({
            storaged: this.storaged,
            updated: this.updated,
            removed: this.removed,
            save: save
        });

        this.storagedTimer = setTimeout(save, 1000);
    };

    MessageManager.prototype.destory = function() {
        this.sendingList = {};
        if (this.imagesList) {
            this.imagesList.clear();
            this.imagesList = null;
        }
        if (this.messageList) {
            this.messageList.clear();
            this.messageList = null;
        }
        this.revokingList.clear();
        this.clear();
    };




    function Noticy(arg) {
        this.build(arg);
    }

    Noticy.prototype.build = function(arg) {
        this.id = arg.noticeId || this.noticeId;
        this.title = arg.title || this.title;
        this.type_detail = arg.type_detail || this.type_detail;
        this.detail_url = arg.detail_url || this.detail_url;
        this.type = arg.type || this.type;
        this.highlight = arg.highlight || this.highlight;
        this.authorid = arg.authorid || this.authorid;
        this.photo = arg.avatar || this.photo;
        this.content = arg.content || this.content;
        this.created = arg.created || this.created;
        this.spaceId = arg.qz_id || this.spaceId;
        this.from_id = arg.from_id || this.from_id;
        this.noticeId = arg.noticeId || this.noticeId;
        this.srcData = arg.srcData || this.srcData;
        this.note = arg.note || this.note;
        this.pending = YYIMUtil['isWhateType'](arg.pending, 'Number') ? arg.pending : this.pending || 0;
        this.noticyType = arg.noticyType || this.noticyType;

        this.businessId = this.type_detail + (this.from_id ? '_' + this.from_id : '') + (this.authorid ? '_' + this.authorid : '');

        this.id += '';
        this.syncInfo(arg);
    };

    Noticy.prototype.getStaticAddress = function(arg) {
        var getStaticAddress = YYIMCacheManager.getInstance().getStaticAddress;
        if (getStaticAddress) {
            return getStaticAddress();
        }
    };

    Noticy.prototype.syncInfo = function(arg) {

        this.content = this.content.replace(/\@\S+\@\@/g, '@');

        if (Number(this.authorid) &&
            !this.author) {
            this.author = RosterManager.getInstance().updateCache({
                id: Number(this.authorid)
            });
        }

        if (this.photo) {
            if (!(/https?\:\/\//.test(this.photo))) {
                this.photo = this.getStaticAddress() + this.photo;
            }
            if (/default_avatar$/.test(this.photo)) {
                this.photo += '.jpg';
            }
        }

        switch (this.type_detail) {
            case 'announce_reply_quan':
                this.packetNewDetailUrl({
                    url: '/announcement/details?aid=',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'announce_reply':
                this.packetNewDetailUrl({
                    url: '/announcement/details?aid=',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'announce_new':
                //		case 'reply_reply_quan':
                //		case 'reply_reply':
                this.packetNewDetailUrl({
                    url: '/announcement/details?aid=',
                    from_id: this.from_id
                });
                break;
                //任务	  
            case 'task_close':
            case 'task_refuse':
            case 'task_delete':
                break;
            case 'task_transferred':
            case 'task_evaluation':
            case 'task_startnotice':
            case 'task_inform':
            case 'task_restart':
            case 'task_injoin':
            case 'task_open':
            case 'task_submit':
                //		case 'reply_reply':
            case 'task_reply_quan':
                //		case 'reply_reply_quan':
            case 'task_accept':
            case 'task_invite':
            case 'task_endnotice':
                this.packetDetailUrl({
                    url: '/task/task/index/tid/',
                    from_id: this.from_id
                });
                break;
            case 'task_reply':
                this.packetDetailUrl({
                    url: '/task/task/index/tid/',
                    from_id: this.srcData.reply_id
                });
                break;

                //日历	  
            case 'calendar_share_invite': //按鈕，接收或拒絕
                this.packetHandleUrl({
                    acceptButttonText: '接受',
                    from_id: this.from_id
                });
            case 'calendar_share_refuse':
                if (this.noticyType == 'app') {
                    this.photo = '/front/images/notice_icons_cal.png';
                }
                break;
                //日程	  
            case 'schedule_delete':
            case 'schedule_refuse':
                break;
            case 'schedule_reply_quan':
                this.packetDetailUrl({
                    url: '/schedule/detail/index/sid/',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'schedule_reply':
                this.packetDetailUrl({
                    url: '/schedule/detail/index/sid/',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'schedule_invite': //小心，有按鈕，接收或拒絕
                this.packetHandleUrl({
                    acceptButttonText: '接受',
                    from_id: this.from_id
                });
            case 'calendar_share_accept':
            case 'calendar_share':
            case 'schedule_accept':
            case 'schedule_notice':
                //		case 'reply_reply_quan':
                //		case 'reply_reply':
                this.packetDetailUrl({
                    url: '/schedule/detail/index/sid/',
                    from_id: this.from_id
                });
                break;
                //快审	  
            case 'apporval_apply':
                this.packetDetailUrl({
                    url: '/approval/apply/applyCheckList/applyOperId/',
                    from_id: this.from_id
                });
                break;
            case 'apporval_noticer':
            case 'apporval_accept':
            case 'apporval_refuse':
                this.packetDetailUrl({
                    url: '/approval/apply/index/applyId/',
                    from_id: this.from_id
                });
                break;
                //团队	  
            case 'group_apply': //同意或拒絕，done
                this.packetHandleUrl({
                    acceptButttonText: '同意',
                    from_id: this.from_id
                });
                this.packetDetailUrl({
                    url: '/group/index/index/gid/',
                    from_id: this.from_id
                });
                break;
            case 'group_new_apply': //同意或拒絕，done
                this.businessId = this.type_detail + '_' + this.from_id + '_' + this.srcData.invited_member_id;
                this.packetHandleUrl({
                    acceptButttonText: '同意',
                    from_id: this.from_id
                });
                this.packetDetailUrl({
                    url: '/group/index/index/gid/',
                    from_id: this.from_id
                });
                break;
            case 'group_invited_wait':
            case 'group_person_refuse':
            case 'group_person_delete':
            case 'group_exit':
            case 'group_delete':
            case 'group_join':
            case 'diary_group':
                break;
            case 'group_invite_apply': //done
            case 'group_invite': //按鈕，接收或拒絕
                this.packetHandleUrl({
                    acceptButttonText: '接受',
                    from_id: this.from_id
                });
            case 'group_admin_join':
            case 'group_person_accept':
            case 'group_invite_refuse':
            case 'group_invite_apply_noop':
            case 'group_owner_trans':
                this.packetDetailUrl({
                    url: '/group/index/index/gid/',
                    from_id: this.from_id
                });
                break;
                // 日志 
            case 'diary_reply':
            case 'diary_reply_quan':
                this.packetDetailUrl({
                    url: '/diary/index/detail/diary/',
                    from_id: this.srcData.reply_id,
                    nid: this.noticeId
                });
                break;
            case 'diary_like':
            case 'diary_unlike':
            case 'diary_at':
                this.packetDetailUrl({
                    url: '/diary/index/detail/diary/',
                    from_id: this.from_id,
                    nid: this.noticeId
                });
                break;
                //博客
            case 'daily_reply_reply':
            case 'daily_reply':
            case 'daily_reply_quan':
                this.packetDetailUrl({
                    url: '/blog/blog/show/id/',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'daily_recommend':
            case 'daily_reply_reply_quan':
                this.packetDetailUrl({
                    url: '/blog/blog/show/id/',
                    from_id: this.from_id
                });
                break;
                //发言  
            case 'speech_reply':
            case 'speech_reply_quan':
                this.packetNewDetailUrl({
                    url: '/blogitemdetail?type=comment&feedId=',
                    feedId: this.srcData.fromSrcData.feedId
                });
                break;
            case 'speech_add':
            case 'share_speech':
                //		case 'reply_reply_quan':
            case 'reply_praise':
                //		case 'reply_reply':
            case 'speech_save':
            case 'speech_like':
                this.packetNewDetailUrl({
                    url: '/blogitemdetail?type=comment&feedId=',
                    feedId: this.srcData.feedId
                });
                break;
                //微邮
            case 'vmail_reply':
            case 'vmail_new':
            case 'vmail_append':
            case 'vmail_new_at':
            case 'vmail_reply_at':
                this.packetNewDetailUrl({
                    url: '/wemail/detail?routerType=1&id=',
                    from_id: this.from_id
                });
                break;
                //空间
            case 'qz_apply_new': //同意或拒絕或撤销
                this.packetHandleUrl({
                    acceptButttonText: '同意',
                    from_id: this.from_id
                });
            case 'qz_apply':
            case 'qz_apply_del':
            case 'qz_join':
            case 'qz_invite':
                break;

                //紅包
            case 'redpacket_new':
                this.packetDetailUrl({
                    url: '/redpacket/index/index'
                });
                break;

                //投票
            case 'vote_reply_quan':
            case 'vote_reply':
                this.packetNewDetailUrl({
                    url: '/blogitemdetail?type=comment&feedId=',
                    feedId: this.srcData.fromSrcData.feedId
                });
                break;
            case 'vote_add':
            case 'vote_jion':
            case 'vote_join':
                this.packetNewDetailUrl({
                    url: '/blogitemdetail?type=comment&feedId=',
                    feedId: this.srcData.feedId
                });
                break;

                //关注成员
            case 'member_follow':
                break;

                //勋章 
            case 'medal_delete':
            case 'medal_add':
                break;

                //标签
            case 'tag_request_approve_notice':
                this.packetHandleUrl({
                    acceptButttonText: '认可',
                    from_id: this.from_id
                });
                break;
            case 'tag_approve_notice':
                break;

                //嘟嘟
            case 'talk_quan_send':
                break;

                //第三方应用
            case 'third_party_app':
                this.packetDetailUrl();
                break;

                //系统通知
            case 'member_manage':
                this.defaultPhoto = config.PUB_TYPE.pubaccount.type.feed.photo;
                this.photo = this.defaultPhoto;
                break;

            case 'third_notice_pc_app':
                if (typeof this.note === 'string') {
                    this.note = JSON.parse(this.note);
                }
                if (this.note.type == '1') { //type=1代表U易联，type=2代表U订货
                } else if (this.note.type == '2') { //esnclient=web
                    this.detailButtonText = "查看详情";
                    if (this.note.callbackUrl.indexOf('?') === -1) {
                        this.detailButtonUrl = this.note.callbackUrl + '?' + 'esnclient=web';
                    } else {
                        this.detailButtonUrl = this.note.callbackUrl + '&' + 'esnclient=web'
                    }
                }
                break;
            case 'toutiao_update':
                this.packetDetailUrl({
                    url: '/toutiao/set/recommend/'
                });
                break;


            case 'project_reply':
                this.packetDetailUrl({
                    url: '/project/project/info/pid/',
                    from_id: this.srcData.reply_id
                });
                break;
            case 'project_check':
                break;
            case 'project_agree':
            case 'project_disagree':
                this.packetDetailUrl({
                    url: '/project/project/info/pid/',
                    from_id: this.from_id
                });
                break;

            default:
                YYIMChat.log('unHandleNoticy', 3, this);
                break;
        }

        this.getAppAvatar();

        if (this.detailButtonUrl) {
            if (/\?/.test(this.detailButtonUrl)) {
                this.detailButtonUrl += '&YYW=1';
            } else {
                this.detailButtonUrl += '?YYW=1';
            }
        }
    };

    Noticy.prototype.getAppAvatar = function(arg) {
        if (this.noticyType == 'app') {
            this.defaultPhoto = config.PUB_TYPE.pubaccount.type.app.photo;
            this.photo = this.defaultPhoto;

            if (/announce_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/announcement.png';
            } else if (/task_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/task.png';
            } else if (/apporval_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/approve.png';
            } else if (/schedule_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/schedule.png';
            } else if (/calendar_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/schedule.png';
            } else if (/redpacket_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/redPacket.png';
            } else if (/vmail_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/email.png';
            } else if (/talk_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/dudu.png';
            } else if (/project_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/project.png';
            } else if (/vote_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/vote.png';
            } else if (/diary_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/log.png';
            } else if (/toutiao_/.test(this.type_detail)) {
                this.photo = '/images/notification/type_detail/toutiao.png';
            }
        } else if (this.noticyType == 'system') {
            this.defaultPhoto = '/images/notification/system.png';
            this.photo = this.defaultPhoto;
        }

        if (this.noticyType == 'app' ||
            this.noticyType == 'system') {
            if (this.photo &&
                (this.photo.indexOf(config.BASE_URL) == -1)) {
                this.photo = config.BASE_URL + this.photo;
            }

            if (this.defaultPhoto &&
                (this.defaultPhoto.indexOf(config.BASE_URL) == -1)) {
                this.defaultPhoto = config.BASE_URL + this.defaultPhoto;
            }
        }
    };

    Noticy.prototype.getPhotoUrl = function(arg) {
        return this.photo || this.defaultPhoto;
    };

    Noticy.prototype.getSpaceId = function() {
        var getSpaceId = YYIMCacheManager.getInstance().getSpaceId;
        if (getSpaceId) {
            return getSpaceId();
        }
    };

    Noticy.prototype.packetHandleUrl = function(arg) {
        this.pendingStatus = true;
        if (arg) {
            if (this.pending === 0) {
                this.acceptButttonText = arg.acceptButttonText;
                this.cancelButttonText = '拒绝';
                this.revokeButttonText = '撤销';
                this.acceptUrl = arg.acceptUrl;
                this.refuseUrl = arg.refuseUrl;
                this.revokeUrl = arg.revokeUrl;
            }
        }
    };

    Noticy.prototype.packetNewDetailUrl = function(arg) {
        arg = arg || {};
        this.detailButtonText = "查看详情";

        var targetId = arg.from_id || arg.feedId || '';

        this.detailButtonUrl = '/static/home.html#' + arg.url + targetId + '&qzid=' + this.spaceId;
    };

    Noticy.prototype.packetDetailUrl = function(arg) {
        arg = arg || {};
        this.detailButtonText = "查看详情";
        var targetId = arg.from_id || arg.feedId || '';

        if (this.type_detail == 'third_party_app') {
            this.detailButtonUrl = this.detail_url;

            if (this.detailButtonUrl) {
                this.detailButtonUrl = this.detailButtonUrl.replace('${memberid}', YYIMChat.getUserID());
                this.detailButtonUrl = this.detailButtonUrl.replace('${qzid}', this.getSpaceId());
            }
            return;
        }

        if (arg) {
            this.detailButtonUrl = arg.url + targetId + (arg.nid ? '/nid/' + arg.nid : '') + '/VISITID/' + this.spaceId;
            var param;
            if (!!arg.mailid) {
                param = param || {};
                param.mailid = arg.mailid;
            }
            if (!!param) {
                this.detailButtonUrl += '?' + jQuery.param(param);
            }
        }
    };
    var ProfileManager = (function() {
        var muteItems = [];
        var stickItems = [];

        /**
         * getProfile
         * @param {Object} arg {
         * 	success: function,
         *  error: function
         * }
         */
        function getProfile(arg) {
            YYIMChat.getProfile({
                success: function(data) {

                    destory();

                    if (data && data.muteItems) {
                        for (var x in data.muteItems) {
                            if (data.muteItems.hasOwnProperty(x) &&
                                data.muteItems[x].id) {
                                setMuteCache({
                                    id: data.muteItems[x].id,
                                    type: data.muteItems[x].type,
                                    isMute: true
                                });
                            }
                        }
                    }

                    if (data && data.stickItems) {
                        for (var x in data.stickItems) {
                            if (data.stickItems.hasOwnProperty(x) &&
                                data.stickItems[x].id) {
                                setStickCache({
                                    id: data.stickItems[x].id,
                                    type: data.stickItems[x].type,
                                    isStick: true
                                });
                            }
                        }
                    }

                    arg.success && arg.success();
                    arg = null;
                },
                error: arg.error
            });
        }

        /**
         * 判断是否设置置顶 rongqb 20170606
         * @param {Object} arg
         */
        function isStick(id) {
            if (id) {
                var index = stickItems.indexOf(id);
                if (index != -1) {
                    return true;
                }
                return false;
            }
        }

        /**
         * 置顶信息缓存 rongqb 20170605
         * @param {Object} arg 
         * {id: String,
         *  type: String,
         *  isStick: Boolean
         * }
         */
        function setStickCache(arg) {
            if (arg &&
                arg.id &&
                arg.type &&
                typeof(arg.isStick) == 'boolean') {

                var index = stickItems.indexOf(arg.id);
                if (arg.isStick === true) {
                    if (index == -1) {
                        stickItems.push(arg.id);
                    }
                } else if (arg.isStick === false) {
                    if (index != -1) {
                        stickItems.splice(index, 1);
                    }
                }
                var entity;

                switch (arg.type) {
                    case YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT:
                        entity = GroupManager.getInstance().get(arg.id);
                        if (entity) {
                            entity.build({
                                stick: arg.isStick
                            });
                        }
                        break;
                    case YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT:
                        entity = PubAccountManager.getInstance().get(arg.id);
                        if (entity) {
                            entity.build({
                                stick: arg.isStick
                            });
                        }
                        break;
                    default:
                        entity = RosterManager.getInstance().updateCache({
                            id: arg.id,
                            stick: arg.isStick
                        });
                }


                var digest = DigestManager.getInstance().get(arg.id);
                if (digest &&
                    digest.type == arg.type) {
                    DigestManager.getInstance().updateCache({
                        id: arg.id,
                        type: arg.type
                    });
                    entity = digest.from;
                }

                return entity;
            }
        };

        /**
         * 判断是否设置免打扰 rongqb 20170606
         * @param {Object} arg
         */
        function isMute(id) {
            if (id) {
                var index = muteItems.indexOf(id);
                if (index != -1) {
                    return true;
                }
                return false;
            }
        }

        /**
         * 免打扰信息缓存 rongqb 20170606
         * @param {Object} arg 
         * {id: String,
         *  type: String,
         *  isMute: Boolean
         * }
         */
        function setMuteCache(arg) {
            if (arg &&
                arg.id &&
                arg.type &&
                typeof(arg.isMute) == 'boolean') {

                var index = muteItems.indexOf(arg.id);
                if (arg.isMute === true) {
                    if (index == -1) {
                        muteItems.push(arg.id);
                    }
                } else if (arg.isMute === false) {
                    if (index != -1) {
                        muteItems.splice(index, 1);
                    }
                }
                var entity;

                switch (arg.type) {
                    case YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT:
                        entity = GroupManager.getInstance().get(arg.id);
                        if (entity) {
                            entity.build({
                                mute: arg.isMute
                            });
                        }
                        break;
                    case YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT:
                        entity = PubAccountManager.getInstance().get(arg.id);
                        if (entity) {
                            entity.build({
                                mute: arg.isMute
                            });
                        }
                        break;
                    default:
                        entity = RosterManager.getInstance().updateCache({
                            id: arg.id,
                            mute: arg.isMute
                        });
                }

                return entity;
            }
        };

        /**
         * mute
         * @param {Object} arg {
         * 	to: String,
         *  type: 'chat/groupchat/pubaccount',
         *  success: function,
         *  error: function
         * }
         */
        function mute(arg) {
            if (arg && arg.to) {
                YYIMChat.mute({
                    to: arg.to,
                    type: arg.type,
                    success: function(data) {
                        var entity = setMuteCache({
                            id: arg.to,
                            type: arg.type,
                            isMute: true
                        });
                        arg.success && arg.success(entity);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg && arg.error && arg.error();
            }
        }

        /**
         * cancelMute
         * @param {Object} arg {
         * 	to: String,
         *  type: 'chat/groupchat/pubaccount',
         *  success: function,
         *  error: function
         * }
         */
        function cancelMute(arg) {
            if (arg && arg.to) {
                YYIMChat.cancelMute({
                    to: arg.to,
                    type: arg.type,
                    success: function(data) {
                        var entity = setMuteCache({
                            id: arg.to,
                            type: arg.type,
                            isMute: false
                        });
                        arg.success && arg.success(entity);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg && arg.error && arg.error();
            }
        }

        /**
         * stick
         * @param {Object} arg {
         * 	to: String,
         *  type: 'chat/groupchat/pubaccount',
         *  success: function,
         *  error: function
         * }
         */
        function stick(arg) {
            if (arg &&
                arg.to &&
                arg.type) {
                YYIMChat.stick({
                    to: arg.to,
                    type: arg.type,
                    success: function(data) {
                        var entity = setStickCache({
                            id: arg.to,
                            type: arg.type,
                            isStick: true
                        });
                        arg.success && arg.success(entity);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg && arg.error && arg.error();
            }
        }

        /**
         * cancelStick
         * @param {Object} arg {
         * 	to: String,
         *  type: 'chat/groupchat/pubaccount',
         *  success: function,
         *  error: function
         * }
         */
        function cancelStick(arg) {
            if (arg && arg.to) {
                YYIMChat.cancelStick({
                    to: arg.to,
                    type: arg.type,
                    success: function(data) {
                        var entity = setStickCache({
                            id: arg.to,
                            type: arg.type,
                            isStick: false
                        });
                        arg.success && arg.success(entity);
                        arg = null;
                    },
                    error: arg.error
                });
            } else {
                arg && arg.error && arg.error();
            }
        }

        /**
         * 销毁profile 信息缓存
         * rongqb 20170606
         */
        function destory() {
            muteItems.splice(0, muteItems.length);
            muteItems.length = 0;

            stickItems.splice(0, stickItems.length);
            stickItems.length = 0;
        }

        return {
            getProfile: getProfile,
            mute: mute,
            cancelMute: cancelMute,
            setMuteCache: setMuteCache,
            isMute: isMute,

            stick: stick,
            cancelStick: cancelStick,
            setStickCache: setStickCache,
            isStick: isStick,

            destory: destory
        };
    })();



    function PubAccount(arg) {
        this.defaultPhoto = config.DEFAULT_PHOTO.PUBACCOUNT;
        this.build(arg);
    }

    PubAccount.prototype.build = function(arg) {
        this.id = arg.id || this.id;

        if (!this.loadedInfo || arg.strong) {
            this.name = arg.name || this.name || this.id;
            this.photo = arg.photo || this.photo;
            this.group = arg.group || this.group;
            this.description = arg.description || this.description;
            this.loadedInfo = YYIMUtil['isWhateType'](arg.loadedInfo, 'Boolean') ? arg.loadedInfo : !!this.loadedInfo;
        }

        this.mute = YYIMUtil['isWhateType'](arg.mute, 'Boolean') ? arg.mute : !!this.mute;
        this.stick = YYIMUtil['isWhateType'](arg.stick, 'Boolean') ? arg.stick : !!this.stick;
        this.model = YYIMUtil['isWhateType'](arg.messageModel, 'Number') ? arg.messageModel : (this.model || 0);

        this.id += '';
        this.getAttributes();
        this.syncInfo(arg);
        this.initInfo(arg);
    };

    PubAccount.prototype.initInfo = function(arg) {
        var that = this;
        if (!this.loadedInfo ||
            arg.force === true) {

            if (arg &&
                YYIMUtil['isWhateType'](arg.infoLoaded, 'Function')) {
                this.infoLoadedList = this.infoLoadedList || [];
                this.infoLoadedList.push(arg.infoLoaded);
            }

            if (!this.querying) {
                this.querying = true;
                YYIMChat.getPubAccountInfo({
                    id: this.id,
                    success: function(data) {
                        data.strong = true;
                        that.build(data);

                        var digest = DigestManager.getInstance().get(that.id);
                        if (digest) {
                            DigestManager.getInstance().updateCache({
                                id: that.id,
                                type: YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT
                            });
                        }
                        that.loadedInfo = true;
                        that.querying = false;

                        if (that.infoLoadedList &&
                            that.infoLoadedList.length) {
                            while (that.infoLoadedList.length) {
                                that.infoLoadedList.shift()(that);
                            }
                        }
                    }
                });
            }
        } else {
            arg && arg.infoLoaded && arg.infoLoaded(that);
        }
    };

    PubAccount.prototype.getAttributes = function() {
        if (!!this.id && !this.spaceId) {
            var splits = this.id.split(/_/);
            if (splits.length > 2) {
                this.pubType = splits[0];
                this.spaceId = splits[1];

                if (splits[2] &&
                    (splits[0] == config.PUB_TYPE['pubaccount'].name)) {
                    var noticy = config.PUB_TYPE['pubaccount'].type[splits[2]];
                    if (noticy) {
                        this.noticyType = splits[2];
                        this.name = noticy.name;
                        this.photo = noticy.photo;
                    }
                }
            }
        }

        if (this.id == 'spaceassistant') { //空间助手
            this.photo = config.DEFAULT_PHOTO.SPACEASSISTANT;
        }
    };

    PubAccount.prototype.syncInfo = function(arg) {
        this.photo = this.photo || config.DEFAULT_PHOTO.PUBACCOUNT;

        if (this.name) {
            if (this.name != this.spellName) {
                this.initial = SpellUtil.getInitial(this.name);
                this.integrated = SpellUtil.getIntegrated(this.name);
                this.spellName = this.name;
            }
        } else {
            this.initial = '';
            this.integrated = '';
            this.nameColor = '';
        }

        this.getProfileInfo(arg);
    };

    PubAccount.prototype.getProfileInfo = function(arg) {
        if (!arg || typeof arg.mute != 'boolean') {
            var isMute = ProfileManager.isMute(this.id);
            if (this.mute !== isMute) {
                this.mute = isMute;
            }
        }

        if (!arg || typeof arg.stick != 'boolean') {
            var isStick = ProfileManager.isStick(this.id);
            if (this.stick !== isStick) {
                this.stick = isStick;
            }
        }
    };

    PubAccount.prototype.getPhotoUrl = function() {
        return this.photo;
    };

    function PubAccountManager() {
        BaseList.apply(this);
    }

    PubAccountManager.prototype = new BaseList();

    PubAccountManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new PubAccountManager();
        }
        return this._instance;
    };

    /**
     * 更新公众号
     * @param {Object} arg {
     * 	 id:,name:,type:,photo
     * }
     */
    PubAccountManager.prototype.updateCache = function(arg) {
        if (!!arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new PubAccount(arg);
                this.set(item.id, item);
            }
            return item;
        }
    };

    /**
     * 拉取公共号信息
     * @param {Object} arg
     */
    PubAccountManager.prototype.getRemote = function(arg) {
        var that = this;
        if (arg &&
            arg.ids &&
            arg.ids.length) {

            YYIMChat.getPubAccounts({
                pubIds: arg.ids,
                success: function(result) {
                    if (result && result.length) {
                        for (var x in result) {
                            if (result.hasOwnProperty(x)) {
                                result[x].strong = true;
                                var pubaccount = that.updateCache(result[x]);
                                var digest = DigestManager.getInstance().get(pubaccount.id);
                                if (digest) {
                                    DigestManager.getInstance().updateCache({
                                        id: pubaccount.id,
                                        type: YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT
                                    });
                                }
                            }
                        }
                    }
                    arg.success && arg.success();
                    arg = null;
                },
                error: arg.error
            });
        } else {
            arg && arg.error && arg.error();
        }
    };

    PubAccountManager.prototype.destory = function() {
        this.clear();
    };

    function Roster(arg) {
        this.type = 'roster';
        this.defaultPhoto = config.DEFAULT_PHOTO.ROSTER;
        this.build(arg);
    }

    Roster.prototype.baseInfo = function(arg) {
        this.name = YYIMUtil['isWhateType'](arg.name, 'String') ? arg.name : this.name;
        this.nameColor = arg.nameColor || this.nameColor;
        this.spellName = arg.spellName || this.spellName;
        this.initial = arg.initial || this.initial;
        this.integrated = arg.integrated || this.integrated;
        this.photo = arg.photo || this.photo;
    };

    /** 
     * build
     * @param {Object} arg
     *  {
     * 	 strong: 强制更新本地信息
     *   force： 强制拉取服务端信息
     * }
     *  
     */
    Roster.prototype.build = function(arg) {
        arg = arg || {};

        this.id = arg.id || this.id;
        this.ask = YYIMUtil['isWhateType'](arg.ask, 'Number') ? arg.ask : this.ask || 0;
        this.recv = YYIMUtil['isWhateType'](arg.recv, 'Number') ? arg.recv : this.recv || 0;
        this.subscription = arg.subscription || this.subscription;
        this.favoriteType = arg.favoriteType || this.favoriteType;

        this.online = YYIMUtil['isWhateType'](arg.online, 'Boolean') ? arg.online : !!this.online;

        if (!this.loadedInfo ||
            arg.strong) {
            this.baseInfo(arg);
            this.loadedInfo = YYIMUtil['isWhateType'](arg.loadedInfo, 'Boolean') ? arg.loadedInfo : !!this.loadedInfo;
        }

        this.mute = YYIMUtil['isWhateType'](arg.mute, 'Boolean') ? arg.mute : !!this.mute;
        this.stick = YYIMUtil['isWhateType'](arg.stick, 'Boolean') ? arg.stick : !!this.stick;

        this.id += '';
        this.getAttributes();
        this.initVCard(arg);
        this.syncInfo(arg);
    };

    Roster.prototype.syncInfo = function(arg) {
        if (this.photo) {
            this.photo = YYIMChat.getFileUrl(this.photo);
            if (!(/\.thumb\.jpg$/.test(this.photo))) {
                this.photo += '.thumb.jpg';
            }
        }

        if (this.vcard) {
            if (!this.favorite &&
                this.rosterType != config.ROSTER_TYPE.FRIEND) {
                this.name = this.vcard.name;
                this.photo = this.vcard.photo;
            }
        }

        if (this.name) {
            if (this.name != this.spellName) {
                this.initial = SpellUtil.getInitial(this.name);
                this.integrated = SpellUtil.getIntegrated(this.name);
                this.spellName = this.name;
                this.nameColor = ColorUtil.getColor(this.name);
            }
        } else {
            this.initial = '';
            this.integrated = '';
            this.nameColor = '';
        }

        this.getProfileInfo(arg);

        if (arg &&
            this.loadedInfo &&
            arg.strong) {
            this.save();
        }
    };

    Roster.prototype.getProfileInfo = function(arg) {
        if (!arg || typeof arg.mute != 'boolean') {
            var isMute = ProfileManager.isMute(this.id);
            if (this.mute !== isMute) {
                this.mute = isMute;
            }
        }

        if (!arg || typeof arg.stick != 'boolean') {
            var isStick = ProfileManager.isStick(this.id);
            if (this.stick !== isStick) {
                this.stick = isStick;
            }
        }
    };

    Roster.prototype.isExpires = function() {
        if (!this.vcard ||
            ((new Date().getTime() - this.vcard.dateline) > config.ROSTER_INFO_MAXTIME)) {
            return true;
        }
        return false;
    };

    Roster.prototype.initVCard = function(arg) {
        var that = this;

        this.vcard = this.vcard || new Vcard({
            id: this.id,
            name: this.name,
            photo: this.photo
        });

        if (arg && arg.dateline) {
            this.vcard.build({
                dateline: arg.dateline,
                name: arg.name,
                photo: arg.photo
            });
        }

        if (!this.loadedInfo ||
            (arg && arg.force === true) ||
            this.isExpires()) {

            if (arg &&
                YYIMUtil['isWhateType'](arg.infoLoaded, 'Function')) {
                this.infoLoadedList = this.infoLoadedList || [];
                this.infoLoadedList.push(arg.infoLoaded);
            }

            if (!this.querying ||
                (arg && arg.force === true)) {

                if (!arg.vcard) {
                    var info;

                    RosterManager.getInstance().getStoraged(function(options) {
                        info = options.storaged[that.id];
                    });

                    if (info) {
                        this.baseInfo(info);
                        if (info.vcard) {
                            arg.vcard = info.vcard;
                        }
                    }
                }

                if (arg.vcard) {
                    this.vcard.build(arg.vcard);
                }

                if ((arg && arg.force === true) ||
                    !arg.vcard ||
                    this.rosterType == config.ROSTER_TYPE.MYSELF ||
                    this.isExpires()) {
                    this.querying = true;

                    YYIMChat.getBatchVCards({ //默认的拿取 vcard 信息
                        id: this.id,
                        success: function(data) {
                            data.dateline = new Date().getTime();
                            that.vcard.build(data);

                            that.loadedInfo = true;
                            that.querying = false;

                            that.syncInfo({
                                strong: true
                            });

                            if (that.infoLoadedList &&
                                that.infoLoadedList.length) {
                                while (that.infoLoadedList.length) {
                                    that.infoLoadedList.shift()(that);
                                }
                            }
                        },
                        error: function() {
                            that.loadedInfo = false;
                            that.querying = false;
                        }
                    });
                } else {
                    that.loadedInfo = true;
                    that.syncInfo();

                    if (that.infoLoadedList &&
                        that.infoLoadedList.length) {
                        while (that.infoLoadedList.length) {
                            that.infoLoadedList.shift()(that);
                        }
                    }
                }
            };
        } else {
            arg && arg.infoLoaded && arg.infoLoaded(that);
        }
    };

    Roster.prototype.getPhotoUrl = function() {
        return this.photo;
    };

    Roster.prototype.save = function() {
        var that = this;
        RosterManager.getInstance().getStoraged(function(options) {
            var item = options.storaged[that.id];

            options.storaged[that.id] = options.updated[that.id] = {
                id: that.id,
                name: that.name,
                spellName: that.spellName,
                initial: that.initial,
                integrated: that.integrated,
                nameColor: that.nameColor,
                photo: that.photo || '',
                vcard: {
                    id: that.vcard.id,
                    name: that.vcard.name,
                    photo: that.vcard.photo,
                    dateline: (item && item.vcard && item.vcard.dateline) ? Math.max(item.vcard.dateline, that.vcard.dateline) : that.vcard.dateline
                }
            };
        });
    };

    /**
     * 判断roster的类型
     */
    Roster.prototype.getAttributes = function() {
        if (this.id === YYIMChat.getUserID()) {
            this.rosterType = config.ROSTER_TYPE.MYSELF;
        } else if (this.subscription == config.ROSTER_SUBSCRIPTION_TYPE.BOTH) {
            this.rosterType = config.ROSTER_TYPE.FRIEND;
        } else if (this.subscription == config.ROSTER_SUBSCRIPTION_TYPE.NONE && this.ask == 1) {
            this.rosterType = config.ROSTER_TYPE.ASK;
        } else if (this.subscription == config.ROSTER_SUBSCRIPTION_TYPE.NONE && this.recv == 1) {
            this.rosterType = config.ROSTER_TYPE.RECV;
        } else {
            this.rosterType = config.ROSTER_TYPE.NONE;
        }

        if (this.favoriteType == config.FAVORITE_TYPE.FAVORITE) {
            this.favorite = true;
        } else {
            this.favorite = false;
            this.favoriteType = config.FAVORITE_TYPE.NONE;
        }
        return this.rosterType;
    };


    function RosterManager() {
        this.ids = [];
        BaseList.apply(this);
    }

    RosterManager.prototype = new BaseList();

    RosterManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new RosterManager();
        }
        return this._instance;
    };

    RosterManager.prototype.updateCache = function(arg) {
        if (arg && arg.id) {
            var item = this.get(arg.id);
            if (!!item) {
                item.build(arg);
            } else {
                item = new Roster(arg);
                this.set(item.id, item);
            }

            this.updateIDsCache(item.id);

            if (item.querying === true) {
                this.getLocal();
            }
            return item;
        }
    };

    RosterManager.prototype.updateIDsCache = function(id) {
        if (id) {
            if (this.ids.indexOf(id) == -1) {
                this.ids.push(id);
            }
        }
    };

    /**
     * getRosterInfo
     * @param {Object} arg {
     * 	id: String, //默认是自己的
     *  force: Boolean, //是否强制拉取用户信息
     *  success: function
     * }
     */
    RosterManager.prototype.getRosterInfo = function(arg) {
        if (arg) {
            this.updateCache({
                id: arg.id || YYIMChat.getUserID(),
                force: !!arg.force,
                infoLoaded: arg.success
            });
        }
    };

    /**
     * 获取联系人关系列表
     * @param {Object} arg {
     * 	success: function
     * }
     */
    RosterManager.prototype.getRosters = function(arg) {
        var that = this;
        YYIMChat.getRosterItems({
            success: function(data) {
                data = JSON.parse(data);
                data.forEach(function(item, index, list) {
                    item.strong = true;
                    that.updateCache(item);
                });
                arg.success && arg.success();
                arg = null;
            }
        });
    };

    /**
     * 获取收藏联系人列表
     * @param {Object} relation
     */
    RosterManager.prototype.getFavoriteRosterList = function(arg) {
        var that = this;
        YYIMChat.getFavoriteRosterList({
            success: function(data) {
                try {
                    data.forEach(function(item, index, list) {
                        item.favoriteType = item.subscription;
                        delete item.subscription;
                        item.strong = true;
                        that.updateCache(item);
                    });
                } catch (e) {}
                arg.success && arg.success(that.getFavoriteRosters());
                arg = null;
            },
            error: arg.error
        });
    };

    /**
     * 收藏联系人
     * @param {Object} arg {
     * 	id： String,
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.favoriteRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (!roster || roster.favoriteType == config.FAVORITE_TYPE.NONE) {
                YYIMChat.favoriteRoster(arg.id, config.FAVORITE_TYPE.FAVORITE);
                var roster = this.updateCache({
                    id: arg.id,
                    favoriteType: config.FAVORITE_TYPE.FAVORITE
                });
                arg.success && arg.success(roster);
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 取消收藏联系人
     * @param {Object} arg {
     * 	id： String,
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.cancelFavoriteRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (roster && roster.favoriteType == config.FAVORITE_TYPE.FAVORITE) {
                YYIMChat.favoriteRoster(arg.id, config.FAVORITE_TYPE.REMOVE);
                var roster = this.updateCache({
                    id: arg.id,
                    name: '',
                    strong: true,
                    favoriteType: config.FAVORITE_TYPE.NONE
                });
                arg.success && arg.success(roster);
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 更新收藏联系人的备注
     * @param {Object} arg {
     * 	id： String,
     *  name: String,
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.updateFavoriteRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (roster && roster.favoriteType == config.FAVORITE_TYPE.FAVORITE) {
                YYIMChat.updateFavoriteRoster(arg.id, arg.name);
                var roster = this.updateCache({
                    id: arg.id,
                    strong: true,
                    name: arg.name
                });
                arg.success && arg.success(roster);
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 发送添加好友请求
     * @param {Object} 
     *  arg {
     * 	id: String,
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.addRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (!roster || roster.rosterType == config.ROSTER_TYPE.NONE) {
                YYIMChat.addRosterItem(arg.id);
                var roster = this.updateCache({
                    id: arg.id,
                    ask: 1,
                    recv: 0,
                    subscription: config.ROSTER_SUBSCRIPTION_TYPE.NONE
                });
                arg.success && arg.success(roster);
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 发送删除好友请求
     * @param {Object} 
     * arg {
     * 	id: String,
     *  success: function,
     *  error: function
     */
    RosterManager.prototype.deleteRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (roster) {
                var that = this;
                YYIMChat.deleteRosterItem({
                    id: arg.id,
                    success: function() {
                        var roster = that.updateCache({
                            id: arg.id,
                            ask: 0,
                            recv: 0,
                            subscription: config.ROSTER_SUBSCRIPTION_TYPE.NONE
                        });
                        arg.success && arg.success(roster);
                    }
                });
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 同意添加好友请求
     * arg {
     * 	id: String,
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.approveRoster = function(arg) {
        if (!!arg && arg.id) {
            var roster = this.get(arg.id);
            if (roster && roster.rosterType == config.ROSTER_TYPE.RECV) {
                YYIMChat.approveSubscribe(arg.id);
                var roster = this.updateCache({
                    id: arg.id,
                    ask: 0,
                    recv: 0,
                    subscription: config.ROSTER_SUBSCRIPTION_TYPE.BOTH
                });
                arg.success && arg.success(roster);
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 修改好友备注
     * @param {Object} 
     * arg {
     * 	id:String, //联系人id
     * 	name:String, //新的备注姓名
     *  success:function,
     *  error:function 
     * }
     */
    RosterManager.prototype.setRemark = function(arg) {
        if (!!arg && arg.id && arg.name) {
            var roster = this.get(arg.id);
            if (!!roster && roster.rosterType == config.ROSTER_TYPE.FRIEND) {
                var that = this;
                YYIMChat.updateRosterItem({
                    roster: {
                        id: arg.id,
                        name: arg.name
                    },
                    success: function(data) {
                        arg.strong = true;
                        var roster = that.updateCache(arg);
                        arg.success && arg.success(roster);
                    }
                });
            } else {
                arg.error && arg.error();
            }
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 获取联系人(自己，好友，请求的，被请求的，陌生人)列表
     * @param {Object} 
     * relation 空：全部列表，myself：自己，friend：好友，ask：发送请求的，recv：被请求的，none：陌生人
     */
    RosterManager.prototype.getRostersList = function(relation) {
        if (!!relation) {
            return this.filter(function(item, index, list) {
                return item.rosterType == relation;
            });
        } else {
            return this.getAll();
        }
    };

    /**
     * 获取收藏的联系人列表
     */
    RosterManager.prototype.getFavoriteRosters = function() {
        return this.filter(function(item, index, list) {
            return !!item.favorite;
        });
    };

    /**
     * 获取在线联系人列表
     */
    RosterManager.prototype.getOnlineRosterList = function() {
        return this.filter(function(item, index, list) {
            return !!item.online;
        });
    };

    /**
     * 拉取指定联系人在线状态
     * @param {Object} arg {
     * 	ids: Array, //默认拉取本地缓存联系人的状态
     *  success: function,
     *  error: function
     * }
     */
    RosterManager.prototype.getRostersPresence = function(arg) {
        arg = arg || {};
        var ids = this.ids;
        if (YYIMUtil['isWhateType'](arg.ids, 'Array')) {
            ids = arg.ids;
        }
        if (ids.length) {
            var that = this;
            YYIMChat.getRostersPresence({
                username: ids,
                success: function(data) {
                    if (data && data.length) {
                        var i = data.length;
                        while (i--) {
                            var item = data[i];
                            if (item && item.userid) {
                                that.updateCache({
                                    id: item.userid,
                                    online: false
                                });

                                if (item && item.presence) {
                                    var j = item.presence.length;
                                    while (j--) {
                                        if (item.presence[j].available == 1) {
                                            that.updateCache({
                                                id: item.userid,
                                                online: true
                                            });
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    arg.success && arg.success(that.getOnlineRosterList());
                },
                error: function(message) {
                    that.forEach(function(item, index) {
                        that.updateCache({
                            id: item.id,
                            online: false
                        });
                    });
                    arg.error && arg.error(message);
                }
            });
        } else {
            arg.error && arg.error();
        }
    };

    /**
     * 断线之前没有拉取成功roster信息
     * @param {Object} callback
     */
    RosterManager.prototype.getLocal = function() {
        var that = this;
        clearTimeout(this.getLocaler);
        this.getLocaler = setTimeout(function() {
            that.forEach(function(item) {
                if (item.querying === true) {
                    item.querying = false;
                    if (YYIMChat.isOnline()) {
                        that.getRosterInfo({
                            id: item.id
                        });
                    }
                }
            });
        }, 5000);
    };

    RosterManager.prototype.getStoraged = function(callback) {
        clearTimeout(this.storagedTimer || 0);
        var that = this;
        if (!this.storaged) {
            this.storaged = YYIMUtil['localstorage']['getItem']('YKJ_ROSTER_' + YYIMChat.getUserNode()) || '';
            try {
                this.storaged = JSON.parse(this.storaged);
            } catch (e) {
                this.storaged = {};
            }
        }

        this.storaged = this.storaged || {};
        this.updated = this.updated || {};

        var save = function() {
            if (that.updated) {
                var storaged = YYIMUtil['localstorage']['getItem']('YKJ_ROSTER_' + YYIMChat.getUserNode()) || '';
                try {
                    storaged = JSON.parse(storaged);
                } catch (e) {
                    storaged = {};
                }

                var changed = false;

                for (var x in that.updated) {
                    if (that.updated.hasOwnProperty(x)) {
                        storaged[x] = that.updated[x];
                        changed = true;
                    }
                }

                if (changed) {
                    YYIMUtil['localstorage']['setItem']('YKJ_ROSTER_' + YYIMChat.getUserNode(), JSON.stringify(storaged));
                }

                storaged = null;
                that.storaged = null;
                that.updated = null;
            }
        };

        callback && callback({
            storaged: this.storaged,
            updated: this.updated,
            save: save
        });

        this.storagedTimer = setTimeout(save, 1000);
    };

    RosterManager.prototype.clearTimeout = function() {
        if (this.getLocaler) {
            clearTimeout(this.getLocaler);
            this.getLocaler = null;
        }
    };

    RosterManager.prototype.destory = function() {
        this.ids.length = 0;
        this.clear();
    };

    function Vcard(arg) {
        this.defaultPhoto = config.DEFAULT_PHOTO.ROSTER;
        this.dateline = new Date().getTime();

        this.build(arg);
    }


    Vcard.prototype.build = function(arg) {
        this.id = arg.id || this.id;
        this.name = arg.name || arg.nickname || this.name || this.id;
        this.photo = arg.photo || this.photo;

        this.email = arg.email || this.email;
        this.mobile = arg.mobile || this.mobile;
        this.telephone = arg.telephone || this.telephone;
        this.organization = arg.organization || this.organization;
        this.location = arg.location || this.location;

        this.dateline = Math.max(Number(arg.dateline) || 0, this.dateline || 0);
        this.sysInfo(arg);
    };

    Vcard.prototype.sysInfo = function(arg) {
        if (this.photo) {
            this.photo = YYIMChat.getFileUrl(this.photo);
            if (!(/\.thumb\.jpg$/.test(this.photo))) {
                this.photo += '.thumb.jpg';
            }
        }
    };

    Vcard.prototype.getPhoto = function() {
        return this.photo;
    };



    function YYIMCacheManager() {}

    YYIMCacheManager.getInstance = function() {
        if (!this._instance) {
            this._instance = new YYIMCacheManager();
        }
        return this._instance;
    };

    YYIMCacheManager.prototype.initCallbacks = function(options) {
        this.getSpaceId = options.getSpaceId || function() {};

        this.getEsnSign = options.getEsnSign || function() {}; // for pc

        this.getStaticAddress = options.getStaticAddress || function() {};

        this.getEsnServiceAddress = options.getEsnServiceAddress || function() {};

        this.onUnReadedNumChanged = options.onUnReadedNumChanged || function() {};

        this.getSpaceList = options.getSpaceList || function() {};

        this.onRevokeStatedChanged = options.onRevokeStatedChanged || function() {};
    };

    /**
     * 检查本地缓存 是否匹配 配置盘本号
     */
    YYIMCacheManager.prototype.checkLocalCache = function() {
        var userNode = YYIMChat.getUserNode();
        var version = YYIMUtil['localstorage']['getItem']('YKJ_VERSION_' + userNode) || '';

        var records = YYIMUtil['localstorage']['getItem']('YKJ_CACHE_RECORDS_' + YYIMChat.getAppkey().slice(1));
        try {
            records = JSON.parse(records);
        } catch (e) {
            records = {};
        }
        records = records || {};

        records[userNode] = {
            id: userNode,
            dateline: new Date().getTime()
        };

        var recordsList = [];
        for (var x in records) {
            if (records.hasOwnProperty(x)) {
                recordsList.push(records[x]);
            }
        }

        var length = recordsList.length;

        if (length &&
            length > config.LOCAL_CACHE_MAXSIZE) {
            records = {};
            recordsList.sort(function(val1, val2) {
                return val2['dateline'] - val1['dateline'];
            });
            var removeds = recordsList.splice(config.LOCAL_CACHE_MAXSIZE);
            for (var x in removeds) {
                if (removeds.hasOwnProperty(x)) {
                    removeItem(removeds[x].id);
                }
            }
            for (var x in recordsList) {
                if (recordsList.hasOwnProperty(x)) {
                    records[recordsList[x].id] = recordsList[x];
                }
            }
        }

        YYIMUtil['localstorage']['setItem']('YKJ_CACHE_RECORDS_' + YYIMChat.getAppkey().slice(1), JSON.stringify(records));

        if (!config.LOCAL_CACHE_VERSION ||
            config.LOCAL_CACHE_VERSION != version) {
            removeItem(userNode);
            YYIMUtil['localstorage']['setItem']('YKJ_VERSION_' + userNode, (config.LOCAL_CACHE_VERSION || 0));
        }

        function removeItem(userNode) {
            if (userNode) {
                YYIMUtil['localstorage']['removeItem']('YKJ_VERSION_' + userNode);

                YYIMUtil['localstorage']['removeItem']('YKJ_GROUP_TIME_' + userNode);
                YYIMUtil['localstorage']['removeItem']('YKJ_GROUP_' + userNode);

                YYIMUtil['localstorage']['removeItem']('YKJ_DIGEST_TIME_' + userNode);
                YYIMUtil['localstorage']['removeItem']('YKJ_DIGEST_' + userNode);

                YYIMUtil['localstorage']['removeItem']('YKJ_ROSTER_' + userNode);

                YYIMUtil['localstorage']['removeItem']('YKJ_MESSAGE_LOCAl_' + userNode);
            }
        };
    };

    YYIMCacheManager.prototype.init = function(options) {
        var that = this;
        options = options || {};
        options.initSDK = options.initSDK || {};

        if (options.baseUrl) {
            config.RESET_BASE_URL(options.baseUrl);
        }

        this.initCallbacks(options);

        YYIMChat.initSDK(options.initSDK);

        YYIMChat.init({
            onOpened: function() {
                that.clearTimeout();

                //初始化加载模块
                that.initLoadModules(options);

                that.initCache(options);

                //上线，必要
                YYIMChat.setPresence();

                options.onOpened && options.onOpened();

                //当前登录人信息
                RosterManager.getInstance().getRosterInfo({
                    force: true,
                    success: options.onCurrentUserLoaded
                });
            },
            onExpiration: options.onExpiration,
            onClosed: function() {
                that.clearTimeout();
                options.onClosed && options.onClosed();
            },
            onConflicted: function() {
                that.clearTimeout();
                options.onConflicted && options.onConflicted();
            },
            onClientKickout: function() {
                that.clearTimeout();
                options.onClientKickout && options.onClientKickout();
            },
            onUpdatePassword: function() {
                that.clearTimeout();
                options.onUpdatePassword && options.onUpdatePassword();
            },
            onAuthError: function() {
                that.clearTimeout();
                options.onAuthError && options.onAuthError();
            },
            onConnectError: function() {
                that.clearTimeout();
                options.onConnectError && options.onConnectError();
            },
            onReceipts: function(arg) {
                if (arg && arg.id) {
                    if (arg.state == 2) {
                        var target = (arg.to == YYIMChat.getUserID()) ? arg.from : arg.to;
                        var digest = DigestManager.getInstance().get(target);
                        if (digest) {
                            DigestManager.getInstance().updateCache({
                                id: target,
                                type: arg.type,
                                readedVersion: arg.sessionVersion,
                                contactReadedVersion: arg.sessionVersion,
                                sessionVersion: arg.sessionVersion
                            });
                        }

                        var message = MessageManager.getInstance().get(arg.id);
                        if (message) {
                            MessageManager.getInstance().updateCache({
                                id: arg.id,
                                sessionVersion: arg.sessionVersion,
                                sendState: config.SEND_STATE.READED
                            });
                        }

                        /**
                         * 消息已读回执
                         */
                        options.onMessageReaded && options.onMessageReaded(message || arg.id);
                    }

                    if (arg.state == 1) {
                        var message = MessageManager.getInstance().get(arg.id);
                        if (message) {
                            MessageManager.getInstance().updateCache({
                                id: arg.id,
                                temped: false,
                                sendState: config.SEND_STATE.UNREADED,
                                dateline: arg.dateline,
                                sessionVersion: arg.sessionVersion
                            });
                            /**
                             * 消息到达回执
                             */
                            options.onMessageReceived && options.onMessageReceived(message);
                        }

                    }
                }
            },
            onSubscribe: function(arg) {
                /**
                 * 加好友请求 rongqb 20161206 
                 */
                if (arg.type === 'subscribe') {
                    var roster = RosterManager.getInstance().updateCache({
                        id: arg.from,
                        ask: 0,
                        recv: 1,
                        subscription: config.ROSTER_SUBSCRIPTION_TYPE.NONE
                    });
                    options.onAskForFriend && options.onAskForFriend(roster);
                } else if (arg.type === 'subscribed') {
                    var roster = RosterManager.getInstance().updateCache({
                        id: arg.from,
                        ask: 0,
                        recv: 0,
                        subscription: config.ROSTER_SUBSCRIPTION_TYPE.BOTH
                    });
                    options.onAgreeForFriend && options.onAgreeForFriend(roster);
                }
            },
            onRosterFavorited: function(arg) {
                if (arg && arg.favoritedRosterItem) {
                    arg.favoritedRosterItem.favoriteType = arg.favoritedRosterItem.subscription;
                    delete arg.favoritedRosterItem.subscription;
                    arg.favoritedRosterItem.strong = true;
                    var roster = RosterManager.getInstance().updateCache(arg.favoritedRosterItem);

                    if (arg.favoritedRosterItem.favoriteType == config.FAVORITE_TYPE.FAVORITE) {
                        options.onFavoritedRosterUpdated && options.onFavoritedRosterUpdated(roster);
                    } else if (arg.favoritedRosterItem.favoriteType == config.FAVORITE_TYPE.NONE) {
                        options.onCancelRosterFavorited && options.onCancelRosterFavorited(roster);
                    }
                }
            },
            onRosterUpdateded: function(arg) {
                /**
                 * 联系人信息更新 rongqb 20161206 
                 */
                arg.strong = true;
                var roster = RosterManager.getInstance().updateCache(arg);
                options.onRosterUpdateded && options.onRosterUpdateded(roster);
            },
            onMessage: function(arg) {
                /**
                 * 收到的消息
                 */
                var message = MessageManager.getInstance().updateCache(arg);
                options.onMessage && options.onMessage(message);
            },
            onGroupUpdate: function(arg) {
                arg.strong = true;
                var group = GroupManager.getInstance().get(arg.id);
                if (group &&
                    arg.members) {
                    group.clear();
                }
                if (arg.name) {
                    arg.isMemberName = false;
                }
                var group = GroupManager.getInstance().updateCache(arg);
                options.onGroupUpdate && options.onGroupUpdate(group);
            },
            onKickedOutGroup: function(arg) {
                var group = GroupManager.getInstance().KickedOutByGroup(arg);
                if (!arg.to || arg.to === YYIMChat.getUserID()) {
                    MessageManager.getInstance().removeMessageList(arg.from);
                    var target = DigestManager.getInstance().getNext(arg.from);
                    if (!target) {
                        target = DigestManager.getInstance().getPrev(arg.from);
                    }
                    var removed = DigestManager.getInstance().removeCache(arg.from);
                    if (removed) {
                        options.onRemoveDigest && options.onRemoveDigest({
                            id: arg.from,
                            type: 'groupchat',
                            removed: removed,
                            target: target
                        });
                    }
                    options.onKickedOutByGroup && options.onKickedOutByGroup(group || arg);
                } else {
                    options.onKickedOutGroupOther && options.onKickedOutGroupOther(group || arg);
                }
            },
            onTransferGroupOwner: function(arg) {
                arg.strong = true;
                var group = GroupManager.getInstance().updateCache(arg);
                options.onTransferGroupOwner && options.onTransferGroupOwner(group);
            },
            onPresence: function(arg) {},
            onRosterDeleted: function(arg) {
                var roster = RosterManager.getInstance().updateCache(arg);
                options.onRosterDeleted && options.onRosterDeleted(roster);
            },
            onPubaccountUpdate: function(pubaccounts) {
                for (var x in pubaccounts) {
                    if (pubaccounts.hasOwnProperty(x)) {
                        pubaccounts[x].loadedInfo = true;
                        pubaccounts[x].strong = true;
                        var pubaccount = PubAccountManager.getInstance().updateCache(pubaccounts[x]);
                        options.onPubaccountUpdate && options.onPubaccountUpdate(pubaccount);
                    }
                }
            },
            onTransparentMessage: function(arg) {
                switch (arg.category) {
                    case config.TRAMSPARENT_TYPE.SETMUTE:
                        if (arg.attributes &&
                            arg.attributes.bareJID &&
                            arg.attributes.bareJID.id) {

                            var entity = ProfileManager.setMuteCache({
                                id: arg.attributes.bareJID.id,
                                type: arg.attributes.bareJID.type,
                                isMute: true
                            });

                            options.onSetMute && options.onSetMute(entity);
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.CANCELMUTE:
                        if (arg.attributes &&
                            arg.attributes.bareJID &&
                            arg.attributes.bareJID.id) {

                            var entity = ProfileManager.setMuteCache({
                                id: arg.attributes.bareJID.id,
                                type: arg.attributes.bareJID.type,
                                isMute: false
                            });

                            options.onCancelMute && options.onCancelMute(entity);
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.SETSTICK:
                        if (arg.attributes &&
                            arg.attributes.bareJID &&
                            arg.attributes.bareJID.id) {

                            var entity = ProfileManager.setStickCache({
                                id: arg.attributes.bareJID.id,
                                type: arg.attributes.bareJID.type,
                                isStick: true
                            });

                            options.onSetStick && options.onSetStick(entity);
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.CANCELSTICK:
                        if (arg.attributes &&
                            arg.attributes.bareJID &&
                            arg.attributes.bareJID.id) {

                            var entity = ProfileManager.setStickCache({
                                id: arg.attributes.bareJID.id,
                                type: arg.attributes.bareJID.type,
                                isStick: false
                            });

                            options.onCancelStick && options.onCancelStick(entity);
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.REMOVECONTACTS:
                        if (arg.attributes &&
                            arg.attributes.bareJID &&
                            arg.attributes.bareJID.id) {
                            var id = arg.attributes.bareJID.id;
                            var type = arg.attributes.bareJID.type;
                            var target = DigestManager.getInstance().getNext(id);
                            if (!target) {
                                target = DigestManager.getInstance().getPrev(id);
                            }
                            var removed = DigestManager.getInstance().removeCache(id);
                            MessageManager.getInstance().removeMessageList(id);
                            options.onRemoveDigest && options.onRemoveDigest({
                                id: id,
                                type: type,
                                removed: removed,
                                target: target
                            });
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.REVOKE:
                        if (arg.attributes &&
                            arg.attributes.packetId) {
                            var revoker = arg.from.roster || arg.from;
                            var target = (revoker == YYIMChat.getUserID()) ? arg.attributes.receiver : revoker;
                            DigestManager.getInstance().updateCache({
                                id: target,
                                revokeVersion: arg.attributes.sessionVersion,
                                revoker: {
                                    id: revoker,
                                    sessionVersion: arg.attributes.sessionVersion
                                }
                            });
                            var message = MessageManager.getInstance().updateRevokeMessage(arg.attributes.packetId, revoker);
                            options.onMessageRevoked && options.onMessageRevoked(message);
                        }
                        break;
                    case config.TRAMSPARENT_TYPE.ASSIGNADMIN:
                        if (arg.attributes &&
                            arg.attributes.userJids) {
                            var group = GroupManager.getInstance().updateCache({
                                id: arg.from.room || arg.from
                            });
                            GroupManager.getInstance().setAdmins({
                                id: arg.from.room || arg.from,
                                adminIds: arg.attributes.userJids,
                                success: function(group) {
                                    options.onAssignAdmin && options.onAssignAdmin(group);
                                }
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    };

    YYIMCacheManager.prototype.initCache = function(options) {
        AssistantManager.getInstance().initCache();
    };

    YYIMCacheManager.prototype.clearTimeout = function() {
        this.getRosterManager().clearTimeout();
    };

    YYIMCacheManager.prototype.initLoadModules = function(options) {
        var that = this;

        this.checkLocalCache();

        //更新空间列表
        DigestManager.getInstance().updateSpaceCache();

        //初始化联系人关系
        if (config.INIT_LOAD_MODULE.ROSTERS) {
            try {
                RosterManager.getInstance().getRosters({
                    success: function() {
                        options.onRostersLoaded && options.onRostersLoaded();
                    }
                });
            } catch (e) {
                YYIMChat.log('Init_load_Rosters Error.');
            }
        }

        //初始化联系人收藏关系
        if (config.INIT_LOAD_MODULE.FAVORITES) {
            try {
                RosterManager.getInstance().getFavoriteRosterList({
                    success: function(favoriteList) {
                        options.onFavoriteRostersLoaded && options.onFavoriteRostersLoaded(favoriteList);
                    }
                });
            } catch (e) {
                YYIMChat.log('Init_load_Rosters Error.');
            }
        }

        //初始化群组
        if (config.INIT_LOAD_MODULE.GROUPS) {
            try {
                GroupManager.getInstance().initCache({
                    localLoaded: function() {
                        options.onLocalGroupLoaded && options.onLocalGroupLoaded();
                    },
                    remoteLoaded: function() {
                        options.onRemoteGroupLoaded && options.onRemoteGroupLoaded();
                    }
                });
            } catch (e) {
                YYIMChat.log('Init_load_Groups Error.');
            }
        }

        //初始化摘要
        if (config.INIT_LOAD_MODULE.DIGESTS) {
            try {
                DigestManager.getInstance().initCache({
                    localLoaded: function() {
                        options.onLocalDigestLoaded && options.onLocalDigestLoaded();
                    },
                    remoteLoaded: function(result) {
                        //初始化公共号
                        if (config.INIT_LOAD_MODULE.PUBACCOUNTS) {
                            try {
                                PubAccountManager.getInstance().getRemote({
                                    ids: result.pubaccountIds,
                                    success: function() {

                                        if (config.INIT_LOAD_MODULE.PROFILE) {
                                            ProfileManager.getProfile({
                                                success: function() {
                                                    options.onProfileLoaded && options.onProfileLoaded();
                                                }
                                            });
                                        }

                                        options.onRemotePubAccountLoaded && options.onRemotePubAccountLoaded();
                                    }
                                });
                            } catch (e) {
                                YYIMChat.log('Init_load_PubAccounts Error.');
                            }
                        }
                        options.onRemoteDigestLoaded && options.onRemoteDigestLoaded();
                    }
                });
            } catch (e) {
                YYIMChat.log('Init_load_Digest Error.');
            }
        }

        //自动加载联系人在线状态
        if (config.INIT_LOAD_MODULE.AUTO_PRESENCES) {
            try {
                setTimeout(function() {
                    RosterManager.getInstance().getRostersPresence({
                        success: function(onlineList) {
                            options.onPresenceLoaded && options.onPresenceLoaded(onlineList);
                            that.AutoPresencesTimer = setInterval(function() {
                                RosterManager.getInstance().getRostersPresence({
                                    success: function(onlineList) {
                                        options.onPresenceLoaded && options.onPresenceLoaded(onlineList);
                                    }
                                });
                            }, config.AUTO_PRESENCES.INTERVAL);
                        }
                    });
                }, config.AUTO_PRESENCES.START);
            } catch (e) {
                YYIMChat.log('Auto_Presences Error.');
            }
        }
    };

    YYIMCacheManager.prototype.login = function() {
        YYIMChat.login.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.logout = function() {
        if (this.AutoPresencesTimer) {
            clearInterval(this.AutoPresencesTimer);
        }
        this.destory();
        YYIMChat.logout.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.destory = function() {
        this.getRosterManager().destory();
        this.getMessageManager().destory();
        this.getGroupManager().destory();
        this.getDigestManager().destory();
        this.getPubAccountManager().destory();
        this.getAssistantManager().destory();
        this.getProfileManager().destory();
        this.getProfileManager().destory();
        this.clearTimeout();
    };

    YYIMCacheManager.prototype.log = function() {
        YYIMChat.log.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.logEnable = function() {
        YYIMChat.logEnable.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.getConnectStatus = function() {
        return YYIMChat.getConnectStatus.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.isOnline = function() {
        return YYIMChat.isOnline.apply(YYIMChat, arguments);
    };

    YYIMCacheManager.prototype.getRosterManager = function() {
        return RosterManager.getInstance();
    };

    YYIMCacheManager.prototype.getMessageManager = function() {
        return MessageManager.getInstance();
    };

    YYIMCacheManager.prototype.getGroupManager = function() {
        return GroupManager.getInstance();
    };

    YYIMCacheManager.prototype.getDigestManager = function() {
        return DigestManager.getInstance();
    };

    YYIMCacheManager.prototype.getPubAccountManager = function() {
        return PubAccountManager.getInstance();
    };

    YYIMCacheManager.prototype.getAssistantManager = function() {
        return AssistantManager.getInstance();
    };

    YYIMCacheManager.prototype.getDevicerManager = function() {
        return DevicerManager.getInstance();
    };

    YYIMCacheManager.prototype.getFileManager = function() {
        return FileManager.getInstance();
    };

    YYIMCacheManager.prototype.getProfileManager = function() {
        return ProfileManager;
    };

    YYIMCacheManager.prototype.getColorUtil = function() {
        return ColorUtil;
    };

    YYIMCacheManager.prototype.getSpellUtil = function() {
        return SpellUtil;
    };
    return YYIMCacheManager.getInstance();
})(YYIMChat);