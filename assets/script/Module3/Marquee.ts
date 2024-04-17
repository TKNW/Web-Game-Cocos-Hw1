import { _decorator, Component, EditBox, Button, Label, Node, CCFloat } from 'cc';

const { ccclass, property } = _decorator;

@ccclass
export class Marquee extends Component {
    @property({ type: EditBox, tooltip: '跑馬燈訊息列' })
    private editBox: EditBox = null;
    @property({ type: Button, tooltip: '更新按鈕' })
    private updateButton: Button = null;
    @property({ type: Button, tooltip: '跳過按鈕' })
    private skipButton: Button = null;
    @property({ type: Label, tooltip: '跑馬燈訊息' })
    private message: Label = null;
    @property({ type: Node, tooltip: '跑馬燈外框' })
    private readonly frame: Node = null;
    @property({ type: CCFloat, tooltip: '跑馬燈滾動速度' })
    private readonly speed: number = 10;

    // 跑馬燈訊息
    private messages: string[] = ['123123', '456456456', '789789789789'];
}
