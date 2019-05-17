// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

    private _itemSubject: Subject<any> = new Subject<any>();
    public item$ = this._itemSubject.asObservable();
    private _item: any;

    public size: string = '400';
    private _status: string = 'CLOSED';
    private _statusSubject: Subject<string> = new Subject<string>();
    public status$ = this._statusSubject.asObservable();

    private _mode: string = 'PUSH';
    private _modeSubject: Subject<string> = new Subject<string>();
    public mode$ = this._modeSubject.asObservable();

    constructor(
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    public get item(): any {
        return this._item;
    }
    public set item(item: any) {
        this._item = item;
        this._itemSubject.next(this._item);
    }

    /**
     * Gets right sidenav current mode
     *
     * @readonly {string}
     */
    public get mode(): string {
        return this._mode;
    }

    /**
     * Sets rights idenav mode
     *
     * @param {string} mode
     */
    public set mode(mode: string) {
        this._mode = mode;
        this._modeSubject.next(this._mode);
    }

    /**
     * Gets right sidenav current status
     *
     * @readonly {string}
     */
    public get status(): string {
        return this._status;
    }

    /**
     * Sets rights idenav status
     *
     * @param {string} status
     */
    public set status(status: string) {
        this._status = status;
        this._statusSubject.next(this._status);
    }

     /**
     * Gets is the right sidenav is opened or not
     *
     * @readonly {boolean}
     */
    public get isOpened(): boolean {
        return this.status === 'OPENED';
    }

    /**
     * Opens the right sidenav for a given route
     *
     * @param {ActivatedRoute} activatedRoute // The activated route which the outlet route is relative to
     * @param {string} route // The route itself
     * @param {srting} mode // The sidenav mode
     *
     */
    public openSidenav ( activatedRoute: ActivatedRoute,
                         route: string,
                         mode: string =  'PUSH',
                         size: string = '400' ): void {
        this.mode = mode;
        this.size = size;
        this.status = 'OPENED';
        this._router.navigate(
            [
                { outlets: { right: [route] } }
            ],
            { relativeTo: activatedRoute },
        );
    }

     /**
     * Closes the sidenav and deactivates the router outlet.
     *
     * @param {ActivatedRoute} activatedRoute // The activated route which the outlet route is relative to
     */
    public closeSidenav (activatedRoute: ActivatedRoute): void {
        this.status = 'CLOSED';
        this._router.navigate(
            [
                { outlets: { right: null } }
            ],
            { relativeTo: activatedRoute.parent }
        );
    }

    public toggleSidenav( route: string, mode: string = 'SIDE' ): void {
        this.size = '400';
        if ( this.status === 'OPENED') {
            // Will close sidenav
            this.status = 'CLOSED';
            this._clearPanelOutlet();
        } else {
            //  Will open sidenav
            this.status = 'OPENED';
            this.mode = mode;
            this._openPanelOutlet(route);
        }
    }

    /**
     * Navigates to component in right sidebar router outlet.
     *
     * @private
     * @param {string} route
     * @returns {void}
     */
    private _openPanelOutlet(route: string): void {
        this._router.navigate([
            'main',
            {
                outlets: {
                    right: [
                        route
                    ]
                }
            }
        ], {
                relativeTo: this._route
            });
    }

    /**
     * Clear right sidebar route component
     *
     * @private
     * @returns {void}
     */
    private _clearPanelOutlet(): void {
        this._router.navigate([
            'main',
            {
                outlets: {
                    right: null
                }
            }
        ], {
                relativeTo: this._route
            });
    }
}
