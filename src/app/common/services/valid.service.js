(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .service('Valid', Valid)
    
  function Valid(){
	  var valid = {};
	  // 校验手机号
	  valid.checkTel = function (tel) {
	  	var regTel = /^1[3|4|5|6|7|8|9]\d{9}$/;
	  	if (regTel.test(tel)) {
	  		return true;
	  	}
	  	return false;
	  }
	  // 校验身份证号
	  valid.checkIdCardNo = function (card) {
            var vcity = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '91']
                //检查号码是否符合规范，包括长度，类型
            var isCardNo = function(card) {
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                //var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                //身份证号码为18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var reg = /^\d{17}(\d|X)$/;
                if (reg.test(card) == false) {
                    return false;
                }
                return true;
            };
            //取身份证前两位,校验省份
            var checkProvince = function(card) {
                var province = card.substr(0, 2);
                if (vcity.indexOf(province) < 0) {
                    return false;
                }
                return true;
            };
            //检查生日是否正确
            var checkBirthday = function(card) {
                var len = card.length;
                var ereg;
                //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
                if (len == '15') {
                    if ((parseInt(card.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(card.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(card.substr(6, 2)) + 1900) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
                    } else {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
                    }
                    if (ereg.test(card)) {
                        return '19' + card.substr(6, 2) + '-' + card.substr(8, 2) + '-' + card.substr(10, 2);
                    } else {
                        return false;
                    }

                }
                //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                else if (len == '18') {
                    if (parseInt(card.substr(6, 4)) % 4 == 0 || (parseInt(card.substr(6, 4)) % 100 == 0 && parseInt(card.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}(20|19)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                    } else {
                        ereg = /^[1-9][0-9]{5}(20|19)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                    }
                    if (ereg.test(card)) {
                        return card.substr(6, 4) + '-' + card.substr(10, 2) + '-' + card.substr(12, 2);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };
            //检查性别
            var checkSex = function(card) {
                var sexShow;
                if (card.length == '15') {
                    sexShow = card.slice(14, 15) % 2 ? '1' : '2';
                    return sexShow;
                } else if (card.length == '18') {
                    sexShow = card.slice(16, 17) % 2 ? '1' : '2';
                    return sexShow;
                } else {
                    return false;
                }
            };

            function calculateAge(birthDay) {
                    var age = (_SYSTEMTODAY.getFullYear() - birthDay.substring(0, 4));
                    if (_SYSTEMTODAY.getMonth() - birthDay.substring(5, 7) > -1) {
                        return age;
                    } else if (_SYSTEMTODAY.getMonth() - birthDay.substring(5, 7) < -1) {
                        return age - 1;
                    } else if (_SYSTEMTODAY.getDate() - birthDay.substring(8, 10) < 0) {
                        return age - 1;
                    } else {
                        return age;
                    }
                }
                //校验位的检测
            var checkParity = function(card) {
                //15位转18位
                card = changeFivteenToEighteen(card);
                var len = card.length;
                if (len == '18') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0,
                        i, valnum;
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[cardTemp % 11];
                    if (valnum == card.substr(17, 1)) {
                        return true;
                    }
                    return false;
                }
                return false;
            };
            //15位转18位身份证号
            var changeFivteenToEighteen = function(card) {
                if (card.length == '15') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0,
                        i;
                    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }
                    card += arrCh[cardTemp % 11];
                    return card;
                }
                return card;
            };

            function validIdCard (card) {
            	if (card.indexOf("*") <= -1) {
            		//校验长度
            		if (isCardNo(card)) {
            			// 检查省份
            			if (checkProvince(card)) {
            				// 校验生日
            				if (checkBirthday(card)) {
            					// 校验性别
            					if (checkSex(card)) {
            						// 校验校验位
            						if (checkParity(card)) {
            							return true
            						} else {
            							return false
            						}
            					} else {
            						return false
            					}
            				} else {
            					return false
            				}

            			} else {
            				return false
            			}
            		} else {
            			return false
            		}
            	} else {
            		return false
            	}
            }
            return validIdCard (card)
            

	  	
	  }

	  return valid;
  }
  
})();
