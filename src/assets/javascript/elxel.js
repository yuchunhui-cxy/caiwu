import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
    install(Vue, options) {
        //获取当前时间加时分秒
        Vue.prototype.getDatePage = function () {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒

            var clock = year + "-";

            if (month < 10)
                clock += "0";

            clock += month + "-";

            if (day < 10)
                clock += "0";

            clock += day + " ";

            if (hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm + ":";

            if (ss < 10) clock += '0';
            clock += ss;
            return (clock);
        }

//获取当前时间不加时分秒
        Vue.prototype.getDates = function () {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            // var hh = now.getHours();            //时
            // var mm = now.getMinutes();          //分
            // var ss = now.getSeconds();           //秒

            var clock = year + "-";

            if (month < 10)
                clock += "0";

            clock += month + "-";

            if (day < 10)
                clock += "0";

            clock += day

            // if(hh < 10)
            //   clock += "0";
            //
            // clock += hh + ":";
            // if (mm < 10) clock += '0';
            // clock += mm + ":";
            //
            // if (ss < 10) clock += '0';
            // clock += ss;
            return (clock);
        }
        // 判断是不是整数
        Vue.prototype.isNumber = function (val) {
            var reg = /^[0-9]+.?[0-9]*$/;
            if (!reg.test(val)) {
                this.$message({
                    message: '请输入数字',
                    type: 'warning'
                });
                return false;
            } else {
                return true;
            }

        }

        //导出excel表
        Vue.prototype.exportFunc = function (el, name) {
            // 从表生成工作簿对象
            // wb是要导出的表格的json数据
            let wb = XLSX.utils.table_to_book(document.getElementById(el));

            // 得到二进制字符串作为输出
            let wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'binary'
            });

            // 得到二进制流
            let blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})

            let date = this.getDates(new Date());
            //第一个参数为导出的内容,第二个参数为文件名字
            FileSaver.saveAs(blob, date + name + '.xlsx');
            // this.sleeveShow = false;
        }

        const s2ab = function (s) {
            if (typeof ArrayBuffer !== 'undefined') {
                //二进制组成的数组
                var cuf = new ArrayBuffer(s.length);

                var view = new Uint8Array(cuf);

                for (var i = 0; i !== s.length; i++) {
                    //一个&表示运算符按位与，就是把两个二进制数按每一位比较，两个都为1则为1，否则为0（也类似与且，都真才为真）
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return view;

            } else {
                var cuf = new Array(s.length);

                for (var i = 0; i !== s.length; ++i) {
                    cuf[i] = s.charCodeAt(i) & 0xFF;
                }
                return cuf;
            }
        }
    }
}
