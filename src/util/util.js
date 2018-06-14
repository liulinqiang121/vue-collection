// import Vue from 'vue'
import qs from 'qs'
import CryptoJS from 'crypto-js'
import {
    Message,
    Container
} from 'element-ui';
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'

// 常量
// 搜索框宽度很多页面用到
const LABEL_WIDTH = '80px'
var HTMLEncode = function(html) {
    var temp = document.createElement('div');
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html)
    var output = temp.innerHTML
    temp = null
    return output
}
var HTMLDecode = function(text) {
        var temp = document.createElement('div')
        temp.innerHTML = text
        var output = temp.innerText || temp.textContent
        temp = null
        return output
    }
    // 功能：接口错误处理
    // 入参:res.data ，this,回调函数
var failCallback = function(data, that, cb) {
        if (data.code === 61019) {
            // 清用户信息
            localStorage.removeItem('username');
            // 清备忘的定时任务
            that.$store.commit('REMOVE_TIMER');
            console.log("clearTimeout success");
            // 清未读消息定时任务
            that.$store.commit('REMOVE_INTERVAL');
            console.log("clearInterval success");
            Message({
                    type: 'info',
                    message: '登录超时，请重新登录'
                })
                // 跳转登录页面
            setTimeout(() => {
                that.$router.push({
                    path: '/login'
                })
            }, 1000)
        } else {
            if (cb) {
                cb(that)
            } else {
                Message({
                    type: 'error',
                    message: data.msg
                })
            }
        }
    }
    // 功能： 获取页面资源
    // 入参:页面标识identifier（即路径） ，this,回调函数（可扩展）
var getPageResourceByMenu = function(identifier, that, cb, cb2) {
        that.$axios.post('/api/assignee/currentUser/getPageResourceByMenu', qs.stringify(encodePostBody(identifier))).then(res => {
            if (res.data.code == 0) {
                // 控制页面资源显示
                var obj = res.data.data.forEach(function(item) {
                        that.operationBtns.find(function(btn) {
                            //console.log(btn.identifier,item.identifier)
                            return btn.identifier == item.identifier
                        }).isShow = true;
                        
                    }, that)
                    // 判断是否存在查看权限
                if (that.operationBtns[0].isShow && that.getList) {
                    that.isShow = true
                    that.getList(that.queryParams)
                }
                if (cb) {
                    cb(res.data.data, that)
                }
                if (cb2) {
                    cb2(that)
                }
            } else {
                failCallback(res.data, that)
            }
        })
    }
    // 功能：接口错误处理
    // 入参:res.data ，this,回调函数(可传可不传)默认弹出错误信息
    // var failCallback = function(data, that, cb) {
    //     if (data.code == 61019) {
    //         // 跳转登录页面
    //         Message({
    //             type: 'warning',
    //             message: '登录超时，请重新登录'
    //         })
    //         setTimeout(() => {
    //             that.$router.push({
    //                 path: '/login'
    //             })
    //         }, 1000)
    //     } else {
    //         if (cb) {
    //             cb(that)
    //         } else {
    //             Message({
    //                 type: 'error',
    //                 message: data.msg
    //             })
    //         }
    //     }
    // }

// 将post请求中的参数转变安全参数，防止xss攻击
var encodePostBody = function(form) {
    var obj = {}
    Object.keys(form).forEach((item, index) => {
        if (typeof form[item] == 'object') {
            obj[item] = form[item]
        } else {
            obj[item] = HTMLEncode(form[item])
        }
    })
    return obj
}

// 将post请求返回的数据转变为输入时的字符
var decodePostBody = function(form) {
        var obj = {}
        Object.keys(form).forEach((item, index) => {
            if (typeof item == 'object') { obj[item] = form[item] } else { obj[item] = HTMLDecode(form[item]) }
        })
        return obj
    }
    // 加密
// var encrypt = function(data, key) {
//     const cipher = crypto.createCipher('aes192', key)
//     var crypted = cipher.update(data, 'utf8', 'hex')
//     crypted += cipher.final('hex')
//     return crypted
// }
var encrypt = function encryptByDESModeEBC(message,key){  
      var wordArray = CryptoJS.enc.Utf8.parse(message);
      return  CryptoJS.enc.Base64.stringify(wordArray);
    }  

// 解密
// var decrypt = function(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key)
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8')
//     decrypted += decipher.final('utf8')
//     return decrypted
// }
   var decrypt = function encryptByDESModeEBC(base64,key){  
      var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
      return  parsedWordArray.toString(CryptoJS.enc.Utf8);
    } 

// 表单验证
var formRule = {
    // 手机验证
    phone: {
        pattern: /^(13|14|15|18|17)[0-9]{9}$/,
        message: '手机格式错误',
        trigger: 'blur'
    },

    // 身份证号码验证
    ID: {
        pattern: '',
        message: '身份证格式错误',
        trigger: 'blur'
    },

    // 批次名称验证
    batchName: {
        pattern: /^\S{0,40}$/,
        message: '1至40位非空字符',
        trigger: 'blur'
    },



    // 批次号验证
    batchCode: {
        pattern: /^\S{0,40}$/,
        message: '1至40位非空字符',
        trigger: 'blur'
    },

    // 案件名验证
    caseName: {
        pattern: /^\S{0,40}$/,
        message: '1至40位非空字符',
        trigger: 'blur'
    },

    // 案件号
    caseCode: {
        pattern: /^\S{0,40}$/,
        message: '1至40位非空字符',
        trigger: 'blur'
    },

    // 进件号验证
    billCode: {
        pattern: /^\S{0,40}$/,
        message: '1至40位非空字符',
        trigger: 'blur'
    },

    // 姓名验证
    userName: {
        pattern: '',
        message: '1至10位汉字或字母',
        trigger: 'blur'
    }


}

var goDetail = function(note) {
    // url编码
    let caseCode = this.encrypt(note.caseCode + '_' + note.caseId.toString() + '_' + note.caseManageId.toString(),
        'caseDetail');
    let url = (window.location.origin ? window.location.origin : '') + '/#/worker_case_detail?id=' + caseCode;
    return url;

}


export {
    HTMLEncode,
    HTMLDecode,
    failCallback,
    getPageResourceByMenu,
    encodePostBody,
    decodePostBody,
    encrypt,
    decrypt,
    LABEL_WIDTH,
    formRule,
    goDetail,
}