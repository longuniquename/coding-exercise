(function($) {
    var poller = new massrel.Poller(
        {
            frequency: 15
        },
        function(data){
            var i, band;
            if (!this.bands) {
                this.bands = [];
                for (i = 0; i < data.length; i++) {
                    band = data[i];
                    band.line = $('<li><div class="band"><span class="name"></span><span class="mentions"><span class="count">0</span> Mentions</span></div></li>');
                    $('.name', band.line).text(band.name);
                    band.line.appendTo('.bands ul');
                    this.bands.push(band);
                }
            }

            this.bands.forEach(function(band, currentPosition){
                for (var newPosition = 0; newPosition < data.length; newPosition++) {
                    if (data[newPosition].name == band.name) {
                        $('.mentions .count', band.line).text(band.count = data[newPosition].count);
                        break;
                    }
                }

                $('.band', band.line).css('top', this.bands[newPosition].line.position().top - band.line.position().top);
            }, this);

        }
    );
    poller.start();
}(jQuery));