import { _decorator, Component, Node, Vec2, Vec3, EventMouse, NodeSpace, log, UITransform } from 'cc';

const { ccclass } = _decorator;

@ccclass
export class Dragable extends Component {
    private mouse: boolean;
    private click: boolean;
    private mouseprelocation: Vec2;
    private mousenowlocation: Vec2;
    private mouseevent: EventMouse;
    private UT: UITransform;
    protected onLoad() {
        this.node.on(Node.EventType.MOUSE_ENTER, this.SetMouseTrue, this);
        this.node.on(Node.EventType.MOUSE_LEAVE, this.SetMouseFalse, this);
        this.node.on(Node.EventType.MOUSE_DOWN, this.SetClickTrue, this);
        this.node.on(Node.EventType.MOUSE_UP, this.SetClickFalse, this);
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMoveNode, this);
        this.mouse = false;
        this.click = false;
        this.UT = this.node.getComponent(UITransform);
    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.MOUSE_ENTER, this.SetMouseTrue, this);
        this.node.off(Node.EventType.MOUSE_LEAVE, this.SetMouseFalse, this);
        this.node.off(Node.EventType.MOUSE_DOWN, this.SetClickTrue, this);
        this.node.off(Node.EventType.MOUSE_UP, this.SetClickFalse, this);
        this.node.off(Node.EventType.MOUSE_MOVE, this.onMoveNode, this);
    }
    private SetMouseTrue() {
        this.mouse = true;
        
    }
    private SetMouseFalse() {
        this.mouse = false;
    }
    private SetClickTrue(event: EventMouse) {
        log(event.getUILocation())
        if (this.mouse && event.getButton() === EventMouse.BUTTON_LEFT) {
            this.click = true;
            // 已知bug 查了一下3.7.2版才修好，所以只能暫時這樣寫
            this.node.getParent().pauseSystemEvents(true);
            this.node.setSiblingIndex(this.node.parent.children.length-1);
            this.node.getParent().resumeSystemEvents(true);
            this.mouseprelocation = event.getUILocation();
        }
    }
    private SetClickFalse(event: EventMouse) {
        if (this.click && event.getButton() === EventMouse.BUTTON_LEFT) {
            this.click = false;
        }
    }
    private onMoveNode(event: EventMouse) {
        if (this.mouse && this.click) {
            this.mousenowlocation = event.getUILocation();
            const delta = this.mousenowlocation.subtract(this.mouseprelocation);
            this.mouseprelocation = event.getUILocation();
            this.node.translate(new Vec3(delta.x, delta.y), NodeSpace.WORLD);
            
        }
    }
}
