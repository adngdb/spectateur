$(function () {
    var API_URL = './api/reports';
    var CRASHSTATS_API_URL = 'https://crash-stats.mozilla.com/api/SuperSearch/';
    var SEARCH_FIELDS_URL = 'fields.json';

    var model = $('#model form');
    var view = $('#view .content');
    var status = $('#status');

    var aggregations = $('#model input[name=_aggregations]');

    $('#run').on('click', function (e) {
        e.preventDefault();

        view.empty();
        view.append($('<div>', {class: 'loader'}).append($('<img>', {src: 'img/ajax-loader.gif'})));

        Processor.get()
        .then(function success() {
            return Processor.transform();
        })
        .then(function success() {
            return Processor.render();
        })
        .then(function success() {
            status.text('Ready!');
        })
        ;
    });

    $('#save').on('click', function (e) {
        e.preventDefault();

        var modelData = JSON.stringify(getModelParams());
        var controllerData = editor.getValue();

        var data = {
            model: modelData,
            controller: controllerData
        };

        $.ajax({
            type: "POST",
            url: API_URL,
            data: data,
            success: function (res) {
                var uuid = res;
                window.location.hash = '#' + uuid;
            },
            error: function (res, b, c) {
                console.error('Failed saving');
                console.error(res.responseText);
            }
        });
    });

    var aggFields = [{"text": "android fingerprint", "id": "android_fingerprint"}, {"text": "ipc channel error", "id": "ipc_channel_error"}, {"text": "product", "id": "product"}, {"text": "install age", "id": "install_age"}, {"text": "b2g os version", "id": "b2g_os_version"}, {"text": "build id", "id": "build_id"}, {"text": "plugin cpu usage", "id": "plugin_cpu_usage"}, {"text": "adapter driver version", "id": "adapter_driver_version"}, {"text": "platform", "id": "platform"}, {"text": "theme", "id": "theme"}, {"text": "version", "id": "version"}, {"text": "contains memory report", "id": "contains_memory_report"}, {"text": "total virtual memory", "id": "total_virtual_memory"}, {"text": "graphics critical error", "id": "graphics_critical_error"}, {"text": "total page file", "id": "total_page_file"}, {"text": "vendor", "id": "vendor"}, {"text": "throttleable", "id": "throttleable"}, {"text": "plugin hang", "id": "plugin_hang"}, {"text": "android display", "id": "android_display"}, {"text": "android device", "id": "android_device"}, {"text": "android brand", "id": "android_brand"}, {"text": "adapter vendor id", "id": "adapter_vendor_id"}, {"text": "productid", "id": "productid"}, {"text": "cpu info", "id": "cpu_info"}, {"text": "android model", "id": "android_model"}, {"text": "is garbage collecting", "id": "is_garbage_collecting"}, {"text": "available virtual memory", "id": "available_virtual_memory"}, {"text": "exploitability", "id": "exploitability"}, {"text": "startup time", "id": "startup_time"}, {"text": "total physical memory", "id": "total_physical_memory"}, {"text": "distributor", "id": "distributor"}, {"text": "adapter device id", "id": "adapter_device_id"}, {"text": "release channel", "id": "release_channel"}, {"text": "distributor version", "id": "distributor_version"}, {"text": "shutdown progress", "id": "shutdown_progress"}, {"text": "frame poison base", "id": "frame_poison_base"}, {"text": "cpu usage flash process1", "id": "cpu_usage_flash_process1"}, {"text": "cpu usage flash process2", "id": "cpu_usage_flash_process2"}, {"text": "email", "id": "email"}, {"text": "plugin hang ui duration", "id": "plugin_hang_ui_duration"}, {"text": "bios manufacturer", "id": "bios_manufacturer"}, {"text": "last crash", "id": "last_crash"}, {"text": "cpu name", "id": "cpu_name"}, {"text": "plugin name", "id": "plugin_name"}, {"text": "reason", "id": "reason"}, {"text": "address", "id": "address"}, {"text": "write combine size", "id": "write_combine_size"}, {"text": "android version", "id": "android_version"}, {"text": "android board", "id": "android_board"}, {"text": "accessibility", "id": "accessibility"}, {"text": "signature", "id": "signature"}, {"text": "gmp plugin", "id": "gmp_plugin"}, {"text": "java stack trace", "id": "java_stack_trace"}, {"text": "winsock lsp", "id": "winsock_lsp"}, {"text": "em check compatibility", "id": "em_check_compatibility"}, {"text": "hang type", "id": "hang_type"}, {"text": "topmost filenames", "id": "topmost_filenames"}, {"text": "user comments", "id": "user_comments"}, {"text": "android hardware", "id": "android_hardware"}, {"text": "dom ipc enabled", "id": "dom_ipc_enabled"}, {"text": "flash process dump", "id": "flash_process_dump"}, {"text": "flash version", "id": "flash_version"}, {"text": "support classification", "id": "support_classification"}, {"text": "adapter subsys id", "id": "adapter_subsys_id"}, {"text": "oom allocation size", "id": "oom_allocation_size"}, {"text": "system memory use percentage", "id": "system_memory_use_percentage"}, {"text": "async shutdown timeout", "id": "async_shutdown_timeout"}, {"text": "plugin version", "id": "plugin_version"}, {"text": "number of processors", "id": "number_of_processors"}, {"text": "ActiveExperimentBranch", "id": "ActiveExperimentBranch"}, {"text": "available physical memory", "id": "available_physical_memory"}, {"text": "useragent locale", "id": "useragent_locale"}, {"text": "tiny block size", "id": "tiny_block_size"}, {"text": "install time", "id": "install_time"}, {"text": "uptime", "id": "uptime"}, {"text": "throttle rate", "id": "throttle_rate"}, {"text": "process type", "id": "process_type"}, {"text": "processor notes", "id": "processor_notes"}, {"text": "platform version", "id": "platform_version"}, {"text": "app notes", "id": "app_notes"}, {"text": "min arm version", "id": "min_arm_version"}, {"text": "plugin filename", "id": "plugin_filename"}, {"text": "skunk classification", "id": "skunk_classification"}, {"text": "android cpu abi2", "id": "android_cpu_abi2"}, {"text": "android manufacturer", "id": "android_manufacturer"}, {"text": "android cpu abi", "id": "android_cpu_abi"}, {"text": "url", "id": "url"}, {"text": "frame poison size", "id": "frame_poison_size"}, {"text": "available page file", "id": "available_page_file"}, {"text": "ActiveExperiment", "id": "ActiveExperiment"}];
    aggregations.select2({
        'data': aggFields,
        'multiple': true,
        'width': 'element'
    });

    // Prepare ACE editor.
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setFontSize(16);

    // Prepare page.
    function getReport(uuid) {
        return new Promise(function (resolve, reject) {
            var url = API_URL + '/' + uuid;

            $.ajax({
                url: url,
                success: function (data) {
                    resolve(data);
                },
                error: function () {
                    console.error('Unable to get results');
                    reject();
                },
                dataType: 'JSON'
            });
        });
    }

    var reportUuid = null;
    var hash = window.location.hash;

    if (hash.length > 1) {
        reportUuid = hash.substr(1);
    }

    if (reportUuid) {
        getReport(reportUuid)
        .then(function (data) {
            var params = JSON.parse(data.model);
            aggregations.select2('val', params._facets);
            delete params['_facets'];

            editor.setValue(data.controller);
            model.dynamicForm(SEARCH_FIELDS_URL, params, null, function () {
                $('#run').click();
            });
        });
    }
    else {
        model.dynamicForm(SEARCH_FIELDS_URL);
    }

    $('#new-line').on('click', function (e) {
        e.preventDefault();
        model.dynamicForm('newLine');
    });

    var Processor = {

        data: {
            original: null,
            transformed: null
        },

        get: function () {
            /* Get the data from the model, using the filters provided by
               the user. Stores that data in an attribute.
            */
            var self = this;

            return new Promise(function (resolve, reject) {
                status.text('Fetching la vache...');

                var url = CRASHSTATS_API_URL + prepareResultsQueryString();

                $.ajax({
                    url: url,
                    success: function (data) {
                        self.data.original = data;
                        resolve();
                    },
                    error: function () {
                        console.error('Unable to get results');
                        reject();
                    },
                    dataType: 'JSON'
                });
            });
        },

        transform: function () {
            /* Execute a user provided script on the data, and store the
               result in an attribute.
            */
            var self = this;

            return new Promise(function (resolve, reject) {
                status.text('Processing la vache...');

                var code = editor.getValue();

                var plugin = new jailed.DynamicPlugin(code);
                plugin.whenConnected(function () {
                    plugin.remote.transform(self.data.original, function (transformedData) {
                        self.data.transformed = transformedData;
                        resolve();
                    });
                });
            });
        },

        render: function () {
            /* Display the data, either in a table or as a chart, depending
               on its type.
            */
            var self = this;

            return new Promise(function (resolve, reject) {
                status.text('Rendering la vache...');

                view.empty();

                var nav = $('<ul>', {class: 'nav nav-tabs'});
                var tabsContent = $('<div>', {class: 'tab-content'});
                view.append(nav).append(tabsContent);

                for (var i = 0; i < self.data.transformed.length; i++) {
                    var set = self.data.transformed[i];
                    var setId = set.name.toLowerCase().replace(' ', '-');

                    nav.append($('<li>', {
                        class: i && ' ' || 'active'
                    }).append($('<a>', {
                        text: set.name,
                        href: '#' + setId,
                        'data-toggle': 'tab'
                    })));

                    var container = $('<div>', {
                        class: 'tab-pane' + (i && ' ' || ' active'),
                        id: setId,
                        'data-toggle': 'tab'
                    });
                    tabsContent.append(container);

                    if (set.type === 'table') {
                        container.jsGrid({
                            width: '968px',

                            paging: true,

                            data: set.data,
                            fields: set.headers,
                        });
                    }
                    else if (set.type === 'chart') {
                        var canvas = document.createElement('canvas');
                        canvas.width = 968;
                        canvas.height = 400;
                        var ctx = canvas.getContext('2d');
                        var chart = new Chart(ctx).Line(set.data, set.options);

                        container.append(canvas);
                    }
                }

                resolve();
            });
        },
    };

    function getModelParams() {
        var i;
        var len;

        var params = model.dynamicForm('getParams');
        var aggs = aggregations.select2('data');

        if (aggs) {
            params._facets = [];
            for (i = 0, len = aggs.length; i < len; i++) {
                params._facets[i] = aggs[i].id;
            }
        }

        return params;
    }

    function prepareResultsQueryString(params) {
        return '?' + $.param(getModelParams(), true);
    }

});
