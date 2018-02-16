import React from 'react';
import '../styles/appleItem.scss';
import {observer} from 'mobx-react';

@observer
class AppleItem extends React.Component {

    render() {
        let { apple, eatApple } = this.props;

        let pad = (num, count) => {
            let res = Array( count - ( '' + num ).length + 1 ).join( 0 ) + num;
            return res;
        };

        return (
            <div className="appleItem">
                <div className="apple">
                    <img src={require('../images/apple.png')} alt="红富士" title="红富士"/>
                </div>
                <div className="info">
                    <div className="name">红苹果 - { pad(apple.id, 2) }号</div>
                    <div className="weight">{ apple.weight }克</div>
                </div>
                <div className="btn-div">
                    <button title="单击吃掉" onClick={()=>eatApple(apple.id)}> 吃掉 </button>
                </div>
            </div>
        );
    }
}

AppleItem.propTypes = {
    // 吃苹果的回调，已通过bindActionCreators包装成dispatch(action)
    eatApple: React.PropTypes.func.isRequired,
    apple: React.PropTypes.object.isRequired     // 单个苹果的数据
};


export default AppleItem;