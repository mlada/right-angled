import { SkipSelf, HostListener, Directive, Input, Output, OnInit } from '@angular/core';
import { RtSelectionAreaForDirective } from './selection-area-for';
import { OnSelectedEvent, OnDeselectedEvent, OnSelectionChangedEvent, ISelectionEventsEmitter } from '../bootstrap/ISelectionEventsEmitter';
import { EventEmitter } from '@angular/core';

@Directive({
    selector: '[rt-select-by-index]'
})
export class RtSelectByIndexDirective implements ISelectionEventsEmitter, OnInit {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('rt-select-by-index') public index: number = null;
    @Output() public onSelected: EventEmitter<OnSelectedEvent> = new EventEmitter<OnSelectedEvent>();
    @Output() public onDeselected: EventEmitter<OnDeselectedEvent> = new EventEmitter<OnDeselectedEvent>();
    @Output() public onSelectionChanged: EventEmitter<OnSelectionChangedEvent> = new EventEmitter<OnSelectionChangedEvent>();


    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    public ngOnInit(): void {
        this.selectionArea.selectionManager.registerEventEmitter(this, this.index);
    }
    @HostListener('mouseup', ['$event'])
    public mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            setTimeout(this.clearWindowSelection, 0);
        }
    }

    private clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document && document.hasOwnProperty('selection')) {
                /* tslint:disable:no-string-literal */
                document['selection'].empty();
                /* tslint:enable:no-string-literal */
            }
        } catch (e) {// do nothing 
        }
    }
}
