import { _decorator, Component, EditBox, Button, Label } from 'cc';
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
}
