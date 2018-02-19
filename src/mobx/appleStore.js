import {observable, computed, action, autorun} from 'mobx';
import swal from 'sweetalert'
import '../../lib/jquery.min'
import '../../lib/jquery.xctips'
import '../styles/jquery.xctips.css'

class appleStore {

    @observable apples = [
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ];

    @observable isPicking = false;
    @observable buttonText = '摘苹果';
    @observable max_apples = 99;

    /**  计算当前已吃和未吃苹果的状态 */
    @computed get status(){
        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        this.apples.forEach(apple => {
            let selector = apple.isEaten ? 'appleEaten':'appleNow';
            status[selector].quantity++;
            status[selector].weight += apple.weight;
        });
        return status;
    }


    /*摘苹果的异步操作*/
    @action pickApple = ()=>{

        /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
        if (this.isPicking) {
            console.log('正在采摘，结束这个thunk!');
            return;
        }

        if (this.status['appleNow'].quantity >= 10) {
            xcsoft.error('去库存！请吃苹果!', 3000);
            return;
        }

        if (this.apples.length >= this.max_apples) {
            xcsoft.error('已没有更多苹果可摘！', 3000);
            return;
        }

        this.isPicking = true;
        this.buttonText = '正在采摘...';
        let url = 'https://caihenry.github.io/apple-basket-redux/data/fetch_apple.json';
        if(self.fetch) {
            // 使用 fetch 框架处理
            fetch(url)
                .then(res => {
                    /* 这里只是确保接口是通的，至于数据还是自己mock */
                    let weight = Math.floor(200 + Math.random() * 50);
                    let new_apple = {
                        id: this.apples.length + 1,
                        weight: weight,
                        isEaten: false
                    };
                    this.apples.push(new_apple);
                    console.log('fetch采摘苹果id: '+new_apple.id);
                }).catch((e) => {
                xcsoft.error('没有摘到苹果，请检查网络问题！', 3000);
            });
        } else {
            // 使用 XMLHttpRequest 或者其他封装框架处理
            var _this = this;
            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.onload = function() {
                if(request.status == 200) {
                    let text = request.responseText;
                    let object = JSON.parse(text);
                    /* 这里只是确保接口是通的，至于数据还是自己mock */
                    let weight = Math.floor(200 + Math.random() * 50);
                    let new_apple = {
                        id: _this.apples.length,
                        weight: weight,
                        isEaten: false
                    };
                    _this.apples.push(new_apple);
                    console.log('request采摘苹果id: '+new_apple.id);
                } else {
                    xcsoft.error('request error: ' + request.status + ', url: ' + request.url + '.');
                }
            };
            request.onerror = function() {
                xcsoft.error('request,没有摘到苹果，请检查网络问题！', 3000);
            };
            request.send(null);
        }
        this.isPicking = false;
        this.buttonText = '摘苹果';
    };

    /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功*/
    @action eatApple = (appleId)=>{
        console.log('准备吃苹果id: '+appleId);
        this.apples.some(function(apple){
            if(apple.id == appleId){
                apple.isEaten = true;
                console.log('吃掉苹果id: '+apple.id);
                return true;
            }
        });
    };

    showAbout = () => {
        /* refer to https://sweetalert.js.org/guides/#getting-started */
        swal({
            title: '关于苹果篮子',
            text: '声明： forked from https://github.com/ckinmind/apple-basket-redux\n作者:  ckinmind&Henry Cai\r\n电邮: imhenrycai@yahoo.com\r\n日期: 2018/02/16\r\n版本: v1.0',
            //icon: 'success',
            button: '关闭',
            className: 'about'
        });
    }
}

export default appleStore;