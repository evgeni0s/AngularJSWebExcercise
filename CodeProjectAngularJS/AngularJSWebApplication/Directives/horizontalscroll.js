define(['application-configuration'], function (app) {

// Known problem: Jquery UI loads not in appropriate moment.  Need to set dependency    
    //Works perfectly for smooth scrolling
    //var converted = '+=' + event.deltaY;
    //$(element).animate({ scrollLeft: converted }, 10);
    //var converted = '-=' + event.deltaY*(-1);
    var horizontalScrollDirective = function () {
        var previousAnimationsStillRunning = false; //anumations.length !== 0;
        return {
            link: function ($scope, element, attrs) {

                var getWidthToScroll = function () {
                    var childe = $(element).children().first();
                    var widthToScroll = childe.outerWidth() * 2;
                    return widthToScroll;
                };
                //element.bind("scroll", function () {
                //    var i = 0;
                //    i++;
                //});

                element.bind("DOMMouseScroll mousewheel onmousewheel", function (event) {
                    //var previousAnimationsStillRunning = $(element).is(':animated');

                    event.preventDefault();//scrolling animation still runns, kill it

                    //var anumations = $(element).filter(':animated');// take probe if any other animations are running

                    if (previousAnimationsStillRunning)
                    {
                        return;
                    }

                    //var onAnimCompleated = function () {
                    //    previousAnimationsStillRunning = false;
                    //};
                    previousAnimationsStillRunning = true;
                    var animationValue = '';
                    if (event.deltaY > 0) {
                        /////!!!!!!!!!!!!!DO NOT DELETE> ADD TO NOTES 
                        //console.log($(element));
                        //console.log($(element).next());
                        //console.log($(element).next().offset());



                        animationValue = '+=' + getWidthToScroll();
                        //$(element).animate({ scrollLeft: converted }, 500, 'easeInCirc', onAnimCompleated);

                    } else if (event.deltaY < 0) {
                        //$(element).animate({ scrollLeft: ('+=200') }, 10);
                        //var converted = '-=' + $(element).children().first().offset().left;
                        
                        animationValue = '-=' + getWidthToScroll();
                        //$(element).animate({ scrollLeft: converted }, 500, 'easeInCirc', onAnimCompleated);
                    }/*easing: 'easeInCirc', *//* queue: false*/
                    //$(element).animate({ scrollLeft: animationValue }, { duration: 500, easing: 'easeInCirc', complete: onAnimCompleated });
                    $(element).animate({ scrollLeft: animationValue }, 300, 'easeInCirc', function ()
                    {
                        previousAnimationsStillRunning = false;
                    });
                    $(element).scrollLeft();
                    //event.preventDefault();
                });
            }
        }
    };
    //app.directive("fullscreen", fullScreenDirective);
    app.register.directive("horizontalScroll", horizontalScrollDirective);
});