(function(){
    var df_image_gallery = document.querySelectorAll('.difl_imagegallery');
    [].forEach.call(df_image_gallery, function(ele, index) {
        var container = ele.querySelector('.df_ig_container');
        var settings = JSON.parse(container.dataset.settings);
        var image_obj = settings.image_ids.split(",");
		image_obj = image_obj.filter(function (v,i) { return image_obj.indexOf(v) === i});
        var image_count = parseInt(settings.image_count);
        var grid = ele.querySelector('.grid');
        var target = settings.url_target;
        var ig_lightbox_options = {
            ig_lightbox: settings.use_lightbox,
            filter: false,
            filterValue: '',
            download : settings.use_lightbox_download === 'on' ? true : false
        }; 
        
        if (typeof imagesLoaded === "function") {
            if (typeof Isotope === "function") {
                var iso = new Isotope( grid, {
                    layoutMode: settings.layout_mode,
                    percentPosition: true,
                    itemSelector: '.grid-item',
                    transitionDuration: '0.6s',
                    stagger: 30
                });

                df_ig_isotop(grid, iso);
                
                // load more functionality
                if (ele.querySelector('.ig-load-more-btn')) {
                    ele.querySelector('.ig-load-more-btn').addEventListener('click', function(event) {
                        event.preventDefault();
                        ele.querySelector('.ig-load-more-btn').classList.add('loading')
                        
                        var ajaxurl = window.et_pb_custom.ajaxurl;
                        var load_more = container.querySelector('.ig-load-more-btn');
                        var loaded = parseInt(event.target.dataset.loaded);
                        
                        fetch(ajaxurl, {
                            method: 'POST',
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Cache-Control': 'no-cache',
                            },
                            body: new URLSearchParams({
                                et_frontend_nonce: window.et_pb_custom.et_frontend_nonce,
                                action: 'df_image_gallery_fetch',
                                images: settings.image_ids,
                                page: load_more.dataset.page,
                                loaded: loaded,
                                image_count: parseInt(settings.image_count),
                                options: JSON.stringify(settings)
                            })
                        })
                        .then(function(response) { return response.json()})
                        .then(function(response) {
                            let parser = new DOMParser();
                            let parsedHtml = parser.parseFromString(response.data, 'text/html');
                            var items = parsedHtml.querySelectorAll('.df_ig_image');
                            
                            items.forEach(function(item) {
                                grid.appendChild(item)
                            })
                            iso.appended( items )
                            
                            df_ig_isotop(grid, iso);
                            
                            loaded = loaded + image_count;
                            if ( loaded >= image_obj.length) {
                                event.target.style.display = "none";
                            } else {
                                event.target.setAttribute("data-loaded", loaded);
                            }
                            event.target.classList.remove('loading')
                        })
                        .then(function() {
                            df_ig_url_open(target, ele);

                            df_ig_use_lightbox(
                                ele.querySelector('.grid'), 
                                ig_lightbox_options
                            );
                        })
                    })
                }

                // filter
                var filtersElem = ele.querySelector('.df_filter_buttons');
                
                if (filtersElem !== null) {
                    var buttons = filtersElem.querySelectorAll('.button');

                    filtersElem.addEventListener( 'click', function( event ) {

                        for ( var i=0, len = buttons.length; i < len; i++ ) {
                            var button = buttons[i];
                            button.classList.remove('is-checked');
                        }

                        // only work with buttons
                        if ( !matchesSelector( event.target, 'button' ) ) {
                          return;
                        }
                        
                        var filterValue = event.target.getAttribute('data-filter');
                        event.target.classList.add('is-checked');
                        
                        // use matching filter function
                        iso.arrange({ filter: filterValue });
                        ig_lightbox_options.filter = true;
                        ig_lightbox_options.filterValue = filterValue;

                        df_ig_url_open(target, ele);

                        df_ig_use_lightbox(
                            ele.querySelector('.grid'), 
                            ig_lightbox_options
                        );
                        
                    });
                }

                df_ig_url_open(target, ele);

                df_ig_use_lightbox(
                    ele.querySelector('.grid'), 
                    ig_lightbox_options
                );
                
            }
            
        }

    })

    
    
})()

function df_ig_isotop(selector, iso) {
    imagesLoaded(selector).on('progress', function() {
        iso.layout()
    }).on('done', function() {
        selector.style.opacity = 1;
    })
}

function df_ig_use_lightbox(selector, options) {
    if (options.ig_lightbox === 'on') {
        var settings = {
            subHtmlSelectorRelative: true,
            addClass: 'df_ig_lightbox',
            counter: false,
            download: options.download
        };
        
        if (options.filter) {
            settings.selector= options.filterValue.replace('*', '');
            // window.lgData[selector.getAttribute('lg-uid')].destroy(true);
        }
        
        lightGallery(selector,settings);
    }
}

function df_ig_url_open(target, ele) {   
    var elements = ele.querySelectorAll('.item-content');
    [].forEach.call(elements, function(image, index) {
        var url = image.dataset.url;
        if(url && url !== '') {
            image.addEventListener('click', function(event) {
                if (target === 'same_window') {
                    window.location = url;
                } else {
                    window.open(url)
                }
            })
        }
    })
}

function igHandleClick(event) {
    return false;
}

