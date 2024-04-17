import { _decorator, Component, Button, ScrollView, EditBox, Label } from 'cc';

const { ccclass, property, requireComponent } = _decorator;

@ccclass
@requireComponent(ScrollView)
export class InfiniteScrollView extends Component {
    @property({ type: EditBox })
    private readonly countEditBox: EditBox = null;
    @property({ type: Button })
    private readonly updateButton: Button = null;
    @property({ type: Label })
    private readonly lastClickLabel: Label = null;

    private scrollView: ScrollView = null;

    protected onLoad(): void {
        this.scrollView = this.getComponent(ScrollView);
    }
}
