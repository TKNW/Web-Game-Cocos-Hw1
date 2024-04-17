import { Component, Label, _decorator } from 'cc';

const { ccclass, executeInEditMode, requireComponent } = _decorator;

@ccclass
@executeInEditMode
@requireComponent(Label)
export default class NumberFormatter extends Component {
    // TODO: 請自行使用 @property 將屬性顯示於 Cocos 編輯器上
    public displayDecimal: boolean = false;
    public displayDecimalZero: boolean = false;
    private maxDecimalLength: number = 0;
    private displayThousands: boolean = false;
    // 可指定任意文字格式，並以{0}指定Value位置，此字串包含{0}時才會套用
    private argumentText: string = '';
    public value: number;

    private label: Label = null;

    protected onLoad(): void {
        this.label = this.getComponent(Label);
        this.updateTextDisplay();
    }

    public updateTextDisplay(): void {}
}
