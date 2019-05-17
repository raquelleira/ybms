import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SidenavService } from './shared/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, AfterViewChecked {

    public sidenavOpened: boolean;
    public sidenavMode: string;
    public size: string = '400';

    constructor(
        private _sidenavService: SidenavService,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.sidenavOpened = this._sidenavService.isOpened;
        this.sidenavMode = this._sidenavService.mode;
        this._startSubscriptions();
    }

    public ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    public ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }

    /**
     * Subscribe to status and mode observables
     *
     * @returns {void}
     */
    private _startSubscriptions(): void {
        this._sidenavService.status$
            .subscribe(() => {
                this.sidenavOpened = this._sidenavService.isOpened;
            });

        this._sidenavService.mode$
            .subscribe( () => {
                this.sidenavMode = this._sidenavService.mode;
            });
    }

}
