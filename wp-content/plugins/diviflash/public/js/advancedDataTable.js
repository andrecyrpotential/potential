(function ($) {

    df_datatable_init();

    function df_datatable_init() {
        var selectors = document.querySelectorAll('.difl_advanced_data_table');
        [].forEach.call(selectors, function (selector, index) {
            var tableElement = selector.querySelector('.df-advanced-table');
            var optionSetttings = JSON.parse(selector.querySelector('.df_adt_container').dataset.options);
            var itemSelector = '.difl_advanced_data_table_' + index;
            const options = {
                // UI Theme Defaults
                searching: optionSetttings.adt_search,
                paging: optionSetttings.adt_paging,
                ordering: optionSetttings.adt_order,
                info: optionSetttings.adt_info,
                // scrollX: optionSetttings.adt_scroll_x,
                responsive: true
            };

            $(itemSelector + ' .df-advanced-table').DataTable(
                options
            );
        });
    }
})(jQuery);





