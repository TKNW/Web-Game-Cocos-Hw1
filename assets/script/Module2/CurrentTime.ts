import { _decorator, Component, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass
export class CurrentTime extends Component {
    @property({ type: Label, tooltip: '顯示時間用的Label' })
    private timeLabel: Label = null;
}
