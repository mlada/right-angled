import { Component } from '@angular/core';
import { RtListComponent } from '../../../right-angled/lists/list';
import { FOOTER_DIRECTIVES } from '../../../right-angled/index';

@Component({
    directives: [FOOTER_DIRECTIVES],
    selector: 'rt-regular-footer',
    templateUrl: 'app/shared/footers/regular-footer.html'
})
export class RegularFooterComponent {
    public hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
}
