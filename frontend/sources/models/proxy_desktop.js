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
            this._dontLoadNext = true; // Stop loading if no data is returned
        }
    },

    _attachHandlers: function (view) {
        const proxy = this;

        // Attach scroll handlers only once
        if (view.config.columns) {
            view.attachEvent('onScrollY', function () {
                webix.message('onScrollY');
                proxy._loadNext(this);
            });
        } else {
            view.attachEvent('onAfterScroll', function () {
                proxy._loadNext(this);
            });
        }

        this._attachHandlers = function () {}; // Prevent attaching multiple handlers
    },

    _loadNext: function (view) {
        const contentScroll = view.getScrollState().y + view.$view.clientHeight;
        const node = view.getItemNode(view.getLastId());
        const height = view.config.rowHeight || view.type.height;

        // Prefetch data slightly earlier (before the user reaches the end)
        if (node && contentScroll >= node.offsetTop + height - 2 * height && !this._dontLoadNext) {
            view.loadNext(view.config.datafetch, view.count() + 1);
        }
    },
};
