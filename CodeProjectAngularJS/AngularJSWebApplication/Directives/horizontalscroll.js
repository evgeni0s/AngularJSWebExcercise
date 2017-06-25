define(['application-configuration'], function (app) {
    
    //Works perfectly for smooth scrolling
    //var converted = '+=' + event.deltaY;
    //$(element).animate({ scrollLeft: converted }, 10);
    //var converted = '-=' + event.deltaY*(-1);
    var horizontalScrollDirective = function () {
        return {
            link: function ($scope, element, attrs) {
                element.bind("DOMMouseScroll mousewheel onmousewheel", function (event) {
                    //var previousAnimationsStillRunning = $(element).is(':animated');

                    event.preventDefault();//scrolling animation still runns, kill it

                    var anumations = $(element).filter(':animated');// take probe if any other animations are running
                    var previousAnimationsStillRunning = anumations.length !== 0;

                    if (previousAnimationsStillRunning)
                    {
                        return;
                    }

                    var childe = $(element).children().first();
                    var widthToScroll = childe.outerWidth() * 2;
                    if (event.deltaY > 0) {
                        /////!!!!!!!!!!!!!DO NOT DELETE> ADD TO NOTES 
                        //console.log($(element));
                        //console.log($(element).next());
                        //console.log($(element).next().offset());



                        var converted = '+=' + widthToScroll;
                        $(element).animate({ scrollLeft: converted }, 500, 'easeInCirc');

                    } else if (event.deltaY < 0) {
                        //$(element).animate({ scrollLeft: ('+=200') }, 10);
                        //var converted = '-=' + $(element).children().first().offset().left;
                        
                        var converted = '-=' + widthToScroll;
                        $(element).animate({ scrollLeft: converted }, 500, 'easeInCirc');
                    }
                    $(element).scrollLeft();
                });
            }
        }
    };
    //app.directive("fullscreen", fullScreenDirective);
    app.register.directive("horizontalScroll", horizontalScrollDirective);
});