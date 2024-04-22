import { Button, Component, EditBox, _decorator, error } from 'cc';
import NumberFormatter from './NumberFormatter';
import RangeSlider from './RangeSlider';

const { ccclass, requireComponent, property } = _decorator;

@ccclass
@requireComponent(NumberFormatter)
export default class RunningMeter extends Component {
    @property(RangeSlider)
    private speedSlider: RangeSlider = null;
    @property(EditBox)
    private startValueEditBox: EditBox = null;
    @property(EditBox)
    private targetValueEditBox: EditBox = null;
    @property(Button)
    private startButton: Button = null;
    @property(Button)
    private stopButton: Button = null;

    private ValueLabel: NumberFormatter;
    private isCounting: boolean = false;
    private range: number;
    private onStartButtonPress() {
        this.isCounting = true;
        this.range = this.speedSlider.value;
        this.ValueLabel.value = Number(this.startValueEditBox.string);
    }
    private onStopButtonPress() {
        this.isCounting = false;
        this.ValueLabel.value = Number(this.targetValueEditBox.string);
    }

    protected onLoad(): void {
        if (this.speedSlider === null) {
            error('No speedSlider.');
        }
        if (this.startValueEditBox === null) {
            error('No startValueEditBox');
        }
        if (this.targetValueEditBox === null) {
            error('No targetValueEditBox.');
        }
        if (this.startButton === null) {
            error('No startButton.');
        }
        if (this.stopButton === null) {
            error('No stopButton.');
        }
        this.ValueLabel = this.getComponent(NumberFormatter);
        this.ValueLabel.value = Number(this.startValueEditBox.string);
        this.startButton.node.on(Button.EventType.CLICK, this.onStartButtonPress, this);
        this.stopButton.node.on(Button.EventType.CLICK, this.onStopButtonPress, this);
    }
    protected onDestroy(): void {
        this.startButton.node.off(Button.EventType.CLICK, this.onStartButtonPress, this);
        this.stopButton.node.off(Button.EventType.CLICK, this.onStopButtonPress, this);
    }
    protected update(dt: number): void {
        if (this.isCounting) {
            const px = this.range * dt;
            if (this.ValueLabel.value >= Number(this.targetValueEditBox.string)) {
                this.ValueLabel.value = Number(this.targetValueEditBox.string);
                this.isCounting = false;
            } else {
                this.ValueLabel.value += px;
            }
        }
    }
}
