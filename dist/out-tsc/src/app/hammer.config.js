import { HammerGestureConfig } from "@angular/platform-browser";
import * as hammer from "hammerjs";
export class HammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            swipe: { direction: hammer.DIRECTION_HORIZONTAL },
            pinch: { enable: false },
            rotate: { enable: false }
        };
    }
}
//# sourceMappingURL=hammer.config.js.map