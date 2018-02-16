import React from 'react';
import {observer} from 'mobx-react';
import AppleItem from './AppleItem';
import '../styles/appleBasket.scss';

@observer
class AppleBusket extends React.Component {


    /** 获取未吃苹果的组件数组*/
    getAppleItem() {
        let data = [];
        this.props.store.apples.reverse().forEach(apple => {
            if (!apple.isEaten) {
                data.push( <AppleItem apple={apple}
                                      eatApple={this.props.store.eatApple} key={apple.id}/> )
            }
        });

        if(!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也</div>);

        return data;
    }

    componentDidMount() {
        // rem布局，根据屏幕宽度自适应字体大小
        document.getElementById('app').style.fontSize = parseInt(window.innerWidth / 60) + 'px'
    }

    render(){
        let { status, isPicking, buttonText, pickApple, showAbout  } = this.props.store;
        let {
            appleNow: {quantity:notEatenQuantity,weight:notEatenWeight},
            appleEaten: {quantity:EatenQuantity,weight:EatenWeight}
        } = status;


        return (
            <div className="appleBusket">
                <div className="btn-title">
                    <button title="单击显示关于" onClick={ () => showAbout() }>苹果篮子</button>
                </div>
                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃</div>
                        <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
                    </div>
                </div>
                <div className="btn-div">
                    <button title="单击摘苹果" className={isPicking ? 'disabled' : ''}
                            onClick={() => pickApple() } >{buttonText}</button>
                </div>
                <div className="appleList">
                    { this.getAppleItem() }
                </div>
            </div>
        );
    }
}



export default AppleBusket;