import { EditBox, Slider, _decorator, error } from 'cc';
import NumberFormatter from './NumberFormatter';

const { ccclass, property } = _decorator;

@ccclass
export default class RangeSlider extends Slider {
    @property(EditBox)
    private minValueEditBox: EditBox = null;
    @property(EditBox)
    private maxValueEditBox: EditBox = null;
    @property(NumberFormatter)
    private valueLabel: NumberFormatter = null;

    private minValue;
    private maxValue;
    private onMinValueChange(editBox: EditBox) {
        if (Number.isNaN(Number(editBox.string))) {
            return;
        }
        this.minValue = Number(editBox.string);
        this.computeLabelValue();
    }
    private onMaxValueChange(editBox: EditBox) {
        if (Number.isNaN(Number(editBox.string))) {
            return;
        }
        this.maxValue = Number(editBox.string);
        this.computeLabelValue();
    }
    private computeLabelValue() {
        this.valueLabel.value = this.minValue + (this.maxValue - this.minValue) * this.progress;
    }
    public get value() {
        return this.valueLabel.value;
    }
    public set value(val: number) {
        this.valueLabel.value = val;
    }
    protected onLoad(): void {
        this.minValueEditBox = this.node.getChildByName('MinValueEditBox').getComponent(EditBox);
        if (this.minValueEditBox === null) {
            error('No minValueEditBox component.');
        }
        this.maxValueEditBox = this.node.getChildByName('MaxValueEditBox').getComponent(EditBox);
        if (this.maxValueEditBox === null) {
            error('No maxValueEditBox component.');
        }
        this.valueLabel = this.node.getChildByName('Value').getComponent(NumberFormatter);
        if (this.valueLabel === null) {
            error('No valueLabel.');
        }
        this.minValue = Number(this.minValueEditBox.string);
        this.maxValue = Number(this.maxValueEditBox.string);
        this.valueLabel.value = 100;
        this.minValueEditBox.node.on(EditBox.EventType.TEXT_CHANGED, this.onMinValueChange, this);
        this.maxValueEditBox.node.on(EditBox.EventType.TEXT_CHANGED, this.onMaxValueChange, this);
        this.node.on('slide', this.computeLabelValue, this);
        this.computeLabelValue();
    }
    protected onDestroy(): void {
        this.minValueEditBox.node.off(EditBox.EventType.TEXT_CHANGED, this.onMinValueChange, this);
        this.maxValueEditBox.node.off(EditBox.EventType.TEXT_CHANGED, this.onMaxValueChange, this);
        this.node.off('slide', this.computeLabelValue, this);
    }
}
