// document ready
$(document).ready(function(){
    // init the welcome page on input value.
    (async () => {
        //get NCTCLM settings
        let settings = await NCTCLM.loadSettings();
        
        // set value of input
        Object.keys(settings).forEach(function(key){
            const $input = $('input[name='+key+']');
            if($input.length == 0) return;
            // check if the input is checkbox
            if($input.is(':checkbox')){
                $input.prop('checked',settings[key]);
            }else if( $input.is(':radio')){
                $input.filter('[value='+settings[key]+']').prop('checked',true);
            }
            else{
                $input.val(settings[key]);
            }
        
            // add event listener to input
            $input.change(function(){
                const $this = $(this);
                if($this.is(':checkbox'))
                    settings[key] = this.checked
                else
                    settings[key] = $this.val();
                //save settings
                NCTCLM.setValue(key, settings[key]);    
            });

            // if attribute 'toggle' name input is toggle self enable/disable input
            const toggle = $input.attr('toggle')?.split(':');
            if(toggle){
                const [tkey , tvalue] = toggle;
                const $enable_input = $(`input[name=${tkey}]`);
                const fn = function(){
                    const $this = $(this);
                    if($this.is(':checkbox'))
                        $input.prop('disabled', !this.checked);
                    else 
                        $input.prop('disabled', !($this.val() == tvalue));
                }
                // add event listener
                $enable_input.change(fn);
                fn.call($enable_input);
            }
        });


        
        return;
    })();

    // if click on reset button, reset settings
    $('#reset').click(function(){
        const settings = NCTCLM.reset();
         // set value of input
        Object.keys(settings).forEach(function(key){
            const $input = $('input[name='+key+']');
            if($input.length == 0) return;
            // check if the input is checkbox
            if($input.is(':checkbox')){
                $input.prop('checked',settings[key]);
            }else if($input.is(':radio')){
                $input.filter('[value='+settings[key]+']').prop('checked',true);
            }
            else{
                $input.val(settings[key]);
            }
            const toggle = $input.attr('toggle')?.split(':');
            if(toggle){
                const [tkey , tvalue] = toggle;
                const $enable_input = $(`input[name=${tkey}]`);
                const fn = function(){
                    const $this = $(this);
                    if($this.is(':checkbox'))
                        $input.prop('disabled', !this.checked);
                    else 
                        $input.prop('disabled', !($this.val() == tvalue));
                }
            }
        });
    });
});