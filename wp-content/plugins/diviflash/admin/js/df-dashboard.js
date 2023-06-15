jQuery(document).ready(function ($) {
    var all_buttons = document.querySelectorAll(".difl-module-btn-save");

    all_buttons.forEach(function (el){
        el.addEventListener('click', function (event) {

            event.preventDefault();
    
            var button = $(this);
            button.toggleClass('sending').blur();
            var data = []
            $(".module-control-form .all-module .item input:checked").each(function () {
                data.push($(this).val());
            });
            data
            fetch(ajaxurl, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: new URLSearchParams({
                    diviflash_save_dashboard: ajax_var.nonce,
                    action: 'diviflash_save_dashboard',
                    modules: Object.values(data),
    
                })
            })
                .then(function (response) {
                    if (response.status === 200) {
                        $('.difl-module-btn-save.save-changes').removeClass('changed');
                        
                        setTimeout(function () {
                            button.removeClass('sending').blur();
                            button.text('Changes Saved');
                        }, 1000);
    
                    }
                })
    
        });
    })

    $(".slds-form-element.item").each(function () {
        $(this).click(function (event) {
            var clickElement = $(this);
            if (clickElement.find('input').is(':checked')) {
                clickElement.find('input').prop('checked', false);
            } else {
                clickElement.find('input').prop('checked', true);
            }
            $('.difl-module-btn-save.save-changes').addClass('changed');
            $('.difl-module-btn-save.save-changes').text("Save Changes");
        });

    });

});

