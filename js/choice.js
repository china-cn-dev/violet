(function() {
    $('.radio-btn').on('change', 'input[type="radio"]', function() {
        var $this = $(this);
        var name = $this.attr('name');
        if (typeof name === 'undefined') {
            return;
        }
        var $current = $this.parent();
        if (!$current.is('label')) {
            return;
        }
        var $radioBtns = $('input[name="' + name + '"]');
        for (var i = 0; i < $radioBtns.length; i++) {
            var $parent = $radioBtns.eq(i).parent();
            if (!$parent.is('label')) {
                continue;
            }
            if ($parent.hasClass('checked')) {
                $parent.removeClass('checked');
                break;
            }
        }
        $current.addClass('checked');
    });

    $('.check-box').on('change', 'input[type="checkbox"]', function() {
        var $this = $(this);
        var $current = $(this).parent();
        $current.is('label') && $current.toggleClass('checked');
    });
})();
