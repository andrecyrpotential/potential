(function(){
    var df_posts = document.querySelectorAll('.difl_postgrid');

    [].forEach.call(df_posts, function(ele, index) {
        var settings = JSON.parse(ele.querySelector('.df_postgrid_container').dataset.settings)
        var selector = ele.querySelector('.df-posts-wrap');

        if(settings.layout === 'masonry') {
            var masonry = new Isotope( selector, {
                layoutMode: 'masonry',
                itemSelector: '.df-post-item',
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
                masonry = new Masonry(ele.querySelector('.df-posts-wrap'), {
                    layoutMode: 'masonry',
                    itemSelector: '.df-post-item',
                    percentPosition: true
                });
                setTimeout(function() {
                    masonry.layout();
                }, 100);
            });

        }

    })

    jQuery('body').on('click', '.df-post-outer-wrap .et_main_video_container', function(event){
        jQuery(this).find('.et_pb_video_overlay').addClass('df-hide-overlay');
    })

})()