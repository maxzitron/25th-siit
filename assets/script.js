/**
 * Created by max on 31/5/17.
 */
$(document).ready(function () {
    var $cropper;
    var $size = 1024;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.upload-demo').addClass('ready');
                $cropper.croppie('bind', {
                    url: e.target.result
                }).then(function () {
                    console.log('jQuery bind complete');
                });
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    // initiate cropper
    $cropper = $('.cropper').croppie({
        enableExif: true,
        viewport: {
            width: 280,
            height: 280,
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    // trigger upload button
    $('.uplopad-btn').click(function (e) {
        e.preventDefault();
        $('#upload').trigger("click");
    })

    $('#upload').change(function() {
        $("#result").addClass("hidden");
        $('.cropper, .editor, .download-btn').removeClass('hidden');
        $('.uplopad-btn').text("New Image");

        readFile(this);
    });

    $('.download-btn').click(function () {
        $(this).addClass("hidden");

        $cropper.croppie('result', {
            type: 'canvas',
            size: { width: $size, height: $size },
            format: 'png'
        }).then(function (response) {
            $(".editor").addClass("hidden");
            render({
                src: response
            });
        });
    });


    function render(result) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        var image = new Image();
        image.src = result.src;
        image.onload = function() {
            var imageOverlay = new Image();
            imageOverlay.src = 'assets/frame.png';

            imageOverlay.onload = function() {
                context.fillStyle = 'white';
                context.fillRect(0, 0, $size, $size);
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
                context.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height, 0, 0, imageOverlay.width, imageOverlay.height);
                var imgURL = canvas.toDataURL("image/jpeg");
                $("#result-img").attr("src", imgURL);
                $("#result").removeClass("hidden");
            };
        };
    }



});