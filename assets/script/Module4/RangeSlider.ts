import { EditBox, Slider, _decorator } from 'cc';
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
}
