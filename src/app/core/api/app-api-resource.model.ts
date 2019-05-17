// tslint:disable:ban-types

interface AppAPIResourceInterface {
    GET_ALL?: Function;
    GET?: Function;
    DELETE?: Function;
    POST?: Function;
    PUT?: Function;
    PATCH?: Function;

}

export class AppAPIResource implements AppAPIResourceInterface {
    public GET_ALL?: Function;
    public GET?: Function;
    public DELETE?: Function;
    public POST?: Function;
    public PUT?: Function;
    public PATCH?: Function;

    constructor({
        GET_ALL = () => '',
        GET = () => '',
        DELETE = () => '',
        POST = () => '',
        PUT = () => '',
        PATCH = () => ''
    }: {
        GET_ALL?: Function;
        GET?: Function;
        DELETE?: Function;
        POST?: Function;
        PUT?: Function;
        PATCH?: Function;
    }) {
        this.GET_ALL = GET_ALL;
        this.GET = GET;
        this.DELETE = DELETE;
        this.POST = POST;
        this.PUT = PUT;
        this.PATCH = PATCH;
    }
}
