export interface Response<T> {
    items: Array<T>;
    copyright: string;
    error: number;
}

export interface ListItem {
    name: string;
    cdate: string;
    udate: string;
    s: string;
    hash: string;
    gstatus: string;
    cstatus: string;
    folder: string;
    udate_thumbnail: string;
    fuid: string;
    shared: number;
    readOnly: number;
    isCurContest: boolean;
}

export type ListItems = Array<ListItem>;

export interface ListResponse extends Response<ListItem> {}
