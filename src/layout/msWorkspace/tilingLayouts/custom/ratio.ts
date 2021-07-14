/** Gnome libs imports */
import * as GObject from 'gobject';

/** Extension imports */
const Me = imports.misc.extensionUtils.getCurrentExtension();
import { BaseResizeableTilingLayout } from 'src/layout/msWorkspace/tilingLayouts/baseResizeableTiling';
import { registerGObjectClass } from 'src/utils/gjs';

@registerGObjectClass
export class RatioLayout extends BaseResizeableTilingLayout {
    static state = { key: 'ratio' };
    static label = 'Ratio';

    updateMainPortionLength(length: number) {
        const pushInPortion = (portion) => {
            if (portion.children.length === 3) {
                pushInPortion(portion.children[2]);
            } else {
                portion.push();
            }
        };

        while (this.mainPortion.portionLength > length) {
            this.mainPortion.pop();
        }

        while (length > 1 && this.mainPortion.portionLength < length) {
            pushInPortion(this.mainPortion);
        }
    }
}
