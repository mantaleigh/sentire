$(function(){ 

    $('.d_1').on('change',function(){
        if( $(this).val()==="mood"){
            $(".d_1_mood_desc").show()
        }
        else{
            $(".d_1_mood_desc").hide()
        }
    });

    $('.d_2').on('change',function(){
        if( $(this).val()==="mood"){
            $(".d_2_mood_desc").show()
        }
        else{
            $(".d_2_mood_desc").hide()
        }
    });

    $('.d_3').on('change',function(){
        if( $(this).val()==="mood"){
            $(".d_3_mood_desc").show()
        }
        else{
            $(".d_3_mood_desc").hide()
        }
    });

    $('.d_4').on('change',function(){
        if( $(this).val()==="mood"){
            $(".d_4_mood_desc").show()
        }
        else{
            $(".d_4_mood_desc").hide()
        }
    });
});