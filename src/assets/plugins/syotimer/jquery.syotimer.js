(function($){
    const DAY_IN_SEC = 24 * 60 * 60;
    const HOUR_IN_SEC = 60 * 60;
    const MINUTE_IN_SEC = 60;

    var lang = {
        rus: {
            second: ['секунда', 'секунды', 'секунд'],
            minute: ['минута', 'минуты', 'минут'],
            hour: ['час', 'часа', 'часов'],
            day: ['день', 'дня', 'дней']
        },
        eng: {
            second: ['second', 'seconds'],
            minute: ['minute', 'minutes'],
            hour: ['hour', 'hours'],
            day: ['day', 'days']
        }
    };

    const DEFAULTS = {
        year: 2014,
        month: 7,
        day: 31,
        hour: 0,
        minute: 0,
        second: 0,
        timeZone: 'local',
        ignoreTransferTime: false,

        periodic: false, // true - таймер периодичный
        periodInterval: 7, // (если periodic установлен как true) период таймера. Единица измерения указывается в periodType
        periodUnit: 'd', // единица измерения периода таймера

        dayVisible: true, // показывать ли количество дней, если нет, то количество часов может превышать 23
        dubleNumbers: true, // показывать часы, минуты и секунды с ведущими нолями ( 2часа 5минут 4секунды = 02:05:04)
        doubleNumbers: true, // показывать часы, минуты и секунды с ведущими нолями ( 2часа 5минут 4секунды = 02:05:04)
        effectType: 'none', // эффект отсчета таймера: 'none' - нет эффекта, 'opacity' - выцветание
        lang: 'eng',

        headTitle: '', // текст над таймером (можно в HTML формате)
        footTitle: '', // текст под таймером (можно в HTML формате)
        afterDeadline: function(timerBlock){
            timerBlock.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>');
        }
    };

    var SyoTimer = {
        /**
         * Init syotimer on DOM
         * @param settings
         * @returns {Array|Object|*}
         */
        init: function(settings) {
            var options = $.extend({}, DEFAULTS, settings || {});
            if ( settings.hasOwnProperty("dubleNumbers") ) { // handler of deprecated options
                options.doubleNumbers = settings.dubleNumbers;
            }
            return this.each(function() {
                var elementBox = $(this);
                elementBox.data('syotimer-options', options);
                SyoTimer._render.apply(this, []);
                SyoTimer._perSecondHandler.apply(this, []);
            });
        },

        /**
         * Rendering base elements of countdown
         * @private
         */
        _render: function() {
            var elementBox = $(this),
                options = elementBox.data('syotimer-options'),
                timerDom,
                dayCellDom = ( options.dayVisible) ? staticMethod.getCellDom('day', '0') : '';
            timerDom = '' +
                '<div class="timer-head-block">' + options.headTitle + '</div>' +
                '<div class="timer-body-block">' +
                    dayCellDom +
                    staticMethod.getCellDom('hour') +
                    staticMethod.getCellDom('minute') +
                    staticMethod.getCellDom('second') +
                '</div>' +
                '<div class="timer-foot-block">' + options.footTitle + '</div>';
            elementBox.addClass('syotimer')
                .addClass('timer')
                .html( timerDom );
            var headBlock = $('.timer-head-block', elementBox),
                bodyBlock = $('.timer-body-block', elementBox),
                footBlock = $('.timer-foot-block', elementBox),
                timerBlocks = {
                    headBlock: headBlock,
                    bodyBlock: bodyBlock,
                    footBlock: footBlock
                };
            elementBox.data('syotimer-blocks', timerBlocks);
        },

        /**
         * Handler called per seconds while countdown is not over
         * @private
         */
        _perSecondHandler: function() {
            var elementBox = $(this),
                options = elementBox.data('syotimer-options');
            $('.second .tab-val', elementBox).css( 'opacity', 1 );
            var currentDate = new Date(),
                deadLineDate = new Date(
                    options.year,
                    options.month - 1,
                    options.day,
                    options.hour,
                    options.minute,
                    options.second
                ),
                differenceInMilliSec = staticMethod.getDifferenceWithTimezone(currentDate, deadLineDate, options),
                secondsToDeadLine = staticMethod.getSecondsToDeadLine(differenceInMilliSec, options);
            if ( secondsToDeadLine >= 0 ) {
                SyoTimer._refreshUnitsDom.apply(this, [secondsToDeadLine]);
                SyoTimer._applyEffectSwitch.apply(this, [options.effectType]);
            } else {
                elementBox = $.extend(elementBox, elementBox.data('syotimer-blocks'));
                options.afterDeadline( elementBox );
            }
        },

        /**
         * Refresh unit DOM of countdown
         * @param secondsToDeadLine
         * @private
         */
        _refreshUnitsDom: function(secondsToDeadLine) {
            var elementBox = $(this),
                options = elementBox.data('syotimer-options'),
                unitList = ['day', 'hour', 'minute', 'second'],
                unitsToDeadLine = staticMethod.getUnitsToDeadLine( secondsToDeadLine ),
                language = lang[options.lang];

            if ( !options.dayVisible ) {
                unitsToDeadLine.hour += unitsToDeadLine.day * 24;
                unitList.splice(0, 1);
            }
            for(var i = 0; i < unitList.length; i++) {
                var unit = unitList[i],
                    cls = '.' + unit;
                $(cls + ' .tab-val', elementBox).html(staticMethod.format2(
                    unitsToDeadLine[unit],
                    (unit != 'day') ? options.doubleNumbers : false
                ));
                $(cls + ' .tab-unit', elementBox).html(staticMethod.definitionOfNumerals(
                    unitsToDeadLine[unit],
                    language[unit],
                    options.lang
                ));
            }
        },

        /**
         * Applying effect of changing numbers
         * @param effectType
         * @private
         */
        _applyEffectSwitch: function(effectType) {
            var element = this,
                elementBox = $(element);
            switch ( effectType ){
                case 'none':
                    setTimeout( function(){
                        SyoTimer._perSecondHandler.apply(element, []);
                    }, 1000);
                    break;
                case 'opacity':
                    $('.second .tab-val', elementBox).animate(
                        {opacity: 0.1 },
                        1000,
                        'linear',
                        function() {
                            SyoTimer._perSecondHandler.apply(element, []);
                        }
                    );
                    break;
            }
        }
    };

    var staticMethod = {
        /**
         * Return once cell DOM of countdown: day, hour, minute, second
         * @param cls               class of cell
         * @param startCountFormat
         * @returns {string}
         */
        getCellDom: function(cls, startCountFormat) {
            cls = cls || '';
            startCountFormat = startCountFormat || '00';
            return '' +
                '<div class="table-cell ' + cls + '">' +
                    '<div class="tab-val">' + startCountFormat + '</div>' +
                    '<div class="tab-metr tab-unit"></div>' +
                '</div>';
        },

        /**
         * Getting count of seconds to deadline
         * @param differenceInMilliSec
         * @param options
         * @returns {*}
         */
        getSecondsToDeadLine: function(differenceInMilliSec, options) {
            var secondsToDeadLine,
                differenceInSeconds = differenceInMilliSec / 1000;
            differenceInSeconds = Math.floor( differenceInSeconds );
            if ( options.periodic ) {
                var additionalInUnit,
                    differenceInUnit,
                    periodUnitInSeconds = staticMethod.getPeriodUnit(options.periodUnit),
                    fullTimeUnitsBetween = differenceInMilliSec / (periodUnitInSeconds * 1000);
                fullTimeUnitsBetween = Math.ceil( fullTimeUnitsBetween );
                fullTimeUnitsBetween = Math.abs( fullTimeUnitsBetween );
                if ( differenceInSeconds >= 0 ) {
                    differenceInUnit = fullTimeUnitsBetween % options.periodInterval;
                    differenceInUnit = ( differenceInUnit == 0 )? options.periodInterval : differenceInUnit;
                    differenceInUnit -= 1;
                } else {
                    differenceInUnit = options.periodInterval - fullTimeUnitsBetween % options.periodInterval;
                }
                additionalInUnit = differenceInSeconds % periodUnitInSeconds;

                // fix когда дедлайн раньше текущей даты,
                // возникает баг с неправильным расчетом интервала при different пропорциональной periodUnit
                if ( ( additionalInUnit == 0 ) && ( differenceInSeconds < 0 ) ) {
                    differenceInUnit--;
                }
                secondsToDeadLine = Math.abs( differenceInUnit * periodUnitInSeconds + additionalInUnit );
            } else {
                secondsToDeadLine = differenceInSeconds;
            }
            return secondsToDeadLine;
        },

        /**
         * Getting count of units to deadline
         * @param secondsToDeadLine
         * @returns {{}}
         */
        getUnitsToDeadLine: function(secondsToDeadLine) {
            var unitList = ['day', 'hour', 'minute', 'second'],
                unitsToDeadLine = {};
            for (var i = 0; i < unitList.length; i++) {
                var unit = unitList[i],
                    unitInMilliSec = staticMethod.getPeriodUnit(unit);
                unitsToDeadLine[unit] = Math.floor(secondsToDeadLine / unitInMilliSec);
                secondsToDeadLine = secondsToDeadLine % unitInMilliSec;
            }
            return unitsToDeadLine;
        },

        /**
         * Determine a unit of period in milliseconds
         * @param given_period_unit
         * @returns {number}
         */
        getPeriodUnit: function(given_period_unit) {
            switch (given_period_unit) {
                case 'd':
                case 'day':
                    return DAY_IN_SEC;
                case 'h':
                case 'hour':
                    return HOUR_IN_SEC;
                case 'm':
                case 'minute':
                    return MINUTE_IN_SEC;
                case 's':
                case 'second':
                    return 1;
            }
        },

        getDifferenceWithTimezone: function(currentDate, deadLineDate, options) {
            var differenceByLocalTimezone = deadLineDate.getTime() - currentDate.getTime(),
                amendmentOnTimezone = 0,
                amendmentOnTransferTime = 0,
                amendment;
            if ( options.timeZone !== 'local' ) {
                var timezoneOffset = parseFloat(options.timeZone) * staticMethod.getPeriodUnit('hour'),
                    localTimezoneOffset = - currentDate.getTimezoneOffset() * staticMethod.getPeriodUnit('minute');
                amendmentOnTimezone = (timezoneOffset - localTimezoneOffset) * 1000;
            }
            if ( options.ignoreTransferTime ) {
                var currentTimezoneOffset = -currentDate.getTimezoneOffset() * staticMethod.getPeriodUnit('minute'),
                    deadLineTimezoneOffset = -deadLineDate.getTimezoneOffset() * staticMethod.getPeriodUnit('minute');
                amendmentOnTransferTime = (currentTimezoneOffset - deadLineTimezoneOffset) * 1000;
            }
            amendment = amendmentOnTimezone + amendmentOnTransferTime;
            return differenceByLocalTimezone - amendment;
        },

        /**
         * Formation of numbers with leading zeros
         * @param number
         * @param isUse
         * @returns {string}
         */
        format2: function(number, isUse) {
            isUse = (isUse !== false);
            return ( ( number <= 9 ) && isUse ) ? ( "0" + number ) : ( "" + number );
        },

        /**
         * Getting the correct declension of words after numerals
         * @param number
         * @param titles
         * @param lang
         * @returns {*}
         */
        definitionOfNumerals: function(number, titles, lang) {
            switch (lang) {
                case 'rus':
                    var cases = [2, 0, 1, 1, 1, 2],
                        index;
                    if ( number % 100 > 4 && number % 100 < 20 ) {
                        index = 2;
                    } else {
                        index = cases[(number % 10 < 5) ? number % 10 : 5];
                    }
                    return titles[index];
                case 'eng':
                    return titles[ ( number == 1 ) ? 0 : 1 ];
            }
        }

    };

    var methods = {
        setOption: function(name, value) {
            var elementBox = $(this),
                options = elementBox.data('syotimer-options');
            if ( options.hasOwnProperty( name ) ) {
                options[name] = value;
                elementBox.data('syotimer-options', options);
            }
        }
    };

    $.fn.syotimer = function(options){
        if ( typeof options == 'string' && ( options === "setOption" ) ) {
            var otherArgs = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                methods[options].apply( this, otherArgs );
            });
        } else if (options === null || typeof options == 'object'){
            return SyoTimer.init.apply(this, [options]);
        } else {
            $.error('SyoTimer. Error in call methods: methods is not exist');
        }
    };
})(jQuery);
