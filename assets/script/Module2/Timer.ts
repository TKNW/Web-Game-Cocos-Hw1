import { _decorator, Component, EditBox, Button, Label, error, log } from 'cc';
import { RadialProgress } from './RadialProgress';

const { ccclass, property } = _decorator;

@ccclass
export class Timer extends Component {
    @property({ type: EditBox, tooltip: '輸入框' })
    private timerEditorBox: EditBox = null;
    @property({ type: Button, tooltip: '開始按鈕' })
    private startButton: Button = null;
    @property({ type: Button, tooltip: '停止按鈕' })
    private stopButton: Button = null;
    @property({ type: RadialProgress, tooltip: '進度圓' })
    private progressBar: RadialProgress = null;
    @property({ type: Label, tooltip: '進度圓' })
    private leftTimeLabel: Label = null;
    private Counting: boolean = false;
    private CountTime: number;
    private NowTime: number;
    private checkDigit(): boolean {
        let result = true;
        let dotcount = 0;
        for (let i = 0; i < this.timerEditorBox.string.length; ++i) {
            if (this.timerEditorBox.string[i] === '.') {
                ++dotcount;
                if (dotcount >= 2) {
                    result = false;
                    break;
                }
            } else if (this.timerEditorBox.string[i] < '0' || this.timerEditorBox.string[i] > '9') {
                result = false;
                break;
            }
        }
        if (Number.isNaN(parseFloat(this.timerEditorBox.string))) {
            result = false;
        }
        if (parseFloat(this.timerEditorBox.string) <= 0) {
            result = false;
        }
        return result;
    }
    protected onLoad(): void {
        this.timerEditorBox = this.node.getChildByName('TimerEditBox').getComponent(EditBox);
        if (this.timerEditorBox === null) {
            error('No timerEditorBox compoment.');
        }
        this.startButton = this.node.getChildByName('StartButton').getComponent(Button);
        if (this.startButton === null) {
            error('No startButton compoment.');
        }
        this.stopButton = this.node.getChildByName('StopButton').getComponent(Button);
        if (this.stopButton === null) {
            error('No stopButton compoment.');
        }
        this.progressBar = this.node.getChildByName('ClockSprite').getComponent(RadialProgress);
        if (this.progressBar === null) {
            error('No progressBar compoment.');
        }
        this.leftTimeLabel = this.node.getChildByName('ClockLabel').getComponent(Label);
        if (this.leftTimeLabel === null) {
            error('No leftTimeLabel compoment.');
        }
        this.leftTimeLabel.node.active = false;

        this.startButton.node.on(Button.EventType.CLICK, this.onStartButtonPress, this);
        this.stopButton.node.on(Button.EventType.CLICK, this.onStopButtonPress, this);
    }
    private onStartButtonPress(): void {
        if (this.Counting) {
            return;
        }
        if (!this.checkDigit()) {
            log('Invalid digit');
            return;
        }
        this.CountTime = parseFloat(this.timerEditorBox.string);
        this.NowTime = this.CountTime;
        this.startCount();
    }
    private onStopButtonPress(): void {
        if (!this.Counting) {
            return;
        }
        this.endCount();
    }
    private startCount(): void {
        this.Counting = true;
        this.leftTimeLabel.string = this.CountTime.toFixed(2);
        this.leftTimeLabel.node.active = true;
    }
    private endCount(): void {
        if (!this.Counting) {
            return;
        }
        this.Counting = false;
        this.leftTimeLabel.node.active = false;
        this.progressBar.progress = 1;
    }
    protected update(dt: number): void {
        if (this.Counting) {
            this.NowTime -= dt;
            if (this.NowTime > 0) {
                this.leftTimeLabel.string = this.NowTime.toFixed(2);
                this.progressBar.progress = -this.NowTime / this.CountTime;
            } else {
                this.endCount();
            }
        }
    }
}
