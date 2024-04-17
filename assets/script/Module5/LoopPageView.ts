import { _decorator, Component, Button, PageView } from 'cc';

const { ccclass, property, requireComponent } = _decorator;

@ccclass
@requireComponent(PageView)
export class LoopPageView extends Component {
    @property({ type: Button })
    private readonly prevButton: Button;
    @property({ type: Button })
    private readonly nextButton: Button;

    private pageView: PageView = null;

    protected onLoad(): void {
        this.pageView = this.getComponent(PageView);
    }
}
