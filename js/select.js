var CustomSelect = (function() {
    var module = {};
    module.init = function() {
        this._selects = $('[data-role="custom-select"]');
        this._optionGroup = $('[data-role="option-group"]');
        this._headGroup = $('[data-role="head-group"]');
        // 绑定事件
        this.bindEvent();
        // 添加默认的input隐藏域
        this.addInputElem();
        // 自动调整层级高度
        this.judgeRate();
        // 设置默认显示的(隐藏域)值
        this.setDefaultValue();
    };
    module.addInputElem = function() {
        this._selects.each(function() {
            var $this = $(this);
            var name = $this.attr('name');
            if (typeof name === 'undefined') {
                return;
            }
            var id = $this.attr('id');
            var $input = $('<input>');
            if (typeof id !== 'undefined') {
                $input.attr({ 'id': 'cs_input_' + id });
            }
            $input.attr({ 'type': 'hidden', 'name': name, 'class': 'select-input' });
            $this.removeAttr('name');
            $this.append($input);
        });
    };
    module.judgeRate = function() {
        var base = 1000;
        var len = this._selects.length;
        this._selects.each(function() {
            $(this).css({ 'z-index': base + len });
            len--;
        });
    };
    module.setDefaultValue = function() {
        this._optionGroup.each(function() {
            var $this = $(this);
            var $option;
            var $options = $this.find('[selected]');
            if ($options.length > 0) {
                $option = $options.last();
            } else {
                $options = $this.find('li');
                $option = $options.first();
            }
            var $board = $this.prev().find('.board');
            $board.text($option.text()).data('code', $option.attr('code'));
            var $input = $this.parent().next();
            $input.length > 0 && $input.val($option.attr('code'));
        });
    };
    module.bindEvent = function() {
        var self = this;
        //show
        this._headGroup.on('click', function(e) {
            e.stopPropagation();
            var $this = $(this);
            self._optionGroup.hide();
            self._selects.removeClass('select-visible')
            $this.next('[data-role="option-group"]').show();
            $this.parent('[data-role="custom-select"]').addClass('select-visible');
        });
        this._optionGroup.on('click', function(e) {
            e.stopPropagation();
        });
        //hide
        $(document).on('click', function() {
            self._optionGroup.hide();
            self._selects.removeClass('select-visible');
        });
        // choice
        this._optionGroup.on('click', 'li', function() {
            var $this = $(this);
            //hide option group
            var $currentOptionGroup = $this.parents('[data-role="option-group"]');
            $currentOptionGroup.hide();
            //judje value
            var $currentHeadGroup = $currentOptionGroup.prev();
            var $board = $currentHeadGroup.find('.board');
            if ($board.data('code') === $this.attr('code')) {
                return;
            }
            //change
            var data = { value: $this.text(), code: $this.attr('code') };
            $board.text(data.value).data('code', data.code);
            var $currentSelect = $this.parents('[data-role="custom-select"]');
            //default input
            $currentSelect.find('.select-input').val(data.code);
            $currentSelect.removeClass('select-visible');
            // trigger
            $currentSelect.trigger('change', data);
        });
    };
    /**
     * [setOption 设置选中的]
     * @param {[String]} id   [select id]
     * @param {[String]} code [option code]
     */
    module.setOption = function(id, code) {
        var $select = $('#' + id);
        if ($select.length === 0) {
            return;
        }
        $options = $select.find('[data-role="option-group"]').find('li');
        for (var i = 0; i < $options.length; i++) {
            var $option = $options.eq(i);
            if ($option.attr('code') === code) {
                $option.addAttribute('selected');
                $select.find('[data-role="head-group"]').find('.board').text($option.text());
                $select.find('.select-input').val(code);
                break;
            }
        }
    };
    /**
     * [getValue 获取选中的]
     * @param  {[String]} id [description]
     * @return {[Object]}    [{'code':'','value':''}]
     */
    module.getValue = function(id) {
        var $select = $('#' + id);
        if ($select.length === 0) {
            return null;
        }
        var $board = $select.find('[data-role="head-group"]').find('.board');
        return { 'code': $board.data('code'), 'value': $board.text() };
    };


    return module;
})();
