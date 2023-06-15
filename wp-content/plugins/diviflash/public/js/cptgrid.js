(function(){
    var df_posts = document.querySelectorAll('.difl_cptgrid');

    [].forEach.call(df_posts, function(ele, index) {
        var settings = JSON.parse(ele.querySelector('.df_cptgrid_container').dataset.settings)
        var selector = ele.querySelector('.df-cpts-wrap');

        if(settings.layout === 'masonry') {
            var masonry = new Isotope( selector, {
                layoutMode: 'masonry',
                itemSelector: '.df-cpt-item',
                percentPosition: true
            });
            // masonry.layout();
            imagesLoaded(selector).on('progress', function(){
                masonry.layout();
            })
            .on('done', function(){
                masonry.layout();
            })
            setTimeout(function(){
                masonry.layout();
            }, 500);

            jQuery( document ).ajaxSuccess(function() {
                masonry = new Masonry(ele.querySelector('.df-cpts-wrap'), {
                    layoutMode: 'masonry',
                    itemSelector: '.df-cpt-item',
                    percentPosition: true
                });
                setTimeout(function() {
                    masonry.layout();
                }, 100);
            });

        }

    })

    jQuery('body').on('click', '.df-cpt-outer-wrap .et_main_video_container', function(event){
        jQuery(this).find('.et_pb_video_overlay').addClass('df-hide-overlay');
    })

})()