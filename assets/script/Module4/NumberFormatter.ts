import { CCFloat, Component, Label, _decorator } from 'cc';

const { ccclass, executeInEditMode, requireComponent, property } = _decorator;

@ccclass
@executeInEditMode
@requireComponent(Label)
export default class NumberFormatter extends Component {
    // TODO: 請自行使用 @property 將屬性顯示於 Cocos 編輯器上
    @property({ tooltip: '是否顯示小數' })
    public displayDecimal: boolean = false;
    @property({ tooltip: '是否顯示小數後方多填的0' })
    public displayDecimalZero: boolean = false;
    @property({ tooltip: '最多顯示小數位數', min: 0, max: 20 })
    private maxDecimalLength: number = 0;
    @property({ tooltip: '是否顯示千分位分隔符號' })
    private displayThousands: boolean = false;
    // 可指定任意文字格式，並以{0}指定Value位置，此字串包含{0}時才會套用
    @property({ tooltip: '可指定任意文字格式，並以{0}指定Value位置' })
    private argumentText: string = '';

    @property
    public _value: number = 0;
    @property({ type: CCFloat, tooltip: '沒有反應，就是個數值', min: 0.0, visible: true })
    public get value(): number {
        return this._value;
    }
    public set value(val: number) {
        this._value = val;
        this.updateTextDisplay();
    }

    private label: Label = null;

    private formatArgumentText(input: string): string {
        const index = this.argumentText.search('\\{0\\}');
        if (index === -1) {
            return input;
        }
        let output = this.argumentText;
        output = output.replace('{0}', input);
        return output;
    }
    private getFormatDecimal(): string {
        let output = this._value.toFixed(this.maxDecimalLength);
        if(this.maxDecimalLength === 0){
            return output;
        }
        if (!this.displayDecimalZero) {
            for (let i = output.length - 1; output[i] === '0' && i >= 0; --i) {
                output = output.slice(0, -1);
            }
        }
         if(output.endsWith('.')){
            output = output.slice(0, -1);
         }
        return output;
    }
    private formatThousands(input: string): string {
        let { length } = input;
        const dotindex = input.indexOf('.');
        if (dotindex !== -1) {
            length -= dotindex;
            const afterdot = input.substring(dotindex);
            input = input.substring(0, dotindex);
            for (let i = input.length - 3; i > 0; i -= 3) {
                input = [input.slice(0, i), ',', input.slice(i)].join('');
            }
            input = input.concat(afterdot);
        } else {
            for (let i = length - 3; i > 0; i -= 3) {
                input = [input.slice(0, i), ',', input.slice(i)].join('');
            }
        }
        return input;
    }
    protected onLoad(): void {
        this.label = this.getComponent(Label);
        this.updateTextDisplay();
    }

    public updateTextDisplay(): void {
        let finalstr = '';
        if (this.displayDecimal) {
            finalstr = this.getFormatDecimal();
        } else {
            finalstr = Math.round(this._value).toString();
        }
        if (this.displayThousands) {
            finalstr = this.formatThousands(finalstr);
        }
        finalstr = this.formatArgumentText(finalstr);
        this.label.string = finalstr;
    }
}
