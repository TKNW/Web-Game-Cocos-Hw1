import { _decorator, Component, Sprite } from 'cc';

const { ccclass, requireComponent } = _decorator;

@ccclass
@requireComponent(Sprite)
export class RadialProgress extends Component {
    private sprite: Sprite = null;

    protected onLoad() {
        this.sprite = this.getComponent(Sprite);
    }

    public get progress(): number {
        // TODO: 取得進度數值 (0 ~ 1)
        return 0;
    }

    public set progress(value: number) {
        // TODO: 設定進度
    }
}
