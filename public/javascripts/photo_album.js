$(document).ready(function () {
    $('.toggle_info').click(function () {
        return $(this).closest('.photo').toggleClass('show_more_info'), !1
    })
});
