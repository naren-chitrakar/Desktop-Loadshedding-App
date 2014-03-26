$( function( ){
   
    var hack = {
        getMe : function(){
            return this;
        },
        groupId : 1,
        setGroup : function( groupId ){
            getMe().groupId = groupId;
        },
        refreshAll : function( ) {
        
        },
        checkNotification : function( groupId ){
        //            $.ajax({
        //                url : "data/checkNotification",
        //                type : "post",
        //                data : {
        //                    groupId : groupId
        //                },
        //                dataType : 'json',
        //                success : function( msg ) {
        //                    
        //                }
        //            })
        //            
        //            this.getMe().notify( timeRemain, msg );
        },
        notify : function( time, message ) {
            
        },
        connect : function(){
        
        },
        select : function( groupId ) {
        
        },
        refreshGroup : function( groupId ) {
            $.ajax({
                url : 'data/getData.php',
                type : "post",
                data : {
                    groupId : this.getMe().groupId
                },
                dataType : "json",
                success : function( msg ){
                    var html = "<ul>";
                    
                    $.each( msg.schedule , function( k , v){
                        html += "<li><div class='day-box'>" + k;
                        html += "</div>"
                        +"<div class='schedule-time'>";
                        
                        $.each( v , function( kk , vv ) {
                            $.each( vv , function( kkk , vvv ) { 
                                //time constraint..should use join
                                html += "<p>" + vvv + "</p>";
                            })
                            
                        })
                        html += "</div></li>";
                        
                    })
                    html += "</ul>";
                    
                    hack.getMe().feed( '.schedule-list',  html );
                },
                error : function() {
                    
                },
                complete : function(){
                    
                },
                beforeSend : function(){
                    
                }
            })
        },
        renderMap : function () {
        
        },
        feed : function( div , content ) {
            $(div).html( content );
        },
        ticktok : function() {
            
            var minute = parseInt( $("#min-box").text(), 10 );
            var hour = parseInt( $("#hr-box").text(), 10);
            var sec = parseInt( $("#sec-box").text(), 10 );
            
            $("#sec-box").text( (sec - 1) );
            var Esec = parseInt( $("#sec-box").text(), 10 );
            var Emin = parseInt( $("#min-box").text(), 10 );
            if ( Esec <= 0 ) {
                $("#min-box").text( ( minute - 1 ) );
                $("#sec-box").text( 59 );
            }
            
            if ( Emin <= 0 ) {
                $("#hr-box").html( ( hour -1 ) );
                $("#min-box").html( 59 );
            }
        },
        runCountDown : function() {
            
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s =today.getSeconds();
            $.ajax({
                url : "data/getCurrentSchedule.php",
                data : {
                    groupId : 1, 
                    thisHour : h, 
                    thisMinute : m, 
                    thisSecond : s
                },
                dataType : "json",
                type : "post",
                success : function( msg ){
                    $("#sec-box").html( s );
                    $("#min-box").html( msg.minute );
                    $("#hr-box").html( msg.hour );
                },
                
            })
            setInterval( function() {
                hack.getMe().ticktok()
            }, 1000 );
        }
    
    };


    $(".refresh").on("click", function(){
        hack.refreshGroup( 1 );
    })
    hack.runCountDown();
    hack.refreshGroup( 1 );
    
    $(".power-btn").on("click", function() {
        var a = confirm( "Are you sure you want to shut down the computer? It will shut down in 10 seconds");
        
        if ( a ) {
            $.get('data/shutdown.php');
        }
        
    })
    
    $.get('data/writeData.php');
    
//setInterval( hack.checkNotification(), 6000 );
})

