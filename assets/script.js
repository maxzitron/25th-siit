/**
 * Created by max on 31/5/17.
 */
$(document).ready(function () {
    var $cropper;


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
        $('.cropper').removeClass('hidden');
        $('.uplopad-btn').text("New Image");
        readFile(this);
    });




});