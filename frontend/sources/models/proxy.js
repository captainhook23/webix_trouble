import * as webix from 'webix';

export const proxy = {
    $proxy: true,

    load: function (view, params) {
        this._attachHandlers(view);

        var url = this.source;
        url += url.indexOf('?') === -1 ? '?' : '&';

        var count = params ? params.count : view.config.datafetch || 0;
        var start = params ? params.start - 1 : 0;

        // Construct the URL with pagination parameters
        url += 'count=' + count;
        url += start ? '&start=' + start : '';

        // Fetch data from the server
        return webix.ajax(url).then(
            webix.bind(function (data) {
                data = data.json().data;
                this._checkLoadNext(data);
                return data;
            }, this),
        );
    },

    _checkLoadNext: function (data) {
        if (!data.length) {
            webix.message({ type: 'info', text: 'No more data to load', color: '#ff6600' });
            this._dontLoadNext = true; // Stop loading if no data is returned
        }
    },

    _attachHandlers: function (view) {
        const proxy = this;

        // Attach scroll handlers only once
        if (view.config.columns) {
            view.attachEvent('onTouchEnd', function () {
                proxy._loadNext(this);
            });
            view.attachEvent('onTouchStart', function () {
                proxy._loadNext(this);
            });
            view.attachEvent('onTouchMove', function () {
                proxy._loadNext(this);
            });
            view.attachEvent('onAfterRender', function () {
                proxy._loadNext(this);
            });
        }

        this._attachHandlers = function () {}; // Prevent attaching multiple handlers
    },

    _loadNext: function (view) {
        const contentScroll = view.getScrollState().y + view.$view.clientHeight;
        const node = view.getItemNode(view.getLastId());

        // Prefetch data slightly earlier (before the user reaches the end)
        if (node && contentScroll >= node.offsetTop - 1500 && !this._dontLoadNext) {
            view.loadNext(view.config.datafetch, view.count() + 1);
        }
    },
    save: {
        insert: function (view, data) {
            return webix.ajax().post(this.source, data);
        },

        update: function (view, data) {
            return webix.ajax().put(this.source + '/' + data.id, data);
        },

        delete: function (view, data) {
            return webix.ajax().del(this.source + '/' + data.id);
        },
    },
};
