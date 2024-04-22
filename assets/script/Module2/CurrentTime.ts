import { _decorator, Component, error, Label} from 'cc';

const { ccclass, property } = _decorator;

@ccclass
export class CurrentTime extends Component {
    @property({ type: Label, tooltip: '顯示時間用的Label' })
    private timeLabel: Label = null;
    protected onLoad(): void {
        this.timeLabel = this.node.getComponent(Label);
        if (this.timeLabel === null) {
            error('No Label compoment.');
        }
    }
    private updateCurrentTime()
    {
        const date = new Date();
        const ampm = date.getHours() <= 12 ? '上午' : '下午';
        const hour = date.getHours() > 12 ? date.getHours() - 12: date.getHours();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
        const second = date.getSeconds() < 10 ? `0${date.getSeconds().toString()}` : date.getSeconds().toString();
        this.timeLabel.string = `現在時間：${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${ampm}${hour}:${minute}:${second}`;
    }
    protected update(dt: number): void {
        this.updateCurrentTime();
    }
}
