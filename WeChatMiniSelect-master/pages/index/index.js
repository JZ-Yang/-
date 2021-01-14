let appDatas = getApp();
Page({
  data: {
    options: [{
      city_id: '001',
      city_name: '销售部'
    }, {
      city_id: '002',
      city_name: '技术部'
    }, {
      city_id: '003',
      city_name: '采购部'
    }],
    depart: "",
    text: '',
    inputValue: '',
    name:'',
    identity:'',
    temperature:'',
    errName:'',
    errIdentity:'',
    errTemperature:''

  },
  change (e) {
    
    this.setData({
      depart: e.detail.name,
    })

  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },
  //校验
  name:function(e){
    console.log("11111")
    var ts = this;
    var name0= e.detail.value
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    if(name0.match(reg)){
      this.setData({
        errName: "",
        name:name0
      })
      return true
    }else{
      this.setData({
       errName: "姓名格式不正确"
     })
     return false
    }
  },
  identity:function(e){
    var ts = this;
    var code = e.detail.value
    console.log(code)

    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var tip = "";
      var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
        tip = "身份证号格式错误";
        pass = false;
      }else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      }else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
    console.log(pass)
    if (!pass) { 
      this.setData({
        errIdentity: "身份证号格式不正确"
      })
      return false
    }else{
      this.setData({
        errIdentity: "",
        identity: e.detail.value
      })
      return true
    }
  },
  temperature:function(e){
    console.log("11111")
    var ts = this;
    var temperature0= e.detail.value
    var reg = /^[0-9]+(.[0-9]{1,3})?$/;//有1-3位小数的正实数
    if(temperature0.match(reg)){
      this.setData({
        errTemperature: "",
        temperature:temperature0
      })
      return true
    }else{
      this.setData({
        errTemperature: "体温格式不正确"
     })
     return false
    }
  },
  changeText (text) {
    if(this.data.depart==''||this.data.depart=="请选择部门"){
      wx.showModal({
        title: '错误信息',
        content: '请选择部门',
        showCancel: false
      });
    }else if(this.data.name==''){
      wx.showModal({
        title: '错误信息',
        content: '请输入姓名',
        showCancel: false
      });
    }else if(this.data.identity==''){
      wx.showModal({
        title: '错误信息',
        content: '请输入身份证号',
        showCancel: false
      });
    }else if(this.data.temperature==''){
      wx.showModal({
        title: '错误信息',
        content: '请输入体温',
        showCancel: false
      });
    }else if(this.data.errName||this.data.errIdentity||this.data.errTemperature!=''){
        return
    }
    else{
     /* var info = {
        "id": this.data.identity,
        "name": this.data.name,
        "depart": this.data.depart,
        "temperature": this.data.temperature
      };*/
        this.setData({
       //   inputValue:this.data.inputValue.push(info),
          inputValue: this.data.identity+"-"+this.data.name+"-"+this.data.depart+"-"+this.data.temperature
        })
        console.log(this.data.inputValue)
        appDatas.data.inputValue = this.data.inputValue;
        wx.navigateTo({
          url: '/pages/qrcode/qrcode'
        })
      }
   },
   bindNameInput (e) {
     this.setData({
       name: e.detail.value
     })
   },
   bindIdentityInput (e) {
    this.setData({
      identity: e.detail.value
    })
  },
  bindTemperatureInput (e) {
    this.setData({
      temperature: e.detail.value
    })
  }

})